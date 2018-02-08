$(document).ready(function(){
	pub_ui.init();
})

pub_ui={}
pub_ui.init=function(){
	if($('#wrap').hasClass('main')){
		pub_ui.main();
	}else{
		pub_ui.sub();
	}
}

pub_ui.main=function(){
	console.log('main');
}

pub_ui.sub=function(){
	$('.tab1').Tab({idx:0});
	$('.tab2').Tab({idx:2});
	$('.acco1').Acco({option:1});
	$('.acco2').Acco({option:3});
	$('.p1').popUp();
	console.log('sub');
}

 /*탭*/
jQuery.fn.Tab = function(opts){
    var $opts = {
       idx:0
    };
    $.extend($opts,opts);
    var $this=$(this)
    var idx = $opts.idx;
    var $select = $this.find('.tab_tit li');
    var $cts = $this.find('.tab_cts');
    $select.eq(idx).addClass('active');
    $cts.eq(idx).addClass('active');
    return $select.on("click", function () {    	
        var idx = $select.index(this);
        $select.removeClass("active");
        $(this).addClass("active");
        $cts.removeClass("active");
        $cts.eq(idx).addClass("active");
    });  
}
/* //탭*/

/*아코디언*/
jQuery.fn.Acco = function(opts){
    var $opts = {
        option:1,   // 1:기본,2:전부닫기, 3:부드럽게, 4:부드럽게 전부닫기
        speed:200   // 속도
    };
    $.extend($opts,opts);
    
    var option = $opts.option;
    var speed = $opts.speed;
    
    var $select = $(this).find('dt>a')
    var $cts = $(this).find('dd');

    return $select.on("click", function () {
        var act = $(this).hasClass("active");
        
        if(option==1){
            if (act == false) {
                $(this).addClass("active");
                $(this).parent().next().addClass("active");
            } else {
                $(this).removeClass("active");
                $(this).parent().next().removeClass("active");
            }
        }else if(option==2){
            $select.removeClass('active')
            $cts.removeClass('active')
            if (act == false) {
                $(this).addClass("active");
                $(this).parent().next().addClass("active");
            } else {
                $(this).removeClass("active");
                $(this).parent().next().removeClass("active");
            }
        }else if(option==3){
            if (act == false) {
                $(this).addClass("active");
                $(this).parent().next().slideDown(speed);
            } else {
                $(this).removeClass("active");
                $(this).parent().next().slideUp(speed);
            }     
        }else if(option==4){
            $select.removeClass('active')
            $cts.slideUp(speed);
            if (act == false) {
                $(this).addClass("active");
                $(this).parent().next().slideDown(speed);
            } else {
                $(this).removeClass("active");
                $(this).parent().next().slideUp(speed);
            }    
        }
    }); 
}
/* //아코디언*/

/*팝업*/
jQuery.fn.popUp = function(opts){   
    var $opts = {
        layerPop:'.layer_pop',
        fade:false,
        dim:true
    };
    $.extend($opts,opts);
    
    var $popL = $($opts.layerPop);    
    var $select =$(this); 
    var $href = $(this).attr('href');
    var $fade = $opts.fade
    var $dim = $opts.dim
    
    return $select.on("click",function(e){
        
        /*페이드 효과*/
        if($fade==false){
            $($href).attr('tabindex',0).show().focus();
        }else{
            $($href).attr('tabindex',0).fadeIn().focus();
        }
        
        /*딤 생성*/
        if($dim==true){
            $('.wrap').append('<div class="dim"></div>')
            $(".dim").show();
            $(".dim").css({
                background:'#000',
                opacity:'0.7',
                position:'fixed',
                top:0,
                left:0,
                width:'100%',
                height:'100%',
                zIndex:998
            })
        }else{
            $(".dim").hide();
        } 
        var bodyH = $(window).outerHeight();
        var bodyW = $(window).outerWidth();
        var layerH = $popL.outerHeight();
        var layerW = $popL.outerWidth();
        var centerH = (bodyH / 2) - (layerH / 2 + 100);
        var centerW = -layerW / 2
        $popL.css({
            "top": centerH,
            "margin-left": centerW,
            zIndex:999
        });
        $("body").css({
            "overflow": 'hidden'
        });
       
        $popL.find('.cls').on("click", function () {
            var $this  = $(this);
            $popL.hide();                                          
            $(".dim").hide();
            $("body").css({
                "overflow": 'inherit'
            });
            $select.focus();      
         }) 
    });  
}
/* // 팝업*/