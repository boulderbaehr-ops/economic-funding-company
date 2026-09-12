// EFC contact inquiry handling.
// Add a verified recipient to enable opening an inquiry in the visitor's email app.
const contactEmail = "";
const form = document.querySelector('.contact-form');
if (form) {
 const status = document.getElementById('contact-status');
 if (contactEmail) {
  const link = document.createElement('a');
  link.href = 'mailto:' + contactEmail; link.textContent = contactEmail;
  document.getElementById('contact-email').replaceChildren(link);
  form.querySelector('button').textContent = 'Open email draft';
  status.textContent = 'Prepare an inquiry and open it in your email app to review and send.';
 }
 form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const body = ['Name: '+data.get('name'), 'Email: '+data.get('email'), 'Organization: '+data.get('organization'), '', data.get('message')].join('\n');
  if (contactEmail) {
   location.href = 'mailto:'+contactEmail+'?subject='+encodeURIComponent('Economic Funding Company inquiry')+'&body='+encodeURIComponent(body);
   status.textContent = 'Email draft requested. Review and send it in your email app. This website has not sent your inquiry.';
  } else {
   const url = URL.createObjectURL(new Blob([body], {type: 'text/plain;charset=utf-8'}));
   const link = document.createElement('a'); link.href = url; link.download = 'efc-inquiry.txt'; link.click();
   setTimeout(() => URL.revokeObjectURL(url), 1000);
   status.textContent = 'Your inquiry was downloaded. It has not been sent.';
  }
 });
}

// Rotate supplied artwork, keeping alternative text synchronized.
const logo = document.getElementById('rotating-logo');
const toggle = document.getElementById('logo-rotation-toggle');
if (logo && toggle) {
 const logos = [{"src":"assets/master-logo.png","alt":"Economic Funding Company"},{"src":"assets/california-logo.png","alt":"California Economic Funding Company"},{"src":"assets/colorado-logo.png","alt":"Colorado Economic Funding Company"},{"src":"assets/canada-logo.png","alt":"Canada Economic Funding Company"},{"src":"assets/ecuador-logo.png","alt":"Ecuador Funding Company"},{"src":"assets/mississippi-logo.png","alt":"Mississippi Economic Funding Corporation"}];
 const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
 let paused = reducedMotion.matches, current = 0, timer;
 toggle.hidden = false;
 function sync() {
  clearInterval(timer);
  toggle.textContent = paused ? 'Play logos' : 'Pause logos';
  toggle.setAttribute('aria-pressed', String(paused));
  if (!paused && !document.hidden) timer = setInterval(() => {
   current = (current + 1) % logos.length;
   logo.src = logos[current].src; logo.alt = logos[current].alt;
  }, 4000);
 }
 toggle.addEventListener('click', () => { paused = !paused; sync(); });
 reducedMotion.addEventListener('change', event => { paused = event.matches; sync(); });
 document.addEventListener('visibilitychange', sync);
 sync();
}
