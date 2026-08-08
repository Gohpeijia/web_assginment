/* DARK MODE */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️"; 
} else {
    themeToggle.textContent = "🌙"; 
}

themeToggle.addEventListener("click", function(){
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
    }
});

const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(function(link){
    link.addEventListener("click", function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if(target){
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/* FADE IN ANIMATION */
const cards = document.querySelectorAll(
    ".about-card, .timeline-item, .skill-card, .project-card, .award-card, .contact-card"
);

const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

cards.forEach(function(card){
    observer.observe(card);
});

/* TYPING EFFECT */
const typingText = document.querySelector(".hero-text h3");
const text = "Bachelor of Computer Science Student";
let i = 0;

if(typingText){
    typingText.textContent = "";
    function typing(){
        if(i < text.length){
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typing, 70);
        }
    }
    typing();
}

/* VIEW CERTIFICATE MODAL */
function openCertModal(imageSrc) {
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("modalImg");
    modal.style.display = "flex";
    modalImg.src = imageSrc;
}

function closeCertModal() {
    document.getElementById("certModal").style.display = "none";
}

/* RESUME DOWNLOAD WITH PROGRESS BAR*/
function startResumeDownload(btn) {
    const pdfPath = btn.getAttribute('data-file');

    const progressBox = document.getElementById('resumeProgressBox');
    const progressFill = document.getElementById('resumeProgressFill');
    const percentText = document.getElementById('resumePercentText');
    const statusText = document.getElementById('resumeStatusText');
    const successBadge = document.getElementById('resumeSuccessBadge');

    btn.disabled = true;
    btn.style.opacity = '0.6';
    btn.style.cursor = 'not-allowed';

    progressBox.style.display = 'block';
    successBadge.style.display = 'none';
    progressFill.style.width = '0%';
    percentText.innerText = '0%';
    statusText.innerText = 'Downloading...';

    let progress = 0;

    const timer = setInterval(() => {
        progress += Math.floor(Math.random() * 6) + 3;

        if (progress >= 100) {
            progress = 100;
            clearInterval(timer);

            progressFill.style.width = '100%';
            percentText.innerText = '100%';
            statusText.innerText = 'Completed!';

            setTimeout(() => {
                window.location.href = pdfPath;

                successBadge.style.display = 'block';

                setTimeout(() => {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                }, 2000);
            }, 300);
        } else {
            progressFill.style.width = progress + '%';
            percentText.innerText = progress + '%';
        }
    }, 70);
}
