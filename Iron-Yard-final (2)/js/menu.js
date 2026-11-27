const trigger = document.querySelector('.menu-open');
const menu = document.querySelector('#club-navigation');

trigger.hidden = false;
trigger.addEventListener('click', () => menu.showModal());
menu.addEventListener('close', () => trigger.focus());
window.addEventListener('pagehide', () => menu.close());
