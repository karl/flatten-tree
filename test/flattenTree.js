const test = require('ava');
const exampleQuestionSet = require('../examples/questionset.json');
const exampleAnswers = require('../examples/answers.json');
const exampleOutput = require('../examples/expectedOutput.json');
const flattenTree = require('../lib/flattenTree');

test('flattens correctly the provided examples', t => {
  t.deepEqual(flattenTree(exampleQuestionSet, exampleAnswers), exampleOutput);
});

test('returns empty array when there are no questions', t => {
  t.deepEqual(flattenTree([], exampleAnswers), []);
});

test('only returns root questions when there are no answers', t => {
  const onlyRootQuestions = [
    {
      id: 'question1',
      type: 'text',
      text: 'Please answer this question',
    },
    {
      id: 'question2',
      type: 'number',
      text: 'Please answer this other question',
    },
    {
      id: 'question3',
      type: 'yesno',
      text: 'Let us know about this',
    },
    {
      id: 'question4',
      type: 'yesno',
      text: 'Let us know about something else',
    },
  ];
  t.deepEqual(flattenTree(exampleQuestionSet, []), onlyRootQuestions);
});
