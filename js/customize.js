function setCookie(name, value) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; path=/";
}

// Fungsi untuk mengambil nilai dari cookie
function getCookie(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return decodeURIComponent(cookie.substring(cookieName.length));
        }
    }
    return "";
}

// Inisialisasi nilai dari cookie saat halaman dimuat
const savedNamaMasjid = getCookie("nama_masjid");
const savedAlamatMasjid = getCookie("alamat_masjid");

// SETTING INFO LOKAL

const inputNamaMasjid = document.getElementById("input-nama-masjid");
const inputAlamatMasjid = document.getElementById("input-alamat-masjid");
const outputNamaMasjid = document.getElementById("nama-masjid");
const outputLokasiMasjid = document.getElementById("lokasi-masjid");
const simpanInfoLokal = document.getElementById("simpan-info-lokal");

inputNamaMasjid.value = savedNamaMasjid;
inputAlamatMasjid.value = savedAlamatMasjid;
outputNamaMasjid.innerHTML = savedNamaMasjid;
outputLokasiMasjid.innerHTML = savedAlamatMasjid;

function settingInfoLokal(){
    inm = inputNamaMasjid.value;
    iam = inputAlamatMasjid.value;
    outputNamaMasjid.innerHTML = inm;
    outputLokasiMasjid.innerHTML = iam;

    // Simpan nilai dalam cookie dengan nama yang sesuai
    setCookie("nama_masjid", inm);
    setCookie("alamat_masjid", iam);

    console.log(inm, iam);
    alert('Pengaturan di simpan');
}

simpanInfoLokal.addEventListener("click", settingInfoLokal);

// SETTING INFO LOKAL END

