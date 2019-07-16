let shapeEffectObjectList = [];
//setInterval(a2_loop, 30)
class a2_polygon{
    ///a2_polygon(x,y,radius_rate,mode,life,edge,shape_mode,curve)
    constructor({x= mouseX , y= mouseY,radius_rate=6 ,
        mode=0 ,life = 30,edge=2,shape_mode=3,curve=0,image_angle=0,sW=10,direction=random(360),radius=random(5),
        rotation_rate=random(0,0.5),speed = 0,mode3_rate=2,sW_rate=0.5,delay=0,start_alpha=0.1,alpha_rate=0.1,
        alpha_die_rate=0.01,rgb=[random(100,255),random(100,255),random(100,255)],target_x = -1,target_y = -1,fill = 0,show = true}){
        this.delay = delay;
        this.x = x;
        this.y = y;
        this.image_angle = image_angle;
        this.edge = edge;
        this.fill = fill;
        this.alpha = start_alpha;
        this.alpha_rate = alpha_rate;
        this.alpha_die_rate = alpha_die_rate;
        this.set_life = life;
        this.life = this.set_life;
        this.radius = radius;
        this.radius_rate = max(radius_rate,radius_rate);
        this.mode = mode;
        this.stroke = 255;
        this.sW = sW;
        this.sW_rate = sW_rate;
        this.shape_mode = shape_mode
        this.curve = curve
        this.rgb = rgb
        this.target_x = target_x;
        this.target_y = target_y;
        this.direction = direction;
        this.speed = speed;
        this.rotation_rate = rotation_rate;
        this.a = 1;
        this.mode3_rate = mode3_rate;
        this.mode3_curve = []
        this.show = show;
        shapeEffectObjectList.push(this);
        this.loop();
    }
    loop(){
        if(this.update!=undefined){
            this.update();
        }
        setTimeout(this.loop,2);
    }
    destroy(){
        shapeEffectObjectList.splice(this,1);
    }
    update(){
        if (this.delay > 0){
            this.delay --
        }else{
            this.delay = 0
            this.image_angle += this.rotation_rate;
            if(this.target_x != -1 && this.target_y != -1){
                this.x += lengthdir_x(point_direction(this.x,this.y,this.target_x,this.target_y),10/point_distance(this.x,this.y,this.target_x,this.target_y))
                this.y += lengthdir_y(point_direction(this.x,this.y,this.target_x,this.target_y),10/point_distance(this.x,this.y,this.target_x,this.target_y))
            }else{
                this.x += lengthdir_x(this.direction,this.speed);
                this.y += lengthdir_y(this.direction,this.speed)
            }
            switch (this.mode){
                case 0:
                    if(this.life > 0){
                        this.radius+=this.radius_rate
                        
                    }else{
                        this.radius+=this.radius_rate/5
                        this.sW  = max(this.sW - this.sW_rate,1)
                    }
                    
                break;
    
                case 1:
                    if(this.life > 0){
                        this.radius+=this.radius_rate
                        
                    }else{
                        this.radius-=this.radius/this.radius_rate
                        this.sW  = max(this.sW - this.sW_rate,1)
                    }
                break;
    
                case 2:
                    if(this.life > 0){
                        this.radius+=this.radius_rate
                        
                    }else{
                        this.radius-=this.radius/this.radius_rate
                        this.sW  = max(this.sW - this.sW_rate,1)
                    }
                break;

                case 3:
                    this.mode3_rate
                    this.shape_mode = POINTS;
                    if(this.life > 30){
                        this.radius+=this.radius_rate
                        
                    }else{
                        
                        this.show = false
                        if(this.a < 360/this.edge){
                            //var c = create_a2_polygon(this.x,this.y,0,0,this.life+30,this.edge,POINTS,0,this.image_angle+this.a*this.mode3_rate,this.sW)
                            var o = 360/this.edge
                            this.a += 10/(this.a)+1
                            this.life = 1
                            
                            for(let i = 0 ;i<=this.edge;i++){
                                /*var x = this.x+lengthdir_x(this.image_angle+j+i*o,this.radius)
                                var y = this.y+lengthdir_y(this.image_angle+j+i*o,this.radius)
                                this.mode3_curve.push([x,y])*/
                                stroke(this.rgb[0],this.rgb[1],this.rgb[2],this.alpha*255)
                                noFill()
                                strokeWeight(this.sW)
                                arc(this.x,this.y,this.radius*2,this.radius*2,radians(this.image_angle+i*o),radians(this.image_angle+i*o+this.a))
                            }
                            
                        }else{
                            stroke(this.rgb[0],this.rgb[1],this.rgb[2],this.alpha*255)
                            noFill()
                            strokeWeight(this.sW)
                            ellipse(this.x,this.y,this.radius*2,this.radius*2,0,0)
                        }
                        
                        
                            
                            /*c.radius = this.radius
                            c.sW_rate = 0
                            let g = 20
                            c.rgb[0] = this.rgb[0]+g
                            c.rgb[1] = this.rgb[1]+g
                            c.rgb[2] = this.rgb[2]+g
                            c.sW = this.sW*/
                            stroke(255)
                            noFill()
                            strokeWeight(this.sW)
                            /*curveTightness(-3)
                            beginShape()
                            for(let i = 0 ; i< this.mode3_curve.length; i++){
                                curveVertex(this.mode3_curve[i][0],this.mode3_curve[i][1])
                            }
                            endShape()
                            this.mode3_curve = []*/
                        //this.sW  = max(this.sW - this.sW_rate,1)
                    }
                break;
    
            }
            if (this.alpha < 1 && this.life > 0){
                this.alpha = min(this.alpha_rate+this.alpha,1)
                
            }
            if (this.life <= 0){
                this.alpha = max( this.alpha - this.alpha_die_rate,0)
                if(this.alpha <= 0){
                    this.destroy();
                }
            }else{
                this.life --
            }
            stroke(this.rgb[0],this.rgb[1],this.rgb[2],this.alpha*255*this.show)
            strokeWeight(this.sW)
            strokeCap(ROUND)
            fill(this.rgb[0],this.rgb[1],this.rgb[2],this.alpha*255*this.fill*this.show)
            function cc(c,x,y){
                if (c){
                    return (curveVertex(x,y))
                }else{
                    return (vertex(x,y))
                }
            }
            switch (this.edge){
                case 0:
                case 1:
                case 2:
                    ellipse(this.x,this.y,this.radius)
                break;
                
                default:
                if (this.shape_mode != -1){
                    beginShape(this.shape_mode)
                }else{
                    beginShape()
                }
                
                for(let i = 0 ; i <= this.edge;i++){
                    cc(this.curve,this.x+lengthdir_x(this.image_angle+(i*360/this.edge),this.radius),this.y+lengthdir_y(this.image_angle+(i*360/this.edge),this.radius))
                }
                /*cc(this.curve,this.x+lengthdir_x(this.image_angle,this.radius),this.y+lengthdir_y(this.image_angle,this.radius))
                cc(this.curve,this.x+lengthdir_x(this.image_angle+120,this.radius),this.y+lengthdir_y(this.image_angle+120,this.radius))
                cc(this.curve,this.x+lengthdir_x(this.image_angle+240,this.radius),this.y+lengthdir_y(this.image_angle+240,this.radius))
                */
                endShape(CLOSE)
                break;
    
            }
        }
        
        
    }
    
}
function shapeEffectLoop() {
	for(let i = 0 ; i < shapeEffectObjectList.length;i++){
		shapeEffectObjectList[i].update()
	}
}