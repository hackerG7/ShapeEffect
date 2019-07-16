let max_mode = 4
let mode = 0;

let canvas;
function setup(){
	canvas = createCanvas(innerWidth,innerHeight);//create canvas
}
function keyPressed(){
	//if any key is pressed, the mode will be changed.
	mode --
	if(mode < 0){
		mode = max_mode-1
	}
}

//create shape Effect function
function create_a2_polygon({x= mouseX , y= mouseY,radius_rate=6 ,
	mode=0 ,life = 30,edge=2,shape_mode=3,curve=0,image_angle=0,sW=10,direction=random(360),radius=random(5),
	rotation_rate=random(0,0.5),speed = 0,mode3_rate=2,sW_rate=0.5,delay=0,start_alpha=0.1,alpha_rate=0.1,
	alpha_die_rate=0.01,rgb=[random(100,255),random(100,255),random(100,255)],target_x = -1,target_y = -1}){
	let c;
	c = new a2_polygon({x:x,y:y,radius_rate:radius_rate,mode:mode,life:life,edge:edge,shape_mode:shape_mode,curve:curve,image_angle:image_angle,sW:sW})
	
	return c;
}
function create_random_polygon(){
	return create_a2_polygon({
		x:random(width),
		y:random(height),
		radius_rate:random(2,3),
		mode:0,
		life:random(5,10),
		edge:round(random(0,10)),
		shape_mode:2,
		curve:0,
		image_angle:random(360)
	})
}
function create_circle(x,y,mode){
	return create_a2_polygon({
		x:x,
		y:y,
		mode:mode
		})
}
function create_circle_ext(x,y,mode,radius_rate,life){
	let l = life==undefined
	if (l){
		return create_a2_polygon({
			x:x,
			y:y,
			radius_rate:radius_rate,
			mode:mode,
			life:35,
			edge:1,
			shape_mode:3,
			curve:0,
			image_angle:random(360)
		})
	}else{
		return create_a2_polygon({
			x:x,
			y:y,
			radius_rate:radius_rate,
			mode:mode,
			life:life,
			edge:1,
			shape_mode:3,
			curve:0,
			image_angle:random(360)
		})
	}
	
}
function create_triangle(x,y,mode){
	return create_a2_polygon({
		x:x,
		y:y,
		mode:mode,
		edge:3,
		life:30
	})
}
function create_triangle_ext(x,y,mode,radius_rate,image_angle){
	return create_a2_polygon({
		x:x,
		y:y,
		mode:mode,
		radius_rate:radius_rate,
		image_angle:image_angle
	})
}
function create_polygon(x,y,mode,edge){
	return create_a2_polygon({
		x:x,
		y:y,
		mode:mode,
		edge:edge
	})
}
function create_polygon_circle(x,y,number,length,speed,edge){
	var l = length;
	var a = []
	for(let i = 0 ; i < 360;i+=360/number){
		var lx = lengthdir_x(i,l)
		var ly = lengthdir_y(i,l)
		var c = create_a2_polygon({
			x:x+lx,
			y:y+ly,
			mode:0,
			edge:edge,
			radius_rate:0.2,
			direction:i,
			shape_mode:-1,
			curve:0,
			speed:speed});
		a.push(c);
		
	}
	return a;
}


//generate new shape Effect
function mousePressed(){
	let m = irandom(1)
	switch (mode){
		case 0:
			let d = random(360)
			let dd = 120
			var l = 150
			create_triangle(mouseX,mouseY,m)
			create_circle(mouseX+lengthdir_x(d,l),mouseY+lengthdir_y(d,l),m)
			create_circle(mouseX+lengthdir_x(d+dd,l),mouseY+lengthdir_y(d+dd,l),m)
			create_circle(mouseX+lengthdir_x(d+dd*2,l),mouseY+lengthdir_y(d+dd*2,l),m)
		break;

		case 1:
			create_circle(mouseX,mouseY,0)
			create_circle_ext(mouseX,mouseY,0,1)
			create_circle_ext(mouseX,mouseY,1,5)
		break;

		case 2:
			create_circle(mouseX,mouseY,0)
			var p = create_polygon_circle(mouseX,mouseY,12,100,2,7);
			for(let i of p ){
				i.rotation_rate = 1
			}
		break;

		case 3:
			var p = create_a2_polygon({x:mouseX,
				y:mouseY,
				radius_rate:5,
				mode:3,
				life:50,
				edge:3,
				shape_mode:POINTS,
				curve:0,
				image_angle:random(360),
				sW:20});
			p.mode3_rate = 5
		break;
	}
	
}
function random_polygon(){
	var mouseX = random(width);
	var mouseY = random(height);
	var md = irandom(4)
	let m = irandom(1)
	switch (md){
		case 0:
			let d = random(360)
			let dd = 120
			var l = 150
			create_triangle(mouseX,mouseY,m)
			create_circle(mouseX+lengthdir_x(d,l),mouseY+lengthdir_y(d,l),m)
			create_circle(mouseX+lengthdir_x(d+dd,l),mouseY+lengthdir_y(d+dd,l),m)
			create_circle(mouseX+lengthdir_x(d+dd*2,l),mouseY+lengthdir_y(d+dd*2,l),m)
		break;

		case 1:
			create_circle(mouseX,mouseY,0)
			create_circle_ext(mouseX,mouseY,0,1)
			create_circle_ext(mouseX,mouseY,1,5)
		break;

		case 2:
			create_circle(mouseX,mouseY,0)
			var p = create_polygon_circle(mouseX,mouseY,12,100,2,7);
			for(let i of p ){
				i.rotation_rate = 1
			}
		break;

		case 3:
			var p = create_a2_polygon({x:mouseX,
				y:mouseY,
				radius_rate:5,
				mode:3,
				life:50,
				edge:3,
				shape_mode:POINTS,
				curve:0,
				image_angle:random(360),
				sW:20});
			p.mode3_rate = 5
		break;
	}
	
}
function create_random_polygon_loop(delay){
	
	create_random_polygon()
	create_random_polygon()
	console.log(delay);
	setTimeout(create_random_polygon_loop,delay,delay);
}
setTimeout(create_random_polygon_loop,10,100);//set random polygon timer
function draw(){
	background(0)//set black background for the canvas
	canvas.size(innerWidth,innerHeight);//resize the canvas
	
	shapeEffectLoop();//call the loop function (must called after background(0);)
}
