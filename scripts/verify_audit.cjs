const fs = require('fs');
const vm = require('vm');

const root = process.cwd();
const html = fs.readFileSync(`${root}/index.html`, 'utf8');
const start = html.indexOf('const RAW_QUESTIONS = [');
const end = html.indexOf('\n];', start) + 3;
const context = {};
vm.createContext(context);
vm.runInContext(`${html.slice(start, end)};globalThis.questions=RAW_QUESTIONS`, context);
const questions = context.questions;
const errors = [];

function assert(value, message) { if (!value) errors.push(message); }

assert(questions.length === 298, `Expected 298 runtime questions, found ${questions.length}`);
assert(new Set(questions.map(q => q.id)).size === questions.length, 'Duplicate runtime question IDs found');

for (const q of questions) {
  const correct = q.answerOptions.filter(o => o.isCorrect).length;
  assert(correct > 0, `Question ${q.id} has no correct answer`);
  assert(q.answerOptions.length >= 2, `Question ${q.id} has fewer than two options`);
  q.answerOptions.forEach((option, index) => {
    assert(typeof option.text === 'string' && option.text.trim().length > 0, `Question ${q.id} option ${index + 1} has no text`);
    assert(typeof option.rationale === 'string' && option.rationale.trim().length > 0, `Question ${q.id} option ${index + 1} has no rationale`);
  });
  if (correct === 1) assert(!/select all that apply/i.test(q.question), `Question ${q.id} is single-select but says select all`);
  if (correct > 1) assert(/select all that apply/i.test(q.question), `Question ${q.id} is multi-select without instruction`);
  assert(['VERIFIED','UPDATED','NEEDS_MANUAL_REVIEW','DEPRECATED','DUPLICATE'].includes(q.validationStatus), `Question ${q.id} has invalid status`);
  assert(q.validatedAt === '2026-07-22', `Question ${q.id} has invalid validation date`);
  assert(Array.isArray(q.documentationUrls), `Question ${q.id} lacks documentationUrls`);
  assert(typeof q.documentationUrl === 'string', `Question ${q.id} lacks documentationUrl`);
  assert(typeof q.reviewNotes === 'string' && q.reviewNotes.length > 0, `Question ${q.id} lacks reviewNotes`);
  assert(Array.isArray(q.tags) && q.tags.length > 0, `Question ${q.id} lacks tags`);
  assert(typeof q.examTip === 'string' && q.examTip.length > 0, `Question ${q.id} lacks examTip`);
  if (q.validationStatus !== 'NEEDS_MANUAL_REVIEW' && q.validationStatus !== 'DEPRECATED') {
    assert(q.documentationUrls.length > 0, `Validated question ${q.id} lacks an official URL`);
  }
}

const expected = new Map([[19,0],[39,0],[74,0],[123,0],[144,0],[145,0],[146,0],[153,0],[154,0],[168,0],[171,0],[175,0],[176,0],[195,0],[202,0],[232,0],[236,2],[263,0],[273,0],[275,3],[296,1]]);
for (const [id, index] of expected) {
  const q = questions.find(item => item.id === id);
  assert(q.answerOptions.findIndex(o => o.isCorrect) === index, `Question ${id} has wrong audited answer index`);
}

const imported = JSON.parse(fs.readFileSync(`${root}/files/odc_udemy_questions_for_app_import (1).json`, 'utf8'));
assert(imported.length === 65, `Expected 65 import records, found ${imported.length}`);
for (const q of imported) {
  assert(q.validationStatus === 'NEEDS_MANUAL_REVIEW', `Import ${q.id} is not quarantined`);
  assert(Array.isArray(q.documentationUrls), `Import ${q.id} lacks documentationUrls`);
}

const en = fs.readFileSync(`${root}/files/ODC_QUESTIONS_CORRECTION_EN.md`, 'utf8');
const pt = fs.readFileSync(`${root}/files/CORRECAO_QUESTOES_ODC.md`, 'utf8');
for (const [number, letter] of [[5,'A'],[7,'D'],[10,'D'],[12,'A'],[28,'A']]) {
  assert(en.includes(`| ${number} | ${letter} |`), `English key Q${number} is not ${letter}`);
  assert(pt.includes(`| ${number} | ${letter} |`), `Portuguese key Q${number} is not ${letter}`);
}
assert(en.includes('### Question 5 — A') && en.includes('### Question 7 — D') && en.includes('### Question 12 — A'), 'English explained-answer headings are stale');
assert(pt.includes('### Questão 5 — A') && pt.includes('### Questão 7 — D') && pt.includes('### Questão 12 — A'), 'Portuguese explained-answer headings are stale');

for (const file of ['QUESTION_AUDIT_REPORT.md','CHANGELOG.md','NEEDS_MANUAL_REVIEW.md','CONTRADICTIONS.md']) {
  assert(fs.existsSync(`${root}/${file}`), `${file} is missing`);
  assert(fs.statSync(`${root}/${file}`).size > 500, `${file} is unexpectedly small`);
}

assert(html.includes('Why the other options are wrong'), 'Structured explanation renderer is missing');
assert(html.includes('Validation status'), 'Validation status is not rendered');
assert(html.includes('Official documentation'), 'Official documentation section is not rendered');

const statusCounts = questions.reduce((acc, q) => ((acc[q.validationStatus] = (acc[q.validationStatus] || 0) + 1), acc), {});
const urls = [...new Set(questions.flatMap(q => q.documentationUrls))].sort();
console.log(JSON.stringify({ runtimeQuestions: questions.length, importRecords: imported.length, statusCounts, multiSelect: questions.filter(q => q.answerOptions.filter(o => o.isCorrect).length > 1).map(q => q.id), uniqueDocumentationUrls: urls }, null, 2));

if (errors.length) {
  console.error(`\n${errors.length} validation error(s):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}
