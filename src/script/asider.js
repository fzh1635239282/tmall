$(window).on('scroll',function() {
    if(scrollY > 200) {
        $('#asider .go-top').css('display','block');
    } else {
        $('#asider .go-top').css('display','none');
    }
});
$('#asider').on('mouseenter','li',function(ev) {
    if($(ev.target).parent('li').hasClass('qr-code')) return;
    if(ev.target.className == 'q-outnav') return;
    $(ev.target).siblings('.subnav').css('display','block').animate({
        'right' : '35px',
        'opacity' : 1
    },300);
});
$('#asider').on('mouseleave','li',function(ev) {
    if($(ev.target).parent('li').hasClass('qr-code')) return;
    $(ev.target).parent('li').children('.subnav').animate({
        'right' : '60px',
        'opacity' : 0
    },300);
    setTimeout(()=>{
        $(ev.target).parent('li').children('.subnav').css('display','none');
    },300);
});
$('#asider').on('click',function(ev) {
    switch($(ev.target).parent('li').attr('class')) {
        case 'go-top' : $('body,html').animate({
            scrollTop : 0
        },500);break;
        case 'cart' : location.href = 'cart.html';break;
    }
});
