var detail = {
    doc : document,

    get_id : function(id){
        return this.doc.getElementById(id);
    },

    get_by_class : function(parent,css){
        var arr = [],
            a_ele = null,
            re = null;
        if(!!this.doc.querySelectorAll){
            arr = parent.querySelectorAll('.' + css);
        }else{
            a_ele = parent.getElementsByTagName('*');
            re = new RegExp('\\b' + css + '\\b');
            for(var i = 0; i < a_ele.length; i++){
                if(re.test(a_ele[i].className)){
                    arr.push(a_ele[i]);
                }
            }
        }
        return arr;
    },

    ewm_show : function(id,ewm){
        id.onmouseover = function(){
            clearTimeout(id.time);
            clearTimeout(id.time2);
            id.time = setTimeout(function(){
                ewm.style.display = 'block';
            },300)
        };
        id.onmouseout = function(){
            clearTimeout(id.time);
            clearTimeout(id.time2);
            id.time2 = setTimeout(function(){
                ewm.style.display = 'none';
            },50)
        }
    },

    ewm_show_fn : function(){
        this.ewm_show(this.get_id("but_wm2_and"),this.get_id("wm2_and"));
        this.ewm_show(this.get_id("but_wm2_iph"),this.get_id("wm2_iph"));
        this.ewm_show(this.get_id("but_wm2_ipad"),this.get_id("wm2_ipad"));
    },

    init : {
      id : null,
      num : 0,
      box : null,
      ch_box : null,
      le : null
    },

    init_fn : function(obj){
        var _this = this,
            i;
        for(i in obj){
            _this.init[i] = obj[i];
        }
        _this.hot_img();

    },

    hot_img : function(){
        var _this = this,
            oHot = _this.get_id(_this.init.id),
            oHotul = _this.init.box = oHot.getElementsByTagName('ul')[0],
            aHotli = oHot.getElementsByTagName('li'),
            oBox = _this.init.ch_box = _this.get_by_class(oHot,'img_box')[0],
            oLeft = _this.get_by_class(oHot,'left')[0],
            oRight = _this.get_by_class(oHot,'right')[0],
            len = aHotli.length;

        _this.init.le = oBox.offsetWidth;
        oHotul.style.width = len * _this.init.le + 'px';
        for (var i = 0; i < len ; i++){
            aHotli[i].style.width = (_this.init.le) + 'px'
        }
        oLeft.onclick = function(){
            var _this = detail;
            _this.init.num --;
            if(_this.init.num < 0){
                _this.init.num = len -1;
            }
            _this.hot_img_fn(_this.init.num)

        };
        oRight.onclick = function(){
            var _this = detail;
            _this.init.num ++;
            if(_this.init.num > len -1){
                _this.init.num = 0;
            }
            _this.hot_img_fn(_this.init.num)
        };

    },

    hot_img_fn : function(){
        var _this = this;
        _this.init.box.style.left = -(_this.init.num * _this.init.le) + 'px';
        _this.init.box.style.transition = 'all ease 1s';

    },


    win_max : function(){
        var _this = this,
            oMin = _this.get_id('min_max_width'),
            oMinWidth = _this.doc.documentElement.clientWidth || _this.doc.body.clientWidth,
            oMinHeight = _this.doc.documentElement.clientHeight || _this.doc.body.clientHeight;
        function change(){
            _this.init.le = _this.init.ch_box.offsetWidth;
            _this.hot_img();
            _this.hot_img_fn();
        }
        if(oMin){
            if(oMinWidth < 1201 || oMinHeight < 761){
                oMin.className = "min_980";
                change()
            }else{
                oMin.className = "";
                change()
            }
        }

    }

}