// Draw responsive animated traces from center to cards
document.addEventListener('DOMContentLoaded', () => {
  const svg = document.querySelector('.pcb-svg');

  function updateTraces() {
    // Clear existing lines and dots
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // Get center of the SVG container
    const { width: svgW, height: svgH, left: svgL, top: svgT } = svg.getBoundingClientRect();
    const cx = svgW / 2;
    const cy = svgH / 2;

    // Loop through each card to connect it with an animated trace
    document.querySelectorAll('.about-card').forEach((card, idx) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = left + width / 2 - svgL;
      const y = top + height / 2 - svgT;

      // Create the animated path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${cx},${cy} L${x},${y}`);
      path.classList.add('trace');
      svg.appendChild(path);

      // Animate the stroke-dashoffset
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      anim.setAttribute('attributeName', 'stroke-dashoffset');
      anim.setAttribute('from', length);
      anim.setAttribute('to', 0);
      anim.setAttribute('dur', '5s');
      anim.setAttribute('fill', 'freeze');
      anim.setAttribute('id', `dash${idx + 1}`);
      anim.setAttribute('begin', idx === 0 ? '0s' : `dash${idx}.end+0.5s`);
      path.appendChild(anim);

      // Create the moving dot
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', '4');
      dot.classList.add('dot');
      svg.appendChild(dot);

      const motion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
      motion.setAttribute('path', `M${cx},${cy} L${x},${y}`);
      motion.setAttribute('dur', '3s');
      motion.setAttribute('begin', `dash${idx + 1}.end+0.1s`);
      motion.setAttribute('repeatCount', 'indefinite');
      dot.appendChild(motion);
    });
  }

  window.addEventListener('resize', updateTraces);
  updateTraces();
});

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.projects-grid .card').forEach(card=>{
    // Prefer first primary link: pdf > github > any <a>
    const link = card.querySelector('a[href$=".pdf"], a[href*="github.com"], a[href^="http"], a[href$=".html"]');
    if(!link) return;
    card.style.cursor = 'pointer';
    card.addEventListener('click', e=>{
      if(e.target.closest('a')) return; // keep normal anchor behavior
      const target = link.getAttribute('target') || '_blank';
      window.open(link.href, target);
    });
  });
});