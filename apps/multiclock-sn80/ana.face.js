(() => {

    function getFace(){

    const p = Math.PI/2;
    const PRad = Math.PI/180;

    var cx = g.getWidth()/2;
    var cy = g.getHeight()/2;
    var scale = 1.15;

    function seconds(angle, r) {
        const a = angle*PRad;
        const x = cx+Math.sin(a)*r;
        const y = cy-Math.cos(a)*r;
        if (angle % 90 == 0) {
            g.setColor(g.theme.fg2);
            g.fillRect(x-6,y-6,x+6,y+6);
        } else if (angle % 30 == 0){
            g.setColor(g.theme.fg);
            g.fillRect(x-4,y-4,x+4,y+4);
        } else {
            g.setColor(g.theme.fg);
            g.fillRect(x-1,y-1,x+1,y+1);
        }
    }

    function hand(angle, r1, r2, r3) {
        r1 = scale*r1; r2=scale*r2; r3 = scale*r3;
        var theta=(angle+270)*PRad;
        g.fillPoly(g.transformVertices([r1,0,0,-r3,r2,0,0,r3], 
          {x:cx,y:cy,rotate:theta}));
      }
      
    var minuteDate;
    var secondDate;

    function onSecond(notfirst) {
        g.setColor(g.theme.bg);
        hand(360*secondDate.getSeconds()/60, -5, 90, 3);
        if (secondDate.getSeconds() === 0 || notfirst) {
            hand(360*(minuteDate.getHours() + (minuteDate.getMinutes()/60))/12, -16, 60, 7);
            hand(360*minuteDate.getMinutes()/60, -16, 86, 7);
            minuteDate = new Date();
        }
        g.setColor(g.theme.fg);
        hand(360*(minuteDate.getHours() + (minuteDate.getMinutes()/60))/12, -16, 60, 7);
        hand(360*minuteDate.getMinutes()/60, -16, 86, 7);
        g.setColor(g.theme.fg2);
        secondDate = new Date();
        hand(360*secondDate.getSeconds()/60, -5, 90, 3);
        g.setColor(g.theme.bg);
        g.fillCircle(cx,cy,2);
    }

    function drawAll(notfirst) {
        if (!notfirst) secondDate = minuteDate = new Date();
        // draw seconds
        g.setColor(1,1,1);
        //draw bezel
        if (!notfirst) {
        for (let i=0;i<60;i++)
            seconds(360*i/60, 100*scale);
        }
        var hrs = minuteDate.getHours();
        hrs = hrs>12?hrs-12:hrs;
        Bangle.drawWidgets(hrs>=3 && hrs<9?50:166);
        onSecond(notfirst);
        return true;
    }

    return {init:drawAll, tick:onSecond, tickpersec:true};
 }

return getFace;

})();
