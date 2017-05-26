/**
 * Created with JetBrains WebStorm.
 * DccumentType:Public JS Class Libraries
 * User: zhangjun
 * Date: 14-10-08
 * Time: 下午17:00
 * To change this template use File | Settings | File Templates.
 */
/*
 * 公共操作js dcoument
 * 定义类统一 My 为类名前缀
 * */
(function ($) {
    $.fn.extend({
        //获取地址栏参数
        //单个获取 如：../dzp.html?username=zhangjun
        MyGetUrlParameter: function (Paramename) {
            var reg = new RegExp("(^|&)" + Paramename + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return r[2];
            }
            else {
                return null;
            }
        },
        //获取多个地址栏参数，返回json对象
        MyGetUrlParameterMore: function (ParameArr) {
            var arr = "";
            $.each(ParameArr, function (index, name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    if (arr == "") {
                        arr += name + ":'" + r[2] + "'";
                    }
                    else {
                        arr += "," + name + ":'" + r[2] + "'";
                    }
                }
            });
            if (arr != "") {
                arr = "{" + arr + "}";
                arr = this.ConvertJsonStrToObject(arr);
            }
            return arr;
        },
        MySetsessionStorage: function (key, value) {
            sessionStorage.removeItem(key);
            sessionStorage.setItem(key, value);
        },
        MyGetsessionStorage: function (key) {
            retvalue = sessionStorage.getItem(key);
            if (retvalue == null) {
                retvalue = null;
            }
            return retvalue;
        },
        MyRemovesessionStorage: function (key) {
            sessionStorage.removeItem(key);
        },
        //-----------------------------------------------------
        MySetLocalStorage: function (key, value) {
            localStorage.removeItem(key);
            localStorage.setItem(key, value);
        },
        MyGetLocalStorage: function (key) {
            retvalue = localStorage.getItem(key);
            if (retvalue == null) {
                retvalue = null;
            }
            return retvalue;
        },
        MyRemoveLocalStorage: function (key) {
            localStorage.removeItem(key);
        },
        MyClearStorage: function () {
            localStorage.clear();
            sessionStorage.clear();
        },
        //------------------------------------------------------------
        //获取域名
        MyGetLocalhost: function () {
            var local = window.location.href;
            var re = /http:\/\/([^\/]+)\//i;
            var _Domain = local.match(re);
            if (_Domain != "" || _Domain != null) {
                retvalue="http://www.hidog.com/shareapp/js/test7.egr.cn";
                //retvalue= _Domain[1]
                //retvalue="121.41.76.132:8011";
            }
            return retvalue;
        },
        //异步调用：
        // _postUrl：服务器操作url
        // _param:参数｛键:值,键:值，...｝
        // backmethod：回调函数,参数返回执行结果
        // errorMethod：执行错误时：回调函数
        MyAjaxPost: function (_postUrl, _param, backmethod, errorMethod) {
            /**Ajax的请求*/
            $.ajax({
                //请求的路径及所传的参数
                url: _postUrl,
                //是否异步
                async: true,
                //请求的方法
                type: "post",
                //执行参数
                data: _param,
                //请求成功时调用
                success: function (msg) {
                    //retvalue=msg;
                    //alert("ajax执行成功:"+msg);
                    backmethod(msg);
                },
                //请求失败时调用
                error: function (msg) {
                    errorMethod("请求失败：" + msg.message);
                    //alert("ajax执行失败1:"+msg.message);
                }
            });
        },
        //异步调用：
        // _postUrl：服务器操作url
        // _param:参数｛键:值,键:值，...｝
        // backmethod：回调函数,参数返回执行结果
        // errorMethod：执行错误时：回调函数
        //iftrue:true:false 是否异步
        MyAjaxPost_IfTrue: function (_postUrl, _param, backmethod, errorMethod, iftrue) {
            /**Ajax的请求*/
            $.ajax({
                //请求的路径及所传的参数
                url: _postUrl,
                //是否异步
                async: iftrue,
                //请求的方法
                type: "post",
                //执行参数
                data: _param,
                //请求成功时调用
                success: function (msg) {
                    //retvalue=msg;
                    //alert("ajax执行成功:"+msg);
                    backmethod(msg);
                },
                //请求失败时调用
                error: function (msg) {
                    errorMethod("请求失败：" + msg.message);
                    //alert("ajax执行失败1:"+msg.message);
                }
            });
        },
        MyJsonpAjax:function(_postUrl, _param,backmethod, errorMethod){
            $.ajax({
                url: _postUrl,
                data: _param,
                dataType:"jsonp",
                jsonp:"jsonpcallback",
                success:function(data){
                    //var datastr= $.fn.MyConvertJsonObjectToStr(data);
                    //alert(datastr)
                    backmethod(data);
                },error:function(e){
                    //alert("error="+e)
                    console.log(e);
                    errorMethod("error：" + e);
                }
            });
        },
        //异步调用：
        // _postUrl：服务器操作url
        // _param:参数｛键:值,键:值，...｝
        // backmethod：回调函数,参数返回执行结果
        // errorMethod：执行错误时：回调函数
        MyAjaxPostJsonp: function (_postUrl, _param, backmethod, errorMethod) {
            try {
                jQuery.ajax({
                        type: "get",
                        async: true,
                        url:_postUrl,
                        data: _param,
                        dataType: "jsonp",
                        success: function (data) {
                            backmethod(data);
                        },
                        error: function (e) {
                            errorMethod(e);
                        }
                    }
                );
            }
            catch (e) {
                errorMethod(e);
            }
        },
        //将JSON字符串转换成JSON对象
        MyConvertJsonStrToObject: function (jsonstring) {
            try {
                //var obj= eval('(' + jsonstring + ')');
                var obj = eval('(' + jsonstring.replace('\n', '<br />') + ')');
            } catch (e) {
                return null;
            }
            return obj;
        },
        //将JSON对象转换成JSON字符串
        /*
         *  IE9- 不支持 JSON.stringify 需要导入 json2.js 插件
         * */
        MyConvertJsonObjectToStr: function (jsonobj) {
            try {
                return JSON.stringify(jsonobj);
            } catch (e) {
                return null;
            }
        },
        //将 JavaScript 对象表示法 (JSON) 字符串转换为对象
        MyConvertJSONparse: function (jsonstr) {
            try {
                return JSON.parse(jsonstr);
            } catch (e) {
                return null;
            }
            /*
             //JSON.parse 示例：
             var jsontext = '{"firstname":"Jesper","surname":"Aaberg","phone":["555-0100","555-0120"]}';
             var contact = JSON.parse(jsontext);
             document.write(contact.surname + ", " + contact.firstname);
             // Output: Aaberg, Jesper
             */
        },
        //逗号间隔的字符串中移除某个字符
        MyConvertRemoveStr: function (a, b) {
            //var S="a,b,c"    S=a,c
            return  (',' + a + ',').replace(',' + b + ',', ',').substr(1).replace(/,$/, '');
        },
        //逗号间隔的字符串中判断是否有相同的字符存在
        //s1=要查找的字符串
        //s2=参照字符串
        MyIfConsistInStr: function (s1, s2) {
            var s = ',' + s1 + ',';
            var str = ',' + s2 + ',';
            var start = str.indexOf(s);
            if (start > -1) {
                return true;
            }
            return false;
        },
        //获取地址栏文件名,不含后缀名
        MyGetHttpFileName: function (s) {
            try {
                s = s.replace(/\?.*$/, '');
                s = s.replace(/^.*\//, '');
                var arr = s.split(".");
                s = arr[0];
            }
            catch (e) {
                return "";
            }
            return s;
        },
        //table基偶行变色
        //tableID 表ID
        //classname：样式名称
        MyTr_Evar_Odd: function (tableID, classname) {
            //$("#_zftb tr:odd").addClass("tr_odd"); //奇数行
            try {
                $("#" + tableID + " tr:odd").addClass(classname);//偶数行
            }
            catch (e) {
                alert(e);
            }
        },
        //去掉字符串左右两端逗号
        MyRemoveoneend: function (str) {
            if (str == "") {
                return str;
            }
            try {
                str = str.replace(/(^,+)|(,+$)/g, "");
            }
            catch (e) {
            }
            return str;
        },
        Jump_location: function (url, type) {
            type = type ? type : 0;
            switch (type) {
                case 0:
                    location.href = url;
                    break;
                case 1:
                    RedirectTo(url, "_self");
                    break;
                case 2:
                    RedirectTo(url, "_blank");
                    break;
            }
        }
    });
})(jQuery);
/**************************************************************************************************/
(function ($) {
    $.MyOpt = {
        /*
         * 随机数 (6位随机数)
         * */
        GetRandom: function () {
            var b = Math.random().toString().substring(2, 8);
            return b;
        },

        GetScrollTop: function () {
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            }
            else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            return scrollTop;
        },
        //手机号码校验 返回：true 正确的号码， fasle：不正确的号码
        CheckPhone: function (value) {
            if (!/^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/i.test(value)) {
                return false;
            }
            return true;
        },
        //======================================================================================================================
        CheckDatetime: function (time) {
            var a = /^[1-2]d{3}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[0-1])$/;
            if (time.match(a)) {
                return false;
            }
            return true;
        },
        GetNowDateTime: function () {
            var myDate = new Date();
            //return myDate.toLocaleDateString();
            var m = myDate.getMonth() + 1;
            if (m < 10) {
                m = '0' + m;
            }
            var d = myDate.getDate();
            if (d < 10) {
                d = '0' + d;
            }
            return myDate.getFullYear() + "-" + m + "-" + d;
        },
        GetStartDateTime: function () {
            var myDate = new Date();
            //return myDate.toLocaleDateString();
            var m = myDate.getMonth() + 1;
            if (m < 10) {
                m = '0' + m;
            }
            var d = '01';
            return myDate.getFullYear() + "-" + m + "-" + d;
        },
        //密码必须6位数字
        CheckPassword: function (_pwd) {
            var patrn = /^\d{6}$/;
            if (!patrn.exec(_pwd)) {
                return false;
            }
            return true;
        },
        //身份证验证
        CheckIdentityCard: function (_zCard) {
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (reg.test(_zCard) == false) {
                return false;
            }
            return true;
        },
        //邮箱验证
        CheckEmail: function (Eml) {
            var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!myreg.test(Eml)) {
                return false;
            }
            return true;
        },
        CheckIfNumber: function (value) {
            //定义正则表达式部分
            var reg = /^\d+$/;
            if (value.constructor === String) {
                var re = value.match(reg);
                return true;
            }
            return false;
        },
        CheckIfDatetime: function (value) {
            var a = /^(\d{4})-(\d{2})-(\d{2})$/
            if (a.test(value)) {
                var arr = value.split("-");
                var m = arr[1];
                var d = arr[2];
                if (m > 12 || m < 1) {
                    return false;
                }
                if (d > 31 || d < 1) {
                    return false;
                }
                return true;
            }
            return false
        },
        SubString: function (str, len) {
            if (str.length > len) {
                str = str.substring(0, len) + "...";
            }
            return str;
        },
        //是否是整数+0
        IsNumber: function (v) {
            var type = "^\\d+$";
            var re = new RegExp(type);
            if (v.match(re) == null) {
                return true;
            }
            //not is number
            return false;
        },
        //是否是数字且最多两位小数+0
        Isflote: function (s) {
            var type = "^[0-9]+(.[0-9]{1,2})?$"; //最多两位小数
            var re = new RegExp(type);
            if (s.match(re) == null) {
                //is number
                return true;
            }
            //not is number
            return false;
        },
        IsHttp: function (str_url) {
            var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
                + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
                + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
                + "|" // 允许IP和DOMAIN（域名）
                + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
                + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
                + "[a-z]{2,6})" // first level domain- .com or .museum
                + "(:[0-9]{1,4})?" // 端口- :80
                + "((/?)|" // a slash isn't required if there is no file name
                + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
            var re = new RegExp(strRegex);
            //re.test()
            if (re.test(str_url)) {
                return (true);
            } else {
                return (false);
            }
        },
        IFNumber: function (n) {
            if (!isNaN(n)) {
                return true;
            }
            return false;
        },
        //求两个日期相差的天数
        GetDays: function (strDateStart, strDateEnd) {
            var strSeparator = "-"; //日期分隔符
            var oDate1;
            var oDate2;
            var iDays;
            oDate1 = strDateStart.split(strSeparator);
            oDate2 = strDateEnd.split(strSeparator);
            var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
            var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
            iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24)//把相差的毫秒数转换为天数
            return iDays;
        },
        MyConvertDate:function(v) {
            var date = new Date(v);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            if (m < 10) {
                m = '0' + m;
            }
            if (d < 10) {
                d = '0' + d;
            }
            return y + "-" + m + "-" + d;
        }
        ,
        //生成时间格式订单号
        GetTimeCode: function (t) {
            var myDate = new Date();
            var y=myDate.getFullYear().toString();
            var m = myDate.getMonth() + 1;
            if (m < 10) {
                m = "0" + m;
            }
            var d = myDate.getDate();
            if (d < 10) {
                d = "0" + d;
            }
            var h = myDate.getHours().toString();
            if (h < 10) {
                h = "0" + h;
            }

            var mi = myDate.getMinutes().toString();
            if (mi < 10) {
                mi= "0" + mi;
            }
            var s = myDate.getSeconds().toString();
            if ( s < 10) {
                s= "0" +  s;
            }
            var ss=myDate.getMilliseconds().toString();
            if ( ss < 10) {
                ss= "0" +  ss;
            }
            var ret=  y+ m + d + h + mi + s+ss;
            if(t==1)
            {
                y= y.substr(2,2);
                ret=  y+ m + d + h + mi +s;
            }
            return ret;
        }
    }
})(jQuery);
/*
* 滚动条滑动到最底部
* $('html,body').animate({scrollTop:$('.jiange').offset().top}, 800);
* */



