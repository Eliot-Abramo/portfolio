/* ============================================================================
   PROJECTS — single source of truth for the whole site.

   To add a project: append one object to the array below. Nothing else to edit.
   It appears automatically in the work index, and (if it has a `study`) gets a
   case-study page at  project.html?p=<slug>

   Required:  slug, title, summary, tech, years
   Optional:  org, role, repo, links[], featured, status, study{}

   Omit `study` entirely and the project still appears in the index as a row —
   that is the placeholder mode. Fill it in later, no template changes needed.

   study: {
     problem:     one paragraph — what was actually hard
     constraints: [ the real limits you designed against ]
     build:       [ what you built, concretely ]
     specs:       [ ['Label', 'value with unit'], ... ]   // the numbers
     figures:     [ { diagram: 'key' } | { src } | { gap } , caption ]
     outcome:     one paragraph — what happened. No adjectives.
     limits:      one paragraph — what this result does NOT show. Optional,
                  and the most credible thing on the page when it is there.
   }

   House rules:
     · Every claim carries a date, an org, or a number with a unit.
       If you cannot anchor it, cut it.
     · No count that goes stale on its own (stars, followers, downloads).
     · If a number is impressive only without context, give the context.
   ========================================================================== */

const PROJECTS = [

  /* ======================================================= CERN — flagship */
  {
    slug: 'cms-l1-trigger',
    title: 'Streaming an AI Engine into the CMS Level-1 Trigger',
    org: 'CERN openlab · CMS DAQ',
    role: 'FPGA Engineer',
    years: '2026',
    featured: true,
    tech: ['Versal ACAP', 'AI Engine', 'AXI4-Stream', 'VHDL', 'PCIe'],
    summary: 'Built the programmable-logic path that feeds a transformer to the AI Engine array ' +
             'on a Versal ACAP, and measured it in hardware at 34.02 µs — 1.25 % off simulation.',
    study: {
      problem:
        'The High-Luminosity LHC delivers collisions at 40 MHz, and the CMS Level-1 trigger has ' +
        '12.5 µs to decide what to keep. Transformer-based anomaly detection is an appealing way ' +
        'to make that decision, and the open question is not whether the model works but whether ' +
        'the silicon can be fed. On a Versal ACAP the AI Engine array is only as fast as the ' +
        'programmable logic that streams data into it, and nobody had a hardware number for what ' +
        'that data movement actually costs.',
      constraints: [
        'Programmable logic and the AI Engine array run in different clock domains, so every ' +
          'transfer crosses a boundary that has to be provably safe.',
        'Batch-1 inference — the figure of merit is fixed latency per event, not throughput.',
        'AXI4-Stream backpressure does not map cleanly onto AI Engine PLIO, so admission has ' +
          'to be managed rather than assumed.',
        'The measurement cannot perturb the path it measures, which rules out software timing.',
        'Simulation is a hypothesis until it is confirmed on the board.'
      ],
      build: [
        'A dual-clock AXI4-Stream FIFO (axis_fifo_core) with block-burst admission logic, ' +
          'carrying every transfer between the PL and AI Engine domains.',
        'An asynchronous FIFO for the clock-domain crossing and an elastic output buffer, so a ' +
          'stalled consumer cannot corrupt an in-flight transfer.',
        'A broadcast stage fanning one input stream to two AI Engine input PLIOs through ' +
          'independent FIFOs, keeping both engine inputs fed from a single source.',
        'Two cycle-accurate latency probes, both placed in the PL domain — one before the input ' +
          'FIFO and one after the output FIFO — so the reported number is a full round trip.',
        'A Python build-generation flow around a single build.toml, so a design regenerates ' +
          'and rebuilds rather than being hand-wired each time.',
        'Live optical-transceiver input replacing simulated PS data, PCIe host control, and ' +
          'PS-side telemetry and health monitoring.'
      ],
      specs: [
        ['Device', 'AMD Versal AI Edge VE2802 · VEK280'],
        ['Measured latency, probe A → B', '34.02 µs'],
        ['Simulated latency', '33.60 µs'],
        ['Hardware vs simulation', '+0.42 µs · +1.25 %'],
        ['AI Engine passes', '4 sequential, one per attention head'],
        ['Latency probes', '2, both in the PL domain'],
        ['Stream interface', 'AXI4-Stream ↔ PLIO'],
        ['Simulation reference', 'Vitis hw_emu + aiesimulator'],
        ['Phase-2 L1 budget, for scale', '12.5 µs total · 750 kHz accept']
      ],
      figures: [
        { diagram: 'cms-datapath',
          caption: 'Both probes sit in the programmable-logic domain, so the measured interval ' +
                   'covers the crossing into the AI Engine array and back out again, not a ' +
                   'one-way estimate.' },
        { diagram: 'cms-latency',
          caption: 'The gap between simulation and hardware is the result. At 1.25 %, the ' +
                   'simulated model is good enough to design against before a board exists.' }
      ],
      outcome:
        'The streaming infrastructure runs on a VEK280 with live optical input and host control ' +
        'over PCIe, and the measured round trip lands within 1.25 % of the Vitis simulation. ' +
        'That agreement is the useful part: it means the AI Engine data path can be explored in ' +
        'simulation before hardware, and it fixes the honest crossover condition for when an ' +
        'AI Engine implementation beats a plain PL DSP one. Presented at the CERN openlab ' +
        'lightning talks in August 2026.',
      limits:
        'This is a characterisation on an evaluation board, not a trigger-ready algorithm. ' +
        'The 34.02 µs figure is the data-movement round trip through the AI Engine array for ' +
        'one four-head attention block run as four sequential passes; the Phase-2 Level-1 budget ' +
        'quoted above is the full trigger chain, and this path is not inside it. The transformer ' +
        'model itself was not my work — the programmable logic and the measurement were.'
    }
  },

  /* ================================================== ESL / SEAMS — flagship */
  {
    slug: 'astra-cgra',
    title: 'ASTRA — Making a CGRA Programmable',
    org: 'EPFL ESL / SEAMS',
    role: 'Research Assistant',
    years: '2026',
    featured: true,
    tech: ['MLIR', 'Python', 'ILP mapping', 'CGRA', 'DSE'],
    links: [{ label: 'Compigra — upstream compiler (esl-epfl)', href: 'https://github.com/esl-epfl/Compigra' }],
    summary: 'Compiler, tooling and a design-space-exploration library for a coarse-grained ' +
             'reconfigurable array aimed at Square Kilometre Array signal processing. ' +
             'Poster at SwissChips 2026.',
    study: {
      problem:
        'A coarse-grained reconfigurable array is an attractive answer to the Square Kilometre ' +
        'Array\'s signal-processing bill: far more energy-efficient than a CPU, far more ' +
        'flexible than fixed-function silicon. The reason CGRAs stay in research is not the ' +
        'array, it is the toolchain. Mapping a kernel onto a fixed grid of processing elements ' +
        'is a scheduling and routing problem that gets expensive fast, and an architecture ' +
        'nobody can compile for is an architecture nobody can evaluate.',
      constraints: [
        'The mapping step is an integer program — cost grows sharply with kernel size, so the ' +
          'flow has to stay usable as kernels get real.',
        'Architecture parameters and kernel performance are coupled, so neither can be chosen ' +
          'in isolation.',
        'The people who need to drive this are radio-astronomy and architecture researchers, ' +
          'not compiler engineers.',
        'Results have to be reproducible by someone other than the person who produced them.'
      ],
      build: [
        'Contributed to Compigra, the lab\'s MLIR-based compiler taking C and C++ kernels down ' +
          'to CGRA assembly through ILP placement, routing and modulo scheduling.',
        'Built an IDE and a CLI over the flow, so compile, map, validate and debug are one ' +
          'command rather than a chain of manual steps.',
        'Wrote astrapy, a Python design-space-exploration library that sweeps architecture ' +
          'parameters and ranks candidate configurations by mapping outcome.',
        'Presented the programmability and energy-efficiency trade-offs as a poster at ' +
          'SwissChips 2026.'
      ],
      specs: [
        ['Compiler base', 'MLIR — custom dialects'],
        ['Input', 'C / C++ kernels'],
        ['Mapping', 'ILP placement and routing, modulo scheduling'],
        ['Output', 'CGRA assembly'],
        ['Exploration', 'astrapy — Python, parameter sweep'],
        ['Science target', 'Square Kilometre Array signal processing'],
        ['Presented', 'SwissChips 2026 — poster']
      ],
      figures: [
        { diagram: 'astra-toolchain',
          caption: 'The mapper is the expensive stage, so it is also the one worth asking ' +
                   'cheap questions of first — which is what the exploration loop is for.' }
      ],
      outcome:
        'The toolchain takes a kernel from C to CGRA assembly and back out as measured mapping ' +
        'results, and the exploration library turns architecture choices into something that can ' +
        'be swept rather than argued about.',
      limits:
        'Compigra is a laboratory project with its own authors; my work was on components of it ' +
        'and on the tooling and exploration layer around it, not on the compiler as a whole.'
    }
  },

  /* ================================================== SpaceLocker — flagship */
  {
    slug: 'spacelocker-payload',
    title: 'Payload Electronics That Recover Themselves',
    org: 'SpaceLocker, Toulouse',
    role: 'Embedded Systems Engineer — Space Payloads',
    years: '2025–2026',
    featured: true,
    tech: ['ECSS', 'C', 'Rust', 'KiCad', 'TVAC'],
    summary: 'Flight-qualified payload electronics and flight software, cleared through ESA PDR ' +
             'and CDR — including an analog safing chain that recovers the payload without the ' +
             'processor.',
    study: {
      problem:
        'A payload in orbit has no service call. The failure that matters most is the one that ' +
        'happens before anyone has ever talked to the hardware: dead on arrival, no telemetry, ' +
        'no way in. Any recovery mechanism that runs on the payload processor is useless in ' +
        'exactly the case you built it for, because the processor is a candidate for the thing ' +
        'that failed.',
      constraints: [
        'Recovery cannot depend on the processor, the flight software or a ground command.',
        'ECSS governs the design, the evidence and the review — a working board that cannot be ' +
          'defended is not a deliverable.',
        'The hardware has to survive thermal vacuum, vibration and shock before it is allowed ' +
          'to be correct.',
        'Reliability numbers are needed while the design is still open, not after it is frozen.'
      ],
      build: [
        'Payload electronics — power conditioning, data handling, watchdog and safing circuitry — ' +
          'designed, assembled and tested through to qualification.',
        'An analog-logic safety board where health monitors feed voting logic and a latch that ' +
          'drives the power switch directly, so safe mode is reachable with the processor dead.',
        'Flight software in C and Rust under ECSS constraints, MISRA-inspired, covering ' +
          'fault-tolerant communication, on-board diagnostics and telemetry.',
        'A KiCad-integrated reliability tracing tool linking schematic and BOM straight to an ' +
          'ECSS reliability budget, replacing a spreadsheet that always ran a design cycle late.',
        'Design data packages for ESA PDR and CDR, defended and iterated on formal feedback.',
        'TVAC, vibration, shock, functional and end-to-end integration campaigns.'
      ],
      specs: [
        ['Standards', 'ECSS · IEC TR 62380 for reliability'],
        ['Reviews cleared', 'ESA PDR and CDR'],
        ['Qualification', 'TVAC, vibration, shock, functional'],
        ['Flight software', 'C and Rust, MISRA-inspired'],
        ['Safing path', 'discrete analog and logic, processor-independent'],
        ['Recovery case covered', 'dead on arrival']
      ],
      figures: [
        { diagram: 'safing-chain',
          caption: 'The recovery path is drawn outside the processor deliberately. Every element ' +
                   'in the lower band still works when the block in the upper band does not.' }
      ],
      outcome:
        'The electronics were qualified and delivered against a March 2026 launch, with the ' +
        'design defended at both ESA reviews. The reliability tool moved the reliability number ' +
        'from a post-hoc document into the design loop, so a part choice and its failure-rate ' +
        'consequence show up in the same afternoon.',
      limits:
        'Flight-qualified, not flight-proven — the hardware passed its qualification campaign ' +
        'and its reviews. On-orbit performance is not mine to claim.'
    }
  },

  /* ==================================================== EPFL Xplore — ERC win */
  {
    slug: 'avionics-comms-stack',
    title: 'Avionics Communication Stack',
    org: 'EPFL Xplore',
    role: 'Lead System Engineer',
    years: '2024–2025',
    featured: true,
    tech: ['C++', 'STM32', 'ESP32', 'SPI', 'UART', 'CRC16'],
    repo: 'https://github.com/Eliot-Abramo/Avionics-Communication-Stack',
    summary: 'Transport-agnostic real-time bus that fails over from SPI to UART without a reset. ' +
             'Main inter-node link on the rover that won the European Rover Challenge 2025.',
    study: {
      problem:
        'A Mars-analogue rover carries several avionics nodes and one operator station, and a ' +
        'competition run gives you no second attempt. The link between nodes had to keep working ' +
        'while the machine drove over rough ground, with connectors under vibration, and a single ' +
        'dropped bus meaning the end of the run.',
      constraints: [
        'Deterministic timing — no dynamic allocation anywhere in the data path.',
        'A physical link can fail mid-run, and a reset to recover it costs the run.',
        'Parsing happens inside an ISR, so per-byte cost sets the ceiling for everything else.',
        'One codebase had to serve both UART and SPI nodes without per-transport forks.'
      ],
      build: [
        'A single frame format shared by UART and SPI, so the two transports stay interchangeable.',
        'A byte-level MUX that switches from SPI to UART automatically when a link stops ' +
          'responding, with nothing above it needing to know.',
        'Statically allocated zero-copy circular buffers, so the hot path never calls malloc.',
        'CRC framing validated on every packet before dispatch — a corrupt frame is dropped, ' +
          'never partially applied.',
        'ISR-side parsing kept under a microsecond per byte, measured rather than assumed.'
      ],
      specs: [
        ['ISR parse latency', '< 1 µs / byte'],
        ['UART link rate', '115 200 baud'],
        ['SPI clock', '8 MHz'],
        ['SPI buffers', '256 / 512 B'],
        ['Serial buffer', '256 B'],
        ['Dynamic allocation', 'none'],
        ['Continuous field time', '100+ h'],
        ['ERC 2025 result', '1st of 25 teams · 2180.4 / 3000']
      ],
      figures: [
        { diagram: 'avionics-failover',
          caption: 'Because both transports carry the identical frame, failover is a decision ' +
                   'inside the MUX rather than an event the application has to handle.' },
        { src: 'img/project2.png',
          caption: 'Transport layer as built. Both protocol handlers feed one byte-level MUX, ' +
                   'which routes through the Cosco router to the ground station.' }
      ],
      outcome:
        'The stack was the main inter-node messaging backbone during the European Rover Challenge ' +
        '2025, where the team placed first of 25 on-site teams with 2180.4 of 3000 points. It ' +
        'accumulated over 100 hours of continuous operation across testing and competition runs.'
    }
  },

  /* ============================================================ Astrorapide */
  {
    slug: 'astrorapide',
    title: 'Astrorapide',
    org: 'EPFL · EcoCloud / LASTRO',
    years: '2024',
    featured: true,
    tech: ['C++', 'Vitis HLS', 'Zynq-7020', 'PYNQ'],
    repo: 'https://github.com/Eliot-Abramo/Astrorapide',
    summary: 'FPGA-accelerated radio-astronomy pipeline turning raw telescope samples into ' +
             'hydrogen-line spectra and radial-velocity estimates, on a Zynq-7020.',
    study: {
      problem:
        'Neutral hydrogen emits at roughly 21 cm. Motion along the line of sight shifts that ' +
        'emission away from its rest frequency, and measuring the shift gives radial velocity — ' +
        'which across many directions says something about the rotation of the Milky Way. ' +
        'Getting from recorded complex samples to a candidate peak means a full signal chain, ' +
        'and on a Zynq-7020 the FFT is where the time goes.',
      constraints: [
        'Fixed fabric — a Zynq-7020 on a PYNQ-Z2, so resources are the hard limit.',
        'The transform dominates runtime, but FFT size trades directly against resolution.',
        'Latency, energy, resource use, flexibility and signal fidelity all pull against ' +
          'each other, and only measurement settles it.'
      ],
      build: [
        'The full chain: windowing, Fourier analysis, power-spectrum estimation, smoothing, ' +
          'calibration, peak detection, then Doppler conversion.',
        'A custom HLS FFT accelerator in the PL, with the ARM cores orchestrating data movement ' +
          'and finishing the spectral analysis.',
        'Ten analysis configurations spanning FFT sizes from 1K to 512K samples, kept alongside ' +
          'their measurements so the trade-off is inspectable rather than asserted.',
        'A final design settling on a deeply pipelined fixed-size 4096-point FFT, processing ' +
          'transforms in batches through contiguous shared buffers.'
      ],
      specs: [
        ['Board', 'PYNQ-Z2 · Zynq-7020'],
        ['Hydrogen line', '1420.405 751 77 MHz'],
        ['FFT sizes explored', '1K – 512K samples'],
        ['Final accelerator', '4096-point, pipelined'],
        ['Data source', 'EPFL VEGA telescope']
      ],
      figures: [
        { src: 'img/galaxy-detect.png',
          caption: 'Host, driver and kernel layers. One proxy fronts the XADC, FFT and ' +
                   'convolution drivers, so the same CLI runs software or hardware mode.' }
      ],
      outcome:
        'The repository keeps the working PYNQ overlay, the design iterations that led to it, ' +
        'and the original measurements used to compare them. The path from recorded samples to ' +
        'candidate peak frequencies and velocity estimates is implemented end to end.',
      limits:
        'The scientific interpretation depends on the quality and calibration of the telescope ' +
        'data. This is a working signal chain, not an independently validated galactic ' +
        'measurement, and it is not claimed as one.'
    }
  },

  /* =============================================================== LWE thesis */
  {
    slug: 'analog-activations',
    title: 'Nonlinear Activations for Analog Neurons',
    org: 'Laboratory of Wave Engineering, EPFL',
    role: 'Research Assistant · under Prof. Romain Fleury',
    years: '2024–2025',
    featured: true,
    tech: ['CST Studio', 'VNA', 'PIN diodes', 'Optics', 'Python'],
    links: [{ label: 'Read the thesis (PDF)', href: 'THESIS_ABRAMO.pdf' }],
    summary: 'Two experimental routes to performing a neural-network activation in physics ' +
             'rather than in software — a tunable 2.4 GHz metasurface, and an optical GELU.',
    study: {
      problem:
        'Digital deep learning burns most of its energy moving numbers around, and analog ' +
        'computing is the standing offer to stop doing that. The catch is the nonlinearity: an ' +
        'analog network still needs an activation function, and the activation is the part that ' +
        'resists being done passively. The question was whether a physical effect could stand ' +
        'in for one directly.',
      constraints: [
        'The nonlinearity has to be passive or near-passive, or the energy argument collapses.',
        'A vector network analyser is the debugger — a simulation is a hypothesis until it is ' +
          'swept.',
        'The response has to reproduce across many fabricated elements, not just the good one.'
      ],
      build: [
        'A binary tunable phase metasurface at 2.4 GHz, built from coupled resonators with ' +
          'PIN-diode control, modulating microwave reflection.',
        'Characterisation of the fabricated array by VNA sweep in an anechoic enclosure, ' +
          'against CST Studio models.',
        'A second, optical route emulating a GELU-like activation with structured incoherent ' +
          'light and Fresnel transmission.',
        'Python and C++ processing pipelines for the measured data.'
      ],
      specs: [
        ['Operating frequency', '2.4 GHz'],
        ['Tuning element', 'PIN diodes'],
        ['Metasurface', 'coupled resonators, binary phase'],
        ['Optical target', 'GELU-like activation'],
        ['Instruments', 'VNA, CST Studio Suite, anechoic enclosure']
      ],
      figures: [
        { src: 'img/project5.png',
          caption: 'The fabricated resonator array, the optical bench used for the Fresnel ' +
                   'setup, and the anechoic enclosure used for characterisation.' }
      ],
      outcome:
        'Both routes showed that a physical nonlinearity can be embedded into an analog computing ' +
        'architecture. The work is written up in full in the thesis linked below.',
      limits:
        'A feasibility result on the path toward energy-efficient analog inference, not a ' +
        'deployed accelerator.'
    }
  },

  /* ============================================================== POLARIS */
  {
    slug: 'polaris-nova',
    title: 'POLARIS + NOVA',
    org: 'Personal',
    years: '2026',
    status: 'In development',
    tech: ['Zynq UltraScale+', 'VHDL', 'Custom fabric'],
    summary: 'Dual-FPGA satellite compute platform — POLARIS moves payload data, NOVA provides ' +
             'reconfigurable compute, linked over a custom fault-tolerant fabric.',
    note: 'Write-up and sources to follow.'
  },

  /* ================================================================= Nexus */
  {
    slug: 'nexus',
    title: 'Nexus — ROS 2 ↔ MCU Bridge',
    org: 'EPFL Xplore',
    years: '2024–2025',
    tech: ['C++', 'ROS 2', 'ESP32', 'CRC16'],
    repo: 'https://github.com/Eliot-Abramo/Nexus',
    summary: 'Full-duplex bridge carrying CRC-framed packets between bare-metal avionics and a ' +
             'ROS 2 network. Carried live telemetry through the ERC 2025 competition runs.',
    study: {
      problem:
        'Avionics nodes speak packed binary over a serial line. ROS 2 speaks typed topics over a ' +
        'network. Getting telemetry from one to the other usually means a translation layer that ' +
        'silently corrupts a field the first time a struct changes on one side.',
      constraints: [
        'Full duplex — commands down and telemetry up, concurrently.',
        'A corrupted frame has to be detected and dropped, never partially dispatched.',
        'Static buffers on the embedded side; no allocation during operation.'
      ],
      build: [
        'A framed packet protocol: two fixed sync bytes, a 16-bit little-endian length, then a ' +
          'one-byte message ID.',
        'CRC16 over the whole frame, checked before anything is dispatched.',
        'Type-safe dispatch mapping message IDs to handlers on both the embedded and Linux sides, ' +
          'so a struct change breaks the build rather than the telemetry.',
        'ROS 2 nodes republishing decoded telemetry onto typed topics.'
      ],
      specs: [
        ['Sync bytes', '0xA5 0x5A'],
        ['Length field', '16-bit little-endian'],
        ['CRC', 'CRC16 · X25 / Modbus'],
        ['Link', 'UART 115 200 / SPI'],
        ['Buffering', 'static, fixed-size']
      ],
      figures: [
        { src: 'img/project1.png',
          caption: 'Bridge topology. The ESP32 avionics node reaches ROS 2 on a Pi 5 over UART; ' +
                   'decoded telemetry is republished to the ground station over Ethernet.' }
      ],
      outcome:
        'Carried live telemetry between the rover avionics and the operator station throughout ' +
        'the European Rover Challenge 2025.'
    }
  },

  /* ================================================== KiCad reliability tool */
  {
    slug: 'kicad-reliability',
    title: 'ECSS Reliability Calculator for KiCad',
    org: 'SpaceLocker · KiCad plugin',
    years: '2025–2026',
    featured: true,
    tech: ['Python', 'KiCad', 'IEC TR 62380'],
    repo: 'https://github.com/Eliot-Abramo/Kicad-Space-Reliability',
    summary: 'Turns a live schematic into a defensible reliability budget with stated ' +
             'uncertainty, so the trade-off arrives while the design is still open.',
    study: {
      problem:
        'Reliability budgets for space electronics are usually produced late, in a spreadsheet, ' +
        'by someone other than the person who drew the schematic. By the time a number comes ' +
        'back, the design choice that caused it is weeks old. The useful question was never ' +
        '"what is the failure rate" — it is "which part of this design is driving it, and what ' +
        'should I change first."',
      constraints: [
        'Has to run against the live schematic and block diagram, not an exported snapshot.',
        'A single headline figure is not enough — the assumptions behind it have to be ' +
          'inspectable by a reviewer.',
        'The output has to survive a formal design review, which means showing its working.'
      ],
      build: [
        'Component-level failure-rate estimation using IEC TR 62380 stress modelling.',
        'Rollup from component to system level following the block diagram, so the number and ' +
          'the architecture stay attached to each other.',
        'Uncertainty propagation, so the answer is a range with stated assumptions rather than ' +
          'a single mysterious figure.',
        'Sensitivity analysis ranking dominant contributors, which is what actually changes a ' +
          'design decision.',
        'Report generation shaped for design-review data packages.'
      ],
      specs: [
        ['Standard', 'IEC TR 62380 (2004)'],
        ['Version', '3.3.0'],
        ['Licence', 'MIT'],
        ['Output', 'component + system rollup, with uncertainty'],
        ['Context', 'SpaceLocker flight programme']
      ],
      figures: [
        { gap: 'Plugin output — system rollup with dominant contributors ranked.' }
      ],
      outcome:
        'Gives end-to-end traceability from schematic and BOM to a reliability budget, and was ' +
        'used to prepare review data packages rather than only to produce a number.'
    }
  },

  /* ====================================================== KiCad multi-board */
  {
    slug: 'kicad-multi-pcb',
    title: 'Multi-Board PCB Manager',
    org: 'Open source · KiCad plugin',
    years: '2026',
    tech: ['Python', 'KiCad 10', 'pcbnew API'],
    repo: 'https://github.com/Eliot-Abramo/Kicad-Multi-PCB',
    summary: 'One schematic driving several PCBs, with every component traceable to the board it ' +
             'lives on — from inside KiCad or from CI.',
    study: {
      problem:
        'KiCad is built around one schematic driving one PCB. Real products are rarely that ' +
        'shape — a power board and a control board, a main board and a daughterboard, a rigid ' +
        'section and a flex tail. The usual workarounds either duplicate the schematic, which ' +
        'then drifts, or give up on a single BOM. In a multi-board project the honest answer to ' +
        '"where is R42?" used to be "open each PCB and look."',
      constraints: [
        'One schematic stays the source of truth — no duplication, so nothing can drift.',
        'A single consolidated BOM across every board in the project.',
        'Has to work inside KiCad for interactive use and headless for CI.'
      ],
      build: [
        'Rule-based component ownership, where boards claim components by schematic sheet path.',
        'An in-KiCad search resolving a reference to its board, sheet, footprint and placement, ' +
          'then opening the right board and zooming to it.',
        'A `multiboard` CLI exposing the same queries to a terminal or a CI job.',
        'Port handling for inter-board connections, and per-board update that leaves the others ' +
          'untouched.'
      ],
      specs: [
        ['KiCad version', '10.0'],
        ['Python', '3.9+'],
        ['Licence', 'MIT'],
        ['Interfaces', 'GUI plugin + CLI']
      ],
      figures: [
        { gap: 'Plugin screenshot — the reference search resolving a component to its board.' }
      ],
      outcome:
        'Finding a component across a multi-board project takes about a second instead of ' +
        'opening each PCB in turn, and the same query runs unattended in CI.'
    }
  },

  /* ========================================================= KiCad thermal */
  {
    slug: 'kicad-thermal',
    title: 'TVAC Thermal Analyzer',
    org: 'Open source · KiCad plugin',
    years: '2026',
    tech: ['Python', 'C / OpenMP', 'KiCad', 'SciPy'],
    repo: 'https://github.com/Eliot-Abramo/Kicad-Thermal-Analysis',
    summary: 'PCB thermal analysis for a vacuum chamber, where convection does not exist and the ' +
             'usual intuitions about hotspots stop applying.',
    study: {
      problem:
        'Standard PCB thermal tooling assumes air. In a thermal vacuum chamber there is no ' +
        'convection at all, so heat leaves a board by conduction into its mounting points and by ' +
        'radiation — which makes the usual guesses about where a hotspot appears unreliable, ' +
        'and finding out during the TVAC campaign is expensive.',
      constraints: [
        'Radiation-dominated transfer, so the model cannot lean on convective coefficients.',
        'Multi-layer copper conducts very differently in-plane than through-plane.',
        'Mounting points act as fixed-temperature boundaries and often dominate the result.'
      ],
      build: [
        'Radiation-dominated heat-transfer modelling for vacuum conditions.',
        'A three-dimensional stackup model with per-layer conductance and real material data.',
        'Per-part power dissipation, heatsinks as User-layer polygons, mounting points as fixed ' +
          'thermal boundaries.',
        'Transient and steady-state solvers, plus a native OpenMP engine for when the Python ' +
          'path is too slow to iterate with.',
        'An interactive pan-and-zoom view with the thermal map overlaid, and PDF reports.'
      ],
      specs: [
        ['KiCad version', '9.0+'],
        ['Python', '3.9+'],
        ['Solvers', 'transient + steady-state'],
        ['Native engine speedup', '10–100× vs Python'],
        ['Optional deps', 'NumPy, SciPy, reportlab, Pillow']
      ],
      figures: [
        { gap: 'Thermal map overlay on a payload board, with hotspots identified.' }
      ],
      outcome:
        'Produces a hotspot map and a thermal-relief check before a board goes to fab, aimed at ' +
        'the TVAC campaign rather than at bench conditions.'
    }
  },

  /* =================================================== neural stimulation */
  {
    slug: 'neural-stim-array',
    title: '96-Electrode Neural Stimulation Array',
    org: 'Personal · medical instrumentation',
    years: '',
    tech: ['ESP32-S3', 'HV switching', 'SPI', 'Galvanic isolation'],
    summary: 'High-voltage switching front end addressing 96 stimulation electrodes, with the ' +
             'patient side galvanically isolated from the controller.',
    study: {
      problem:
        'Addressing ninety-six stimulation electrodes means routing a high-voltage stimulus to ' +
        'any one of them under software control, quickly, and without ever putting the patient ' +
        'side and the controller side on the same ground. The channel count makes a per-channel ' +
        'driver impractical, and the isolation requirement rules out the obvious shortcuts.',
      constraints: [
        'Patient-side isolation is a safety requirement, not an optimisation.',
        'Ninety-six channels from one controller means the addressing scheme, not the driver, ' +
          'sets the cost.',
        'Switching high voltage near a microcontroller demands the layout carry the design.'
      ],
      build: [
        'A high-voltage analog switching array built from ADG1234 and ADG1414 parts, addressing ' +
          'all 96 electrodes.',
        'A 12-device SPI daisy chain, so the whole array is driven from one bus rather than ' +
          'ninety-six control lines.',
        'PCA9505 GPIO expanders for the slower control and enable domain.',
        'ISO1644 galvanic isolators splitting the patient side from the controller side.',
        'An ESP32-S3 controller sequencing the array over the daisy chain.'
      ],
      specs: [
        ['Electrodes', '96'],
        ['Switch matrix', 'ADG1234 / ADG1414'],
        ['Control chain', '12-device SPI daisy chain'],
        ['Expanders', 'PCA9505'],
        ['Isolation', 'ISO1644 galvanic'],
        ['Controller', 'ESP32-S3']
      ],
      figures: [
        { gap: 'Board layout — the isolation boundary and the daisy-chained switch banks.' }
      ],
      outcome:
        'All ninety-six electrodes are addressable from a single SPI bus with the patient side ' +
        'isolated throughout, which is what makes the channel count affordable in board area.'
    }
  },

  /* ================================================================= RoCo */
  {
    slug: 'roco-messagebus',
    title: 'RoCo — Rover Communication API',
    org: 'EPFL Xplore',
    years: '2023–2024',
    tech: ['C++', 'CAN', 'Embedded'],
    repo: 'https://github.com/Eliot-Abramo/BRoCo',
    summary: 'Publish/subscribe bus letting every rover subsystem share one communication ' +
             'codebase instead of maintaining six that drift apart.',
    study: {
      problem:
        'Every rover subsystem needs to talk to the others, and each one runs different hardware. ' +
        'Without a shared abstraction each team reimplements the same communication code, and ' +
        'the packet definitions drift apart until an integration week finds out.',
      constraints: [
        'The same source has to run across subsystems with no porting and no extra install.',
        'Targets are embedded, so memory footprint and CPU overhead both matter.',
        'Static allocation predominates — overflow is not an acceptable failure mode.'
      ],
      build: [
        'A MessageBus abstraction where any peer can broadcast and any peer may or may not handle it.',
        'Separate IOBus and NetworkBus backends behind one interface, so a subsystem changes ' +
          'transport without changing code.',
        'Packet definitions and protocol versioning kept in one core shared by every module.',
        'A single public header as the entire API surface.'
      ],
      specs: [
        ['Pattern', 'publish / subscribe'],
        ['Allocation', 'predominantly static'],
        ['Public API', 'one header — RoCo.h'],
        ['Transports', 'IOBus, NetworkBus']
      ],
      figures: [
        { src: 'img/Broco.png',
          caption: 'Application modules publish and subscribe through one MessageBus, which fans ' +
                   'out to the IO and network backends.' }
      ],
      outcome:
        'Became the shared communication layer across rover subsystems, so one implementation ' +
        'served all of them rather than each team maintaining its own.'
    }
  },

  /* =========================================================== CNN accel */
  {
    slug: 'fpga-cnn-accel',
    title: 'CNN Convolution Accelerator',
    org: 'EPFL',
    years: '2024',
    tech: ['Vitis HLS', 'C++', 'Zynq-7020', 'AXI'],
    repo: 'https://github.com/Eliot-Abramo/FPGA_CNN_Accel',
    summary: 'A 3×3 convolution accelerator at initiation interval 1, where three caching layers ' +
             'do the real work of keeping the multipliers fed.',
    study: {
      problem:
        'A convolution layer on an embedded ARM core spends most of its time waiting on external ' +
        'memory rather than doing arithmetic. Moving the convolution into fabric only helps if ' +
        'the memory traffic moves with it — otherwise the accelerator starves and the speedup ' +
        'is imaginary.',
      constraints: [
        'DSP48 slices set the numeric format before anything else does.',
        'External memory bandwidth, not multiply throughput, is the real bottleneck.',
        'The accelerator has to drop into the Linux application already running on the ARM cores.'
      ],
      build: [
        'Coefficient caching in BRAM for four filters, cyclically partitioned so all four read ' +
          'in parallel.',
        'Triple line buffers sized to the worst case, giving row re-use across the sliding window.',
        'Loop fusion and a fully pipelined inner loop at initiation interval 1.',
        'A single burst-optimised AXI master interface at 256-beat bursts.',
        'Fixed-point throughout, chosen to fit the DSP48 multipliers rather than to look tidy.'
      ],
      specs: [
        ['Board', 'PYNQ-Z2 · xc7z020-clg400-1'],
        ['Clock', '100–125 MHz'],
        ['Initiation interval', '1'],
        ['Numeric format', 'ap_fixed<16,4>'],
        ['AXI burst length', '256 beats'],
        ['Filters in lock-step', '4'],
        ['Line buffers', '3 × 4064']
      ],
      figures: [
        { src: 'img/cnn_accel.png',
          caption: 'Dataflow. The DMA controller burst-reads coefficients and pixels into fabric, ' +
                   'and burst-writes the output feature map back.' }
      ],
      outcome:
        'The accelerator is integrated into the Linux application on the ARM cores and cuts ' +
        'external memory accesses against the software-only baseline, which is what the caching ' +
        'structure existed to do.'
    }
  },

  /* ============================================================ fractal pong */
  {
    slug: 'fractal-pong',
    title: 'Real-Time Fractal Pong',
    org: 'EPFL',
    years: '2024',
    tech: ['VHDL', 'PYNQ-Z2', 'Fixed-point', 'BRAM'],
    repo: 'https://github.com/Eliot-Abramo/Best_DSD_Team',
    summary: 'Pong over a live Mandelbrot set, generated entirely in fabric with no processor — ' +
             'a pipelined fractal core and a game FSM sharing one framebuffer.',
    study: {
      problem:
        'Rendering a Mandelbrot set per frame is expensive, and playing a game on top of it means ' +
        'two things want the framebuffer at once: the fractal generator writing pixels and the ' +
        'display reading them. Doing it all in VHDL with no processor means solving that ' +
        'arbitration in hardware.',
      constraints: [
        'No CPU — the whole thing lives in fabric.',
        'Fractal generation and display run in different clock domains.',
        'Fixed-point only; coordinate precision sets directly how far you can zoom.'
      ],
      build: [
        'A fully pipelined fixed-point Mandelbrot generator computing up to 255 iterations per pixel.',
        'An event-driven Pong FSM with collision detection, paddle AI modes and a dynamic ' +
          'obstacle overlay on the fractal background.',
        'A dual-port BRAM framebuffer arbitrating simultaneous fractal writes and display reads.',
        'Generics for coordinate precision and screen size, so the design re-targets without a rewrite.',
        'Clock-domain crossing between generator and video output, with testbenches over each part.'
      ],
      specs: [
        ['Board', 'PYNQ-Z2'],
        ['Language', 'VHDL, no soft core'],
        ['Max iterations / pixel', '255'],
        ['Framebuffer', 'dual-port BRAM'],
        ['Parameterised by', 'N_BITS, COORD_BW']
      ],
      figures: [
        { src: 'img/pong.png', caption: 'Gameplay over the live-generated fractal background.' }
      ],
      outcome:
        'Runs in real time on the PYNQ-Z2, verified by testbench across the fractal core, the ' +
        'game FSM and the clock-domain crossing.'
    }
  },

  /* ============================================================== ATmega128 */
  {
    slug: 'atmega128-alarm',
    title: 'ATmega128 Alarm, Timer and Sprinkler Controller',
    org: 'EPFL',
    years: '2023',
    tech: ['AVR Assembly', 'ATmega128', 'I²C'],
    repo: 'https://github.com/Eliot-Abramo/microcontrolleur',
    summary: 'Three real-time behaviours on one 8-bit part, hand-written in AVR assembly — ' +
             'including the maths library, because there was not one.',
    study: {
      problem:
        'Three real-time behaviours on one 8-bit microcontroller, written in assembly, with no ' +
        'standard library to fall back on. Scheduling, display refresh and actuator control all ' +
        'share one CPU without any of them being allowed to slip.',
      constraints: [
        'Assembly only — every register allocation is manual.',
        'No floating point and no maths library on the part.',
        'The timer needs millisecond precision while display and keypad keep responding.'
      ],
      build: [
        'Timer0 in CTC mode as the time base, with an external interrupt for button input.',
        'A hand-written assembly maths library, including a two-byte Taylor series routine.',
        'Keypad matrix and push-buttons on PortA, display on PortC, actuators on PortD.',
        'An I²C real-time clock module holding wall-clock time across resets.',
        'Buzzer driven from OC2, solenoid valve driven from PortD.'
      ],
      specs: [
        ['MCU', 'ATmega128 · 8-bit AVR'],
        ['Language', 'AVR assembly, handwritten'],
        ['Time base', 'Timer0, CTC mode'],
        ['Timer precision', 'millisecond'],
        ['RTC interface', 'I²C']
      ],
      figures: [
        { src: 'img/project4.png',
          caption: 'The board under test — LCD, keypad, buzzer and the solenoid valve driven ' +
                   'from PortD.' }
      ],
      outcome:
        'All three functions run on one part: multiple alarm schedules, a millisecond countdown ' +
        'and valve control, with display and keypad staying responsive throughout.'
    }
  },

  /* ================================================================== BBB */
  {
    slug: 'bbb-image-forge',
    title: 'BBB Image Forge',
    org: 'Personal',
    years: '2026',
    tech: ['Python', 'Linux', 'BeagleBone'],
    repo: 'https://github.com/Eliot-Abramo/BBB-Image-Flasher',
    summary: 'Builds a BeagleBone Black image from a profile and flashes it to an SD card from a ' +
             'local web UI. Builds on Linux or WSL, flashes from Linux or native Windows.'
  }

];
