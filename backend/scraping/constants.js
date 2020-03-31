const fs = require('fs');
const collegeNames = fs
  .readFileSync('./colleges.txt')
  .toString()
  .replace(/\r\n/g, '\n')
  .split('\n');

module.exports = {
  collegeNames: collegeNames,
  collegeDataBaseURL: 'https://www.CollegeData.com',
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
    'Franklin & Marshall College': 'Franklin and Marshall College'
  },
  CSFieldNamesToDBFields: {
    INSTNM: 'collegeName',
    STABBR: 'state',
    ADM_RATE: 'admissionRatePercent',
    CONTROL: 'institutionType',
    GRAD_DEBT_MDN: 'medianCompletedStudentDebt',
    UG: 'size',
    UGDS: 'size'
  }
};
