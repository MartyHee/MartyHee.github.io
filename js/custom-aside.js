(function () {
  function createClockCard() {
    const aside = document.querySelector('#aside-content');
    if (!aside || document.querySelector('.card-clock')) return;

    const card = document.createElement('div');
    card.className = 'card-widget card-clock';
    card.innerHTML = `
      <div class="clock-title">当前时间</div>
      <div class="clock-time" id="custom-clock-time">--:--:--</div>
      <div class="clock-date" id="custom-clock-date">----/--/--</div>
    `;

    aside.prepend(card);

    function updateClock() {
      const now = new Date();

      const time = now.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      const date = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short'
      });

      const timeEl = document.getElementById('custom-clock-time');
      const dateEl = document.getElementById('custom-clock-date');

      if (timeEl) timeEl.textContent = time;
      if (dateEl) dateEl.textContent = date;
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  function createGithubContributionInMain() {
    // 只在首页插入 GitHub 贡献图，避免文章详情页也重复出现
    const isHomePage =
      location.pathname === '/' ||
      location.pathname === '/index.html';

    if (!isHomePage) return;
    if (document.querySelector('.github-contribution-main')) return;

    const recentPosts = document.querySelector('#recent-posts');
    if (!recentPosts) return;

    const card = document.createElement('div');
    card.className = 'recent-post-item github-contribution-main';
    card.innerHTML = `
      <div class="github-contribution-card">
        <div class="github-contribution-title">GitHub 贡献图</div>
        <a href="https://github.com/MartyHee" target="_blank" rel="noopener">
          <img src="https://ghchart.rshah.org/MartyHee" alt="MartyHee GitHub Contributions">
        </a>
      </div>
    `;

    recentPosts.prepend(card);
  }

  function initCustomWidgets() {
    createClockCard();
    createGithubContributionInMain();
  }

  document.addEventListener('DOMContentLoaded', initCustomWidgets);
  document.addEventListener('pjax:complete', initCustomWidgets);
})();