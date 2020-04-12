const axios = require('axios');
const cheerio = require('cheerio');
const {
  collegeNames,
  collegeDataBaseURL,
  maxConcurrentConns,
  collegeNameRegex,
} = require('./constants');
const collegeDataCollegeURL = `${collegeDataBaseURL}/college/`;
const Bottleneck = require('bottleneck');

const mapNameToCollegeDataURL = (collegeList) => {
  return collegeList.map((college) => ({
    collegeName: college,
    collegeURL: `${collegeDataCollegeURL}${college
      .replace(/^The\s/, '')
      .replace(/SUNY/, 'State University of New York')
      .replace(collegeNameRegex, `$1-$3`)}/`,
  }));
};

const computeAvgScore = (scoreText) => {
  // console.log(scoreText);
  let avgScore = null;
  const avgRegex = /(\d*) average/;
  let regexMatch = avgRegex.exec(scoreText);
  if (regexMatch !== null) {
    // console.log('AVG FOUND');
    avgScore = parseInt(regexMatch[1]);
  } else {
    const medianRegex = /(\d*)-(\d*) range of middle 50%/;
    const medianRegexMatch = medianRegex.exec(scoreText);
    if (medianRegexMatch !== null) {
      // console.log('MEDIAN FOUND');
      avgScore =
        (parseInt(medianRegexMatch[1]) + parseInt(medianRegexMatch[2])) / 2;
    } else {
      if (scoreText.trim() === 'Not reported') {
        // console.log('Data not reported');
      } else {
        console.log('SPECIAL CASE');
        console.log('Score Text is: ' + scoreText);
      }
      // console.log('NEITHER AVG NOR MEDIAN FOUND');
      // console.log('SETTING scoreText TO NULL');
      avgScore = null;
    }
  }
  return avgScore;
};

const sanitizeCostOfAttendance = (costStr) => {
  // basically just remove commas and covert to int
  const attendanceCostRegex = /\$([\d,]*)/;
  const computedCostRegex = attendanceCostRegex.exec(costStr);
  if (computedCostRegex !== null) {
    // console.log('Successfully computed!');
    return parseInt(computedCostRegex[1].replace(/,/g, ''));
  } else if (costStr.trim() === 'Not available') {
    // console.log('Data not available');
  } else {
    console.log('SPECIAL CASE');
    console.log(costStr);
  }
  return null;
};

const getAttendanceCost = (profileOverviewEl) => {
  // cost of attendance
  const costOfAttendance = profileOverviewEl
    .find('.card:nth-of-type(3)')
    .find('dl dd')
    .first();

  let inStateCost = null;
  let outStateCost = null;
  let additionalChildren = costOfAttendance.children();
  // console.log(collegeDataURL);
  if (additionalChildren.length !== 0) {
    // text before br is in-state & after is out-of-state
    inStateCost = sanitizeCostOfAttendance(additionalChildren[0].prev.data);
    outStateCost = sanitizeCostOfAttendance(additionalChildren[0].next.data);
  } else {
    inStateCost = outStateCost = sanitizeCostOfAttendance(
      costOfAttendance.text()
    );
  }
  return {
    InStateAttendanceCost: inStateCost,
    OutStateAttendanceCost: outStateCost,
  };
};

const scrapeCollege = async (collegeName, collegeDataURL) => {
  try {
    const html = await axios.get(collegeDataURL);
    const $ = cheerio.load(html.data);
    const profileOverview = $('#profile-overview');
    // console.log(profileOverview.children()[5].children[0].children[3]);
    const collegeData = { name: collegeName };

    const attendanceData = getAttendanceCost(profileOverview);
    collegeData['InStateAttendanceCost'] =
      attendanceData['InStateAttendanceCost'];
    collegeData['OutStateAttendanceCost'] =
      attendanceData['OutStateAttendanceCost'];

    // completion rate
    const completionRate = profileOverview
      .find('.card')
      .last()
      .find('dl dd:nth-of-type(4)')
      .text()
      .trim()
      .slice(0, -1); // removes percent sign

    collegeData['completionRate'] = completionRate;

    // majors
    const profileAcademics = $('#profile-academics');
    const majors = profileAcademics
      .find('.card:nth-of-type(2) .row li')
      .map((i, majorElement) => $(majorElement).text())
      .toArray();
    collegeData['majors'] = majors;

    // test scores
    const allScores = profileOverview
      .find('.card')
      .first()
      .find('dl:nth-of-type(2) dd');

    const avgGPA = parseFloat($(allScores[0]).text());

    // SAT MATH
    const avgSATMathText = $(allScores[1]).text();
    const avgSATMath = computeAvgScore(avgSATMathText);

    // SAT EBRW
    const avgSATEBRWText = $(allScores[2]).text();
    const avgSATEBRW = computeAvgScore(avgSATEBRWText);

    // ACT Composite
    const avgACTCompositeText = $(allScores[3]).text();
    const avgACTComposite = computeAvgScore(avgACTCompositeText);

    collegeData['avgGPA'] = avgGPA;
    collegeData['avgSATMath'] = avgSATMath;
    collegeData['avgSATEBRW'] = avgSATEBRW;
    collegeData['avgACTComposite'] = avgACTComposite;

    console.log(`${collegeName} finished`);
    return collegeData;
  } catch (err) {
    console.log(err);
    console.log(`Something went wrong scraping ${collegeName}`);
    console.log(`The URL is ${collegeDataURL}`);
  }
};

const scrapeCollegeData = async () => {
  const collegeURLList = mapNameToCollegeDataURL(collegeNames);
  // [collegeName, collegeURL]
  try {
    const limiter = new Bottleneck({ maxConcurrent: maxConcurrentConns });
    const tasks = collegeURLList.map(({ collegeName, collegeURL }) =>
      limiter.schedule(() => scrapeCollege(collegeName, collegeURL))
    );

    const scrapedCollegesInfo = await Promise.all(tasks);
    // sets college name as the key
    const scrapedCollegeMap = {};
    scrapedCollegesInfo.forEach((collegeInfo) => {
      const { name } = collegeInfo;
      scrapedCollegeMap[name] = collegeInfo;
    });
    return scrapedCollegeMap;
  } catch (err) {
    // console.log(err);
    console.log('Error occurred in scraping data!');
    throw err;
  }
};

module.exports = scrapeCollegeData;
