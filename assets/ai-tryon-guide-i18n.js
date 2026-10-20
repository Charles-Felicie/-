/* ============================================================
   AI 试妆 · 使用说明页 —— 中 / 英 / 法 三语 + 标题旁语言切换按钮
   用法：在页面 </body> 前（使用说明区块之后、主脚本之前）引入本文件。
   语言与主站保持一致：localStorage 键 'wa_lang'（zh | en | fr）。
   页面通过 data-i18n（正文）与 data-i18n-alt（图片 alt）标记需要翻译的节点。
   ============================================================ */
(function(){
  var KEY = 'wa_lang';
  var STR = {
    zh: {
      g_title:'AI 试妆 · 使用说明', g_confirm:'确认',
      w_p1:'这是一个基于摄像头的实时试妆功能：打开摄像头后，妆效会实时出现在你的脸上。整个过程无需安装任何软件，也不会上传你的照片。',
      w_c1:'① 打开页面后，点击左侧的「马上开始」按钮',
      w_p2:'接下来会出现两种模式供你选择：「选择你的化妆品」可以自由挑选喜欢的颜色；「情绪匹配」会根据你当下的心情，自动帮你搭配好一整套妆容。',
      w_c2:'① 自由挑选化妆品　② 按心情智能搭配妆容',
      w_p3:'选择「选择你的化妆品」后：底部点击品类（口红 / 眼影 / 腮红等）会直接显示这个品类的所有色号，点击色号即可上妆，再次点击同一个色号妆效消失。',
      w_c3:'① 你的实时画面　② 保存试妆照片　③ 退出　④ 底部品类栏',
      w_p4:'选择「情绪匹配」后：先点击一个符合你当下心情的按钮，再点击下方「开始试妆」，系统就会自动为你搭配好妆容。',
      w_c4:'① 点击选择当下的心情　② 点击「开始试妆」自动上妆',
      w_p5:'试妆完成后，点击右上角的「下载」图标可以把照片保存下来；点击「×」可以直接退出回到首页。',
      w_a1:'首页示意', w_a2:'模式选择示意', w_a3:'试妆界面示意', w_a4:'情绪选择示意',
      n_p1:'这是一个基于摄像头的实时试妆功能：打开摄像头后，点击喜欢的化妆品色号，妆效会立刻出现在你的脸上。整个过程无需安装任何软件，也不会上传你的照片。',
      n_c1:'① 打开页面后，点击左侧的「马上开始」按钮，进入试妆界面',
      n_p2:'第一次进入时，浏览器会请求摄像头权限，请点击「允许」。画面是镜像显示的，就像平时照镜子一样。',
      n_c2:'① 你的实时画面　② 保存试妆照片　③ 退出　④ 底部品类栏',
      n_p3:'在底部点击品类（口红 / 眼影 / 眼线 / 眉笔 / 腮红 / 粉底），再点击喜欢的款式，然后点击色号即可上妆；再次点击同一个色号，妆效就会消失。',
      n_c3:'① 返回上一级　② 点击色号立即上妆　③ 鼠标悬停色号，可以看到这个颜色的文案',
      n_p4:'试妆完成后，点击右上角的「下载」图标可以把照片保存到相册；点击「×」可以查看本次用过的全部化妆品清单，或者直接退出回到首页。',
      n_a1:'首页示意', n_a2:'试妆界面示意', n_a3:'色号选择示意'
    },
    en: {
      g_title:'AI Makeup Try-On · User Guide', g_confirm:'Confirm',
      w_p1:'This is a camera-based real-time makeup try-on: once the camera is on, the makeup appears on your face in real time. No software to install, and your photos are never uploaded.',
      w_c1:'① On the page, tap “Start Now” on the left',
      w_p2:'Two modes are available: “Choose Your Products” lets you freely pick the colors you like, while “Mood Match” automatically builds a full look from how you feel right now.',
      w_c2:'① Freely pick your products　② Smart mood-based look',
      w_p3:'After choosing “Choose Your Products”: tapping a category at the bottom (lipstick / eyeshadow / blush, etc.) shows all shades in that category. Tap a shade to apply it; tap the same shade again to remove it.',
      w_c3:'① Your live view　② Save the try-on photo　③ Exit　④ Category bar at the bottom',
      w_p4:'After choosing “Mood Match”: first tap the button that matches your current mood, then tap “Start Try-On” below, and the system will build the look for you.',
      w_c4:'① Tap to pick your current mood　② Tap “Start Try-On” to apply automatically',
      w_p5:'When you are done, tap the “Download” icon at the top right to save the photo, or tap “×” to exit back to the home page.',
      w_a1:'Home screen', w_a2:'Mode selection', w_a3:'Try-on screen', w_a4:'Mood selection',
      n_p1:'This is a camera-based real-time makeup try-on: once the camera is on, tap a shade you like and the makeup appears on your face instantly. No software to install, and your photos are never uploaded.',
      n_c1:'① On the page, tap “Start Now” on the left to enter the try-on screen',
      n_p2:'On your first visit, the browser will ask for camera permission—please tap “Allow”. The view is mirrored, just like looking in a mirror.',
      n_c2:'① Your live view　② Save the try-on photo　③ Exit　④ Category bar at the bottom',
      n_p3:'At the bottom, tap a category (lipstick / eyeshadow / eyeliner / eyebrow / blush / foundation), then a style, then a shade to apply it; tap the same shade again to remove it.',
      n_c3:'① Back to the previous level　② Tap a shade to apply it instantly　③ Hover a shade to see its description',
      n_p4:'When you are done, tap the “Download” icon at the top right to save the photo to your album, or tap “×” to see the list of all products used this time, or exit back to the home page.',
      n_a1:'Home screen', n_a2:'Try-on screen', n_a3:'Shade selection'
    },
    fr: {
      g_title:'Essai maquillage IA · Mode d\'emploi', g_confirm:'Confirmer',
      w_p1:"Il s'agit d'un essai maquillage en temps réel via la caméra : une fois la caméra activée, le maquillage apparaît en direct sur votre visage. Aucune installation, et vos photos ne sont jamais envoyées.",
      w_c1:'① Sur la page, appuyez sur « Commencer » à gauche',
      w_p2:"Deux modes s'offrent à vous : « Choisissez vos produits » pour sélectionner librement les couleurs que vous aimez, et « Selon l'humeur » pour composer automatiquement un look complet selon votre humeur du moment.",
      w_c2:'① Choisissez librement vos produits　② Un look intelligent selon l\'humeur',
      w_p3:"Après avoir choisi « Choisissez vos produits » : appuyez sur une catégorie en bas (rouge à lèvres / fard à paupières / fard à joues, etc.) pour afficher toutes ses teintes. Appuyez sur une teinte pour l'appliquer ; appuyez à nouveau sur la même teinte pour la retirer.",
      w_c3:'① Votre image en direct　② Enregistrer la photo d\'essai　③ Quitter　④ Barre des catégories en bas',
      w_p4:"Après avoir choisi « Selon l'humeur » : appuyez d'abord sur le bouton correspondant à votre humeur, puis sur « Lancer l'essai » en dessous ; le système compose alors le maquillage pour vous.",
      w_c4:'① Appuyez pour choisir votre humeur　② Appuyez sur « Lancer l\'essai » pour appliquer automatiquement',
      w_p5:"Une fois terminé, appuyez sur l'icône « Télécharger » en haut à droite pour enregistrer la photo, ou sur « × » pour revenir à l'accueil.",
      w_a1:"Écran d'accueil", w_a2:'Choix du mode', w_a3:"Écran d'essai", w_a4:"Choix de l'humeur",
      n_p1:"Il s'agit d'un essai maquillage en temps réel via la caméra : une fois la caméra activée, appuyez sur une teinte que vous aimez et le maquillage apparaît aussitôt sur votre visage. Aucune installation, et vos photos ne sont jamais envoyées.",
      n_c1:"① Sur la page, appuyez sur « Commencer » à gauche pour accéder à l'écran d'essai",
      n_p2:"À la première visite, le navigateur demande l'autorisation d'accéder à la caméra : appuyez sur « Autoriser ». L'image est en miroir, comme dans un vrai miroir.",
      n_c2:'① Votre image en direct　② Enregistrer la photo d\'essai　③ Quitter　④ Barre des catégories en bas',
      n_p3:"En bas, appuyez sur une catégorie (rouge à lèvres / fard à paupières / eyeliner / sourcils / fard à joues / fond de teint), puis sur un style, puis sur une teinte pour l'appliquer ; appuyez à nouveau sur la même teinte pour la retirer.",
      n_c3:"① Revenir au niveau précédent　② Appuyez sur une teinte pour l'appliquer immédiatement　③ Survolez une teinte pour voir sa description",
      n_p4:"Une fois terminé, appuyez sur l'icône « Télécharger » en haut à droite pour enregistrer la photo dans votre galerie, ou sur « × » pour voir la liste de tous les produits utilisés, ou revenir à l'accueil.",
      n_a1:"Écran d'accueil", n_a2:"Écran d'essai", n_a3:'Choix des teintes'
    }
  };

  var ORDER = ['zh', 'en', 'fr'];
  var LABEL = { zh:'中', en:'EN', fr:'FR' };
  var cur = 'zh';
  try{
    var v = JSON.parse(localStorage.getItem(KEY) || '"zh"');
    if(STR[v]) cur = v;
  }catch(e){}

  function t(k){
    var d = STR[cur] || STR.zh;
    return d[k] !== undefined ? d[k] : (STR.zh[k] !== undefined ? STR.zh[k] : k);
  }

  function renderBtn(){
    var btn = document.getElementById('guideLangBtn');
    if(!btn) return;
    btn.innerHTML = ORDER.map(function(k){
      return '<span class="' + (k === cur ? 'on' : '') + '">' + LABEL[k] + '</span>';
    }).join('<i>/</i>');
    btn.setAttribute('aria-label', cur === 'zh' ? '切换语言' : (cur === 'fr' ? 'Changer de langue' : 'Switch language'));
  }

  function apply(){
    var root = document.getElementById('page-guide');
    if(!root) return;
    root.querySelectorAll('[data-i18n]').forEach(function(el){
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    root.querySelectorAll('[data-i18n-alt]').forEach(function(el){
      el.setAttribute('alt', t(el.getAttribute('data-i18n-alt')));
    });
    renderBtn();
    document.documentElement.lang = cur === 'zh' ? 'zh-CN' : cur;
  }

  window.guideCycleLang = function(){
    var i = ORDER.indexOf(cur);
    cur = ORDER[(i + 1) % ORDER.length];
    try{ localStorage.setItem(KEY, JSON.stringify(cur)); }catch(e){}
    apply();
  };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', apply);
  }else{
    apply();
  }
})();
