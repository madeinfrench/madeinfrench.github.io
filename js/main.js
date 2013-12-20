// - Top Menu Navigation
// - Active Link
// - ScrollTo #anchor

// Declaration of variable
var $body = $(document.body),
	headerNav = $('#nav-menu'),
	headerNavHeight = headerNav.outerHeight(),
// 	headerAnchorList = [],
// 	headerAnchorOffset = [],
	findHeaderAnchor = headerNav.find('a'),
	lastId;


// // findHeaderAnchor.each(function(idx){
// // 	var $this = $(this);
// // 	headerAnchorList[idx] = $this.attr('href');
// // 	headerAnchorOffset[idx] = $(this).offset();
// // });

// // var scrollItems = findHeaderAnchor.map(function(idx){
// // 	var item = $($(this).attr("href"));
// // 	if (item.length) { 
// // 		headerAnchorList[idx] = item;
// // 		headerAnchorOffset[idx] = item.offset().top;
// // 	}
// // });


var scrollItems = findHeaderAnchor.map(function(){
	var item = $($(this).attr("href"));
	if (item.length & item.selector != "#") { return item;	}
});


// Bind click handler to menu items
// so we can get a fancy scroll animation

findHeaderAnchor.click(function(e){
	var href = $(this).attr("href"),
		offsetTop = href === "#" ? 0 : $(href).offset().top;	
	if (href == "#about") { 
	 	offsetTop = offsetTop-headerNavHeight+1;
	}
	if (href != "#") {
		$body.stop().animate({ 
			scrollTop: offsetTop
		}, 300);
	}
	e.preventDefault();
});

// Bind to scroll
$(window).scroll(function() {

   // Get container scroll position
   var fromTop = $(this).scrollTop()+headerNavHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
		if ($(this).offset().top < fromTop) {
       		return this;
  	 	}
   });


   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;

       // Set/remove active class
       findHeaderAnchor
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }
});




function OverAll() {
	
	// def
	// console.log('var')
	var win;
	var doc;
	
	var sectionLength = [];
	var sectionIndex = [
			0 //home
			,1 //about
			,2 //products
			,3 //contact
		];

	var that = this;
	var contentHeight;
	var contentWidth;
	var currentIndex = 0;
	var currentScroll;
	var currentScrollPercent;

	var idNavMenu = $("#nav-menu");
	var navTopShown = true;

	var showTopNav;
	var hideTopNav;

	var getSectionScroll;

	var nextBtns;

	this.init = function () {
		// console.log('init');
		
		doc = $(document);
		win = $(window);

		win.bind('scroll', this.onWindowScroll );
		win.resize( this.onWindowResize );
	}

	//nav
	// if (contentWidth > 468) {
		idNavMenu.click( function() { console.log("click"); showTopNav(); } );
		idNavMenu.mouseover( function() { console.log("over"); showTopNav(); } );
		idNavMenu.mouseout( function() { console.log("out");hideTopNav(1); } );


	this.onWindowScroll = function () {
		currentScroll = win.scrollTop();		
		
		// if the user pass the HOME section, we should disable the Gallery.

		if (currentScroll > 455) {
			HOME.stopGallery();
		}
		else if (!HOME.active) {
			HOME.startGallery();
		}

		// console.log(currentScroll);
		if (contentWidth > 468) {
			if(currentScroll != 0) {
				hideTopNav(1);
				//showBtnNav();
			} else {
				showTopNav();
				//hideBtnNav(0);
			}
		}
	}
	
	this.onWindowResize = function () {
		contentHeight = win.height();
		contentWidth = win.width();
		
		
		// console.log('width : ' + contentWidth + "    ::    height :" + contentHeight);
		// initBadges();
		
		// resetCSS();
		
		// resetTween();

		if (contentWidth < 468)
		{
			idNavMenu.css('top', -138);
			idNavMenu.css('height', "auto");
		}	else {
			idNavMenu.css('top', 0);
			idNavMenu.css('height', "40");
		}
		
		// if(contentWidth < 960) {
		// 	$('#logowrapper').css('left', 480);
		// } else {
		// 	$('#logowrapper').css('left', '50%');
		// }
		
		that.onWindowScroll();
	}

	showTopNav = function() {
		if(navTopShown) { return; }
		navTopShown = true;
		TweenMax.to($("#nav-menu"), .5, { css: { height:40 }, overwrite:'all' } );
	}

	hideTopNav = function(delay) {
		if (!navTopShown) { return; }
		if(currentScroll <= 0) { return; }
		navTopShown = false;
		TweenMax.to($("#nav-menu"), .5, { css: { height:0 }, delay:delay } );
		//$('#header-nav-menu').fadeOut("slow");
	}	


OverAll.animNav = function(dir){
	if(dir=='in'){
		// $('#nav-menu').show().animate({'top':0}, 600, 'easeOut');
		TweenMax.to($("#nav-menu"), 0.5, { css: {top:2}})
	}else{
		// $('#nav-menu').animate({'top':-$('#nav-menu').height()}, 600, 'easeOut');
		TweenMax.to($("#nav-menu"), 0.5, { css: {top:-$('#nav-menu').height()-1}})
	}
}
	$('.mobile-menu-opener').on('click', function(e){
		e.preventDefault();
		OverAll.animNav('in');
	})
	$('.mobile-menu-closer').on('click', function(e){
		e.preventDefault();
		OverAll.animNav('out');
	})

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
	HOME.imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];
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

