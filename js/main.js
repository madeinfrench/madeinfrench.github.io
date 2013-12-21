


function OverAll() {
	
	// def
	// console.log('var')
	var win;
	var doc;
	
	var that = this;
	var contentHeight;
	var contentWidth;

	var currentScrollPercent;

	var idHome = $("#home");
	var idByFlo = $("#byFlo");

	this.init = function () {
		// console.log('init');
		
		doc = $(document);
		win = $(window);

		win.resize( this.onWindowResize );
	}

	
	this.onWindowResize = function () {
		contentHeight = win.height();
		contentWidth = win.width();
		
		idHome.css("height", contentHeight);
		// by defaut 8em ;


	}
}



// Function for the Background image rotate


var HOME = {
	imgArray:[],
	currIndex:0,
	path:'img/bg/',
	numImages:0,
	interv:null,
	timeout:6000,
	active:true
}


HOME.init = function(){
	HOME.imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg"];
	HOME.currIndex=0;
	HOME.numImages=HOME.imgArray.length;
	
}

HOME.startGallery = function(){
	HOME.active = true;
	HOME.loadImage();
}

HOME.stopGallery = function(){
	HOME.active = false;
	window.clearTimeout(HOME.interv);
}

HOME.loadImage = function(){	
	if(!HOME.active){
		return;
	}
	var img = new Image();
	var imgWrapper = $('<div class="img-wrapper"></div>');
	var src = HOME.path + HOME.imgArray[HOME.currIndex];
	
	$(img).load(function(){
		$(imgWrapper)
  		.hide()
    		.css({'background-image':'url(' + src + ')'})
    		.appendTo($('#img-home-background'))

    		.fadeTo(1500, 1, function(){
	   		$(this).siblings().remove();
	   		});
    	HOME.currIndex < HOME.numImages-1?HOME.currIndex++:HOME.currIndex=0;;
    	HOME.interv = window.setTimeout("HOME.loadImage()", HOME.timeout);
	})
	.attr('src', src);
}

