const lodashFp = require('lodash-fp');

const translateQuestionType = type => {
  if (type === 'integer') {
    return 'number';
  }
  return type;
};

module.exports = (questionset, answers) => {
  const output = [];
  questionset.forEach(question => {
    output.push({
      id: question.id,
      type: translateQuestionType(question.type),
      text: question.question,
    });

    if (question.groups) {
      question.groups.forEach(group => {
        output.push(...['a', 'b', 'c']);
      });
    }
  });

  return output;
};
