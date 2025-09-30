// Function to Load Components
function loadComponent(containerId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${filePath}:`, error));
}


// Load Navbar, Footer, and WhatsApp
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("navbar-container", "navbar.html");
    loadComponent("footer-container", "footer.html");
    loadComponent("whatsapp-container", "whatsapp.html");
}); 


// Navbar Section
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
});



// contact submit query button after msg and reset form 
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form form");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
    
        const formData = new FormData(form);
    
        fetch("https://script.google.com/macros/s/AKfycbxQ7WjaBIUyRwh1h6Ik1h4yxe4AS5H-eZX_o51SIvgHfS4FyrHLcDpkNnl0sAtlAKlTnA/exec", {
            method: "POST",
            body: formData 
        })
        .then(response => response.text())
        .then(data => {
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 3000);
            form.reset();
        })
        .catch(error => {
            console.error("Error!", error.message);
        });
    });
});


// Category Filter Functionality
const categoryItems = document.querySelectorAll(".gallery-categories li");
const galleryItems = document.querySelectorAll(".gallery-item");

categoryItems.forEach(category => {
    category.addEventListener("click", () => {
        categoryItems.forEach(item => item.classList.remove("active"));
        category.classList.add("active");

        const filter = category.getAttribute("data-filter");
        galleryItems.forEach(item => {
            if (filter === "all" || item.classList.contains(filter)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});


// Lightbox Effect
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        const imgSrc = item.querySelector("img").src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add("active");
    });
});

// Close Lightbox when clicking outside image or on the close button
lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove("active");
    }
});

closeLightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
});


//gallery images slider
var swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: { 
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 10 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 }
    }
});

////For Good navigation
window.onload = function() {
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 100); // 100ms delay to smooth 
    }
};


// Testimonials Arrows
let slideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.testimonial-slide');
    if (index >= slides.length) { slideIndex = 0; }
    if (index < 0) { slideIndex = slides.length - 1; }
   
    slides.forEach(slide => {
        slide.style.transform = `translateX(-${slideIndex * 100}%)`;
    });
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

// Auto slide every 5 seconds
setInterval(() => {
    nextSlide();
}, 5000);


// FAQs Section
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const faqItem = button.parentElement;
       
        // Close all other FAQs before opening the clicked one
        document.querySelectorAll(".faq-item").forEach(item => {
            if (item !== faqItem) {
                item.classList.remove("active");
                item.querySelector(".faq-answer").style.display = "none";
            }
        });

        const answer = faqItem.querySelector(".faq-answer");
        if (faqItem.classList.contains("active")) {
            faqItem.classList.remove("active");
            answer.style.display = "none";
        } else {
            faqItem.classList.add("active");
            answer.style.display = "block";
        }
    });
});


// Navbar for mobile
function toggleMenu() {
    let mobileMenu = document.getElementById("mobileMenu");
    let hamburger = document.getElementById("hamburger");

    mobileMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
}

function toggleDropdown(id) {
    let dropdown = document.getElementById(id);
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    dropdown.previousElementSibling.classList.toggle("active");
}


// PAY AFTER PLACEMENT POPUP SCRIPT
document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("pap-popup");
  const closeBtn = popup.querySelector(".pap-close");

  function showPopup() {
    setTimeout(() => popup.classList.add("show"), 6000); // 6 sec delay
  }

//   every time show on homepage 
//   showPopup(); // Show on initial load

//   // If you want to ensure it triggers every time homepage is visited:
//   window.addEventListener("pageshow", function (event) {
//     if (event.persisted || this.performance.navigation.type === 2) {
//         popup.classList.remove("show"); // Reset if user returns via back/forward
//         showPopup();
//     }
//   });

  // Show popup only if not shown in current session
  if (!sessionStorage.getItem("popupShown")) {
    showPopup();
    sessionStorage.setItem("popupShown", "true"); // mark as shown
  }

  // Prevent popup on back/forward navigation in same tab
  window.addEventListener("pageshow", function (event) {
    if (event.persisted && !sessionStorage.getItem("popupShown")) {
      showPopup();
      sessionStorage.setItem("popupShown", "true");
    }
  });

  closeBtn.onclick = () => popup.classList.remove("show");

  popup.addEventListener("click", function (e) {
    if (e.target === popup) {
      popup.classList.remove("show");
    }
  });
});


// contact submit query button after msg and reset form 
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form form");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
    
        const formData = new FormData(form);
    
        fetch("https://script.google.com/macros/s/AKfycbxQ7WjaBIUyRwh1h6Ik1h4yxe4AS5H-eZX_o51SIvgHfS4FyrHLcDpkNnl0sAtlAKlTnA/exec", {
            method: "POST",
            body: formData 
        })
        .then(response => response.text())
        .then(data => {
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 3000);
            form.reset();
        })
        .catch(error => {
            console.error("Error!", error.message);
        });
    });
});


//google appscript code
// function doPost(e) {
//     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
   
//     var name = e.parameter.name;
//     var email = e.parameter.email;
//     var phone = e.parameter.phone;
//     var course = e.parameter.course;
//     var message = e.parameter.message;
   
//     sheet.appendRow([name, email, phone, course, message]);
  
//     return ContentService
//       .createTextOutput("Success")
//       .setMimeType(ContentService.MimeType.TEXT);
//   }