


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

	// var diceC = [{left:30, top:110}, {left:260, top:110}, {left:490, top:110}, {left:150, top:340}, {left:370, top:340}];
	// for(var i in diceC) {
	// 	app.dices.push(new Dice(diceC[i]));
	// }
	app.dices.push("Rosie", "Stormy", "Daisy", "Athena", "Tinker", "Rio", 
		"Apple", "Wildfire", "Hero", "Menace");


	// Event
	// $('body').click(app.shake);
	window.addEventListener('shake', app.shake, false);
	//app.$c.on('button', '.click', app.shake);


	// app.$c.on('click', '.btn', function(e) {
	// 	if($(this).hasClass('rules')) {
	// 		app.$curtain.fadeIn();
	// 	}else if($(this).hasClass('curtain')) {
	// 		app.$curtain.fadeOut();
	// 	}
	// });

	// Temp code
	app.$c.on('click', '.btn', function(e) {
		app.shake();
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


		// generate sequence of horse indexes, only reject if nearby has the same
		function hasElemInPrevNumOfElement(arr, elem, prevN=1){
		  var found = false;
		  for(var i=arr.length-1, j=0; j<prevN && i>=0 ; i--, j++){
		    if (arr[i] === elem) { return true;}
		  }
		  return false;
		}

		var nums = [];
		while(nums.length < 100) {
			var rand = _.random(0, app.dices.length-1);
			// NOTE: quick hack for unsatisfiable consecutive occurrance of the same number
			if ( !hasElemInPrevNumOfElement(nums, rand, 1) 
				&& !hasElemInPrevNumOfElement(nums, rand, 2) 
				&& !hasElemInPrevNumOfElement(nums, rand, 3) 
				&& !hasElemInPrevNumOfElement(nums, rand, 4) 
				) {
				nums.push(rand);	
			};

			// if (nums.length <= 0) { // 1st elem
			// 	nums.push(rand);
			// } else if (nums.length === 1 ) {  // 2nd elem should not be the same with 1st
			// 	if (nums[nums.length-1] != rand) {
			// 		nums.push(rand);
			// 	}
			// } else if ( nums[nums.length-1] != rand && nums[nums.length-2] != rand ) { // not same with the previous two
			// 	nums.push(rand);				
			// }
		}


		var listTicker = function(options) {
		    var defaults = {
		        list: [],
		        startIndex:0,
		        interval: 2.5 * 1000,
		    }   
		    var options = $.extend(defaults, options);
		    
		    var changeableInterval = options.interval;   
		    var kNumFlashBeforeClosing = 15;
		    var numFlashBeforeClosing = 0;
		    var kMinFlashInterval = 1000;
		    
		    var listTickerInner = function(index) {

		        if (options.list.length == 0) return;

		        if (!index || index < 0 || index > options.list.length) index = 0;

		        var value= options.list[index];

		        options.trickerPanel.fadeOut(function() {
		            $(this).html(value).fadeIn();
		        });
		        
		        var nextIndex = (index + 1) ; // % options.list.length;

						//var nextIndex = (index + 1) % options.list.length;

		     

		    	if (changeableInterval > kMinFlashInterval ) {
		          setTimeout(function() {
		            listTickerInner(nextIndex);
		            changeableInterval = changeableInterval - 200;
		          } , changeableInterval );
		        } else if ( changeableInterval <= kMinFlashInterval
		                   && numFlashBeforeClosing < kNumFlashBeforeClosing
		                  ) {
		          //alert("current index: " + index + "  , next " + nextIndex);        
		                  
		          setTimeout(function() {
		            listTickerInner(nextIndex);
		            numFlashBeforeClosing  = numFlashBeforeClosing + 1;
		          } , changeableInterval );
		        } else {
		            setTimeout(function() {
		               alert("Done!" + numFlashBeforeClosing + "  last index " + nextIndex );
		             } , changeableInterval );
		        } 
		    };
		    
		    listTickerInner(options.startIndex);
		}


		// Animation
		$(function() {
		    listTicker({
		        list: nums ,
		        startIndex:0,
		        trickerPanel:app.$button, //$('#roulette'),
		        interval: 2.5 * 1000,
		    });
		});

		// app._loop(500, 1, function() {
		// 	// 摇晃骰子
		// 	// random select a name and display
			
		// 	// for(var i in app.dices) {
		// 		// app.dices[i].show(_.random(1,6));
		// 	// }
		// }, function() {
		// 	// 摇晃结束
		// 	// app.render();
		// 	alert("Done after 5 random selection! ------" +nums.join());
		// 	app.running = false;
		// });
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



// NOTE: in index.html, please add 
// <script type="text/javascript" src="../js/handlebars-v4.0.5.js"></script>
// 
// $(function () {
//   // Grab the template script
//   var theTemplateScript = $("#address-template").html();

//   // Compile the template
//   // var theTemplate = Handlebars.compile(theTemplateScript);
//   var compiledTemplate = Handlebars.templates['demo.tpl'];


//   // Define our data object
//   var context={
//     "city": "London",
//     "street": "Baker Street",
//     "number": "221B"
//   };

//   // Pass our data to the template
//   var theCompiledHtml = theTemplate(context);

//   // Add the compiled html to the page
//   $('.content-placeholder').html(theCompiledHtml);
// });


