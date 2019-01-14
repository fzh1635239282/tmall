$(function() {
    $('.login-content').load('../public/loginForm.html');
    $('#footer').load('../public/footer.html');

    $('.login-content').on('click','#J_SubmitStatic',function() {
        $.ajax({
            type : 'post',
            data : {
                'user' : $('#uname').val(),
                'pwd' : $('#pwd').val()
            },
            url : '../php/login.php',
            dataType : 'json',
            success : function(res) {
                if(res.error == 1) {
                    $('.J_Message').css('display','block');
                    $('.login-title').css('opacity','0');
                } else {
                    setCookie('uname',res.u_phone);
                    location.href = 'index.html';
                }
            }
        });
    });
});