(() => {
  'use strict';

  const tokenPattern = /^[0-9a-f]{64}$/;
  const fragment = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1).trim().toLowerCase()
    : '';
  const inviteToken = tokenPattern.test(fragment) ? fragment : null;

  window.history.replaceState(
    null,
    document.title,
    `${window.location.pathname}${window.location.search}`,
  );

  const readyPanel = document.getElementById('ready-panel');
  const invalidPanel = document.getElementById('invalid-panel');
  const openButton = document.getElementById('open-app');
  const openStatus = document.getElementById('open-status');

  if (!inviteToken || !readyPanel || !invalidPanel || !openButton) {
    if (invalidPanel) invalidPanel.hidden = false;
    return;
  }

  readyPanel.hidden = false;

  openButton.addEventListener('click', () => {
    if (openStatus) {
      openStatus.textContent =
        'Opening LocTag… If nothing happens, confirm the test app is installed.';
    }
    window.location.assign(`loctag://invite/${inviteToken}`);
  });
})();
