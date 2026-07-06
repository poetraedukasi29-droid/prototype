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

<<<<<<< HEAD
function copyWA(){

navigator.clipboard.writeText("0823xxxxxxxx");

alert("Nomor WhatsApp berhasil disalin.");

}

function instagram(){

window.open("https://instagram.com/localoutdoor","_blank");

}
=======
<<<<<<< HEAD
=======
document.addEventListener('DOMContentLoaded', () => {
    const participantList = document.getElementById('participant-list');
    const addParticipantBtn = document.getElementById('add-participant-btn');
    const bookingForm = document.getElementById('bookingForm');

    // Fungsi Tambah Peserta Dinamis
    addParticipantBtn.addEventListener('click', () => {
        const participantCount = participantList.querySelectorAll('.participant-row').length + 1;
        
        const newRow = document.createElement('div');
        newRow.className = 'participant-row';
        newRow.innerHTML = `
            <div class="input-group name-group">
                <i class="fas fa-users"></i>
                <input type="text" class="input-name" placeholder="Pendaki ${participantCount}" required>
            </div>
            <div class="input-group age-group">
                <input type="number" class="input-age" placeholder="Umur" required>
            </div>
        `;
        participantList.appendChild(newRow);
    });

    // Menampilkan nama file setelah dipilih
    const handleFileSelect = (inputId, displayId) => {
        document.getElementById(inputId).addEventListener('change', function() {
            const fileName = this.files[0] ? this.files[0].name : "";
            document.getElementById(displayId).textContent = fileName;
        });
    };

    handleFileSelect('upload-simaksi', 'name-simaksi');
    handleFileSelect('upload-payment', 'name-payment');

    // Simpan Data Saat Form di-Submit
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Ambil semua data peserta
        const names = document.querySelectorAll('.input-name');
        const ages = document.querySelectorAll('.input-age');
        const participantsData = [];

        names.forEach((input, index) => {
            participantsData.push({
                nama: input.value,
                umur: ages[index].value
            });
        });

        // Simulasi menyimpan data (ke LocalStorage browser)
        const bookingData = {
            id: Date.now(),
            peserta: participantsData,
            file_simaksi: document.getElementById('upload-simaksi').files[0]?.name || "Tidak ada file",
            file_pembayaran: document.getElementById('upload-payment').files[0]?.name || "Tidak ada file",
            tanggal_booking: new Date().toLocaleString()
        };

        // Simpan ke LocalStorage
        let allBookings = JSON.parse(localStorage.getItem('localoutdoor_bookings')) || [];
        allBookings.push(bookingData);
        localStorage.setItem('localoutdoor_bookings', JSON.stringify(allBookings));

        // Feedback user
        alert(`Berhasil! ${participantsData.length} Peserta telah terdaftar.\nData tersimpan di penyimpanan browser.`);
        console.log("Data Booking Tersimpan:", bookingData);
        
        // Reset form
        // bookingForm.reset();
    });
});
>>>>>>> b4632a0 (tambah)
>>>>>>> ec87ae5ad31d6cdcc4381584f329964a16b37f31
