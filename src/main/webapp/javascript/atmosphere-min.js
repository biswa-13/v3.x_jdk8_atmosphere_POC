(function(a,b){if(typeof define==="function"&&define.amd){define(b)
}else{if(typeof exports!=="undefined"){module.exports=b()
}else{a.atmosphere=b()
}}}(this,function(){var a={},d,c=false,g=[],f=[],e=0,b=Object.prototype.hasOwnProperty;
a={version:"3.1.0-javascript",onError:function(h){},onClose:function(h){},onOpen:function(h){},onReopen:function(h){},onMessage:function(h){},onReconnect:function(i,h){},onMessagePublished:function(h){},onTransportFailure:function(i,h){},onLocalMessage:function(h){},onFailureToReconnect:function(i,h){},onClientTimeout:function(h){},onOpenAfterResume:function(h){},WebsocketApiAdapter:function(i){var h,j;
i.onMessage=function(k){j.onmessage({data:k.responseBody})
};
i.onMessagePublished=function(k){j.onmessage({data:k.responseBody})
};
i.onOpen=function(k){j.onopen(k)
};
j={close:function(){h.close()
},send:function(k){h.push(k)
},onmessage:function(k){},onopen:function(k){},onclose:function(k){},onerror:function(k){}};
h=new a.subscribe(i);
return j
},AtmosphereRequest:function(ad){var p={timeout:300000,method:"GET",headers:{},contentType:"",callback:null,url:"",data:"",suspend:true,maxRequest:-1,reconnect:true,maxStreamingLength:10000000,lastIndex:0,logLevel:"info",requestCount:0,fallbackMethod:"GET",fallbackTransport:"streaming",transport:"long-polling",webSocketImpl:null,webSocketBinaryType:null,dispatchUrl:null,webSocketPathDelimiter:"@@",enableXDR:false,rewriteURL:false,attachHeadersAsQueryString:true,executeCallbackBeforeReconnect:false,readyState:0,withCredentials:false,trackMessageLength:false,messageDelimiter:"|",connectTimeout:-1,reconnectInterval:0,dropHeaders:true,uuid:0,shared:false,readResponsesHeaders:false,maxReconnectOnClose:5,enableProtocol:true,disableDisconnect:false,pollingInterval:0,heartbeat:{client:null,server:null},ackInterval:0,reconnectOnServerError:true,handleOnlineOffline:true,maxWebsocketErrorRetries:1,curWebsocketErrorRetries:0,unloadBackwardCompat:false,onError:function(aJ){},onClose:function(aJ){},onOpen:function(aJ){},onMessage:function(aJ){},onReopen:function(aK,aJ){},onReconnect:function(aK,aJ){},onMessagePublished:function(aJ){},onTransportFailure:function(aK,aJ){},onLocalMessage:function(aJ){},onFailureToReconnect:function(aK,aJ){},onClientTimeout:function(aJ){},onOpenAfterResume:function(aJ){}};
var at={status:200,reasonPhrase:"OK",responseBody:"",messages:[],headers:[],state:"messageReceived",transport:"polling",error:null,request:null,partialMessage:"",errorHandled:false,closedByClientTimeout:false,ffTryingReconnect:false};
var ax=null;
var ah=null;
var z=null;
var n=null;
var X=null;
var u=true;
var az=0;
var J=0;
var al="X";
var aH=false;
var Q=null;
var h;
var ay=null;
var R=a.util.now();
var y;
var aG;
var Y=false;
ap(ad);
function ak(){u=true;
aH=false;
az=0;
ax=null;
ah=null;
z=null;
n=null
}function U(){l();
ak()
}function w(aJ){if(aJ=="debug"){return p.logLevel==="debug"
}else{if(aJ=="info"){return p.logLevel==="info"||p.logLevel==="debug"
}else{if(aJ=="warn"){return p.logLevel==="warn"||p.logLevel==="info"||p.logLevel==="debug"
}else{if(aJ=="error"){return p.logLevel==="error"||p.logLevel==="warn"||p.logLevel==="info"||p.logLevel==="debug"
}else{return false
}}}}}function aI(aJ){if(w("debug")){a.util.debug(new Date()+" Atmosphere: "+aJ)
}}function I(aK,aJ){if(at.partialMessage===""&&(aJ.transport==="streaming")&&(aK.responseText.length>aJ.maxStreamingLength)){return true
}return false
}function D(){if(p.enableProtocol&&!p.disableDisconnect&&!p.firstMessage){var aL="X-Atmosphere-Transport=close&X-Atmosphere-tracking-id="+p.uuid;
a.util.each(p.headers,function(aN,aP){var aO=a.util.isFunction(aP)?aP.call(this,p,p,at):aP;
if(aO!=null){aL+="&"+encodeURIComponent(aN)+"="+encodeURIComponent(aO)
}});
var aJ=p.url.replace(/([?&])_=[^&]*/,aL);
aJ=aJ+(aJ===p.url?(/\?/.test(p.url)?"&":"?")+aL:"");
var aK={connected:false};
var aM=new a.AtmosphereRequest(aK);
aM.connectTimeout=p.connectTimeout;
aM.attachHeadersAsQueryString=false;
aM.dropHeaders=true;
aM.url=aJ;
aM.contentType="text/plain";
aM.transport="polling";
aM.method="GET";
aM.data="";
aM.heartbeat=null;
if(p.enableXDR){aM.enableXDR=p.enableXDR
}an("",aM)
}}function H(){aI("Closing (AtmosphereRequest._close() called)");
aH=true;
if(p.reconnectId){clearTimeout(p.reconnectId);
delete p.reconnectId
}if(p.heartbeatTimer){clearTimeout(p.heartbeatTimer)
}p.reconnect=false;
at.request=p;
at.state="unsubscribe";
at.responseBody="";
at.status=408;
at.partialMessage="";
p.curWebsocketErrorRetries=0;
aj();
D();
l()
}function l(){at.partialMessage="";
if(p.id){clearTimeout(p.id)
}if(p.heartbeatTimer){clearTimeout(p.heartbeatTimer)
}if(p.reconnectId){clearTimeout(p.reconnectId);
delete p.reconnectId
}if(n!=null){n.close();
n=null
}if(X!=null){X.abort();
X=null
}if(z!=null){z.abort();
z=null
}if(ax!=null){if(ax.canSendMessage){aI("invoking .close() on WebSocket object");
ax.close()
}ax=null
}if(ah!=null){ah.close();
ah=null
}ai()
}function ai(){if(h!=null){clearInterval(y);
document.cookie=aG+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
h.signal("close",{reason:"",heir:!aH?R:(h.get("children")||[])[0]});
h.close()
}if(ay!=null){ay.close()
}}function ap(aJ){U();
p=a.util.extend(p,aJ);
p.mrequest=p.reconnect;
if(!p.reconnect){p.reconnect=true
}}function av(){return p.webSocketImpl!=null||window.WebSocket||window.MozWebSocket
}function au(){var aK=a.util.getAbsoluteURL(p.url.toLowerCase());
var aL=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/.exec(aK);
var aJ=!!(aL&&(aL[1]!=window.location.protocol||aL[2]!=window.location.hostname||(aL[3]||(aL[1]==="http:"?80:443))!=(window.location.port||(window.location.protocol==="http:"?80:443))));
return window.EventSource&&(!aJ||!a.util.browser.safari||a.util.browser.vmajor>=7)
}function aa(){if(p.shared){ay=aE(p);
if(ay!=null){if(w("debug")){a.util.debug("Storage service available. All communication will be local")
}if(ay.open(p)){return
}}if(w("debug")){a.util.debug("No Storage service available.")
}ay=null
}p.firstMessage=e==0?true:false;
p.isOpen=false;
p.ctime=a.util.now();
if(p.uuid===0){p.uuid=e
}at.closedByClientTimeout=false;
if(p.transport!=="websocket"&&p.transport!=="sse"){L(p)
}else{if(p.transport==="websocket"){if(!av()){aA("Websocket is not supported, using request.fallbackTransport ("+p.fallbackTransport+")")
}else{af(false)
}}else{if(p.transport==="sse"){if(!au()){aA("Server Side Events(SSE) is not supported, using request.fallbackTransport ("+p.fallbackTransport+")")
}else{C(false)
}}}}}function aE(aN){var aO,aM,aR,aJ="atmosphere-"+aN.url,aK={storage:function(){function aS(aW){if(aW.key===aJ&&aW.newValue){aL(aW.newValue)
}}if(!a.util.storage){return
}var aV=window.localStorage,aT=function(aW){var aX=aV.getItem(aJ+"-"+aW);
return aX===null?[]:JSON.parse(aX)
},aU=function(aW,aX){aV.setItem(aJ+"-"+aW,JSON.stringify(aX))
};
return{init:function(){aU("children",aT("children").concat([R]));
a.util.on(window,"storage",aS);
return aT("opened")
},signal:function(aW,aX){aV.setItem(aJ,JSON.stringify({target:"p",type:aW,data:aX}))
},close:function(){var aW=aT("children");
a.util.off(window,"storage",aS);
if(aW){if(aP(aW,aN.id)){aU("children",aW)
}}}}
},windowref:function(){var aS=window.open("",aJ.replace(/\W/g,""));
if(!aS||aS.closed||!aS.callbacks){return
}return{init:function(){aS.callbacks.push(aL);
aS.children.push(R);
return aS.opened
},signal:function(aT,aU){if(!aS.closed&&aS.fire){aS.fire(JSON.stringify({target:"p",type:aT,data:aU}))
}},close:function(){if(!aR){aP(aS.callbacks,aL);
aP(aS.children,R)
}}}
}};
function aP(aV,aU){var aS,aT=aV.length;
for(aS=0;
aS<aT;
aS++){if(aV[aS]===aU){aV.splice(aS,1)
}}return aT!==aV.length
}function aL(aS){var aU=JSON.parse(aS),aT=aU.data;
if(aU.target==="c"){switch(aU.type){case"open":V("opening","local",p);
break;
case"close":if(!aR){aR=true;
if(aT.reason==="aborted"){H()
}else{if(aT.heir===R){aa()
}else{setTimeout(function(){aa()
},100)
}}}break;
case"message":k(aT,"messageReceived",200,aN.transport);
break;
case"localMessage":F(aT);
break
}}}function aQ(){var aS=new RegExp("(?:^|; )("+encodeURIComponent(aJ)+")=([^;]*)").exec(document.cookie);
if(aS){return JSON.parse(decodeURIComponent(aS[2]))
}}aO=aQ();
if(!aO||a.util.now()-aO.ts>1000){return
}aM=aK.storage()||aK.windowref();
if(!aM){return
}return{open:function(){var aS;
y=setInterval(function(){var aT=aO;
aO=aQ();
if(!aO||aT.ts===aO.ts){aL(JSON.stringify({target:"c",type:"close",data:{reason:"error",heir:aT.heir}}))
}},1000);
aS=aM.init();
if(aS){setTimeout(function(){V("opening","local",aN)
},50)
}return aS
},send:function(aS){aM.signal("send",aS)
},localSend:function(aS){aM.signal("localSend",JSON.stringify({id:R,event:aS}))
},close:function(){if(!aH){clearInterval(y);
aM.signal("close");
aM.close()
}}}
}function aF(){var aK,aJ="atmosphere-"+p.url,aO={storage:function(){function aP(aR){if(aR.key===aJ&&aR.newValue){aL(aR.newValue)
}}if(!a.util.storage){return
}var aQ=window.localStorage;
return{init:function(){a.util.on(window,"storage",aP)
},signal:function(aR,aS){aQ.setItem(aJ,JSON.stringify({target:"c",type:aR,data:aS}))
},get:function(aR){return JSON.parse(aQ.getItem(aJ+"-"+aR))
},set:function(aR,aS){aQ.setItem(aJ+"-"+aR,JSON.stringify(aS))
},close:function(){a.util.off(window,"storage",aP);
aQ.removeItem(aJ);
aQ.removeItem(aJ+"-opened");
aQ.removeItem(aJ+"-children")
}}
},windowref:function(){var aQ=aJ.replace(/\W/g,""),aP=document.getElementById(aQ),aR;
if(!aP){aP=document.createElement("div");
aP.id=aQ;
aP.style.display="none";
aP.innerHTML='<iframe name="'+aQ+'"></iframe>';
document.body.appendChild(aP)
}aR=aP.firstChild.contentWindow;
return{init:function(){aR.callbacks=[aL];
aR.fire=function(aS){var aT;
for(aT=0;
aT<aR.callbacks.length;
aT++){aR.callbacks[aT](aS)
}}
},signal:function(aS,aT){if(!aR.closed&&aR.fire){aR.fire(JSON.stringify({target:"c",type:aS,data:aT}))
}},get:function(aS){return !aR.closed?aR[aS]:null
},set:function(aS,aT){if(!aR.closed){aR[aS]=aT
}},close:function(){}}
}};
function aL(aP){var aR=JSON.parse(aP),aQ=aR.data;
if(aR.target==="p"){switch(aR.type){case"send":t(aQ);
break;
case"localSend":F(aQ);
break;
case"close":H();
break
}}}Q=function aN(aP){aK.signal("message",aP)
};
function aM(){document.cookie=aG+"="+encodeURIComponent(JSON.stringify({ts:a.util.now()+1,heir:(aK.get("children")||[])[0]}))+"; path=/"
}aK=aO.storage()||aO.windowref();
aK.init();
if(w("debug")){a.util.debug("Installed StorageService "+aK)
}aK.set("children",[]);
if(aK.get("opened")!=null&&!aK.get("opened")){aK.set("opened",false)
}aG=encodeURIComponent(aJ);
aM();
y=setInterval(aM,1000);
h=aK
}function V(aL,aO,aK){if(p.shared&&aO!=="local"){aF()
}if(h!=null){h.set("opened",true)
}aK.close=function(){H()
};
if(az>0&&aL==="re-connecting"){aK.isReopen=true;
q(at)
}else{if(at.error==null){at.request=aK;
var aM=at.state;
at.state=aL;
var aJ=at.transport;
at.transport=aO;
var aN=at.responseBody;
aj();
at.responseBody=aN;
at.state=aM;
at.transport=aJ
}}}function aC(aL){aL.transport="jsonp";
var aK=p,aJ;
if((aL!=null)&&(typeof(aL)!=="undefined")){aK=aL
}X={open:function(){var aO="atmosphere"+(++R);
function aM(){aK.lastIndex=0;
if(aK.openId){clearTimeout(aK.openId)
}if(aK.heartbeatTimer){clearTimeout(aK.heartbeatTimer)
}if(aK.reconnect&&az++<aK.maxReconnectOnClose){V("re-connecting",aK.transport,aK);
if(az===aK.maxReconnectOnClose){}else{ao(X,aK,aL.reconnectInterval)
}aK.openId=setTimeout(function(){Z(aK)
},aK.reconnectInterval+1000)
}else{T(0,"maxReconnectOnClose reached")
}}function aN(){var aP=aK.url;
if(aK.dispatchUrl!=null){aP+=aK.dispatchUrl
}var aR=aK.data;
if(aK.attachHeadersAsQueryString){aP=o(aK);
if(aR!==""){aP+="&X-Atmosphere-Post-Body="+encodeURIComponent(aR)
}aR=""
}var aQ=document.head||document.getElementsByTagName("head")[0]||document.documentElement;
aJ=document.createElement("script");
aJ.src=aP+"&jsonpTransport="+aO;
aJ.clean=function(){aJ.clean=aJ.onerror=aJ.onload=aJ.onreadystatechange=null;
if(aJ.parentNode){aJ.parentNode.removeChild(aJ)
}if(++aL.scriptCount===2){aL.scriptCount=1;
aM()
}};
aJ.onload=aJ.onreadystatechange=function(){aI("jsonp.onload");
if(!aJ.readyState||/loaded|complete/.test(aJ.readyState)){aJ.clean()
}};
aJ.onerror=function(){aI("jsonp.onerror");
aL.scriptCount=1;
aJ.clean()
};
aQ.insertBefore(aJ,aQ.firstChild)
}window[aO]=function(aR){aI("jsonp.window");
aL.scriptCount=0;
if(aK.reconnect&&aK.maxRequest===-1||aK.requestCount++<aK.maxRequest){if(!aK.executeCallbackBeforeReconnect){ao(X,aK,aK.pollingInterval)
}if(aR!=null&&typeof aR!=="string"){try{aR=aR.message
}catch(aQ){}}var aP=r(aR,aK,at);
if(!aP){k(at.responseBody,"messageReceived",200,aK.transport)
}if(aK.executeCallbackBeforeReconnect){ao(X,aK,aK.pollingInterval)
}j(aK)
}else{a.util.log(p.logLevel,["JSONP reconnect maximum try reached "+p.requestCount]);
T(0,"maxRequest reached")
}};
setTimeout(function(){aN()
},50)
},abort:function(){if(aJ&&aJ.clean){aJ.clean()
}}};
X.open()
}function aw(aJ){if(p.webSocketImpl!=null){return p.webSocketImpl
}else{if(window.WebSocket){return new WebSocket(aJ)
}else{return new MozWebSocket(aJ)
}}}function v(){return o(p,a.util.getAbsoluteURL(p.webSocketUrl||p.url)).replace(/^http/,"ws")
}function S(){var aJ=o(p);
return aJ
}function C(aK){at.transport="sse";
var aJ=S();
if(w("debug")){a.util.debug("Invoking executeSSE");
a.util.debug("Using URL: "+aJ)
}if(aK&&!p.reconnect){if(ah!=null){l()
}return
}try{ah=new EventSource(aJ,{withCredentials:p.withCredentials})
}catch(aL){T(0,aL);
aA("SSE failed. Downgrading to fallback transport and resending");
return
}if(p.connectTimeout>0){p.id=setTimeout(function(){if(!aK){l()
}},p.connectTimeout)
}ah.onopen=function(aM){aI("sse.onopen");
j(p);
if(w("debug")){a.util.debug("SSE successfully opened")
}if(!p.enableProtocol){if(!aK){V("opening","sse",p)
}else{V("re-opening","sse",p)
}}else{if(p.isReopen){p.isReopen=false;
V("re-opening",p.transport,p)
}}aK=true;
if(p.method==="POST"){at.state="messageReceived";
t(p.data)
}};
ah.onmessage=function(aN){aI("sse.onmessage");
j(p);
if(!p.enableXDR&&window.location.host&&aN.origin&&aN.origin!==window.location.protocol+"//"+window.location.host){a.util.log(p.logLevel,["Origin was not "+window.location.protocol+"//"+window.location.host]);
return
}at.state="messageReceived";
at.status=200;
aN=aN.data;
var aM=r(aN,p,at);
if(!aM){aj();
at.responseBody="";
at.messages=[]
}};
ah.onerror=function(aM){aI("sse.onerror");
clearTimeout(p.id);
if(p.heartbeatTimer){clearTimeout(p.heartbeatTimer)
}if(at.closedByClientTimeout){return
}ae(aK);
l();
if(aH){a.util.log(p.logLevel,["SSE closed normally"])
}else{if(!aK){aA("SSE failed. Downgrading to fallback transport and resending")
}else{if(p.reconnect&&(at.transport==="sse")){if(az++<p.maxReconnectOnClose){V("re-connecting",p.transport,p);
if(p.reconnectInterval>0){p.reconnectId=setTimeout(function(){C(true)
},p.reconnectInterval)
}else{C(true)
}at.responseBody="";
at.messages=[]
}else{a.util.log(p.logLevel,["SSE reconnect maximum try reached "+az]);
T(0,"maxReconnectOnClose reached")
}}}}}
}function af(aK){at.transport="websocket";
var aJ=v(p.url);
if(w("debug")){a.util.debug("Invoking executeWebSocket, using URL: "+aJ)
}if(aK&&!p.reconnect){if(ax!=null){l()
}return
}ax=aw(aJ);
if(p.webSocketBinaryType!=null){ax.binaryType=p.webSocketBinaryType
}if(p.connectTimeout>0){p.id=setTimeout(function(){if(!aK){var aO={code:1002,reason:"Connection timeout after "+p.connectTimeout+"ms.",wasClean:false};
var aN=ax;
try{l()
}catch(aP){}aN.onclose(aO);
return
}},p.connectTimeout)
}ax.onopen=function(){if(ax==null){this.close();
if(p.transport=="websocket"){H()
}return
}aI("websocket.onopen");
j(p);
c=false;
if(w("debug")){a.util.debug("Websocket successfully opened")
}var aN=aK;
ax.canSendMessage=true;
if(!p.enableProtocol){aK=true;
if(aN){V("re-opening","websocket",p)
}else{V("opening","websocket",p)
}}if(p.method==="POST"){at.state="messageReceived";
ax.send(p.data)
}};
ax.onmessage=function(aP){if(ax==null){this.close();
if(p.transport=="websocket"){H()
}return
}aI("websocket.onmessage");
j(p);
if(p.enableProtocol){aK=true
}at.state="messageReceived";
at.status=200;
aP=aP.data;
var aN=typeof(aP)==="string";
if(aN){var aO=r(aP,p,at);
if(!aO){aj();
at.responseBody="";
at.messages=[]
}}else{aP=s(p,aP);
if(aP===""){return
}at.responseBody=aP;
aj();
at.responseBody=null
}};
ax.onerror=function(){aI("websocket.onerror");
clearTimeout(p.id);
if(p.heartbeatTimer){clearTimeout(p.heartbeatTimer)
}at.error=true
};
ax.onclose=function(aN){aI("websocket.onclose");
clearTimeout(p.id);
if(at.state==="closed"){return
}var aO=aN.reason;
if(aO===""){switch(aN.code){case 1000:aO="Normal closure; the connection successfully completed whatever purpose for which it was created.";
break;
case 1001:aO="The endpoint is going away, either because of a server failure or because the browser is navigating away from the page that opened the connection.";
break;
case 1002:aO="The endpoint is terminating the connection due to a protocol error.";
break;
case 1003:aO="The connection is being terminated because the endpoint received data of a type it cannot accept (for example, a text-only endpoint received binary data).";
break;
case 1004:aO="The endpoint is terminating the connection because a data frame was received that is too large.";
break;
case 1005:aO="Unknown: no status code was provided even though one was expected.";
break;
case 1006:aO="Connection was closed abnormally (that is, with no close frame being sent).";
break
}}if(w("warn")){a.util.warn("Websocket closed, reason: "+aO+" - wasClean: "+aN.wasClean)
}if(at.closedByClientTimeout||(p.handleOnlineOffline&&c)){if(p.reconnectId){clearTimeout(p.reconnectId);
delete p.reconnectId
}return
}ae(aK);
at.state="closed";
if(aH){a.util.log(p.logLevel,["Websocket closed normally"])
}else{if(at.error){at.error=false;
if(p.curWebsocketErrorRetries<p.maxWebsocketErrorRetries){p.curWebsocketErrorRetries=p.curWebsocketErrorRetries+1;
ag()
}}else{if(!aK&&at.transport==="websocket"&&p.fallbackTransport!=="websocket"){aA("Websocket failed on first connection attempt. Downgrading to "+p.fallbackTransport+" and resending")
}else{if(p.reconnect&&at.transport==="websocket"){ag()
}}}}};
var aL=navigator.userAgent.toLowerCase();
var aM=aL.indexOf("android")>-1;
if(aM&&ax.url===undefined){ax.onclose({reason:"Android 4.1 does not support websockets.",wasClean:false})
}}function s(aN,aM){var aL=aM;
if(aN.transport==="polling"){return aL
}if(aN.enableProtocol&&aN.firstMessage&&a.util.trim(aM).length!==0){var aO=aN.trackMessageLength?1:0;
var aK=aM.split(aN.messageDelimiter);
if(aK.length<=aO+1){return aL
}aN.firstMessage=false;
aN.uuid=a.util.trim(aK[aO]);
if(aK.length<=aO+2){a.util.log("error",["Protocol data not sent by the server. If you enable protocol on client side, be sure to install JavascriptProtocol interceptor on server side.Also note that atmosphere-runtime 2.2+ should be used."])
}J=parseInt(a.util.trim(aK[aO+1]),10);
al=aK[aO+2];
if(aN.transport!=="long-polling"){Z(aN)
}e=aN.uuid;
aL="";
aO=aN.trackMessageLength?4:3;
if(aK.length>aO+1){for(var aJ=aO;
aJ<aK.length;
aJ++){aL+=aK[aJ];
if(aJ+1!==aK.length){aL+=aN.messageDelimiter
}}}if(aN.ackInterval!==0){setTimeout(function(){t("...ACK...")
},aN.ackInterval)
}}else{if(aN.enableProtocol&&aN.firstMessage&&a.util.browser.msie&&+a.util.browser.version.split(".")[0]<10){a.util.log(p.logLevel,["Receiving unexpected data from IE"])
}else{Z(aN)
}}return aL
}function j(aJ){clearTimeout(aJ.id);
if(aJ.timeout>0&&aJ.transport!=="polling"){aJ.id=setTimeout(function(){aD(aJ);
D();
l()
},aJ.timeout)
}}function aD(aJ){at.closedByClientTimeout=true;
at.state="closedByClient";
at.responseBody="";
at.status=408;
at.messages=[];
aj()
}function T(aJ,aK){l();
clearTimeout(p.id);
at.state="error";
at.reasonPhrase=aK;
at.responseBody="";
at.status=aJ;
at.messages=[];
aj()
}function r(aN,aM,aJ){aN=s(aM,aN);
if(aN.length===0){return true
}aJ.responseBody=aN;
if(aM.trackMessageLength){aN=aJ.partialMessage+aN;
var aL=[];
var aK=aN.indexOf(aM.messageDelimiter);
if(aK!=-1){while(aK!==-1){var aP=aN.substring(0,aK);
var aO=+aP;
if(isNaN(aO)){aJ.partialMessage="";
throw new Error('message length "'+aP+'" is not a number')
}aK+=aM.messageDelimiter.length;
if(aK+aO>aN.length){aK=-1
}else{aL.push(aN.substring(aK,aK+aO));
aN=aN.substring(aK+aO,aN.length);
aK=aN.indexOf(aM.messageDelimiter)
}}aJ.partialMessage=aN;
if(aL.length!==0){aJ.responseBody=aL.join(aM.messageDelimiter);
aJ.messages=aL;
return false
}else{aJ.responseBody="";
aJ.messages=[];
return true
}}}aJ.responseBody=aN;
aJ.messages=[aN];
return false
}function ag(){l();
if(az++<p.maxReconnectOnClose){V("re-connecting",p.transport,p);
if(p.reconnectInterval>0){p.reconnectId=setTimeout(function(){at.responseBody="";
at.messages=[];
af(true)
},p.reconnectInterval)
}else{at.responseBody="";
at.messages=[];
af(true)
}}else{a.util.log(p.logLevel,["Websocket reconnect maximum try reached "+az]);
if(w("warn")){a.util.warn("Websocket error, reason: "+message.reason)
}T(0,"maxReconnectOnClose reached")
}}function aA(aJ){a.util.log(p.logLevel,[aJ]);
if(typeof(p.onTransportFailure)!=="undefined"){p.onTransportFailure(aJ,p)
}else{if(typeof(a.util.onTransportFailure)!=="undefined"){a.util.onTransportFailure(aJ,p)
}}var aK=p.connectTimeout===-1?0:p.connectTimeout;
if(p.reconnect&&p.transport!=="none"||p.transport==null){p.transport=p.fallbackTransport;
p.method=p.fallbackMethod;
at.transport=p.fallbackTransport;
at.state="";
p.fallbackTransport="none";
if(aK>0){p.reconnectId=setTimeout(function(){aa()
},aK)
}else{aa()
}}else{T(500,"Unable to reconnect with fallback transport")
}}function o(aL,aJ){var aK=p;
if((aL!=null)&&(typeof(aL)!=="undefined")){aK=aL
}if(aJ==null){aJ=aK.url
}if(!aK.attachHeadersAsQueryString){return aJ
}if(aJ.indexOf("X-Atmosphere-Framework")!==-1){return aJ
}aJ+=(aJ.indexOf("?")!==-1)?"&":"?";
aJ+="X-Atmosphere-tracking-id="+aK.uuid;
aJ+="&X-Atmosphere-Framework="+a.version;
aJ+="&X-Atmosphere-Transport="+aK.transport;
if(aK.trackMessageLength){aJ+="&X-Atmosphere-TrackMessageSize=true"
}if(aK.heartbeat!==null&&aK.heartbeat.server!==null){aJ+="&X-Heartbeat-Server="+aK.heartbeat.server
}if(aK.contentType!==""){aJ+="&Content-Type="+(aK.transport==="websocket"?aK.contentType:encodeURIComponent(aK.contentType))
}if(aK.enableProtocol){aJ+="&X-atmo-protocol=true"
}a.util.each(aK.headers,function(aM,aO){var aN=a.util.isFunction(aO)?aO.call(this,aK,aL,at):aO;
if(aN!=null){aJ+="&"+encodeURIComponent(aM)+"="+encodeURIComponent(aN)
}});
return aJ
}function Z(aJ){if(!aJ.isOpen){aJ.isOpen=true;
V("opening",aJ.transport,aJ)
}else{if(aJ.isReopen){aJ.isReopen=false;
V("re-opening",aJ.transport,aJ)
}else{if(at.state==="messageReceived"&&(aJ.transport==="jsonp"||aJ.transport==="long-polling")){aq(at)
}else{return
}}}B(aJ)
}function B(aK){if(aK.heartbeatTimer!=null){clearTimeout(aK.heartbeatTimer)
}if(!isNaN(J)&&J>0){var aJ=function(){if(w("debug")){a.util.debug("Sending heartbeat")
}t(al);
aK.heartbeatTimer=setTimeout(aJ,J)
};
aK.heartbeatTimer=setTimeout(aJ,J)
}}function L(aN){var aK=p;
if((aN!=null)||(typeof(aN)!=="undefined")){aK=aN
}aK.lastIndex=0;
aK.readyState=0;
if((aK.transport==="jsonp")||((aK.enableXDR)&&(a.util.checkCORSSupport()))){aC(aK);
return
}if(a.util.browser.msie&&+a.util.browser.version.split(".")[0]<10){if((aK.transport==="streaming")){if(aK.enableXDR&&window.XDomainRequest){P(aK)
}else{aB(aK)
}return
}if((aK.enableXDR)&&(window.XDomainRequest)){P(aK);
return
}}var aM=function(aR){aK.lastIndex=0;
az++;
if(aR||(aK.reconnect&&az<=aK.maxReconnectOnClose)){var aQ=aR?0:aN.reconnectInterval;
at.ffTryingReconnect=true;
V("re-connecting",aN.transport,aN);
ao(aL,aK,aQ)
}else{T(0,"maxReconnectOnClose reached")
}};
var aO=function(aQ){if(a._beforeUnloadState){a.util.debug(new Date()+" Atmosphere: reconnectF: execution delayed due to _beforeUnloadState flag");
setTimeout(function(){aM(aQ)
},5000)
}else{aM(aQ)
}};
var aJ=function(){at.errorHandled=true;
l();
aO(false)
};
if(aK.force||(aK.reconnect&&(aK.maxRequest===-1||aK.requestCount++<aK.maxRequest))){aK.force=false;
var aL=a.util.xhr();
aL.hasData=false;
M(aL,aK,true);
if(aK.suspend){z=aL
}if(aK.transport!=="polling"){at.transport=aK.transport;
aL.onabort=function(){aI("ajaxrequest.onabort");
ae(true)
};
aL.onerror=function(){aI("ajaxrequest.onerror");
at.error=true;
at.ffTryingReconnect=true;
try{at.status=XMLHttpRequest.status
}catch(aQ){at.status=500
}if(!at.status){at.status=500
}if(!at.errorHandled){l();
aO(false)
}}
}aL.onreadystatechange=function(){aI("ajaxRequest.onreadystatechange, new state: "+aL.readyState);
if(aH){aI("onreadystatechange has been ignored due to _abortingConnection flag");
return
}at.error=null;
var aR=false;
var aX=false;
if(aK.transport==="streaming"&&aK.readyState>2&&aL.readyState===4){l();
aO(false);
return
}aK.readyState=aL.readyState;
if(aK.transport==="streaming"&&aL.readyState>=3){aX=true
}else{if(aK.transport==="long-polling"&&aL.readyState===4){aX=true
}}j(p);
if(aK.transport!=="polling"){var aQ=200;
if(aL.readyState===4){aQ=aL.status>1000?0:aL.status
}if(!aK.reconnectOnServerError&&(aQ>=300&&aQ<600)){T(aQ,aL.statusText);
return
}if(aQ>=300||aQ===0){aJ();
return
}if((!aK.enableProtocol||!aN.firstMessage)&&aL.readyState===2){if(a.util.browser.mozilla&&at.ffTryingReconnect){at.ffTryingReconnect=false;
setTimeout(function(){if(!at.ffTryingReconnect){Z(aK)
}},500)
}else{Z(aK)
}}}else{if(aL.readyState===4){aX=true
}}if(aX){var aU=aL.responseText;
at.errorHandled=false;
if(aK.transport==="long-polling"&&a.util.trim(aU).length===0){if(!aL.hasData){aO(true)
}else{aL.hasData=false
}return
}aL.hasData=true;
G(aL,p);
if(aK.transport==="streaming"){if(!a.util.browser.opera){var aT=aU.substring(aK.lastIndex,aU.length);
aR=r(aT,aK,at);
aK.lastIndex=aU.length;
if(aR){return
}}else{a.util.iterate(function(){if(at.status!==500&&aL.responseText.length>aK.lastIndex){try{at.status=aL.status;
at.headers=a.util.parseHeaders(aL.getAllResponseHeaders());
G(aL,p)
}catch(aZ){at.status=404
}j(p);
at.state="messageReceived";
var aY=aL.responseText.substring(aK.lastIndex);
aK.lastIndex=aL.responseText.length;
aR=r(aY,aK,at);
if(!aR){aj()
}if(I(aL,aK)){K(aL,aK);
return
}}else{if(at.status>400){aK.lastIndex=aL.responseText.length;
return false
}}},0)
}}else{aR=r(aU,aK,at)
}var aW=I(aL,aK);
try{at.status=aL.status;
at.headers=a.util.parseHeaders(aL.getAllResponseHeaders());
G(aL,aK)
}catch(aV){at.status=404
}if(aK.suspend){at.state=at.status===0?"closed":"messageReceived"
}else{at.state="messagePublished"
}var aS=!aW&&aN.transport!=="streaming"&&aN.transport!=="polling";
if(aS&&!aK.executeCallbackBeforeReconnect){ao(aL,aK,aK.pollingInterval)
}if(at.responseBody.length!==0&&!aR){aj()
}if(aS&&aK.executeCallbackBeforeReconnect){ao(aL,aK,aK.pollingInterval)
}if(aW){K(aL,aK)
}}};
try{aL.send(aK.data);
u=true
}catch(aP){a.util.log(aK.logLevel,["Unable to connect to "+aK.url]);
T(0,aP)
}}else{if(aK.logLevel==="debug"){a.util.log(aK.logLevel,["Max re-connection reached."])
}T(0,"maxRequest reached")
}}function K(aK,aJ){at.messages=[];
aJ.isReopen=true;
H();
aH=false;
ao(aK,aJ,500)
}function M(aL,aM,aK){var aJ=aM.url;
if(aM.dispatchUrl!=null&&aM.method==="POST"){aJ+=aM.dispatchUrl
}aJ=o(aM,aJ);
aJ=a.util.prepareURL(aJ);
if(aK){aL.open(aM.method,aJ,true);
if(aM.connectTimeout>0){aM.id=setTimeout(function(){if(aM.requestCount===0){l();
k("Connect timeout","closed",200,aM.transport)
}},aM.connectTimeout)
}}if(p.withCredentials&&p.transport!=="websocket"){if("withCredentials" in aL){aL.withCredentials=true
}}if(!p.dropHeaders){aL.setRequestHeader("X-Atmosphere-Framework",a.version);
aL.setRequestHeader("X-Atmosphere-Transport",aM.transport);
if(aM.heartbeat!==null&&aM.heartbeat.server!==null){aL.setRequestHeader("X-Heartbeat-Server",aL.heartbeat.server)
}if(aM.trackMessageLength){aL.setRequestHeader("X-Atmosphere-TrackMessageSize","true")
}aL.setRequestHeader("X-Atmosphere-tracking-id",aM.uuid);
a.util.each(aM.headers,function(aN,aP){var aO=a.util.isFunction(aP)?aP.call(this,aL,aM,aK,at):aP;
if(aO!=null){aL.setRequestHeader(aN,aO)
}})
}if(aM.contentType!==""){aL.setRequestHeader("Content-Type",aM.contentType)
}}function ao(aL,aM,aK){if(at.closedByClientTimeout){return
}if(aM.reconnect||(aM.suspend&&u)){var aJ=0;
if(aL&&aL.readyState>1){aJ=aL.status>1000?0:aL.status
}at.status=aJ===0?204:aJ;
at.reason=aJ===0?"Server resumed the connection or down.":"OK";
clearTimeout(aM.id);
if(aM.reconnectId){clearTimeout(aM.reconnectId);
delete aM.reconnectId
}if(aK>0){p.reconnectId=setTimeout(function(){L(aM)
},aK)
}else{L(aM)
}}}function q(aJ){aJ.state="re-connecting";
am(aJ)
}function aq(aJ){aJ.state="openAfterResume";
am(aJ);
aJ.state="messageReceived"
}function P(aJ){if(aJ.transport!=="polling"){n=ac(aJ);
n.open()
}else{ac(aJ).open()
}}function ac(aL){var aK=p;
if((aL!=null)&&(typeof(aL)!=="undefined")){aK=aL
}var aQ=aK.transport;
var aP=0;
var aJ=new window.XDomainRequest();
var aN=function(){if(aK.transport==="long-polling"&&(aK.reconnect&&(aK.maxRequest===-1||aK.requestCount++<aK.maxRequest))){aJ.status=200;
P(aK)
}};
var aO=aK.rewriteURL||function(aS){var aR=/(?:^|;\s*)(JSESSIONID|PHPSESSID)=([^;]*)/.exec(document.cookie);
switch(aR&&aR[1]){case"JSESSIONID":return aS.replace(/;jsessionid=[^\?]*|(\?)|$/,";jsessionid="+aR[2]+"$1");
case"PHPSESSID":return aS.replace(/\?PHPSESSID=[^&]*&?|\?|$/,"?PHPSESSID="+aR[2]+"&").replace(/&$/,"")
}return aS
};
aJ.onprogress=function(){aM(aJ)
};
aJ.onerror=function(){if(aK.transport!=="polling"){l();
if(az++<aK.maxReconnectOnClose){if(aK.reconnectInterval>0){aK.reconnectId=setTimeout(function(){V("re-connecting",aL.transport,aL);
P(aK)
},aK.reconnectInterval)
}else{V("re-connecting",aL.transport,aL);
P(aK)
}}else{T(0,"maxReconnectOnClose reached")
}}};
aJ.onload=function(){};
var aM=function(aR){clearTimeout(aK.id);
var aT=aR.responseText;
aT=aT.substring(aP);
aP+=aT.length;
if(aQ!=="polling"){j(aK);
var aS=r(aT,aK,at);
if(aQ==="long-polling"&&a.util.trim(aT).length===0){return
}if(aK.executeCallbackBeforeReconnect){aN()
}if(!aS){k(at.responseBody,"messageReceived",200,aQ)
}if(!aK.executeCallbackBeforeReconnect){aN()
}}};
return{open:function(){var aR=aK.url;
if(aK.dispatchUrl!=null){aR+=aK.dispatchUrl
}aR=o(aK,aR);
aJ.open(aK.method,aO(aR));
if(aK.method==="GET"){aJ.send()
}else{aJ.send(aK.data)
}if(aK.connectTimeout>0){aK.id=setTimeout(function(){if(aK.requestCount===0){l();
k("Connect timeout","closed",200,aK.transport)
}},aK.connectTimeout)
}},close:function(){aJ.abort()
}}
}function aB(aJ){n=ab(aJ);
n.open()
}function ab(aM){var aL=p;
if((aM!=null)&&(typeof(aM)!=="undefined")){aL=aM
}var aK;
var aN=new window.ActiveXObject("htmlfile");
aN.open();
aN.close();
var aJ=aL.url;
if(aL.dispatchUrl!=null){aJ+=aL.dispatchUrl
}if(aL.transport!=="polling"){at.transport=aL.transport
}return{open:function(){var aO=aN.createElement("iframe");
aJ=o(aL);
if(aL.data!==""){aJ+="&X-Atmosphere-Post-Body="+encodeURIComponent(aL.data)
}aJ=a.util.prepareURL(aJ);
aO.src=aJ;
aN.body.appendChild(aO);
var aP=aO.contentDocument||aO.contentWindow.document;
aK=a.util.iterate(function(){try{if(!aP.firstChild){return
}var aS=aP.body?aP.body.lastChild:aP;
if(aS.omgThisIsBroken){}var aU=function(){var aW=aS.cloneNode(true);
aW.appendChild(aP.createTextNode("."));
var aV=aW.innerText;
aV=aV.substring(0,aV.length-1);
return aV
};
if(!aP.body||!aP.body.firstChild||aP.body.firstChild.nodeName.toLowerCase()!=="pre"){var aR=aP.head||aP.getElementsByTagName("head")[0]||aP.documentElement||aP;
var aQ=aP.createElement("script");
aQ.text="document.write('<plaintext>')";
aR.insertBefore(aQ,aR.firstChild);
aR.removeChild(aQ);
aS=aP.body.lastChild
}if(aL.closed){aL.isReopen=true
}aK=a.util.iterate(function(){var aW=aU();
if(aW.length>aL.lastIndex){j(p);
at.status=200;
at.error=null;
aS.innerText="";
var aV=r(aW,aL,at);
if(aV){return""
}k(at.responseBody,"messageReceived",200,aL.transport)
}aL.lastIndex=0;
if(aP.readyState==="complete"){ae(true);
V("re-connecting",aL.transport,aL);
if(aL.reconnectInterval>0){aL.reconnectId=setTimeout(function(){aB(aL)
},aL.reconnectInterval)
}else{aB(aL)
}return false
}},null);
return false
}catch(aT){at.error=true;
V("re-connecting",aL.transport,aL);
if(az++<aL.maxReconnectOnClose){if(aL.reconnectInterval>0){aL.reconnectId=setTimeout(function(){aB(aL)
},aL.reconnectInterval)
}else{aB(aL)
}}else{T(0,"maxReconnectOnClose reached")
}aN.execCommand("Stop");
aN.close();
return false
}})
},close:function(){if(aK){aK()
}aN.execCommand("Stop");
ae(true)
}}
}function t(aJ){if(ay!=null){E(aJ)
}else{if(z!=null||ah!=null){O(aJ)
}else{if(n!=null){i(aJ)
}else{if(X!=null){A(aJ)
}else{if(ax!=null){W(aJ)
}else{T(0,"No suspended connection available");
a.util.error("No suspended connection available. Make sure atmosphere.subscribe has been called and request.onOpen invoked before trying to push data")
}}}}}}function an(aK,aJ){if(!aJ){aJ=x(aK)
}aJ.transport="polling";
aJ.method="GET";
aJ.withCredentials=false;
aJ.reconnect=false;
aJ.force=true;
aJ.suspend=false;
aJ.timeout=1000;
if(aJ.unloadBackwardCompat){L(aJ)
}else{navigator.sendBeacon(aJ.url,aJ.data)
}}function E(aJ){ay.send(aJ)
}function ar(aK){if(aK.length===0){return
}try{if(ay){ay.localSend(aK)
}else{if(h){h.signal("localMessage",JSON.stringify({id:R,event:aK}))
}}}catch(aJ){a.util.error(aJ)
}}function O(aK){var aJ=x(aK);
L(aJ)
}function i(aK){if(p.enableXDR&&a.util.checkCORSSupport()){var aJ=x(aK);
aJ.reconnect=false;
aC(aJ)
}else{O(aK)
}}function A(aJ){O(aJ)
}function N(aJ){var aK=aJ;
if(typeof(aK)==="object"){aK=aJ.data
}return aK
}function x(aK){var aL=N(aK);
var aJ={connected:false,timeout:60000,method:"POST",url:p.url,contentType:p.contentType,headers:p.headers,reconnect:true,callback:null,data:aL,suspend:false,maxRequest:-1,logLevel:"info",requestCount:0,withCredentials:p.withCredentials,transport:"polling",isOpen:true,attachHeadersAsQueryString:true,enableXDR:p.enableXDR,uuid:p.uuid,dispatchUrl:p.dispatchUrl,enableProtocol:false,messageDelimiter:"|",trackMessageLength:p.trackMessageLength,maxReconnectOnClose:p.maxReconnectOnClose,heartbeatTimer:p.heartbeatTimer,heartbeat:p.heartbeat};
if(typeof(aK)==="object"){aJ=a.util.extend(aJ,aK)
}return aJ
}function W(aJ){var aM=a.util.isBinary(aJ)?aJ:N(aJ);
var aK;
try{if(p.dispatchUrl!=null){aK=p.webSocketPathDelimiter+p.dispatchUrl+p.webSocketPathDelimiter+aM
}else{aK=aM
}if(!ax.canSendMessage){a.util.error("WebSocket not connected.");
return
}ax.send(aK)
}catch(aL){ax.onclose=function(aN){};
l();
aA("Websocket failed. Downgrading to "+p.fallbackTransport+" and resending "+aJ);
O(aJ)
}}function F(aK){var aJ=JSON.parse(aK);
if(aJ.id!==R){if(typeof(p.onLocalMessage)!=="undefined"){p.onLocalMessage(aJ.event)
}else{if(typeof(a.util.onLocalMessage)!=="undefined"){a.util.onLocalMessage(aJ.event)
}}}}function k(aM,aJ,aK,aL){at.responseBody=aM;
at.transport=aL;
at.status=aK;
at.state=aJ;
aj()
}function G(aJ,aL){if(!aL.readResponsesHeaders){if(!aL.enableProtocol){aL.uuid=R
}}else{try{var aK=aJ.getResponseHeader("X-Atmosphere-tracking-id");
if(aK&&aK!=null){aL.uuid=aK.split(" ").pop()
}}catch(aM){}}}function am(aJ){m(aJ,p);
m(aJ,a.util)
}function m(aK,aL){switch(aK.state){case"messageReceived":aI("Firing onMessage");
az=0;
if(typeof(aL.onMessage)!=="undefined"){aL.onMessage(aK)
}if(typeof(aL.onmessage)!=="undefined"){aL.onmessage(aK)
}break;
case"error":var aM=(typeof(aK.reasonPhrase)!="undefined")?aK.reasonPhrase:"n/a";
aI("Firing onError, reasonPhrase: "+aM);
if(typeof(aL.onError)!=="undefined"){aL.onError(aK)
}if(typeof(aL.onerror)!=="undefined"){aL.onerror(aK)
}break;
case"opening":delete p.closed;
aI("Firing onOpen");
if(typeof(aL.onOpen)!=="undefined"){aL.onOpen(aK)
}if(typeof(aL.onopen)!=="undefined"){aL.onopen(aK)
}break;
case"messagePublished":aI("Firing messagePublished");
if(typeof(aL.onMessagePublished)!=="undefined"){aL.onMessagePublished(aK)
}break;
case"re-connecting":aI("Firing onReconnect");
if(typeof(aL.onReconnect)!=="undefined"){aL.onReconnect(p,aK)
}break;
case"closedByClient":aI("Firing closedByClient");
if(typeof(aL.onClientTimeout)!=="undefined"){aL.onClientTimeout(p)
}break;
case"re-opening":delete p.closed;
aI("Firing onReopen");
if(typeof(aL.onReopen)!=="undefined"){aL.onReopen(p,aK)
}break;
case"fail-to-reconnect":aI("Firing onFailureToReconnect");
if(typeof(aL.onFailureToReconnect)!=="undefined"){aL.onFailureToReconnect(p,aK)
}break;
case"unsubscribe":case"closed":var aJ=typeof(p.closed)!=="undefined"?p.closed:false;
if(!aJ){aI("Firing onClose ("+aK.state+" case)");
if(typeof(aL.onClose)!=="undefined"){aL.onClose(aK)
}if(typeof(aL.onclose)!=="undefined"){aL.onclose(aK)
}}else{aI("Request already closed, not firing onClose ("+aK.state+" case)")
}p.closed=true;
break;
case"openAfterResume":if(typeof(aL.onOpenAfterResume)!=="undefined"){aL.onOpenAfterResume(p)
}break
}}function ae(aJ){if(at.state!=="closed"){at.state="closed";
at.responseBody="";
at.messages=[];
at.status=!aJ?501:200;
aj()
}}function aj(){var aL=function(aO,aP){aP(at)
};
if(ay==null&&Q!=null){Q(at.responseBody)
}p.reconnect=p.mrequest;
var aJ=typeof(at.responseBody)==="string";
var aM=(aJ&&p.trackMessageLength)?(at.messages.length>0?at.messages:[""]):new Array(at.responseBody);
for(var aK=0;
aK<aM.length;
aK++){if(aM.length>1&&aM[aK].length===0){continue
}at.responseBody=(aJ)?a.util.trim(aM[aK]):aM[aK];
if(ay==null&&Q!=null){Q(at.responseBody)
}if(at.state==="messageReceived"){if(at.responseBody.length===0){continue
}else{if(aJ&&al===at.responseBody){az=0;
continue
}}}am(at);
if(f.length>0){if(w("debug")){a.util.debug("Invoking "+f.length+" global callbacks: "+at.state)
}try{a.util.each(f,aL)
}catch(aN){a.util.log(p.logLevel,["Callback exception"+aN])
}}if(typeof(p.callback)==="function"){if(w("debug")){a.util.debug("Invoking request callbacks")
}try{p.callback(at)
}catch(aN){a.util.log(p.logLevel,["Callback exception"+aN])
}}}}this.subscribe=function(aJ){ap(aJ);
aa()
};
this.execute=function(){aa()
};
this.close=function(){H()
};
this.disconnect=function(){D()
};
this.getUrl=function(){return p.url
};
this.push=function(aL,aK){if(aK!=null){var aJ=p.dispatchUrl;
p.dispatchUrl=aK;
t(aL);
p.dispatchUrl=aJ
}else{t(aL)
}};
this.getUUID=function(){return p.uuid
};
this.pushLocal=function(aJ){ar(aJ)
};
this.enableProtocol=function(aJ){return p.enableProtocol
};
this.init=function(){ak()
};
this.request=p;
this.response=at
}};
a.subscribe=function(h,k,j){if(typeof(k)==="function"){a.addCallback(k)
}if(typeof(h)!=="string"){j=h
}else{j.url=h
}e=((typeof(j)!=="undefined")&&typeof(j.uuid)!=="undefined")?j.uuid:0;
var i=new a.AtmosphereRequest(j);
i.execute();
g[g.length]=i;
return i
};
a.unsubscribe=function(){if(g.length>0){var h=[].concat(g);
for(var k=0;
k<h.length;
k++){var j=h[k];
j.close();
clearTimeout(j.response.request.id);
if(j.heartbeatTimer){clearTimeout(j.heartbeatTimer)
}}}g=[];
f=[]
};
a.unsubscribeUrl=function(j){var h=-1;
if(g.length>0){for(var l=0;
l<g.length;
l++){var k=g[l];
if(k.getUrl()===j){k.close();
clearTimeout(k.response.request.id);
if(k.heartbeatTimer){clearTimeout(k.heartbeatTimer)
}h=l;
break
}}}if(h>=0){g.splice(h,1)
}};
a.addCallback=function(h){if(a.util.inArray(h,f)===-1){f.push(h)
}};
a.removeCallback=function(i){var h=a.util.inArray(i,f);
if(h!==-1){f.splice(h,1)
}};
a.util={browser:{},parseHeaders:function(i){var h,k=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,j={};
while(h=k.exec(i)){j[h[1]]=h[2]
}return j
},now:function(){return new Date().getTime()
},isArray:function(h){return Object.prototype.toString.call(h)==="[object Array]"
},inArray:function(k,l){if(!Array.prototype.indexOf){var h=l.length;
for(var j=0;
j<h;
++j){if(l[j]===k){return j
}}return -1
}return l.indexOf(k)
},isBinary:function(h){return/^\[object\s(?:Blob|ArrayBuffer|.+Array)\]$/.test(Object.prototype.toString.call(h))
},isFunction:function(h){return Object.prototype.toString.call(h)==="[object Function]"
},getAbsoluteURL:function(h){if(typeof(document.createElement)==="undefined"){return h
}var j=document.createElement("div");
j.innerHTML='<a href="'+h+'"></a>';
var i=window.navigator.userAgent;
if(i.indexOf("MSIE ")>0||i.indexOf("Trident/")>0||i.indexOf("Edge/")>0){return a.util.fixedEncodeURI(decodeURI(j.firstChild.href))
}return j.firstChild.href
},fixedEncodeURI:function(h){return encodeURI(h).replace(/%5B/g,"[").replace(/%5D/g,"]")
},prepareURL:function(i){var j=a.util.now();
var h=i.replace(/([?&])_=[^&]*/,"$1_="+j);
return h+(h===i?(/\?/.test(i)?"&":"?")+"_="+j:"")
},trim:function(h){if(!String.prototype.trim){return h.toString().replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"").replace(/\s+/g," ")
}else{return h.toString().trim()
}},param:function(l){var j,h=[];
function k(m,n){n=a.util.isFunction(n)?n():(n==null?"":n);
h.push(encodeURIComponent(m)+"="+encodeURIComponent(n))
}function i(n,o){var m;
if(a.util.isArray(o)){a.util.each(o,function(q,p){if(/\[\]$/.test(n)){k(n,p)
}else{i(n+"["+(typeof p==="object"?q:"")+"]",p)
}})
}else{if(Object.prototype.toString.call(o)==="[object Object]"){for(m in o){i(n+"["+m+"]",o[m])
}}else{k(n,o)
}}}for(j in l){i(j,l[j])
}return h.join("&").replace(/%20/g,"+")
},storage:function(){try{return !!(window.localStorage&&window.StorageEvent)
}catch(h){return false
}},iterate:function(j,i){var k;
i=i||0;
(function h(){k=setTimeout(function(){if(j()===false){return
}h()
},i)
})();
return function(){clearTimeout(k)
}
},each:function(n,o,j){if(!n){return
}var m,k=0,l=n.length,h=a.util.isArray(n);
if(j){if(h){for(;
k<l;
k++){m=o.apply(n[k],j);
if(m===false){break
}}}else{for(k in n){m=o.apply(n[k],j);
if(m===false){break
}}}}else{if(h){for(;
k<l;
k++){m=o.call(n[k],k,n[k]);
if(m===false){break
}}}else{for(k in n){m=o.call(n[k],k,n[k]);
if(m===false){break
}}}}return n
},extend:function(l){var k,j,h;
for(k=1;
k<arguments.length;
k++){if((j=arguments[k])!=null){for(h in j){l[h]=j[h]
}}}return l
},on:function(j,i,h){if(j.addEventListener){j.addEventListener(i,h,false)
}else{if(j.attachEvent){j.attachEvent("on"+i,h)
}}},off:function(j,i,h){if(j.removeEventListener){j.removeEventListener(i,h,false)
}else{if(j.detachEvent){j.detachEvent("on"+i,h)
}}},log:function(j,i){if(window.console){var h=window.console[j];
if(typeof h==="function"){h.apply(window.console,i)
}}},warn:function(){a.util.log("warn",arguments)
},info:function(){a.util.log("info",arguments)
},debug:function(){a.util.log("debug",arguments)
},error:function(){a.util.log("error",arguments)
},xhr:function(){try{return new window.XMLHttpRequest()
}catch(i){try{return new window.ActiveXObject("Microsoft.XMLHTTP")
}catch(h){}}},checkCORSSupport:function(){if(a.util.browser.msie&&!window.XDomainRequest&&+a.util.browser.version.split(".")[0]<11){return true
}else{if(a.util.browser.opera&&+a.util.browser.version.split(".")<12){return true
}else{if(a.util.trim(navigator.userAgent).slice(0,16)==="KreaTVWebKit/531"){return true
}else{if(a.util.trim(navigator.userAgent).slice(-7).toLowerCase()==="kreatel"){return true
}}}}var i=navigator.userAgent.toLowerCase();
var j=i.match(/.+android ([0-9]{1,2})/i),h=parseInt((j&&j[0])||-1,10);
if(!isNaN(h)&&h>-1&&h<3){return true
}return false
}};
d=a.util.now();
(function(){var i=navigator.userAgent.toLowerCase(),h=/(chrome)[ \/]([\w.]+)/.exec(i)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(i)||/(msie) ([\w.]+)/.exec(i)||/(trident)(?:.*? rv:([\w.]+)|)/.exec(i)||i.indexOf("android")<0&&/version\/(.+) (safari)/.exec(i)||i.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(i)||[];
if(h[2]==="safari"){h[2]=h[1];
h[1]="safari"
}a.util.browser[h[1]||""]=true;
a.util.browser.version=h[2]||"0";
a.util.browser.vmajor=a.util.browser.version.split(".")[0];
if(a.util.browser.trident){a.util.browser.msie=true
}if(a.util.browser.msie||(a.util.browser.mozilla&&+a.util.browser.version.split(".")[0]===1)){a.util.storage=false
}})();
a.callbacks={unload:function(){a.util.debug(new Date()+" Atmosphere: unload event");
a.unsubscribe()
},beforeUnload:function(){a.util.debug(new Date()+" Atmosphere: beforeunload event");
a._beforeUnloadState=true;
setTimeout(function(){a.util.debug(new Date()+" Atmosphere: beforeunload event timeout reached. Reset _beforeUnloadState flag");
a._beforeUnloadState=false
},5000)
},offline:function(){a.util.debug(new Date()+" Atmosphere: offline event");
c=true;
if(g.length>0){var h=[].concat(g);
for(var k=0;
k<h.length;
k++){var j=h[k];
if(j.request.handleOnlineOffline){j.close();
clearTimeout(j.response.request.id);
if(j.heartbeatTimer){clearTimeout(j.heartbeatTimer)
}}}}},online:function(){a.util.debug(new Date()+" Atmosphere: online event");
if(g.length>0){for(var h=0;
h<g.length;
h++){if(g[h].request.handleOnlineOffline){g[h].init();
g[h].execute()
}}}c=false
}};
a.bindEvents=function(){a.util.on(window,"unload",a.callbacks.unload);
a.util.on(window,"beforeunload",a.callbacks.beforeUnload);
a.util.on(window,"offline",a.callbacks.offline);
a.util.on(window,"online",a.callbacks.online)
};
a.unbindEvents=function(){a.util.off(window,"unload",a.callbacks.unload);
a.util.off(window,"beforeunload",a.callbacks.beforeUnload);
a.util.off(window,"offline",a.callbacks.offline);
a.util.off(window,"online",a.callbacks.online)
};
a.bindEvents();
return a
}));