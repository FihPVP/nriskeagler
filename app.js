(function(){
var C=window.CONFIG,K="nrc2",$=function(s){return document.querySelector(s)};
var FAV=new URL(C.favicon||"faviconnorisk.png",location.href).href;
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function vo(id){return C.versions.filter(function(v){return v.id==id})[0]||C.versions[0]}
function lab(id){return C.name+" "+id}
var V0=C.versions[0].id;
var S=JSON.parse(localStorage.getItem(K)||"null")||{
 instances:[{name:"My Instance",ver:V0,url:""}],sel:0,ver:V0,accent:"#ef4444",
 profiles:[["NoRisk 1.8.8","1.8.8","32m ago","NORISK"],["NoRisk 1.12.2","1.12.2","4mo ago","NORISK"],["NoRisk 1.21.11","1.21.11","4mo ago","NORISK"],["NoRisk 26.2","26.2","4mo ago","MODPACKS"],["NoRisk 1.5.2","1.5.2","4mo ago","SERVER"]],
 skins:[{n:"Default",t:"Classic",c:"#2b2b2b"},{n:"Crimson",t:"Classic",c:"#7a1018"},{n:"Frost",t:"Slim",c:"#1d6fa8"}],
 mods:[["Fabric API","Lightweight hooks and compatibility library",V0,1],["Sodium","Rendering engine that boosts frame rates",V0,1],["Iris Shaders","Modern shader pack loader",V0,0],["Entity Culling","Hides entities you cannot see",V0,0]],
 capes:[["No Cape",1,"#333"],["NoRisk",1,"#ef4444"],["Pixel",0,"#a855f7"],["Moon",0,"#3b82f6"],["Sakura",0,"#ec4899"],["Gold",0,"#f59e0b"]],
 cape:"No Cape",tog:{upd:1,clip:0,anim:1,bg:1,snd:1},lang:"English"};
S.tog=S.tog||{};
function save(){localStorage.setItem(K,JSON.stringify(S))}
function toast(t){var e=$("#toast");e.textContent=t;e.style.display="block";clearTimeout(toast.t);toast.t=setTimeout(function(){e.style.display="none"},2300)}
function cur(){return S.instances[S.sel]||S.instances[0]}
var page="play",tab="ALL",ctab="ALL",q="",mv="ALL",hist=[],fwd=[];
var NAV=[["play","▶","PLAY"],["profiles","▤","PROFILES"],["mods","▦","MODS"],["skins","☻","SKINS"],["capes","♜","CAPES"]];
function style(){document.documentElement.style.setProperty("--a",S.accent);document.body.classList.toggle("an",!!S.tog.anim);$("#bg").style.display=S.tog.bg?"":"none";document.title=lab(S.ver)}
function ch(c,big){return '<div class="ch'+(big?" big":"")+'" style="--c:'+esc(c||"#2b2b2b")+'"><i class="h"></i><i class="b"></i><i class="a l"></i><i class="a r"></i><i class="g l"></i><i class="g r"></i></div>'}
function side(){var h='<div class="bolt">⚡</div>';NAV.forEach(function(n){h+='<button data-p="'+n[0]+'" class="'+(page==n[0]?"on":"")+'"><i>'+n[1]+'</i>'+n[2]+'</button>'});
 h+='<div class="sp"></div><button data-p="settings" class="'+(page=="settings"?"on":"")+'"><i>⚙</i>SETTINGS</button>';$("#side").innerHTML=h;
 $("#side").onclick=function(e){var b=e.target.closest("button");if(b)go(b.dataset.p)}}
function go(p,nh){if(!nh&&p!=page){hist.push(page);fwd=[]}page=p;q="";render()}
function top(){var ins=S.instances.map(function(x,i){return '<div data-i="'+i+'"><span>'+esc(x.name)+'<small>'+lab(x.ver)+'</small></span><span data-e="'+i+'">✎</span><span data-d="'+i+'">🗑</span></div>'}).join("");
 $("#top").innerHTML='<button id="bk">←</button><button id="fw">→</button><h1>'+C.name.toUpperCase()+'<small>'+S.ver+' · '+C.build+'</small></h1><span class="fl"></span><button>🔔</button>'+
 '<div class="dd" id="ddi"><button class="grn" id="ib">▣ '+S.instances.length+' INSTANCE ▾</button><div class="m">'+ins+'<div data-add="1">＋ ADD INSTANCE</div></div></div>'+
 '<button class="ac" id="acc"><u></u><b>PLAYER</b> ▾</button><button id="soc">👥</button><button id="lnk">🔗</button><button class="wc" id="mn">—</button><button class="wc" id="mx">⛶</button><button class="wc" id="cl">✕</button>';
 $("#bk").onclick=function(){if(hist.length){fwd.push(page);go(hist.pop(),1)}};
 $("#fw").onclick=function(){if(fwd.length){hist.push(page);go(fwd.pop(),1)}};
 $("#ib").onclick=function(e){e.stopPropagation();$("#ddi").classList.toggle("open")};
 $("#ddi .m").onclick=function(e){e.stopPropagation();var t=e.target,d=t.closest("[data-d]"),ed=t.closest("[data-e]"),r=t.closest("[data-i]");
  if(t.closest("[data-add]"))instForm();
  else if(d){if(S.instances.length>1){S.instances.splice(+d.dataset.d,1);S.sel=0;save();render()}else toast("Keep at least 1 instance")}
  else if(ed)instForm(+ed.dataset.e);
  else if(r){S.sel=+r.dataset.i;S.ver=cur().ver;save();render()}};
 $("#acc").onclick=function(){toast("Accounts coming later")};$("#soc").onclick=function(){toast("Friends: coming soon")};
 $("#lnk").onclick=function(){try{navigator.clipboard.writeText(location.href)}catch(e){}toast("Link copied")};
 $("#mn").onclick=function(){var p=$("#page");p.style.display=p.style.display=="none"?"":"none"};
 $("#mx").onclick=function(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()};
 $("#cl").onclick=function(){toast("Close this browser tab to exit")}}
document.addEventListener("click",function(){var d=$("#ddi");d&&d.classList.remove("open")});
function vids(){return C.versions.map(function(v){return v.id})}
function modal(title,fields,ok,btn){var h='<h2>'+title+'</h2>';fields.forEach(function(f,i){h+='<label>'+f[0].toUpperCase()+'</label>'+(f[2]?'<select id="f'+i+'">'+f[2].map(function(o){return '<option '+(o==f[1]?"selected":"")+'>'+esc(o)+'</option>'}).join("")+'</select>':'<input id="f'+i+'" value="'+esc(f[1])+'">')});
 h+='<div class="row" style="margin:16px 0 0;justify-content:flex-end"><button class="btn" id="mc">CANCEL</button><button class="btn red" id="mo">'+(btn||"CREATE")+'</button></div>';
 $("#mb").innerHTML=h;$("#modal").classList.remove("hide");$("#mc").onclick=function(){$("#modal").classList.add("hide")};
 $("#mo").onclick=function(){var v=fields.map(function(f,i){return $("#f"+i).value});$("#modal").classList.add("hide");ok(v)}}
function instForm(i){var x=i!=null?S.instances[i]:{};modal(i!=null?"Edit Instance":"Add Instance",[["Instance Name",x.name],["Version",x.ver||V0,vids()],["Client URL (optional)",x.url],["Icon (optional emoji)",x.icon]],function(v){
 if(!v[0].trim())return toast("Name needed");var o={name:v[0],ver:v[1],url:v[2],icon:v[3]};if(i!=null)S.instances[i]=o;else{S.instances.push(o);S.sel=S.instances.length-1}S.ver=o.ver;save();render()},i!=null?"SAVE":"CREATE")}
function skinAdd(){modal("Add Skin",[["Skin Name"],["Type","Classic",["Classic","Slim"]],["Color (hex)","#7a1018"]],function(v){if(v[0]){S.skins.push({n:v[0],t:v[1],c:v[2]||"#2b2b2b"});save();render()}},"ADD")}
var NEWS=[["NEW",C.name+" "+S.ver+" is live","🎮","#1e5a8a","#0b2a44"],["UPDATE","Launcher "+C.build+" released","⚡","#7a1018","#2a0509"],["EVENT","Game On weekend","⚽","#2a7a3a","#0c2a14"]];
var P={
play:function(){var v=vo(S.ver);return '<div class="play"><div class="stage"><div class="sa">Skin Animation <div class="tg '+(S.tog.anim?"on":"")+'" data-tg="anim"></div></div><div class="stat" id="pst">READY</div><h3>⚡ Player</h3>'+ch("#2b2b2b",1)+'<div class="sub">'+esc(cur().name).toUpperCase()+' · '+C.name.toUpperCase()+'</div>'+
 '<div class="launch"><button class="big" id="go">LAUNCH<small>'+v.label+'</small></button><div class="vsel">▾<select id="vs">'+C.versions.map(function(o){return '<option value="'+o.id+'" '+(o.id==S.ver?"selected":"")+'>'+o.label+'</option>'}).join("")+'</select></div></div><div id="fb"></div></div>'+
 '<div class="news"><h2>▤ NEWS</h2>'+NEWS.map(function(n){return '<div class="card" data-n="'+esc(n[1])+'"><div class="im" style="background:linear-gradient(135deg,'+n[3]+','+n[4]+')"><b>'+n[2]+'</b></div><div class="t"><small>'+n[0]+'</small>'+esc(n[1])+'</div></div>'}).join("")+'</div></div>'},
profiles:function(){var l=S.profiles.filter(function(p){return(tab=="ALL"||p[3]==tab)&&p[0].toLowerCase().indexOf(q)>-1});
 return '<h2>PROFILES</h2><div class="tabs">'+["ALL","NORISK","SERVER","MODPACKS"].map(function(t){return '<button class="btn '+(t==tab?"on":"")+'" data-t="'+t+'">'+t+'</button>'}).join("")+'</div><div class="row"><input id="q" placeholder="Search profiles..." value="'+esc(q)+'"><button class="btn red" id="add">＋ CREATE</button></div><div class="list">'+
 l.map(function(p){return '<div class="it"><div class="ic">⚡</div><div class="i">'+esc(p[0])+'<small>'+lab(p[1])+' · '+p[2]+'</small></div><button class="btn" data-pl="'+esc(p[1])+'">▶ PLAY</button><button class="btn" data-pm="1">MODS</button><button class="btn" data-pd="'+esc(p[0])+'">⚙ DEL</button></div>'}).join("")+(l.length?"":"<p>No profiles found.</p>")+'</div>'},
mods:function(){var l=S.mods.filter(function(m){return m[0].toLowerCase().indexOf(q)>-1&&(mv=="ALL"||m[2]==mv)});
 return '<h2>MODS</h2><div class="row"><input id="q" placeholder="Search mods..." value="'+esc(q)+'"><select id="mvs"><option value="ALL">All versions</option>'+vids().map(function(v){return '<option '+(v==mv?"selected":"")+'>'+v+'</option>'}).join("")+'</select><button class="btn red" id="add">＋ IMPORT</button></div><div class="list">'+
 l.map(function(m){return '<div class="it"><div class="ic">▦</div><div class="i">'+esc(m[0])+'<small>'+esc(m[1])+'</small><small><span class="tag">'+m[2]+'</span></small></div><div class="tg '+(m[3]?"on":"")+'" data-mt="'+esc(m[0])+'"></div><button class="btn" data-ms="1">⚙</button></div>'}).join("")+'</div><p style="color:#a88">Library only: mods do not change the client yet.</p>'},
skins:function(){var l=S.skins.filter(function(s){return s.n.toLowerCase().indexOf(q)>-1});
 return '<h2>SKINS</h2><div class="row"><input id="q" placeholder="Search skins..." value="'+esc(q)+'"><button class="btn red" id="add">＋ ADD SKIN</button></div><div class="grid"><div class="sk" id="add2" style="cursor:pointer"><div style="opacity:.35">'+ch("#2b2b2b")+'</div>Add New Skin<small>Upload or import a skin</small></div>'+
 l.map(function(s){return '<div class="sk"><span class="x" data-sd="'+esc(s.n)+'">🗑</span>'+ch(s.c)+esc(s.n)+'<small>▣ '+esc(s.t)+'</small></div>'}).join("")+'</div>'},
capes:function(){var l=S.capes.filter(function(c){return c[0].toLowerCase().indexOf(q)>-1&&(ctab=="ALL"||(ctab=="OWNED"?c[1]:!c[1]))});
 return '<h2>CAPES</h2><div class="tabs">'+["ALL","OWNED","AVAILABLE"].map(function(t){return '<button class="btn '+(t==ctab?"on":"")+'" data-ct="'+t+'">'+t+'</button>'}).join("")+'</div><div class="row"><input id="q" placeholder="Search capes..." value="'+esc(q)+'"></div><div class="grid">'+
 l.map(function(c){return '<div class="sk"><div class="cape" style="--c:'+c[2]+'"></div>'+esc(c[0])+'<small>'+(c[1]?"OWNED":"AVAILABLE")+'</small><button class="btn '+(S.cape==c[0]?"red":"")+'" data-ce="'+esc(c[0])+'" style="margin-top:10px">'+(!c[1]?"GET":S.cape==c[0]?"EQUIPPED":"EQUIP")+'</button></div>'}).join("")+'</div>'},
settings:function(){var cols=["#06b6d4","#3b82f6","#a855f7","#8b5cf6","#ec4899","#10b981","#14b8a6","#f97316","#f59e0b","#ef4444","#fb7185","#6366f1","#64748b"];
 function T(k,n,d){return '<div class="srow"><span>'+n+'<small>'+d+'</small></span><div class="tg '+(S.tog[k]?"on":"")+'" data-tg="'+k+'"></div></div>'}
 return '<h2>⚙ SETTINGS</h2><div class="setw"><div class="snav">'+[["general","GENERAL"],["language","LANGUAGE"],["accent","ACCENT COLOR"],["behaviour","BEHAVIOUR"],["downloads","DOWNLOADS &amp; INTERFACE"],["background","BACKGROUND"],["clips","CLIPS"],["advanced","ADVANCED"],["debug","DEBUG"],["credits","CREDITS"]].map(function(s){return '<button data-s="'+s[0]+'">'+s[1]+'</button>'}).join("")+'</div><div class="sbody">'+
 '<div class="sec" id="s-general"><h4>GENERAL</h4><p>'+C.name+' '+C.build+'</p><button class="btn" data-ts="Open Directory is not available in a browser">▣ OPEN DIRECTORY</button></div>'+
 '<div class="sec" id="s-language"><h4>LANGUAGE</h4><p>Choose the display language for the launcher</p><select id="lg"><option>English</option><option disabled>Deutsch (soon)</option><option disabled>Español (soon)</option></select></div>'+
 '<div class="sec" id="s-accent"><h4>ACCENT COLOR</h4><p>Choose your preferred accent color</p><div class="sw">'+cols.map(function(c){return '<span data-c="'+c+'" class="'+(c==S.accent?"on":"")+'" style="background:'+c+'"></span>'}).join("")+'</div><p style="margin-top:12px">Custom: <input type="color" id="cc" value="'+S.accent+'" style="width:56px;padding:2px"></p></div>'+
 '<div class="sec" id="s-behaviour"><h4>BEHAVIOUR</h4>'+T("upd","Auto Updates","Automatically check for launcher updates")+T("anim","Skin Animation","Make characters float")+T("snd","Sounds","UI sounds (placeholder)")+'</div>'+
 '<div class="sec" id="s-downloads"><h4>DOWNLOADS &amp; INTERFACE</h4><p>Nothing to download. This is a browser launcher.</p></div>'+
 '<div class="sec" id="s-background"><h4>BACKGROUND</h4>'+T("bg","Matrix background","Falling code effect")+'</div>'+
 '<div class="sec" id="s-clips"><h4>CLIPS</h4>'+T("clip","Record Clips","Placeholder: recording is not active in the browser")+'</div>'+
 '<div class="sec" id="s-advanced"><h4>ADVANCED</h4><button class="btn" id="rs">RESET ALL DATA</button></div>'+
 '<div class="sec" id="s-debug"><h4>DEBUG</h4><p>Version '+S.ver+' · Instance '+esc(cur().name)+' · Page '+page+'</p></div>'+
 '<div class="sec cred" id="s-credits"><h4>CREDITS</h4>'+C.credits.map(function(c){return '<div class="srow"><b>'+c[0]+'</b><span>'+c[1]+'</span></div>'}).join("")+'</div></div></div>'}
};
function bind(){var p=$("#page"),x;
 if(x=$("#q"))x.oninput=function(){q=x.value.toLowerCase();var pos=x.selectionStart;render();var n=$("#q");n.focus();n.setSelectionRange(pos,pos)};
 if(x=$("#add"))x.onclick=function(){
  if(page=="profiles")modal("Create Profile",[["Name"],["Version",V0,vids()],["Type","NORISK",["NORISK","SERVER","MODPACKS"]]],function(v){if(v[0]){S.profiles.unshift([v[0],v[1],"just now",v[2]]);save();render()}});
  else if(page=="mods")modal("Import Mod",[["Mod Name"],["Description"],["Version",V0,vids()]],function(v){if(v[0]){S.mods.push([v[0],v[1],v[2],0]);save();render()}},"IMPORT");
  else skinAdd()};
 if(x=$("#add2"))x.onclick=skinAdd;
 if(x=$("#go"))x.onclick=launch;
 if(x=$("#vs"))x.onchange=function(){S.ver=x.value;save();render()};
 if(x=$("#mvs"))x.onchange=function(){mv=x.value;render()};
 if(x=$("#lg"))x.onchange=function(){S.lang=x.value;save()};
 if(x=$("#cc"))x.oninput=function(){S.accent=x.value;save();style()};
 if(x=$("#rs"))x.onclick=function(){if(confirm("Delete all saved launcher data?")){localStorage.removeItem(K);location.reload()}};
 p.onclick=function(e){var t=e.target,d;
  if(d=t.closest("[data-t]")){tab=d.dataset.t;render()}
  else if(d=t.closest("[data-ct]")){ctab=d.dataset.ct;render()}
  else if(d=t.closest("[data-pl]")){S.ver=vo(d.dataset.pl).id;save();go("play");launch()}
  else if(t.closest("[data-pm]"))go("mods");
  else if(d=t.closest("[data-pd]")){S.profiles=S.profiles.filter(function(z){return z[0]!=d.dataset.pd});save();render()}
  else if(d=t.closest("[data-mt]")){S.mods.forEach(function(m){if(m[0]==d.dataset.mt)m[3]=m[3]?0:1});save();render()}
  else if(t.closest("[data-ms]"))toast("Mod settings: coming soon");
  else if(d=t.closest("[data-sd]")){S.skins=S.skins.filter(function(z){return z.n!=d.dataset.sd});save();render()}
  else if(d=t.closest("[data-ce]")){var c=S.capes.filter(function(z){return z[0]==d.dataset.ce})[0];if(c[1]){S.cape=c[0];save();render()}else toast("Not owned yet")}
  else if(d=t.closest("[data-c]")){S.accent=d.dataset.c;save();render()}
  else if(d=t.closest("[data-tg]")){var k=d.dataset.tg;S.tog[k]=S.tog[k]?0:1;save();render()}
  else if(d=t.closest("[data-ts]"))toast(d.dataset.ts);
  else if(d=t.closest("[data-s]")){var el=$("#s-"+d.dataset.s);el&&el.scrollIntoView({behavior:"smooth",block:"start"})}
  else if(d=t.closest("[data-n]"))toast(d.dataset.n)}}
function brand(w,v){var n=0,t=setInterval(function(){try{if(w.closed||n++>80){clearInterval(t);return}var d=w.document;if(d&&d.head){d.title=v.label;var l=d.querySelector("link[rel~=icon]");if(!l){l=d.createElement("link");l.rel="icon";d.head.appendChild(l)}l.href=FAV}}catch(e){}},250)}
function launch(){var v=vo(S.ver),url=cur().url||v.url,w=window.open("","_blank"),L=$("#lp"),st=$("#st");
 L.textContent="";$("#lf").innerHTML="";$("#log").classList.remove("hide");st.textContent="STARTING";$("#lx").onclick=function(){$("#log").classList.add("hide")};
 var steps=["Initializing instance "+cur().name+"...","Loading "+v.label+"...","Checking assets...","Preparing browser runtime...","Loading Eaglercraft...","Connecting...","Starting client..."],i=0;
 var t=setInterval(function(){if(i<steps.length){L.textContent+="> "+steps[i++]+"\n";L.scrollTop=1e5;return}clearInterval(t);
  if(!url){if(w)w.close();L.textContent+="! No client file set. Edit clients.js\n";st.textContent="NO URL";return}
  st.textContent="RUNNING · "+v.label.toUpperCase();var ps=$("#pst");if(ps)ps.textContent="RUNNING · "+v.label.toUpperCase();
  if(w){w.location=url;brand(w,v)}else $("#lf").innerHTML='Your browser blocked the new tab. <a href="'+esc(url)+'" target="_blank">Click here to open the client.</a>'},550)}
function render(){style();side();top();$("#page").innerHTML=P[page]();bind()}
var cv=$("#bg"),cx=cv.getContext("2d"),cols,dr;
function rz(){cv.width=innerWidth;cv.height=innerHeight;cols=Math.floor(cv.width/16);dr=[];for(var i=0;i<cols;i++)dr[i]=Math.random()*cv.height/16}
rz();addEventListener("resize",rz);
setInterval(function(){if(!S.tog.bg)return;cx.fillStyle="rgba(8,2,4,.13)";cx.fillRect(0,0,cv.width,cv.height);cx.fillStyle=S.accent+"66";cx.font="12px monospace";
 for(var i=0;i<cols;i++){cx.fillText(String.fromCharCode(33+Math.random()*90),i*16,dr[i]*16);if(dr[i]*16>cv.height&&Math.random()>.97)dr[i]=0;dr[i]++}},70);
render();
})();
