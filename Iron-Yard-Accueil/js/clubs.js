const locator = document.querySelector('.club-locator');
const clubChoice = locator.querySelector('#club-choice');
const pins = locator.querySelectorAll('[data-club]');
const sheets = locator.querySelectorAll('[data-club-sheet]');

function selectClub(id) {
  clubChoice.value = id;
  pins.forEach(pin => pin.setAttribute('aria-pressed', String(pin.dataset.club === id)));
  sheets.forEach(sheet => { sheet.hidden = sheet.dataset.clubSheet !== id; });
}

pins.forEach(pin => pin.addEventListener('click', () => selectClub(pin.dataset.club)));
clubChoice.addEventListener('change', () => selectClub(clubChoice.value));
selectClub(clubChoice.value);
locator.hidden = false;
