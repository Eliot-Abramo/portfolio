
/* === Unified JavaScript (add these snippets to the end of your existing script.js) === */

// Expand project cards & reveal details
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.classList.add('hover'));
  card.addEventListener('mouseleave', () => card.classList.remove('hover'));
});

// GitHub language bar (assumes each project card has data-repo="username/repo")
async function drawLanguageBars(){
  const cards = document.querySelectorAll('.project-card[data-repo]');
  for (const card of cards){
    const repo = card.dataset.repo;
    try{
      const res = await fetch(`https://api.github.com/repos/${repo}/languages`);
      if(!res.ok) throw new Error('Network');
      const data = await res.json();
      const total = Object.values(data).reduce((a,b)=>a+b,0);
      const bar = document.createElement('div');
      bar.className='language-bar';
      Object.entries(data).forEach(([lang,bytes])=>{
        const span = document.createElement('span');
        span.style.width = ((bytes/total)*100).toFixed(2)+'%';
        span.title = lang + ' ' + ((bytes/total)*100).toFixed(1)+'%';
        bar.appendChild(span);
      });
      card.appendChild(bar);
    }catch(e){console.error('Languages API failed',e);}
  }
}
drawLanguageBars();

// Contact form mailto handler
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = encodeURIComponent(form.name.value);
    const email = encodeURIComponent(form.email.value);
    const message = encodeURIComponent(form.message.value);
    window.location.href = `mailto:eliot.abramo@epfl.ch?subject=Portfolio Contact from ${name}&body=${message}%0D%0A%0D%0AReply to: ${email}`;
  });
}
