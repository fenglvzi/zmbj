/**
 * Created by Administrator on 2017/3/28.
 */
/**
 * Created by Administrator on 2016/5/4.
 */

var dowurl="../../index.htm"/*tpa=http://www.hidog.com/*/;

var _shopname=["",
"杭牌3合1",
"台州3缺1",
"绍兴3缺1",
"3缺1义乌版",
"湖州3缺1",
"3缺1浙中版",
"温州3缺1",
"舟山3缺1"
];

//微信跳转  android 和 iphone 索引=shopid 从 1 开始
var wxappid=["",
"wx818fe7f28d11a068",
"wx7267d1424c452a5d",
"wx24063dde6bfd51c8",
"wx1cf2c8cbe03b93a6",
"wxfa3db879201615d1",
"wxdfc48f74690910ca",
"wxd13afadf476fe529",
"wx4e16b27b521b4037"
];

//微信跳转 ipad 索引=shopid 从 1 开始 仅用于 ipad
var wxappid_ipad=["",
"wx818fe7f28d11a068",
"wx7267d1424c452a5d",
"wx24063dde6bfd51c8",
"wx1cf2c8cbe03b93a6",
"wxfa3db879201615d1",
"wxdfc48f74690910ca",
"wxd13afadf476fe529",
"wx4e16b27b521b4037"
];
//iphone的下载
var iosappid=["",
"id1001411255",
"id1106389145",
"id1167376083",
"id1181792489",
"id1187772894",
"id1216027711",
"id1218705455",
"id1226906034"
];
//ipad的下载
var iosappid_ipad=["",
"id1031178686",
"id1133856111",
"id1167376089",
"id1181794782",
"id1187772971",
"id1216028480",
"id1218714154",
"id1226906042"
];
//andorid的下载
var androidapkurl=["",
"http://hp3h1.hidog.net/app/1/hp3h1.3033.3.1.apk",
"http://hp3h1.hidog.net/app/2/tz3q1.1025.3.0.1.apk",
"http://hp3h1.hidog.net/app/3/sx3q1.2014.3.0.apk",
"http://hp3h1.hidog.net/app/4/yiwu.2009.3.1.apk",
"http://hp3h1.hidog.net/app/5/huz3q1.2008.3.0.apk",
"http://hp3h1.hidog.net/app/6/jh3q1.2011.3.2.apk",
"http://hp3h1.hidog.net/app/7/wz3q1.2004.3.2.apk",
"http://hp3h1.hidog.net/app/7/zs3q1.apk"
];

var _SHOPID=1;
var _PAGE=2;

function GetShopID(){
    _SHOPID= jQuery.fn.MyGetUrlParameter("shopid");
    return _SHOPID;
}

function GetPage(){
    _PAGE= jQuery.fn.MyGetUrlParameter("page");
    return _PAGE;
}


//======================================================================================================================
//page
//1: 入桌 红色图片 invitegame.html
//2：下载 或 打开 白色图片 startgame.html
function loadHtml(plat){
    var _img="";
    var shopid=GetShopID();
    var page=GetPage();
    if(!shopid){
        //alert("shopid不明确");
        document.location=dowurl;
        return 0;
    }

    if(!page){
        //alert("page不明确");
        document.location=dowurl;
        return 0;
    }

    if(plat==1){//android
        if(page==1){
            _img=shopid + "/android_desk.jpg";//androidArr_desk[shopid];
        }else if(page==2){
            _img=shopid + "/android_open.jpg";//androidArr_open[shopid];
        }
    }else if(plat==2){//IOS
        if(page==1){
            _img=shopid + "/ios_desk.jpg";//iosArr_desk[shopid];
        }else if(page==2){
            _img=shopid + "/ios_open.jpg";//iosArr_open[shopid];
        }
    }

    $("#bkimg").attr("src","http://hp3h1.hidog.net/shareapp/img/"+_img);
    return 1;
}

function GetDeviceUrl(_type){
    var param = jQuery.fn.MyGetUrlParameter("hp3h1param");
    var shopid=GetShopID();
    var urlparam = "://hidog.hp3h1/?hp3h1param=" + param;
    var url = wxappid[shopid] + urlparam;
    if (_type == "ipad") {
        url = wxappid_ipad[shopid] + urlparam;
    }
    return url;
}
//======================================================================================================================
function GetDeviceAppid(_type)
{
    var shopid=GetShopID();
    var appid = iosappid[shopid];
    if (_type == "ipad") {
        appid =  iosappid_ipad[shopid];
    }
    return appid;
}
//======================================================================================================================
function getApkUrl(){
    var shopid=GetShopID();
    var url=androidapkurl[shopid];
    return url;
}

//访问地址
//http://localhost:63342/hagou/invitegame.html?page=2&shopid=1&hp3h1param=1112969.35344.59.2
function loadHtml_pc(){
    var _img="";
    var shopid=GetShopID();
    var platfrom= jQuery.fn.MyGetUrlParameter("platfrom"); //1=android 2=iPhone 3=pc 4=iPad
    if(!shopid){
        //alert("shopid不明确");
        document.location=dowurl;
        return 0;
    }
    if(!platfrom){
        //alert("platfrom不明确");
        document.location=dowurl;
        return 0;
    }

    if(platfrom==1){
        var url= getApkUrl();
        document.location=url;
        return 0;
    }else if(platfrom==2){
        document.location="https://itunes.apple.com/app/" + GetDeviceAppid("");//"https://itunes.apple.com/us/app/ha-gou-hang-pai3he1-hang-zhou/"+_iosappid+"?l=zh&ls=1&mt=8";
        return 0;
    }else if(platfrom==3){
        document.location=dowurl;
        return 0;
    }else if(platfrom==4){
        document.location="https://itunes.apple.com/app/" + GetDeviceAppid("ipad");
        return 0;
    }
    return 1;
}
//======================================================================================================================


$(function(){
     orient();
    //getw();
    var _title="哈狗"+_shopname[_SHOPID]+"，要打本地麻将、扑克，上哈狗游戏！";
    $("#_title").text(_title);
});

$(window).bind('orientationchange', function(e){
    orient();
});

function getw()
{
    alert($(".imgbox").height());
}