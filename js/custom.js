(function ($) {
  "use strict";

  /* ----------------------------------------------------------- */
  /*  PLAYING MUSIC
      /* ----------------------------------------------------------- */
  $(document).ready(function () {
    $(".play").on('click', function () {
      $(this).hide();
      $(".pause").fadeIn();
      $("#mymusic")[0].play();
      if ($(".play")) {
        document.getElementById("myplay").style.display = "none";
      }
      if ($(".play")) {
        document.getElementById("pla").style.display = "none";
      }
      if ($(".play")) {
        document.getElementById("textPlay").style.display = "none";
      }

    });

    $(".pause").on('click', function () {
      $(this).hide();
      $(".play").fadeIn();
      $("#mymusic")[0].pause();
      if ($(".pause")) {
        document.getElementById("mypause").style.display = "none";
      }
      if ($(".pause")) {
        document.getElementById("pau").style.display = "none";
      }
      if ($(".pause")) {
        document.getElementById("textPause").style.display = "none";
      }
    });
  });

  $(document).ready(function () {
    /* ----------------------------------------------------------- */
    /*  FIX REVEALATOR ISSUE AFTER PAGE LOADED
        /* ----------------------------------------------------------- */

    $(".revealator-delay1").addClass("no-transform");

    /* ----------------------------------------------------------- */
    /*  PORTFOLIO GALLERY
        /* ----------------------------------------------------------- */

    if ($(".grid").length) {
      new CBPGridGallery(document.getElementById("grid-gallery"));
    }

    /* ----------------------------------------------------------- */
    /*  BUTTONS ANIMATION
        /* ----------------------------------------------------------- */
    function checkSize() {
      if ($(document).width() > 992) {
        var btn_hover = "";
        $(".btn").each(function () {
          var btn_text = $(this).text();
          $(this)
            .addClass(btn_hover)
            .empty()
            .append(
              "<span data-hover='" + btn_text + "'>" + btn_text + "</span>"
            );
        });
      }
    }
    checkSize();
    window.addEventListener("resize", function () {
      checkSize();
    });

    /* ----------------------------------------------------------- */
    /*  HIDE HEADER WHEN PORTFOLIO SLIDESHOW OPENED
        /* ----------------------------------------------------------- */

    $(".grid figure").on("click", function () {
      $("#navbar-collapse-toggle").addClass("hide-header");
    });

    /* ----------------------------------------------------------- */
    /*  SHOW HEADER WHEN PORTFOLIO SLIDESHOW CLOSED
        /* ----------------------------------------------------------- */

    $(".nav-close").on("click", function () {
      $("#navbar-collapse-toggle").removeClass("hide-header");
    });
    $(".nav-prev").on("click", function () {
      if ($(".slideshow ul li:first-child").hasClass("current")) {
        $("#navbar-collapse-toggle").removeClass("hide-header");
      }
    });
    $(".nav-next").on("click", function () {
      if ($(".slideshow ul li:last-child").hasClass("current")) {
        $("#navbar-collapse-toggle").removeClass("hide-header");
      }
    });

    /* ----------------------------------------------------------- */
    /*  PORTFOLIO DIRECTION AWARE HOVER EFFECT
        /* ----------------------------------------------------------- */

    var item = $(".grid li figure");
    var elementsLength = item.length;
    for (var i = 0; i < elementsLength; i++) {
      $(item[i]).hoverdir();
    }

    /* ----------------------------------------------------------- */
    /*  AJAX CONTACT FORM
        /* ----------------------------------------------------------- */

    $(".contactform").on("submit", function () {
      $(".output_message").text("Sending...");

      var form = $(this);
      $.ajax({
        url: form.attr("action"),
        method: form.attr("method"),
        data: form.serialize(),
        success: function (result) {
          if (result == "success") {
            $(".form-inputs").css("display", "none");
            $(".box p").css("display", "none");
            $(".contactform").find(".output_message").addClass("success");
            $(".output_message").text("Message Sent!");
          } else {
            $(".tabs-container").css("height", "440px");

            $(".contactform").find(".output_message").addClass("error");
            $(".output_message").text("Error Sending!");
          }
        },
      });

      return false;
    });
  });

  $(document).keyup(function (e) {
    /* ----------------------------------------------------------- */
    /*  KEYBOARD NAVIGATION IN PORTFOLIO SLIDESHOW
        /* ----------------------------------------------------------- */
    if (e.keyCode === 27) {
      stop_videos();
      $(".close-content").click();
      $("#navbar-collapse-toggle").removeClass("hide-header");
    }
    if (e.keyCode === 37 || e.keyCode === 39) {
      // stop_videos();
    }
  });

  /* ----------------------------------------------------------- */
  /*  HEADING ANIMATION
      /* ----------------------------------------------------------- */
  const target = window.document.querySelectorAll('h6')[0]
  const flickerLetter = letter => `<span style="animation: text-flicker-in-glow ${Math.random()*4}s linear both ">${letter}</span>`
  const colorLetter = letter => `<span style="color: hsla(${Math.random()*360}, 100%, 80%, 1);">${letter}</span>`;
  const flickerAndColorText = text =>
    text
    .split('')
    .map(flickerLetter)
    .map(colorLetter)
    .join('');
  const neonGlory = target => target.innerHTML = flickerAndColorText(target.textContent);
  neonGlory(target);
  target.onclick = ({
    target
  }) => neonGlory(target);

  /* ----------------------------------------------------------- */
  /*  HEADING ANIMATION
      /* ----------------------------------------------------------- */
  var textWrapper = document.querySelector('.ml2');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  anime.timeline({
      loop: true
    })
    .add({
      targets: '.ml2 .letter',
      scale: [4, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 950,
      delay: (el, i) => 70 * i
    }).add({
      targets: '.ml2',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });
})(jQuery);