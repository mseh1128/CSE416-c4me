import React from 'react';

import Questionable from './Questionable.js';

class QuestionableList extends React.Component {
  render() {
    const removeQuestionable = this.props.removeQuestionable;
    const checkQuestionable = this.props.checkQuestionable;
    return (
      <div className="questionable-list section">
        {this.props.questionableDecisions.map((decision, idx) => {
          return (
            <Questionable
              key={idx}
              index={idx}
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
