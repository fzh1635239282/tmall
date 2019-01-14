$(function() {
    $('#header .h-topMenu').load('../public/hTopMenu.html',()=>changeCartCount());
    $('#asider').load('../public/asider.html',()=>changeCartCount());
    $('#footer').load('../public/footer.html');

    var changeCartCount = function() {
        var cookies = document.cookie,
            arr = cookies.split('; '),
        arr = arr.filter(function(val,i,arr) {
            item = val.split('=');
            return item[0].slice(0,1) == 'p';
        });
        $('header .mc-count').html(arr.length);
        $('#asider .mc-count').html(arr.length);
    }

    //获取cookie
    var uname = getCookie('uname');
    if(uname) {
        $('.login').addClass('displayN');
        $('.online').removeClass('displayN').children('.j_Username').html(uname);
        $('.logout').on('click',function() {
            removeCookie('uname');
        });
    }

    //banner轮播
    var bannerPlayO = $('.banner-play');
    var bannerPlay = new BannerPlay(bannerPlayO,5000);
    bannerPlay.startI();
    bannerPlayO.hover(function() {
        bannerPlay.stopI();
    },function() {
        bannerPlay.startI();
    });
    $('.banner-play .hover-rect>li').on('mouseover',function() {
        bannerPlay.changeShow($(this).index());
    });

    var itemsPlayO = $('.items-play');
    var itemsPlay = new BannerPlay(itemsPlayO,2000);
    itemsPlay.startI();
    itemsPlayO.hover(function() {
        itemsPlay.stopI();
    },function() {
        itemsPlay.startI();
    });
    $('.items-play .hover-rect>p').on('mouseover',function() {
        itemsPlay.changeShow($(this).index());
    });

    //滚动条事件
    $(window).on('scroll',function() {
        if(scrollY > 500) {
            $('#nomove-nav').css('transform','scale(1)');
        } else {
            $('#nomove-nav').css('transform','scale(0)');
        }
        if(scrollY > 700) {
            $('#nomove-search').slideDown(300);
        } else {
            $('#nomove-search').slideUp(300);
        }
        var colorArr = ['green','black','pink','blue','cyan','red','red-pink'];
        var yModify = scrollY + 500;
        if(yModify  >= $('#j_TMCS').offset().top && yModify < $('#j_TMGJ').offset().top) {
            $('#jj_TMCS').addClass('green').siblings('.mui-lift-nav').removeClass(colorArr);
        } else if(yModify >= $('#j_TMGJ').offset().top && yModify < $('#j_MLRS').offset().top) {
            $('#jj_TMGJ').addClass('red-pink').siblings('.mui-lift-nav').removeClass(colorArr);
        } else if(yModify >= $('#j_MLRS').offset().top && yModify < $('#j_JJSH').offset().top) {
            $('#jj_MLRS').addClass('pink').siblings('.mui-lift-nav').removeClass(colorArr);
        } else if(yModify >= $('#j_JJSH').offset().top && yModify < $('#j_CDKW').offset().top) {
            $('#jj_JJSH').addClass('green').siblings('.mui-lift-nav').removeClass(colorArr);
        } else if(yModify >= $('#j_CDKW').offset().top && yModify < $('#j_HWCX').offset().top) {
            $('#jj_CDKW').addClass('blue').siblings('.mui-lift-nav').removeClass(colorArr);
        } else if(yModify >= $('#j_HWCX').offset().top && yModify < $('#j_DZAC').offset().top) {
            $('#jj_HWCX').addClass('cyan').siblings('.mui-lift-nav').removeClass(colorArr);
        } else if(yModify >= $('#j_DZAC').offset().top && yModify < $('#j_CNXH').offset().top) {
            $('#jj_DZAC').addClass('red').siblings('.mui-lift-nav').removeClass(colorArr);
        } else if(yModify >= $('#j_CNXH').offset().top && yModify < $('#footer').offset().top) {
            $('#jj_CNXH').addClass('red-pink').siblings('.mui-lift-nav').removeClass(colorArr);
        } else {
            $('#nomove-nav .mui-lift-nav').removeClass(colorArr);
        }
    });
    $('#nomove-nav>.nav-box>a').on('click',function() {
        $('body,html').animate({
            scrollTop : $('#'+$(this).attr('id').slice(1)).offset().top - $('#nomove-search').height()
        },500);
    });
    $('.nav-back').on('click',function() {
        $('body,html').animate({
            scrollTop : 0
        },500);
    });

    $.ajax({
        type : 'get',
        data : {
            id : '1,2,3'
        },
        url : '../php/getDoodsInfo.php',
        dataType : 'json',
        success : function(res) {
            if(res.error) {
                console.log('失败');
            } else {
                var strAllItem = "";
                for(var i = 0; i < res.length; i++) {
                    strAllItem += `
                    <li class="wonderful-item${(i+1) % 5 === 0 ? " last" : ""}">
                        <a href="details.html?id=${res[i].id}">
                            <span class="item-pic"><img src="../img/${JSON.parse(res[i].pic).p1}" alt=""></span>
                            <span class="item-info">
                                <span class="item-desc">
                                    <em class="item-name">${res[i].title}</em>
                                </span>
                                <span class="item-detail">
                                    <span class="item-price">
                                        <i class="money-icon">¥</i>
                                        <span class="money-integer">${res[i].new_price.slice(0,-3)}</span>
                                        <span class="money-decimal">.${res[i].new_price.slice(-2,-1)}</span>
                                    </span>
                                </span>
                            </span>
                        </a>
                    </li>
                    `;
                }
                $('.wonderful-line').html(strAllItem);
            }
        }
    });
});