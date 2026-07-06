const images = [
    "Image/Sindoro1.jpg",
    "Image/Sindoro2.jpg",
    "Image/Sindoro3.jpg",
    "Image/Sindoro4.jpg",
    "Image/Sindoro5.jpg"
];

let current = 0;

const slide = document.getElementById("slide");

function showSlide(index){
    slide.src = images[index];
}

function nextSlide(){
    current++;

    if(current >= images.length){
        current = 0;
    }

    showSlide(current);
}

function prevSlide(){
    current--;

    if(current < 0){
        current = images.length - 1;
    }

    showSlide(current);
}

setInterval(nextSlide,3000);

function copyWA(){

navigator.clipboard.writeText("0823xxxxxxxx");

alert("Nomor WhatsApp berhasil disalin.");

}

function instagram(){

window.open("https://instagram.com/localoutdoor","_blank");

}