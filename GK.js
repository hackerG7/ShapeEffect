//colour
let colour = ["red","green","yellow","gray","white","pink","purple"]
let object_array = [];
class Point{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
}
class Rectangle{
	constructor(x1,y1,x2,y2){
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}
}
class Objects{
	constructor(){
			object_array.push(this)
			this.colour = 0
			this.parent = 0
			this.direction = 0;
			this.speed = 0;
			this.x = arguments[0];//X
			this.y = arguments[1];//Y
			if (arguments.length>4){
				this.w = arguments[2];//width
				this.h = arguments[3];//height
				this.parent = arguments[4]
				this.type = "rectangle"
				this.size = this.w*this.h

			}else{
				this.r = arguments[2]//radius
				this.parent = arguments[3]
				this.type = "ellipse"
				this.size = PI*pow(this.r,2)
			}
	}
	update(){
		this.x = this.parent.x;
		this.y = this.parent.y;
		this.direction = this.parent.direction;
		this.speed = this.parent.speed
		fill(colour[this.colour])
		switch (this.type){
			case "rectangle":
			rect(this.x,this.y,this.w,this.h)
			break;

			case "ellipse":
				ellipse(this.x,this.y,this.r*2)
			break;
		}
	}
	collision(x,y){
		switch (this.type){
			case "rectangle":
				return(point_in_rectangle(x,y,this.x,this.y,this.w,this.h))
			break;

			case "ellipse":
				return(point_in_circle(x,y,this.x,this.y,this.r))
			break;
		}
		
	}
}
/*function radians(x){
	/*if(x > 360){
		x -= floor(x/360)*360
	}
	if(x < 0){
		x -= floor(x/360)*360
	}
return 0//x*PI/939
}*/
function clamp(val,lower_limit,upper_limit){
	return val>upper_limit ? upper_limit : (val<lower_limit ? lower_limit : val)
}
function clamp_loop(val,lower_limit,upper_limit){
	return val>upper_limit ? lower_limit : (val<lower_limit ? upper_limit : val)
}
function ascii(a) { return a.charCodeAt(0); }
function lengthdir_x(dir,l){
	let r = dir*Math.PI/180
	return (Math.cos(r)*l);
};
function lengthdir_y(dir,l){
	let r = dir*Math.PI/180
	return (Math.sin(r)*l);
};
function point_distance(x1,y1,x2,y2){
	return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}
function point_direction(x1,y1,x2,y2){
	let w = x2-x1;
	let h = y2-y1;
	let fr=Math.PI/180;
	return Math.atan2(h,w)/fr
}
function point_in_rectangle(x,y,rX,rY,rW,rH){
	return(x>=rX&&x<=rX+rW&&y>=rY&&y<=rY+rH)
}
function point_in_circle(x,y,cX,cY,r){
	let xx = x-cX;
	let yy = y-cY;
	return (pow(xx,2)+pow(yy,2)<=pow(r,2))
}
function rectangle_collision(r1x,r1y,r1w,r1h,r2x,r2y,r2w,r2h){
	return (abs(r1x) < abs(r2x) + abs(r2w) &&
		abs(r1x) + abs(r1w) > abs(r2x) &&
		abs(r1y) < abs(r2y) + abs(r2h) &&
		abs(r1h) + abs(r1y) > abs(r2y)
	)
	 
}
function sigFigs(n, sig) {
	var mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
	return Math.round(n * mult) / mult;
}
function object_update(obj){
	obj.update()
}
function irandom(variable){
	if (arguments.length == 1){
		return round(random(variable))
	}else{
		return round(random(variable,arguments[1]))
	}
	
}
function approach(x1,x2){
	return x1 + (x2-x1)/10
}