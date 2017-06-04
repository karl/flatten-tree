const lodashFp = require('lodash-fp');

const translateQuestionType = type => {
  if (type === 'integer') {
    return 'number';
  }
  return type;
};

const flattenTree = (questionset, answers, prefix = '') => {
  const output = [];
  questionset.forEach(question => {
    output.push({
      id: prefix + question.id,
      type: translateQuestionType(question.type),
      text: question.question,
    });

    if (question.groups) {
      question.groups.forEach(group => {
        const subPrefix = `${prefix}${question.id}-${group.trigger}-`;
        output.push(...flattenTree(group.questions, answers, subPrefix));
      });
    }
  });

  return output;
};

module.exports = flattenTree;
