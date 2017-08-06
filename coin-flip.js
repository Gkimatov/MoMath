import P5Behavior from 'p5beh';

var FPS = 20;
var n = 6; //nxn board
const pb = new P5Behavior();
var board = [];
var width = 576;
var buffer = 40;


function Tile(_x,_y, _color) {
	var x = _x,
	var y = _y,
	var color = _color
	var activate = false,
	
	this.isInArea = function(user){
		if(user.x >= x*(width/n) && user.x <= x*(width/n) + (width/n) &&
		   user.y >= y*(width/n) && user.y <= y*(width/n) + (width/n) - buffer
			){
			activate = true;
			console.log(activate);
			return true;
		}
	}

	this.flipColor = function(){
		if (color == "#FFFFF4"){
			color = "green";
		}
		else if (color == "green"){
			color = "#FFFFF4"
		}
	}
		
	this.getColor = function(){
		return color;
	}
	
	this.setColor = function(newColor){
		color = newColor;
	}
	
	this.getActivation = function(){
		return activate;
	}
	
	this.setActOn = function(){
		activate = true;
		console.log(activate);
	}
	
	this.setActOff = function(){
		activate = false;
	}
};


pb.setup = function(){	
	// make nested array
	for (var x = 0; x < n; x++) {
    	board[x] = [];
    }
 
    // init board
    for (var i = 0; i < n; i++){
		for (var j = 0; j < n; j++){
			// randomize color
			var color = ["#FFFFF4", "green"]
			var ran = this.random(1);
    		var useCol = color[1];
    		if (ran > .5){
    			useCol = color[1];
    		}
    		else {
    			useCol = color[0];
    		}
    	
			board[i][j] = new Tile(i,j,useCol);
		}
	}
};

pb.draw = function(floor, p){
	
	// draw background
	this.background(0);
	this.stroke(0);
	this.strokeWeight(3);
	
	
	// draw init board
	for (var i = 0; i < n; i++){
		for (var j = 0; j < n; j++){
			this.fill(board[i][j].getColor());
			this.rect((this.width/n)*i, (this.height/n)*j, this.width/n, this.height/n-buffer);
			
		}
	}
			
	
	// draw user
	for (let u of floor.users) {
		
		// determine tile user is on
		for (var i = 0; i<n; i++){
			for (var j = 0; j<n; j++){
				console.log(i+","+j);
				
				
				// check left
				if (i-1 >= 0 ){
					if (board[i-1][j].getActivation() == true && board[i][j].getActivation() == true){

						board[i][j].flipColor();
						board[i-1][j].flipColor();

						this.rect((this.width/n)*i, (this.height/n)*j, this.width/n, this.height/n-buffer);
						this.rect((this.width/n)*(i-1), (this.height/n)*j, this.width/n, this.height/n-buffer);
					}
					
				}
				
				// check right
				if (i+1 < n){
					if (board[i+1][j].getActivation() == true && board[i][j].getActivation() == true){

						board[i][j].flipColor();
						board[i+1][j].flipColor();

						this.rect((this.width/n)*i, (this.height/n)*j, this.width/n, this.height/n-buffer);
						this.rect((this.width/n)*(i+1), (this.height/n)*j, this.width/n, this.height/n-buffer);
					}
					
				}
				
				if (board[i][j].isInArea(u)){
					//board[i][j].setActOn();
					console.log("Activation: " + board[i][j].getActivation());
					/*
					if (board[i][j].getActivation()){
						this.fill('red');
						this.rect((this.width/n)*i, (this.height/n)*j, this.width/n, this.height/n-buffer);
					}
					*/
					// check left
					
					/*
					//check if right and left tiles are stepped on
					if (board[i][j-1].getActivation() === true || this.board[i][j-1].getActivation() === true){
						console.log("PAIRED");
					}
					*/
				}
				else{
					board[i][j].setActOff();
				}
				
			}
		}
		
		/*
		for (var i = 0; i < n; i++){
			for (var j = 0; j < n; j++){
				this.rect((this.width/n)*i, (this.height/n)*j, this.width/n, this.height/n-buffer);
			}
		}
		*/
		pb.drawUser(u);
		
		
	}
	
	this.fill(128, 128, 128, 128);
  	this.noStroke();
  	pb.drawSensors(floor.sensors);
};

export const behavior = {
  title: "Coin Flip",
  init: pb.init.bind(pb),
  frameRate: FPS,
  render: pb.render.bind(pb),
  numGhosts:7
};

export default behavior