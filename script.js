/* =====================================================
   PHOTOGRAPHICSKE
   JAVASCRIPT
===================================================== */


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function openMobileMenu() {
    navLinks.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
}

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.contains("active");

    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }

});


/* Close mobile menu when a link is clicked */

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMobileMenu();

    });

});


/* Close mobile menu on outside click/tap, so it doesn't trap the page */

document.addEventListener("click", (event) => {

    const isOpen = navLinks.classList.contains("active");

    if (!isOpen) {
        return;
    }

    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
        closeMobileMenu();
    }

});


/* ================= PORTFOLIO FILTER ================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove active state */

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });

        /* Add active state */

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        const filter = button.dataset.filter;

        portfolioItems.forEach(item => {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

/*
    Single source of truth for the WhatsApp number.
    Change it here ONCE — every WhatsApp link on the page
    (contact section + the floating button) reads from this
    same value, see the sync loop just below.

    Format: 254XXXXXXXXX
*/

const phoneNumber = "254700000000";

document.querySelectorAll("[data-whatsapp-link]").forEach(link => {
    link.href = `https://wa.me/${phoneNumber}`;
});

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value;

    const whatsappMessage =
        `Hello PhotographicsKE,%0A%0A` +
        `My name is ${encodeURIComponent(name)}.%0A` +
        `I am interested in: ${encodeURIComponent(service)}.%0A%0A` +
        `${encodeURIComponent(message)}`;

    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    formStatus.textContent =
        "Opening WhatsApp to complete your enquiry...";

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

});


/* ================= FOOTER YEAR ================= */

const year = document.getElementById("year");

year.textContent = new Date().getFullYear();


