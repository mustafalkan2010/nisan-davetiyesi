const eventDate = new Date('2026-07-31T19:30:00+03:00').getTime();
const whatsappNumber = '905397233079';

const params = new URLSearchParams(window.location.search);
const guest = params.get('guest');
const inviteId = params.get('id');

const guestEl = document.getElementById('guestName');
if (guest && guest.trim()) {
  guestEl.textContent = `Sevgili ${guest}`;
  guestEl.classList.add('show');
}

function updateCountdown(){
  const now = Date.now();
  const distance = eventDate - now;
  if(distance <= 0){
    document.querySelector('.countdown-block h2').textContent = 'BU GÜZEL GÜN BAŞLADI';
    ['days','hours','minutes','seconds'].forEach(id => document.getElementById(id).textContent = '00');
    return;
  }
  const d = Math.floor(distance / (1000*60*60*24));
  const h = Math.floor((distance / (1000*60*60)) % 24);
  const m = Math.floor((distance / (1000*60)) % 60);
  const s = Math.floor((distance / 1000) % 60);
  document.getElementById('days').textContent = String(d).padStart(2,'0');
  document.getElementById('hours').textContent = String(h).padStart(2,'0');
  document.getElementById('minutes').textContent = String(m).padStart(2,'0');
  document.getElementById('seconds').textContent = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

function makeMessage(status){
  const who = guest ? `\nDavetli: ${guest}` : '';
  const id = inviteId ? `\nDavet No: ${inviteId}` : '';
  return encodeURIComponent(`Merhaba, Mustafa & Zerrin nişan davetine ${status}.${who}${id}`);
}

document.getElementById('joinButton').href = `https://wa.me/${whatsappNumber}?text=${makeMessage('katılıyorum')}`;
document.getElementById('notJoinButton').href = `https://wa.me/${whatsappNumber}?text=${makeMessage('maalesef katılamıyorum')}`;
