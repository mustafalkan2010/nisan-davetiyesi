const eventDate = new Date('2026-07-31T19:30:00+03:00');
const whatsappNumber = '905397233079';
const couple = 'Mustafa & Zerrin';

const params = new URLSearchParams(location.search);
const guest = params.get('guest');
const id = params.get('id') || '';

if (guest) {
  document.getElementById('guestLine').textContent = `Sevgili ${guest}, bu davetiye sizin için hazırlanmıştır.`;
}

function pad(n){ return String(n).padStart(2,'0'); }
function tick(){
  const diff = eventDate - new Date();
  if(diff <= 0){
    document.getElementById('days').textContent='00';
    document.getElementById('hours').textContent='00';
    document.getElementById('minutes').textContent='00';
    document.getElementById('seconds').textContent='00';
    return;
  }
  const d = Math.floor(diff/86400000);
  const h = Math.floor(diff/3600000)%24;
  const m = Math.floor(diff/60000)%60;
  const s = Math.floor(diff/1000)%60;
  document.getElementById('days').textContent = pad(d);
  document.getElementById('hours').textContent = pad(h);
  document.getElementById('minutes').textContent = pad(m);
  document.getElementById('seconds').textContent = pad(s);
}
tick(); setInterval(tick,1000);

function wa(status){
  const name = guest || 'Davetli';
  const no = id ? `\nDavet No: ${id}` : '';
  const text = encodeURIComponent(`Merhaba, ${couple} nişan davetine ${status}.\nDavetli: ${name}${no}`);
  return `https://wa.me/${whatsappNumber}?text=${text}`;
}
document.getElementById('joinBtn').href = wa('katılıyorum');
document.getElementById('noBtn').href = wa('maalesef katılamıyorum');
