document.addEventListener('DOMContentLoaded', () => {
  const adPopup = document.getElementById('annoying-ad');
  const closeBtn = document.getElementById('ad-close-btn');
  const secretLinkItem = document.getElementById('secret-link-item');
  const demonLink = document.querySelector('.glitch-link');

  let eyeWindow = null;
  let demonWindow = null;
  let hasRevealedLink = false;
  let adIndex = 0;
  let closeClickCount = 0; // 追蹤目前廣告叉叉被點擊的次數

  // 廣告內容清單，關閉後會循環出現不同廣告
  const adsList = [
    {
      title: "⚡ 系統警報！",
      promo: "您的系統偵測到 3 個未解決的惡魔檔案！",
      sub: "下載 <strong>WakiCleaner Pro</strong> 進行清除！",
      btn: "立即下載安全修復！"
    },
    {
      title: "💰 點擊即得！",
      promo: "只要輸入信箱，立即獲得免除期末考通行證！",
      sub: "<strong>100% 真實</strong>，已有 99 萬人成功取得！",
      btn: "領取通行證！"
    },
    {
      title: "👁️ 特殊通知！",
      promo: "牠正透過您的網路攝影機看著您...",
      sub: "不信嗎？<strong>點此查看</strong>您此時此刻的照片！",
      btn: "開啟鏡頭查看！",
      disclaimer: "*我們正在注視著您。"
    },
    {
      title: "🔥 限時優惠！",
      promo: "擊敗 waki demon 的唯一秘笈大特價！",
      sub: "限時 0.1 折，錯過再等一萬年！",
      btn: "立即購買秘笈！"
    }
  ];

  // 當點擊整個廣告區塊時 (點到叉叉以外的任何地方)
  adPopup.addEventListener('click', () => {
    // 確保大眼睛分頁僅會存在一個，如果已經開啟則將焦點移過去
    if (!eyeWindow || eyeWindow.closed) {
      eyeWindow = window.open('eye.html', 'eye_tab');
    } else {
      eyeWindow.focus();
    }
  });

  // 當點擊右上角的「叉叉 (X)」關閉廣告時
  closeBtn.addEventListener('click', (event) => {
    // 阻止點擊事件冒泡到廣告容器，以免觸發打開眼睛網頁的邏輯
    event.stopPropagation();

    // 如果是第一次點擊叉叉，強行彈出大眼睛，且不關閉廣告
    if (closeClickCount === 0) {
      closeClickCount = 1;
      if (!eyeWindow || eyeWindow.closed) {
        eyeWindow = window.open('eye.html', 'eye_tab');
      } else {
        eyeWindow.focus();
      }
      return; // 攔截，不執行關閉廣告的邏輯
    }

    // 第二次點擊叉叉，成功關閉廣告
    adPopup.style.display = 'none';
    
    // 重置叉叉點擊次數，讓下一個重新生成的廣告也是「第一次點點必觸發眼睛」
    closeClickCount = 0;

    // 只有第一次關閉廣告時才觸發閃爍與顯示連結
    if (!hasRevealedLink) {
      hasRevealedLink = true;
      
      document.body.classList.add('page-glitch-flicker');
      
      console.warn(
        '%c[WARNING]%c 系統核心記憶體遭不明實體 (ID: waki_demon) 滲透。\n已在「參見 (See Also)」區塊強制注入非常規超連結。',
        'color: red; font-weight: bold; font-size: 14px;',
        'color: inherit; font-size: 12px;'
      );

      secretLinkItem.classList.add('reveal');

      setTimeout(() => {
        document.body.classList.remove('page-glitch-flicker');
      }, 450);
    }

    // 3. 4秒後重新生成（顯示）一個新廣告
    setTimeout(() => {
      // 獲取下一個廣告的內容
      const nextAd = adsList[adIndex % adsList.length];
      adIndex++;

      // 更新廣告的 DOM 元素內容
      adPopup.querySelector('.ad-title').textContent = nextAd.title;
      adPopup.querySelector('.ad-promo').innerHTML = nextAd.promo;
      adPopup.querySelector('.ad-sub').innerHTML = nextAd.sub;
      adPopup.querySelector('.ad-click-btn').textContent = nextAd.btn;
      
      if (nextAd.disclaimer) {
        adPopup.querySelector('.ad-disclaimer').textContent = nextAd.disclaimer;
      } else {
        adPopup.querySelector('.ad-disclaimer').textContent = "*需同意本站的異常使用條款。本站無毒，請安心點擊。";
      }

      // 重新顯示廣告
      adPopup.style.display = 'block';
    }, 4000);
  });

  // 攔截 waki_demon 的連結點擊，確保惡魔分頁僅存在一個
  if (demonLink) {
    demonLink.addEventListener('click', (event) => {
      event.preventDefault(); // 阻止 a 標籤預設在新分頁開啟的重複點擊行為
      
      if (!demonWindow || demonWindow.closed) {
        demonWindow = window.open('waki_demon.html', 'demon_tab');
      } else {
        demonWindow.focus();
      }
    });
  }
});
