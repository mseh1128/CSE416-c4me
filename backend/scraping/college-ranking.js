const axios = require('axios');
const { collegeName, collegeRankingBaseURL } = require('./constants');
const collegeRankingJSONURL = `${collegeRankingBaseURL}/sites/default/files/the_data_rankings/united_states_rankings_2020_0__fe9db1a86587c174feb9fd3820701c93.json`;

const mapRankToCollegeName = data => {
  const collegeRanking = {};
  for (const collegeRank in data) {
    const collegeData = data[collegeRank];
    collegeRanking[collegeData['name']] = collegeData['rank_order'];
  }
  return collegeRanking;
};

const findUnmatchedNames = (collegeListTxt, collegeRankings) => {
  return collegeListTxt.filter(cName => !(cName in collegeRankings));
};

const scrapeCollegeRanking = async () => {
  const response = await axios.get(collegeRankingJSONURL);
  const collegeRankings = mapRankToCollegeName(response.data.data);
  const unmatchedNames = findUnmatchedNames(collegeNameArr, collegeRankings);
  // by default (current colleges.txt), all names are matched!
  if (unmatchedNames.length === 0) {
    return collegeRankings;
  } else {
    // could not match, will not occur with current colleges.txt
    console.log('The following colleges could not be found');
    console.log(unmatchedNames);
    throw new Error('Colleges not found!');
  }
};

module.exports = scrapeCollegeRanking;
