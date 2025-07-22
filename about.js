// about.js
document.addEventListener('DOMContentLoaded',()=>{
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('reveal-in');observer.unobserve(e.target);} 
    });
  },{threshold:.2});
  document.querySelectorAll('.strip-card, .principles li, .metric').forEach(el=>{
    el.classList.add('reveal');observer.observe(el);
  });
});

/* minimal CSS hook (append to about.css if you enable about.js)
.reveal{opacity:0;transform:translateY(14px);transition:opacity .5s ease,transform .5s ease;}
.reveal-in{opacity:1;transform:none;}
*/