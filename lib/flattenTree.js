const { flatMap, filter } = require('lodash/fp');

const translateQuestionType = type => {
  if (type === 'integer') {
    return 'number';
  }
  return type;
};

const flattenTree = (questionset, answers, prefix = '') => {
  return flatMap(question => {
    const id = prefix + question.id;
    const output = {
      id,
      type: translateQuestionType(question.type),
      text: question.question,
    };

    const groupOutput = flatMap(group => {
      const subPrefix = `${prefix}${question.id}-${group.trigger}-`;
      return flattenTree(group.questions, answers, subPrefix);
    }, filter({ trigger: answers[id] }, question.groups || []));

    return [output, ...groupOutput];
  }, questionset);
};

module.exports = flattenTree;
