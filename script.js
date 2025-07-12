/* Parallax blobs & scroll reveal */
document.addEventListener('DOMContentLoaded',()=>{
  const blobs=document.querySelectorAll('.blob');
  window.addEventListener('mousemove',e=>{
    const x=(e.clientX/window.innerWidth - 0.5)*30;
    const y=(e.clientY/window.innerHeight - 0.5)*30;
    blobs.forEach((b,i)=>{
      const speed=i===0?1.2:0.8;
      b.style.transform=`translate(calc(-50% + ${x*speed}px), calc(-50% + ${y*speed}px))`;
    });
  });
  // Reveal on scroll
  const revealEls=[...document.querySelectorAll('.reveal')];
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },{threshold:.15});
  revealEls.forEach(el=>obs.observe(el));
});