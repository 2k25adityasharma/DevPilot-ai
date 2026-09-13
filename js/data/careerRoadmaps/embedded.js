/**
 * DevPilot-AI — Career Roadmap: Embedded Systems Engineer
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const embeddedRoadmap = {
  roleId: 'embedded-systems-engineer',
  roadmapId: 'embedded',
  title: 'Embedded Systems Engineer',
  category: 'development',
  description: 'Program hardware microcontrollers and real-time embedded systems in C/C++: bare-metal registers, FreeRTOS, communication protocols (UART, SPI, I2C, CAN), and hardware debugging.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Embedded C/C++, bit manipulation, electronics basics, microcontroller architectures, and memory maps.',
      skills: [
        {
          id: 'emb-c-core',
          title: 'Embedded C Programming & Bit Manipulation',
          category: 'Programming Languages',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: [],
          description: 'Master low-level C for hardware: pointer arithmetic, memory layout (Flash vs SRAM), volatile keyword, bit masking, struct packing, and memory-mapped I/O.',
          whatToLearn: [
            'C language fundamentals: fixed-width integers (stdint.h: uint8_t, uint32_t), pointers, pointer arithmetic',
            'Bitwise operators: AND (&), OR (|), XOR (^), NOT (~), left/right shift (<<, >>)',
            'Bit masking operations: setting, clearing, toggling, and reading specific register bits',
            'Hardware keywords: volatile (preventing compiler optimization of hardware registers), const, static',
            'Memory management: stack vs heap (and why dynamic heap allocation is avoided in safety-critical firmware)',
            'Struct alignment, padding, and compiler attributes (__attribute__((packed))) for binary packet framing'
          ],
          whyItMatters: 'Firmware interacts directly with hardware registers. Misusing pointers or omitting volatile causes silent hardware lockups and hard faults.',
          productionUse: 'Writing hardware device drivers, sensor interfaces, and bootloaders in medical, automotive, and aerospace devices.',
          aiRelevance: 'Low',
          aiWorkflow: 'Verify all pointer arithmetic and bit-shift boundaries manually; AI frequently generates unsafe buffer indexing code.',
          handsOnTask: 'Implement a circular ring buffer (FIFO) and bit-packed telemetry serializer in pure C with zero dynamic memory allocation.',
          projectApplication: 'Serves as the foundation for all hardware drivers and RTOS communication queues.',
          resources: [
            { title: 'Modern Embedded Systems Programming by Miro Samek', url: 'https://www.youtube.com/playlist?list=PLPW8O6W-1chwyTzI3BHwBLbGQoPFxPAPM', type: 'video' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'emb-electronics-mcu',
          title: 'Electronics Fundamentals & Microcontroller Architecture (ARM Cortex-M)',
          category: 'Hardware Foundations',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['emb-c-core'],
          description: 'Understand microcontroller hardware: ARM Cortex-M architecture (registers, ALU, pipeline), schematic reading, Ohm’s Law, pull-up/pull-down resistors, and logic levels.',
          whatToLearn: [
            'Basic electronics: Voltage (V), Current (I), Resistance (R), Ohm’s Law (V = IR), capacitors, diodes',
            'Digital logic levels: 3.3V vs 5V logic, pull-up and pull-down resistors, floating pins, floating inputs',
            'Reading circuit schematics and hardware component datasheets',
            'ARM Cortex-M core architecture: General purpose registers (R0-R15), Program Counter (PC), Link Register (LR), Stack Pointers (MSP vs PSP)',
            'Microcontroller memory maps: Flash memory (code/constants), SRAM (variables), and Peripheral Register space'
          ],
          whyItMatters: 'Embedded software cannot be separated from hardware physics. Connecting mismatched voltage levels or omitting pull-up resistors burns chips permanently.',
          productionUse: 'Interpreting electrical schematics, selecting microcontrollers, and verifying hardware electrical compatibility.',
          aiRelevance: 'Low',
          aiWorkflow: 'Always cross-reference circuit pinouts and electrical ratings directly against manufacturer silicon errata datasheets.',
          handsOnTask: 'Calculate resistor values for an LED current limiter and pull-up button input, and read an ARM Cortex-M memory map datasheet.',
          projectApplication: 'Informs circuit wiring and pin assignments across all hardware projects.',
          resources: [
            { title: 'ARM Cortex-M for Beginners', url: 'https://developer.arm.com/documentation/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'Bare-metal peripheral programming (GPIO, Timers, Interrupts) and hardware communication protocols (UART, SPI, I2C).',
      skills: [
        {
          id: 'emb-peripherals-gpio',
          title: 'Bare-Metal Peripherals: GPIO, Timers & Hardware Interrupts (NVIC)',
          category: 'Microcontroller Peripherals',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['emb-electronics-mcu'],
          description: 'Program hardware without external libraries: configuring memory-mapped registers for GPIO inputs/outputs, hardware hardware timers, PWM generation, and Nested Vectored Interrupt Controller (NVIC).',
          whatToLearn: [
            'Memory-mapped I/O: dereferencing peripheral base addresses and struct offsets',
            'GPIO configuration: input floating, input pull-up/pull-down, output push-pull, output open-drain, and slew rate',
            'Hardware timers: prescalers, auto-reload registers (ARR), timer overflow interrupts, and tick generation',
            'Pulse Width Modulation (PWM): duty cycle, frequency calculation, and driving LEDs or motors',
            'Hardware Interrupts: Interrupt Service Routines (ISRs), interrupt vector tables, NVIC priorities, and preemptive nesting',
            'Interrupt safety: keeping ISRs short, volatile shared flags, atomic operations, and disabling interrupts during critical sections'
          ],
          whyItMatters: 'Polling buttons in while loops burns CPU cycles and drops inputs. Hardware interrupts ensure real-time responsiveness to external events.',
          productionUse: 'Controlling motors, reading sensors, triggering emergency stop sequences, and managing precision timing.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate timer prescaler mathematical calculations based on target CPU clock frequencies; audit register assignments against the datasheet.',
          handsOnTask: 'Write a bare-metal register-level driver for an STM32/ESP32 that configures a hardware timer interrupt to generate precise PWM motor signals.',
          projectApplication: 'Core control layer for the Sensor Acquisition & Actuator Controller project.',
          resources: [
            { title: 'STM32 Reference Manual (RM0090 or equivalent)', url: 'https://www.st.com/en/microcontrollers-microprocessors.html', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'emb-comm-protocols',
          title: 'Serial Communication Protocols: UART, SPI & I2C',
          category: 'Communication Protocols',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['emb-peripherals-gpio'],
          description: 'Master embedded serial buses: Universal Asynchronous Receiver-Transmitter (UART), Serial Peripheral Interface (SPI), and Inter-Integrated Circuit (I2C) with DMA transfers.',
          whatToLearn: [
            'UART: baud rates, start/stop bits, parity, framing errors, circular buffer reception via interrupts',
            'I2C: master-slave architecture, SDA/SCL lines, open-drain with pull-ups, 7-bit addressing, ACK/NACK, clock stretching',
            'SPI: full-duplex synchronous bus, MOSI, MISO, SCK, CS/SS lines, clock polarity (CPOL) and phase (CPHA) modes',
            'Direct Memory Access (DMA): offloading data transfer between peripherals and memory without CPU intervention'
          ],
          whyItMatters: 'Almost all sensors, displays, flash memories, and wireless radios interface with microcontrollers via UART, SPI, or I2C.',
          productionUse: 'Interfacing temperature sensors, IMU accelerometers, OLED displays, and cellular/GPS modems.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft I2C device register read/write sequences from datasheet specifications; verify timing diagrams with a logic analyzer.',
          handsOnTask: 'Write bare-metal SPI and I2C drivers that communicate with an external OLED display and an IMU accelerometer simultaneously.',
          projectApplication: 'Powers sensor communications in the Environmental IoT Weather Station project.',
          resources: [
            { title: 'SparkFun I2C and SPI Tutorials', url: 'https://learn.sparkfun.com/tutorials/i2c', type: 'tutorial' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Real-Time Operating Systems (FreeRTOS), multitasking, semaphores, queues, and ADC/DAC analog signal conversion.',
      skills: [
        {
          id: 'emb-freertos-multitasking',
          title: 'Real-Time Operating Systems (FreeRTOS) & Multitasking',
          category: 'Real-Time Operating Systems',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['emb-comm-protocols'],
          description: 'Master preemptive multitasking with FreeRTOS: tasks, priority scheduling, queues, binary/counting semaphores, mutexes (priority inversion), and software timers.',
          whatToLearn: [
            'Why an RTOS: super-loop (bare-metal) limitations vs deterministic preemptive multitasking',
            'Task lifecycle: Ready, Running, Blocked, Suspended states, and task stack allocation',
            'Inter-task communication: FreeRTOS Queues for thread-safe message passing',
            'Synchronization primitives: Binary Semaphores, Counting Semaphores, Mutexes, and Recursive Mutexes',
            'Concurrency hazards: Race conditions, Deadlocks, Priority Inversion, and Priority Inheritance solutions',
            'FreeRTOS memory management schemes (heap_1 through heap_5) and stack overflow hook detection'
          ],
          whyItMatters: 'Complex embedded devices have multiple concurrent demands (sensor logging, display rendering, user inputs, motor control). An RTOS guarantees real-time deadlines.',
          productionUse: 'Consumer electronics, automotive instrument clusters, smart home hubs, and drones.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate FreeRTOS task skeleton structures and queue definitions; carefully inspect task priorities and mutex scopes.',
          handsOnTask: 'Build a multi-task FreeRTOS application with 4 concurrent tasks (Sensor Task, Display Task, Network Task, Watchdog Task) coordinated via queues and mutexes.',
          projectApplication: 'Core firmware architecture for the Industrial Telemetry & Actuator Controller.',
          resources: [
            { title: 'Mastering the FreeRTOS Real Time Kernel', url: 'https://www.freertos.org/Documentation/RTOS_book.html', type: 'book' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'emb-analog-adc-dac',
          title: 'Analog Signal Processing: ADC, DAC & Sensor Calibration',
          category: 'Analog Hardware',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Essential',
          estimatedTime: '2 weeks',
          prerequisites: ['emb-peripherals-gpio'],
          description: 'Interface with the physical analog world: Analog-to-Digital Converters (ADC), sampling rates, resolution (10/12-bit), voltage references, digital filtering (Moving Average), and DAC output.',
          whatToLearn: [
            'Analog to Digital Conversion (ADC): sampling frequency, Nyquist theorem, resolution, quantization error',
            'ADC channels: single conversion vs continuous scan mode with DMA buffering',
            'Signal conditioning: voltage dividers, op-amp buffers, anti-aliasing low-pass RC filters',
            'Digital filtering algorithms: Simple Moving Average (SMA), Exponential Moving Average (EMA), and Kalman filter basics',
            'Digital to Analog Converters (DAC): generating analog waveforms and audio playback'
          ],
          whyItMatters: 'Physical phenomena (temperature, pressure, audio, vibration) are continuous analog signals that must be accurately digitized and filtered.',
          productionUse: 'Battery voltage monitoring, industrial pressure transducers, temperature sensors, and audio outputs.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to formulate moving average and low-pass filter coefficients; verify signal noise on an oscilloscope.',
          handsOnTask: 'Read an analog pressure transducer via 12-bit ADC with DMA and implement an exponential moving average filter to eliminate electrical noise.',
          projectApplication: 'Used for sensor readings in the Environmental IoT Weather Station.',
          resources: [
            { title: 'Analog Devices: ADC Tutorial', url: 'https://www.analog.com/en/resources/analog-dialogue.html', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Automotive & industrial CAN bus, bootloaders, hardware debugging (JTAG/SWD, Logic Analyzers), and embedded security.',
      skills: [
        {
          id: 'emb-can-industrial',
          title: 'Industrial & Automotive Networking: CAN Bus Protocol',
          category: 'Industrial Protocols',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['emb-freertos-multitasking'],
          description: 'Master Controller Area Network (CAN) bus: differential signaling (CAN High / Low), 11-bit/29-bit identifiers, bit arbitration, CAN transceivers, error frames, and CANopen/J1939.',
          whatToLearn: [
            'Physical layer: differential voltage signaling, 120-ohm termination resistors, twisted pair cables, CAN transceivers',
            'Message framing: Standard (11-bit ID) vs Extended (29-bit ID), Data frames, Remote frames, Error frames',
            'Non-destructive bitwise arbitration: collision resolution and message priority management',
            'Hardware acceptance filters and masks to reduce CPU processing overhead on CAN controllers',
            'CAN-FD (Flexible Data-rate) improvements: higher bandwidth (up to 5 Mbps) and 64-byte payloads'
          ],
          whyItMatters: 'CAN bus is the gold standard for high-reliability, noise-immune communication in automotive, aerospace, and factory automation equipment.',
          productionUse: 'Automotive vehicle electronic control units (ECUs), robotics joint communication, and industrial automation.',
          aiRelevance: 'Low',
          aiWorkflow: 'Verify CAN timing registers (Time Quanta, Propagation Segment, Phase Segments) against target baud rates and oscillator frequencies.',
          handsOnTask: 'Build a two-node CAN bus network that transmits real-time telemetry frames with hardware filter acceptance and bus error recovery.',
          projectApplication: 'Powers inter-board communication in the Automotive Vehicle Telemetry ECU project.',
          resources: [
            { title: 'Kvaser CAN Protocol Tutorial', url: 'https://www.kvaser.com/can-protocol-tutorial/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'emb-debugging-jtag',
          title: 'Hardware Debugging: Logic Analyzers, Oscilloscopes & JTAG/SWD',
          category: 'Hardware Debugging',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['emb-can-industrial'],
          description: 'Master hardware-level troubleshooting: Saleae Logic analyzers, digital storage oscilloscopes (DSO), hardware breakpoints via JTAG / Serial Wire Debug (SWD), and GDB debugging.',
          whatToLearn: [
            'JTAG (IEEE 1149.1) & ARM SWD (Serial Wire Debug) protocols: SWDIO, SWCLK, debug access ports (DAP)',
            'GDB debugging over OpenOCD / J-Link: hardware watchpoints, single-stepping, inspecting peripheral registers, call stack unwinding',
            'Analyzing Hard Fault crashes: reading CFSR (Configurable Fault Status Register) and analyzing assembly instructions around fault addresses',
            'Logic Analyzer usage: decoding I2C, SPI, UART, and CAN waveforms to debug timing violations, clock glitches, and bus conflicts',
            'Oscilloscope basics: measuring rise times, voltage ripple, signal integrity, and ground bounce'
          ],
          whyItMatters: 'Print statements (printf) cannot debug timing-sensitive interrupts or silent hard faults. Hardware debuggers expose what the silicon is doing in real time.',
          productionUse: 'Diagnosing board bring-up issues, memory corruption, and intermittent communication failures.',
          aiRelevance: 'Low',
          aiWorkflow: 'Capture hardware traces using physical instruments; AI cannot replace an oscilloscope reading real voltage signals.',
          handsOnTask: 'Trigger a deliberate memory alignment Hard Fault on a microcontroller and use GDB to inspect registers, locate the faulting instruction, and resolve it.',
          projectApplication: 'Used to validate and debug all firmware deliverables in the capstone projects.',
          resources: [
            { title: 'Saleae Logic Analyzer Guide', url: 'https://support.saleae.com/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'Custom bootloaders, Over-The-Air (OTA) firmware updates, embedded Linux basics, and technical firmware interview preparation.',
      skills: [
        {
          id: 'emb-bootloaders-ota',
          title: 'Custom Bootloaders, Flash Memory & Secure OTA Updates',
          category: 'Firmware Architecture',
          level: 'Level 5: Job Ready',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['emb-debugging-jtag'],
          description: 'Build production firmware bootloaders: Flash sector erasing/programming, vector table relocation, dual-bank A/B firmware updates, and cryptographic image verification.',
          whatToLearn: [
            'Internal Flash memory architecture: sectors, pages, write/erase cycles, and endurance limitations',
            'Vector table relocation (VTOR register) to transfer execution from bootloader to application code',
            'Dual-bank A/B partitioning: active slot, staging slot, and automated rollback upon failed boots',
            'Firmware image integrity and security: CRC32 checksums, SHA-256 hashes, and asymmetric cryptographic signature verification (Ed25519 / RSA)',
            'Over-The-Air (OTA) update protocols over UART, BLE, or Wi-Fi'
          ],
          whyItMatters: 'A bug in deployed hardware without a reliable bootloader requires recalling physical hardware. A bricked device during an update ruins customer trust.',
          productionUse: 'Field-updating IoT devices, smart consumer products, automotive ECUs, and industrial controllers.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate CRC32 checksum verification functions and state machine rollback diagrams.',
          handsOnTask: 'Write a custom UART bootloader that receives an encrypted firmware binary over serial, validates its signature, flashes it to memory, and jumps to the application.',
          projectApplication: 'Implements the secure bootloader for the Automotive Vehicle Telemetry ECU project.',
          resources: [
            { title: 'Embedded Bootloader Design (Embedded Artistry)', url: 'https://embeddedartistry.com/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'emb-portfolio-interview',
          title: 'Embedded Systems Portfolio, Hardware Showcases & Interviews',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['emb-bootloaders-ota'],
          description: 'Document hardware and firmware projects with schematics, oscilloscope captures, write technical post-mortems, and prepare for embedded C and systems design interviews.',
          whatToLearn: [
            'Documenting hardware projects: circuit schematics, bill of materials (BOM), PCB layouts, oscilloscope wave captures',
            'Embedded C coding interviews: pointer manipulation, bitwise puzzles, memory layout, volatile semantics, and circular buffers under 45-minute limits',
            'Embedded System Design interview rounds: designing a battery-powered heart rate monitor, smart thermostat, or automotive ABS controller',
            'Explaining trade-offs: power consumption vs CPU frequency, bare-metal vs RTOS, polling vs interrupts'
          ],
          whyItMatters: 'Demonstrating physical hardware projects with clean C code, schematics, and oscilloscope screenshots proves hands-on competence to engineering managers.',
          productionUse: 'Securing firmware engineer, embedded software engineer, and IoT systems developer roles.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to quiz yourself on tricky embedded C pointer interview questions and volatile keyword edge cases.',
          handsOnTask: 'Create an engineering portfolio case study featuring schematic diagrams, logic analyzer traces, and a video demonstration of your capstone firmware.',
          projectApplication: 'Presents your hardware and firmware engineering capabilities to hiring teams.',
          resources: [
            { title: 'Embedded Systems Interview Questions (GitHub)', url: 'https://github.com/carlosperate/embedded-systems-interview-questions', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'emb-proj-1',
      title: 'Environmental Sensor Station with Bare-Metal Drivers',
      difficulty: 'Beginner',
      estimatedTime: '3 weeks',
      objective: 'Build a bare-metal embedded sensor node in C that reads temperature/humidity via I2C and outputs formatted data to an OLED display and UART CLI.',
      technologies: ['C (C99)', 'STM32 / ESP32', 'I2C', 'SPI', 'UART', 'Bare-Metal Registers'],
      skillsPracticed: ['Memory-mapped I/O', 'I2C driver writing', 'SPI OLED control', 'Bitwise masking', 'Interrupt-driven UART'],
      requirements: [
        'Bare-metal I2C driver communicating with an environmental sensor (BME280 / SHT31) without third-party libraries',
        'Bare-metal SPI driver rendering temperature, humidity, and barometric pressure graphs on an SSD1306 OLED display',
        'Interactive UART serial command-line interface (CLI) allowing users to query sensor data and change sampling rates',
        'Low-power sleep mode implementation between measurement intervals'
      ],
      deliverables: [
        'Complete C source code repository with zero HAL/library bloat',
        'Logic analyzer trace captures demonstrating valid I2C start/stop conditions and ACK responses',
        'Video demonstration showing live sensor readings responding to environmental changes'
      ],
      productionExpectations: [
        'Robust error handling recovering gracefully from I2C bus locks (clock stretching timeout)',
        'Zero dynamic heap memory allocations (malloc/free)'
      ],
      aiIntegration: 'Use AI to draft byte-level command sequences from the OLED display datasheet.'
    },
    {
      id: 'emb-proj-2',
      title: 'FreeRTOS Industrial Telemetry & PID Motor Controller',
      difficulty: 'Intermediate',
      estimatedTime: '5 weeks',
      objective: 'Develop a deterministic real-time motor controller with FreeRTOS, optical encoder interrupts, PID closed-loop velocity control, and an emergency watchdog.',
      technologies: ['C / C++', 'FreeRTOS', 'Hardware Timers & PWM', 'Quadrature Encoders', 'PID Control', 'ADC'],
      skillsPracticed: ['Preemptive multitasking', 'FreeRTOS queues and mutexes', 'Closed-loop PID algorithm', 'Hardware timer encoder mode', 'Watchdog timer'],
      requirements: [
        'Deterministic FreeRTOS task architecture: 100Hz Motor PID Task, 10Hz Telemetry Task, 1Hz System Health Task',
        'Closed-loop Proportional-Integral-Derivative (PID) velocity control maintaining target RPM under variable load',
        'Hardware timer configured in quadrature encoder mode for precision speed and direction measurement',
        'Hardware Independent Watchdog (IWDG) ensuring automatic reboot if any task hangs'
      ],
      deliverables: [
        'Documented firmware codebase with FreeRTOS configuration headers',
        'Step response graph showing PID motor velocity settling time under 200ms with minimal overshoot',
        'Logic analyzer capture proving deterministic task execution within scheduled time slots'
      ],
      productionExpectations: [
        'Thread-safe communication between tasks using FreeRTOS queues with zero shared global variables without mutexes',
        'No priority inversion hazards through verified mutex priority inheritance'
      ],
      aiIntegration: 'Use AI to assist in calculating initial PID gain coefficients (Kp, Ki, Kd) based on motor specifications.'
    },
    {
      id: 'emb-proj-3',
      title: 'Automotive Vehicle Telemetry ECU & Secure Bootloader',
      difficulty: 'Production',
      estimatedTime: '7-8 weeks',
      objective: 'Architect an automotive electronic control unit (ECU) with dual-node CAN bus communication, analog sensor acquisition, and a custom cryptographic bootloader.',
      technologies: ['C / Embedded C++', 'CAN Bus (CAN 2.0B / CAN-FD)', 'FreeRTOS', 'Custom Bootloader', 'Flash Memory', 'JTAG/SWD Debugging'],
      skillsPracticed: ['CAN bus networking', 'Hardware message filtering', 'A/B Flash partitioning', 'Cryptographic verification', 'Fault diagnosis'],
      requirements: [
        'Two-node CAN bus network transmitting speed, throttle position, and engine temperature frames at 500 kbps',
        'Hardware acceptance filters configured to accept specific message IDs with zero CPU interrupt overhead for irrelevant frames',
        'Custom UART/CAN bootloader supporting dual-bank A/B Flash memory partitioning with automated rollback upon failed firmware validation',
        'Firmware integrity checking with SHA-256 hashing and CRC32 verification before jumping to application vector table'
      ],
      deliverables: [
        'Complete firmware repository for both ECU node and custom bootloader',
        'Oscilloscope captures of differential CAN High/Low signals demonstrating clean eye diagrams and 120-ohm termination',
        'Comprehensive technical report detailing bootloader flash memory maps and CAN arbitration test results'
      ],
      productionExpectations: [
        'Full compliance with ISO 11898 CAN bus physical layer specifications',
        'Zero bricking risk during firmware updates through atomic boot flag commits'
      ],
      aiIntegration: 'Use AI to generate CAN message matrix DBC file definitions and verify CRC32 polynomial computation.'
    }
  ],
  checklist: {
    technicalSkills: [
      'Embedded C fluency: bitwise operations, volatile keyword, pointers, and memory layout',
      'Microcontroller architecture (ARM Cortex-M: registers, stack pointers, memory maps)',
      'Bare-metal peripheral control: GPIO, Timers, PWM, and NVIC Interrupt Service Routines (ISRs)',
      'Serial communication protocols: UART, SPI, and I2C with DMA transfers',
      'Real-Time Operating Systems (FreeRTOS): tasks, queues, semaphores, mutexes, and scheduling',
      'Analog signal processing: 12-bit ADC sampling, digital filtering, and sensor calibration',
      'Industrial and automotive networking: CAN Bus protocol (CAN 2.0B / CAN-FD)',
      'Hardware debugging with logic analyzers, digital oscilloscopes, and JTAG / SWD GDB probes',
      'Custom bootloader development with Flash memory partitioning and cryptographic verification',
      'Low-power sleep mode optimization and hardware watchdog timer implementation'
    ],
    projects: [
      'Environmental sensor station with bare-metal I2C, SPI OLED, and UART CLI drivers',
      'FreeRTOS industrial telemetry and closed-loop PID motor velocity controller',
      'Automotive vehicle telemetry ECU with dual-node CAN bus and secure A/B bootloader',
      'All projects verified with real oscilloscope and logic analyzer signal captures'
    ],
    csFundamentals: [
      'Computer architecture: CPU registers, ALU, pipelines, cache, and memory bus',
      'Real-time operating system concepts: deterministic scheduling, priority inversion, context switching',
      'Signal processing fundamentals: sampling theory (Nyquist), quantization, analog filtering',
      'Data structures for embedded systems: circular ring buffers, bit-packed structs, lookup tables'
    ],
    tools: [
      'IDEs and toolchains: STM32CubeIDE, VS Code with Cortex-Debug, arm-none-eabi-gcc toolchain',
      'Hardware debugging tools: Segger J-Link, ST-Link, OpenOCD, GDB',
      'Measurement equipment: Saleae Logic Analyzer and Digital Storage Oscilloscope (DSO)',
      'PCB and schematic viewers: KiCAD or Altium Designer'
    ],
    deployment: [
      'Flashing binary images (.bin/.hex) to microcontroller Flash via SWD/JTAG probes',
      'In-field firmware updates using custom serial or CAN bootloaders',
      'Memory map configuration using custom GCC linker scripts (.ld files)',
      'Firmware versioning and cryptographic image signing pipelines'
    ],
    portfolio: [
      'Engineering portfolio highlighting physical hardware builds and clean C code samples',
      'Circuit schematics and wiring diagrams included with each project case study',
      'Oscilloscope waveform and logic analyzer screenshots proving bus timing compliance',
      'Demonstration videos showing physical hardware operating in real time'
    ],
    github: [
      'Public GitHub repositories with clean modular C code and comprehensive READMEs',
      'Zero proprietary vendor IDE bloat committed; clean Makefile or CMake build systems',
      'Clear documentation detailing hardware pinouts, wiring diagrams, and build commands',
      'Clean commit history following Conventional Commits format'
    ],
    resume: [
      'Single-page ATS-compliant embedded software engineer resume in PDF format',
      'Bullet points highlighting low-level driver writing, protocol mastery, and hardware debugging',
      'Direct links to GitHub repositories, demonstration videos, and schematic documentation',
      'Targeted keywords matching embedded C developer, firmware engineer, and IoT hardware roles'
    ],
    interviewReadiness: [
      'Mastery of embedded C interview questions: volatile, static, pointer math, memory alignment',
      'Fluency in bit manipulation coding challenges (setting/clearing bits, endianness conversion, ring buffers)',
      'Ability to design embedded systems under hardware constraints (battery life, RAM limits, real-time deadlines)',
      'Clear explanation of communication protocol timing (I2C start/stop, SPI clock modes, CAN arbitration)'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['embedded'] = embeddedRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = embeddedRoadmap;
}
