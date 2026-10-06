(function(){
var C=window.CONFIG,K="nrc3",$=function(s){return document.querySelector(s)};
var FAV=new URL(C.favicon||"faviconnorisk.png",location.href).href;
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function ic(n){return '<i data-lucide="'+n+'"></i>'}
function vo(id){return C.versions.filter(function(v){return v.id==id})[0]||C.versions[0]}
function lab(id){return C.name+" "+id}
function vids(){return C.versions.map(function(v){return v.id})}
var V0=C.versions[0].id;
function gen(){var R=["Risk","Risky","Riskiest"],P=["Player","Gamer","Sweat"];return R[Math.floor(Math.random()*3)]+P[Math.floor(Math.random()*3)]+String(Math.floor(Math.random()*1000)).padStart(3,"0")}
var THEMES=[["Midnight","#0b0d1a","#6366f1"],["Crimson","#12050a","#ef4444"],["Forest","#06110b","#22c55e"],["Ocean","#04101a","#06b6d4"],["Sunset","#150a05","#f97316"],["Amethyst","#0e0716","#a855f7"],["Rose","#150810","#ec4899"],["Graphite","#0d0d0f","#9ca3af"]];
var BGS=[["static","Static","square"],["blobs","Subtle movement","circle-dot"],["ambient","Ambient mumble","cloud"],["light","Lighting sweep","sun"],["matrix","Code rain","binary"],["stars","Starfield","sparkles"]];
var def={instances:[{name:"My Instance",ver:V0,url:""}],sel:0,ver:V0,theme:0,accent:"",bgm:"blobs",anim:1,pose:"idle",
 acct:{name:gen(),skin:"steve"},skins:[],
 profiles:[["NoRisk 1.8.8","1.8.8","32m ago","NORISK"],["NoRisk 1.12.2","1.12.2","4mo ago","NORISK"],["NoRisk 1.21.11","1.21.11","4mo ago","NORISK"],["NoRisk 26.2","26.2","4mo ago","MODPACKS"],["NoRisk 1.5.2","1.5.2","4mo ago","SERVER"]],
 mods:[["Fabric API","Lightweight hooks and compatibility library",V0,1],["Sodium","Rendering engine that boosts frame rates",V0,1],["Iris Shaders","Modern shader pack loader",V0,0],["Entity Culling","Hides entities you cannot see",V0,0]],
 capes:[["No Cape",1,"#444"],["NoRisk",1,"#6366f1"],["Pixel",0,"#a855f7"],["Moon",0,"#3b82f6"],["Sakura",0,"#ec4899"],["Gold",0,"#f59e0b"]],cape:"No Cape",tog:{upd:1,snd:1},lang:"English"};
var S=def;try{var sv=JSON.parse(localStorage.getItem(K)||"null");if(sv){S=Object.assign(def,sv);S.tog=Object.assign({upd:1,snd:1},sv.tog)}}catch(e){}
function save(){localStorage.setItem(K,JSON.stringify(S))}
function toast(t){var e=$("#toast");e.textContent=t;e.style.display="block";clearTimeout(toast.t);toast.t=setTimeout(function(){e.style.display="none"},2400)}
function cur(){return S.instances[S.sel]||S.instances[0]}
var page="play",tab="ALL",ctab="ALL",q="",mv="ALL",hist=[],fwd=[],ACC="#6366f1";
/* ---------- skins ---------- */
var steveCache="";
function steve(){if(steveCache)return steveCache;var c=document.createElement("canvas");c.width=c.height=64;var x=c.getContext("2d");
 function R(col,a,b,w,h){x.fillStyle=col;x.fillRect(a,b,w,h)}
 var SK="#b88062",HA="#3a2716",SH="#1fa7a7",PA="#3b3a9c",SO="#6b6b6b",DK="#8a5a42";
 R(SK,0,8,32,8);R(SK,8,0,16,8);R(HA,8,0,8,8);R(HA,0,8,32,2);R(HA,8,10,2,2);R(HA,14,10,2,2);R(HA,24,8,8,8);R(HA,0,10,2,3);R(HA,6,10,2,3);R(HA,16,10,2,3);R(HA,22,10,2,3);
 R("#fff",9,12,2,1);R("#3a3aa8",10,12,1,1);R("#3a3aa8",13,12,1,1);R("#fff",14,12,2,1);R(DK,11,14,2,1);R("#a56e52",11,13,2,1);
 R(SH,16,16,24,16);R(SK,40,16,16,16);R(SH,40,20,16,4);R(SH,44,16,4,4);R(SK,32,48,16,16);R(SH,32,52,16,4);R(SH,36,48,4,4);
 R(PA,0,16,16,16);R(SO,0,30,16,2);R(PA,16,48,16,16);R(SO,16,62,16,2);
 return steveCache=c.toDataURL()}
function skinUrl(id){id=id||S.acct.skin;if(id=="steve")return steve();var s=S.skins.filter(function(k){return k.id==id})[0];return s?s.url:steve()}
function normalize(img,cb){var c=document.createElement("canvas");c.width=c.height=64;var x=c.getContext("2d");x.imageSmoothingEnabled=false;x.drawImage(img,0,0);
 if(img.height==32){[[40,16,32,48],[0,16,16,48]].forEach(function(m){x.save();x.translate(m[2]+16,m[3]);x.scale(-1,1);x.drawImage(img,m[0],m[1],16,16,0,0,16,16);x.restore()})}
 cb(c.toDataURL())}
function cube(w,h,d,u,s){function f(fw,fh,p,tr){return '<b style="width:'+fw*s+'px;height:'+fh*s+'px;left:'+(w-fw)*s/2+'px;top:'+(h-fh)*s/2+'px;background-size:'+64*s+'px '+64*s+'px;background-position:-'+p[0]*s+'px -'+p[1]*s+'px;transform:'+tr+'"></b>'}
 return f(w,h,u.f,"translateZ("+d*s/2+"px)")+f(w,h,u.k,"rotateY(180deg) translateZ("+d*s/2+"px)")+f(d,h,u.r,"rotateY(-90deg) translateZ("+w*s/2+"px)")+f(d,h,u.l,"rotateY(90deg) translateZ("+w*s/2+"px)")+f(w,d,u.t,"rotateX(90deg) translateZ("+h*s/2+"px)")+f(w,d,u.b,"rotateX(-90deg) translateZ("+h*s/2+"px)")}
function mc(url,s,pose,still){function P(cl,x,y,w,h,d,u){return '<div class="pt '+cl+'" style="left:'+x*s+'px;top:'+y*s+'px;width:'+w*s+'px;height:'+h*s+'px">'+cube(w,h,d,u,s)+'</div>'}
 var parts=P("hd",4,0,8,8,8,{t:[8,0],b:[16,0],r:[0,8],f:[8,8],l:[16,8],k:[24,8]})+P("bd",4,8,8,12,4,{t:[20,16],b:[28,16],r:[16,20],f:[20,20],l:[28,20],k:[32,20]})+
 P("limb ar",0,8,4,12,4,{t:[44,16],b:[48,16],r:[40,20],f:[44,20],l:[48,20],k:[52,20]})+P("limb al",12,8,4,12,4,{t:[36,48],b:[40,48],r:[32,52],f:[36,52],l:[40,52],k:[44,52]})+
 P("limb lr",4,20,4,12,4,{t:[4,16],b:[8,16],r:[0,20],f:[4,20],l:[8,20],k:[12,20]})+P("limb ll",8,20,4,12,4,{t:[20,48],b:[24,48],r:[16,52],f:[20,52],l:[24,52],k:[28,52]});
 return '<div class="mc'+(still?" still":"")+'" data-pose="'+pose+'" style="--s:'+s+'px;--skin:url(\''+url+'\');width:'+16*s+'px;height:'+32*s+'px"><div class="sway"><div class="bob"><div class="rig">'+parts+'</div></div></div></div>'}
function av(url){return '<u class="av" style="background-image:url(\''+url+'\')"></u>'}
/* ---------- theme / background ---------- */
function lum(h){var n=parseInt(h.slice(1),16),r=n>>16&255,g=n>>8&255,b=n&255;return(.299*r+.587*g+.114*b)/255}
function style(){var T=THEMES[S.theme]||THEMES[0],a=S.accent||T[2],r=document.documentElement.style;ACC=a;
 r.setProperty("--bg",T[1]);r.setProperty("--a",a);r.setProperty("--ac",lum(a)>.62?"#0b0b10":"#fff");
 var cl=document.body.classList;[].slice.call(cl).forEach(function(c){if(c.indexOf("bg-")==0)cl.remove(c)});cl.add("bg-"+S.bgm);cl.toggle("noanim",!S.anim);
 $("#bg").style.display=(S.bgm=="matrix"||S.bgm=="stars")?"":"none";document.title=lab(S.ver)}
/* ---------- chrome ---------- */
var NAV=[["play","play","Play"],["profiles","layout-list","Profiles"],["mods","puzzle","Mods"],["skins","shirt","Skins"],["capes","sparkles","Capes"]];
function side(){var h='<div class="logo"></div>';NAV.forEach(function(n){h+='<button data-p="'+n[0]+'" class="'+(page==n[0]?"on":"")+'">'+ic(n[1])+n[2]+'</button>'});
 h+='<div class="sp"></div><button data-p="settings" class="'+(page=="settings"?"on":"")+'">'+ic("settings")+'Settings</button>';$("#side").innerHTML=h;
 $("#side").onclick=function(e){var b=e.target.closest("button");if(b)go(b.dataset.p)}}
function go(p,nh){if(!nh&&p!=page){hist.push(page);fwd=[]}page=p;q="";render()}
function top(){var ins=S.instances.map(function(x,i){return '<div data-i="'+i+'"><span>'+esc(x.name)+'<small>'+lab(x.ver)+'</small></span><span data-e="'+i+'">'+ic("pencil")+'</span><span data-d="'+i+'">'+ic("trash-2")+'</span></div>'}).join("");
 $("#top").innerHTML='<button id="bk">'+ic("arrow-left")+'</button><button id="fw">'+ic("arrow-right")+'</button><h1>'+C.name+'<small>'+lab(S.ver).replace(C.name+" ","")+' · '+C.build+'</small></h1><span class="fl"></span><button id="bl">'+ic("bell")+'</button>'+
 '<div class="dd" id="ddi"><button class="ib" id="ib">'+ic("server")+S.instances.length+' Instance'+ic("chevron-down")+'</button><div class="m">'+ins+'<div data-add="1">'+ic("plus")+'<span>Add Instance</span></div></div></div>'+
 '<button id="acc">'+av(skinUrl())+'<span class="ab">'+esc(S.acct.name)+'</span>'+ic("chevron-down")+'</button><button id="soc">'+ic("users")+'</button><button id="lnk">'+ic("link")+'</button><button class="wc" id="mn">'+ic("minus")+'</button><button class="wc" id="mx">'+ic("maximize")+'</button><button class="wc" id="cl">'+ic("x")+'</button>';
 $("#bk").onclick=function(){if(hist.length){fwd.push(page);go(hist.pop(),1)}};
 $("#fw").onclick=function(){if(fwd.length){hist.push(page);go(fwd.pop(),1)}};
 $("#bl").onclick=function(){toast("No new notifications")};
 $("#ib").onclick=function(e){e.stopPropagation();$("#ddi").classList.toggle("open")};
 $("#ddi .m").onclick=function(e){e.stopPropagation();var t=e.target,d=t.closest("[data-d]"),ed=t.closest("[data-e]"),r=t.closest("[data-i]");
  if(t.closest("[data-add]"))instForm();
  else if(d){if(S.instances.length>1){S.instances.splice(+d.dataset.d,1);S.sel=0;S.ver=cur().ver;save();render()}else toast("Keep at least 1 instance")}
  else if(ed)instForm(+ed.dataset.e);
  else if(r){S.sel=+r.dataset.i;S.ver=cur().ver;save();render()}};
 $("#acc").onclick=function(){go("account")};$("#soc").onclick=function(){toast("Friends: coming soon")};
 $("#lnk").onclick=function(){try{navigator.clipboard.writeText(location.href)}catch(e){}toast("Link copied")};
 $("#mn").onclick=function(){var p=$("#page");p.style.display=p.style.display=="none"?"":"none"};
 $("#mx").onclick=function(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()};
 $("#cl").onclick=function(){toast("Close this browser tab to exit")}}
document.addEventListener("click",function(){var d=$("#ddi");d&&d.classList.remove("open")});
function modal(title,fields,ok,btn){var h='<h2>'+title+'</h2>';fields.forEach(function(f,i){h+='<label>'+f[0]+'</label>'+(f[2]?'<select id="f'+i+'">'+f[2].map(function(o){return '<option '+(o==f[1]?"selected":"")+'>'+esc(o)+'</option>'}).join("")+'</select>':'<input id="f'+i+'" value="'+esc(f[1])+'">')});
 h+='<div class="row" style="margin:18px 0 0;justify-content:flex-end"><button class="btn" id="mc">Cancel</button><button class="btn pri" id="mo">'+(btn||"Create")+'</button></div>';
 $("#mb").innerHTML=h;$("#modal").classList.remove("hide");$("#mc").onclick=function(){$("#modal").classList.add("hide")};
 $("#mo").onclick=function(){var v=fields.map(function(f,i){return $("#f"+i).value});$("#modal").classList.add("hide");ok(v)}}
function instForm(i){var x=i!=null?S.instances[i]:{};modal(i!=null?"Edit Instance":"Add Instance",[["Instance name",x.name],["Version",x.ver||V0,vids()],["Client URL (optional)",x.url]],function(v){
 if(!v[0].trim())return toast("Name needed");var o={name:v[0],ver:v[1],url:v[2]};if(i!=null)S.instances[i]=o;else{S.instances.push(o);S.sel=S.instances.length-1}S.ver=o.ver;save();render()},i!=null?"Save":"Create")}
/* ---------- pages ---------- */
function newsHTML(){return C.news.map(function(n){return '<a class="nc" href="'+esc(n.url)+'" target="_blank" rel="noopener"><div class="art '+n.art+'">'+(n.img?'<img loading="lazy" alt="" src="'+esc(n.img)+'" onerror="this.remove()">':"")+ic(n.icon)+'</div><div class="t"><small>'+n.tag+'</small><b>'+esc(n.title)+'</b><span>'+esc(n.text)+'</span></div></a>'}).join("")}
function poseChips(){return '<div class="chips">'+[["idle","Idle"],["walk","Walk"],["wave","Wave"]].map(function(p){return '<button class="btn '+(S.pose==p[0]?"on":"")+'" data-pose="'+p[0]+'">'+p[1]+'</button>'}).join("")+'</div>'}
var P={
play:function(){var v=vo(S.ver);return '<div class="play"><div class="stage"><div class="sa">Animation <div class="tg '+(S.anim?"on":"")+'" data-tg="anim"></div></div><div class="stat" id="pst">READY</div><h3>'+esc(S.acct.name)+'</h3>'+mc(skinUrl(),8,S.pose)+poseChips()+'<div class="sub">'+esc(cur().name)+' · '+lab(S.ver)+'</div>'+
 '<div class="launch"><button class="big" id="go">Launch<small>'+v.label+'</small></button><div class="vsel">'+ic("chevron-down")+'<select id="vs">'+C.versions.map(function(o){return '<option value="'+o.id+'" '+(o.id==S.ver?"selected":"")+'>'+o.label+'</option>'}).join("")+'</select></div></div><div id="fb"></div></div>'+
 '<div class="news"><h2>'+ic("newspaper")+'Minecraft News</h2>'+newsHTML()+'</div></div>'},
account:function(){var url=skinUrl(),lib=[{id:"steve",n:"Steve (default)",url:steve()}].concat(S.skins);
 return '<h2>'+ic("user")+'Account</h2><div class="acc"><div class="card2 prev">'+mc(url,9,S.pose)+poseChips()+'<small style="color:var(--t2)">Drag the character to turn it</small></div><div>'+
 '<div class="card2"><h4>Username</h4><p>Shown in the launcher. It does not change anything inside the game yet.</p><div class="row"><input id="un" maxlength="16" value="'+esc(S.acct.name)+'"><button class="btn" id="rn">'+ic("shuffle")+'Random</button></div><button class="btn pri" id="sn">'+ic("check")+'Save username</button></div>'+
 '<div class="card2"><h4>Minecraft skin</h4><p>Upload a normal Minecraft skin PNG (64×64 or 64×32).</p><div class="row" style="margin:0"><button class="btn pri" id="up">'+ic("upload")+'Upload skin</button><button class="btn" id="st">'+ic("rotate-ccw")+'Reset to Steve</button></div>'+
 '<div class="skl">'+lib.map(function(s){return '<div class="sl '+(S.acct.skin==s.id?"on":"")+'" data-sk="'+s.id+'">'+av(s.url)+'<span>'+esc(s.n)+'</span>'+(s.id!="steve"?'<span class="x" data-skd="'+s.id+'">'+ic("trash-2")+'</span>':"")+'</div>'}).join("")+'</div></div></div></div>'},
profiles:function(){var l=S.profiles.filter(function(p){return(tab=="ALL"||p[3]==tab)&&p[0].toLowerCase().indexOf(q)>-1});
 return '<h2>'+ic("layout-list")+'Profiles</h2><div class="tabs">'+["ALL","NORISK","SERVER","MODPACKS"].map(function(t){return '<button class="btn '+(t==tab?"on":"")+'" data-t="'+t+'">'+t+'</button>'}).join("")+'</div><div class="row"><input id="q" placeholder="Search profiles..." value="'+esc(q)+'"><button class="btn pri" id="add">'+ic("plus")+'Create</button></div><div class="list">'+
 l.map(function(p){return '<div class="it"><div class="ic">'+ic("zap")+'</div><div class="i">'+esc(p[0])+'<small>'+lab(p[1])+' · '+p[2]+'</small></div><button class="btn pri" data-pl="'+esc(p[1])+'">'+ic("play")+'Play</button><button class="btn" data-pm="1">'+ic("puzzle")+'Mods</button><button class="btn" data-pd="'+esc(p[0])+'">'+ic("trash-2")+'</button></div>'}).join("")+(l.length?"":'<p style="color:var(--t2)">No profiles found.</p>')+'</div>'},
mods:function(){var l=S.mods.filter(function(m){return m[0].toLowerCase().indexOf(q)>-1&&(mv=="ALL"||m[2]==mv)});
 return '<h2>'+ic("puzzle")+'Mods</h2><div class="row"><input id="q" placeholder="Search mods..." value="'+esc(q)+'"><select id="mvs"><option value="ALL">All versions</option>'+vids().map(function(v){return '<option '+(v==mv?"selected":"")+'>'+v+'</option>'}).join("")+'</select><button class="btn pri" id="add">'+ic("plus")+'Import</button></div><div class="list">'+
 l.map(function(m){return '<div class="it"><div class="ic">'+ic("puzzle")+'</div><div class="i">'+esc(m[0])+'<small>'+esc(m[1])+'</small><small><span class="tag">'+m[2]+'</span></small></div><div class="tg '+(m[3]?"on":"")+'" data-mt="'+esc(m[0])+'"></div><button class="btn" data-ms="1">'+ic("settings")+'</button></div>'}).join("")+'</div><p style="color:var(--t2)">Library only: mods do not change the client yet.</p>'},
skins:function(){var l=[{id:"steve",n:"Steve",url:steve()}].concat(S.skins).filter(function(s){return s.n.toLowerCase().indexOf(q)>-1});
 return '<h2>'+ic("shirt")+'Skins</h2><div class="row"><input id="q" placeholder="Search skins..." value="'+esc(q)+'"><button class="btn pri" id="add">'+ic("upload")+'Add skin</button></div><div class="grid">'+
 l.map(function(s){return '<div class="sk '+(S.acct.skin==s.id?"act":"")+'">'+(s.id!="steve"?'<span class="x" data-skd="'+s.id+'">'+ic("trash-2")+'</span>':"")+mc(s.url,4,"idle",1)+'<div style="margin-top:10px">'+esc(s.n)+'</div><small>Minecraft skin</small><button class="btn '+(S.acct.skin==s.id?"on":"")+'" data-sk="'+s.id+'" style="margin-top:10px">'+(S.acct.skin==s.id?"Selected":"Use skin")+'</button></div>'}).join("")+'</div>'},
capes:function(){var l=S.capes.filter(function(c){return c[0].toLowerCase().indexOf(q)>-1&&(ctab=="ALL"||(ctab=="OWNED"?c[1]:!c[1]))});
 return '<h2>'+ic("sparkles")+'Capes</h2><div class="tabs">'+["ALL","OWNED","AVAILABLE"].map(function(t){return '<button class="btn '+(t==ctab?"on":"")+'" data-ct="'+t+'">'+t+'</button>'}).join("")+'</div><div class="row"><input id="q" placeholder="Search capes..." value="'+esc(q)+'"></div><div class="grid">'+
 l.map(function(c){return '<div class="sk"><div class="cape" style="--c:'+c[2]+'"></div>'+esc(c[0])+'<small>'+(c[1]?"Owned":"Available")+'</small><button class="btn '+(S.cape==c[0]?"pri":"")+'" data-ce="'+esc(c[0])+'" style="margin-top:10px">'+(!c[1]?"Get":S.cape==c[0]?"Equipped":"Equip")+'</button></div>'}).join("")+'</div>'},
settings:function(){function T(k,n,d){return '<div class="srow"><span>'+n+'<small>'+d+'</small></span><div class="tg '+(S.tog[k]?"on":"")+'" data-tg="'+k+'"></div></div>'}
 var nav=[["theme","palette","Theme"],["bg","image","Background"],["lang","globe","Language"],["beh","sliders-horizontal","Behaviour"],["cred","info","Credits"],["adv","wrench","Advanced"]];
 return '<h2>'+ic("settings")+'Settings</h2><div class="setw"><div class="snav">'+nav.map(function(s){return '<button data-s="'+s[0]+'">'+ic(s[1])+s[2]+'</button>'}).join("")+'</div><div class="sbody">'+
 '<div class="card2 sec" id="s-theme"><h4>Theme</h4><p>The whole launcher follows the theme you pick.</p><div class="themes">'+THEMES.map(function(t,i){return '<div class="th '+(S.theme==i?"on":"")+'" data-th="'+i+'"><div style="background:linear-gradient(135deg,'+t[1]+' 55%,'+t[2]+' 55%)"></div><span>'+t[0]+'</span></div>'}).join("")+'</div>'+
 '<div class="srow" style="margin-top:12px"><span>Custom accent color<small>Overrides the theme accent</small></span><span class="row" style="margin:0"><input type="color" id="cc" value="'+ACC+'" style="width:54px;padding:3px"><button class="btn" id="ca">Reset</button></span></div></div>'+
 '<div class="card2 sec" id="s-bg"><h4>Background</h4><p>Pick an effect. Use the switch below to turn all animation off.</p><div class="opts">'+BGS.map(function(b){return '<div class="opt '+(S.bgm==b[0]?"on":"")+'" data-bg="'+b[0]+'">'+ic(b[2])+b[1]+'</div>'}).join("")+'</div>'+T("anim","Animations","Off = No Animation: background and characters stay still")+'</div>'+
 '<div class="card2 sec" id="s-lang"><h4>Language</h4><p>Choose the display language for the launcher</p><select id="lg"><option>English</option><option disabled>Deutsch (soon)</option><option disabled>Español (soon)</option></select></div>'+
 '<div class="card2 sec" id="s-beh"><h4>Behaviour</h4>'+T("upd","Auto Updates","Check for launcher updates")+T("snd","Sounds","UI sounds (placeholder)")+'</div>'+
 '<div class="card2 sec" id="s-cred"><h4>Credits</h4>'+C.credits.map(function(c){return '<div class="srow"><span>'+c[0]+'</span><span style="color:var(--t2);font-weight:400">'+c[1]+'</span></div>'}).join("")+'</div>'+
 '<div class="card2 sec" id="s-adv"><h4>Advanced</h4><p>'+lab(S.ver)+' · '+C.build+'</p><button class="btn" id="rs">'+ic("trash-2")+'Reset all launcher data</button></div></div></div>'}
};
function bind(){var p=$("#page"),x;
 if(x=$("#q"))x.oninput=function(){q=this.value.toLowerCase();var pos=this.selectionStart;render();var n=$("#q");n.focus();n.setSelectionRange(pos,pos)};
 if(x=$("#add"))x.onclick=function(){
  if(page=="profiles")modal("Create Profile",[["Name"],["Version",V0,vids()],["Type","NORISK",["NORISK","SERVER","MODPACKS"]]],function(v){if(v[0]){S.profiles.unshift([v[0],v[1],"just now",v[2]]);save();render()}});
  else if(page=="mods")modal("Import Mod",[["Mod name"],["Description"],["Version",V0,vids()]],function(v){if(v[0]){S.mods.push([v[0],v[1],v[2],0]);save();render()}},"Import");
  else $("#skf").click()};
 if(x=$("#up"))x.onclick=function(){$("#skf").click()};
 if(x=$("#st"))x.onclick=function(){S.acct.skin="steve";save();render()};
 if(x=$("#rn"))x.onclick=function(){$("#un").value=gen()};
 if(x=$("#sn"))x.onclick=function(){var v=$("#un").value.trim();if(!/^[A-Za-z0-9_]{3,16}$/.test(v))return toast("Use 3-16 letters, numbers or _");S.acct.name=v;save();render();toast("Username saved")};
 if(x=$("#go"))x.onclick=launch;
 if(x=$("#vs"))x.onchange=function(){S.ver=this.value;save();render()};
 if(x=$("#mvs"))x.onchange=function(){mv=this.value;render()};
 if(x=$("#lg"))x.onchange=function(){S.lang=this.value;save()};
 if(x=$("#cc"))x.oninput=function(){S.accent=this.value;save();style()};
 if(x=$("#ca"))x.onclick=function(){S.accent="";save();render()};
 if(x=$("#rs"))x.onclick=function(){if(confirm("Delete all saved launcher data?")){localStorage.removeItem(K);location.reload()}};
 [].forEach.call(document.querySelectorAll(".mc"),function(m){var d=0,x0=0,r0=0;m.onpointerdown=function(e){d=1;x0=e.clientX;r0=+m.dataset.ry||0;m.classList.add("drag");try{m.setPointerCapture(e.pointerId)}catch(z){}};
  m.onpointermove=function(e){if(d){var r=r0+(e.clientX-x0)*.8;m.dataset.ry=r;m.style.setProperty("--ry",r)}};m.onpointerup=m.onpointercancel=function(){d=0}});
 p.onclick=function(e){var t=e.target,d;
  if(d=t.closest("[data-pose]")){S.pose=d.dataset.pose;save();render()}
  else if(d=t.closest("[data-skd]")){var id=d.dataset.skd;S.skins=S.skins.filter(function(z){return z.id!=id});if(S.acct.skin==id)S.acct.skin="steve";save();render();e.stopPropagation()}
  else if(d=t.closest("[data-sk]")){S.acct.skin=d.dataset.sk;save();render()}
  else if(d=t.closest("[data-t]")){tab=d.dataset.t;render()}
  else if(d=t.closest("[data-ct]")){ctab=d.dataset.ct;render()}
  else if(d=t.closest("[data-pl]")){S.ver=vo(d.dataset.pl).id;save();go("play");launch()}
  else if(t.closest("[data-pm]"))go("mods");
  else if(d=t.closest("[data-pd]")){S.profiles=S.profiles.filter(function(z){return z[0]!=d.dataset.pd});save();render()}
  else if(d=t.closest("[data-mt]")){S.mods.forEach(function(m){if(m[0]==d.dataset.mt)m[3]=m[3]?0:1});save();render()}
  else if(t.closest("[data-ms]"))toast("Mod settings: coming soon");
  else if(d=t.closest("[data-ce]")){var c=S.capes.filter(function(z){return z[0]==d.dataset.ce})[0];if(c[1]){S.cape=c[0];save();render()}else toast("Not owned yet")}
  else if(d=t.closest("[data-th]")){S.theme=+d.dataset.th;S.accent="";save();render()}
  else if(d=t.closest("[data-bg]")){S.bgm=d.dataset.bg;save();render()}
  else if(d=t.closest("[data-tg]")){var k=d.dataset.tg;if(k=="anim")S.anim=S.anim?0:1;else S.tog[k]=S.tog[k]?0:1;save();render()}
  else if(d=t.closest("[data-s]")){var el=$("#s-"+d.dataset.s);el&&el.scrollIntoView({behavior:"smooth",block:"start"})}}}
$("#skf").onchange=function(){var f=this.files[0];this.value="";if(!f)return;var fr=new FileReader();fr.onload=function(){var im=new Image();im.onload=function(){
  if(im.width!=64||(im.height!=64&&im.height!=32))return toast("Skin must be 64x64 or 64x32 PNG");
  normalize(im,function(u){var id="s"+Date.now();S.skins.push({id:id,n:f.name.replace(/\.png$/i,"").slice(0,18)||"Skin",url:u});S.acct.skin=id;save();render();toast("Skin applied")})};
  im.onerror=function(){toast("That file is not a valid image")};im.src=fr.result};fr.readAsDataURL(f)};
function brand(w,v){var n=0,t=setInterval(function(){try{if(w.closed||n++>80){clearInterval(t);return}var d=w.document;if(d&&d.head){d.title=v.label;var l=d.querySelector("link[rel~=icon]");if(!l){l=d.createElement("link");l.rel="icon";d.head.appendChild(l)}l.href=FAV}}catch(e){}},250)}
function launch(){var v=vo(S.ver),url=cur().url||v.url,w=window.open("","_blank"),L=$("#lp"),st=$("#st");
 L.textContent="";$("#lf").innerHTML="";$("#lh").textContent=v.label;$("#log").classList.remove("hide");st.textContent="STARTING";$("#lx").onclick=function(){$("#log").classList.add("hide")};
 var steps=["Initializing instance "+cur().name+"...","Loading "+v.label+"...","Checking assets...","Preparing browser runtime...","Loading Eaglercraft...","Connecting...","Starting client..."],i=0;
 var t=setInterval(function(){if(i<steps.length){L.textContent+="> "+steps[i++]+"\n";L.scrollTop=1e5;return}clearInterval(t);
  if(!url){if(w)w.close();L.textContent+="! No client file set. Edit clients.js\n";st.textContent="NO URL";return}
  st.textContent="RUNNING · "+v.label.toUpperCase();var ps=$("#pst");if(ps)ps.textContent="RUNNING · "+v.label.toUpperCase();
  if(w){w.location=url;brand(w,v)}else $("#lf").innerHTML='Your browser blocked the new tab. <a href="'+esc(url)+'" target="_blank">Click here to open the client.</a>'},550)}
function render(){style();side();top();$("#page").innerHTML=P[page]();bind();if(window.lucide)lucide.createIcons()}
/* ---------- canvas backgrounds (code rain, starfield) ---------- */
var cv=$("#bg"),cx=cv.getContext("2d"),cols,dr,stars=[],last=0,clear=0;
function rz(){cv.width=innerWidth;cv.height=innerHeight;cols=Math.floor(cv.width/16);dr=[];for(var i=0;i<cols;i++)dr[i]=Math.random()*cv.height/16;stars=[];for(var j=0;j<110;j++)stars.push([Math.random()*cv.width,Math.random()*cv.height,Math.random()*1.6+.4,Math.random()*6,Math.random()*.25+.05])}
rz();addEventListener("resize",rz);
function loop(t){requestAnimationFrame(loop);var m=S.bgm;
 if(!S.anim||(m!="matrix"&&m!="stars")){if(!clear){cx.clearRect(0,0,cv.width,cv.height);clear=1}return}
 clear=0;if(t-last<50)return;last=t;
 if(m=="matrix"){cx.globalCompositeOperation="destination-out";cx.fillStyle="rgba(0,0,0,.12)";cx.fillRect(0,0,cv.width,cv.height);cx.globalCompositeOperation="source-over";cx.fillStyle=ACC+"88";cx.font="13px monospace";
  for(var i=0;i<cols;i++){cx.fillText(String.fromCharCode(33+Math.random()*90),i*16,dr[i]*16);if(dr[i]*16>cv.height&&Math.random()>.97)dr[i]=0;dr[i]++}}
 else{cx.clearRect(0,0,cv.width,cv.height);cx.fillStyle=ACC;stars.forEach(function(s){s[1]+=s[4];s[3]+=.05;if(s[1]>cv.height){s[1]=0;s[0]=Math.random()*cv.width}cx.globalAlpha=.25+.45*Math.abs(Math.sin(s[3]));cx.fillRect(s[0],s[1],s[2],s[2])});cx.globalAlpha=1}}
requestAnimationFrame(loop);
render();
})();
