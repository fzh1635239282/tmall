$(function() {
    $('.h-topMenu').load('../public/hTopMenu.html');
    $('#footer').load('../public/footer.html');

    var cookies = document.cookie,
        arr = cookies.split('; '),
        arrM = [],
        allRes = [];
    
    arr = arr.filter(function(val,i,arr) {
        item = val.split('=');
        return item[0].slice(0,1) == 'p';
    });
    if(!arr.length) {
        $('#J_Cart>.displayN').removeClass('displayN').siblings().addClass('displayN');
        return;
    }
    arrM = arr.map(val=>val[1]);
    $.ajax({
        type : 'get',
        data : {
            id : arrM.join(',')
        },
        url : '../php/getDoodsInfo.php',
        dataType : 'json',
        success : function(res) {
            if(res.error) {
                console.log('失败');
            } else {
                $('header .mc-count').html(res.length);
                changeArr(res);
                var strAllItem = "";
                for(var i = 0; i < allRes.length; i++) {
                    var strItems = "";
                    for(var j = 0; j < allRes[i].length; j++) {
                        strItems += `
                        <div class="item-body">
                            <ul class="item-content clear">
                                <li class="td td-chk clear">
                                    <div class="selectOne check_box">
                                        <span></span>
                                    </div>
                                </li>
                                <li class="td td-item clear">
                                    <a href="#" class="item-pic">
                                        <img src="../img/${JSON.parse(allRes[i][j].pic).p1}" alt="">
                                        <div class="subnav">
                                            <span class="arrow"></span>
                                            <img src="../img/${JSON.parse(allRes[i][j].pic).p1}" alt="">
                                        </div>
                                    </a>
                                    <div class="item-info">
                                        <div class="item-basic-info">
                                            <a href="#" class="item-title">${allRes[i][j].title}</a>
                                        </div>
                                        <div class="item-other-info">
                                            <div class="promo-logos">
                                                <p class="promo-logo">
                                                    <img src="../img/promo-logos1.png" alt="">
                                                </p>
                                            </div>
                                            <div class="item-icon-list">
                                                <span class="item-icon"><img src="../img/item-icons1.png" alt=""></span>
                                                <a href="#" class="item-icon"><img src="../img/item-icons2.png" alt=""></a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="td td-info">
                                    ${JSON.parse(allRes[i][j].info).sku}
                                    <span class="sku-edit">修改</span>
                                </li>
                                <li class="td td-price">
                                    <div class="item-price">
                                        <div class="price-original">￥${allRes[i][j].old_price}</div>
                                        <div class="price-now">￥${allRes[i][j].new_price}</div>
                                    </div>
                                </li>
                                <li class="td td-amount">
                                    <div class="item-amount">
                                        <a class="J_Minus${getCookie('p'+allRes[i][j].id) == 1 ? " disabled" : ""}">-</a>
                                        <input type="text" value="${getCookie('p'+allRes[i][j].id)}" class="text-amount" autocomplete="off">
                                        <a class="J_Plus">+</a>
                                    </div>
                                    <div class="amount-msg displayN">
                                        最多只能购买<em class="stock">${JSON.parse(allRes[i][j].info).stock}</em>件
                                    </div>
                                </li>
                                <li class="td td-sum">
                                    <em class="J_ItemSum">￥${(getCookie('p'+allRes[i][j].id) * Number.parseFloat(allRes[i][j].new_price)).toFixed(2)}</em>
                                </li>
                                <li class="td td-op">
                                    <a href="#" class="J_Fav">移入收藏夹</a>
                                    <a href="#" class="J_Del">删除</a>
                                    <a href="#" class="J_Like">相似宝贝</a>
                                </li>
                            </ul>
                        </div>
                        `;
                    }
                    strAllItem += `
                    <li class="item">
                        <div class="J_ItemHead">
                            <div class="shop-info">
                                <div class="selectAllShop check_box">
                                    <span></span>
                                </div>
                                &nbsp;&nbsp;
                                <span class="icon-B"></span>
                                店铺：
                                <a href="#" title="${JSON.parse(allRes[i][0].info).shop}" class="J_MakePoint">${JSON.parse(allRes[i][0].info).shop}</a>
                                <span class="ww-small">
                                    <a href="#">旺旺在线</a>
                                </span>
                            </div>
                        </div>
                        <div class="order-info">
                            ${strItems}
                        </div>
                    </li>
                    `;
                }
                $('.J_OrderList').html(strAllItem);

                
                //勾选1件商品,一家商店所有商品,所有商品
                $('.selectOne').on('click',function() {
                    $(this).children('span').toggleClass('hasSelected');
                    if($(this).parents('.order-info').find('.selectOne>span[class*="hasSelected"]').length === $(this).parents('.order-info').find('.selectOne').length) {
                        $(this).parents('.item').find('.selectAllShop>span').addClass('hasSelected');
                    } else {
                        $(this).parents('.item').find('.selectAllShop>span').removeClass('hasSelected');
                    }
                    if($('.J_OrderList').find('.selectOne>span[class*="hasSelected"]').length === $('.J_OrderList').find('.selectOne').length) {
                        $('.J_SelectAll>span').addClass('hasSelected');
                    } else {
                        $('.J_SelectAll>span').removeClass('hasSelected');
                    }
                });
                $('.selectAllShop').on('click',function() {
                    $(this).children('span').toggleClass('hasSelected');
                    $(this).children('span').hasClass('hasSelected') ? $(this).parents('.J_ItemHead').siblings().find('.selectOne>span').addClass('hasSelected') : $(this).parents('.J_ItemHead').siblings().find('.selectOne>span').removeClass('hasSelected');
                    if($('.J_OrderList').find('.selectOne>span[class*="hasSelected"]').length === $('.J_OrderList').find('.selectOne').length) {
                        $('.J_SelectAll>span').addClass('hasSelected');
                    } else {
                        $('.J_SelectAll>span').removeClass('hasSelected');
                    }
                });
                $('.J_SelectAll').on('click',function() {
                    $(this).children('span').toggleClass('hasSelected');
                    $(this).children('span').hasClass('hasSelected') ? $('#J_Cart').find('.check_box>span').addClass('hasSelected') : $('#J_Cart').find('.check_box>span').removeClass('hasSelected');
                });

                var jisuan = function() {
                    $('#J_SelectedItemsCount').html($('.selectOne>span[class="hasSelected"]').length);
                    if($('.selectOne>span[class*="hasSelected"]').length > 0) {
                        $('.btn-area').removeClass('disabled');
                    } else {
                        $('.btn-area').addClass('disabled');
                    }
                    var allMoney = 0;
                    $('.selectOne>span[class*="hasSelected"]').each(function(i,elm) {
                        allMoney += Number.parseFloat($(elm).parents('.item-content').find('.J_ItemSum').html().slice(1));
                    });
                    $('.price').html(allMoney.toFixed(2));
                }
                $('.check_box').on('click',jisuan);

                //加减商品数量
                $('.J_Plus').on('click',function() {
                    var inp = $(this).siblings('.text-amount');
                    var node =  $(this).parents('.item-content');
                    if(Number.parseInt(inp.val()) + 1 > inp.parents('.td-amount').find('.stock').html()) return;
                    inp.val(Number.parseInt(inp.val())+1);
                    $(this).siblings('a').removeClass('disabled');
                    node.find('.J_ItemSum').html('￥' + (inp.val() * Number.parseFloat(node.find('.price-now').html().slice(1))).toFixed(2));
                    if(Number.parseInt(inp.val()) >= Number.parseInt(inp.parents('.td-amount').find('.stock').html())) {
                        $(this).addClass('disabled');
                        inp.parents('.td-amount').find('.amount-msg').removeClass('displayN');
                    }
                    jisuan();
                });
                $('.text-amount').on('blur',function() {
                    var max = Number.parseInt($(this).parents('.td-amount').find('.stock').html());
                    console.log(max);
                    if(Number.parseInt($(this).val()) > max) {
                        $(this).siblings('.J_Plus').addClass('disabled');
                        $(this).siblings('.J_Minus').removeClass('disabled');
                        $(this).parents('.td-amount').find('.amount-msg').removeClass('displayN');
                        $(this).val(max);
                        console.log(max);
                    } else if(Number.parseInt($(this).val()) < 1){
                        $(this).siblings('.J_Minus').addClass('disabled');
                        $(this).siblings('.J_Plus').removeClass('disabled');
                        $(this).val(1);
                    }
                });
                $('.J_Minus').on('click',function() {
                    var inp = $(this).siblings('.text-amount');
                    var node =  $(this).parents('.item-content');
                    if(inp.val() - 1 < 1) return;
                    inp.val(inp.val()-1);
                    $(this).siblings('a').removeClass('disabled');  
                    node.find('.J_ItemSum').html('￥' + (inp.val() * Number.parseFloat(node.find('.price-now').html().slice(1))).toFixed(2));
                    if(inp.val() == 1) $(this).addClass('disabled');
                    jisuan();
                });
            }
        }
    });
    
    //将同一家店的所有商品放进一个数组中,再将所有店铺放进allRes数组中
    function changeArr(arr){
        if(arr.length == 0) return;
        var shop = JSON.parse(arr[0].info).shop;
        allRes.push(arr.filter(function(val) {
            return JSON.parse(val.info).shop == shop;
        }));
        arr = arr.filter(function(val) {
            return !(JSON.parse(val.info).shop == shop);
        });
        changeArr(arr);
    }

    //吸底栏
    var J_FloatBarHolder_offsetTop = $('#J_FloatBarHolder').offset().top;
    $('#J_FloatBarHolder').addClass('fixedBottom');
    $(window).on('scroll',function() {
        if(innerHeight+scrollY-$('#J_FloatBarHolder').height() < J_FloatBarHolder_offsetTop){
            $('#J_FloatBarHolder').addClass('fixedBottom');
        } else {
            $('#J_FloatBarHolder').removeClass('fixedBottom');
        }
    });
});