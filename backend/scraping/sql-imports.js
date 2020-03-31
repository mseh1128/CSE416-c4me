const scrapeCollegeScorecard = require('./college-scorecard');
const scrapeCollegeData = require('./college-data');
const scrapeCollegeRanking = require('./college-ranking');

// all scraping functions return promises!

const collegeDataToSQL = async () => {
  const collegeData = await scrapeCollegeData();
  console.log(collegeData);
};

const collegeRankingToSQL = () => {};

const collegeScorecardToSQL = () => {};

collegeDataToSQL();

//  'Williams College':
//    { name: 'Williams College',
//      InStateAttendanceCost: 75520,
//      OutStateAttendanceCost: 75520,
//      completionRate: '89.6',
//      majors:
//       [ 'American/United States Studies/Civilization',
//         'Anthropology',
//         'Area Studies, Other',
//         'Art History, Criticism and Conservation',
//         'Art/Art Studies, General',
//         'Asian Studies/Civilization',
//         'Astronomy',
//         'Astrophysics',
//         'Biology/Biological Sciences, General',
//         'Chemistry, General',
//         'Chinese Language and Literature',
//         'Classics and Classical Languages, Literatures, and Linguistics, General',
//         'Comparative Literature',
//         'Computer Science',
//         'Development Economics and International Development',
//         'Drama and Dramatics/Theatre Arts, General',
//         'Econometrics and Quantitative Economics',
//         'English Language and Literature, General',
//         'Environmental Science',
//         'Environmental Studies',
//         'Ethnic, Cultural Minority, Gender, and Group Studies, Other',
//         'French Language and Literature',
//         'Geology/Earth Science, General',
//         'German Language and Literature',
//         'History, General',
//         'Japanese Language and Literature',
//         'Mathematics, General',
//         'Multi-/Interdisciplinary Studies, Other',
//         'Music, General',
//         'Near and Middle Eastern Studies',
//         'Philosophy',
//         'Physics, General',
//         'Political Economy',
//         'Political Science and Government, General',
//         'Psychology, General',
//         'Religion/Religious Studies',
//         'Russian Language and Literature',
//         'Social Sciences, Other',
//         'Sociology',
//         'Spanish Language and Literature',
//         'Statistics, General',
//         'Women\'s Studies' ],
//      avgGPA: NaN,
//      avgSATMath: 745,
//      avgSATEBRW: 729,
//      avgACTComposite: 33 }
