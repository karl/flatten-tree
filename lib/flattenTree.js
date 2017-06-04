const lodashFp = require('lodash-fp');

module.exports = (questionset, answers) => {
  return questionset.map(question => {
    return {
      id: question.id,
      type: question.type,
      text: question.question,
    };
  });
};
