(function(root){
function fetaSrc(){
    this.source = fetaStr;
}
fetaSrc.prototype.startStr = function(){
    return "feta.start(true);";
};
fetaSrc.prototype.hasFeta = function(){
    return "typeof feta !== 'undefined';";
};
fetaSrc.prototype.stopStr = function(){
    return "feta.stop(null,true);";
};
fetaSrc.prototype.isPlayingStr = function(){
    return "feta.isPlaying() ? null : feta.lastRegression();";
};
fetaSrc.prototype.loadStr = function(){
    //loading code for feta, we check is jquery already exists on the page
    //if not, we load in a copy
    return "(function(){ if (typeof jQuery === 'undefined'){"+
            "var _s=document.createElement('script');"+
            "_s.type='text/javascript';"+
            "_s.src='http://code.jquery.com/jquery-1.9.1.min.js';"+
            "_s.onload=function(){ "+fetaStr +"};"+
            "_s.onerror=function(){ console.error('Error loading Feta');};"+
            "document.body.appendChild(_s);"+
            "}else{"+
            fetaStr +"} return true; })();";
};

(root||window).fetaSource = new fetaSrc();
var fetaStr="if (!window.feta){window.feta=function(e,t){function n(e){for(var o=0;a.length>o;o++)if(t(e).on&&(!t(e).data(\"events\")||!t(e).data(\"events\")[a[o]]||t(e).data(\"events\")[a[o]].handler!==r))try{t(e).on(a[o],r)}catch(i){}var s=e.childNodes;if(s)for(var l=0;s.length>l;l++)n(s[l])}function r(t){if(c){if(t.selector=i(t.target),l.length>0){var r=JSON.parse(l[l.length-1]);if(r.timeStamp==t.timeStamp&&r.type==t.type&&r.elem==t.selector)return}if(t.target==window&&(\"focus\"==t.type||\"blur\"==t.type))return;console.log(\"TRACKING EVENT\"),l.push(o(t)),f&&localStorage.setItem(\"fetaEvents\",JSON.stringify(l)),setTimeout(function(){n(e.body)},50)}}function o(e){return JSON.stringify({type:e.type,elem:e.selector,timeStamp:e.timeStamp,key:\"keypress\"==e.type?e.which:null})}function i(e){if(0===t(e).parents().length)return\"DOCUMENT\";var n=\"\";t(e).parents()[0]!==t(\"body\")[0]&&t.each(t(e).parents().get().reverse(),function(){n+=this.tagName+s(this);var e=t(n).index(t(this));0>e&&console.log(\"parent not in parent selector?\");var r=1===t(n).length?\"\":\":eq(\"+e+\")\";n+=r+\" \"}),n+=t(e)[0].nodeName,n+=s(e);var r=t(n),o=r.length;if(o>1)for(var i=0;o>i;)t(n)[i]===e&&(n+=\":nth-child(\"+(i+1)+\")\",i=o),i++;return n}function s(e){if(\"BODY\"==e.tagName.toUpperCase()||\"HTML\"==e.tagName.toUpperCase())return\"\";var n=\"\",r=t(e).attr(\"id\");r&&(n+=\"#\"+r);var o=t(e).attr(\"class\");return o&&(n+=\".\"+t.trim(o).replace(/\\s/gi,\".\")),n}var a=[\"click\",\"dblclick\",\"focus\",\"keypress\",\"change\",\"blur\"],l=[],c=!1,f=!1,u=e.body;console.log(\"binding event handlers\"),n(u),console.log(\"done binding\");var g;t(e).on(\"feta.hasRegression\",function(e,t){g=t.data?t.data:[]});var d=!1;return t(e).on(\"feta.startPlaying\",function(){d=!0}),t(e).on(\"feta.endPlaying\",function(){d=!1}),{isPlaying:function(){return d},lastRegression:function(){return g},start:function(e){e=\"undefined\"!=typeof localStorage&&e;var t=e?localStorage.getItem(\"fetaEvents\"):[];try{t=JSON.parse(t)}catch(n){t=[]}l=t||[],c=!0,f=e},stop:function(e,t){c=!1,f&&localStorage.removeItem(\"fetaEvents\",null);for(var n=\"\",r=0;l.length>r;r++)n+=l[r]+\",\";return this.saveAsJS('{ \"playlist\": ['+n.slice(0,n.length-1)+\"]}\",e?function(t){e({events:l,JS:t})}:null,t)},saveAsJS:function(t,n,r){var o=\"/* Recorded from \"+e.location.href+\" on \"+(new Date).toISOString()+\" */\\n\";o+=\"/* TestSetup, you shouldn't need to modify this */\\n\",o+=\"(function($,PhantomJS){\",o+=\"$(document).trigger('feta.startPlaying');\",o+=\"function regression(){\",o+=\"var regressions=[];\",o+=\"return {\",o+=\"add: function(item){\",o+=\"item = item || '';\",o+=\"regressions.push(item);\",o+=\"},\",o+=\"checkIfRegressed: function(cb){\",o+=\"var res = regressions.length > 0;\",o+=\"if (cb){\",o+=\"cb(res,regressions);\",o+=\"}else{\",o+=\"if (res ){\",o+=\"$(document).trigger('feta.hasRegression',{data: regressions});\",o+=\"console.log('FETA:Regression!');\",o+=\"}else{\",o+=\"$(document).trigger('feta.hasRegression',{});\",o+=\"console.log('FETA:No Regression.');\",o+=\"}\",o+=\"}\",o+=\"}\",o+=\"};\",o+=\"}\",o+=\"var r = new regression();\",o+=\"function keyEvent(keyCode,el){\",o+='var e = $.Event(\"keypress\");',o+=\"e.keyCode=keyCode;\",o+=\"el.trigger(e);\",o+=\"var newVal=el.val();\",o+=\"if (keyCode === 46){\",o+=\"newVal = newVal.slice(0,newVal.length-1);\",o+=\"}\",o+=\"el.val(newVal+String.fromCharCode(keyCode));\",o+=\"}\\n\\n\",o+=\"var timeouts=[];\\n\",o+=\"/* Done TestSetup */\\n\\n\\n\";for(var i=JSON.parse(t).playlist,s=0,a=0,l=\"timeouts.push({fcn:function(){\",c=0;i.length>c;c++){var f=i[c];o+=\"\\n	/*Only modify the selector if you notice a recording error*/\",o+=\"\\n	var evtelem = $('\"+f.elem+\"');\\n\",o+=\"\\n	if (evtelem.length === 0){ r.add('Element not found: \"+f.elem+\"');\\n }else{\\n\",\"keypress\"===f.type?o+=\"	keyEvent(\"+f.key+\",evtelem);\\n\":(\"click\"===f.type&&(o+=\"\\n	/* Don't modify */\",o+=\"\\n	if(evtelem.prop('tagName').toUpperCase() === 'INPUT' &&\",o+=\"(evtelem.prop('type').toUpperCase() === 'CHECKBOX' ||\",o+=\"evtelem.prop('type').toUpperCase() === 'RADIO' )){\",o+=\"evtelem.prop('checked',!evtelem.prop('checked'));\",o+=\"}\",o+=\"\\n	/* Done don't modify */\\n\"),o+=\"\\n	evtelem.trigger('\"+f.type+\"');\\n\"),o+=\"\\n	}\",o+=\"\\n	/* add any verification code here */\\n\",o+=\"	/* use `r.add()` or $(document).trigger('feta.regression',[data]) */\\n\\n\",c>0&&(o+=\" } ,time:\"+(s-a)+\"});\\n\\n\",a=s),i.length>c+1&&(s+=i[c+1].timeStamp-f.timeStamp),o+=l}return o+=\"\\n\\n	/* Add final verification code here */\\n\",o+=\"\\n	r.checkIfRegressed();\\n\",o+=\"\\n	/* leave the rest of the file as is*/\\n\\n\",o+=\"	$(document).trigger('feta.endPlaying');\\n\",o+='	if (PhantomJS){ console.log(\"FETA_PHANTOMJS:done\");}\\n',i.length>0&&(o+=\"},time:100});\"),o+=\"function doTimeouts(current){\",o+=\"if (current){\",o+=\"setTimeout(function(){\",o+=\"current.fcn();\",o+=\"doTimeouts(timeouts.shift());\",o+=\"},current.time);\",o+=\"} }\",o+=\"doTimeouts(timeouts.shift());\",o+=\"\\n})(jQuery,typeof PhantomJS === 'undefined' ? null: PhantomJS);\\n\",r?o:((n||eval).call(this,o),void 0)}}}(document,jQuery);}";
//@ sourceURL=feta.js
})(window);