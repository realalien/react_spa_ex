
(function(window) {

var app = {
	$c:      null,
	$stage:  null,
	$tips:   null,
	$button: null,
	dices:   [],

	wait:       10000,
	audio:      null,
	shakeEvent: null,
	running:    false
};

app.init = function() {
	app.$c       = $('#container');
	app.$stage   = $('#container .stage');
	app.$tips    = $('#container .tips');
	app.$button  = $('#container .tips .button');
	app.$curtain = $('#container .curtain');

	app.audio = new Audio('../audio/dice.mp3');

	app.resetStageSize();

	var diceC = [{left:30, top:110}, {left:260, top:110}, {left:490, top:110}, {left:150, top:340}, {left:370, top:340}];
	for(var i in diceC) {
		app.dices.push(new Dice(diceC[i]));
	}

	// Event
	// $('body').click(app.shake);
	window.addEventListener('shake', app.shake, false);
	// app.$c.on('button', '.click', app.shake);

	app.$c.on('click', '.btn', function(e) {
		if($(this).hasClass('rules')) {
			app.$curtain.fadeIn();
		}else if($(this).hasClass('curtain')) {
			app.$curtain.fadeOut();
		}
	});
	app.shakeEvent = new Shake({
		threshold: 15,
		timeout:   1000
	});
	app.shakeEvent.start();
};

app.resetStageSize = function() {
	var width = window.innerWidth || document.documentElement.clientWidth;
	var scale = width / 720;
	if(scale < 1) {
		app.$stage.css({
			'transform':         'scale('+scale+')',
			'-webkit-transform': 'scale('+scale+')'
		});
	}
};

app.shake = function() {
	if(!app.running) {
		app.audio.play();
		app.$tips.removeClass('shake waiting');
		app.running = true;
		
		app._loop(100, 20, function() {
			// 摇晃骰子
			for(var i in app.dices) {
				app.dices[i].show(_.random(1,6));
			}
		}, function() {
			// 摇晃结束
			app.render();
		});
	}
};

app.render = function() {

	var repeat = false;
	var str    = '';
	for(var i in app.dices) {
		if(str.indexOf(app.dices[i]['point']) >= 0) {
			repeat = true;
		}
		str += app.dices[i]['point'];
	}

	if(repeat) {
		app.$tips.removeClass('shake').addClass('waiting');
		window.setTimeout(function() {
			app.running = false;
			app.$tips.removeClass('waiting').addClass('shake');
		}, app.wait);
	}else {
		app.running = false;
		app.$tips.removeClass('waiting').addClass('shake');
	}
	return false;

	var list = [];
	var sum  = 0;
	for(var i in app.dices) {
		list.push(app.dices[i]['point']);
		sum += app.dices[i]['point'];
	}
	app.$tips.prepend('<div>'+list.join('+')+' = '+sum+'</div>');
};

app._loop = function(gap, times, func, cb) {
	var timer = window.setInterval(function() {
		func();
		if(--times <= 0) {
			window.clearInterval(timer);
			return cb();
		}
	}, gap);
};

/*---------- DICE ----------*/
var Dice = function(pos) {
	this.pos    = pos || {left: 0, top: 0};
	this.$dom   = null;
	this.countC = [-1022,-818,-614,-410,-206,-2];
	this.point  = 0;

	this._init();
};

Dice.prototype._init = function() {
	var tpl   = '<div class="dice box"></div>';
	var that  = this;
	this.$dom = $(tpl).css({
		'left': that.pos.left,
		'top':  that.pos.top
	});
	app.$stage.append(this.$dom);
};

Dice.prototype.show = function(x) {
	if(x>=1 && x<=6) {
		this.point = x;
		this.$dom.css('background-position-x', this.countC[x-1]);
	}
};

$(app.init);

window.app = app;

})(window);
