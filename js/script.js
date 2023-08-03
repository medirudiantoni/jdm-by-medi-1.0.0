const jam = document.querySelector("#jam .jam-menit");
const detik = document.querySelector("#jam .detik");
const hari = document.getElementById("hari");
const tanggal = document.getElementById("tanggal");
const tahun = document.getElementById("tahun");
// const namaMasjid = document.getElementById("nama-masjid");
// const lokasiMasjid = document.getElementById("lokasi-masjid");
const subuh = document.getElementById("subuh");
const syuruq = document.getElementById("syuruq");
const dzuhur = document.getElementById("dzuhur");
const ashar = document.getElementById("ashar");
const maghrib = document.getElementById("maghrib");
const isya = document.getElementById("isya");
const runningText = document.querySelectorAll(".running-text-item");
const alarmSound = document.getElementById("alarm-sound");
const alarmSound2 = document.getElementById("alarm-sound-2");
const waktunyaAdzan = document.getElementById("waktunya-adzan");
const hitungMundur = document.getElementById("hitung-mundur");

function updateClock() {
  const now = new Date();

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const days = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
  const day = days[now.getDay()];

  const date = now.getDate().toString().padStart(2, "0");
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const month = months[now.getMonth()];

  const year = now.getFullYear();

  jam.textContent = `${hours}:${minutes}`;
  detik.textContent = `:${seconds}`;
  hari.innerText = `${day}, `;
  tanggal.innerHTML = `${date}-${month}`;
  tahun.innerHTML = `-${year}`;
}

setInterval(updateClock, 1000);

// updateClock();

// namaMasjid.innerHTML = "Masjid <br>AT-Tahkim";
// lokasiMasjid.innerHTML =
//   "Jl. KH Ahmad Dahlan Jl. Suronatan No. 73 Notoprajan, Ngampilan, Kota Yogyakarta";
// subuh.innerHTML = "04:33";
// syuruq.innerHTML = "05:51";
// dzuhur.innerHTML = "11:45";
// ashar.innerHTML = "15:07";
// maghrib.innerHTML = "18:31";
// isya.innerHTML = "20:51";
runningText.forEach((e) => {
  e.innerHTML =
    " Ahlan wa sahlan Ahlan wa sahlan Ahlan wa sahlan Ahlan wa sahlan Ahlan wa sahlan Ahlan wa sahlan Ahlan wa sahlan Ahlan wa sahlan Ahlan wa sahlan ";
});

// DELAY

const delayForStop = 5000;

// DELAY END

// FUNGSI ADZAN

function alarmSholat(namaSholat, strNamaSholat) {
  function adzan(timeOut, namaSholat) {
    let timeOutText = timeOut + "000";
    let timeOutInt = parseInt(timeOutText);
    waktunyaAdzan.style.display = "flex";
    waktunyaAdzan.innerHTML = `waktunya adzan ${namaSholat}`;

    setTimeout(() => {
      waktunyaAdzan.style.display = "none";
    }, timeOutInt);
  }

  // FUNGSI ADZAN END

  // FUNGSI IQAMAH

  // function iqamah() {
  //   hitungMundur.style.fontSize = "12vw";
  //   hitungMundur.style.fontWeight = "800";
  //   hitungMundur.innerHTML = "Waktunya iqamah";
  //   setTimeout(() => {
  //     hitungMundur.style.display = "none";
  //     console.log("hilang");
  //     alarmSound2.pause();
  //   }, delayForStop);
  // }

  // FUNGSI IQAMAH END

  // FUNGSI HITUNG MUNDUR

  const countdown = (m) => {
    var counter = 0;
    var timeleft = m * 60;
    function convertSeconds(s) {
      var min = Math.floor(s / 60);
      var sec = s % 60;
      var nfmin = String(min).padStart(2, "0");
      var nfsec = String(sec).padStart(2, "0");
      return nfmin + ":" + nfsec;
    }
    function tik() {
      hitungMundur.style.display = "flex";
      hitungMundur.style.fontSize = "15vw";
      var x = setInterval(() => {
        counter++;
        console.log(counter, timeleft);
        hitungMundur.innerHTML = convertSeconds(timeleft - counter);
        if (counter > timeleft) {
          clearInterval(x);
          hitungMundur.style.fontSize = "12vw";
          hitungMundur.style.fontWeight = "800";
          hitungMundur.innerHTML = "Waktunya iqamah";
          alarmSound.play()
          setTimeout(() => {
            hitungMundur.style.display = "none";
            console.log("hilang");
            alarmSound.pause();
            alarmSound.currentTime = 0;
          }, 5000);
        }
      }, 1000);
    }
    tik();
  };

  // FUNGSI HITUNG MUNDUR END \\\

  // FUNGSI ALARM SHOLAT

  let alarmAlreadyTriggered = false;

  const setAlarm = (namaSholat, strNamaSholat) => {
    const intervalId = setInterval(() => {
      const jamLive = jam.innerHTML;
      const jadwalSholat = namaSholat.innerHTML;
      if (jamLive === jadwalSholat && !alarmAlreadyTriggered) {
        console.log("waktunya adzan");
        alarmSound.play();
        adzan(10, strNamaSholat);
        setTimeout(() => {
          countdown(0.1);
          console.log("done");
          alarmSound.pause();
          alarmSound.currentTime = 0;
          clearInterval(intervalId);
        }, 5000);
        alarmAlreadyTriggered = true;
      }
    }, 1000);
  };
  setAlarm(namaSholat, strNamaSholat);

  // FUNGSI ALARM SHOLAT END \\\
}

