const test = require('ava');
const exampleQuestionSet = require('../examples/questionset.json');
const exampleAnswers = require('../examples/answers.json');
const exampleOutput = require('../examples/expectedOutput.json');
const flattenTree = require('../lib/flattenTree');

test('flattens correctly the provided examples', t => {
  t.deepEqual(flattenTree(exampleQuestionSet, exampleAnswers), exampleOutput);
});
