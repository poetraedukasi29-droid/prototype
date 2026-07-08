const params = new URLSearchParams(window.location.search);
const metode = params.get("metode") || sessionStorage.getItem("metode") || "qris";
const validMethods = ["qris", "dana", "bri"];

const isi = document.getElementById("isi");
const statusBox = document.getElementById("statusBox");
const status = document.getElementById("status");
const btnBayar = document.getElementById("btnBayar");
const invoiceEl = document.getElementById("invoice");
const totalEl = document.getElementById("total");
const timerEl = document.getElementById("timer");
const toastEl = document.getElementById("toast");
const bookingJalur = document.getElementById("bookingJalur");
const bookingTanggal = document.getElementById("bookingTanggal");
const bookingPendaki = document.getElementById("bookingPendaki");
const bookingTotal = document.getElementById("bookingTotal");

const bookingDraft = JSON.parse(localStorage.getItem("bookingDraft") || "null");
const invoice = sessionStorage.getItem("invoice") || `INV-${Date.now().toString().slice(-8)}`;
const amount = Number(sessionStorage.getItem("amount") || localStorage.getItem("bookingAmount") || bookingDraft?.amount || 180000);
let timeLeft = Number(sessionStorage.getItem("timeLeft") || 900);
let timerInterval;

sessionStorage.setItem("metode", metode);
sessionStorage.setItem("invoice", invoice);
sessionStorage.setItem("amount", amount);

function formatRupiah(nilai) {
  return `Rp${Number(nilai).toLocaleString("id-ID")}`;
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.style.display = "block";
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    toastEl.style.display = "none";
  }, 1800);
}

function renderBookingSummary() {
  if (bookingJalur) bookingJalur.textContent = bookingDraft?.jalur || "-";
  if (bookingTanggal) bookingTanggal.textContent = bookingDraft?.tanggal || "-";
  if (bookingPendaki) {
    if (bookingDraft) {
      bookingPendaki.textContent = `${bookingDraft.total_pendaki || 0} Orang (${bookingDraft.dewasa || 0} Dewasa, ${bookingDraft.anak || 0} Anak)`;
    } else {
      bookingPendaki.textContent = "-";
    }
  }
  if (bookingTotal) bookingTotal.textContent = bookingDraft?.harga || formatRupiah(amount);
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft -= 1;
    sessionStorage.setItem("timeLeft", timeLeft);

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    timerEl.textContent = `${minutes}:${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerEl.textContent = "00:00";
      timerEl.className = "timer-warning";
      status.textContent = "⛔ Waktu pembayaran habis";
      status.className = "status-pending";
      btnBayar.disabled = true;
      btnBayar.textContent = "Waktu Habis";
      showToast("Waktu pembayaran habis");
      return;
    }

    if (timeLeft <= 120) {
      timerEl.className = "timer-warning";
    } else {
      timerEl.className = "timer-success";
    }
  }, 1000);
}

function renderPembayaran(metodeTerpilih) {
  if (!validMethods.includes(metodeTerpilih)) {
    isi.innerHTML = `
      <h3>Metode pembayaran tidak tersedia</h3>
      <p>Silakan pilih metode pembayaran lain.</p>
    `;
    statusBox.style.display = "none";
    return;
  }

  if (metodeTerpilih === "qris") {
    isi.innerHTML = `
      <h3>Pembayaran QRIS</h3>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=OpenTripPendakian" alt="QRIS pembayaran">
      <p>Silakan scan QR Code di atas menggunakan aplikasi pembayaran.</p>
    `;
  } else if (metodeTerpilih === "dana") {
    isi.innerHTML = `
      <h3>Pembayaran DANA</h3>
      <div class="box">
        <p>Nomor DANA</p>
        <h2>081234567890</h2>
      </div>
      <button class="copy" onclick="copy('081234567890')">Salin Nomor</button>
    `;
  } else if (metodeTerpilih === "bri") {
    isi.innerHTML = `
      <h3>Transfer Bank BRI</h3>
      <div class="box">
        <p>No Rekening</p>
        <h2>123401234567890</h2>
        <p>a.n Open Trip Pendakian</p>
      </div>
      <button class="copy" onclick="copy('123401234567890')">Salin Rekening</button>
    `;
  }

  statusBox.style.display = "block";
}

function copy(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showToast("Nomor berhasil disalin"))
      .catch(() => showToast("Gagal menyalin, silakan salin manual"));
  } else {
    showToast("Fitur salin tidak tersedia di browser ini");
  }
}

function verifikasi() {
  if (timeLeft <= 0) {
    showToast("Waktu pembayaran sudah habis");
    return;
  }

  btnBayar.disabled = true;
  btnBayar.textContent = "Memverifikasi...";
  status.textContent = "⏳ Sedang memverifikasi pembayaran...";
  status.className = "status-pending";

  setTimeout(() => {
    status.textContent = "✅ Pembayaran Berhasil";
    status.className = "status-success";
    sessionStorage.setItem("paymentStatus", "berhasil");
    window.location.href = "success.html";
  }, 1800);
}

invoiceEl.textContent = invoice;
totalEl.textContent = formatRupiah(amount);
renderBookingSummary();
renderPembayaran(metode);
startTimer();