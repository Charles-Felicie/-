/* ============================================================
   AI 试妆独立页 —— 与主站统一的中/英/法三语与返回导航
   用法：页面在 </body> 前先声明 window.AI_TRYON 配置，再引入本文件。
     window.AI_TRYON = {titleKey, heroEl, heroKey, back}
   语言跟随主站 localStorage 键 'wa_lang'（zh | en | fr）。
   化妆品官方名称 / 色号保留原文，仅翻译界面文案。
   ============================================================ */
(function(){
  var KEY = 'wa_lang';
  var STR = {
    zh: {
      back:'首页', start:'马上开始', loading:'正在加载 AI 试妆模型，请稍候…',
      cam_err:'无法访问摄像头，请检查浏览器权限设置',
      model_err:'AI 模型加载失败，请检查网络后刷新重试',
      toast:'照片已保存', more:'多了解一下吧', quit:'退出',
      products:'你试过的美妆好物', plist_empty:'本次试妆还没有使用化妆品哦～',
      title_normal:'病房美学计划 · AI 试妆（用户端）', hero_normal:'体验美妆',
      title_ward:'病房美学计划 · AI 试妆（公益版）', hero_ward:'发现你的美',
      mode_a:'选择你的化妆品', mode_b:'情绪匹配',
      emo_title:'此刻的你，是什么心情？', emo_start:'开始试妆',
      emo_alert:'请先选择一个当下的心情哦～',
      cat_lipstick:'口红', cat_eyeshadow:'眼影', cat_eyeliner:'眼线', cat_eyebrow:'眉笔',
      cat_blush:'腮红', cat_foundation:'粉底', cat_hair:'染发',
      emo_happy_l:'开心', emo_happy_c:'为你搭配元气橘调妆容',
      emo_calm_l:'平静', emo_calm_c:'为你搭配清透裸妆',
      emo_tired_l:'疲惫', emo_tired_c:'为你搭配温柔提气妆容',
      emo_nervous_l:'紧张', emo_nervous_c:'为你搭配舒缓大地色妆容',
      emo_excited_l:'期待', emo_excited_c:'为你搭配闪耀派对妆容',
      emo_down_l:'低落', emo_down_c:'为你搭配暖色治愈妆容'
    },
    en: {
      back:'Home', start:'Start Now', loading:'Loading the AI try-on model, please wait…',
      cam_err:'Cannot access the camera. Please check your browser permissions.',
      model_err:'Failed to load the AI model. Please check your network and refresh.',
      toast:'Photo saved', more:'Learn More', quit:'Exit',
      products:'Beauty Products You Tried', plist_empty:'No makeup products used in this try-on yet.',
      title_normal:'Ward Aesthetics Program · AI Makeup Try-On (User)', hero_normal:'Experience Beauty',
      title_ward:'Ward Aesthetics Program · AI Makeup Try-On (Charity)', hero_ward:'Discover Your Beauty',
      mode_a:'Choose Your Products', mode_b:'Mood Match',
      emo_title:'How do you feel right now?', emo_start:'Start Try-On',
      emo_alert:'Please pick a mood first.',
      cat_lipstick:'Lipstick', cat_eyeshadow:'Eyeshadow', cat_eyeliner:'Eyeliner', cat_eyebrow:'Eyebrow',
      cat_blush:'Blush', cat_foundation:'Foundation', cat_hair:'Hair Color',
      emo_happy_l:'Happy', emo_happy_c:'An energetic orange-toned look for you',
      emo_calm_l:'Calm', emo_calm_c:'A fresh, natural nude look for you',
      emo_tired_l:'Tired', emo_tired_c:'A soft, lifting look to refresh you',
      emo_nervous_l:'Nervous', emo_nervous_c:'A soothing earthy-toned look for you',
      emo_excited_l:'Excited', emo_excited_c:'A sparkling party look for you',
      emo_down_l:'Down', emo_down_c:'A warm, healing look for you'
    },
    fr: {
      back:'Accueil', start:'Commencer', loading:"Chargement du modèle d'essai maquillage, veuillez patienter…",
      cam_err:"Impossible d'accéder à la caméra. Vérifiez les autorisations du navigateur.",
      model_err:"Échec du chargement du modèle IA. Vérifiez le réseau et actualisez.",
      toast:'Photo enregistrée', more:'En savoir plus', quit:'Quitter',
      products:'Les produits beauté que vous avez essayés',
      plist_empty:"Aucun produit utilisé lors de cet essai pour le moment.",
      title_normal:"Programme d'esthétique hospitalière · Essai maquillage IA (Usager)",
      hero_normal:'Découvrez le maquillage',
      title_ward:"Programme d'esthétique hospitalière · Essai maquillage IA (Caritatif)",
      hero_ward:'Révélez votre beauté',
      mode_a:'Choisissez vos produits', mode_b:"Selon l'humeur",
      emo_title:'Comment vous sentez-vous en ce moment ?', emo_start:"Lancer l'essai",
      emo_alert:"Veuillez d'abord choisir une humeur.",
      cat_lipstick:'Rouge à lèvres', cat_eyeshadow:'Fard à paupières', cat_eyeliner:'Eyeliner',
      cat_eyebrow:'Sourcils', cat_blush:'Fard à joues', cat_foundation:'Fond de teint', cat_hair:'Coloration',
      emo_happy_l:'Joyeux', emo_happy_c:"Un look orangé plein d'énergie pour vous",
      emo_calm_l:'Calme', emo_calm_c:'Un nude frais et naturel pour vous',
      emo_tired_l:'Fatigué', emo_tired_c:'Un look doux et bonne mine pour vous',
      emo_nervous_l:'Nerveux', emo_nervous_c:'Un look apaisant aux tons terre pour vous',
      emo_excited_l:'Enthousiaste', emo_excited_c:'Un look de fête éclatant pour vous',
      emo_down_l:'Abattu', emo_down_c:'Un look chaleureux et réconfortant pour vous'
    }
  };

  var cfg = window.AI_TRYON || {};
  var cur = 'zh';
  try{
    var v = JSON.parse(localStorage.getItem(KEY) || '"zh"');
    if(STR[v]) cur = v;
  }catch(e){}
  var d = STR[cur], z = STR.zh;
  function pick(k){ return d[k] !== undefined ? d[k] : z[k]; }
  window.AI_t = function(k){ return pick(k) || k; };

  function st(id, val){ var el = document.getElementById(id); if(el) el.textContent = val; }

  document.documentElement.lang = cur === 'zh' ? 'zh-CN' : cur;
  document.title = pick(cfg.titleKey || 'title_normal');
  if(cfg.heroEl){
    var h1 = document.querySelector(cfg.heroEl);
    if(h1) h1.textContent = pick(cfg.heroKey || 'hero_normal');
  }
  st('backLabel', pick('back'));
  st('btn-start', pick('start'));
  st('loading-mask', pick('loading'));
  st('toast', pick('toast'));
  st('toast-emo', pick('toast'));
  st('btn-more', pick('more'));
  st('btn-quit', pick('quit'));
  st('btn-mode-pick', pick('mode_a'));
  st('btn-mode-emotion', pick('mode_b'));
  st('btn-emotion-start', pick('emo_start'));
  var emoT = document.querySelector('.emotion-title');
  if(emoT) emoT.textContent = pick('emo_title');
  var plistH = document.querySelector('.plist-header h2');
  if(plistH) plistH.textContent = pick('products');

  var sel = document.getElementById('langSel');
  if(sel){
    sel.value = cur;
    sel.onchange = function(){
      try{ localStorage.setItem(KEY, JSON.stringify(this.value)); }catch(e){}
      location.reload();
    };
  }
  var back = document.getElementById('btn-back');
  if(back) back.onclick = function(){ location.href = cfg.back || 'index.html'; };

  /* 分类名与情绪：按 key 翻译，原文保留在 STR.zh 中 */
  try{
    DATA.forEach(function(cat){ cat.label = pick('cat_' + cat.key) || cat.label; });
  }catch(e){}
  try{
    Object.keys(EMOTIONS).forEach(function(k){
      var l = pick('emo_' + k + '_l'), c = pick('emo_' + k + '_c');
      if(l) EMOTIONS[k].label = l;
      if(c) EMOTIONS[k].caption = c;
    });
  }catch(e){}
})();
