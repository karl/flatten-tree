const { flow, flatMap, filter } = require('lodash/fp');

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

    const groupOutput = flow(
      filter({ trigger: answers[id] }),
      flatMap(group =>
        flattenTree(
          group.questions,
          answers,
          `${prefix}${question.id}-${group.trigger}-`
        )
      )
    )(question.groups || []);

    return [output, ...groupOutput];
  }, questionset);
};

module.exports = flattenTree;
