const inviteData = {
  bride: "ZERRİN",
  groom: "MUSTAFA",
  eventDate: "2026-11-22T18:00:00+03:00",
  dateText: "31 Kasım 2026",
  dayText: "Pazar",
  timeText: "18:00",
  venue: "Assos Davet Evi",
  city: "Bağcılar / İstanbul",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Assos%20Davet%20Evi%20Bagcilar&query_place_id=ChIJNUlE3talyhQRu9fy10d6omk",
  whatsappNumber: "905397233079"
};

const $ = (id) => document.getElementById(id);

function setScale(){
  const cardW = 760;
  const viewportW = window.innerWidth;
  const desktopMaxScale = 1;
  const scale = Math.min(desktopMaxScale, viewportW / cardW);
  document.documentElement.style.setProperty('--scale', scale.toFixed(5));
}
window.addEventListener('resize', setScale);
window.addEventListener('orientationchange', setScale);
setScale();

$("brideName").textContent = inviteData.bride;
$("groomName").textContent = inviteData.groom;
$("dateText").textContent = inviteData.dateText;
$("dayText").textContent = inviteData.dayText;
$("timeText").textContent = inviteData.timeText;
$("venueText").textContent = inviteData.venue;
$("cityText").textContent = inviteData.city;
$("mapLink").href = inviteData.mapsUrl;

const params = new URLSearchParams(window.location.search);
const guest = params.get("guest");
if (guest) {
  const decodedGuest = guest.trim();
  $("guestLine").textContent = `Sevgili ${decodedGuest}`;
  $("guestLine").classList.add("show");
}

function pad(n){ return String(n).padStart(2,"0"); }
function updateCountdown(){
  const target = new Date(inviteData.eventDate).getTime();
  const diff = target - Date.now();
  if (diff <= 0) {
    document.querySelector(".countdown-section h2").textContent = "BU GÜZEL GÜN BAŞLADI";
    ["days","hours","minutes","seconds"].forEach(id => $(id).textContent = "00");
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  $("days").textContent = pad(days);
  $("hours").textContent = pad(hours);
  $("minutes").textContent = pad(minutes);
  $("seconds").textContent = pad(seconds);
}
updateCountdown();
setInterval(updateCountdown, 1000);

function whatsappMessage(status){
  const guestText = guest ? `\nDavetli: ${guest}` : "";
  return encodeURIComponent(`Merhaba, Mustafa & Zerrin nişan davetiniz için teşekkür ederim katılım durumum: ${status}\n${guestText}`);
}
$("joinBtn").href = `https://wa.me/${inviteData.whatsappNumber}?text=${whatsappMessage("KATILIYORUM")}`;
$("notJoinBtn").href = `https://wa.me/${inviteData.whatsappNumber}?text=${whatsappMessage("KATILAMIYORUM")}`;

const music = $("bgMusic");
const musicBtn = $("musicBtn");

function setMusicState(playing){
  musicBtn.classList.toggle("playing", playing);
  musicBtn.setAttribute("aria-label", playing ? "Müziği durdur" : "Müziği çal");
}

function tryAutoplay(){
  music.play()
    .then(() => setMusicState(true))
    .catch(() => {
      const startOnInteraction = () => {
        music.play().then(() => setMusicState(true)).catch(() => {});
      };
      document.addEventListener("click", startOnInteraction, { once: true });
      document.addEventListener("touchend", startOnInteraction, { once: true });
      document.addEventListener("keydown", startOnInteraction, { once: true });
    });
}
tryAutoplay();

musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (music.paused) {
    music.play().then(() => setMusicState(true)).catch(() => {});
  } else {
    music.pause();
    setMusicState(false);
  }
});
