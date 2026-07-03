const inviteData = {
  bride: "ZERRİN",
  groom: "MUSTAFA",

  eventDate: "2026-07-31T19:30:00",

  dateText: "31 Temmuz 2026",
  dayText: "Cuma",
  timeText: "19:30",

  venue: "Barış'ın Çiftlik Evi",
  city: "Eyüpsultan / İstanbul",

  mapsUrl: "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIRCAEQLhgKGA0YrwEYxwEYgAQyCggCEAAYChgWGB4yBwgDEAAY7wUyCggEEAAYgAQYogQyCggFEAAYgAQYogTSAQgzNTI2ajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=tr&sa=X&geocode=KV-nZDJI_Z9AMWyVIHyoCR4D&daddr=A%C4%9Fa%C3%A7l%C4%B1,+karaa%C4%9Fa%C3%A7+sokak+No:16,+34076+Ey%C3%BCpsultan/%C4%B0stanbul",

  whatsappNumber: "905397233079"
};

document.getElementById("brideName").textContent = inviteData.bride;
document.getElementById("groomName").textContent = inviteData.groom;

document.getElementById("eventDateText").textContent = inviteData.dateText;
document.getElementById("eventTimeText").textContent = inviteData.timeText;
document.getElementById("venueName").textContent = inviteData.venue;

document.querySelector(".detail-box:nth-child(1) small").textContent = inviteData.dayText;
document.querySelector(".detail-box:nth-child(3) small").textContent = inviteData.city;

document.getElementById("mapButton").href = inviteData.mapsUrl;

const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get("guest");

if (guestName) {
  document.getElementById("guestMessage").textContent =
    `Sevgili ${guestName}, sizi aramızda görmekten mutluluk duyarız.`;
}

function updateCountdown() {
  const eventTime = new Date(inviteData.eventDate).getTime();
  const now = new Date().getTime();
  const distance = eventTime - now;

  if (distance <= 0) {
    document.querySelector(".countdown-section h2").textContent = "BU GÜZEL GÜN BAŞLADI";
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

const joinText = encodeURIComponent(
  `Merhaba, Mustafa & Zerrin nişan davetine katılıyorum.`
);

const notJoinText = encodeURIComponent(
  `Merhaba, Mustafa & Zerrin nişan davetine maalesef katılamıyorum.`
);

document.getElementById("joinButton").href =
  `https://wa.me/${inviteData.whatsappNumber}?text=${joinText}`;

document.getElementById("notJoinButton").href =
  `https://wa.me/${inviteData.whatsappNumber}?text=${notJoinText}`;
