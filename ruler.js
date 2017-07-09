function MeasureRuler(dParam){
    var param={
        wrapperId:"rulerWrapper",   //标尺ID
        max:500,       //标尺最大刻度
        minUnit:1,     //标尺最小单位刻度
        unitSet:10,    //标尺单位单位刻度组
        mult:1         //标尺单位刻度的倍数 最小是1 即每一刻度占10px
    }
    $.extend(param,dParam);
    var limitLeft=0;
    var scrollerWidth=0;
    var wrapperWidth=0;
    var pleft=0;
    var firstRand=true;
    this.initRuler=function(){
        var nhtml="";
        limitLeft=0;
        scrollerWidth=0;
        wrapperWidth=0;
        $("#"+param.wrapperId).addClass("rulerWrapper")
        $("#"+param.wrapperId).append('<div class="rulerScroller"></div><div class="rulerPointer"></div>')
        var setLen=Math.ceil(param.max/(param.unitSet*param.minUnit))+6;
        var setWidth=param.unitSet*10*param.mult;
        for(var i=0;i<setLen;i++){
            nhtml+="<span class='sizeNo' style='left:"+(i*setWidth-setWidth/2)+"px;width:"+setWidth+"px'></span><ul  style='width:"+setWidth+"px'>";
            for(var j=0;j<(param.unitSet-1);j++){
                nhtml+="<li style='width:"+10*param.mult+"px'></li>";
            }
            nhtml+="</ul>";
        }
        $("#"+param.wrapperId+" .rulerScroller").append(nhtml);
        var st;
        wrapperWidth=$("#"+param.wrapperId).width();
        scrollerWidth=setLen*10*param.unitSet*param.mult;

        $("#"+param.wrapperId).on('touchstart',function(e){
            var touch = e.originalEvent.targetTouches[0];
            st = touch.pageX;
        })

        $("#"+param.wrapperId).on('touchmove',function(e){
            var touch = e.originalEvent.targetTouches[0];
            var x = touch.pageX;
            var lf=$("#"+param.wrapperId+" .rulerScroller").position().left;
            var nlf=lf+x-st;

            //超过最左或者最右标尺不可滑动
            if(lf-50 > limitLeft || wrapperWidth-scrollerWidth>lf+50){
                return;
            }
            var pointerVal=Math.floor((limitLeft-nlf)/(10*param.mult))>0?Math.floor((limitLeft-nlf)/(10*param.mult)):0;
                pointerVal=param.minUnit*pointerVal;
            if(param.callback)  param.callback(pointerVal)
            $("#"+param.wrapperId+" .rulerScroller").css("left",nlf);

        })

        $("#"+param.wrapperId).on('touchend',function(e){

            var lf=$("#"+param.wrapperId+" .rulerScroller").position().left;
            if(lf > limitLeft){
                $("#"+param.wrapperId+" .rulerScroller").css("left",limitLeft);
                if(param.callback) param.callback(0);
                return;
            }else if(wrapperWidth-scrollerWidth>lf){
                $("#"+param.wrapperId+" .rulerScroller").css("left",wrapperWidth-scrollerWidth);
            }
            var lf=$("#"+param.wrapperId+" .rulerScroller").position().left;
            var disNo=Math.round((lf-pleft)/(10*param.mult));
            var nDis=disNo*10*param.mult+pleft;
            $("#"+param.wrapperId+" .rulerScroller").css("left",nDis);
            var pointerVal=Math.floor((limitLeft-nDis)/(10*param.mult));
            pointerVal=param.minUnit*pointerVal;
                  if(param.callback)  param.callback(pointerVal)
            console.log(pointerVal)
        })

        //中间标志的位置
        if(firstRand){
            pleft=$("#"+param.wrapperId+" .rulerPointer").position().left;
        }
        var rulerLNo=0;
        for(var z=1;z<setLen;z++){
            if(z*setWidth>pleft) {
                limitLeft=pleft-z*setWidth;
                rulerLNo=z;
                break;
            }
        }

        //标尺初始化数值
        if(param.value){
            $("#"+param.wrapperId+" .rulerScroller").css("left",limitLeft-(param.value/param.minUnit)*10*param.mult);
            if(param.callback)  param.callback(param.value)
        }else{
            $("#"+param.wrapperId+" .rulerScroller").css("left",limitLeft);
        }

        //标尺刻度值
        $("#"+param.wrapperId+" .sizeNo").each(function(idx,ele){
            if(idx>=rulerLNo && idx<setLen-1){
                $(ele).html((idx-rulerLNo)*param.minUnit*param.unitSet);
            }
        })
    }
    this.setValue=function(val){
        if(val>param.max) return;
        $("#"+param.wrapperId+" .rulerScroller").css("left",limitLeft-val*10*param.mult/param.minUnit);
         if(param.callback)  param.callback(val)
    };

    this.reDrawRuler=function(nParam){
        nParam.value=nParam.value?nParam.value:0;
        firstRand=false;
        if(nParam){
            $.extend(param,nParam)
        }
        $("#"+param.wrapperId).html("");
        $("#"+param.wrapperId).unbind('touchstart');
        $("#"+param.wrapperId).unbind('touchend');
        $("#"+param.wrapperId).unbind('touchmove');
        this.initRuler();
    };

    this.initRuler();

}