// /* assets/js/lang-bars.js  ─  GitHub-style language bars */
// (async () => {

//   /* --- GitHub-Linguist colour map (top 60 languages + fallback) --- */
//   const COLOR = {
//     'C'           : '#555555',
//     'C++'         : '#f34b7d',
//     'C#'          : '#178600',
//     'CSS'         : '#563d7c',
//     'HTML'        : '#e34c26',
//     'Java'        : '#b07219',
//     'JavaScript'  : '#f1e05a',
//     'TypeScript'  : '#3178c6',
//     'Python'      : '#3572A5',
//     'Ruby'        : '#701516',
//     'Rust'        : '#dea584',
//     'Go'          : '#00ADD8',
//     'Shell'       : '#89e051',
//     'Assembly'    : '#6E4C13',
//     'Makefile'    : '#427819',
//     'MATLAB'      : '#e16737',
//     'PHP'         : '#4F5D95',
//     'Swift'       : '#ffac45',
//     'Kotlin'      : '#A97BFF',
//     'Haskell'     : '#5e5086',
//     'Dockerfile'  : '#384d54',
//     'JSON'        : '#292929',
//     'TeX'         : '#3D6117',
//     'Verilog'     : '#b2b7f8',
//     'VHDL'        : '#adb2cb',
//     'OCaml'       : '#3be133',
//     'Erlang'      : '#B83998',
//     'Dart'        : '#00B4AB',
//     'R'           : '#198CE7',
//     'PowerShell'  : '#012456',
//     'Prolog'      : '#74283c',
//     'CUDA'        : '#3A4E3A',
//     'Objective-C' : '#438eff',
//     'Assembly'    : '#6E4C13'
//   };
//   const FALLBACK = '#c6538c';                         // default colour
//   const pct    = n => `${Math.round(n * 10) / 10}%`;

//   /* one fetch per card */
//   for (const card of document.querySelectorAll('[data-repo]')) {
//     const repo = card.dataset.repo;
//     const bar  = card.querySelector('.lang-bar');
//     if (!bar) continue;

//     try {
//       const r = await fetch(`https://api.github.com/repos/${repo}/languages`);
//       if (!r.ok) throw 0;
//       const data  = await r.json();
//       const total = Object.values(data).reduce((a, b) => a + b, 0);
//       const top   = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, 6);

//       /* coloured slices */
//       let offset = 0;
//       top.forEach(([lang, bytes]) => {
//         const slice = document.createElement('div');
//         slice.className       = 'lang-slice';
//         slice.style.background = COLOR[lang] || FALLBACK;
//         slice.style.left      = offset + '%';
//         const w = bytes / total * 100;
//         slice.style.width = w + '%';
//         bar.append(slice);
//         offset += w;
//       });

//       /* legend */
//       const legend = document.createElement('div');
//       legend.className = 'lang-legend';
//       top.forEach(([lang, bytes]) => {
//         const span = document.createElement('span');
//         span.innerHTML =
//           `<span class="lang-dot" style="background:${COLOR[lang] || FALLBACK}"></span>
//            <strong>${lang}</strong> ${pct(bytes / total)}`;
//         legend.append(span);
//       });
//       bar.after(legend);

//     } catch (e) {
//       console.log('language-bar error for', repo);
//     }
//   }
// })();


/* Perfect-clone GitHub Language widget */
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
