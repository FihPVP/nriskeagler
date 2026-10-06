(function(){
var C=window.CONFIG,$=function(s){return document.querySelector(s)};
var S=JSON.parse(localStorage.getItem("nrc")||"null")||{
 instances:[{name:"My Instance",ver:"1.8.8",url:""}],sel:0,ver:"1.8.8",accent:"#ef4444",
 profiles:[["NRC 1.21.1","1.21.1","32m ago","NRC"],["NRC 1.21.5","1.21.5","4mo ago","NRC"],["NRC 1.21","1.21","4mo ago","NRC"],["Fabric 26.1.1","26.1.1","4mo ago","MODPACKS"],["Vanilla 26.1.1","26.1.1","4mo ago","SERVER"]],
 skins:[{n:"Default",t:"Classic"}],mods:[["Fabric API","Lightweight hooks library","1.21",1],["Sodium","Rendering optimization","1.21",1],["Iris Shaders","Shader pack loader","1.21",0],["Entity Culling","Hides unseen entities","1.8.8",0]],
 capes:[["No Cape",1],["Birthday",1],["Pixel",0],["Moon",0],["Sakura",0]],cape:"No Cape",tog:{upd:1,clip:0},lang:"English"};
function save(){localStorage.setItem("nrc",JSON.stringify(S))}
function toast(t){var e=$("#toast");e.textContent=t;e.style.display="block";setTimeout(function(){e.style.display="none"},2200)}
function accent(){document.documentElement.style.setProperty("--a",S.accent)}
function cur(){return S.instances[S.sel]||S.instances[0]}
function verObj(id){return C.versions.filter(function(v){return v.id==id})[0]||C.versions[0]}
var page="play",tab="ALL",q="",ctab="ALL";
var NAV=[["play","▶","PLAY"],["profiles","▤","PROFILES"],["mods","▦","MODS"],["skins","☻","SKINS"],["capes","♜","CAPES"]];
function side(){var h='<div class="bolt">⚡</div>';NAV.forEach(function(n){h+='<button data-p="'+n[0]+'" class="'+(page==n[0]?"on":"")+'"><i>'+n[1]+'</i>'+n[2]+'</button>'});
 h+='<div class="sp"></div><button data-p="settings" class="'+(page=="settings"?"on":"")+'"><i>⚙</i>SET</button>';$("#side").innerHTML=h;
 $("#side").onclick=function(e){var b=e.target.closest("button");if(b){go(b.dataset.p)}}}
var hist=[],fwd=[];
function go(p,nohist){if(!nohist&&p!=page){hist.push(page);fwd=[]}page=p;q="";render()}
function top(){var ins=S.instances.map(function(x,i){return '<div data-i="'+i+'">'+x.name+'<br><small>Eaglercraft '+x.ver+'</small> <span data-e="'+i+'">✎</span> <span data-d="'+i+'">🗑</span></div>'}).join("");
 $("#top").innerHTML='<button id="bk">←</button><button id="fw">→</button><h1>'+C.name+'<small>'+C.build+'</small></h1><span class="sp2"></span><button>🔔</button>'+
 '<div class="dd" id="ddi"><button class="grn" id="ib">'+S.instances.length+' INSTANCE ▾</button><div class="m">'+ins+'<div data-add="1">＋ Add Instance</div></div></div>'+
 '<button id="acc">PLAYER ▾</button><button id="soc">👥</button><button id="lnk">🔗</button><button id="mn">—</button><button id="mx">⛶</button><button id="cl">✕</button>';
 $("#bk").onclick=function(){if(hist.length){fwd.push(page);go(hist.pop(),1)}};
 $("#fw").onclick=function(){if(fwd.length){hist.push(page);go(fwd.pop(),1)}};
 $("#ib").onclick=function(e){e.stopPropagation();$("#ddi").classList.toggle("open")};
 $("#ddi .m").onclick=function(e){e.stopPropagation();var t=e.target,d=t.closest("[data-d]"),ed=t.closest("[data-e]"),r=t.closest("[data-i]");
  if(t.closest("[data-add]")){instForm()}else if(d){if(S.instances.length>1){S.instances.splice(+d.dataset.d,1);S.sel=0;save();render()}else toast("Keep at least 1 instance")}
  else if(ed){instForm(+ed.dataset.e)}else if(r){S.sel=+r.dataset.i;S.ver=cur().ver;save();render()}};
 $("#acc").onclick=function(){toast("Account system coming later")};$("#soc").onclick=function(){toast("Friends: coming soon")};
 $("#lnk").onclick=function(){navigator.clipboard&&navigator.clipboard.writeText(location.href);toast("Link copied")};
 $("#mn").onclick=function(){document.body.classList.toggle("min");$("#page").style.display=$("#page").style.display=="none"?"":"none"};
 $("#mx").onclick=function(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()};
 $("#cl").onclick=function(){toast("Close this browser tab to exit")}}
document.addEventListener("click",function(){var d=$("#ddi");d&&d.classList.remove("open")});
function modal(title,fields,ok){var h='<h2>'+title+'</h2>';fields.forEach(function(f,i){h+='<label>'+f[0]+'</label>'+(f[2]?'<select id="f'+i+'">'+f[2].map(function(o){return '<option '+(o==f[1]?"selected":"")+'>'+o+'</option>'}).join("")+'</select>':'<input id="f'+i+'" value="'+(f[1]||"")+'">')});
 h+='<div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" id="mc">CANCEL</button><button class="btn red" id="mo">CREATE</button></div>';
 $("#mb").innerHTML=h;$("#modal").classList.remove("hide");$("#mc").onclick=function(){$("#modal").classList.add("hide")};
 $("#mo").onclick=function(){var v=fields.map(function(f,i){return $("#f"+i).value});$("#modal").classList.add("hide");ok(v)}}
function instForm(i){var x=i!=null?S.instances[i]:{};modal(i!=null?"Edit Instance":"Add Instance",[["Instance Name",x.name],["Version",x.ver||"1.8.8",C.versions.map(function(v){return v.id})],["Client URL (optional)",x.url],["Icon (optional emoji)",x.icon]],function(v){
 if(!v[0].trim())return toast("Name needed");var o={name:v[0],ver:v[1],url:v[2],icon:v[3]};if(i!=null)S.instances[i]=o;else{S.instances.push(o);S.sel=S.instances.length-1}save();render()})}
var newsC=["#1e5a8a","#2a7a3a","#7a4a1a"],news=["SPLASH COLLECTION","GAME ON","THE RASCALS ARRIVE"];
var pages={
play:function(){var v=verObj(S.ver);return '<div class="play"><div class="stage"><div class="stat" id="pst">READY</div><h3>⚡ Player</h3><div class="steve"></div><small>'+cur().name+'</small>'+
 '<div class="launch"><button class="btn big" id="go">LAUNCH<small>'+v.label+'</small></button><select id="vs" class="btn" style="width:46px">'+C.versions.map(function(o){return '<option value="'+o.id+'" '+(o.id==S.ver?"selected":"")+'>'+o.label+'</option>'}).join("")+'</select></div><div id="fb"></div></div>'+
 '<div class="news"><h2>NEWS</h2>'+news.map(function(n,i){return '<div class="card" data-n="'+n+'"><div class="im" style="background:linear-gradient(135deg,'+newsC[i]+',#000)"></div><div class="t">'+n+'</div></div>'}).join("")+'</div></div>'},
profiles:function(){var l=S.profiles.filter(function(p){return(tab=="ALL"||p[3]==tab)&&p[0].toLowerCase().indexOf(q)>-1});
 return '<h2>PROFILES</h2><div class="tabs">'+["ALL","NRC","SERVER","MODPACKS"].map(function(t){return '<button class="btn '+(t==tab?"on":"")+'" data-t="'+t+'">'+t+'</button>'}).join("")+'</div><div class="row"><input id="q" placeholder="Search profiles..." value="'+q+'"><button class="btn red" id="add">CREATE</button></div><div class="list">'+
 l.map(function(p,i){return '<div class="it"><div class="ic">⚡</div><div class="i"><b>'+p[0]+'</b><br><small>'+p[1]+' · '+p[2]+'</small></div><button class="btn" data-pl="'+p[1]+'">▶ PLAY</button><button class="btn" data-pm="1">MODS</button><button class="btn" data-pd="'+p[0]+'">⚙ DEL</button></div>'}).join("")+'</div>'},
mods:function(){var l=S.mods.filter(function(m){return m[0].toLowerCase().indexOf(q)>-1});
 return '<h2>MODS</h2><div class="row"><input id="q" placeholder="Search mods..." value="'+q+'"><select><option>All versions</option>'+C.versions.map(function(v){return '<option>'+v.id+'</option>'}).join("")+'</select><button class="btn red" id="add">＋ IMPORT</button></div><div class="list">'+
 l.map(function(m){return '<div class="it"><div class="ic">▦</div><div class="i"><b>'+m[0]+'</b><br><small>'+m[1]+' · '+m[2]+'</small></div><div class="tg '+(m[3]?"on":"")+'" data-mt="'+m[0]+'"></div><button class="btn" data-ms="1">⚙</button></div>'}).join("")+'</div><small>Library only: mods do not change the Eaglercraft client yet.</small>'},
skins:function(){var l=S.skins.filter(function(s){return s.n.toLowerCase().indexOf(q)>-1});
 return '<h2>SKINS</h2><div class="row"><input id="q" placeholder="Search skins..." value="'+q+'"><button class="btn red" id="add">＋ ADD SKIN</button></div><div class="grid"><div class="sk" id="add2" style="cursor:pointer"><div class="steve" style="opacity:.4"></div>Add New Skin<br><small>Upload or import</small></div>'+
 l.map(function(s,i){return '<div class="sk"><span style="position:absolute;right:8px;top:6px;cursor:pointer" data-sd="'+s.n+'">🗑</span><div class="steve"></div><b>'+s.n+'</b><br><small>'+s.t+'</small></div>'}).join("")+'</div>'},
capes:function(){var l=S.capes.filter(function(c){return c[0].toLowerCase().indexOf(q)>-1&&(ctab=="ALL"||(ctab=="OWNED"?c[1]:!c[1]))});
 return '<h2>CAPES</h2><div class="tabs">'+["ALL","OWNED","AVAILABLE"].map(function(t){return '<button class="btn '+(t==ctab?"on":"")+'" data-ct="'+t+'">'+t+'</button>'}).join("")+'</div><div class="row"><input id="q" placeholder="Search capes..." value="'+q+'"></div><div class="grid">'+
 l.map(function(c){return '<div class="sk"><div style="height:110px;margin:6px;background:linear-gradient(160deg,var(--a),#000);border:1px solid var(--b)"></div><b>'+c[0]+'</b><br><button class="btn '+(S.cape==c[0]?"red":"")+'" data-ce="'+c[0]+'" style="margin-top:6px">'+(!c[1]?"GET":S.cape==c[0]?"EQUIPPED":"EQUIP")+'</button></div>'}).join("")+'</div>'},
settings:function(){var cols=["#06b6d4","#3b82f6","#a855f7","#8b5cf6","#ec4899","#10b981","#14b8a6","#f97316","#f59e0b","#ef4444","#fb7185","#6366f1","#64748b"];
 return '<h2>⚙ SETTINGS</h2><div class="sec"><h4>LANGUAGE</h4><select id="lg"><option>English</option><option disabled>Deutsch (soon)</option><option disabled>Español (soon)</option></select></div>'+
 '<div class="sec"><h4>ACCENT COLOR</h4><div class="sw">'+cols.map(function(c){return '<span data-c="'+c+'" class="'+(c==S.accent?"on":"")+'" style="background:'+c+'"></span>'}).join("")+'</div>Custom: <input type="color" id="cc" value="'+S.accent+'" style="width:50px;padding:0"></div>'+
 '<div class="sec"><h4>BEHAVIOUR</h4><div class="srow"><span>Auto Updates<br><small>Check for launcher updates</small></span><div class="tg '+(S.tog.upd?"on":"")+'" data-tg="upd"></div></div><div class="srow"><span>Record Clips<br><small>Background recording (UI only)</small></span><div class="tg '+(S.tog.clip?"on":"")+'" data-tg="clip"></div></div></div>'+
 '<div class="sec"><h4>OTHER</h4><button class="btn" data-ts="Open Directory: not available in a browser">OPEN DIRECTORY</button> <button class="btn" data-ts="Downloads &amp; Interface: coming soon">DOWNLOADS</button> <button class="btn" data-ts="Background: coming soon">BACKGROUND</button> <button class="btn" data-ts="Advanced: coming soon">ADVANCED</button> <button class="btn" id="rs">RESET ALL DATA</button></div>'+
 '<div class="sec"><h4>CREDITS</h4>'+C.credits.map(function(c){return '<div class="srow"><b>'+c[0]+'</b><span>'+c[1]+'</span></div>'}).join("")+'</div>'}
};
function bind(){var p=$("#page");
 var qi=$("#q");if(qi)qi.oninput=function(){q=qi.value.toLowerCase();var pos=qi.selectionStart;render();var n=$("#q");n.focus();n.setSelectionRange(pos,pos)};
 var a=$("#add"),a2=$("#add2");
 if(a)a.onclick=function(){
  if(page=="profiles")modal("Create Profile",[["Name"],["Version","1.21",C.versions.map(function(v){return v.id})],["Type","NRC",["NRC","SERVER","MODPACKS"]]],function(v){if(v[0]){S.profiles.unshift([v[0],v[1],"just now",v[2]]);save();render()}});
  if(page=="mods")modal("Import Mod",[["Mod Name"],["Description"],["Version","1.8.8",C.versions.map(function(v){return v.id})]],function(v){if(v[0]){S.mods.push([v[0],v[1],v[2],0]);save();render()}});
  if(page=="skins")skinAdd()};
 if(a2)a2.onclick=skinAdd;
 var g=$("#go");if(g)g.onclick=launch;
 var vs=$("#vs");if(vs)vs.onchange=function(){S.ver=vs.value;save();render()};
 var lg=$("#lg");if(lg)lg.onchange=function(){S.lang=lg.value;save()};
 var cc=$("#cc");if(cc)cc.oninput=function(){S.accent=cc.value;save();accent()};
 var rs=$("#rs");if(rs)rs.onclick=function(){if(confirm("Delete all saved launcher data?")){localStorage.removeItem("nrc");location.reload()}};
 p.onclick=function(e){var t=e.target,d;
  if(d=t.closest("[data-t]")){tab=d.dataset.t;render()}
  else if(d=t.closest("[data-ct]")){ctab=d.dataset.ct;render()}
  else if(d=t.closest("[data-pl]")){S.ver=verObj(d.dataset.pl).id;save();go("play")}
  else if(t.closest("[data-pm]")){go("mods")}
  else if(d=t.closest("[data-pd]")){S.profiles=S.profiles.filter(function(x){return x[0]!=d.dataset.pd});save();render()}
  else if(d=t.closest("[data-mt]")){S.mods.forEach(function(m){if(m[0]==d.dataset.mt)m[3]=m[3]?0:1});save();render()}
  else if(t.closest("[data-ms]")){toast("Mod settings: coming soon")}
  else if(d=t.closest("[data-sd]")){S.skins=S.skins.filter(function(x){return x.n!=d.dataset.sd});save();render()}
  else if(d=t.closest("[data-ce]")){var c=S.capes.filter(function(x){return x[0]==d.dataset.ce})[0];if(c[1]){S.cape=c[0];save();render()}else toast("Not owned yet")}
  else if(d=t.closest("[data-c]")){S.accent=d.dataset.c;save();accent();render()}
  else if(d=t.closest("[data-tg]")){S.tog[d.dataset.tg]=S.tog[d.dataset.tg]?0:1;save();render()}
  else if(d=t.closest("[data-ts]")){toast(d.dataset.ts)}
  else if(d=t.closest("[data-n]")){toast("News: "+d.dataset.n)}}}
function skinAdd(){modal("Add Skin",[["Skin Name"],["Type","Classic",["Classic","Slim"]]],function(v){if(v[0]){S.skins.push({n:v[0],t:v[1]});save();render()}})}
function launch(){var v=verObj(S.ver),url=cur().url||v.url,w=window.open("","_blank");
 var L=$("#lp"),st=$("#st");L.textContent="";$("#lf").innerHTML="";$("#log").classList.remove("hide");st.textContent="STARTING";
 var steps=["Initializing instance...","Loading client...","Checking assets...","Preparing browser runtime...","Loading Eaglercraft...","Connecting...","Starting client..."],i=0;
 $("#lx").onclick=function(){$("#log").classList.add("hide")};
 var t=setInterval(function(){if(i<steps.length){L.textContent+="> "+steps[i++]+"\n";L.scrollTop=1e5;return}clearInterval(t);
  if(!url){if(w)w.close();L.textContent+="! No client URL set. Edit config/clients.js\n";st.textContent="NO URL";return}
  st.textContent="RUNNING · "+v.label.toUpperCase();var ps=$("#pst");if(ps)ps.textContent="RUNNING · "+v.label.toUpperCase();
  if(w){w.location=url}else{$("#lf").innerHTML='Your browser blocked the new tab. <a href="'+url+'" target="_blank" style="color:var(--a)">Click here to open the client.</a>'}},550)}
function render(){accent();side();top();$("#page").innerHTML=pages[page]();bind()}
// matrix background
var cv=$("#bg"),cx=cv.getContext("2d"),cols,drops;
function rs(){cv.width=innerWidth;cv.height=innerHeight;cols=Math.floor(cv.width/16);drops=[];for(var i=0;i<cols;i++)drops[i]=Math.random()*cv.height/16}
rs();addEventListener("resize",rs);
setInterval(function(){cx.fillStyle="rgba(10,3,5,.12)";cx.fillRect(0,0,cv.width,cv.height);cx.fillStyle="#ef444455";cx.font="12px monospace";
 for(var i=0;i<cols;i++){cx.fillText(String.fromCharCode(33+Math.random()*90),i*16,drops[i]*16);if(drops[i]*16>cv.height&&Math.random()>.97)drops[i]=0;drops[i]++}},70);
render();
})();
