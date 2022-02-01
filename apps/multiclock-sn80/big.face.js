(() => {

    function getFace(){

    const W = g.getWidth();
    const H = g.getHeight();
    const F = 132*H/300; // reasonable approximation

    function drawTime() {
        d = new Date()
        g.reset();
        var da = d.toString().split(" ");
        var time = da[4].substr(0, 5).split(":");
        var hours = time[0],
          minutes = time[1];
        g.clearRect(0,44,W-1,H-1);
        g.setColor(g.theme.fg);
        g.setFont("Vector",F);
        g.setFontAlign(0,1);
        g.drawString(hours,W/2,32+H/2,true);
        g.setFontAlign(0,-1);
        g.setColor(g.theme.fg2);
        g.drawString(minutes,W/2,20+H/2,true);
      }


    return {init:drawTime, tick:drawTime, tickpersecond:false};
    }

  return getFace;

})();