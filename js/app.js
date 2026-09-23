// CTFarsi Core Application Scripts
(function() {
  'use strict';

  // Active Challenge Authors Data
  var activeAuthors = [
    {
      github: 'm4tinbeigi-official',
      role: 'طراح ارشد سناریو و معمار چالش‌های Anti-AI',
      track: 'Web Exploitation, Logic Flaws & Binary Reversing'
    }
  ];

  // Render Active Authors Grid
  function renderActiveAuthors(containerId) {
    var grid = document.getElementById(containerId || 'authorsGrid');
    if (!grid) return;
    grid.textContent = '';

    activeAuthors.forEach(function(author) {
      var card = document.createElement('div');
      card.className = 'author-member-card';

      var avatar = document.createElement('img');
      avatar.className = 'author-member-avatar';
      avatar.src = 'https://github.com/' + author.github + '.png';
      avatar.alt = author.github;
      avatar.loading = 'lazy';

      var info = document.createElement('div');

      var handle = document.createElement('a');
      handle.className = 'author-member-handle mono';
      handle.href = 'https://github.com/' + author.github;
      handle.target = '_blank';
      handle.rel = 'noopener';
      handle.textContent = '@' + author.github;

      var role = document.createElement('div');
      role.className = 'author-member-role';
      role.textContent = author.role;

      var track = document.createElement('div');
      track.className = 'author-member-track';
      track.textContent = author.track;

      info.appendChild(handle);
      info.appendChild(role);
      info.appendChild(track);

      card.appendChild(avatar);
      card.appendChild(info);

      grid.appendChild(card);
    });
  }

  // Automatic GitHub Login (OAuth & 1-Click Session)
  function autoLoginGitHub() {
    var current = localStorage.getItem('ctfarsi_user');
    if (current) {
      updateAuthUI();
      return;
    }

    // Direct OAuth Authorization flow - No manual ID prompt
    var clientId = 'Ov23liDEMO_CTFARSI';
    var redirectUri = encodeURIComponent(window.location.origin + '/callback.html');
    var oauthUrl = 'https://github.com/login/oauth/authorize?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&scope=read:user';
    
    // Check if on GitHub Pages domain
    if (window.location.hostname.includes('github.io') || window.location.hostname === 'localhost') {
      // Direct redirect to GitHub OAuth
      window.location.href = oauthUrl;
    } else {
      window.location.href = oauthUrl;
    }
  }

  function logoutGitHub() {
    localStorage.removeItem('ctfarsi_user');
    updateAuthUI();
  }

  function updateAuthUI() {
    var raw = localStorage.getItem('ctfarsi_user');
    var loginBtn = document.getElementById('navLoginBtn');
    var userBadge = document.getElementById('navUserBadge');
    var authBanner = document.getElementById('authBannerBox');
    var regHandleInput = document.getElementById('regGithubHandle');

    if (raw) {
      try {
        var user = JSON.parse(raw);
        if (loginBtn) loginBtn.style.display = 'none';
        if (userBadge) {
          userBadge.style.display = 'inline-flex';
          var navImg = document.getElementById('navAvatarImg');
          var navName = document.getElementById('navUsernameSpan');
          if (navImg) navImg.src = user.avatar_url || ('https://github.com/' + user.login + '.png');
          if (navName) navName.textContent = '@' + user.login;
        }
        if (authBanner) {
          authBanner.style.display = 'flex';
          var bAvatar = document.getElementById('regBannerAvatar');
          var bName = document.getElementById('regBannerName');
          var bHandle = document.getElementById('regBannerHandle');
          if (bAvatar) bAvatar.src = user.avatar_url || ('https://github.com/' + user.login + '.png');
          if (bName) bName.textContent = user.name || user.login;
          if (bHandle) bHandle.textContent = '@' + user.login;
        }
        if (regHandleInput) {
          regHandleInput.value = user.login;
          regHandleInput.readOnly = true;
          regHandleInput.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
          regHandleInput.style.borderColor = 'var(--accent)';
        }
      } catch(e) {
        localStorage.removeItem('ctfarsi_user');
      }
    } else {
      if (loginBtn) loginBtn.style.display = 'inline-block';
      if (userBadge) userBadge.style.display = 'none';
      if (authBanner) authBanner.style.display = 'none';
      if (regHandleInput) {
        regHandleInput.readOnly = false;
        regHandleInput.style.backgroundColor = '';
        regHandleInput.style.borderColor = '';
      }
    }
  }

  // Load Registered Participants from GitHub Issues
  function loadParticipants() {
    var list = document.getElementById('participantsList');
    var countBadge = document.getElementById('participantCount');
    if (!list) return;

    fetch('https://api.github.com/repos/CTFarsi/ctfarsi.github.io/issues?labels=registration&state=all')
      .then(function(res) {
        if (!res.ok) throw new Error('Failed to fetch from GitHub API');
        return res.json();
      })
      .then(function(issues) {
        if (countBadge) countBadge.textContent = issues.length + ' شرکت‌کننده رسمی';
        list.textContent = '';

        if (issues.length === 0) {
          var emptyDiv = document.createElement('div');
          emptyDiv.className = 'mono';
          emptyDiv.style.color = 'var(--muted)';
          emptyDiv.style.fontSize = '13px';
          emptyDiv.textContent = 'هنوز تیمی ثبت‌نام نکرده است. اولین باشید!';
          list.appendChild(emptyDiv);
          return;
        }

        issues.forEach(function(issue) {
          var item = document.createElement('div');
          item.className = 'participant-item';

          var left = document.createElement('div');
          left.className = 'participant-info';

          var avatar = document.createElement('img');
          avatar.className = 'participant-avatar';
          avatar.src = issue.user.avatar_url;
          avatar.alt = issue.user.login;

          var details = document.createElement('div');

          var title = document.createElement('a');
          title.className = 'participant-name';
          title.href = issue.html_url;
          title.target = '_blank';
          title.rel = 'noopener';
          title.textContent = issue.title.replace(/^\[REGISTRATION\]:\s*/i, '');

          var meta = document.createElement('div');
          meta.className = 'participant-meta mono';
          meta.textContent = '@' + issue.user.login + ' • #' + issue.number;

          details.appendChild(title);
          details.appendChild(meta);
          left.appendChild(avatar);
          left.appendChild(details);

          var tag = document.createElement('span');
          tag.className = 'participant-tag mono';
          tag.textContent = 'VERIFIED';

          item.appendChild(left);
          item.appendChild(tag);
          list.appendChild(item);
        });
      })
      .catch(function(err) {
        if (countBadge) countBadge.textContent = '0 شرکت‌کننده ثبت‌شده';
        list.textContent = '';
        var errDiv = document.createElement('div');
        errDiv.className = 'mono';
        errDiv.style.color = 'var(--muted)';
        errDiv.style.fontSize = '13px';
        errDiv.textContent = 'اطلاعات از مخزن گیت‌هاب در حال همگام‌سازی است.';
        list.appendChild(errDiv);
      });
  }

  // Registration Submission Form Handler
  function submitRegistration() {
    var userRaw = localStorage.getItem('ctfarsi_user');
    var user = userRaw ? JSON.parse(userRaw) : null;
    var handle = user ? user.login : (document.getElementById('regGithubHandle') ? document.getElementById('regGithubHandle').value.trim().replace(/^@/, '') : 'anonymous');
    var team = document.getElementById('regTeamName') ? document.getElementById('regTeamName').value.trim() : handle;
    if (!team) team = handle || 'AnonymousTeam';
    var trackEl = document.getElementById('regTrack');
    var track = trackEl ? trackEl.value : 'Generalist';
    var bioEl = document.getElementById('regBio');
    var bio = bioEl ? bioEl.value.trim() : '';

    var issueTitle = encodeURIComponent('[REGISTRATION]: @' + handle + ' (' + team + ')');
    var issueBody = encodeURIComponent(
      '### فرم ثبت‌نام مسابقه CTFarsi\n\n' +
      '- **شناسه گیت‌هاب:** @' + handle + '\n' +
      '- **نام تیم / مستعار:** ' + team + '\n' +
      '- **شاخه تخصصی:** ' + track + '\n' +
      '- **توضیحات یا سوابق:** ' + (bio ? bio : 'ندارد') + '\n\n' +
      '#### تعهدات فنی\n' +
      '- [x] تعهد به عدم اجرای حملات ترافیکی (DoS/DDoS) علیه زیرساخت مسابقه\n' +
      '- [x] تعهد به عدم انتشار یا خرید و فروش فلگ‌ها تا پایان رسمی رقابت'
    );

    var url = 'https://github.com/CTFarsi/ctfarsi.github.io/issues/new?title=' + issueTitle + '&body=' + issueBody + '&labels=registration,participant';
    window.open(url, '_blank');
  }

  // Challenge Author Submission Handler
  function submitChallengeAuthor() {
    var userRaw = localStorage.getItem('ctfarsi_user');
    var user = userRaw ? JSON.parse(userRaw) : null;
    var name = document.getElementById('authorName') ? document.getElementById('authorName').value.trim() : '';
    if (!name && user) name = user.name || user.login;
    var category = document.getElementById('authorCategory') ? document.getElementById('authorCategory').value : 'Web Exploitation';
    var linkedin = document.getElementById('authorLinkedin') ? document.getElementById('authorLinkedin').value.trim() : '';
    var social = document.getElementById('authorSocial') ? document.getElementById('authorSocial').value.trim() : '';
    var idea = document.getElementById('authorIdea') ? document.getElementById('authorIdea').value.trim() : '';

    var issueTitle = encodeURIComponent('[CHALLENGE-AUTHOR]: ' + (name || 'Anonymous Author'));
    var issueBody = encodeURIComponent(
      '### فرم درخواست عضویت در تیم طراحی چالش‌های CTFarsi\n\n' +
      '- **نام و نام خانوادگی / مستعار:** ' + name + '\n' +
      '- **دسته‌بندی چالش پیشنهادی:** ' + category + '\n' +
      '- **لینکدین یا رزومه:** ' + (linkedin ? linkedin : 'ذکر نشده') + '\n' +
      '- **آیدی تلگرام یا شبکه اجتماعی جهت هماهنگی:** ' + (social ? social : 'ذکر نشده') + '\n\n' +
      '#### خلاصه ایده و سناریوی چالش\n' +
      (idea ? idea : 'ایده تکمیلی در جلسه فنی با منتورهای سازمان ارائه می‌شود.') + '\n\n' +
      '#### تعهدات طراحی\n' +
      '- [x] تضمین عدم افشای چالش، فلگ یا متغیرهای آن پیش از شروع رویداد\n' +
      '- [x] رعایت استانداردهای کانتینرسازی و مصرف رم استاندارد داکر (۲۵۶ مگابایت)\n' +
      '- [x] ارائه Exploit Script و Writeup کامل جهت تایید نهایی چالش'
    );

    var url = 'https://github.com/CTFarsi/ctfarsi.github.io/issues/new?title=' + issueTitle + '&body=' + issueBody + '&labels=challenge-proposal,author-application';
    window.open(url, '_blank');
  }

  // Expose global helpers
  window.autoLoginGitHub = autoLoginGitHub;
  window.logoutGitHub = logoutGitHub;
  window.submitRegistration = submitRegistration;
  window.submitChallengeAuthor = submitChallengeAuthor;

  // Initialization
  document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    renderActiveAuthors('authorsGrid');
    loadParticipants();

    // DevTools Console Warm-up Easter Egg
    console.log(
      "%c" +
      "   ____ _____ _____              _\n" +
      "  / ___|_   _|  ___|_ _ _ __ ___(_)\n" +
      " | |     | | | |_ / _` | '__/ __| |\n" +
      " | |___  | | |  _| (_| | |  \\__ \\ |\n" +
      "  \\____| |_| |_|  \\__,_|_|  |___/_|\n\n" +
      "CTFarsi Core DevTools Console\n" +
      "Official Telegram Channel: https://t.me/CTFarsiIR\n" +
      "Official Telegram Bot: https://t.me/CTFarsiBot\n\n" +
      "Warmup Challenge #0: Decode the hidden payload below:\n" +
      "Payload: Q1RGYXJzaXtjMG1tdW4xdHlfZjFyc3Rfbm9fNTAyX25vX2Y0azNfcHIxejM1fQ==\n\n" +
      "Type `ctfarsi.help()` to interact.",
      "color: #10b981; font-family: monospace; font-weight: bold; font-size: 13px;"
    );

    window.ctfarsi = {
      help: function() {
        console.log("[+] Commands: ctfarsi.flag(solution), ctfarsi.status(), ctfarsi.rules(), ctfarsi.telegram()");
      },
      flag: function(val) {
        if (!val) {
          console.warn("[!] Pass decoded flag: ctfarsi.flag('CTFarsi{...}')");
          return;
        }
        if (val === 'CTFarsi{c0mmun1ty_f1rst_n0_502_n0_f4k3_pr1z3s}') {
          console.log("%c[SUCCESS] First Blood unlocked! Welcome to CTFarsi.", "color: #38bdf8; font-weight: bold; font-size: 14px;");
        } else {
          console.error("[-] Incorrect flag. Decode the base64 payload properly.");
        }
      },
      status: function() {
        console.log("[+] Infrastructure: Healthy | Channel: @CTFarsiIR | Bot: @CTFarsiBot");
      },
      rules: function() {
        console.log("[+] Flag format: CTFarsi{...} | Max team: 4 | No DoS | Dynamic scoring");
      },
      telegram: function() {
        console.log("[+] Telegram Channel: https://t.me/CTFarsiIR | Bot: https://t.me/CTFarsiBot");
      }
    };
  });
})();
