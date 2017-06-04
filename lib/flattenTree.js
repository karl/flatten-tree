const { map, flatten } = require('lodash-fp');

const translateQuestionType = type => {
  if (type === 'integer') {
    return 'number';
  }
  return type;
};

const flattenQuestion = (question, answers, prefix) => {
  const output = [];
  const id = prefix + question.id;
  output.push({
    id,
    type: translateQuestionType(question.type),
    text: question.question,
  });

  if (question.groups) {
    question.groups.forEach(group => {
      const trigger = group.trigger;
      if (answers[id] === trigger) {
        const subPrefix = `${prefix}${question.id}-${trigger}-`;
        output.push(...flattenTree(group.questions, answers, subPrefix));
      }
    });
  }

  return output;
};

const flattenTree = (questionset, answers, prefix = '') => {
  const doFlattenQuestions = question =>
    flattenQuestion(question, answers, prefix);
  return flatten(map(doFlattenQuestions)(questionset));
};

module.exports = flattenTree;
