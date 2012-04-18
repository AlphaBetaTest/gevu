/* Copyright 2011 Google Inc. All Rights Reserved. */ (function(){var DB_mode=!1;function DumpError(a){try{throw a;}catch(b){DumpException(b)}}
function DumpException(a,b){var c="Javascript exception: "+(b?b:"")+" "+a;BR_AgentContains_("msie")&&!window.opera&&(c+=" "+a.name+": "+a.message+" ("+a.number+")");var d="";if("string"==typeof a)d=a+"\n";else for(var e in a)try{d+=e+": "+a[e]+"\n"}catch(f){}d+=DB_GetStackTrace(DumpException.caller);c=c+"\n"+d;if(DB_mode){try{var h=(new Date).getTime()-DB_starttime,g="["+h+"] "+HtmlEscape(c).replace(/\n/g,"<br>")+"<br>",g="<font color=#ff0000><b>Error: "+g+"</b></font>";DB_win.focus()}catch(i){}DB_WriteDebugHtml(g)}else"undefined"!=
typeof log&&log(HtmlEscape(c))}var function_name_re_=/function (\w+)/;
function DB_GetStackTrace(a){try{if((!BR_AgentContains_("msie")||window.opera)&&!BR_AgentContains_("safari")&&!BR_AgentContains_("konqueror")&&BR_AgentContains_("mozilla"))return Error().stack;if(!a)return"";var b,c=function_name_re_.exec(""+a);b=c?c[1]:"";b="- "+b+"(";for(c=0;c<a.arguments.length;c++){0<c&&(b+=", ");var d=""+a.arguments[c];40<d.length&&(d=d.substr(0,40)+"...");b+=d}b+=")\n";return b+=DB_GetStackTrace(a.caller)}catch(e){return"[Cannot get stack trace]: "+e+"\n"}}
var DB_starttime,DB_win=null,DB_winopening=!1;
function DB_WriteDebugHtml(a){if(DB_mode)try{if((null==DB_win||DB_win.closed)&&!DB_winopening)try{DB_winopening=!0;DB_win=window.open("","debug","width=700,height=500,toolbar=no,resizable=yes,scrollbars=yes,left=16,top=16,screenx=16,screeny=16");DB_win.blur();DB_win.document.open();DB_winopening=!1;var b="<font color=#ff0000><b>To turn off this debugging window,hit 'D' inside the main caribou window, then close this window.</b></font><br>";DB_WriteDebugHtml(b)}catch(c){}DB_win.document.write(a);DB_win.scrollTo(0,
1E6)}catch(d){}};function BR_AgentContains_(a){return a in BR_AgentContains_cache_?BR_AgentContains_cache_[a]:BR_AgentContains_cache_[a]=-1!=navigator.userAgent.toLowerCase().indexOf(a)}var BR_AgentContains_cache_={};function HasClass(a,b){if(null==a||null==a.className)return!1;if(a.className==b)return!0;for(var c=a.className.split(" "),d=0;d<c.length;d++)if(c[d]==b)return!0;return!1}
function RemoveClass(a,b){if(null!=a.className)if(a.className==b)a.className="";else{for(var c=a.className.split(" "),d=[],e=!1,f=0;f<c.length;f++)c[f]!=b?c[f]&&d.push(c[f]):e=!0;e&&(a.className=d.join(" "))}}var amp_re_=/&/g,lt_re_=/</g,gt_re_=/>/g;function HtmlEscape(a){return!a?"":a.replace(amp_re_,"&amp;").replace(lt_re_,"&lt;").replace(gt_re_,"&gt;").replace(quote_re_,"&quot;")}var quote_re_=/\"/g;function forid_1(a){return document.getElementById(a)}
function forid_2(a){return document.all[a]}var forid=document.getElementById?forid_1:forid_2;function log(a){try{if(window.parent!=window&&window.parent.log){window.parent.log(window.name+"::"+a);return}}catch(b){}var c=forid("log");c?(a="<p class=logentry><span class=logdate>"+new Date+"</span><span class=logmsg>"+a+"</span></p>",c.innerHTML=a+c.innerHTML):window.status=a};function AS_Assert(){}AS_Assert.raise=function(a){if("undefined"!=typeof Error)throw Error(a||"Assertion Failed");throw a;};AS_Assert.fail=function(a){a=a||"Assertion failed";"undefined"!=typeof DumpError&&DumpError(a+"\n");AS_Assert.raise(a)};AS_Assert.isTrue=function(a,b){a||(void 0===b&&(b="Assertion failed"),AS_Assert.fail(b))};AS_Assert.equals=function(a,b,c){a!=b&&(void 0===c&&(c="AS_Assert.equals failed: <"+a+"> != <"+b+">"),AS_Assert.fail(c))};
AS_Assert.typeOf=function(a,b,c){if(typeof a!=b){if(a||""==a)try{if(b==AS_Assert.TYPE_MAP[typeof a]||a instanceof b)return}catch(d){}void 0===c&&("function"==typeof b&&(c=b.toString().match(/^\s*function\s+([^\s\{]+)/))&&(b=c[1]),c="AS_Assert.typeOf failed: <"+a+"> not typeof "+b);AS_Assert.fail(c)}};AS_Assert.TYPE_MAP={string:String,number:Number,"boolean":Boolean};
AS_Assert.numArgs=function(a,b){var c=AS_Assert.numArgs.caller;c&&c.arguments.length!=a&&(void 0===b&&(b=c.name+" expected "+a+" arguments  but received "+c.arguments.length),AS_Assert.fail(b))};var XH_ieProgId_,XH_ACTIVE_X_IDENTS$$inline_13=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];
if("undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var i$$inline_14=0;i$$inline_14<XH_ACTIVE_X_IDENTS$$inline_13.length;i$$inline_14++){var candidate$$inline_15=XH_ACTIVE_X_IDENTS$$inline_13[i$$inline_14];try{new ActiveXObject(candidate$$inline_15);XH_ieProgId_=candidate$$inline_15;break}catch(e$$inline_16){}}if(!XH_ieProgId_)throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed.");}
function XH_XmlHttpGET(a,b,c){a.open("GET",b,!0);a.onreadystatechange=c;try{a.send(null)}catch(d){throw log("XMLHttpSend failed "+d.toString()+"<br>"+d.stack),d;}};"undefined"==typeof log&&(log=function(){});function DST_toggleMeta(a){a:{for(;a;){if(HasClass(a,"collapse")){RemoveClass(a,"collapse");var b="expand";HasClass(a,b)||(a.className+=" "+b);a=!0;break a}if(HasClass(a,"expand")){RemoveClass(a,"expand");b="collapse";HasClass(a,b)||(a.className+=" "+b);a=!1;break a}a=a.parentNode}a=void 0}DST_setMetadataBubble(a)}
function DST_setMetadataBubble(a){var b=a?1:0,a=XH_ieProgId_?new ActiveXObject(XH_ieProgId_):new XMLHttpRequest,b=CS_env.projectHomeUrl+"/source/setmetabubble.do?alt=js&expanded="+b+"&cd="+(new Date).getTime();XH_XmlHttpGET(a,b,function(){})}_toggleMeta=DST_toggleMeta;})()