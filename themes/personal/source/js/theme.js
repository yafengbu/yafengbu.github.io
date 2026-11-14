/* ============================================================
   主题开关（白日 / 夜间）
   - 默认跟随系统偏好（prefers-color-scheme），系统切换时页面实时跟随
   - 点击开关 = 切到另一侧并锁定，覆盖系统偏好
   - 双击开关 = 取消锁定，恢复跟随系统
   - 偏好存 localStorage('site-theme')：'light' / 'dark' / 不存在（= 自动）
   ============================================================ */

(function () {
  var root = document.documentElement;
  var KEY = 'site-theme';
  var META_COLOR = { light: '#f6f9fd', dark: '#070b13' };
  var meta = document.querySelector('meta[name="theme-color"]');
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
  var sw = document.querySelector('[data-theme-toggle]');

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return v === 'light' || v === 'dark' ? v : null;
    } catch (e) {
      return null;
    }
  }

  function systemTheme() {
    return mq && mq.matches ? 'light' : 'dark';
  }

  function paint(theme) {
    var isDark = theme === 'dark';

    root.setAttribute('data-theme', theme);
    if (meta) meta.setAttribute('content', META_COLOR[theme] || META_COLOR.dark);

    if (sw) {
      sw.setAttribute('aria-checked', isDark ? 'true' : 'false');
      sw.setAttribute('title', stored() === null
        ? '跟随系统外观 · 点击切换'
        : '点击切换 · 双击恢复跟随系统');
    }
  }

  paint(stored() || systemTheme());

  if (sw) {
    // 单击：切换并锁定
    sw.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      paint(next);
    });

    // 双击：交回系统控制
    sw.addEventListener('dblclick', function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      paint(systemTheme());
    });
  }

  // 系统外观变化时，仅在用户未手动锁定跟随
  function onSystemChange(e) {
    if (stored() === null) paint(e.matches ? 'light' : 'dark');
  }
  if (mq) {
    if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }

  // 其它标签页切换 / 清除时同步
  window.addEventListener('storage', function (e) {
    if (e.key === KEY) paint(stored() || systemTheme());
  });
})();
