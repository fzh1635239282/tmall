function BannerPlay(obj,delay) {
    this.obj = obj;
    this.length = obj.children('.hover-rect').children().length;
    this.count = 0;
    this.delay = delay;
    this.i = -1;
}
BannerPlay.prototype = {
    startI : function() {
        this.i = setInterval(()=>{
            this.count++;
            if(this.count > this.length - 1) this.count = 0;
            this.obj.children('.img-link').children().eq(this.count).addClass('show').siblings().removeClass('show');
            this.obj.children('.hover-rect').children().eq(this.count).addClass('current').siblings().removeClass('current');
        },this.delay);
    },
    stopI : function() {
        clearInterval(this.i);
        this.i = -1;
    },
    changeShow : function(index) {
        this.count = index;
        this.obj.children('.img-link').children().eq(this.count).addClass('show').siblings().removeClass('show');
        this.obj.children('.hover-rect').children().eq(this.count).addClass('current').siblings().removeClass('current');
    }
}