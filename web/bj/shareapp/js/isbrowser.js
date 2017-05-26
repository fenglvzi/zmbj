/**
 * Created by Administrator on 2016/5/4.
 */

var isWeixin = is_weixin();
var winHeight = typeof window.innerHeight != 'undefined' ? window.innerHeight : document.documentElement.clientHeight;
//console.log(winHeight);
var cssText = "#weixin-tip{position: fixed; left:0; top:0; background: rgba(0,0,0,1); filter:alpha(opacity=100); width: 100%; height:100%; z-index: 100;} #weixin-tip p{text-align: right; margin-top: 0; padding:0;}";
if(isWeixin){
    if(is_apple()){
        loadHtml(2);
    }else{
        loadHtml(1);
    }
    loadStyleText(cssText);
}else {
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//�ƶ��ն�������汾��Ϣ
                trident: u.indexOf('Trident') > -1, //IE�ں�
                presto: u.indexOf('Presto') > -1, //opera�ں�
                webKit: u.indexOf('AppleWebKit') > -1, //ƻ�����ȸ��ں�
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //����ں�
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //�Ƿ�Ϊ�ƶ��ն�
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios�ն�
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android�ն˻���uc�����
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //�Ƿ�ΪiPhone����QQHD�����
                iPad: u.indexOf('iPad') > -1, //�Ƿ�iPad
                webApp: u.indexOf('Safari') == -1 //�Ƿ�webӦ�ó���û��ͷ����ײ�
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }

    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    	loadHtml(2);
        if(browser.versions.iPad){
            openApp("ipad");
        }else {
            openApp("");
        }
    }else if (browser.versions.android) {
    	loadHtml(1);
        openApp("");
    }else{
    	loadHtml_pc();
    }
}

function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

function is_android() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/android/i) == "android") {
        return true;
    } else {
        return false;
    }
}

function is_apple() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/iphone/i) == "iphone"
        ||ua.match(/ipad/i) == "ipad"
        ||ua.match(/ipod/i) == "ipod") {
        return true;
    } else {
        return false;
    }
}


function loadStyleText(cssText) {
    var style = document.createElement('style');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    try {
        style.appendChild(document.createTextNode(cssText));
    } catch (e) {
        style.styleSheet.cssText = cssText; //ie9����
    }

    var head=document.getElementsByTagName("head")[0]; //head��ǩ֮�����style��ʽ
    head.appendChild(style);
}

//_type :ipad pad app uri iPhone/android  uri
function openApp(_type) {
    var url=GetDeviceUrl(_type);
    var page=GetPage();
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        if(1 == page){
        	window.location = url;
        }else if(2 == page){
        	window.location = "https://itunes.apple.com/app/" + GetDeviceAppid(_type);
        }
    } else if (navigator.userAgent.match(/android/i)) {
        if(1 == page){
            window.location = url;
        }else if(2 == page){
        	if(confirm("ȷ������") == true){
                window.location = getApkUrl();
            }else{
                window.close();
            }
        }
    }
}


//--------------------------------

function orient() {
    if (window.orientation == 0 || window.orientation == 180) {
        orientation = 'portrait';        
        $(".imgbox img").css({"width":"100%","height":"auto"});
        return false;
    }else if (window.orientation == 90 || window.orientation == -90) {
        orientation = 'landscape';
        $(".imgbox img").css({"width":"60%","height":"auto"});
        return false;
    }
}