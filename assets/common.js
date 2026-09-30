/* ============================================================
   Ward Aesthetics Program — Shared JS
   Unified storage + data model across charity / normal / admin
   ============================================================ */

/* ---------------- Storage (wa_ namespace) ---------------- */
const Store = {
  get(k, d){
    try{ const v = localStorage.getItem('wa_' + k); return v === null ? d : JSON.parse(v); }
    catch(e){ return d; }
  },
  set(k, v){ localStorage.setItem('wa_' + k, JSON.stringify(v)); }
};
const $ = id => document.getElementById(id);

/* ---------------- Shared constants ---------------- */
/* Color numbers only (no product links / shopping disabled for now) */
const COLORS = [
  ['P01','#C9553A'],['P02','#E76F51'],['P03','#F4A261'],
  ['P04','#E9C46A'],['P05','#8A6F5C'],['P06','#5B4232'],
  ['P07','#D88C9A'],['P08','#A8DADC'],['P09','#6D6875'],
  ['P10','#84A59D'],['P11','#F2CC8F'],['P12','#3D405B'],
];
const RECOMMENDED = ['P01','P03','P04','P10'];
const GOODS = [
  ['🧴','lotion','润肤乳（公益装）'],['💄','lipstick','口红（爱心捐赠）'],
  ['🧼','soap','手工香皂'],['🎨','artkit','绘画材料包']
];
const MOODS = [
  ['happy','开心','😊','为你匹配元气橘调妆容'],
  ['calm','平静','😌','为你匹配清透裸妆'],
  ['tired','疲惫','😪','为你匹配温柔提气妆容'],
  ['anxious','紧张','😟','为你匹配舒缓大地色妆容'],
  ['excited','期待','🤩','为你匹配闪耀派对妆'],
  ['low','低落','😔','为你匹配暖色治愈妆'],
];

/* ---------------- Session ---------------- */
function getSession(){ return Store.get('session', null); }      // {type:'n'|'c', name}
function setSession(type, name){ Store.set('session', {type, name}); }
function clearSession(){ Store.set('session', null); }

/* ---------------- User accounts ---------------- */
function getUsers(type){ return Store.get('users_' + type, {}); }   // type: 'n' | 'c'
function saveUsers(type, u){ Store.set('users_' + type, u); }
function ensureUserObj(u){
  return Object.assign({avatar:null, follows:[], cart:[], delC:0, delW:0, nickname:''}, u);
}

/* ---------------- Works ---------------- */
function getWorks(type, name){ return Store.get('works_' + type + '_' + name, []); }
function saveWorks(type, name, list){ Store.set('works_' + type + '_' + name, list); }
/*
  work = {
    id, img, colors:[P01,...], time,
    sel: 'pending' | 'selected' | 'rejected',   // admin selection (normal works)
    gal: 1 | 0,                                  // gallery visibility (admin delete)
    likes: n, distId
  }
*/
function allWorks(type){
  const users = getUsers(type), out = [];
  Object.keys(users).forEach(name => {
    getWorks(type, name).forEach(w => out.push(Object.assign({}, w, {owner:name, type})));
  });
  return out;
}
function galleryWorks(){
  return allWorks('n').concat(allWorks('c')).filter(w => w.gal !== 0);
}
function updateWork(type, owner, id, patch){
  const list = getWorks(type, owner);
  const w = list.find(x => x.id === id);
  if(w){ Object.assign(w, patch); saveWorks(type, owner, list); }
  return w;
}

/* ---------------- Comments (gallery chat) ---------------- */
function getComments(){ return Store.get('comments', []); }
function saveComments(list){ Store.set('comments', list); }
/* {id, type:'n'|'c', user, text, time, del:0|1} */
function addComment(type, user, text){
  const list = getComments();
  const c = {id:Date.now() + Math.floor(Math.random()*999), type, user, text, time:nowText(), del:0};
  list.push(c); saveComments(list); return c;
}

/* ---------------- Records (likes / comments per user) ---------------- */
function getRecords(type, name){ return Store.get('records_' + type + '_' + name, []); }
function addRecord(type, name, rec){
  const list = getRecords(type, name);
  list.unshift(Object.assign({time:nowText()}, rec));
  Store.set('records_' + type + '_' + name, list);
}

