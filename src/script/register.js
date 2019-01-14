$(function() {
    //注册协议点击同意消失
    $('#J_AgreementBtn').on('click',function() {
        $('#agreement').css('display','none');
    });
    //验证
    var reg = {
        phone : /^1[3-9]\d{9}$/,
        email : /^\w{2,16}@\w{2,16}\.\w{2,16}$/,
        uname : /^.{5,25}$/,
        pwd : /^.{6,16}$/
    };
    //设置用户名
    $('#J_Mobile').on('blur',function() {
        if($('#J_Mobile').val() === "") {
            $('#J_Mobile').siblings('.notice').css('color','#ff0036').children('.fa').removeClass('fa-check-circle').addClass('fa-times-circle').siblings('.notice-t').html('请输入你的手机号码');
            $('#J_BtnMobileForm').removeClass('enable').addClass('disable');
        } else if(reg.phone.test($('#J_Mobile').val())) {
            $.ajax({
                type : 'post',
                data : {
                    'phone' : $('#J_Mobile').val(),
                    'uname' : ""
                },
                url : '../php/register.php',
                dataType : 'json',
                success : function(res) {
                    if(res.error == '1') {
                        $('#J_Mobile').siblings('.notice').css('color','#ff0036').children('.fa').removeClass('fa-check-circle').addClass('fa-times-circle').siblings('.notice-t').html(res.msg);
                        $('#J_BtnMobileForm').removeClass('enable').addClass('disable');
                    } else {
                        $('#J_Mobile').siblings('.notice').css('color','#6bc827').children('.fa').removeClass('fa-times-circle').addClass('fa-check-circle').siblings('.notice-t').html('');
                        if($('#J_MobileForm .fa-check-circle').length >= 2) $('#J_BtnMobileForm').removeClass('disable').addClass('enable');
                    }
                }
            });
        } else {
            $('#J_Mobile').siblings('.notice').css('color','#ff0036').children('.fa').removeClass('fa-check-circle').addClass('fa-times-circle').siblings('.notice-t').html('手机号码格式不正确，请重新输入');
            $('#J_BtnMobileForm').removeClass('enable').addClass('disable');
        }
    });
    $('#slider-block').on('mousedown',function(e) {
        var moveBlock = $('#slider-block'),
            x = e.offsetX,
            offX = $(this).offset().left,
            thisCallee = arguments.callee,
            moveUp = ()=>{
                $('body').off('mousemove',move);
                moveBlock.animate({
                    'left' : '0'
                },500);
                $('.cover').animate({
                    'width' : '0'
                },500);
            },
            move = function(e) {
            var mouseX = e.clientX,
                posX = mouseX-x-offX < -10 ? -10 : mouseX-x-offX;
                if(posX > $('.check-slider').width() - moveBlock.width()) {
                    posX = $('.check-slider').width() - moveBlock.width() + 5;
                    $('.fa-angle-double-right').removeClass('fa-angle-double-right').addClass('fa-check-circle');
                    if($('#J_MobileForm .fa-check-circle').length >= 2) $('#J_BtnMobileForm').removeClass('disable').addClass('enable');
                    $('#slider-block').off('mousedown',thisCallee);
                    $('body').off('mousemove',arguments.callee);
                    $('body').off('mouseup',moveUp);
                }
            moveBlock.css('left',posX + "px");
            $('.cover').css('width',posX + "px");
        }
        $('body').on('mousemove',move);
        
        $('body').on('mouseup',moveUp);
    });
    //填写表单
    $('#email').on('blur',function() {
        if($('#email').val() === "") {
            $('#email').siblings('.notice').css('color','#ff0036').children('.fa').removeClass('fa-check-circle').addClass('fa-times-circle').siblings('.notice-t').html('邮箱不能为空');
        } else if(reg.email.test($('#email').val())) {
            $('#email').siblings('.notice').css('color','#6bc827').children('.fa').removeClass('fa-times-circle').addClass('fa-check-circle').siblings('.notice-t').html('');
        } else {
            $('#email').siblings('.notice').css('color','#ff0036').children('.fa').removeClass('fa-check-circle').addClass('fa-times-circle').siblings('.notice-t').html('邮箱格式错误,请重新输入');
        }
    });
    $('#pwd').on('blur',function() {
        if($('#pwd').val() === "") {
            $('#pwd').siblings('.notice').css('color','#ff0036').children('.fa').removeClass('fa-check-circle').addClass('fa-times-circle').siblings('.notice-t').html('密码设置不符合要求');
        } else if(reg.pwd.test($('#pwd').val())) {
            $('#pwd').siblings('.notice').css('color','#6bc827').children('.fa').removeClass('fa-times-circle').addClass('fa-check-circle').siblings('.notice-t').html('');
        } else {
            $('#pwd').siblings('.notice').css('color','#ff0036').children('.fa').removeClass('fa-check-circle').addClass('fa-times-circle').siblings('.notice-t').html('密码设置不符合要求');
        }
    });
    $('#confirm-pwd').on('blur',function() {
        if($('#confirm-pwd').val() === $('#pwd').val()) {
            $('#confirm-pwd').siblings('.notice').css('color','#6bc827').children('.fa').removeClass(['fa-times-circle','fa-info-circle']).addClass('fa-check-circle').siblings('.notice-t').html('');
        } else {
            $('#confirm-pwd').siblings('.notice').css('color','#ff0036').children('.fa').removeClass(['fa-check-circle','fa-info-circle']).addClass('fa-times-circle').siblings('.notice-t').html('两次密码输入不一致');
        }
    });
    $('#confirm-pwd').on('focus',function() {
        $('#confirm-pwd').siblings('.notice').children('.fa').removeClass(['fa-times-circle','fa-check-circle']).addClass('fa-info-circle').siblings('.notice-t').html('请再次输入你的密码').css('color','#3e3e3e');
    });
    $('#uname').on('blur',function() {
        if(reg.uname.test($('#uname').val())) {
            $('#uname').siblings('.notice').css('color','#6bc827').children('.fa').removeClass(['fa-times-circle','fa-info-circle']).addClass('fa-check-circle').siblings('.notice-t').html('');
        } else {
            $('#uname').siblings('.notice').css('color','#ff0036').children('.fa').removeClass(['fa-check-circle','fa-info-circle']).addClass('fa-times-circle').siblings('.notice-t').html('5-25个字符，推荐使用中文，请勿包含姓名/身份证/银行卡等隐私信息，一旦设置成功无法修改').css('color','#ff0036');
        }
    });
    $('#uname').on('focus',function() {
        $('#uname').siblings('.notice').children('.fa').removeClass(['fa-times-circle','fa-check-circle']).addClass('fa-info-circle').siblings('.notice-t').html('建议会员名使用简体中文,方便又好记').css('color','#3e3e3e');
    });
    //设置用户名时点击下一步
    $('#J_BtnMobileForm').on('click',function() {
        if($(this).hasClass('disable')) return;
        $('.steps>ul>li:eq(1)').addClass('active');
        $('.content>ul>li:eq(1)').addClass('active').siblings().removeClass('active');
        $('#login-name').html($('#J_Mobile').val());
    });
    //提交表单
    $('#J_BtnInfoForm').on('click',function() {
        if($('#J_InfoForm .fa-check-circle').length < 4) return;
        $.ajax({
            type : 'post',
            data : {
                'phone' : $('#J_Mobile').val(),
                'uname' : $('#uname').val(),
                'email' : $('#email').val(),
                'pwd' : $('#pwd').val()
            },
            dataType : 'json',
            url : '../php/register.php',
            success : function(res) {
                $('.steps>ul>li:eq(2)').addClass('active');
                $('.content>ul>li:eq(2)').addClass('active').siblings().removeClass('active');
                setCookie('uname',$('#J_Mobile').val());
                setInterval(function() {
                    if($('#time').html($('#time').html()-1).html() == 0) {
                        location.href = "index.html";
                    }
                },1000);
            }
        });
    });
});