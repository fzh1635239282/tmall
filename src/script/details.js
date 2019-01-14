$(function() {
    $('.h-topMenu').load('../public/hTopMenu.html',()=>changeCartCount());
    $('#asider').load('../public/asider.html',()=>changeCartCount());
    $('.h-mid').load('../public/hMid.html');
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
    $.ajax({
        type : 'post',
        data : {
            'id' : location.search.slice(1).split('=')[1] || 1
        },
        url : '../php/getDoodsInfo.php',
        dataType : 'json',
        success : function(res) {
            res = res[0];
            var pic = JSON.parse(res.pic),
                info = JSON.parse(res.info);
            $('.j_detail').html(`
            <div class="left-details">
                    <div class="img-show-box">
                        <div class="img-show">
                            <strong class="mask"></strong>
                            <img src="../img/${pic.p1}" alt="" class="show">
                            <b class="imageZoom"></b>
                            <i class="fa fa-search"></i>
                        </div>
                        <div class="img-show-b">
                            <img src="../img/${pic.p1}" alt="" class="show_b">
                        </div>
                        <div class="img-current clear">
                            <img src="../img/${pic.p1}" alt="" class="current">
                            <img src="../img/${pic.p2}" alt="">
                            <img src="../img/${pic.p3}" alt="">
                            <img src="../img/${pic.p4}" alt="">
                            <img src="../img/${pic.p5}" alt="">
                        </div>
                    </div>
                    <div class="tm-action clear">
                        <a href="#" class="J_EditItem">举报</a>
                        <a href="#" class="J_IShare">
                            <i class="fa fa-share-alt"></i>
                            分享
                        </a>
                        <a href="#" class="J_AddFavorite">
                            <i class="fa fa-star"></i>
                            收藏商品
                        </a>
                        <span id="J_CollectCount">${info.collectCount}</span>
                    </div>
                </div>
                <div class="right-details">
                    <div class="tb-detail-hd">
                        <h3 class="title">${res.title}</h3>
                        <p class="newp"></p>
                    </div>
                    <div class="tm-fcs-panel">
                        <div class="tm-price-panel">
                            <div class="tb-metatit">价格</div>
                            <em class="tm-yen">¥</em>
                            <span class="tm-price">${res.new_price}</span>
                        </div>
                    </div>
                    <div class="tm-meta">
                        <div class="tm-delivery-panel">
                            <span class="tb-metatit">运费</span>
                            <span class="tb-deliveryAdd" id="J_deliveryAdd">${info.deliveryAdd}</span>
                            至
                            <span class="mui_addr_tri">杭州</span>
                            <span class="to_price">快递: 0.00 </span>
                        </div>
                    </div>
                    <div class="tm-ind-panel">
                        <div class="tm-indcon">
                            <span class="tm-label">月销量</span>
                            <span class="tm-count">${info.sellCount}</span>
                        </div>
                        <div class="tm-indcon">
                            <span class="tm-label">累计评价</span>
                            <span class="tm-count">${info.reviewCount}</span>
                        </div>
                        <div class="tm-indcon">
                            <a href="//vip.tmall.com/vip/index.htm" target="_blank">
                                <span class="tm-label">送天猫积分</span><span class="tm-count">${info.pointValue}</span>
                            </a>
                        </div>
                    </div>
                    <div class="tb-key">
                        <div class="tb-skin">
                            <dl class="tb-prop tb-size">
                                <dt class="tb-metatit">尺码</dt>
                                <dd>
                                    <ul class="J_TSaleProp">
                                        <li class="active">
                                            <span>40</span>
                                            <i class="check-true">已选中</i>
                                        </li>
                                        <li class="active">
                                            <span>41</span>
                                            <i class="check-true">已选中</i>
                                        </li>
                                        <li class="active">
                                            <span>42</span>
                                            <i class="check-true">已选中</i>
                                        </li>
                                        <li class="active">
                                            <span>43</span>
                                            <i class="check-true">已选中</i>
                                        </li>
                                        <li class="active">
                                            <span>44</span>
                                            <i class="check-true">已选中</i>
                                        </li>
                                        <li class="active">
                                            <span>36</span>
                                            <i class="check-true">已选中</i>
                                        </li>
                                        <li class="active">
                                            <span>38</span>
                                            <i class="check-true">已选中</i>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl class="tb-prop tb-color">
                                <dt class="tb-metatit">颜色分类</dt>
                                <dd>
                                    <ul class="J_TSaleProp">
                                        <li class="active">
                                            <span>男款灰色</span>
                                            <i class="check-true">已选中</i>
                                        </li>
                                        <li class="active">
                                            <span>男款棕色</span>
                                            <i class="check-true">已选中</i>
                                        </li>
                                        <li class="active">
                                            <span>女款浅蓝色</span>
                                            <i class="check-true">已选中</i>
                                        </li>
                                        <li class="active">
                                            <span>女款深蓝色</span>
                                            <i class="check-true">已选中</i>
                                        </li>
                                        <li class="active">
                                            <span>女款紫色</span>
                                            <i class="check-true">已选中</i>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <dl class="tb-amount">
                                <dt class="tb-metatit">数量</dt>
                                <dd>
                                    <input type="text" id="amount-input" class="mui-amount-input" value="1" maxlength="8" title="请输入购买量">
                                    <span class="mui-amount-btn">
                                        <span class="fa fa-angle-up"></span>
                                        <span class="fa fa-angle-down"></span>
                                    </span>
                                    <span class="mui-amount-unit">件</span>
                                    <em id="J_EmStock" class="tb-hidden">库存<span>${info.stock}</span>件</em>
                                </dd>
                            </dl>
                            <div class="tb-action clear">
                                <a id="J_LinkBuy" href="#" title="点击此按钮，到下一步确认购买信息。">立即购买</a>
                                <a id="J_LinkBasket">
                                    <i class="fa fa-cart-plus"></i>加入购物车
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="tm-ser">
                        <dl class="clear">
                            <dt class="tb-metatit">服务承诺</dt>
                            <dd class="tm-laysku-dd">
                                <ul class="tb-serPromise clear">
                                    <li><a href="#" title="该商品由中国人保承保正品保证险">正品保证</a></li>
                                    <li><a href="#" title="极速退款是为诚信会员提供的退款退货流程的专享特权，额度是根据每个用户当前的信誉评级情况而定">极速退款</a></li>
                                    <li><a href="#" title="卖家为您购买的商品投保退货运费险（保单生效以下单显示为准）">赠运费险</a></li>
                                    <li><a href="#" title="七天无理由退换">七天无理由退换</a></li>
                                </ul>
                            </dd>
                        </dl>
                        <div class="tm-pay-box">
                            <em class="pay-title">支付方式</em>
                            <i title="显示所有信息" class="fa fa-chevron-down" id="J_Toggler"></i>
                            <div class="J_Paylist">
                                <a title="支持使用信用卡支付" href="#">
                                    <img src="../img/details_icon_pay1.png" alt="">信用卡
                                </a>
                                <a title="支持用绑定了支付宝的银行卡付款" href="#">
                                    <img src="../img/details_icon_pay2.png" alt="">快捷支付
                                </a>  
                                <a title="免费利用花呗额度支付，下月10号还款" href="#">
                                    <img src="../img/details_icon_pay3.png" alt="">蚂蚁花呗
                                </a>
                                <a title="支持使用余额宝付款，边赚边花" href="#">
                                    <img src="../img/details_icon_pay4.png" alt="">余额宝
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            var zoom = new Zoom($('.img-show-box'));
            $('.fa-angle-up').on('click',function() {
                if($('#amount-input').val() >= info.stock) return;
                $('#amount-input').val(Number.parseInt($('#amount-input').val())+1);
            });
            $('.fa-angle-down').on('click',function() {
                if($('#amount-input').val() <= 1) return;
                $('#amount-input').val(Number.parseInt($('#amount-input').val())-1);
            });
            $('#amount-input').on('blur',function() {
                if(Number.parseInt($(this).val()) > info.stock) {
                    $(this).val(info.stock);
                } else if(Number.parseInt($(this).val()) < 1) {
                    $(this).val(1);
                }
            });
            $('#J_LinkBasket').on('click',function() {
                var val = getCookie('p'+res.id);
                if(val) {
                    var num = Number.parseInt(val);
                    setCookie('p'+res.id, num + Number.parseInt($('#amount-input').val()));
                } else {
                    setCookie('p'+res.id, Number.parseInt($('#amount-input').val()));
                }
                changeCartCount();
                alert('已加入购物车');
            });
        }
    });
});