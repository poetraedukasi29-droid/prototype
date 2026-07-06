const images = [
    "Image/Sindoro1.jpg",
    "Image/Sindoro2.jpg",
    "Image/Sindoro3.jpg",
    "Image/Sindoro4.jpg",
    "Image/Sindoro5.jpg"
];

let current = 0;
const slide = document.getElementById("slide");

function showSlide(index) {
    if (slide) {
        slide.src = images[index];
    }
}

function nextSlide() {
    current++;

    if (current >= images.length) {
        current = 0;
    }

    showSlide(current);
}

function prevSlide() {
    current--;

    if (current < 0) {
        current = images.length - 1;
    }

    showSlide(current);
}

if (slide) {
    setInterval(nextSlide, 3000);
}

async function copyWA() {
    const nomor = "0823xxxxxxxx";

    try {
        await navigator.clipboard.writeText(nomor);
        alert("Nomor WhatsApp berhasil disalin.");
    } catch (error) {
        window.prompt("Salin nomor WhatsApp:", nomor);
    }
}

function instagram() {
    window.open("https://instagram.com/localoutdoor", "_blank");
}
