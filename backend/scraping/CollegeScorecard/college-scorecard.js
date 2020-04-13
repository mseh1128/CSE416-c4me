const axios = require('axios');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const {
  collegeNames,
  CSAltNames,
  CSFieldNamesToDBFields,
} = require('../constants');

const convertCSToDB = (collegeData) => {
  const {
    INSTNM,
    ALIAS,
    STABBR,
    ADM_RATE,
    CONTROL,
    GRAD_DEBT_MDN,
    UG,
    UGDS,
    CITY,
  } = collegeData;
  const college = {};
  college[CSFieldNamesToDBFields['INSTNM']] = nullStringToNull(INSTNM);
  college[CSFieldNamesToDBFields['CITY']] = nullStringToNull(CITY);
  college[CSFieldNamesToDBFields['STABBR']] = nullStringToNull(STABBR);
  college[CSFieldNamesToDBFields['ADM_RATE']] = nullStringToNull(ADM_RATE);
  college[CSFieldNamesToDBFields['CONTROL']] = institutionTypeConversion(
    parseInt(nullStringToNull(CONTROL))
  );
  college[CSFieldNamesToDBFields['GRAD_DEBT_MDN']] = nullStringToNull(
    GRAD_DEBT_MDN
  );
  if (UG != 'NULL') college[CSFieldNamesToDBFields['UG']] = UG;
  else college[CSFieldNamesToDBFields['UGDS']] = nullStringToNull(UGDS);
  return college;
};

const institutionTypeConversion = (ControlValue) => {
  if (ControlValue === 1) return 'Public';
  if (ControlValue === 2) return 'Private nonprofit';
  if (ControlValue === 3) return 'Private for-profit';
  return null;
};

const nullStringToNull = (field) => {
  if (field === 'NULL') return null;
  return field;
};

const convertNamesForCollegeScorecard = (collegeNames) => {
  // commas not allowed in college scorecard
  // st. and ampsersands sometimes allowed so not replacing
  const nameToAltNameMap = {};
  collegeNames.forEach((collegeName) => {
    let altName = null;
    if (collegeName in CSAltNames) {
      altName = CSAltNames[collegeName];
    } else {
      altName = collegeName.replace(', ', '-');
    }
    nameToAltNameMap[altName] = collegeName;
  });
  return nameToAltNameMap;
};

const scrapeCollegeScorecard = async () => {
  try {
    const results = {};
    const mappedNames = convertNamesForCollegeScorecard(collegeNames);
    // key = college name, value = alt college name
    const collegeNameSet = new Set(Object.keys(mappedNames));
    const response = await axios.get(
      'https://ed-public-download.app.cloud.gov/downloads/Most-Recent-Cohorts-All-Data-Elements.csv',
      {
        responseType: 'stream',
      }
    );
    const readStream = response.data.pipe(csv());
    return new Promise((resolve, reject) => {
      readStream
        .on('data', (data) => {
          const { INSTNM, ALIAS } = data;
          // splits on comma & pipe
          if (
            collegeNameSet.has(INSTNM) ||
            (ALIAS != null &&
              ALIAS.split(/[|,]+/).some((e) => collegeNameSet.has(e)))
          ) {
            collegeNameSet.delete(INSTNM);
            const sanitizedCollege = convertCSToDB(data);
            const nameInDB = mappedNames[INSTNM];
            results[nameInDB] = sanitizedCollege;
            console.log(collegeNameSet.size + ' colleges left!');
            // console.log(results);
            if (collegeNameSet.size === 0) {
              console.log('All colleges found!');
              resolve(results);
              readStream.destroy(new Error('All colleges found!'));
            }
          }
        })
        .on('end', () => {
          console.log(collegeNameSet.size + ' colleges not found!');
          console.log(collegeNameSet);
          reject('Not all colleges found!');
        })
        .on('error', (e) => {
          // error occurs b/c closing stream prematurely
          // so may attemp to push after EOF
          reject('Stream ended prematurely!');
          console.log(e);
        });
    });
  } catch (err) {
    console.log(err);
    console.log('An error has occurred!');
  }
};

const scrapeCollegeScorecardFromCSV = async () => {
  try {
    const results = {};
    const mappedNames = convertNamesForCollegeScorecard(collegeNames);
    // key = college name, value = alt college name
    const collegeNameSet = new Set(Object.keys(mappedNames));

    // practically the exact same as the method above
    // should modularize this in the future!
    const readStream = fs
      .createReadStream(
        path.resolve(__dirname, 'Most-Recent-Cohorts-All-Data-Elements.csv')
      )
      .pipe(csv());

    return new Promise((resolve, reject) => {
      readStream
        .on('data', (data) => {
          const { INSTNM, ALIAS } = data;
          // splits on comma & pipe
          if (
            collegeNameSet.has(INSTNM) ||
            (ALIAS != null &&
              ALIAS.split(/[|,]+/).some((e) => collegeNameSet.has(e)))
          ) {
            collegeNameSet.delete(INSTNM);
            const sanitizedCollege = convertCSToDB(data);
            const nameInDB = mappedNames[INSTNM];
            results[nameInDB] = sanitizedCollege;
            console.log(collegeNameSet.size + ' colleges left!');
            // console.log(results);
            if (collegeNameSet.size === 0) {
              console.log('All colleges found!');
              resolve(results);
              readStream.destroy(new Error('All colleges found!'));
            }
          }
        })
        .on('end', () => {
          console.log(collegeNameSet.size + ' colleges not found!');
          console.log(collegeNameSet);
          reject('Not all colleges found!');
        })
        .on('error', (e) => {
          // error occurs b/c closing stream prematurely
          // so may attemp to push after EOF
          reject('Stream ended prematurely!');
          console.log(e);
        });
    });
  } catch (err) {
    console.log(err);
    console.log('An error has occurred!');
  }
};

module.exports = {
  scrapeCollegeScorecard: scrapeCollegeScorecard,
  scrapeCollegeScorecardFromCSV: scrapeCollegeScorecardFromCSV,
};
