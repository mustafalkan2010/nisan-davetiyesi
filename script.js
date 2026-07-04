const eventDate = new Date('2026-07-31T19:30:00+03:00');
const whatsappNumber = '905397233079';

const params = new URLSearchParams(window.location.search);
const guest = params.get('guest');

const guestLine = document.getElementById('guestLine');
if (guest) {
  guestLine.textContent = `Sevgili ${guest}`;
  guestLine.classList.add('show');
}

function pad(n){ return String(n).padStart(2,'0'); }
function tick(){
  const diff = eventDate.getTime() - Date.now();
  const safe = Math.max(0, diff);
  const days = Math.floor(safe / 86400000);
  const hours = Math.floor((safe % 86400000) / 3600000);
  const minutes = Math.floor((safe % 3600000) / 60000);
  const seconds = Math.floor((safe % 60000) / 1000);
  document.getElementById('days').textContent = pad(days);
  document.getElementById('hours').textContent = pad(hours);
  document.getElementById('minutes').textContent = pad(minutes);
  document.getElementById('seconds').textContent = pad(seconds);
}
tick();
setInterval(tick, 1000);

function makeMessage(status){
  const nameLine = guest ? `\nDavetli: ${guest}` : '';
  return encodeURIComponent(`Merhaba, Mustafa & Zerrin nişan daveti için katılım durumum: ${status}.${nameLine}`);
}

document.getElementById('joinButton').href = `https://wa.me/${whatsappNumber}?text=${makeMessage('KATILIYORUM')}`;
document.getElementById('notJoinButton').href = `https://wa.me/${whatsappNumber}?text=${makeMessage('KATILAMIYORUM')}`;
