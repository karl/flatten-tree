const lodashFp = require('lodash-fp');

const translateQuestionType = type => {
  if (type === 'integer') {
    return 'number';
  }
  return type;
};

module.exports = (questionset, answers) => {
  return questionset.map(question => {
    return {
      id: question.id,
      type: translateQuestionType(question.type),
      text: question.question,
    };
  });
};
