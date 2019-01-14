function Zoom(obj) {
    this.obj = obj;
    this.imageShow = obj.children().children('.show')[0];
    this.maskObj = obj.children().children('.mask');
    this.imageZoom = obj.children().children('.imageZoom');
    this.imageShowB = obj.children('.img-show-b').children('.show_b');
    this.imageChange = obj.children('.img-current');
    this.scaleK = this.imageShowB.width() / this.maskObj.width();
    this.init();
}
Zoom.prototype = {
    init : function() {
        this.maskObj.on('mousemove',(ev)=>{
            var x = ev.offsetX - this.imageZoom.width() / 2 < 0 ? 0 : ev.offsetX - this.imageZoom.width() / 2;
            var y = ev.offsetY - this.imageZoom.height() / 2 < 0 ? 0 : ev.offsetY - this.imageZoom.height() / 2;
            x = x > this.maskObj.width() - this.imageZoom.width() ? this.maskObj.width() - this.imageZoom.width() : x;
            y = y > this.maskObj.height() - this.imageZoom.height() ? this.maskObj.height() - this.imageZoom.height() : y;
            this.imageZoom.css('left', x + "px");
            this.imageZoom.css('top', y + "px");
            this.imageShowB.css('left',-x * this.scaleK + "px");
            this.imageShowB.css('top',-y * this.scaleK + "px");
        });
        this.imageChange.on('mouseover','img',(ev)=>{
            $(ev.target).addClass('current').siblings().removeClass('current');
            var arr = this.imageShow.src.split('');
            arr.splice(-5,1,$(ev.target).index() + 1);
            arr = arr.join('');
            this.imageShow.src = arr;
            arr = this.imageShowB[0].src.split('');
            arr.splice(-5,1,$(ev.target).index() + 1);
            arr = arr.join('');
            this.imageShowB[0].src = arr;
        });
    }
}