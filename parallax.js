/**
 *  @author : Adam Portilla
 *  @author-website :  http://adamportilla.com
 */
var parallax = function(PX) {

    PX = PX || {};
    
    PX.getAmount = function(xPos,yPos){
        return {
            x : Math.floor((xPos / document.body.offsetWidth) * 1000) / 1000,
            y : Math.floor((yPos / document.body.offsetHeight) * 1000) / 1000
        };
    };
    
    PX.pane = function(p,my){
        
        var that = {};
        my = my || {};
        p = p || {};
            
        my.el = p.el || document.createElement('div');
        my.low = ('number' == typeof p.low)?p.low:-50;
        my.high = ('number' == typeof p.high)?p.high:50;
        my.spread = my.high - my.low;
        
        that.position = function(amountX,amountY){
            my.el.style.left = Math.round(my.low + (amountX * my.spread)) + 'px';
            my.el.style.top = Math.round(.4 * (my.low + (amountY * my.spread))) + 'px';
        };
        
        return that;
    };
    
    PX.create = function(p,my){
        
        var that = {};
        my = my || {};
        p = p || {};
       
        my.elements = p.elements || [];
        my.panes = [];
        my.paneCount = 0;
        
        my.min = ('number' == typeof p.min)?p.min:0;
        my.max = ('number' == typeof p.max)?p.max:100;
        my.offset = ('number' == typeof p.offset)?p.offset:0;
        my.range = my.max - my.min;
        
        my.parallax = function(amount){
            var pX = amount.x + my.offset;
            var pY = amount.y + my.offset;
			for (var i = 0; i < my.paneCount; i++){
                my.panes[i].position(pX,pY);
			}
        };
       
        my.mousemove = function(e){
            my.parallax(PX.getAmount(e.clientX, e.clientY));
        };
       
        my.initListeners = function(){
            document.addEventListener('mousemove', my.mousemove, false); 
        };
        
        my.initElements = function(){
        
            var total = my.elements.length;
            var increment = my.range / (total - 1);
            
			for (var i = 0; i < total; i++){
			
                var depth = my.min + (increment * i);
                
                if (my.elements[i]){                    
                    my.panes.push(PX.pane({
                        el : document.getElementById(my.elements[i]),
                        low : depth,
                        high : depth * -1
                    }));
                    my.paneCount++;
                }

			}
        };
        
        my.initElements();
        my.initListeners();
        my.parallax(.5);
        
        return that;
    };

    return {
        create : function(p){
            return PX.create(p);
        }
    };
}();
