(function(){
	
	var root = this;
	var Game = root.Game = {};
	Game.COLORS = ['red', 'blue', 'green', 'yellow'];
	
	Game.THROWDICE = function(){
		return parseInt(Math.random() * 6) + 1;
	};
	
	Game.Room = function(sName){
		this.name = sName;
		this.players = [];
	};
	
	Game.Room.prototype = {
		init: function(){
		},
		registerPlayer: function(sName){
			var colors = Game.COLORS;
			for(var i=0; i<this.players.length; i++){
				var idx = colors.indexOf(this.players.color);
				if(idx != 1){
					colors.splice(idx, 1);
				}
			}
			var sColor = colors[parseInt(colors.length * Math.random())];
			this.players.push(new Game.Player(sName, sColor));
		}
	};
	
	Game.Player = function(sName, sColor){
		this.name = sName;
		this.color = sColor;
		this.peons = [];
		for (var i=0; i<3; i++){
			this.peons.push(new Game.Peon(sColor));
		}
	};
	
	Game.Player.prototype = {
		turn: function(){
			var eyes = Game.THROWDICE();
			for(var i=0; i<this.peons.length; i++){
				this.peons.setAllowedPosition(eyes);
			}
		},
	};
	
	Game.Peon = function(sColor){
		this.color = sColor;
		this.position = -1;
		this.allowedPosition = -1;
	};
	
	Game.Peon.prototype = {
		setAllowedPosition: function(iEyes) {
			if(this.position < 0) {
				this.allowedPosition = iEyes == 6 ? 0 : -1;
			}
			else {
				this.allowedPosition += iEyes;
			}
		}
	};

	
}).call(this);