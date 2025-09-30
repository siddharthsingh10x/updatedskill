document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector(".slider-bar");
    const afterImage = document.querySelector(".after-img");
    const sliderLine = document.querySelector(".slider-line");

    slider.addEventListener("input", function() {
        let sliderValue = slider.value;
        afterImage.style.clipPath = `inset(0 ${100 - sliderValue}% 0 0)`;
        sliderLine.style.left = `${sliderValue}%`;
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