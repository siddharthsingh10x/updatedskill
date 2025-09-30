// why choose
function toggleBenefits() {
    let content = document.getElementById("benefitsContent");
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

// basic computer
function toggleAccordion(index) {
    let content = document.getElementsByClassName("accordion-content")[index];
    let icon = document.getElementsByClassName("accordion-header")[index].getElementsByTagName("span")[0];

    if (content.style.display === "block") {
        content.style.display = "none";
        icon.textContent = "+";
    } else {
        content.style.display = "block";
        icon.textContent = "-";
    }
} 


// basic computer
function toggleAccordion1(index) {
    let content = document.getElementsByClassName("accordion-content1")[index];
    let icon = document.getElementsByClassName("accordion-header1")[index].getElementsByTagName("span")[0];

    if (content.style.display === "block") {
        content.style.display = "none";
        icon.textContent = "+";
    } else {
        content.style.display = "block";
        icon.textContent = "-";
    }
} 

////For Good navigation
window.onload = function() {
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 100); // 100ms delay to smooth 
    }
};
