const inviteData = {
  bride: "ZERRİN",
  groom: "MUSTAFA",
  eventDate: "2026-07-31T19:30:00+03:00",
  dateText: "31 Temmuz 2026",
  dayText: "Cuma",
  timeText: "19:30",
  venue: "Barış'ın Çiftlik Evi",
  city: "Eyüpsultan / İstanbul",
  mapsUrl: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIRCAEQLhgKGA0YrwEYxwEYgAQyCggCEAAYChgWGB4yBwgDEAAY7wUyCggEEAAYgAQYogQyCggFEAAYgAQYogTSAQgzNTI2ajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=tr&sa=X&geocode=KV-nZDJI_Z9AMWyVIHyoCR4D&daddr=A%C4%9Fa%C3%A7l%C4%B1,+karaa%C4%9Fa%C3%A7+sokak+No:16,+34076+Ey%C3%BCpsultan/%C4%B0stanbul",
  whatsappNumber: "905397233079",
  googleFormBaseUrl: ""
};

const $ = (id) => document.getElementById(id);
$("brideName").textContent = inviteData.bride;
$("groomName").textContent = inviteData.groom;
$("eventDateText").textContent = inviteData.dateText;
$("eventDayText").textContent = inviteData.dayText;
$("eventTimeText").textContent = inviteData.timeText;
$("venueName").textContent = inviteData.venue;
$("cityText").textContent = inviteData.city;
$("mapButton").href = inviteData.mapsUrl;
$("mapButtonSmall").href = inviteData.mapsUrl;

const params = new URLSearchParams(window.location.search);
const guest = params.get("guest") || "";
const guestId = params.get("id") || "";
if (guest) $("guestMessage").textContent = `Sevgili ${guest}, bu davetiye sizin için özel hazırlanmıştır.`;

function pad(n){ return String(n).padStart(2,"0"); }
function updateCountdown(){
  const diff = new Date(inviteData.eventDate).getTime() - Date.now();
  if(diff <= 0){
    document.querySelector(".countdown-section h2").textContent = "BU GÜZEL GÜN BAŞLADI";
    ["days","hours","minutes","seconds"].forEach(id => $(id).textContent = "00");
    return;
  }
  $("days").textContent = pad(Math.floor(diff / 86400000));
  $("hours").textContent = pad(Math.floor(diff / 3600000) % 24);
  $("minutes").textContent = pad(Math.floor(diff / 60000) % 60);
  $("seconds").textContent = pad(Math.floor(diff / 1000) % 60);
}
setInterval(updateCountdown, 1000); updateCountdown();

function whatsappUrl(status){
  const name = guest || "Davetli";
  const idLine = guestId ? `\nDavet No: ${guestId}` : "";
  const msg = `Merhaba, Mustafa & Zerrin nişan daveti için katılım durumum:\n\nİsim: ${name}${idLine}\nDurum: ${status}`;
  return `https://wa.me/${inviteData.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}
$("joinButton").href = whatsappUrl("KATILIYORUM");
$("notJoinButton").href = whatsappUrl("KATILAMIYORUM");
