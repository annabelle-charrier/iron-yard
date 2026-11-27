const params = new URLSearchParams(window.location.search);
const club = params.get('club');
const labels = new Map([
  ['essai', 'Séance d’essai'],
  ['regular', 'Adhésion Club'],
  ['unlimited', 'Adhésion Signature'],
  ['hyrox', 'Cycle HYROX'],
  ['crossfit', 'Cycle CrossFit'],
  ['athx', 'Cycle ATHX Games']
]);
const objectif = labels.get(params.get('objectif'));
const selection = [club, objectif].filter(Boolean).join(' · ');

if (selection) {
  const context = document.querySelector('#contexte-demande');
  context.textContent = `À indiquer dans le questionnaire : ${selection}.`;
  context.hidden = false;
}
