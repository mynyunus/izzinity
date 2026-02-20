(function () {
  var waBase = "https://api.whatsapp.com/send?phone=601155515775&text=";

  var navPill = document.querySelector(".nav-pill");
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navMenu = document.querySelector("[data-nav-menu]");

  function updateNavOnScroll() {
    if (!navPill) return;
    if (window.scrollY > 12) {
      navPill.classList.add("scrolled");
    } else {
      navPill.classList.remove("scrolled");
    }
  }

  updateNavOnScroll();
  window.addEventListener("scroll", updateNavOnScroll, { passive: true });

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".nav-pill")) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealItems.length > 0) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("revealed");
    });
  }

  var backToTop = document.querySelector("[data-back-to-top]");
  function updateBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 320) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  updateBackToTop();
  window.addEventListener("scroll", updateBackToTop, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var filterButtons = document.querySelectorAll(".filter-btn[data-filter]");
  var portfolioItems = document.querySelectorAll(".portfolio-item[data-category]");

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.getAttribute("data-filter");

        filterButtons.forEach(function (btn) {
          btn.classList.remove("is-active");
        });
        button.classList.add("is-active");

        portfolioItems.forEach(function (item) {
          var categories = (item.getAttribute("data-category") || "").split(" ");
          var match = filter === "all" || categories.indexOf(filter) !== -1;
          item.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  var quickTabs = document.querySelectorAll("[data-quick-tab]");
  var quickGroups = document.querySelectorAll("[data-quick-content]");

  if (quickTabs.length > 0 && quickGroups.length > 0) {
    quickTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var key = tab.getAttribute("data-quick-tab");

        quickTabs.forEach(function (item) {
          item.classList.remove("is-active");
        });
        tab.classList.add("is-active");

        quickGroups.forEach(function (group) {
          var isMatch = group.getAttribute("data-quick-content") === key;
          group.classList.toggle("is-active", isMatch);
        });
      });
    });
  }

  var carousels = document.querySelectorAll("[data-carousel]");
  if (carousels.length > 0) {
    carousels.forEach(function (carousel) {
      var track = carousel.querySelector("[data-carousel-track]");
      var slides = track ? track.querySelectorAll(".carousel-slide") : [];
      var prev = carousel.querySelector("[data-carousel-prev]");
      var next = carousel.querySelector("[data-carousel-next]");
      var dots = carousel.querySelectorAll("[data-carousel-dot]");

      if (!track || slides.length < 2) return;

      var current = 0;
      var autoplayId;

      function render() {
        track.style.transform = "translateX(-" + current * 100 + "%)";

        dots.forEach(function (dot, index) {
          dot.classList.toggle("is-active", index === current);
        });
      }

      function goTo(index) {
        current = (index + slides.length) % slides.length;
        render();
      }

      function stopAutoplay() {
        if (autoplayId) {
          window.clearInterval(autoplayId);
          autoplayId = undefined;
        }
      }

      function startAutoplay() {
        stopAutoplay();
        autoplayId = window.setInterval(function () {
          goTo(current + 1);
        }, 4200);
      }

      if (prev) {
        prev.addEventListener("click", function () {
          goTo(current - 1);
        });
      }

      if (next) {
        next.addEventListener("click", function () {
          goTo(current + 1);
        });
      }

      dots.forEach(function (dot) {
        dot.addEventListener("click", function () {
          var target = Number(dot.getAttribute("data-carousel-dot"));
          if (!Number.isNaN(target)) goTo(target);
        });
      });

      carousel.addEventListener("mouseenter", stopAutoplay);
      carousel.addEventListener("mouseleave", startAutoplay);
      carousel.addEventListener("focusin", stopAutoplay);
      carousel.addEventListener("focusout", startAutoplay);

      document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
          stopAutoplay();
        } else {
          startAutoplay();
        }
      });

      render();
      startAutoplay();
    });
  }

  var quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!quoteForm.reportValidity()) {
        return;
      }

      var name = quoteForm.querySelector("#nama").value.trim();
      var jenis = quoteForm.querySelector("#jenis").value;
      var kuantiti = quoteForm.querySelector("#kuantiti").value.trim();
      var tarikh = quoteForm.querySelector("#tarikh").value;
      var notesField = quoteForm.querySelector("#notes");
      var notes = notesField ? notesField.value.trim() : "";

      var textLines = [
        "Hi IZZINITY, saya nak minta sebut harga.",
        "Nama: " + name,
        "Jenis: " + jenis,
        "Kuantiti: " + kuantiti,
        "Tarikh Diperlukan: " + tarikh
      ];

      if (notes) {
        textLines.push("Maklumat Tambahan: " + notes);
      }

      var waUrl = waBase + encodeURIComponent(textLines.join("\n"));
      window.open(waUrl, "_blank", "noopener");
    });
  }
})();
