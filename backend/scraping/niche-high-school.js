const axios = require('axios');
const cheerio = require('cheerio');
const { nicheHighSchoolBaseURL } = require('./constants');

// const scrapeCollege = async (collegeName, collegeDataURL) => {};

const converWhitespaceToDash = (str) => {
  return str.replace(/\s+/g, '-');
};

const scrapeNicheHighSchool = async (highSchoolData) => {
  const { highSchoolName, highSchoolCity, highSchoolState } = highSchoolData;
  const URLFriendlyHSName = converWhitespaceToDash(highSchoolName);
  const URLFriendlyHSCity = converWhitespaceToDash(highSchoolCity);

  const HSURL = `${nicheHighSchoolBaseURL}/${URLFriendlyHSName}-${URLFriendlyHSCity}-${highSchoolState}/`;
  console.log(HSURL);
  const html = await axios.get(HSURL);
  console.log(html);
  // const $ = cheerio.load(html.data);
  // const generalAttributes = $('.postcard__attrs');
  // console.log(generalAttributes);
};
//www.niche.com/k12/ward-melville-senior-high-school-east-setauket-ny/
scrapeNicheHighSchool({
  highSchoolName: 'ward melville senior high school',
  highSchoolCity: 'east setauket',
  highSchoolState: 'ny',
});

module.exports = scrapeNicheHighSchool;
