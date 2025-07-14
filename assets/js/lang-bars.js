document.addEventListener('DOMContentLoaded', () => {

  const COLOR = { // full GitHub-Linguist palette truncated for brevity
    'C':'#555','C++':'#f34b7d','Python':'#3572A5','Shell':'#89e051',
    'JavaScript':'#f1e05a','TypeScript':'#3178c6','Dockerfile':'#384d54',
    'Makefile':'#427819','CMake':'#DA3434','HTML':'#e34c26','CSS':'#563d7c',
    'Rust':'#dea584','Assembly':'#6E4C13','Verilog':'#b2b7f8','VHDL':'#adb2cb'
  };
  const DEFAULT='#8e8e8e', pct=n=>`${(n*100).toFixed(1)}%`;

  document.querySelectorAll('[data-repo]').forEach(async card=>{
    try{
      const repo=card.dataset.repo;
      const r=await fetch(`https://api.github.com/repos/${repo}/languages`);
      if(!r.ok) throw 0;
      const bytes=await r.json(),total=Object.values(bytes).reduce((a,b)=>a+b,0);
      if(!total) return;

      /* Top 6, hide <1 % */
      const langs=Object.entries(bytes)
                        .map(([l,b])=>[l,b/total])
                        .filter(([,s])=>s>=0.01)
                        .sort((a,b)=>b[1]-a[1])
                        .slice(0,6);

      /* widget shell */
      const w=document.createElement('div');
      w.className='lang-widget';
      w.innerHTML=`<div class="lang-title">Languages</div>
                   <div class="lang-bar"></div>
                   <div class="lang-legend"></div>`;
      const bar=w.querySelector('.lang-bar'),leg=w.querySelector('.lang-legend');

      let x=0;
      langs.forEach(([lang,share])=>{
        const slice=document.createElement('div');
        slice.className='lang-slice';
        slice.style.left=x+'%';
        slice.style.width=share*100+'%';
        slice.style.background=COLOR[lang]||DEFAULT;
        bar.append(slice); x+=share*100;

        const item=document.createElement('span');
        item.innerHTML=`<span class="lang-dot" style="background:${COLOR[lang]||DEFAULT}"></span>
                        <strong>${lang}</strong> ${pct(share)}`;
        leg.append(item);
      });

      /* inject before GitHub button */
      const btn=card.querySelector('a.btn');
      btn?btn.before(w):card.append(w);

    }catch{console.log('widget failed')}
  });
});
