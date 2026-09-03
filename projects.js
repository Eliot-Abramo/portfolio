/* ============================================================================
   PROJECTS — single source of truth for the whole site.

   To add a project: append one object to the array below. Nothing else to edit.
   It appears automatically in the work index, and (if it has a `study`) gets a
   case-study page at  project.html?p=<slug>

   Required:  slug, title, summary, tech, years
   Optional:  org, role, repo, links[], featured, study{}

   Omit `study` entirely and the project still appears in the index as a row —
   that is the placeholder mode. Fill it in later, no template changes needed.

   study: {
     problem:     one paragraph — what was actually hard
     constraints: [ the real limits you designed against ]
     build:       [ what you built, concretely ]
     specs:       [ ['Label', 'value with unit'], ... ]   // the numbers
     figures:     [ { src, caption } ]                    // or { gap: 'why' }
     outcome:     one paragraph — what happened. No adjectives.
   }

   House rule: every claim carries a date, an org, or a number with a unit.
   If you cannot anchor it, cut it.
   ========================================================================== */

const PROJECTS = [

  /* ---------------------------------------------------------------- ERC -- */
  {
    slug: 'avionics-comms-stack',
    title: 'Avionics Communication Stack',
    org: 'EPFL Xplore',
    role: 'Lead System Engineer',
    years: '2024–2025',
    featured: true,
    tech: ['C++', 'STM32', 'ESP32', 'SPI', 'UART', 'CRC16'],
    repo: 'https://github.com/Eliot-Abramo/Avionics-Communication-Stack',
    summary: 'Transport-agnostic real-time bus with automatic SPI-to-UART failover. ' +
             'Ran as the main inter-node link on the rover that won ERC 2025.',
    study: {
      problem:
        'A Mars-style rover carries several avionics nodes and one operator station, ' +
        'and a competition run gives you no second attempt. The link between nodes had ' +
        'to keep working while the machine was driving over rough ground, with connectors ' +
        'under vibration and a single dropped bus meaning the end of the run.',
      constraints: [
        'Deterministic timing — no dynamic allocation anywhere in the data path.',
        'A physical link can fail mid-run; the stack has to survive that without a reset.',
        'Parsing happens inside an ISR, so the per-byte cost sets the ceiling for everything else.',
        'One codebase had to serve both UART and SPI nodes without per-transport forks.'
      ],
      build: [
        'A unified frame format shared by UART and SPI, so the two transports stay interoperable.',
        'A byte-level MUX that switches between SPI and UART automatically when a link stops responding.',
        'Statically allocated zero-copy circular buffers — no malloc in the hot path.',
        'CRC framing validated on every packet before dispatch.',
        'ISR-side parsing kept small enough to stay under a microsecond per byte.'
      ],
      specs: [
        ['ISR parse latency', '< 1 µs / byte'],
        ['UART link rate', '115 200 baud'],
        ['SPI clock', '8 MHz'],
        ['SPI buffers', '256 / 512 B'],
        ['Serial buffer', '256 B'],
        ['Dynamic allocation', 'none'],
        ['Continuous field time', '100+ h']
      ],
      figures: [
        { src: 'img/project2.png',
          caption: 'Transport layer. Both protocol handlers feed one byte-level MUX, which ' +
                   'routes through the Cosco router to the ground station.' }
      ],
      outcome:
        'The stack was the main inter-node messaging backbone during the European Rover ' +
        'Challenge 2025, where the team placed first overall. It accumulated over 100 hours ' +
        'of continuous operation across testing and competition runs.'
    }
  },

  /* ------------------------------------------------------------- KiCad -- */
  {
    slug: 'kicad-multi-pcb',
    title: 'Multi-Board PCB Manager',
    org: 'Open source · KiCad plugin',
    years: '2026',
    featured: true,
    tech: ['Python', 'KiCad 10', 'pcbnew API'],
    repo: 'https://github.com/Eliot-Abramo/Kicad-Multi-PCB',
    summary: 'One schematic driving several PCBs, with every component traceable to the board ' +
             'it lives on. KiCad action plugin, 12 stars.',
    study: {
      problem:
        'KiCad is built around one schematic driving one PCB. Real products are rarely that ' +
        'shape — a power board and a control board, a main board and a daughterboard, a rigid ' +
        'section and a flex tail. The usual workarounds either duplicate the schematic, which ' +
        'then drifts out of sync, or give up on having a single BOM. In a multi-board project ' +
        'the honest answer to "where is R42?" used to be "open each PCB and look."',
      constraints: [
        'One schematic stays the source of truth — no duplication, so nothing can drift.',
        'A single consolidated BOM across every board in the project.',
        'Has to work inside KiCad for interactive use and headless for CI.'
      ],
      build: [
        'Rule-based component ownership — boards claim components by schematic sheet path.',
        'An in-KiCad search that resolves a reference to its board, sheet, footprint and ' +
          'placement, then zooms to it, opening a different board first if that is where it lives.',
        'A `multiboard` CLI exposing the same queries to a terminal or a CI job.',
        'Port handling for inter-board connections, and per-board update without touching the others.'
      ],
      specs: [
        ['KiCad version', '10.0'],
        ['Python', '3.9+'],
        ['Licence', 'MIT'],
        ['Stars', '12'],
        ['Interfaces', 'GUI plugin + CLI']
      ],
      figures: [
        { gap: 'Plugin screenshot — the reference search resolving a component to its board.' }
      ],
      outcome:
        'Published as an MIT-licensed KiCad action plugin. Finding a component across a ' +
        'multi-board project takes about a second instead of opening each PCB in turn, and the ' +
        'same query runs in CI.'
    }
  },

  {
    slug: 'kicad-reliability',
    title: 'Reliability Calculator',
    org: 'SpaceLocker · KiCad plugin',
    years: '2025–2026',
    featured: true,
    tech: ['Python', 'KiCad', 'IEC TR 62380'],
    repo: 'https://github.com/Eliot-Abramo/Kicad-Space-Reliability',
    summary: 'Turns a schematic and block diagram into a reliability model — component stress ' +
             'modelling, uncertainty propagation and system-level rollup, inside KiCad.',
    study: {
      problem:
        'Reliability budgets for space electronics are usually produced late, in a spreadsheet, ' +
        'by someone other than the person who drew the schematic. By the time a number comes ' +
        'back, the design choice that caused it is weeks old. The useful question is not "what ' +
        'is the failure rate" but "which part of this design is driving it, and what should I ' +
        'change first."',
      constraints: [
        'Has to run against the live schematic and block diagram, not an exported snapshot.',
        'A single headline figure is not enough — the assumptions behind it have to be inspectable.',
        'Results need to be defensible in a formal design review.'
      ],
      build: [
        'Component-level failure rate estimation using IEC TR 62380 stress modelling.',
        'Rollup from component to system level, following the block diagram.',
        'Uncertainty propagation, so the output is a range with stated assumptions rather ' +
          'than a single mysterious number.',
        'Sensitivity analysis identifying dominant contributors and likely improvement paths.',
        'Report generation for design-review data packages.'
      ],
      specs: [
        ['Standard', 'IEC TR 62380 (2004)'],
        ['Version', '3.3.0'],
        ['Licence', 'MIT'],
        ['Stars', '5'],
        ['Output', 'component + system rollup, with uncertainty']
      ],
      figures: [
        { gap: 'Plugin output — system rollup with dominant contributors ranked.' }
      ],
      outcome:
        'Used to give end-to-end traceability from schematic and BOM through to a reliability ' +
        'budget, so the trade-off shows up while the design is still open rather than after it ' +
        'is frozen.'
    }
  },

  {
    slug: 'kicad-thermal',
    title: 'TVAC Thermal Analyzer',
    org: 'Open source · KiCad plugin',
    years: '2026',
    tech: ['Python', 'C / OpenMP', 'KiCad', 'SciPy'],
    repo: 'https://github.com/Eliot-Abramo/Kicad-Thermal-Analysis',
    summary: 'Thermal analysis for PCBs that have to survive a thermal vacuum chamber, where ' +
             'convection does not exist and radiation dominates.',
    study: {
      problem:
        'Standard PCB thermal tooling assumes air. In a thermal vacuum chamber there is no ' +
        'convection at all, so heat leaves a board by conduction into its mounting points and ' +
        'by radiation — which makes the usual intuitions about where a hotspot will appear ' +
        'unreliable.',
      constraints: [
        'Radiation-dominated transfer, so the model cannot lean on convective coefficients.',
        'Multi-layer copper stackups conduct heat very differently in-plane than through-plane.',
        'Mounting points act as fixed-temperature boundaries and often dominate the result.'
      ],
      build: [
        'Radiation-dominated heat transfer modelling for vacuum conditions.',
        'Three-dimensional stackup model with per-layer thermal conductance and realistic materials.',
        'Component power dissipation configured per part; heatsinks defined as User-layer polygons.',
        'Mounting points as fixed thermal boundaries.',
        'Both transient and steady-state solutions.',
        'An optional native solver built with OpenMP for when the Python path is too slow.',
        'Interactive BOM-style pan-and-zoom view with the thermal map overlaid, plus PDF reports.'
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
        'Gives a hotspot map and a thermal-relief check before a board goes to fab, aimed at ' +
        'the TVAC campaign rather than at bench conditions.'
    }
  },

  /* -------------------------------------------------------------- FPGA -- */
  {
    slug: 'astrorapide',
    title: 'Astrorapide',
    org: 'EPFL',
    years: '2024',
    featured: true,
    tech: ['C++', 'Vitis HLS', 'Zynq-7020', 'PYNQ'],
    repo: 'https://github.com/Eliot-Abramo/Astrorapide',
    summary: 'FPGA-accelerated radio-astronomy pipeline turning telescope samples into ' +
             'hydrogen-line spectra and radial-velocity estimates on a Zynq-7020.',
    study: {
      problem:
        'Neutral hydrogen emits at roughly 21 cm. Motion along the line of sight shifts that ' +
        'emission away from its rest frequency, and measuring the shift gives radial velocity — ' +
        'which across many directions says something about the structure and rotation of the ' +
        'Milky Way. Getting from recorded complex samples to a candidate peak means a full ' +
        'signal chain, and on a Zynq-7020 the FFT is where the time goes.',
      constraints: [
        'Fixed FPGA fabric — a Zynq-7020 on a PYNQ-Z2, so resources are the hard limit.',
        'The transform dominates runtime, but FFT size trades directly against resolution.',
        'Latency, energy, resource use, flexibility and signal fidelity all pull against each other.'
      ],
      build: [
        'Full pipeline: windowing, Fourier analysis, power-spectrum estimation, smoothing, ' +
          'calibration, peak detection, then Doppler conversion.',
        'A custom HLS FFT accelerator in the PL, with the ARM cores orchestrating data movement ' +
          'and finishing the spectral analysis.',
        'Ten analysis configurations spanning FFT sizes from 1K to 512K samples.',
        'A sequence of hardware designs exploring the trade-off space, with the measurements kept.',
        'Final design: a deeply pipelined fixed-size 4096-point FFT, processing transforms in ' +
          'batches through contiguous shared buffers.'
      ],
      specs: [
        ['Board', 'PYNQ-Z2 · Zynq-7020'],
        ['Hydrogen line', '1420.405 751 77 MHz'],
        ['FFT sizes explored', '1K – 512K samples'],
        ['Final accelerator', '4096-point, pipelined'],
        ['Data source', "EPFL VEGA telescope"]
      ],
      figures: [
        { src: 'img/galaxy-detect.png',
          caption: 'Host, driver and kernel layers. One proxy fronts the XADC, FFT and ' +
                   'convolution drivers, letting the same CLI run software or hardware mode.' }
      ],
      outcome:
        'The repository keeps the working PYNQ overlay, the design iterations that led to it, ' +
        'and the original measurements used to compare them. The computational path from ' +
        'recorded samples to candidate peak frequencies and velocity estimates is implemented ' +
        'end to end — though the scientific interpretation still depends on the quality and ' +
        'calibration of the telescope data, and is not claimed here as an independently ' +
        'validated galactic measurement.'
    }
  },

  {
    slug: 'fpga-cnn-accel',
    title: 'CNN Convolution Accelerator',
    org: 'EPFL',
    years: '2024',
    tech: ['Vitis HLS', 'C++', 'Zynq-7020', 'AXI'],
    repo: 'https://github.com/Eliot-Abramo/FPGA_CNN_Accel',
    summary: 'A 3×3 convolution accelerator in Vitis HLS — three caching layers and four filters ' +
             'computed in lock-step, at II=1 on 28 nm Zynq fabric.',
    study: {
      problem:
        'A convolution layer on an embedded ARM core spends most of its time waiting on external ' +
        'memory rather than doing arithmetic. Moving the convolution into fabric only helps if ' +
        'the memory traffic moves with it — otherwise the accelerator starves.',
      constraints: [
        'DSP48 slices set the numeric format before anything else does.',
        'External memory bandwidth, not multiply throughput, is the real bottleneck.',
        'The accelerator has to drop into the Linux application already running on the ARM cores.'
      ],
      build: [
        'Coefficient caching in BRAM for four filters, cyclically partitioned so all four ' +
          'read in parallel.',
        'Triple line buffers sized to the worst case, giving row re-use across the sliding window.',
        'Loop fusion and a fully pipelined inner loop at initiation interval 1.',
        'A single burst-optimised AXI master interface, 256-beat bursts.',
        'Fixed-point throughout, chosen to fit the DSP48 multipliers.'
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
          caption: 'Dataflow. The DMA controller burst-reads coefficients and pixels into ' +
                   'fabric, and burst-writes the output feature map back.' }
      ],
      outcome:
        'The accelerator is integrated into the Linux application on the ARM cores and cuts ' +
        'external memory accesses relative to the software-only baseline, which is what the ' +
        'caching structure was there to do.'
    }
  },

  /* ---------------------------------------------------------- RF / analog */
  {
    slug: 'analog-activations',
    title: 'Nonlinear Activation Functions for Analog Neurons',
    org: 'Laboratory of Wave Engineering, EPFL',
    role: 'Research Assistant · under Prof. Romain Fleury',
    years: '2024–2025',
    featured: true,
    tech: ['CST Studio', 'VNA', 'Python', 'PIN diodes', 'Optics'],
    links: [{ label: 'Read the thesis (PDF)', href: 'THESIS_ABRAMO.pdf' }],
    summary: 'Two experimental routes to performing a neural-network activation in physics ' +
             'rather than in software — a tunable 2.4 GHz metasurface, and an optical GELU.',
    study: {
      problem:
        'Digital deep learning burns most of its energy moving numbers around. Analog computing ' +
        'offers a way out, but an analog neural network still needs a nonlinearity, and the ' +
        'nonlinearity is the part that resists being done passively. The question was whether a ' +
        'physical effect could stand in for an activation function directly.',
      constraints: [
        'The nonlinearity has to be passive or near-passive, or the energy argument collapses.',
        'A vector network analyser is the debugger — simulation is only a hypothesis until swept.',
        'The response has to be reproducible across many fabricated elements, not just one.'
      ],
      build: [
        'A binary tunable phase metasurface at 2.4 GHz, built from coupled resonators with ' +
          'PIN-diode control, modulating microwave reflection.',
        'Characterisation of the fabricated array by VNA sweep, against CST Studio models.',
        'A second, optical route: emulating a GELU-like activation using structured incoherent ' +
          'light and Fresnel transmission.',
        'Python and C++ processing pipelines for the measured data.'
      ],
      specs: [
        ['Operating frequency', '2.4 GHz'],
        ['Tuning element', 'PIN diodes'],
        ['Metasurface', 'coupled resonators, binary phase'],
        ['Optical target', 'GELU-like activation'],
        ['Instruments', 'VNA, CST Studio Suite']
      ],
      figures: [
        { src: 'img/project5.png',
          caption: 'The fabricated resonator array, the optical bench used for the Fresnel ' +
                   'setup, and the anechoic enclosure used for characterisation.' }
      ],
      outcome:
        'Both approaches demonstrated that a physical nonlinearity can be embedded into an ' +
        'analog computing architecture. The work is written up in full in the thesis; it is a ' +
        'feasibility result on a path toward energy-efficient analog inference, not a deployed ' +
        'accelerator.'
    }
  },

  {
    slug: 'nexus',
    title: 'Nexus — ROS 2 ↔ MCU Bridge',
    org: 'EPFL Xplore',
    years: '2024–2025',
    featured: true,
    tech: ['C++', 'ROS 2', 'ESP32', 'CRC16'],
    repo: 'https://github.com/Eliot-Abramo/Nexus',
    summary: 'Full-duplex bridge carrying CRC-framed packets between bare-metal avionics nodes ' +
             'and a ROS 2 network, with type-safe dispatch across the boundary.',
    study: {
      problem:
        'Avionics nodes speak packed binary over a serial line. ROS 2 speaks typed topics over a ' +
        'network. Getting telemetry from one to the other usually means a fragile translation ' +
        'layer that silently corrupts a field the first time a struct changes on one side.',
      constraints: [
        'Full duplex — commands down and telemetry up, concurrently.',
        'A corrupted frame has to be detected and dropped, not partially dispatched.',
        'Static buffers on the embedded side; no allocation during operation.'
      ],
      build: [
        'A framed packet protocol: two fixed sync bytes, a 16-bit little-endian payload length, ' +
          'then a one-byte message ID.',
        'CRC16 computed over the whole frame and checked before anything is dispatched.',
        'Type-safe dispatch mapping message IDs to handlers on both the embedded and Linux sides.',
        'Fixed transmit and receive buffers on the MCU.',
        'ROS 2 nodes republishing decoded telemetry onto typed topics.'
      ],
      specs: [
        ['Sync bytes', '0xA5 0x5A'],
        ['Length field', '16-bit little-endian'],
        ['CRC', 'CRC16 (X25 / Modbus)'],
        ['Link', 'UART 115 200 / SPI'],
        ['Buffering', 'static, fixed-size']
      ],
      figures: [
        { src: 'img/project1.png',
          caption: 'Bridge topology. The ESP32 avionics node reaches ROS 2 on a Pi 5 over UART; ' +
                   'decoded telemetry is republished to the ground station over Ethernet.' }
      ],
      outcome:
        'Carried live telemetry between the rover avionics and the operator station during the ' +
        'European Rover Challenge 2025.'
    }
  },

  /* ----------------------------------------------- current — write-ups due */
  {
    slug: 'cms-l1-trigger',
    title: 'CMS Level-1 Trigger — AI Engine Pipeline',
    org: 'CERN openlab · DAQ team',
    role: 'FPGA Engineer',
    years: '2026',
    tech: ['AMD Versal ACAP', 'AXI4-Stream', 'PCIe', 'VHDL'],
    summary: 'Clock-domain-crossing FIFO bridging AXI4-Stream input into the AI Engine array on ' +
             'a Versal ACAP, with in-hardware latency probes across the full PL-to-AIE pipeline.',
    note: 'Write-up pending.'
  },

  {
    slug: 'helios-cgra',
    title: 'HELIOS — CGRA Toolchain for the SKA',
    org: 'EPFL ESL / SEAMS',
    role: 'Research Assistant',
    years: '2026',
    tech: ['Python', 'Compiler', 'CGRA', 'DSE'],
    summary: 'Core pieces of a coarse-grained reconfigurable array toolchain for the Square ' +
             'Kilometre Array — compiler, IDE, CLI and a Python design-space-exploration library. ' +
             'Poster presented at SwissChips 2026.',
    note: 'Write-up pending.'
  },

  {
    slug: 'spacelocker-payload',
    title: 'Orbital Payload Electronics',
    org: 'SpaceLocker, Toulouse',
    role: 'Embedded Systems Engineer — Space Payloads',
    years: '2025–2026',
    tech: ['C', 'Rust', 'ECSS', 'TVAC'],
    summary: 'Payload electronics and flight software for a March 2026 orbital launch, including ' +
             'an analog safety board that recovers autonomously from dead-on-arrival failures. ' +
             'Cleared ESA PDR and CDR.',
    note: 'Write-up pending.'
  },

  {
    slug: 'polaris-nova',
    title: 'POLARIS + NOVA',
    org: 'Personal',
    years: '2026',
    tech: ['Zynq UltraScale+', 'VHDL', 'SpaceWire-inspired'],
    summary: 'Dual-FPGA satellite compute platform — POLARIS handles payload data, NOVA provides ' +
             'reconfigurable compute, linked over a custom fabric.',
    note: 'Write-up pending.'
  },

  /* ------------------------------------------------------------- earlier -- */
  {
    slug: 'roco-messagebus',
    title: 'RoCo — Rover Communication API',
    org: 'EPFL Xplore',
    years: '2023–2024',
    tech: ['C++', 'CAN', 'Embedded'],
    repo: 'https://github.com/Eliot-Abramo/BRoCo',
    summary: 'Bus-oriented publish/subscribe API letting every rover subsystem share one ' +
             'communication codebase, with static allocation throughout.',
    study: {
      problem:
        'Every rover subsystem needs to talk to the others, and each one runs different hardware. ' +
        'Without a shared abstraction each team ends up porting or reimplementing the same ' +
        'communication code, and the packet definitions drift apart between subsystems.',
      constraints: [
        'The same source has to run across subsystems with no porting and no extra install.',
        'Targets are embedded, so memory footprint and CPU overhead both matter.',
        'Static allocation predominates — overflow is not an acceptable failure mode.'
      ],
      build: [
        'A MessageBus abstraction where any peer can broadcast and any peer may or may not handle it.',
        'Separate IOBus and NetworkBus backends behind the same interface.',
        'Packet definitions and protocol versioning kept in one core, shared by all modules.',
        'A single public header as the entire API surface.'
      ],
      specs: [
        ['Pattern', 'publish / subscribe'],
        ['Allocation', 'predominantly static'],
        ['Public API', 'one header (RoCo.h)'],
        ['Transports', 'IOBus, NetworkBus']
      ],
      figures: [
        { src: 'img/Broco.png',
          caption: 'Application modules publish and subscribe through one MessageBus, which ' +
                   'fans out to the IO and network backends.' }
      ],
      outcome:
        'Used as the shared communication layer across rover subsystems, so one implementation ' +
        'served all of them rather than each maintaining its own.'
    }
  },

  {
    slug: 'fractal-pong',
    title: 'Real-Time Fractal Pong',
    org: 'EPFL',
    years: '2024',
    tech: ['VHDL', 'PYNQ-Z2', 'Fixed-point', 'BRAM'],
    repo: 'https://github.com/Eliot-Abramo/Best_DSD_Team',
    summary: 'Pong played over a live Mandelbrot set, generated entirely in fabric — a pipelined ' +
             'fixed-point fractal core and an event-driven game FSM sharing a framebuffer.',
    study: {
      problem:
        'Rendering a Mandelbrot set per frame is expensive, and playing a game on top of it means ' +
        'two things want the framebuffer at once: the fractal generator writing pixels and the ' +
        'display reading them. Doing it all in VHDL with no processor means solving that ' +
        'arbitration in hardware.',
      constraints: [
        'No CPU — the whole thing lives in fabric.',
        'Fractal generation and display run in different clock domains.',
        'Fixed-point only; the coordinate precision directly sets how far you can zoom.'
      ],
      build: [
        'A fully pipelined fixed-point Mandelbrot generator computing up to 255 iterations per pixel.',
        'An event-driven Pong FSM with collision detection, paddle AI modes and a dynamic ' +
          'obstacle overlay on the fractal background.',
        'A dual-port Block RAM framebuffer, arbitrating simultaneous fractal writes and display reads.',
        'Generics for coordinate precision and screen size, so the design re-targets without a rewrite.',
        'Clock-domain crossing between the generator and the video output, with testbenches.'
      ],
      specs: [
        ['Board', 'PYNQ-Z2'],
        ['Language', 'VHDL (no soft core)'],
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

  {
    slug: 'atmega128-alarm',
    title: 'ATmega128 Alarm, Timer and Sprinkler Controller',
    org: 'EPFL',
    years: '2023',
    tech: ['AVR Assembly', 'ATmega128', 'I²C'],
    repo: 'https://github.com/Eliot-Abramo/microcontrolleur',
    summary: 'An alarm clock, a millisecond countdown timer and a solenoid sprinkler controller, ' +
             'written by hand in AVR assembly — including the maths library.',
    study: {
      problem:
        'Three real-time behaviours on one 8-bit microcontroller, written in assembly, with no ' +
        'standard library to fall back on. Scheduling, display refresh and actuator control all ' +
        'have to share one CPU without any of them slipping.',
      constraints: [
        'Assembly only — every register allocation is manual.',
        'No floating point and no maths library on the part.',
        'The timer needs millisecond precision while the display and keypad keep responding.'
      ],
      build: [
        'Timer0 in CTC mode as the time base, with an external interrupt for button input.',
        'A hand-written assembly maths library, including a two-byte Taylor series routine.',
        'Keypad matrix and push-button input on PortA, display on PortC, actuators on PortD.',
        'An I²C real-time clock module for wall-clock time across resets.',
        'Buzzer driven from OC2, solenoid valve driven from PortD.'
      ],
      specs: [
        ['MCU', 'ATmega128 (8-bit AVR)'],
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
        'All three functions run on one part: multiple alarm schedules, a millisecond countdown, ' +
        'and valve control, with the display and keypad staying responsive throughout.'
    }
  },

  {
    slug: 'bbb-image-forge',
    title: 'BBB Image Forge',
    org: 'Personal',
    years: '2026',
    tech: ['Python', 'Linux', 'BeagleBone'],
    repo: 'https://github.com/Eliot-Abramo/BBB-Image-Flasher',
    summary: 'Builds a BeagleBone Black image from a profile and flashes it to an SD card, from ' +
             'a local web UI. Builds on Linux or WSL, flashes from Linux or native Windows.'
  }

];