/* ---------------- Distributions (admin selected -> charity) ---------------- */
function getDist(){ return Store.get('dist', []); }
function saveDist(list){ Store.set('dist', list); }
/*
  {id, workId, img, colors, painter, charity,
   status:'waiting'|'accepted'|'rejected', time,
   photo, thanks, replies:[{text,time}]}
*/
function addDistribution(work){
  const list = getDist();
  const charityUsers = Object.keys(getUsers('c'));
  if(!charityUsers.length) return null;
  const charity = charityUsers[Math.floor(Math.random()*charityUsers.length)];
  const d = {
    id:Date.now(), workId:work.id, img:work.img, colors:work.colors||[],
    painter:work.owner, charity,
    status:'waiting', time:nowText(),
    photo:null, thanks:null, replies:[]
  };
  list.push(d); saveDist(list);
  return d;
}

/* ---------------- Messages ---------------- */
function getMsgs(type, name){ return Store.get('msgs_' + type + '_' + name, []); }
function addMsg(type, name, m){
  const list = getMsgs(type, name);
  list.unshift(Object.assign({time:nowText(), read:false}, m));
  Store.set('msgs_' + type + '_' + name, list);
}

/* ---------------- Admin ---------------- */
function getAdmin(){
  return Store.get('admin', {user:'wardbeauty', pass:'123456', emp:'20266202', avatar:null});
}
function saveAdmin(a){ Store.set('admin', a); }

/* ---------------- Locale time ---------------- */
function nowText(){ return new Date().toLocaleString('zh-CN', {hour12:false}); }

/* ---------------- Helpers ---------------- */
const AVATAR_COLORS = ['#F4A261','#E76F51','#E9C46A','#84A59D','#A8DADC','#D88C9A','#8A6F5C','#6D6875'];
function avatarColor(name){
  let h = 0;
  for(const ch of String(name||'')) h = (h*31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function esc(s){
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
function avatarHTML(user, img, cls){
  cls = cls || 'avatar-sm';
  if(img) return `<div class="${cls}"><img src="${img}" style="width:100%;height:100%;object-fit:cover"></div>`;
  return `<div class="${cls}" style="background:${avatarColor(user)}">${esc(String(user)[0]||'?')}</div>`;
}
function colorName(no){
  const c = COLORS.find(x => x[0] === no);
  return c ? c[1] : '#ccc';
}
function readImageFile(file){
  return new Promise(res => {
    const rd = new FileReader();
    rd.onload = e => res(e.target.result);
    rd.readAsDataURL(file);
  });
}

/* ---------------- Toast ---------------- */
let toastTimer;
function toast(msg){
  let el = $('toast');
  if(!el){
    el = document.createElement('div');
    el.id = 'toast'; el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 1900);
}

/* ---------------- Modal ---------------- */
function openModal(title, bodyHTML, footHTML){
  closeModal();
  const mask = document.createElement('div');
  mask.className = 'modal-mask';
  mask.id = 'modalMask';
  mask.innerHTML =
    `<div class="modal-box">
       <div class="modal-head"><b></b><button class="btn btn-sm" id="modalClose">✕</button></div>
       <div class="modal-body"></div>
       <div class="modal-foot" style="${footHTML ? '' : 'display:none'}"></div>
     </div>`;
  document.body.appendChild(mask);
  mask.querySelector('.modal-head b').textContent = title;
  mask.querySelector('.modal-body').innerHTML = bodyHTML;
  if(footHTML) mask.querySelector('.modal-foot').innerHTML = footHTML;
  mask.addEventListener('click', e => { if(e.target === mask) closeModal(); });
  $('modalClose').onclick = closeModal;
  return mask;
}
function closeModal(){
  const m = $('modalMask');
  if(m) m.remove();
}

/* ---------------- Mini hash router ----------------
   Usage: Router.init({home:'me'}, {me:{el,enter}, ...}) */
const Router = {
  routes:{}, home:'',
  init(home, routes){
    this.home = home; this.routes = routes;
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  },
  current(){
    const h = location.hash.replace(/^#\/?/, '').split('?')[0];
    return h || this.home;
  },
  go(path){
    location.hash = '#/' + path;
    if(this.current() === path) this.resolve();
  },
  resolve(){
    const name = this.current();
    const r = this.routes[name] || this.routes[this.home];
    Object.values(this.routes).forEach(x => x.el.classList.remove('active'));
    r.el.classList.add('active');
    document.querySelectorAll('[data-route]').forEach(b =>
      b.classList.toggle('on', b.dataset.route === name));
    if(r.enter) r.enter();
    window.scrollTo(0,0);
  }
};
