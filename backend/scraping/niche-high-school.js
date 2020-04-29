const axios = require('axios');
const cheerio = require('cheerio');

const { nicheHighSchoolBaseURL } = require('./constants');

// const scrapeCollege = async (collegeName, collegeDataURL) => {};

const converWhitespaceToDash = (str) => {
  return str.replace(/\s+/g, '-');
};

const getParentBucketElement = (
  cheerioHTML,
  containerID,
  bucketNum,
  childNum
) => {
  return cheerioHTML(`#${containerID}`)
    .find(`.profile__bucket--${bucketNum}`)
    .find('.blank__bucket')
    .children()[childNum];
};

const getBucketElement = (cheerioHTML, containerID, bucketNum) => {
  return cheerioHTML(`#${containerID}`)
    .find(`.profile__bucket--${bucketNum}`)
    .find('.blank__bucket');
};

convertEmptyDataToNull = (HSData) => {
  for (const key in HSData) {
    // empty string to null
    if (HSData[key] === '') HSData[key] = null;
  }
  return HSData;
};

const scrapeNicheHighSchool = (highSchoolData) => {
  return new Promise(async (resolve, reject) => {
    const { highSchoolName, highSchoolCity, highSchoolState } = highSchoolData;
    const URLFriendlyHSName = converWhitespaceToDash(highSchoolName);
    const URLFriendlyHSCity = converWhitespaceToDash(highSchoolCity);

    const HSURL = `${nicheHighSchoolBaseURL}/${URLFriendlyHSName}-${URLFriendlyHSCity}-${highSchoolState}/`;
    try {
      const html = await axios.get(HSURL);
      const $ = cheerio.load(html.data);
      let institutionType = $('.postcard__attrs:first-of-type')
        .find('.postcard-fact')
        .first()
        .text();

      let numOfStudents = $(getParentBucketElement($, 'students', 1, 1))
        .find('.scalar__value')
        .text()
        .replace(/,/g, '');

      let studentToTeacherRatio = $(
        $(getParentBucketElement($, 'teachers', 1, 0))
      )
        .find('.scalar__value')
        .find('span')
        .first()
        .text();

      let [studentRatio, teacherRatio] = studentToTeacherRatio.split(':');

      let academicBucket = getBucketElement($, 'academics', 3);

      let gradRate = $($(academicBucket).children()[0])
        .find('.scalar__value')
        .text()
        .slice(0, -1);

      let APEnrollment = $($(academicBucket).children()[3])
        .find('.scalar__value')
        .text()
        .slice(0, -1);

      let SATContainer = $($(academicBucket).children()[1]);

      let numAvgSATResponses = SATContainer.find(
        '.scalar__value .scalar-response-count'
      )
        .text()
        .replace(' responses', '');

      let avgSAT = SATContainer.find('.scalar__value')
        .clone()
        .children()
        .remove()
        .end()
        .text();

      let ACTContainer = $($(academicBucket).children()[2]);

      let numAvgACTResponses = ACTContainer.find(
        '.scalar__value .scalar-response-count'
      )
        .text()
        .replace(' responses', '');

      let avgACT = ACTContainer.find('.scalar__value')
        .clone()
        .children()
        .remove()
        .end()
        .text();
      // console.log(HSURL);
      // console.log(institutionType);
      // console.log(numOfStudents);
      // console.log(studentToTeacherRatio);
      // console.log(gradRate);
      // console.log(APEnrollment);
      // console.log(numAvgSATResponses);
      // console.log(avgSAT);
      // console.log(numAvgACTResponses);
      // console.log(avgACT);
      const HSData = convertEmptyDataToNull({
        ...highSchoolData,
        institutionType,
        numOfStudents,
        studentToTeacherRatio,
        studentRatio,
        teacherRatio,
        gradRate,
        APEnrollment,
        numAvgSATResponses,
        avgSAT,
        numAvgACTResponses,
        avgACT,
      });
      resolve(HSData);
    } catch (err) {
      // console.log(err);
      reject(`Could not scrape: ${highSchoolName}`);
    }
  });
};

module.exports = scrapeNicheHighSchool;
