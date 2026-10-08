(function(){
var C=window.CONFIG,K="nrc5",NAME="NoRiskClient",$=function(s){return document.querySelector(s)};
var FAV=new URL(C.favicon||"faviconnorisk.png",location.href).href;
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function ic(n){return '<i data-lucide="'+n+'"></i>'}
/* FIXED CLIENT MAP: version -> display name -> file. Nothing the user types can change this. */
var VERSIONS=Object.freeze(["1.8.8","1.12.2","1.5.2","26.2"].map(function(id){return Object.freeze({id:id,label:"NoRiskClient "+id,url:"games/"+id+".html"})}));
function vo(id){for(var i=0;i<VERSIONS.length;i++)if(VERSIONS[i].id==id)return VERSIONS[i];return VERSIONS[0]}
function lab(id){return vo(id).label}
function vids(){return VERSIONS.map(function(v){return v.id})}
function vlabs(){return VERSIONS.map(function(v){return v.label})}
function idOf(label){for(var i=0;i<VERSIONS.length;i++)if(VERSIONS[i].label==label)return VERSIONS[i].id;return VERSIONS[0].id}
function okv(v){return vids().indexOf(v)>-1?v:VERSIONS[0].id}
var V0=VERSIONS[0].id;
function gen(){var R=["Risk","Risky","Riskiest"],P=["Player","Gamer","Sweat"];return R[Math.floor(Math.random()*3)]+P[Math.floor(Math.random()*3)]+String(Math.floor(Math.random()*1000)).padStart(3,"0")}
var THEMES=[["Midnight","#0b0d1a","#6366f1"],["Crimson","#12050a","#ef4444"],["Forest","#06110b","#22c55e"],["Ocean","#04101a","#06b6d4"],["Sunset","#150a05","#f97316"],["Amethyst","#0e0716","#a855f7"],["Rose","#150810","#ec4899"],["Graphite","#0d0d0f","#9ca3af"]];
var BGS=[["none","No animation","ban"],["ambient","Ambient movement","cloud"],["light","Lighting sweep","sun"],["matrix","Code rain","binary"],["stars","Starfield","sparkles"]];
function mkp(id,name,ver,type,last){return{id:id,name:name,ver:ver,type:type,last:last||"never",mods:[]}}
var def={prof:"p1",ver:V0,theme:0,accent:"",bgm:"none",anim:1,ui:1.25,pose:"walk",
 acct:{name:gen(),skin:"steve"},skins:[],
 profiles:[mkp("p1","NoRiskClient 1.8.8","1.8.8","NORISK","32m ago"),mkp("p2","NoRiskClient 1.12.2","1.12.2","NORISK","4mo ago"),mkp("p3","NoRiskClient 1.5.2","1.5.2","SERVER","4mo ago"),mkp("p4","NoRiskClient 26.2","26.2","NORISK","4mo ago")],
 ccapes:[],cape:"vanilla",view:"turn",apose:"wave",pv:1,tog:{upd:1,snd:1},lang:"English"};
var S=def,sv=null;try{sv=JSON.parse(localStorage.getItem(K)||"null");if(!sv){var o4=JSON.parse(localStorage.getItem("nrc4")||"null");if(o4){sv={};["theme","accent","bgm","anim","ui","uiv","pose","apose","view","pv","acct","skins","ccapes","cape","tog","lang","ver"].forEach(function(k){if(o4[k]!=null)sv[k]=o4[k]})}}
 if(sv){S=Object.assign(def,sv);S.tog=Object.assign({upd:1,snd:1},sv.tog)}}catch(e){}
if(!sv||!sv.uiv){S.ui=1.25;S.uiv=1}
if(!sv||!sv.pv){S.pose="walk";S.apose="wave";S.view="turn";S.pv=1}
S.ccapes=S.ccapes||[];if(typeof S.cape!="string")S.cape="vanilla";
S.ver=okv(S.ver);
S.profiles=(Array.isArray(S.profiles)&&S.profiles.length&&!Array.isArray(S.profiles[0])?S.profiles:def.profiles).filter(function(p){return vids().indexOf(p.ver)>-1}).map(function(p,i){return{id:String(p.id||"p"+i),name:String(p.name||"Profile").slice(0,24),ver:okv(p.ver),type:p.type||"NORISK",last:p.last||"never",mods:Array.isArray(p.mods)?p.mods:[]}});
if(!S.profiles.length)S.profiles=def.profiles.slice();
vids().forEach(function(v){if(!S.profiles.some(function(p){return p.ver==v}))S.profiles.push(mkp("p_"+v,"NoRiskClient "+v,v,"NORISK"))});
if(!S.profiles.some(function(p){return p.id==S.prof}))S.prof=(S.profiles.filter(function(p){return p.ver==S.ver})[0]||S.profiles[0]).id;
S.ver=S.profiles.filter(function(p){return p.id==S.prof})[0].ver;
if(!(S.theme>=0&&S.theme<THEMES.length))S.theme=0;if(!BGS.some(function(b){return b[0]==S.bgm}))S.bgm="none";
function save(){localStorage.setItem(K,JSON.stringify(S))}
function toast(t){var e=$("#toast");e.textContent=t;e.style.display="block";clearTimeout(toast.t);toast.t=setTimeout(function(){e.style.display="none"},2400)}
function cur(){return S.profiles.filter(function(p){return p.id==S.prof})[0]||S.profiles[0]}
function pick(id){var p=S.profiles.filter(function(x){return x.id==id})[0];if(p){S.prof=p.id;S.ver=p.ver}}
var UI=1;function ui(){return innerWidth<700?1:innerWidth<1000?Math.min(S.ui,1.1):S.ui}
var page="play",tab="ALL",ctab="ALL",q="",mv="ALL",hist=[],fwd=[],ACC="#6366f1";
/* ---------- skins ---------- */
var STEVE="steve.png";
(function(){var im=new Image();im.onload=function(){if(im.width==64&&im.height==32){try{normalize(im,function(u){STEVE=u;render()})}catch(e){}}};im.onerror=function(){setTimeout(function(){toast("steve.png not found. Add it next to index.html")},900)};im.src="steve.png"})();
function steve(){return STEVE}
function skinUrl(id){id=id||S.acct.skin;if(id=="steve")return steve();var s=S.skins.filter(function(k){return k.id==id})[0];return s?s.url:steve()}
var CB="https://minecraft.wiki/images/";
var BASE_CAPES=[["vanilla","Vanilla","One_Vanilla_Cape_%28texture%29.png"],["mojang","Mojang","Mojang_Cape_%28texture%29.png"],["c2011","Cape 2011","Cape2011_2015SPBedrock.png"]].map(function(c){return{id:c[0],n:c[1],url:CB+c[2],w:64,h:32,ok:1,base:1}});
function rr(){clearTimeout(rr.t);rr.t=setTimeout(function(){render()},80)}
BASE_CAPES.forEach(function(c){var im=new Image();im.onload=function(){c.w=im.naturalWidth;c.h=im.naturalHeight;rr()};im.onerror=function(){c.ok=0;rr()};im.src=c.url});
function capeList(){return BASE_CAPES.filter(function(c){return c.ok}).concat(S.ccapes)}
function capeData(){var c=capeList().filter(function(k){return k.id==S.cape})[0];return c?{url:c.url,w:c.w,h:c.h}:null}
function capeThumb(c){var k=6*64/Math.max(c.w,64);return '<div class="cpv" style="width:'+10*k+'px;height:'+16*k+'px;background-image:url(\''+c.url+'\');background-size:'+c.w*k+'px '+c.h*k+'px;background-position:-'+k+'px -'+k+'px"></div>'}
function normalize(img,cb){var c=document.createElement("canvas");c.width=c.height=64;var x=c.getContext("2d");x.imageSmoothingEnabled=false;x.drawImage(img,0,0);
 if(img.height==32){[[40,16,32,48],[0,16,16,48]].forEach(function(m){x.save();x.translate(m[2]+16,m[3]);x.scale(-1,1);x.drawImage(img,m[0],m[1],16,16,0,0,16,16);x.restore()})}
 cb(c.toDataURL())}
function cube(w,h,d,u,s,tex){function f(fw,fh,p,tr){var t;if(tex){var k=s*64/Math.max(tex.w,64);t="background-image:url('"+tex.url+"');background-size:"+tex.w*k+"px "+tex.h*k+"px;background-position:-"+p[0]*k+"px -"+p[1]*k+"px;"}else t="background-size:"+64*s+"px "+64*s+"px;background-position:-"+p[0]*s+"px -"+p[1]*s+"px;";return '<b style="width:'+fw*s+'px;height:'+fh*s+'px;left:'+(w-fw)*s/2+'px;top:'+(h-fh)*s/2+'px;'+t+'transform:'+tr+'"></b>'}
 return f(w,h,u.f,"translateZ("+d*s/2+"px)")+f(w,h,u.k,"rotateY(180deg) translateZ("+d*s/2+"px)")+f(d,h,u.r,"rotateY(-90deg) translateZ("+w*s/2+"px)")+f(d,h,u.l,"rotateY(90deg) translateZ("+w*s/2+"px)")+f(w,d,u.t,"rotateX(90deg) translateZ("+h*s/2+"px)")+f(w,d,u.b,"rotateX(-90deg) translateZ("+h*s/2+"px)")}
function mc(url,s,pose,still,cape,view,name){var tg=name?(function(){var f=Math.round(Math.max(13,s*1.7)),b=Math.round(s*.35),h='<div class="ntag" style="font-size:'+f+'px">'+ic("zap")+"<span>"+esc(name)+"</span></div>";return '<div class="t3" style="margin-bottom:'+b+'px">'+h+'</div><div class="t3 bk" style="margin-bottom:'+b+'px">'+h+"</div>"})():"";
 function P(cl,x,y,w,h,d,u,ex){return '<div class="pt '+cl+'" style="left:'+x*s+'px;top:'+y*s+'px;width:'+w*s+'px;height:'+h*s+'px">'+cube(w,h,d,u,s)+(ex||"")+'</div>'}
 var parts=P("hd",4,0,8,8,8,{t:[8,0],b:[16,0],r:[0,8],f:[8,8],l:[16,8],k:[24,8]},tg)+P("bd",4,8,8,12,4,{t:[20,16],b:[28,16],r:[16,20],f:[20,20],l:[28,20],k:[32,20]})+
 P("limb ar",0,8,4,12,4,{t:[44,16],b:[48,16],r:[40,20],f:[44,20],l:[48,20],k:[52,20]})+P("limb al",12,8,4,12,4,{t:[36,48],b:[40,48],r:[32,52],f:[36,52],l:[40,52],k:[44,52]})+
 P("limb lr",4,20,4,12,4,{t:[4,16],b:[8,16],r:[0,20],f:[4,20],l:[8,20],k:[12,20]})+P("limb ll",8,20,4,12,4,{t:[20,48],b:[24,48],r:[16,52],f:[20,52],l:[24,52],k:[28,52]});
 if(cape)parts+='<div class="pt" style="left:'+3*s+'px;top:'+8*s+'px;width:'+10*s+'px;height:'+16*s+'px;transform:translateZ('+(-2.6*s)+'px)"><div class="pt cp" style="width:100%;height:100%">'+cube(10,16,1,{t:[1,0],b:[11,0],r:[0,1],f:[12,1],l:[11,1],k:[1,1]},s,cape)+'</div></div>';
 return '<div class="mc'+(still?" still":"")+'" data-pose="'+pose+'" data-view="'+(view||"turn")+'" style="--s:'+s+'px;--skin:url(\''+url+'\');width:'+16*s+'px;height:'+32*s+'px"><div class="sway"><div class="bob"><div class="rig">'+parts+'</div></div></div></div>'}
function av(url){return '<u class="av" style="background-image:url(\''+url+'\')"></u>'}
/* ---------- theme / background ---------- */
function lum(h){var n=parseInt(h.slice(1),16),r=n>>16&255,g=n>>8&255,b=n&255;return(.299*r+.587*g+.114*b)/255}
function style(){var T=THEMES[S.theme]||THEMES[0],a=S.accent||T[2],r=document.documentElement.style;ACC=a;
 r.setProperty("--bg",T[1]);r.setProperty("--a",a);r.setProperty("--ac",lum(a)>.62?"#0b0b10":"#fff");
 UI=ui();r.setProperty("--ui",UI);var cl=document.body.classList;[].slice.call(cl).forEach(function(c){if(c.indexOf("bg-")==0)cl.remove(c)});cl.add("bg-"+S.bgm);
 $("#bg").style.display=(S.bgm=="matrix"||S.bgm=="stars")?"":"none";document.title=NAME}
/* ---------- chrome ---------- */
var NAV=[["play","play","Play"],["profiles","layout-list","Profiles"],["mods","puzzle","Mods"],["skins","shirt","Skins"],["capes","sparkles","Capes"]];
function side(){var h='<div class="logo">'+ic("zap")+'</div>';NAV.forEach(function(n){h+='<button data-p="'+n[0]+'" class="'+(page==n[0]?"on":"")+'">'+ic(n[1])+n[2]+'</button>'});
 h+='<div class="sp"></div><button data-p="settings" class="'+(page=="settings"?"on":"")+'">'+ic("settings")+'Settings</button>';$("#side").innerHTML=h;
 $("#side").onclick=function(e){var b=e.target.closest("button");if(b)go(b.dataset.p)}}
function go(p,nh){if(!nh&&p!=page){hist.push(page);fwd=[]}page=p;q="";render()}
function top(){var ins=S.profiles.map(function(p){return '<div data-i="'+p.id+'"><span>'+esc(p.name)+(p.name!=lab(p.ver)?'<small>'+lab(p.ver)+'</small>':'')+'</span>'+(p.id==S.prof?'<span class="tag">Current</span>':"")+'</div>'}).join("");
 $("#top").innerHTML='<button id="bk">'+ic("arrow-left")+'</button><button id="fw">'+ic("arrow-right")+'</button><h1>'+NAME+'<small>'+lab(S.ver).replace(NAME+" ","")+' · '+C.build+'</small></h1><span class="fl"></span><button id="bl">'+ic("bell")+'</button>'+
 '<div class="dd" id="ddi"><button class="ib" id="ib">'+ic("server")+'<span>Instances</span>'+ic("chevron-down")+'</button><div class="m">'+ins+'</div></div>'+
 '<button id="acc">'+av(skinUrl())+'<span class="ab">'+esc(S.acct.name)+'</span>'+ic("chevron-down")+'</button><button id="soc">'+ic("users")+'</button><button id="lnk">'+ic("link")+'</button><button class="wc" id="mn">'+ic("minus")+'</button><button class="wc" id="mx">'+ic("maximize")+'</button><button class="wc" id="cl">'+ic("x")+'</button>';
 $("#bk").onclick=function(){if(hist.length){fwd.push(page);go(hist.pop(),1)}};
 $("#fw").onclick=function(){if(fwd.length){hist.push(page);go(fwd.pop(),1)}};
 $("#bl").onclick=function(){toast("No new notifications")};
 $("#ib").onclick=function(e){e.stopPropagation();$("#ddi").classList.toggle("open")};
 $("#ddi .m").onclick=function(e){e.stopPropagation();var r=e.target.closest("[data-i]");if(r){pick(r.dataset.i);save();render()}};
 $("#acc").onclick=function(){go("account")};$("#soc").onclick=function(){toast("Friends: coming soon")};
 $("#lnk").onclick=function(){try{navigator.clipboard.writeText(location.href)}catch(e){}toast("Link copied")};
 $("#mn").onclick=function(){var p=$("#page");p.style.display=p.style.display=="none"?"":"none"};
 $("#mx").onclick=function(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()};
 $("#cl").onclick=function(){toast("Close this browser tab to exit")}}
document.addEventListener("click",function(){var d=$("#ddi");d&&d.classList.remove("open");var l=$("#lw");l&&l.classList.remove("open")});
function modal(title,fields,ok,btn){var h='<h2>'+title+'</h2>';fields.forEach(function(f,i){h+='<label>'+f[0]+'</label>'+(f[2]?'<select id="f'+i+'">'+f[2].map(function(o){return '<option '+(o==f[1]?"selected":"")+'>'+esc(o)+'</option>'}).join("")+'</select>':'<input id="f'+i+'" value="'+esc(f[1])+'">')});
 h+='<div class="row" style="margin:18px 0 0;justify-content:flex-end"><button class="btn" id="mc">Cancel</button><button class="btn pri" id="mo">'+(btn||"Create")+'</button></div>';
 $("#mb").innerHTML=h;$("#modal").classList.remove("hide");$("#mc").onclick=function(){$("#modal").classList.add("hide")};
 $("#mo").onclick=function(){var v=fields.map(function(f,i){return $("#f"+i).value});$("#modal").classList.add("hide");ok(v)}}
/* ---------- pages ---------- */
var NO=0;
function newsHTML(){var n=C.news||[],o="";for(var i=0;i<3&&n.length;i++){var it=n[(NO+i)%n.length];o+='<div class="nc"><div class="im"><img alt="" referrerpolicy="no-referrer" src="'+esc(it.img)+'" onerror="this.parentNode.classList.add(\'nf\');this.remove()"></div><div class="t"><small>'+esc(it.tag)+'</small><b>'+esc(it.title)+'</b></div></div>'}return o}
function chips(){return '<div class="chips">'+[["wave","Wave"],["idle","Idle"],["walk","Run"]].map(function(p){return '<button class="btn '+(S.apose==p[0]?"on":"")+'" data-apose="'+p[0]+'">'+p[1]+'</button>'}).join("")+'</div><div class="chips">'+[["turn","Turning"],["front","Front"],["back","Back (cape)"]].map(function(p){return '<button class="btn '+(S.view==p[0]?"on":"")+'" data-view="'+p[0]+'">'+p[1]+'</button>'}).join("")+'</div>'}
function acctCards(){var lib=[{id:"steve",n:"Steve (default)",url:steve()}].concat(S.skins);
 return '<div class="card2"><h4>Username</h4><p>Shown in the launcher. It does not change anything inside the game yet.</p><div class="row"><input id="un" maxlength="16" value="'+esc(S.acct.name)+'"><button class="btn" id="rn">'+ic("shuffle")+'Random</button></div><button class="btn pri" id="sn">'+ic("check")+'Save username</button></div>'+
 '<div class="card2"><h4>Minecraft skin</h4><p>Upload a normal Minecraft skin PNG (64×64 or 64×32).</p><div class="row" style="margin:0"><button class="btn pri" id="up">'+ic("upload")+'Upload skin</button><button class="btn" id="st">'+ic("rotate-ccw")+'Reset to Steve</button></div>'+
 '<div class="skl">'+lib.map(function(s){return '<div class="sl '+(S.acct.skin==s.id?"on":"")+'" data-sk="'+s.id+'">'+av(s.url)+'<span>'+esc(s.n)+'</span>'+(s.id!="steve"?'<span class="x" data-skd="'+s.id+'">'+ic("trash-2")+'</span>':"")+'</div>'}).join("")+'</div></div>'}
var P={
play:function(){var v=vo(S.ver),s=innerWidth<900?9:Math.max(4,Math.min(16,Math.floor((innerHeight/UI-220)/34)));
 return '<div class="play"><div class="stage"><div class="sa">Animate character <div class="tg '+(S.anim?"on":"")+'" data-tg="anim"></div></div><div class="hero"><div class="cwrap" style="padding-top:'+Math.round(Math.max(13,s*1.7)*1.35+10)+'px">'+mc(skinUrl(),s,S.pose,!S.anim,capeData(),"side",S.acct.name)+'</div>'+
 '<div class="launch" style="margin-top:-'+Math.round(s*5)+'px"><button class="big" id="go">Launch<small>'+(cur().name!=v.label?esc(cur().name)+' · '+v.label:v.label)+'</small></button><div class="lw" id="lw"><button class="arr" id="lt">'+ic("chevron-down")+'</button><div class="lm">'+S.profiles.map(function(p){return '<div class="lo '+(p.id==S.prof?"on":"")+'" data-vm="'+p.id+'"><span>'+esc(p.name)+(p.name!=lab(p.ver)?'<small>'+lab(p.ver)+'</small>':'')+'</span>'+(p.id==S.prof?ic("check"):"")+'</div>'}).join("")+'</div></div></div></div></div>'+
 '<div class="news"><h2>'+ic("newspaper")+'Minecraft News</h2><div class="nl">'+newsHTML()+'</div></div></div>'},
account:function(){return '<h2>'+ic("user")+'Account</h2><div class="acc"><div class="card2 prev"><div style="padding-top:46px">'+mc(skinUrl(),11,S.apose,0,capeData(),S.view,S.acct.name)+'</div>'+chips()+'</div><div>'+acctCards()+'</div></div>'},
profiles:function(){var l=S.profiles.filter(function(p){return(tab=="ALL"||p.type==tab)&&p.name.toLowerCase().indexOf(q)>-1});
 return '<h2>'+ic("layout-list")+'Profiles</h2><div class="tabs">'+["ALL","NORISK","SERVER","MODPACKS"].map(function(t){return '<button class="btn '+(t==tab?"on":"")+'" data-t="'+t+'">'+t+'</button>'}).join("")+'</div><div class="row"><input id="q" placeholder="Search profiles..." value="'+esc(q)+'"><button class="btn pri" id="add">'+ic("plus")+'Create</button></div><div class="list">'+
 l.map(function(p){return '<div class="it"><div class="ic">'+ic("zap")+'</div><div class="i">'+esc(p.name)+(p.id==S.prof?' <span class="tag">Selected</span>':"")+'<small>'+lab(p.ver)+' · '+p.mods.length+' mods · '+p.last+'</small></div><button class="btn pri" data-pl="'+p.id+'">'+ic("play")+'Play</button><button class="btn" data-pm="'+p.id+'">'+ic("puzzle")+'Mods</button><button class="btn" data-pd="'+p.id+'">'+ic("trash-2")+'</button></div>'}).join("")+(l.length?"":'<p style="color:var(--t2)">No profiles found.</p>')+'</div>'},
mods:function(){var p=cur(),l=p.mods.map(function(m,i){return{m:m,i:i}}).filter(function(o){return o.m[0].toLowerCase().indexOf(q)>-1});
 return '<h2>'+ic("puzzle")+'Mods</h2><div class="row"><select id="mp">'+S.profiles.map(function(x){return '<option value="'+x.id+'" '+(x.id==S.prof?"selected":"")+'>'+esc(x.name)+'</option>'}).join("")+'</select><input id="q" placeholder="Search mods..." value="'+esc(q)+'"><button class="btn pri" id="add">'+ic("plus")+'Import</button></div><div class="list">'+
 l.map(function(o){return '<div class="it"><div class="ic">'+ic("puzzle")+'</div><div class="i">'+esc(o.m[0])+'<small>'+esc(o.m[1])+'</small></div><div class="tg '+(o.m[2]?"on":"")+'" data-mt="'+o.i+'"></div><button class="btn" data-mdel="'+o.i+'">'+ic("trash-2")+'</button></div>'}).join("")+(l.length?"":'<p style="color:var(--t2)">No mods in this profile yet. Tap Import to add one.</p>')+'</div><p style="color:var(--t2)">Mods are saved per profile. They are visual only and do not change the client yet.</p>'},
skins:function(){var l=[{id:"steve",n:"Steve",url:steve()}].concat(S.skins).filter(function(s){return s.n.toLowerCase().indexOf(q)>-1});
 return '<h2>'+ic("shirt")+'Skins</h2><div class="row"><input id="q" placeholder="Search skins..." value="'+esc(q)+'"><button class="btn pri" id="add">'+ic("upload")+'Add skin</button></div><div class="grid">'+
 l.map(function(s){return '<div class="sk '+(S.acct.skin==s.id?"act":"")+'">'+(s.id!="steve"?'<span class="x" data-skd="'+s.id+'">'+ic("trash-2")+'</span>':"")+mc(s.url,5,"wave",0,null,"turn")+'<div style="margin-top:10px">'+esc(s.n)+'</div><small>Minecraft skin</small><button class="btn '+(S.acct.skin==s.id?"on":"")+'" data-sk="'+s.id+'" style="margin-top:10px">'+(S.acct.skin==s.id?"Selected":"Use skin")+'</button></div>'}).join("")+'</div>'},
capes:function(){var l=capeList().filter(function(c){return c.n.toLowerCase().indexOf(q)>-1});
 return '<h2>'+ic("sparkles")+'Capes</h2><div class="row"><input id="q" placeholder="Search capes..." value="'+esc(q)+'"><button class="btn pri" id="cpi">'+ic("upload")+'Import cape</button></div><div class="grid"><div class="sk '+(S.cape=="none"?"act":"")+'"><div class="cpv none"></div>No Cape<small>Default</small><button class="btn '+(S.cape=="none"?"on":"")+'" data-cp="none" style="margin-top:10px">'+(S.cape=="none"?"Equipped":"Equip")+'</button></div>'+
 l.map(function(c){return '<div class="sk '+(S.cape==c.id?"act":"")+'">'+(c.base?"":'<span class="x" data-cd="'+c.id+'">'+ic("trash-2")+'</span>')+capeThumb(c)+esc(c.n)+'<small>'+(c.base?"Minecraft cape":"Imported")+'</small><button class="btn '+(S.cape==c.id?"on":"")+'" data-cp="'+c.id+'" style="margin-top:10px">'+(S.cape==c.id?"Equipped":"Equip")+'</button></div>'}).join("")+'</div><p style="color:var(--t2)">Import a normal Minecraft cape PNG (64×32 or 22×17).</p>'},
settings:function(){function T(k,n,d){return '<div class="srow"><span>'+n+'<small>'+d+'</small></span><div class="tg '+(S.tog[k]?"on":"")+'" data-tg="'+k+'"></div></div>'}
 var nav=[["ui","zoom-in","Interface size"],["theme","palette","Theme"],["bg","image","Background"],["acct","user","Account & Skin"],["lang","globe","Language"],["beh","sliders-horizontal","Behaviour"],["adv","wrench","Advanced"]];
 return '<h2>'+ic("settings")+'Settings</h2><div class="setw"><div class="snav">'+nav.map(function(n){return '<button data-s="'+n[0]+'">'+ic(n[1])+n[2]+'</button>'}).join("")+'</div><div class="sbody">'+
 '<div class="card2 sec" id="s-ui"><h4>Interface size</h4><p>Make the whole launcher bigger or smaller, like browser zoom.</p><div class="opts">'+[[1,"100%"],[1.25,"125%"],[1.5,"150%"],[1.75,"175%"]].map(function(z){return '<div class="opt '+(S.ui==z[0]?"on":"")+'" data-ui="'+z[0]+'">'+ic("zoom-in")+z[1]+'</div>'}).join("")+'</div></div>'+
 '<div class="card2 sec" id="s-theme"><h4>Theme</h4><p>The whole launcher follows the theme you pick.</p><div class="themes">'+THEMES.map(function(t,i){return '<div class="th '+(S.theme==i?"on":"")+'" data-th="'+i+'"><div style="background:linear-gradient(135deg,'+t[1]+' 55%,'+t[2]+' 55%)"></div><span>'+t[0]+'</span></div>'}).join("")+'</div>'+
 '<div class="srow" style="margin-top:12px"><span>Custom accent color<small>Overrides the theme accent</small></span><span class="row" style="margin:0"><input type="color" id="cc" value="'+ACC+'" style="width:54px;padding:3px"><button class="btn" id="ca">Reset</button></span></div></div>'+
 '<div class="card2 sec" id="s-bg"><h4>Background animation</h4><p>Off by default. Pick a subtle effect if you want one.</p><div class="opts">'+BGS.map(function(b){return '<div class="opt '+(S.bgm==b[0]?"on":"")+'" data-bg="'+b[0]+'">'+ic(b[2])+b[1]+'</div>'}).join("")+'</div>'+'<h4 style="margin:18px 0 8px">Character animation on Home</h4><div class="opts">'+[["walk","Run","footprints"],["idle","Idle","user"],["wave","Wave","hand"]].map(function(b){return '<div class="opt '+(S.pose==b[0]?"on":"")+'" data-hp="'+b[0]+'">'+ic(b[2])+b[1]+'</div>'}).join("")+'</div>'+T("anim","Animate character","Turn off to freeze the character")+'</div>'+
 '<div class="sec" id="s-acct"><h4 style="margin:4px 0 10px">Account &amp; Minecraft skin</h4>'+acctCards()+'</div>'+
 '<div class="card2 sec" id="s-lang"><h4>Language</h4><p>Choose the display language for the launcher</p><select id="lg"><option>English</option><option disabled>Deutsch (soon)</option><option disabled>Español (soon)</option></select></div>'+
 '<div class="card2 sec" id="s-beh"><h4>Behaviour</h4>'+T("upd","Auto Updates","Check for launcher updates")+T("snd","Sounds","UI sounds (placeholder)")+'</div>'+
  '<div class="card2 sec" id="s-adv"><h4>Advanced</h4><p>'+lab(S.ver)+' · '+C.build+'</p><button class="btn" id="rs">'+ic("trash-2")+'Reset all launcher data</button></div></div></div>'}
};
function bind(){var p=$("#page"),x;
 if(x=$("#q"))x.oninput=function(){q=this.value.toLowerCase();var pos=this.selectionStart;render();var n=$("#q");n.focus();n.setSelectionRange(pos,pos)};
 if(x=$("#add"))x.onclick=function(){
  if(page=="profiles")modal("Create Profile",[["Profile name"],["Version",lab(V0),vlabs()],["Type","NORISK",["NORISK","SERVER","MODPACKS"]]],function(v){var n=v[0].trim().slice(0,24);if(!n)return toast("Name needed");var p=mkp("p"+Date.now(),n,idOf(v[1]),v[2]);S.profiles.unshift(p);pick(p.id);save();render();toast("Profile created")});
  else if(page=="mods")modal("Import Mod",[["Mod name"],["Description"]],function(v){var n=v[0].trim();if(n){cur().mods.push([n.slice(0,40),v[1].slice(0,80),1]);save();render()}},"Import");
  else $("#skf").click()};
 if(x=$("#up"))x.onclick=function(){$("#skf").click()};
 if(x=$("#st"))x.onclick=function(){S.acct.skin="steve";save();render()};
 if(x=$("#rn"))x.onclick=function(){$("#un").value=gen()};
 if(x=$("#sn"))x.onclick=function(){var v=$("#un").value.trim();if(!/^[A-Za-z0-9_]{3,16}$/.test(v))return toast("Use 3-16 letters, numbers or _");S.acct.name=v;save();render();toast("Username saved")};
 if(x=$("#go"))x.onclick=launch;
 if(x=$("#vs"))x.onchange=function(){S.ver=this.value;save();render()};
 if(x=$("#mp"))x.onchange=function(){pick(this.value);save();render()};
 if(x=$("#lg"))x.onchange=function(){S.lang=this.value;save()};
 if(x=$("#cc"))x.oninput=function(){S.accent=this.value;save();style()};
 if(x=$("#ca"))x.onclick=function(){S.accent="";save();render()};
 if(x=$("#rs"))x.onclick=function(){if(confirm("Delete all saved launcher data?")){localStorage.removeItem(K);location.reload()}};
 [].forEach.call(document.querySelectorAll(".mc"),function(m){var d=0,x0=0,r0=0;m.onpointerdown=function(e){d=1;x0=e.clientX;r0=+m.dataset.ry||0;m.classList.add("drag");try{m.setPointerCapture(e.pointerId)}catch(z){}};
  m.onpointermove=function(e){if(d){var r=r0+(e.clientX-x0)*.8/UI;m.dataset.ry=r;m.style.setProperty("--ry",r)}};m.onpointerup=m.onpointercancel=function(){d=0;m.classList.remove("drag")}});
 if(x=$("#cpi"))x.onclick=function(){$("#cpf").click()};
 if(x=$("#lt"))x.onclick=function(e){e.stopPropagation();$("#lw").classList.toggle("open")};
 p.onclick=function(e){var t=e.target,d;
  if(d=t.closest("[data-apose]")){S.apose=d.dataset.apose;save();render()}
  else if(d=t.closest("[data-ui]")){S.ui=+d.dataset.ui;save();render()}
  else if(d=t.closest("[data-hp]")){S.pose=d.dataset.hp;save();render()}
  else if(d=t.closest("[data-cp]")){S.cape=d.dataset.cp;save();render()}
  else if(d=t.closest("[data-cd]")){var cid=d.dataset.cd;S.ccapes=S.ccapes.filter(function(z){return z.id!=cid});if(S.cape==cid)S.cape="vanilla";save();render();e.stopPropagation()}
  else if(d=t.closest("[data-view]")){S.view=d.dataset.view;save();render()}
  else if(d=t.closest("[data-vm]")){pick(d.dataset.vm);save();render()}
  else if(d=t.closest("[data-skd]")){var id=d.dataset.skd;S.skins=S.skins.filter(function(z){return z.id!=id});if(S.acct.skin==id)S.acct.skin="steve";save();render();e.stopPropagation()}
  else if(d=t.closest("[data-sk]")){S.acct.skin=d.dataset.sk;save();render()}
  else if(d=t.closest("[data-t]")){tab=d.dataset.t;render()}
  else if(d=t.closest("[data-ct]")){ctab=d.dataset.ct;render()}
  else if(d=t.closest("[data-pl]")){pick(d.dataset.pl);cur().last="just now";save();go("play");launch()}
  else if(d=t.closest("[data-pm]")){pick(d.dataset.pm);save();go("mods")}
  else if(d=t.closest("[data-pd]")){if(S.profiles.length<2)toast("Keep at least 1 profile");else{S.profiles=S.profiles.filter(function(z){return z.id!=d.dataset.pd});if(!S.profiles.some(function(z){return z.id==S.prof}))pick(S.profiles[0].id);save();render()}}
  else if(d=t.closest("[data-mt]")){var mm=cur().mods[+d.dataset.mt];if(mm){mm[2]=mm[2]?0:1;save();render()}}
  else if(d=t.closest("[data-mdel]")){cur().mods.splice(+d.dataset.mdel,1);save();render()}
  else if(t.closest("[data-ms]"))toast("Mod settings: coming soon");
  else if(d=t.closest("[data-ce]")){var c=S.capes.filter(function(z){return z[0]==d.dataset.ce})[0];if(c[1]){S.cape=c[0];save();render()}else toast("Not owned yet")}
  else if(d=t.closest("[data-th]")){S.theme=+d.dataset.th;S.accent="";save();render()}
  else if(d=t.closest("[data-bg]")){S.bgm=d.dataset.bg;save();render()}
  else if(d=t.closest("[data-tg]")){var k=d.dataset.tg;if(k=="anim")S.anim=S.anim?0:1;else S.tog[k]=S.tog[k]?0:1;save();render()}
  else if(d=t.closest("[data-s]")){var el=$("#s-"+d.dataset.s);el&&el.scrollIntoView({behavior:"smooth",block:"start"})}}}
$("#cpf").onchange=function(){var f=this.files[0];this.value="";if(!f)return;var fr=new FileReader();fr.onload=function(){var im=new Image();im.onload=function(){var ok=(im.width==64&&im.height==32)||(im.width==22&&im.height==17)||(im.width==128&&im.height==64);if(!ok)return toast("Cape must be a 64x32 or 22x17 PNG");var id="c"+Date.now();S.ccapes.push({id:id,n:f.name.replace(/\.png$/i,"").slice(0,18)||"Cape",url:fr.result,w:im.width,h:im.height,ok:1});S.cape=id;save();render();toast("Cape imported")};im.onerror=function(){toast("That file is not a valid image")};im.src=fr.result};fr.readAsDataURL(f)};
$("#skf").onchange=function(){var f=this.files[0];this.value="";if(!f)return;var fr=new FileReader();fr.onload=function(){var im=new Image();im.onload=function(){
  if(im.width!=64||(im.height!=64&&im.height!=32))return toast("Skin must be 64x64 or 64x32 PNG");
  normalize(im,function(u){var id="s"+Date.now();S.skins.push({id:id,n:f.name.replace(/\.png$/i,"").slice(0,18)||"Skin",url:u});S.acct.skin=id;save();render();toast("Skin applied")})};
  im.onerror=function(){toast("That file is not a valid image")};im.src=fr.result};fr.readAsDataURL(f)};
function pad(n){return String(n).padStart(2,"0")}
function modv(n){var h=0;for(var i=0;i<n.length;i++)h=(h*31+n.charCodeAt(i))>>>0;return(h%3+1)+"."+(h>>3)%20+"."+(h>>7)%10}
function brand(w,label){var t=setInterval(function(){try{if(w.closed){clearInterval(t);return}var d=w.document;if(!d||!d.head||d.__nrc)return;d.__nrc=1;
  var ap=function(){if(ap.b)return;ap.b=1;try{if(d.title!==label)d.title=label;var ls=d.querySelectorAll("link[rel~=icon]"),ok=ls.length==1&&ls[0].href==FAV;if(!ok){[].forEach.call(ls,function(l){l.remove()});var l=d.createElement("link");l.rel="icon";l.href=FAV;d.head.appendChild(l)}}catch(e){}ap.b=0};
  ap();new MutationObserver(ap).observe(d.head,{childList:true,subtree:true,characterData:true,attributes:true})}catch(e){}},300)}
function logLines(){var mods=cur().mods.filter(function(m){return m[2]}),o=[];function T(){var d=new Date();return"["+pad(d.getHours())+":"+pad(d.getMinutes())+":"+pad(d.getSeconds())+"] "}
 o.push(T()+"Loading Minecraft "+S.ver+(mods.length?" with Fabric Loader 0.19.5":""));
 if(mods.length){o.push(T()+"Loading "+(mods.length+3)+" mods:");mods.forEach(function(m){o.push("    \t- "+m[0].toLowerCase().replace(/\s+/g,"-")+" "+modv(m[0])+"+mc"+S.ver)});o.push("    \t- fabricloader 0.19.5","    \t- java 21","    \t- minecraft "+S.ver);o.push(T()+"SpongePowered MIXIN Subsystem Version=0.8.7 Service=Knot/Fabric Env=CLIENT")}
 o.push(T()+"Setting user: "+S.acct.name,T()+"Instance: "+cur().name,T()+"Backend library: LWJGL version 3.3.3",T()+"Checking assets...",T()+"Preparing browser runtime...",T()+"Loading Eaglercraft...",T()+"Reloading ResourceManager: vanilla",T()+"Sound engine started",T()+"Created: 1024x512x4 minecraft:textures/atlas/blocks.png-atlas",T()+"Created: 512x256x4 minecraft:textures/atlas/particles.png-atlas",T()+"Starting client...");return o}
function launch(){var v=vo(S.ver),url=v.url,w=window.open(url,"_blank"),L=$("#lp"),st=$("#st"),ln=logLines(),i=0;
 L.textContent="";$("#lf").innerHTML="";$("#lh").textContent=v.label;$("#log").classList.remove("hide");st.textContent="STARTING";$("#lx").onclick=function(){$("#log").classList.add("hide")};
 if(w)brand(w,cur().name);else $("#lf").innerHTML='Your browser blocked the new tab. <a href="'+esc(url)+'" target="_blank">Click here to open the client.</a>';
 var t=setInterval(function(){if(i<ln.length){L.textContent+=ln[i++]+"\n";L.scrollTop=1e5;return}clearInterval(t);st.textContent="RUNNING · "+v.label.toUpperCase();var ps=$("#pst");if(ps)ps.textContent=cur().name+" · Running"},90)}
function render(){style();side();top();$("#page").className=page=="play"?"home":"";$("#page").innerHTML=P[page]();bind();if(window.lucide)lucide.createIcons()}
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
addEventListener("resize",function(){clearTimeout(rz.t);rz.t=setTimeout(function(){style();if(page=="play")render()},200)});
setInterval(function(){var l=$(".nl");if(page!="play"||document.hidden||!l||!(C.news||[]).length)return;NO=(NO+3)%C.news.length;l.classList.add("fade");setTimeout(function(){l.innerHTML=newsHTML();l.classList.remove("fade")},380)},9000);
render();
})();
