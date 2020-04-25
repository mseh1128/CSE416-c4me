const checkIfQuestionable = (studentData, collegeData, status) => {
  // console.log(studentData);
  // console.log(collegeData);
  // console.log(status);
  if (status === 'withdrawn' || status === 'pending') return false;
  const { highSchoolGPA, SATMath, SATEBRW, ACTComp } = studentData;
  const { GPA, SATMathScore, SATEBRWScore, ACTScore } = collegeData;
  let score = 0;
  if (highSchoolGPA && GPA) {
    score += (highSchoolGPA * 10 - GPA * 10) / 2;
  }
  if (SATMath && SATMathScore) {
    score += (SATMath - SATMathScore) / 25;
  }
  if (SATEBRW && SATEBRWScore) {
    score += (SATEBRW - SATEBRWScore) / 25;
  }
  if (ACTComp && ACTScore) {
    score += ACTComp - ACTScore;
  }
  if (status === 'accepted') {
    return score < -9 ? true : false;
  } else if (status === 'denied') {
    return score > 9 ? true : false;
  } else {
    // waitlisted or deferred
    return score > 7 ? true : false;
  }
};

module.exports = {
  checkIfQuestionable: checkIfQuestionable,
  getPrimaryCollegeStatsQuery:
    'SELECT GPA, SATMathScore, SATEBRWScore, ACTScore FROM college WHERE collegeName=?;',
  getPrimaryStudentStatsQuery:
    'SELECT highSchoolGPA, SATMath, SATEBRW, ACTComp FROM profile WHERE studentID=?;',
};
