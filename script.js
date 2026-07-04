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
  whatsappNumber: "905397233079"
};

const $ = (id) => document.getElementById(id);

$("brideName").textContent = inviteData.bride;
$("groomName").textContent = inviteData.groom;
$("eventDateText").textContent = inviteData.dateText;
$("eventDayText").textContent = inviteData.dayText;
$("eventTimeText").textContent = inviteData.timeText;
$("venueName").textContent = inviteData.venue;
$("venueCity").textContent = inviteData.city;
$("mapButton").href = inviteData.mapsUrl;

const params = new URLSearchParams(window.location.search);
const guest = params.get("guest") || "";

if (guest.trim()) {
  $("guestLine").textContent = `Sevgili ${guest}`;
}

function updateCountdown() {
  const eventTime = new Date(inviteData.eventDate).getTime();
  const now = Date.now();
  const distance = eventTime - now;

  if (distance <= 0) {
    document.querySelector(".countdown-section h2").textContent = "BU GÜZEL GÜN BAŞLADI";
    ["days", "hours", "minutes", "seconds"].forEach(id => $(id).textContent = "00");
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  $("days").textContent = String(days).padStart(2, "0");
  $("hours").textContent = String(hours).padStart(2, "0");
  $("minutes").textContent = String(minutes).padStart(2, "0");
  $("seconds").textContent = String(seconds).padStart(2, "0");
}

function buildWhatsappMessage(status) {
  const guestLine = guest ? `\nDavetli: ${guest}` : "";
  return encodeURIComponent(
    `Merhaba, Mustafa & Zerrin nişan daveti için katılım durumum: ${status}.${guestLine}`
  );
}

$("joinButton").href = `https://wa.me/${inviteData.whatsappNumber}?text=${buildWhatsappMessage("KATILIYORUM")}`;
$("notJoinButton").href = `https://wa.me/${inviteData.whatsappNumber}?text=${buildWhatsappMessage("KATILAMIYORUM")}`;

setInterval(updateCountdown, 1000);
updateCountdown();