// MENAMPILKAN JADWAL SHOLAT
// FETCH DATA JADWAL SHOLAT DARI FILE JSON

function fetchJSONFile(path, callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", path, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send(null);
}

// Fungsi untuk mengubah format waktu menjadi "00:00"
function formatTime(time) {
  var timeArray = time.split(":");
  var hour = timeArray[0];
  var minute = timeArray[1];
  return hour + ":" + minute;
}

function getSubuhScheduleByDate(data, tanggal, bulan) {
  var jadwalSubuh = data.find(function (item) {
    return item.Tanggal === tanggal && item.Bulan === bulan;
  });

  if (jadwalSubuh) {
    var waktuSubuh = formatTime(jadwalSubuh.Subuh);
    let [jam, menit] = waktuSubuh.split(":").map(Number);
    menit += 8;
    if (menit >= 60) {
      jam += Math.floor(menit / 60);
      menit %= 60;
    }
    jam = jam.toString().padStart(2, "0");
    menit = menit.toString().padStart(2, "0");
    let waktuSubuhBaru = `${jam}:${menit}`;
    var waktuTerbit = formatTime(jadwalSubuh.Terbit);
    var waktuDzuhur = formatTime(jadwalSubuh.Dzuhur);
    var waktuAshar = formatTime(jadwalSubuh.Ashar);
    var waktuMaghrib = formatTime(jadwalSubuh.Maghrib);
    var waktuIsya = formatTime(jadwalSubuh.Isya);
    subuh.innerHTML = waktuSubuhBaru;
    syuruq.innerHTML = waktuTerbit;
    dzuhur.innerHTML = waktuDzuhur;
    ashar.innerHTML = waktuAshar;
    maghrib.innerHTML = waktuMaghrib;
    isya.innerHTML = waktuIsya;
  } else {
    console.log(
      "Data sholat Subuh tidak ditemukan pada tanggal " +
        tanggal +
        " " +
        bulan +
        "."
    );
  }
}

// Memanggil fungsi untuk mengambil data JSON
function updateJadwalSholat() {
  fetchJSONFile("./assets/data/jadwal_sholat.json", function (data) {
    const now = new Date();
    const date = now.getDate().toString().padStart(2, "0");
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const month = months[now.getMonth()];

    var hariIni = `${date}-${month}`;
    var tanggal = parseInt(hariIni.split("-")[0]);
    var bulan = hariIni.split("-")[1];

    getSubuhScheduleByDate(data, tanggal, bulan);
  });
}

setInterval(function () {
  var now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    updateJadwalSholat();
  }
}, 3600000);

updateJadwalSholat();

// MENAMPILKAN JADWAL SHOLAT END











// EKSEKUSI ALARM SHOLAT

alarmSholat(subuh, "subuh");
alarmSholat(dzuhur, "dzuhur");
alarmSholat(ashar, "ashar");
alarmSholat(maghrib, "maghrib");
alarmSholat(isya, "isya");

// EKSEKUSI ALARM SHOLAT END



// // JavaScript
// function playAlarmSound() {
//   const alarmAudio = document.getElementById('alarm-sound');
//   alarmAudio.play()
//     .then(() => {
//       console.log("Audio diputar!");
//     })
//     .catch(error => {
//       console.error("Kesalahan pemutaran audio:", error);
//     });
// }

function checkAndPlayAlarm() {
  const targetHour = 21;
  const targetMinute = 14;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  if (currentHour === targetHour && currentMinute === targetMinute) {
    playAlarmSound();
  }
}

// Periksa waktu setiap detik (1000 milidetik)
setInterval(checkAndPlayAlarm, 1000);
