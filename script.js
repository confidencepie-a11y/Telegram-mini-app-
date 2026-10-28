// Telegram Mini App integration (safe to run in a normal browser too)
const tg = window.Telegram && window.Telegram.WebApp;
const inTelegram = !!(tg && tg.initData !== undefined && tg.platform && tg.platform !== 'unknown');
const buzz = (type) => { try { if (inTelegram) tg.HapticFeedback[type === 'tab' ? 'selectionChanged' : 'impactOccurred']('light'); } catch (e) {} };

if (inTelegram) {
  document.documentElement.classList.add('tg');
  tg.ready();
  tg.expand();
  try { tg.setHeaderColor('#000000'); tg.setBackgroundColor('#000000'); tg.setBottomBarColor('#000000'); } catch (e) {}
  // The screen scrolls, so stop swipe-down from closing the app
  try { if (tg.isVersionAtLeast('7.7')) tg.disableVerticalSwipes(); } catch (e) {}
}

// Splash screen: show for 3.5 seconds (tap to skip), then reveal the app
(function () {
  const app = document.querySelector('.app');
  const splash = document.getElementById('splash');
  let done = false;
  const finish = () => {
    if (done) return; done = true;
    splash.classList.add('out');
    app.classList.add('ready');
    setTimeout(() => splash.remove(), 900);
  };
  setTimeout(finish, 3500);
  splash.addEventListener('click', finish);
})();

// Assets / Accounts toggle
const segButtons = document.querySelectorAll('.seg-btn');
segButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    buzz('tab');
    segButtons.forEach(b => b.classList.toggle('active', b === btn));
    document.getElementById('assets').classList.toggle('hidden', btn.dataset.tab !== 'assets');
    document.getElementById('accounts').classList.toggle('hidden', btn.dataset.tab !== 'accounts');
  });
});

// Bottom nav active state
const navButtons = document.querySelectorAll('.nav-btn');
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    buzz('tab');
    navButtons.forEach(b => b.classList.toggle('active', b === btn));
  });
});

// Haptics on quick actions and promo button
document.querySelectorAll('.action, .promo-btn').forEach(b => b.addEventListener('click', () => buzz('tap')));
