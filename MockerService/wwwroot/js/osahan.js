/*
Template Name: VIDOE - Video Streaming Website HTML Template
Author: Askbootstrap
Author URI: https://themeforest.net/user/askbootstrap
Version: 1.0
*/

(function($) {
  "use strict"; // Start of use strict
  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Collections Slider
  $('.collections-slider').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  });

  // Osahan Slider
  $('.osahan-slider').slick({
  centerMode: true,
  centerPadding: '200px',
  slidesToShow: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict

var iconState;
var isHighlight;
var isDesign;

function toggleSidebar() {
  $("#mainSidebar").toggleClass("hide");
  if ($("#mainSidebar").hasClass("hide")) {
    document.getElementById("btnToolbar").setAttribute("title", "Show toolbar");
    $("#paneTable").removeClass("col-3");
    $("#paneTable").addClass("hide2");
    $("#pageContent").removeClass("col-9");
    $("#pageContent").addClass("col-12");
  } else {
    document.getElementById("btnToolbar").setAttribute("title", "Hide toolbar"); 
    if (iconState != 1) {
      $("#paneTable").addClass("col-3");
      $("#paneTable").removeClass("hide2");
      $("#pageContent").addClass("col-9");
      $("#pageContent").removeClass("col-12");
    }
  }
}

function toggleIcon(n) {
  $("#itemHome").removeClass("active");
  $("#itemTable").removeClass("active");
  $("#itemComment").removeClass("active");
  $("#iconHome").removeClass("active");
  $("#iconTable").removeClass("active");
  $("#iconComment").removeClass("active");
  if (iconState == n) {
    $("#paneTable").removeClass("col-3");
    $("#paneTable").addClass("hide2");
    $("#pageContent").removeClass("col-9");
    $("#pageContent").addClass("col-12");
    iconState = 0;
    return;
  }
  if (n == 1) {
    $("#itemHome").addClass("active");
    $("#iconHome").addClass("active");

    $("#paneTable").removeClass("col-3");
    $("#paneTable").addClass("hide2");
    $("#pageContent").removeClass("col-9");
    $("#pageContent").addClass("col-12");
  }
  if (n == 2) {
    $("#itemTable").addClass("active");
    $("#iconTable").addClass("active");
    
    $("#paneTable").addClass("col-3");
    $("#paneTable").removeClass("hide2");
    $("#pageContent").addClass("col-9");
    $("#pageContent").removeClass("col-12");
  }
  if (n == 3) {
    $("#itemComment").addClass("active");
    $("#iconComment").addClass("active");
    
    $("#paneTable").addClass("col-3");
    $("#paneTable").removeClass("hide2");
    $("#pageContent").addClass("col-9");
    $("#pageContent").removeClass("col-12");
  }
  iconState = n;
}

function toggleHighlight() {
  $("#itemHighlight").toggleClass("active");
  $("#iconHighlight").toggleClass("active");
  if ($("#iconHighlight").hasClass("active")) {
    document.getElementById("iconHighlight").setAttribute("title", "Turn OFF interaction highlight"); 
    isHighlight = 1;
  } else {
    document.getElementById("iconHighlight").setAttribute("title", "Turn ON interaction highlight"); 
    isHighlight = 0;
  }
}

function toggleDesign() {
  $("#itemDesign").toggleClass("active");
  $("#iconDesign").toggleClass("active");
  if ($("#iconDesign").hasClass("active")) {
    document.getElementById("iconDesign").setAttribute("title", "Turn OFF design annotations"); 
    isDesign = 1;
  } else {
    document.getElementById("iconDesign").setAttribute("title", "Turn ON design annotations"); 
    isDesign = 0;
  }
}