/* ================= HEADER SCROLL EFFECT ================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(17, 17, 17, 0.97)";

    } else {

        header.style.background = "rgba(17, 17, 17, 0.9)";

    }

});

    document.addEventListener("DOMContentLoaded", () => {
        // 1. Dynamic Year Update
        const yearSpan = document.getElementById("year");
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();

        // 2. Mobile Menu Toggle
        const menuToggle = document.getElementById("menuToggle");
        const mobileDrawer = document.getElementById("mobileDrawer");
        const menuIcon = document.getElementById("menuIcon");

        menuToggle.addEventListener("click", () => {
          const isOpen = !mobileDrawer.classList.contains("hidden");
          mobileDrawer.classList.toggle("hidden", isOpen);
          menuIcon.textContent = isOpen ? "☰" : "✕";
          menuToggle.setAttribute("aria-expanded", !isOpen);
        });

        document.querySelectorAll(".mobile-link").forEach((link) => {
          link.addEventListener("click", () => {
            mobileDrawer.classList.add("hidden");
            menuIcon.textContent = "☰";
          });
        });

        // 3. Category Filter Logic
        const filterBtns = document.querySelectorAll(".filter-btn");
        const portfolioItems = document.querySelectorAll(".portfolio-item");

        filterBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            portfolioItems.forEach((item) => {
              const category = item.getAttribute("data-category");
              if (filterValue === "all" || category === filterValue) {
                item.style.display = "block";
                setTimeout(() => {
                  item.style.opacity = "1";
                  item.style.transform = "scale(1)";
                }, 50);
              } else {
                item.style.opacity = "0";
                item.style.transform = "scale(0.95)";
                setTimeout(() => {
                  item.style.display = "none";
                }, 300);
              }
            });
          });
        });

        // 4. Before/After Retouching Interactive Slider
        const sliderContainer = document.getElementById("sliderContainer");
        const sliderHandle = document.getElementById("sliderHandle");
        const beforeOverlay = document.getElementById("beforeOverlay");
        let isDragging = false;

        const updateSliderPosition = (x) => {
          const rect = sliderContainer.getBoundingClientRect();
          let offsetX = x - rect.left;
          if (offsetX < 0) offsetX = 0;
          if (offsetX > rect.width) offsetX = rect.width;

          const percentage = (offsetX / rect.width) * 100;
          sliderHandle.style.left = `${percentage}%`;
          beforeOverlay.style.width = `${percentage}%`;
        };

        const onMove = (e) => {
          if (!isDragging) return;
          const clientX = e.touches ? e.touches[0].clientX : e.clientX;
          updateSliderPosition(clientX);
        };

        sliderContainer.addEventListener("mousedown", (e) => {
          isDragging = true;
          onMove(e);
        });
        window.addEventListener("mouseup", () => {
          isDragging = false;
        });
        window.addEventListener("mousemove", onMove);

        sliderContainer.addEventListener(
          "touchstart",
          (e) => {
            isDragging = true;
            onMove(e);
          },
          { passive: true },
        );
        window.addEventListener("touchend", () => {
          isDragging = false;
        });
        window.addEventListener("touchmove", onMove, { passive: true });

        // 5. Lightbox Modal Gallery Logic
        const lightboxModal = document.getElementById("lightboxModal");
        const lbImage = document.getElementById("lbImage");
        const lbTitle = document.getElementById("lbTitle");
        const lbCategory = document.getElementById("lbCategory");
        const lbCounter = document.getElementById("lbCounter");
        const lbCamera = document.getElementById("lbCamera");
        const lbLens = document.getElementById("lbLens");
        const lbClose = document.getElementById("lbClose");
        const lbPrev = document.getElementById("lbPrev");
        const lbNext = document.getElementById("lbNext");

        let visibleItems = [];
        let currentIndex = 0;

        const updateVisibleItems = () => {
          visibleItems = Array.from(portfolioItems).filter(
            (item) => item.style.display !== "none",
          );
        };

        const showLightboxIndex = (index) => {
          updateVisibleItems();
          if (visibleItems.length === 0) return;

          if (index < 0) index = visibleItems.length - 1;
          if (index >= visibleItems.length) index = 0;
          currentIndex = index;

          const item = visibleItems[currentIndex];
          const src = item.getAttribute("data-src");
          const title = item.getAttribute("data-title") || "Work Showcase";
          const category = item.getAttribute("data-category") || "Portfolio";
          const camera =
            item.getAttribute("data-camera") || "Sony Professional";
          const lens = item.getAttribute("data-lens") || "Prime Optics";

          lbImage.style.transform = "scale(0.95)";
          lbImage.style.opacity = "0.5";

          setTimeout(() => {
            lbImage.src = src;
            lbTitle.textContent = title;
            lbCategory.textContent = category;
            lbCamera.textContent = camera;
            lbLens.textContent = lens;
            lbCounter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;

            lbImage.style.transform = "scale(1)";
            lbImage.style.opacity = "1";
          }, 150);
        };

        portfolioItems.forEach((item) => {
          item.addEventListener("click", () => {
            updateVisibleItems();
            const index = visibleItems.indexOf(item);
            lightboxModal.classList.remove("hidden");
            setTimeout(() => lightboxModal.classList.remove("opacity-0"), 10);
            showLightboxIndex(index !== -1 ? index : 0);
          });
        });

        const closeLightbox = () => {
          lightboxModal.classList.add("opacity-0");
          setTimeout(() => lightboxModal.classList.add("hidden"), 300);
        };

        lbClose.addEventListener("click", closeLightbox);
        lbPrev.addEventListener("click", () =>
          showLightboxIndex(currentIndex - 1),
        );
        lbNext.addEventListener("click", () =>
          showLightboxIndex(currentIndex + 1),
        );

        lightboxModal.addEventListener("click", (e) => {
          if (e.target === lightboxModal) closeLightbox();
        });

        document.addEventListener("keydown", (e) => {
          if (lightboxModal.classList.contains("hidden")) return;
          if (e.key === "Escape") closeLightbox();
          if (e.key === "ArrowLeft") showLightboxIndex(currentIndex - 1);
          if (e.key === "ArrowRight") showLightboxIndex(currentIndex + 1);
        });

        // 6. Testimonials Carousel
        const testimonials = [
          {
            quote:
              "PhotographicsKE delivered exceptional coverage for our annual regional summit in Nairobi. The turnaround time for press-ready photos was under 24 hours and the quality was world-class.",
            name: "Emmanuel A.",
            role: "Communications Director, East Africa Summit",
            avatar: "EA",
          },
          {
            quote:
              "The portraits and brand graphic design work turned our startup visual identity around. Very professional and highly communicative team!",
            name: "Sarah M.",
            role: "Brand Lead, TechHub Kenya",
            avatar: "SM",
          },
          {
            quote:
              "Our wedding photos look straight out of a magazine. The color grading and retouching captures every single detail beautifully.",
            name: "David & Wanjiku",
            role: "Private Event Clients",
            avatar: "DW",
          },
        ];

        let testimonialIndex = 0;
        const tText = document.getElementById("testimonialText");
        const tName = document.getElementById("testimonialName");
        const tRole = document.getElementById("testimonialRole");
        const tAvatar = document.getElementById("testimonialAvatar");
        const tContainer = document.getElementById("testimonialContainer");

        const renderTestimonial = (index) => {
          tContainer.style.opacity = "0";
          setTimeout(() => {
            const item = testimonials[index];
            tText.textContent = `“${item.quote}”`;
            tName.textContent = item.name;
            tRole.textContent = item.role;
            tAvatar.textContent = item.avatar;
            tContainer.style.opacity = "1";
          }, 200);
        };

        document
          .getElementById("prevTestimonial")
          .addEventListener("click", () => {
            testimonialIndex =
              (testimonialIndex - 1 + testimonials.length) %
              testimonials.length;
            renderTestimonial(testimonialIndex);
          });

        document
          .getElementById("nextTestimonial")
          .addEventListener("click", () => {
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
            renderTestimonial(testimonialIndex);
          });

        // 7. Contact Form Simulation & Toast Notification
        const contactForm = document.getElementById("contactForm");
        const formToast = document.getElementById("formToast");

        contactForm.addEventListener("submit", (e) => {
          e.preventDefault();

          formToast.className =
            "p-4 rounded text-xs font-bold text-center bg-gold/20 text-gold border border-gold block";
          formToast.textContent =
            "Thank you! Your message has been received. PhotographicsKE will reach out shortly.";

          contactForm.reset();

          setTimeout(() => {
            formToast.className = "hidden";
          }, 6000);
        });
      });

      // Smart Helper Functions Accessible from HTML
      function selectServiceInForm(serviceName) {
        const select = document.getElementById("serviceSelect");
        if (select) select.value = serviceName;
      }

      function bookPackage(packageName, price, serviceType) {
        selectServiceInForm(serviceType || "Package Booking");
        const messageBox = document.getElementById("message");
        if (messageBox) {
          messageBox.value = `Hi PhotographicsKE,\n\nI am interested in booking the "${packageName}" package (KES ${price}). Please let me know your availability and terms.\n\nThank you!`;
        }

        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }