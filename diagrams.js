/* ============================================================================
   DIAGRAMS — inline SVG, referenced from projects.js and the pages.

   Every diagram is hand-authored SVG with no library and no external image.
   Colours come from the site's CSS custom properties, so the drawings follow
   the light/dark theme without a second copy:

     currentColor    the page foreground (ink)
     var(--signal)   the one accent colour, reserved for what the figure claims
     var(--paper-2)  box fill
     var(--rule)     hairlines

   Reference one from a project with  figures: [{ diagram: 'key', caption }]
   or drop it into a page with  <div data-diagram="key"></div>
   ========================================================================== */

const DIAGRAMS = {

/* -------------------------------------------------------------------------
   L3 — compiler representations and the runtime that executes their output.
   ------------------------------------------------------------------------- */
'l3-pipeline': `
<svg viewBox="0 0 900 328" role="img" xmlns="http://www.w3.org/2000/svg"
     aria-label="L3 source passes through high CPS optimization, closure conversion and hoisting, flat CPS optimization, register allocation and assembly generation, then executes on a C VM with mark-and-sweep garbage collection.">
  <defs>
    <marker id="l3-flow-arrow" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0L10 5L0 10Z" fill="currentColor"/>
    </marker>
  </defs>
  <g font-family="IBM Plex Mono, monospace" font-size="10.5" fill="var(--signal)" letter-spacing="1.2">
    <text x="16" y="22">SCALA / COMPILATION</text>
    <text x="604" y="184">C / EXECUTION</text>
  </g>
  <g fill="var(--paper-2)" stroke="var(--rule)">
    <rect x="16" y="44" width="270" height="90"/>
    <rect x="310" y="44" width="270" height="90"/>
    <rect x="604" y="44" width="280" height="90"/>
    <rect x="16" y="204" width="270" height="90"/>
    <rect x="310" y="204" width="270" height="90"/>
    <rect x="604" y="204" width="280" height="90" stroke="var(--signal)"/>
  </g>
  <g fill="currentColor" font-size="15" font-weight="500">
    <text x="32" y="72">L₃ source → core tree</text>
    <text x="326" y="72">High CPS + optimization</text>
    <text x="620" y="72">Values, closures, hoisting</text>
    <text x="32" y="232">Flat CPS + optimization</text>
    <text x="326" y="232">Registers → assembly</text>
    <text x="620" y="232">C virtual machine</text>
  </g>
  <g fill="currentColor" opacity=".65" font-family="IBM Plex Mono, monospace" font-size="11">
    <text x="32" y="99">expand modules · parse</text>
    <text x="32" y="117">resolve names</text>
    <text x="326" y="99">explicit continuations</text>
    <text x="326" y="117">simplify · inline</text>
    <text x="620" y="99">tag values · capture environments</text>
    <text x="620" y="117">lift nested functions</text>
    <text x="32" y="259">optimize lowered operations</text>
    <text x="32" y="277">bound code growth</text>
    <text x="326" y="259">allocate registers · emit code</text>
    <text x="326" y="277">resolve labels · encode</text>
    <text x="620" y="259">execute 32-bit instructions</text>
    <text x="620" y="277">trace roots · mark · sweep</text>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#l3-flow-arrow)">
    <path d="M286 89H306"/>
    <path d="M580 89H600"/>
    <path d="M744 134V162H151V200"/>
    <path d="M286 249H306"/>
    <path d="M580 249H600"/>
  </g>
</svg>`,


/* -------------------------------------------------------------------------
   Capability stack — the argument the whole site is making, in one picture:
   the same person works at every layer from wave physics to the compiler.
   ------------------------------------------------------------------------- */
'capability-stack': `
<svg viewBox="0 0 900 372" role="img" xmlns="http://www.w3.org/2000/svg"
     aria-label="Five layers of a hardware stack, from device physics up to the compiler, each annotated with the work done at that layer.">
  <defs>
    <marker id="d-arrow-up" viewBox="0 0 10 10" refX="5" refY="9"
            markerWidth="7" markerHeight="7" orient="auto">
      <polygon points="5,0 10,10 0,10" fill="var(--signal)"/>
    </marker>
  </defs>

  <!-- spine -->
  <line x1="14" y1="352" x2="14" y2="24" stroke="var(--signal)" stroke-width="1.5"
        marker-end="url(#d-arrow-up)"/>
  <text x="8" y="200" font-size="10.5" fill="var(--signal)" letter-spacing="1.6"
        text-anchor="middle" transform="rotate(-90 8 200)"
        font-family="IBM Plex Mono, monospace">ABSTRACTION</text>

  <!-- row 5 : compiler -->
  <rect x="38" y="16" width="848" height="62" fill="var(--paper-2)" stroke="var(--rule)"/>
  <text x="56" y="42" font-size="14" fill="currentColor" font-weight="500">Compiler and toolchain</text>
  <text x="56" y="62" font-size="11.5" fill="currentColor" opacity=".62"
        font-family="IBM Plex Mono, monospace">Compigra (MLIR → CGRA assembly) · astrapy design-space exploration · HELIOS · DMA engine</text>
  <text x="868" y="42" font-size="10.5" fill="var(--signal)" text-anchor="end"
        letter-spacing="1.2" font-family="IBM Plex Mono, monospace">EPFL ESL / SEAMS</text>

  <!-- row 4 : rtl -->
  <rect x="38" y="86" width="848" height="62" fill="var(--paper-2)" stroke="var(--rule)"/>
  <text x="56" y="112" font-size="14" fill="currentColor" font-weight="500">RTL and HLS fabric</text>
  <text x="56" y="132" font-size="11.5" fill="currentColor" opacity=".62"
        font-family="IBM Plex Mono, monospace">Versal AI Engine streaming path · HLS FFT and convolution accelerators · VHDL fractal core</text>
  <text x="868" y="112" font-size="10.5" fill="var(--signal)" text-anchor="end"
        letter-spacing="1.2" font-family="IBM Plex Mono, monospace">CERN · EPFL</text>

  <!-- row 3 : firmware -->
  <rect x="38" y="156" width="848" height="62" fill="var(--paper-2)" stroke="var(--rule)"/>
  <text x="56" y="182" font-size="14" fill="currentColor" font-weight="500">Firmware and real-time software</text>
  <text x="56" y="202" font-size="11.5" fill="currentColor" opacity=".62"
        font-family="IBM Plex Mono, monospace">Flight software in C and Rust · ROS 2 ↔ MCU bridge · CAN / SPI / UART transport stacks</text>
  <text x="868" y="182" font-size="10.5" fill="var(--signal)" text-anchor="end"
        letter-spacing="1.2" font-family="IBM Plex Mono, monospace">SpaceLocker · Xplore</text>

  <!-- row 2 : board -->
  <rect x="38" y="226" width="848" height="62" fill="var(--paper-2)" stroke="var(--rule)"/>
  <text x="56" y="252" font-size="14" fill="currentColor" font-weight="500">Board, power and qualification</text>
  <text x="56" y="272" font-size="11.5" fill="currentColor" opacity=".62"
        font-family="IBM Plex Mono, monospace">ECSS payload electronics · analog safing logic · 96-channel HV switching · KiCad tooling</text>
  <text x="868" y="252" font-size="10.5" fill="var(--signal)" text-anchor="end"
        letter-spacing="1.2" font-family="IBM Plex Mono, monospace">SpaceLocker</text>

  <!-- row 1 : physics -->
  <rect x="38" y="296" width="848" height="62" fill="var(--paper-2)" stroke="var(--rule)"/>
  <text x="56" y="322" font-size="14" fill="currentColor" font-weight="500">Device and wave physics</text>
  <text x="56" y="342" font-size="11.5" fill="currentColor" opacity=".62"
        font-family="IBM Plex Mono, monospace">2.4 GHz PIN-diode metasurface · optical GELU activation · 5.8 GHz phased array</text>
  <text x="868" y="322" font-size="10.5" fill="var(--signal)" text-anchor="end"
        letter-spacing="1.2" font-family="IBM Plex Mono, monospace">EPFL LWE</text>
</svg>`,

/* -------------------------------------------------------------------------
   CMS L1 — the streaming path, and where the two latency probes sit.
   The claim: both probes are in the PL domain, so the measured number is a
   round trip through the AIE array, not a one-way estimate.
   ------------------------------------------------------------------------- */
'cms-datapath': `
<svg viewBox="0 0 960 336" role="img" xmlns="http://www.w3.org/2000/svg"
     aria-label="Data path from the processing system through programmable-logic FIFOs, broadcast to two AI Engine inputs, through the AI Engine array and back out, with two latency probes both placed in the programmable-logic domain.">
  <defs>
    <marker id="d-arrow" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="7" markerHeight="7" orient="auto">
      <polygon points="0,0 10,5 0,10" fill="currentColor"/>
    </marker>
    <marker id="d-arrow-s" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="7" markerHeight="7" orient="auto">
      <polygon points="0,0 10,5 0,10" fill="var(--signal)"/>
    </marker>
  </defs>

  <!-- clock domain wash -->
  <line x1="470" y1="34" x2="470" y2="252" stroke="var(--rule)" stroke-width="1"
        stroke-dasharray="4 4"/>
  <line x1="712" y1="34" x2="712" y2="252" stroke="var(--rule)" stroke-width="1"
        stroke-dasharray="4 4"/>
  <text x="250" y="28" font-size="10" fill="currentColor" opacity=".5" text-anchor="middle"
        letter-spacing="1.4" font-family="IBM Plex Mono, monospace">PL CLOCK DOMAIN</text>
  <text x="591" y="28" font-size="10" fill="currentColor" opacity=".5" text-anchor="middle"
        letter-spacing="1.4" font-family="IBM Plex Mono, monospace">AIE DOMAIN</text>
  <text x="836" y="28" font-size="10" fill="currentColor" opacity=".5" text-anchor="middle"
        letter-spacing="1.4" font-family="IBM Plex Mono, monospace">PL CLOCK DOMAIN</text>

  <!-- PS in -->
  <rect x="16" y="112" width="86" height="52" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="59" y="134" font-size="12" fill="currentColor" text-anchor="middle">PS</text>
  <text x="59" y="150" font-size="10" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">DDR</text>

  <!-- probe A -->
  <line x1="102" y1="138" x2="140" y2="138" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow)"/>
  <circle cx="152" cy="138" r="8" fill="none" stroke="var(--signal)" stroke-width="1.5"/>
  <text x="152" y="142" font-size="9" fill="var(--signal)" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">A</text>

  <!-- input FIFO -->
  <line x1="162" y1="138" x2="192" y2="138" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow)"/>
  <rect x="194" y="106" width="128" height="64" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="258" y="128" font-size="12" fill="currentColor" text-anchor="middle">axis_fifo_core</text>
  <text x="258" y="144" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">dual-clock, async CDC</text>
  <text x="258" y="158" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">block-burst admission</text>

  <!-- broadcast -->
  <line x1="322" y1="138" x2="352" y2="138" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow)"/>
  <rect x="354" y="114" width="104" height="48" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="406" y="134" font-size="12" fill="currentColor" text-anchor="middle">axis_broadcast</text>
  <text x="406" y="150" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">1 → 2 streams</text>

  <!-- two PLIO paths -->
  <polyline points="458,130 486,130 486,100 514,100" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow)"/>
  <polyline points="458,146 486,146 486,176 514,176" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow)"/>
  <text x="500" y="92" font-size="9" fill="currentColor" opacity=".55" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">PLIO 0</text>
  <text x="500" y="196" font-size="9" fill="currentColor" opacity=".55" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">PLIO 1</text>

  <!-- AIE array -->
  <rect x="516" y="76" width="150" height="124" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="591" y="100" font-size="12" fill="currentColor" text-anchor="middle">AI Engine array</text>
  <g stroke="var(--rule)" fill="none">
    <rect x="532" y="112" width="26" height="22"/><rect x="564" y="112" width="26" height="22"/>
    <rect x="596" y="112" width="26" height="22"/><rect x="628" y="112" width="26" height="22"/>
    <rect x="532" y="140" width="26" height="22"/><rect x="564" y="140" width="26" height="22"/>
    <rect x="596" y="140" width="26" height="22"/><rect x="628" y="140" width="26" height="22"/>
  </g>
  <text x="591" y="186" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">4 sequential passes · one per head</text>

  <!-- output FIFO -->
  <line x1="666" y1="138" x2="712" y2="138" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow)"/>
  <rect x="716" y="106" width="128" height="64" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="780" y="130" font-size="12" fill="currentColor" text-anchor="middle">output FIFO</text>
  <text x="780" y="148" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">+ elastic buffer</text>

  <!-- probe B -->
  <line x1="844" y1="138" x2="874" y2="138" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow)"/>
  <circle cx="886" cy="138" r="8" fill="none" stroke="var(--signal)" stroke-width="1.5"/>
  <text x="886" y="142" font-size="9" fill="var(--signal)" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">B</text>
  <line x1="896" y1="138" x2="930" y2="138" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow)"/>
  <text x="944" y="142" font-size="11" fill="currentColor" text-anchor="middle">PS</text>

  <!-- measured span -->
  <polyline points="152,222 152,240 886,240 886,222" fill="none" stroke="var(--signal)" stroke-width="1.5"/>
  <rect x="428" y="228" width="182" height="24" fill="var(--paper)"/>
  <text x="519" y="245" font-size="12.5" fill="var(--signal)" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">A → B = 34.02 µs measured</text>

  <!-- side inputs -->
  <rect x="16" y="278" width="150" height="42" fill="none" stroke="var(--rule)" stroke-dasharray="3 3"/>
  <text x="91" y="296" font-size="11" fill="currentColor" opacity=".75" text-anchor="middle">Optical transceiver</text>
  <text x="91" y="311" font-size="9.5" fill="currentColor" opacity=".55" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">live detector-side input</text>
  <polyline points="166,290 258,290 258,172" fill="none" stroke="var(--rule)" stroke-width="1.5"
            stroke-dasharray="3 3" marker-end="url(#d-arrow)"/>

  <rect x="716" y="278" width="150" height="42" fill="none" stroke="var(--rule)" stroke-dasharray="3 3"/>
  <text x="791" y="296" font-size="11" fill="currentColor" opacity=".75" text-anchor="middle">PCIe host control</text>
  <text x="791" y="311" font-size="9.5" fill="currentColor" opacity=".55" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">+ PS-side telemetry</text>
  <polyline points="791,278 791,172" fill="none" stroke="var(--rule)" stroke-width="1.5"
            stroke-dasharray="3 3" marker-end="url(#d-arrow)"/>
</svg>`,

/* -------------------------------------------------------------------------
   CMS L1 — hardware against simulation. The point of the figure is the gap,
   so the gap is the only thing drawn in the signal colour.
   ------------------------------------------------------------------------- */
'cms-latency': `
<svg viewBox="0 0 760 176" role="img" xmlns="http://www.w3.org/2000/svg"
     aria-label="Bar comparison: simulated latency 33.60 microseconds, hardware-measured latency 34.02 microseconds, a gap of 0.42 microseconds or 1.25 percent.">
  <!-- axis -->
  <line x1="150" y1="132" x2="700" y2="132" stroke="var(--rule)"/>
  <g font-size="10" fill="currentColor" opacity=".55" font-family="IBM Plex Mono, monospace" text-anchor="middle">
    <text x="150" y="150">0</text>
    <text x="288" y="150">10</text>
    <text x="425" y="150">20</text>
    <text x="563" y="150">30</text>
    <text x="700" y="150">µs</text>
  </g>
  <g stroke="var(--rule)">
    <line x1="288" y1="128" x2="288" y2="136"/>
    <line x1="425" y1="128" x2="425" y2="136"/>
    <line x1="563" y1="128" x2="563" y2="136"/>
  </g>

  <!-- simulated : 33.60 µs -> 150 + 33.60*13.75 = 611.9 -->
  <text x="138" y="52" font-size="12" fill="currentColor" text-anchor="end">Simulation</text>
  <text x="138" y="66" font-size="9.5" fill="currentColor" opacity=".55" text-anchor="end"
        font-family="IBM Plex Mono, monospace">hw_emu + aiesimulator</text>
  <rect x="150" y="34" width="462" height="30" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="600" y="54" font-size="12.5" fill="currentColor" text-anchor="end"
        font-family="IBM Plex Mono, monospace">33.60</text>

  <!-- hardware : 34.02 µs -> 150 + 34.02*13.75 = 617.7 -->
  <text x="138" y="102" font-size="12" fill="currentColor" text-anchor="end">Hardware</text>
  <text x="138" y="116" font-size="9.5" fill="currentColor" opacity=".55" text-anchor="end"
        font-family="IBM Plex Mono, monospace">VEK280, probes A→B</text>
  <rect x="150" y="84" width="468" height="30" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="600" y="104" font-size="12.5" fill="currentColor" text-anchor="end"
        font-family="IBM Plex Mono, monospace">34.02</text>

  <!-- the gap -->
  <rect x="612" y="84" width="6" height="30" fill="var(--signal)"/>
  <line x1="615" y1="84" x2="615" y2="12" stroke="var(--signal)" stroke-width="1.5"/>
  <text x="624" y="18" font-size="12" fill="var(--signal)" font-family="IBM Plex Mono, monospace">+0.42 µs</text>
  <text x="624" y="32" font-size="10.5" fill="var(--signal)" opacity=".8"
        font-family="IBM Plex Mono, monospace">+1.25 %</text>
</svg>`,

/* -------------------------------------------------------------------------
   ASTRA — where a kernel actually gets stuck. The ILP mapping step is the
   expensive one, and astrapy is the loop that lets you ask it cheaper
   questions before you commit an architecture.
   ------------------------------------------------------------------------- */
'astra-toolchain': `
<svg viewBox="0 0 900 330" role="img" xmlns="http://www.w3.org/2000/svg"
     aria-label="Compilation flow from a C or C++ kernel through MLIR front end, transforms, and integer-linear-programming mapping to CGRA assembly, with a design-space exploration loop feeding architecture parameters back into the mapper.">
  <defs>
    <marker id="d-arrow2" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="7" markerHeight="7" orient="auto">
      <polygon points="0,0 10,5 0,10" fill="currentColor"/>
    </marker>
    <marker id="d-arrow2s" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="7" markerHeight="7" orient="auto">
      <polygon points="0,0 10,5 0,10" fill="var(--signal)"/>
    </marker>
  </defs>

  <!-- IDE / CLI band -->
  <rect x="16" y="16" width="868" height="34" fill="none" stroke="var(--rule)" stroke-dasharray="3 3"/>
  <text x="32" y="38" font-size="11" fill="currentColor" opacity=".7"
        letter-spacing="1.2" font-family="IBM Plex Mono, monospace">IDE + CLI — one entry point for compile, map, validate, debug</text>

  <!-- kernel -->
  <rect x="16" y="94" width="112" height="56" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="72" y="118" font-size="12" fill="currentColor" text-anchor="middle">Kernel</text>
  <text x="72" y="134" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">C / C++</text>

  <line x1="128" y1="122" x2="164" y2="122" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow2)"/>

  <!-- front end -->
  <rect x="166" y="94" width="146" height="56" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="239" y="118" font-size="12" fill="currentColor" text-anchor="middle">Front end</text>
  <text x="239" y="134" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">custom MLIR dialects</text>

  <line x1="312" y1="122" x2="348" y2="122" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow2)"/>

  <!-- middle end -->
  <rect x="350" y="94" width="146" height="56" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="423" y="118" font-size="12" fill="currentColor" text-anchor="middle">Middle end</text>
  <text x="423" y="134" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">transforms, control flow</text>

  <line x1="496" y1="122" x2="532" y2="122" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow2)"/>

  <!-- back end : the expensive step -->
  <rect x="534" y="86" width="176" height="72" fill="var(--paper-2)" stroke="var(--signal)" stroke-width="1.5"/>
  <text x="622" y="110" font-size="12" fill="currentColor" text-anchor="middle">Back end — mapping</text>
  <text x="622" y="126" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">ILP placement + routing</text>
  <text x="622" y="140" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">modulo scheduling</text>

  <line x1="710" y1="122" x2="746" y2="122" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow2)"/>

  <!-- output -->
  <rect x="748" y="94" width="136" height="56" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="816" y="118" font-size="12" fill="currentColor" text-anchor="middle">CGRA assembly</text>
  <text x="816" y="134" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">→ array, → simulator</text>

  <!-- DSE loop -->
  <rect x="350" y="238" width="360" height="60" fill="var(--paper-2)" stroke="var(--signal)"/>
  <text x="530" y="262" font-size="12.5" fill="currentColor" text-anchor="middle">astrapy — design-space exploration</text>
  <text x="530" y="280" font-size="9.5" fill="currentColor" opacity=".62" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">sweep array size, interconnect, II target · rank by cost</text>

  <!-- architecture parameters go in on the left -->
  <polyline points="350,258 316,258 316,122 528,122" fill="none" stroke="var(--signal)"
            stroke-width="1.5" marker-end="url(#d-arrow2s)"/>
  <text x="326" y="200" font-size="10" fill="var(--signal)"
        font-family="IBM Plex Mono, monospace">architecture parameters</text>

  <!-- mapping results come back out of the mapper -->
  <polyline points="622,158 622,232" fill="none" stroke="var(--signal)" stroke-width="1.5"
            stroke-dasharray="4 3" marker-end="url(#d-arrow2s)"/>
  <text x="634" y="200" font-size="10" fill="var(--signal)"
        font-family="IBM Plex Mono, monospace">II, utilisation, feasibility</text>
</svg>`,

/* -------------------------------------------------------------------------
   Safing chain — the claim is that the recovery path does not pass through
   the processor, so it still closes when the processor is the thing that
   failed. That is the only reason the figure exists.
   ------------------------------------------------------------------------- */
'safing-chain': `
<svg viewBox="0 0 880 314" role="img" xmlns="http://www.w3.org/2000/svg"
     aria-label="Two paths on a payload: the nominal software path through the on-board processor, and an independent analog and discrete-logic path from health monitors through voting logic and a latch to the power switch, which reaches safe mode without the processor.">
  <defs>
    <marker id="d-arrow3" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="7" markerHeight="7" orient="auto">
      <polygon points="0,0 10,5 0,10" fill="currentColor"/>
    </marker>
    <marker id="d-arrow3s" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="7" markerHeight="7" orient="auto">
      <polygon points="0,0 10,5 0,10" fill="var(--signal)"/>
    </marker>
  </defs>

  <!-- nominal path -->
  <text x="16" y="26" font-size="10.5" fill="currentColor" opacity=".55"
        letter-spacing="1.4" font-family="IBM Plex Mono, monospace">NOMINAL PATH — SOFTWARE</text>

  <rect x="16" y="40" width="150" height="54" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="91" y="64" font-size="12" fill="currentColor" text-anchor="middle">Payload processor</text>
  <text x="91" y="80" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">C / Rust flight software</text>

  <line x1="166" y1="67" x2="216" y2="67" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow3)"/>
  <text x="191" y="58" font-size="9" fill="currentColor" opacity=".55" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">kick</text>

  <rect x="218" y="40" width="120" height="54" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="278" y="70" font-size="12" fill="currentColor" text-anchor="middle">Watchdog</text>

  <!-- the fault -->
  <line x1="91" y1="94" x2="91" y2="150" stroke="var(--signal)" stroke-width="1.5"
        stroke-dasharray="4 3"/>
  <text x="100" y="126" font-size="10.5" fill="var(--signal)"
        font-family="IBM Plex Mono, monospace">processor stops responding</text>

  <!-- independent path -->
  <text x="16" y="180" font-size="10.5" fill="var(--signal)"
        letter-spacing="1.4" font-family="IBM Plex Mono, monospace">RECOVERY PATH — DISCRETE ANALOG AND LOGIC, NO PROCESSOR</text>

  <rect x="16" y="194" width="864" height="104" fill="none" stroke="var(--signal)"/>

  <rect x="34" y="216" width="118" height="60" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="93" y="240" font-size="12" fill="currentColor" text-anchor="middle">Health</text>
  <text x="93" y="256" font-size="12" fill="currentColor" text-anchor="middle">monitors</text>
  <text x="40" y="270" font-size="9" fill="currentColor" opacity=".55"
        font-family="IBM Plex Mono, monospace">rail, current, alive</text>

  <line x1="152" y1="246" x2="196" y2="246" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow3)"/>

  <rect x="198" y="216" width="118" height="60" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="257" y="243" font-size="12" fill="currentColor" text-anchor="middle">Voting logic</text>
  <text x="257" y="262" font-size="9" fill="currentColor" opacity=".55" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">majority of monitors</text>

  <line x1="316" y1="246" x2="360" y2="246" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow3)"/>

  <rect x="362" y="216" width="118" height="60" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="421" y="243" font-size="12" fill="currentColor" text-anchor="middle">Latch</text>
  <text x="421" y="262" font-size="9" fill="currentColor" opacity=".55" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">holds across brownout</text>

  <line x1="480" y1="246" x2="524" y2="246" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow3)"/>

  <rect x="526" y="216" width="118" height="60" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="585" y="243" font-size="12" fill="currentColor" text-anchor="middle">Power switch</text>
  <text x="585" y="262" font-size="9" fill="currentColor" opacity=".55" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">cycle / isolate</text>

  <line x1="644" y1="246" x2="688" y2="246" stroke="var(--signal)" stroke-width="1.5" marker-end="url(#d-arrow3s)"/>

  <rect x="690" y="216" width="172" height="60" fill="var(--paper-2)" stroke="var(--signal)" stroke-width="1.5"/>
  <text x="776" y="243" font-size="12.5" fill="currentColor" text-anchor="middle">Safe mode</text>
  <text x="776" y="262" font-size="9" fill="currentColor" opacity=".55" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">survives dead-on-arrival</text>

  <!-- watchdog also feeds the chain -->
  <polyline points="278,94 278,150 93,150 93,216" fill="none" stroke="currentColor" stroke-width="1.5"
            stroke-dasharray="3 3" marker-end="url(#d-arrow3)"/>
  <text x="288" y="146" font-size="9.5" fill="currentColor" opacity=".55"
        font-family="IBM Plex Mono, monospace">expiry</text>
</svg>`,

/* -------------------------------------------------------------------------
   Avionics transport — the failover, which is the whole point of the stack.
   ------------------------------------------------------------------------- */
'avionics-failover': `
<svg viewBox="0 0 820 268" role="img" xmlns="http://www.w3.org/2000/svg"
     aria-label="One frame format feeding a byte-level multiplexer that selects between an SPI link and a UART fallback link, so a dead SPI link fails over without a reset.">
  <defs>
    <marker id="d-arrow4" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="7" markerHeight="7" orient="auto">
      <polygon points="0,0 10,5 0,10" fill="currentColor"/>
    </marker>
    <marker id="d-arrow4s" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="7" markerHeight="7" orient="auto">
      <polygon points="0,0 10,5 0,10" fill="var(--signal)"/>
    </marker>
  </defs>

  <rect x="16" y="98" width="140" height="66" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="86" y="124" font-size="12" fill="currentColor" text-anchor="middle">Application</text>
  <text x="86" y="142" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">one frame format</text>

  <line x1="156" y1="131" x2="198" y2="131" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow4)"/>

  <rect x="200" y="90" width="146" height="82" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="273" y="116" font-size="12" fill="currentColor" text-anchor="middle">Byte-level MUX</text>
  <text x="273" y="134" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">CRC check, static</text>
  <text x="273" y="148" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">zero-copy buffers</text>
  <text x="273" y="164" font-size="9" fill="currentColor" opacity=".5" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">&lt; 1 µs / byte in ISR</text>

  <!-- primary -->
  <polyline points="346,110 396,110 396,64 442,64" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#d-arrow4)"/>
  <rect x="444" y="38" width="150" height="52" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="519" y="60" font-size="12" fill="currentColor" text-anchor="middle">SPI — primary</text>
  <text x="519" y="76" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">8 MHz · 256 / 512 B</text>
  <line x1="500" y1="26" x2="538" y2="102" stroke="var(--signal)" stroke-width="2"/>
  <text x="604" y="52" font-size="10.5" fill="var(--signal)"
        font-family="IBM Plex Mono, monospace">link lost mid-run</text>

  <!-- fallback -->
  <polyline points="346,152 396,152 396,198 442,198" fill="none" stroke="var(--signal)" stroke-width="1.5" marker-end="url(#d-arrow4s)"/>
  <rect x="444" y="172" width="150" height="52" fill="var(--paper-2)" stroke="var(--signal)" stroke-width="1.5"/>
  <text x="519" y="194" font-size="12" fill="currentColor" text-anchor="middle">UART — failover</text>
  <text x="519" y="210" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">115 200 baud · 256 B</text>

  <line x1="594" y1="198" x2="638" y2="198" stroke="var(--signal)" stroke-width="1.5" marker-end="url(#d-arrow4s)"/>
  <rect x="640" y="172" width="164" height="52" fill="var(--paper-2)" stroke="currentColor"/>
  <text x="722" y="194" font-size="12" fill="currentColor" text-anchor="middle">Peer node</text>
  <text x="722" y="210" font-size="9.5" fill="currentColor" opacity=".6" text-anchor="middle"
        font-family="IBM Plex Mono, monospace">no reset, no reconfigure</text>

  <text x="16" y="252" font-size="10.5" fill="currentColor" opacity=".6"
        font-family="IBM Plex Mono, monospace">Both transports carry the identical frame, so the switch is invisible above the MUX.</text>
</svg>`

};
