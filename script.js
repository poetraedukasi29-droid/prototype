const images = [
    "Image/Sindoro1.jpeg",
    "Image/Sindoro2.jpeg",
    "Image/Sindoro3.jpeg",
    "Image/Sindoro4.jpeg"
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

