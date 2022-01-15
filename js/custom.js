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

      // Mobile Menu Starts
      if ($(".play")) {
        document.getElementById("pla").style.display = "none";
        document.getElementById("pau").style.display = "inline-block";
        document.getElementById("textPlay").style.display = "none";
        document.getElementById("textPause").style.display = "inline-block";
      }
    });

    $(".pause").on('click', function () {
      $(this).hide();
      $(".play").fadeIn();
      $("#mymusic")[0].pause();
      if ($(".pause")) {
        document.getElementById("mypause").style.display = "none";
      }

      // Mobile Menu Starts
      if ($(".pause")) {
        document.getElementById("pau").style.display = "none";
        document.getElementById("pla").style.display = "inline-block";
        document.getElementById("textPlay").style.display = "inline-block";
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
})(jQuery);

/* ----------------------------------------------------------- */
/*  HEADING ANIMATION
    /* ----------------------------------------------------------- */
async function init() {
  const node = document.querySelector("#type-text")
  await sleep(2000)
  node.innerText = ""
  await node.type('I\'M ')

  while (true) {
    await node.type('Arpan!')
    await sleep(2000)
    await node.delete('Arpan!')
  }
}

const sleep = time => new Promise(resolve => setTimeout(resolve, time))
class TypeAsync extends HTMLSpanElement {
  get typeInterval() {
    const randomMs = 210 * Math.random()
    return randomMs < 50 ? 10 : randomMs
  }

  async type(text) {
    for (let character of text) {
      this.innerText += character
      await sleep(this.typeInterval)
    }
  }

  async delete(text) {
    for (let character of text) {
      this.innerText = this.innerText.slice(0, this.innerText.length - 1)
      await sleep(this.typeInterval)
    }
  }
}

customElements.define('type-async', TypeAsync, {
  extends: 'span'
})

init()