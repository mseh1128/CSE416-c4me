import React from 'react';

import Questionable from './Questionable.js';

class QuestionableList extends React.Component {
  render() {
    const removeQuestionable = this.props.removeQuestionable;
    const checkQuestionable = this.props.checkQuestionable;
    return (
      <div className="questionable-list section">
        {this.props.questionableDecisions.map((decision) => {
          const key = decision.collegeInfo.collegeName;
          return (
            <Questionable
              key={key}
              college={decision.collegeInfo}
              student={decision.studentInfo}
              removeQuestionable={removeQuestionable}
              checkQuestionable={checkQuestionable}
            />
          );
        })}
      </div>
    );
  }
}

export default QuestionableList;
