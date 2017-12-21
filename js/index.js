$(function () {
    /********************************************扩展$函数************************************************/

    /*
     *图片预加载
     *参数： pics:图片数组
     *       callback： 图片加载完毕回调函数
     *       num：进度
     *       
     */
    $.fn.uImgLoad = function (pics, num, callback) {
        var index = 0;
        var len = pics.length;
        var img = new Image();
        var flag = false;

        var progress = function(w){
            num.html(w);
        }

        var load = function(){
            img.src = pics[index];
            img.onload = function() {
                progress(Math.floor(((index + 1) / len) * 100) + "%");
                index ++ ;
                if (index < len) {
                    load();
                }else{
                    callback();
                }
            }
            return img;
        }
        if(len > 0){
            load();
        }else{
            progress("100%");
        }
    };


    /*
     *获取验证码倒计时
     *参数： time：倒计时时间 单位S
     */
    $.fn.getCode = function (time) {
        // 倒计时秒数
        var now = time;

        var $this = $(this);
        var isGet = $this.data('isget');
        if (isGet === 'true') {
            return false;
        } else if (isGet === 'false' || isGet === undefined) {
            $this.data('isget','true');
            $this.addClass('active');
            $this.html('<i>'+now+'</i>s后获取');
            var timer = timer = setInterval(function () {
                if (now>1) {
                    now -= 1;
                    $this.html('<i>'+ now +'</i>s后获取');
                }
            }, 1000);
            setTimeout(function () {
                $this.removeClass('active');
                $this.html('获取验证码');
                $this.data('isget','false');
                timer = null;
            },now * 1000);
        }
    };



    /**********************************************绑定事件**********************************************/

    // 图片预加载
    var pics = [
        'images/logo.png',
        'images/icon_01.png',
        'images/login_bg.png',
        'images/slid-btn.png',
        'images/img_01_01.png',
        'images/img_01_02.png',
        'images/img_01_03.png',
        'images/img_01_04.png',
        'images/img_01_05.png',
        'images/img_01_06.png',
        'images/img_01_07.png',
        'images/img_01_08.png',
        'images/img_01_09.png',
        'images/img_02_01.png',
        'images/img_02_02.png',
        'images/img_02_03.png',
        'images/img_02_04.png',
        'images/img_02_05.png',
        'images/img_02_06.png',
        'images/img_02_07.png',
        'images/img_02_08.png',
        'images/img_03_01.png',
        'images/img_03_02.png',
        'images/img_03_03.png',
        'images/img_03_04.png',
        'images/img_03_05.png',
        'images/img_04_01.png',
        'images/img_04_02.png',
        'images/img_04_03.png',
        'images/img_04_04.png',
        'images/img_04_05.png',
        'images/img_05_01.png',
        'images/img_05_02.png',
        'images/img_05_03.png',
        'images/img_05_04.png',
        'images/img_05_05.png',
        'images/img_06_01.png',
    ];
    $('.progress-num').uImgLoad(pics,$('.progress-num'),function () {
        $('.page-loading').fadeOut('fast', function () {
            $('.login').fadeIn('fast');
        });
        $('.first-content .ani').each(function () {
            var thisanimate = $(this).attr('swiper-animate-effect');
            $(this).removeClass(thisanimate);
            $(this).removeClass('animated');
        });
    });
    

    
    // 点击获取验证码
    $('.login-form-code-btn').on('touchend', function () {
        $(this).getCode(70);
    });

    //点击登录
    $('#login').on('touchend', function () {
        var tel = $('#loginTel').val();
        var code = $('#loginCode').val();
        if (tel === '') {
            alert('请您输入电话号码！');
            return false;
        }
        if (code === '') {
            alert('请您输入验证码！');
            return false;
        }

        // 验证成功后
        $('.login').slideUp();
        $('.first-content .ani').addClass('animated');
        $('.first-content .ani').each(function () {
            var thisanimate = $(this).attr('swiper-animate-effect');
            $(this).addClass(thisanimate);
        });
    });

    // 滑动
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical',
        loop: false,
        mousewheelControl : true,
        onInit: function(swiper){
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
        }, 
        onSlideChangeEnd: function(swiper){ 
          swiperAnimate(swiper);
        } 
    });
});