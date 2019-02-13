import '../css/style.scss';

var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.2'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = $('body').height()

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }

  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix

  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }

  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

$(function(){
	//var site_title = "WoodenFolk"
	//$(function(){ $('[data-division="' + division + '"]').addClass('selected') });

	function AddMode(a){
		if ($(document).scrollTop() > a) {
			$('body').addClass('js-fixed-menu');
			$('#top').addClass('js-fix');
		} else {
			$('body').removeClass('js-fixed-menu');
			$('#top').removeClass('js-fix');
		}
	}
	AddMode(100);

	/* Top button */
	function TopBtnAfix(b, c){
		if ( ($(window).height() + b) < $(document).height() ) {
			$('#toTop').removeClass('hidden').affix({
				offset: {top:c}
			});
		}
	}

	function scrollTrans_landscape(){
		const windowWidth = $( window ).width();
		$(window).scroll(function() {
		if(windowWidth > 736 ) {
			AddMode(100);
			TopBtnAfix(150, 200);
		} else if (windowWidth <= 736 & windowWidth > 667) {
			AddMode(350);
			TopBtnAfix(90, 90);
		} else if (windowWidth <= 667 & windowWidth > 568) {
			AddMode(290);
			TopBtnAfix(90, 90);
		} else if (windowWidth <= 568 & windowWidth >= 320 ) {
			AddMode(250);
			TopBtnAfix(90, 90);
		}
		});
	}

	function scrollTrans(){
		const windowWidth = $( window ).width();
		$(window).scroll(function() {
		if(windowWidth > 1024 ) {
			AddMode(680);
			TopBtnAfix(150, 200);
		} else if (windowWidth <= 1024 & windowWidth > 580) {
			AddMode(650);
			TopBtnAfix(90, 90);
		} else if (windowWidth <= 580 & windowWidth >= 320 ) {
			AddMode(450);
			TopBtnAfix(90, 90);
		}
		});
	}

	const windowWidth = $( window ).width();
	const windowHeight = $( window ).height();
	if(windowWidth > windowHeight ) {
		scrollTrans_landscape();
	} else if(windowWidth < windowHeight ) {
		scrollTrans();
	}

	$.fn.center = function(parent) {
		if (parent) {
			parent = this.parent();
		} else {
			parent = window;
		}
		this.css({
			"position":"absolute",
			"top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
			"left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
		});
		return this;
	}

	$("#gnb a").on('click',function(e) {
		var url = e.target.href;
		var hash = url.substring(url.indexOf("#")+1);
		$('html, body').animate({
			scrollTop: $('#'+hash).offset().top
		}, 500);
		return false;
	});

	const $mobile_menu_ico  = $("<div></div><div></div><div></div>");
	$mobile_menu_ico.appendTo(".resp-ico-menu");
	const $mobile_menu_bg  = $("<div class='mobile-menu-bg'></div>");
	$mobile_menu_bg.appendTo("#menu");
	
	$('.resp-ico-menu, .mobile-menu-bg').click(function(){
		$('.resp-ico-menu').toggleClass("resp-ico-menu-on");
		$('.menu-list').toggleClass("view-n-hide");
		$('.mobile-menu-bg').toggleClass("view-n-hide-bg");
		$("body").toggleClass("mask-on");
	});

	/* Tablet Menu */
	const $child_hit_area = $("<div class='btn-view-child'></div>");
	$child_hit_area.appendTo('.hav-child');
	$('.btn-view-child').click(function(){
		const $except = $(this).prev();
		const $except_P = $(this).parent().find("> a");
		$('.hav-child').find("ul").not($except).slideUp();
		$('.hav-child').find("a").not($except_P).removeClass("trans-arrow");
		$(this).prev().slideToggle();
		$(this).parent().find("> a").toggleClass("trans-arrow");
		return false;
	});

	function RemoveOpenMenu(){
		$('.hav-child ul, .menu-list').removeAttr("style");
		$('.hav-child').find("a").removeClass("trans-arrow");
		$('.menu-list').removeClass("view-n-hide");
		$('.resp-ico-menu').removeClass("resp-ico-menu-on");
		$("body").removeClass("mask-on");
		$('.mobile-menu-bg').removeClass("view-n-hide-bg");
	}

	/* Sub menu child click  for mobile */
	$(".child-nav-btn").click(function(){
		RemoveOpenMenu();
	});

	/* Mobile menu button action */
	$('.mobile-btn-login, .ft-btn-login').click(function(){
		RemoveOpenMenu();
		return false;
	});

	$( window ).resize(function() {
		const windowWidth = $( window ).width();
		
		if(windowWidth > 1140 ) {
			RemoveOpenMenu();
		} else if (windowWidth > 581) 
		{
			//$( ".tg-name" ).hoverIntent(makeTall,makeShort);
		} else if (windowWidth < 580){
			//$( ".tg-name" ).hoverIntent("","");
		}

		if(windowWidth > windowHeight ) {
			scrollTrans_landscape();
		} else {
			scrollTrans();
		}
	});

	$('#toTop').on('click', function(){
		$('html,body').animate({scrollTop:0},'slow');
		return false;
	});

});

 $(document).keydown(function(e) {
	e.stopPropagation();
	if (e.keyCode === 36) {
		$('html,body').animate({scrollTop:0},'slow');
	} else if (e.keyCode === 35) {
		$('html,body').animate({ scrollTop: $(document).height()-$(window).height() },'slow');
	}
});