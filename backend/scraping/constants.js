const fs = require('fs');
const path = require('path');

const collegeNames = fs
  .readFileSync(path.resolve(__dirname, './colleges.txt'))
  .toString()
  .replace(/\r\n/g, '\n')
  .split('\n');

module.exports = {
  collegeNames: collegeNames,
  collegeDataBaseURL: 'https://www.CollegeData.com',
  nicheHighSchoolBaseURL:
    'http://allv22.all.cs.stonybrook.edu/~stoller/cse416/niche',
  maxConcurrentConns: 10, // to ensure sockets do not overload!
  collegeNameRegex: /([a-zA-Z])([&,\s]+)([a-zA-Z])/g,
  collegeRankingBaseURL: 'https://www.timeshighereducation.com',
  CSAltNames: {
    'University of Alabama': 'The University of Alabama',
    'University of Montana': 'The University of Montana',
    'University of Massachusetts Amherst':
      'University of Massachusetts-Amherst',
    'Indiana University Bloomington': 'Indiana University-Bloomington',
    'The College of St Scholastica': 'The College of Saint Scholastica',
    'Franklin & Marshall College': 'Franklin and Marshall College',
  },
  CSFieldNamesToDBFields: {
    INSTNM: 'collegeName',
    CITY: 'city',
    STABBR: 'state',
    ADM_RATE: 'admissionRatePercent',
    CONTROL: 'institutionType',
    GRAD_DEBT_MDN: 'medianCompletedStudentDebt',
    UG: 'size',
    UGDS: 'size',
  },
  regionToStateMapping: {
    West: [
      'AK',
      'AZ',
      'CA',
      'CO',
      'HI',
      'ID',
      'MT',
      'NM',
      'NV',
      'OR',
      'UT',
      'WA',
      'WY',
    ],
    Midwest: [
      'IA',
      'IL',
      'IN',
      'KS',
      'MI',
      'MN',
      'MO',
      'ND',
      'NE',
      'OH',
      'SD',
      'WI',
    ],
    South: [
      'AL',
      'AR',
      'DC',
      'DE',
      'FL',
      'GA',
      'KY',
      'LA',
      'MD',
      'MS',
      'NC',
      'OK',
      'SC',
      'TN',
      'TX',
      'VA',
      'WV',
    ],
    Northeast: ['CT', 'MA', 'ME', 'NH', 'NJ', 'NY', 'PA', 'RI', 'VT'],
  },
};
