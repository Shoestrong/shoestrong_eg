function parabola(selector, start, end,callback) {
    // console.log(selector);
    // Ĭ�϶���
    var vertex=20;
    // �ٶ�
    var speed = 1.1;
    // �˶��켣��ߵ�topֵ
    var vtop = Math.min(start.top, end.top) - Math.abs(start.left - end.left) / 3;
    // ���ܳ����������յ�����˶����߶�������
    if (vtop < vertex)vtop = Math.min(vertex, Math.min(start.top, end.top));

    var distance = Math.sqrt(Math.pow(start.top - end.top, 2) + Math.pow(start.left - end.left, 2)),
        // Ԫ���ƶ�����
        steps = Math.ceil(Math.min(Math.max(Math.log(distance) / 0.05 - 75, 30), 100) / speed),
        ratio = start.top == vtop ? 0 : -Math.sqrt((end.top - vtop) / (start.top - vtop)),
        vleft = (ratio * start.left - end.left) / (ratio - 1),
        // ������������ֶ���left==�յ�left������������Ϊ0����ֱ���˶���
        curvature = end.left == vleft ? 0 : (end.top - vtop) / Math.pow(end.left - vleft, 2);

    // ����֡ʵ��
    var count = 0;
    var animate = function() {
        // ����left topֵ
        var left = start.left + (end.left - start.left) * count / steps,
            top = curvature == 0 ? start.top + (end.top - start.top) * count / steps : curvature * Math.pow(left - vleft, 2) + vtop;

        var css={};//���������������

        // �˶��������иı��С
        if (end.width != null && end.height != null) {
            var i = steps / 2,
                width = end.width - (end.width - start.width) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2),
                height = end.height - (end.height - start.height) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2);
            css.width=width + "px";
            css.height=height + "px";
            css.fontSize=Math.min(width, height) + "px";
            
        }
        css.left=left + "px";
        css.top=top + "px";

        $(selector).css(css);

        count++;
        // ��ʱ����
        var time = window.requestAnimationFrame($.proxy(animate, this));
        if (count == steps) {
            window.cancelAnimationFrame(time);
            if(callback!=undefined)callback();
        }
    };
    // ��ʼ
    $(selector).css({
        left:start.left+"px",
        top:start.top+"px"
    });
    animate();
}