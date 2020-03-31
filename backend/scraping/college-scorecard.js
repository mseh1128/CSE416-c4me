const axios = require('axios');
const csv = require('csv-parser');
const {
  collegeNames,
  CSAltNames,
  CSFieldNamesToDBFields
} = require('./constants');

const convertCSToDB = collegeData => {
  const {
    INSTNM,
    ALIAS,
    STABBR,
    ADM_RATE,
    CONTROL,
    GRAD_DEBT_MDN,
    UG,
    UGDS
  } = collegeData;
  const college = {};
  college[CSFieldNamesToDBFields['INSTNM']] = INSTNM;
  college[CSFieldNamesToDBFields['STABBR']] = STABBR;
  college[CSFieldNamesToDBFields['ADM_RATE']] = ADM_RATE;
  college[CSFieldNamesToDBFields['CONTROL']] = CONTROL;
  college[CSFieldNamesToDBFields['GRAD_DEBT_MDN']] = GRAD_DEBT_MDN;
  if (UG != 'NULL') college[CSFieldNamesToDBFields['UG']] = UG;
  else college[CSFieldNamesToDBFields['UGDS']] = UGDS;
  return college;
};

const convertNamesForCollegeScorecard = collegeNames => {
  // commas not allowed in college scorecard
  // st. and ampsersands sometimes allowed so not replacing
  const nameToAltNameMap = {};
  collegeNames.forEach(collegeName => {
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
        responseType: 'stream'
      }
    );
    const readStream = response.data.pipe(csv());
    return new Promise((resolve, reject) => {
      readStream
        .on('data', data => {
          const { INSTNM, ALIAS } = data;
          // splits on comma & pipe
          if (
            collegeNameSet.has(INSTNM) ||
            (ALIAS != null &&
              ALIAS.split(/[|,]+/).some(e => collegeNameSet.has(e)))
          ) {
            collegeNameSet.delete(INSTNM);
            const sanitizedCollege = convertCSToDB(data);
            const nameInDB = mappedNames[INSTNM];
            results[nameInDB] = sanitizedCollege;

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
        .on('error', e => {
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

module.exports = scrapeCollegeScorecard;
