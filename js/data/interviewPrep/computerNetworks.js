/**
 * DevPilot-AI — Computer Networks Question Bank
 * 160 authentic placement/interview MCQs across 16 topics.
 */

(function () {
  'use strict';

  const computerNetworksData = {
    category: "computerNetworks",
    title: "Computer Networks",
    description: "OSI and TCP/IP models, TCP/UDP, IP addressing, subnetting, DNS, HTTP/HTTPS, TLS, routing, and browser navigation lifecycle.",
    icon: "hub",
    totalTopics: 16,
    topics: [
  "Networking Fundamentals",
  "OSI Model",
  "TCP/IP Model",
  "TCP",
  "UDP",
  "IP Addressing",
  "Subnetting",
  "DNS",
  "DHCP",
  "HTTP / HTTPS",
  "TLS",
  "Routing",
  "ARP",
  "NAT",
  "Firewalls",
  "Network Security"
],
    questions: [
  {
    "id": "cn-fnd-01",
    "category": "computerNetworks",
    "topic": "Networking Fundamentals",
    "difficulty": "easy",
    "question": "What is the difference between Bandwidth and Latency in computer networks?",
    "options": [
      "Bandwidth is the maximum data transfer capacity of a network link (bits/second); Latency is the time delay for a packet to travel from source to destination (milliseconds)",
      "Bandwidth is time delay; Latency is capacity",
      "Bandwidth is measured in meters; Latency in seconds",
      "They are identical metrics"
    ],
    "correctAnswer": 0,
    "explanation": "Bandwidth is channel width/volume; Latency is propagation transit delay."
  },
  {
    "id": "cn-fnd-02",
    "category": "computerNetworks",
    "topic": "Networking Fundamentals",
    "difficulty": "easy",
    "question": "What is the difference between a Hub, a Switch, and a Router?",
    "options": [
      "A Hub broadcasts packets to all ports (Layer 1); a Switch forwards frames based on MAC addresses (Layer 2); a Router routes packets based on IP addresses (Layer 3)",
      "A Hub is for internet; a Switch is for WiFi",
      "A Router connects monitors",
      "They are identical networking devices"
    ],
    "correctAnswer": 0,
    "explanation": "Hubs broadcast naively; Switches switch frames within a LAN; Routers route packets between distinct networks."
  },
  {
    "id": "cn-fnd-03",
    "category": "computerNetworks",
    "topic": "Networking Fundamentals",
    "difficulty": "easy",
    "question": "What is a MAC address (Media Access Control)?",
    "options": [
      "A globally unique 48-bit physical hardware address burned into a Network Interface Card (NIC) (e.g., 00:1A:2B:3C:4D:5E)",
      "A software address assigned by websites",
      "A user account password on Apple computers",
      "An IP address version 6"
    ],
    "correctAnswer": 0,
    "explanation": "MAC addresses provide physical Layer 2 identification on local link segments."
  },
  {
    "id": "cn-fnd-04",
    "category": "computerNetworks",
    "topic": "Networking Fundamentals",
    "difficulty": "easy",
    "question": "What transmission mode allows bidirectional communication, but only in one direction at a time (e.g. Walkie-Talkies)?",
    "options": [
      "Half-Duplex",
      "Full-Duplex",
      "Simplex",
      "Multiplex"
    ],
    "correctAnswer": 0,
    "explanation": "Half-Duplex permits two-way transmission, but strictly one party transmits at any given instant."
  },
  {
    "id": "cn-fnd-05",
    "category": "computerNetworks",
    "topic": "Networking Fundamentals",
    "difficulty": "medium",
    "question": "What is Full-Duplex communication?",
    "options": [
      "Simultaneous bidirectional communication in both directions at the exact same time (e.g. modern Ethernet, telephone calls)",
      "Communication that only goes in one direction",
      "Communication with twice the speed",
      "Wireless communication only"
    ],
    "correctAnswer": 0,
    "explanation": "Full-Duplex enables continuous concurrent sending and receiving without collision."
  },
  {
    "id": "cn-fnd-06",
    "category": "computerNetworks",
    "topic": "Networking Fundamentals",
    "difficulty": "medium",
    "question": "What is 'Jitter' in packet-switched networks?",
    "options": [
      "The statistical variation and fluctuation in packet arrival latency/delay over time, critical in VoIP and video streaming",
      "Physical shaking of Ethernet cables",
      "Losing internet connection completely",
      "A hardware router fan failure"
    ],
    "correctAnswer": 0,
    "explanation": "Jitter measures latency inconsistency; high jitter degrades real-time voice and video feeds."
  },
  {
    "id": "cn-fnd-07",
    "category": "computerNetworks",
    "topic": "Networking Fundamentals",
    "difficulty": "medium",
    "question": "What is Maximum Transmission Unit (MTU) on standard Ethernet networks?",
    "options": [
      "The largest protocol data unit size in bytes that can be communicated in a single network-layer transaction (standard Ethernet MTU is 1500 bytes)",
      "The maximum number of computers on a LAN",
      "The maximum cable length in meters",
      "The maximum WiFi password length"
    ],
    "correctAnswer": 0,
    "explanation": "Standard Ethernet MTU is 1500 bytes; packets exceeding MTU undergo IP fragmentation."
  },
  {
    "id": "cn-fnd-08",
    "category": "computerNetworks",
    "topic": "Networking Fundamentals",
    "difficulty": "medium",
    "question": "What is Round-Trip Time (RTT)?",
    "options": [
      "The total elapsed time taken for a data packet to travel from sender to destination and for the acknowledgment response to return back to sender",
      "The time taken to reboot a router",
      "The time taken to download an image",
      "The ping time divided by two"
    ],
    "correctAnswer": 0,
    "explanation": "RTT measures bidirectional network latency, directly affecting TCP handshake durations."
  },
  {
    "id": "cn-fnd-09",
    "category": "computerNetworks",
    "topic": "Networking Fundamentals",
    "difficulty": "hard",
    "question": "What is Packet Loss and what primary metric causes it under high traffic loads?",
    "options": [
      "When one or more data packets travelling across a network fail to reach destination, typically caused by network congestion filling router interface queues (buffer overflow)",
      "Loss of physical cables",
      "Antivirus software deleting packets",
      "Typing errors in URLs"
    ],
    "correctAnswer": 0,
    "explanation": "When router buffer memory saturates during congestion, incoming packets are dropped (packet loss)."
  },
  {
    "id": "cn-fnd-10",
    "category": "computerNetworks",
    "topic": "Networking Fundamentals",
    "difficulty": "hard",
    "question": "What is 'Throughput' and how does it differ from 'Goodput'?",
    "options": [
      "Throughput is the raw rate of total data delivered over a physical channel (including headers/retransmissions); Goodput is the effective delivery rate of useful application payload data",
      "Goodput is measured in dollars",
      "Throughput applies only to WiFi",
      "They are identical"
    ],
    "correctAnswer": 0,
    "explanation": "Goodput excludes protocol headers, handshakes, and retransmissions, reflecting true application payload velocity."
  },
  {
    "id": "cn-osi-01",
    "category": "computerNetworks",
    "topic": "OSI Model",
    "difficulty": "easy",
    "question": "How many layers are in the ISO/OSI Reference Model?",
    "options": [
      "7 Layers",
      "4 Layers",
      "5 Layers",
      "8 Layers"
    ],
    "correctAnswer": 0,
    "explanation": "The OSI model consists of 7 conceptual layers: Physical, Data Link, Network, Transport, Session, Presentation, Application."
  },
  {
    "id": "cn-osi-02",
    "category": "computerNetworks",
    "topic": "OSI Model",
    "difficulty": "easy",
    "question": "What is the correct sequential order of the OSI model layers from Layer 1 (bottom) to Layer 7 (top)?",
    "options": [
      "Physical, Data Link, Network, Transport, Session, Presentation, Application",
      "Application, Presentation, Session, Transport, Network, Data Link, Physical",
      "Physical, Network, Data Link, Transport, Session, Presentation, Application",
      "Data Link, Physical, Network, Transport, Application, Presentation, Session"
    ],
    "correctAnswer": 0,
    "explanation": "Layer 1=Physical -> 2=Data Link -> 3=Network -> 4=Transport -> 5=Session -> 6=Presentation -> 7=Application (Please Do Not Throw Sausage Pizza Away)."
  },
  {
    "id": "cn-osi-03",
    "category": "computerNetworks",
    "topic": "OSI Model",
    "difficulty": "easy",
    "question": "What is the primary Protocol Data Unit (PDU) at Layer 2 (Data Link Layer)?",
    "options": [
      "Frame",
      "Packet",
      "Segment",
      "Bits"
    ],
    "correctAnswer": 0,
    "explanation": "Layer 1=Bits, Layer 2=Frames, Layer 3=Packets, Layer 4=Segments (or Datagrams), Layers 5-7=Data."
  },
  {
    "id": "cn-osi-04",
    "category": "computerNetworks",
    "topic": "OSI Model",
    "difficulty": "easy",
    "question": "What is the primary PDU at Layer 3 (Network Layer)?",
    "options": [
      "Packet",
      "Frame",
      "Segment",
      "Byte"
    ],
    "correctAnswer": 0,
    "explanation": "Network layer units are designated as Packets (encapsulating IP source and destination)."
  },
  {
    "id": "cn-osi-05",
    "category": "computerNetworks",
    "topic": "OSI Model",
    "difficulty": "easy",
    "question": "Which OSI layer is responsible for end-to-end communication, flow control, and error recovery (e.g. TCP)?",
    "options": [
      "Transport Layer (Layer 4)",
      "Network Layer (Layer 3)",
      "Data Link Layer (Layer 2)",
      "Session Layer (Layer 5)"
    ],
    "correctAnswer": 0,
    "explanation": "The Transport layer guarantees reliable segment delivery and connection multiplexing."
  },
  {
    "id": "cn-osi-06",
    "category": "computerNetworks",
    "topic": "OSI Model",
    "difficulty": "medium",
    "question": "Which OSI layer handles data representation, encryption, compression, and character code translation (e.g. ASCII, SSL/TLS, JPEG)?",
    "options": [
      "Presentation Layer (Layer 6)",
      "Application Layer (Layer 7)",
      "Session Layer (Layer 5)",
      "Transport Layer (Layer 4)"
    ],
    "correctAnswer": 0,
    "explanation": "The Presentation layer ensures data sent from the application layer of one system is readable by another."
  },
  {
    "id": "cn-osi-07",
    "category": "computerNetworks",
    "topic": "OSI Model",
    "difficulty": "medium",
    "question": "Which OSI layer establishes, manages, and terminates communication sessions and synchronization checkpoints between applications?",
    "options": [
      "Session Layer (Layer 5)",
      "Transport Layer (Layer 4)",
      "Application Layer (Layer 7)",
      "Network Layer (Layer 3)"
    ],
    "correctAnswer": 0,
    "explanation": "The Session layer handles dialogue control, session token management, and checkpoint restarts."
  },
  {
    "id": "cn-osi-08",
    "category": "computerNetworks",
    "topic": "OSI Model",
    "difficulty": "medium",
    "question": "At which layer of the OSI model does a standard network Router operate?",
    "options": [
      "Network Layer (Layer 3)",
      "Data Link Layer (Layer 2)",
      "Transport Layer (Layer 4)",
      "Physical Layer (Layer 1)"
    ],
    "correctAnswer": 0,
    "explanation": "Routers inspect Layer 3 IP headers to make routing decisions across network boundaries."
  },
  {
    "id": "cn-osi-09",
    "category": "computerNetworks",
    "topic": "OSI Model",
    "difficulty": "medium",
    "question": "What is 'Data Encapsulation' as a payload travels down the OSI stack from Application to Physical layer?",
    "options": [
      "Each layer wraps the PDU from the layer above with its own header (and trailer at Layer 2) containing layer-specific protocol metadata",
      "Compressing files into a zip",
      "Encrypting passwords",
      "Translating code into machine language"
    ],
    "correctAnswer": 0,
    "explanation": "Headers are prepended at each layer (Data -> Segment -> Packet -> Frame -> Bits) during transmission."
  },
  {
    "id": "cn-osi-10",
    "category": "computerNetworks",
    "topic": "OSI Model",
    "difficulty": "hard",
    "question": "What is 'Decapsulation' on the receiving host?",
    "options": [
      "Stripping away protocol headers layer-by-layer as data moves upward from Layer 1 to Layer 7, unpacking the raw application payload",
      "Deleting packets from disk",
      "Corrupting network data",
      "A routing loop error"
    ],
    "correctAnswer": 0,
    "explanation": "Receiving hosts process and strip headers in reverse order, delivering raw data to target application sockets."
  },
  {
    "id": "cn-tcpip-01",
    "category": "computerNetworks",
    "topic": "TCP/IP Model",
    "difficulty": "easy",
    "question": "How many layers are in the standard TCP/IP Internet Protocol Suite Model?",
    "options": [
      "4 Layers (Network Access, Internet, Transport, Application)",
      "7 Layers",
      "3 Layers",
      "6 Layers"
    ],
    "correctAnswer": 0,
    "explanation": "The TCP/IP suite maps into 4 pragmatic layers: Network Access (Link), Internet, Transport, and Application."
  },
  {
    "id": "cn-tcpip-02",
    "category": "computerNetworks",
    "topic": "TCP/IP Model",
    "difficulty": "easy",
    "question": "Which TCP/IP layer corresponds to the combined Session, Presentation, and Application layers of the OSI model?",
    "options": [
      "Application Layer",
      "Transport Layer",
      "Internet Layer",
      "Network Access Layer"
    ],
    "correctAnswer": 0,
    "explanation": "The TCP/IP model consolidates OSI layers 5, 6, and 7 into a single unified Application layer (HTTP, DNS, SSH, FTP)."
  },
  {
    "id": "cn-tcpip-03",
    "category": "computerNetworks",
    "topic": "TCP/IP Model",
    "difficulty": "easy",
    "question": "Which core protocol operates at the Internet Layer of the TCP/IP stack?",
    "options": [
      "IP (Internet Protocol), ICMP, and ARP",
      "TCP and UDP",
      "HTTP and DNS",
      "Ethernet and Wi-Fi"
    ],
    "correctAnswer": 0,
    "explanation": "The Internet layer is anchored by IP, supported by ICMP (diagnostics) and routing protocols."
  },
  {
    "id": "cn-tcpip-04",
    "category": "computerNetworks",
    "topic": "TCP/IP Model",
    "difficulty": "medium",
    "question": "What is the primary architectural philosophy behind the TCP/IP 'End-to-End Principle'?",
    "options": [
      "Network core routers should remain simple and perform only fast packet forwarding, while intelligence and reliability reside at the endpoints (hosts)",
      "Every computer must connect to every other computer directly",
      "Routers must inspect every packet payload",
      "Data must be encrypted twice"
    ],
    "correctAnswer": 0,
    "explanation": "The End-to-End principle keeps the packet-switched routing core stateless, making the global internet resilient and scalable."
  },
  {
    "id": "cn-tcpip-05",
    "category": "computerNetworks",
    "topic": "TCP/IP Model",
    "difficulty": "medium",
    "question": "Which layer of the TCP/IP model handles physical Ethernet cables and Wi-Fi radio transmissions?",
    "options": [
      "Network Access (Link) Layer",
      "Internet Layer",
      "Transport Layer",
      "Application Layer"
    ],
    "correctAnswer": 0,
    "explanation": "The Network Access layer combines physical hardware transmission and data link frame handling."
  },
  {
    "id": "cn-tcpip-06",
    "category": "computerNetworks",
    "topic": "TCP/IP Model",
    "difficulty": "medium",
    "question": "What is a 'Socket' in TCP/IP network programming?",
    "options": [
      "An endpoint abstraction formed by an IP address and a Port number (e.g. 192.168.1.10:8080) for bidirectional network communication",
      "A physical electrical wall plug",
      "A cable connector on a router",
      "An operating system process ID"
    ],
    "correctAnswer": 0,
    "explanation": "A socket uniquely identifies a network connection endpoint: {protocol, source_ip, source_port, dest_ip, dest_port}."
  },
  {
    "id": "cn-tcpip-07",
    "category": "computerNetworks",
    "topic": "TCP/IP Model",
    "difficulty": "medium",
    "question": "What are 'Well-Known Ports' (ports 0 to 1023) reserved for?",
    "options": [
      "Standard core system protocols and services (e.g. HTTP 80, HTTPS 443, SSH 22, DNS 53) requiring privileged permissions to bind",
      "Ephemeral client connections",
      "Gaming servers",
      "Virus scanner updates"
    ],
    "correctAnswer": 0,
    "explanation": "Ports 0-1023 are standardized by IANA for foundational internet services."
  },
  {
    "id": "cn-tcpip-08",
    "category": "computerNetworks",
    "topic": "TCP/IP Model",
    "difficulty": "medium",
    "question": "What are 'Ephemeral Ports'?",
    "options": [
      "Short-lived dynamic port numbers (e.g. 49152-65535) automatically assigned by the client OS for outbound connections",
      "Ports that permanently remain open",
      "Ports blocked by firewalls",
      "Ports reserved for hardware printers"
    ],
    "correctAnswer": 0,
    "explanation": "Client operating systems allocate temporary ephemeral ports for outbound client-side sockets."
  },
  {
    "id": "cn-tcpip-09",
    "category": "computerNetworks",
    "topic": "TCP/IP Model",
    "difficulty": "hard",
    "question": "What is ICMP (Internet Control Message Protocol) used for?",
    "options": [
      "Network diagnostics, error reporting, and operational queries (e.g. ping Echo Request/Reply, Destination Unreachable)",
      "Downloading web pages",
      "Streaming video",
      "Sending emails"
    ],
    "correctAnswer": 0,
    "explanation": "ICMP runs over IP to report delivery errors and diagnostic telemetry (used by ping and traceroute)."
  },
  {
    "id": "cn-tcpip-10",
    "category": "computerNetworks",
    "topic": "TCP/IP Model",
    "difficulty": "hard",
    "question": "How does the 'traceroute' (tracert) command identify the sequence of routers along a packet path?",
    "options": [
      "Sends packets with incrementally increasing IP Time-To-Live (TTL = 1, 2, 3...), harvesting ICMP 'Time Exceeded' messages returned by each intermediate router",
      "Asks the DNS server for router names",
      "Inspects the client's routing table",
      "Sends an email to each router"
    ],
    "correctAnswer": 0,
    "explanation": "Each router decrements TTL; when TTL reaches 0, the router drops the packet and sends an ICMP Time Exceeded packet back."
  },
  {
    "id": "cn-tcp-01",
    "category": "computerNetworks",
    "topic": "TCP",
    "difficulty": "easy",
    "question": "What are the core characteristics of the Transmission Control Protocol (TCP)?",
    "options": [
      "Connection-oriented, reliable, byte-stream, in-order delivery with flow control and congestion control",
      "Connectionless, unreliable datagram delivery",
      "Broadcasting protocol for video streaming",
      "Hardware link protocol"
    ],
    "correctAnswer": 0,
    "explanation": "TCP guarantees reliable, ordered byte streams via acknowledgments and retransmissions."
  },
  {
    "id": "cn-tcp-02",
    "category": "computerNetworks",
    "topic": "TCP",
    "difficulty": "easy",
    "question": "What are the three steps of the TCP 3-Way Handshake used to establish a connection?",
    "options": [
      "SYN -> SYN-ACK -> ACK",
      "ACK -> SYN -> FIN",
      "HELLO -> HELLO-ACK -> READY",
      "CONNECT -> ACCEPT -> START"
    ],
    "correctAnswer": 0,
    "explanation": "Client sends SYN; Server responds with SYN-ACK; Client confirms with ACK."
  },
  {
    "id": "cn-tcp-03",
    "category": "computerNetworks",
    "topic": "TCP",
    "difficulty": "easy",
    "question": "What is the purpose of the TCP 4-Way Handshake?",
    "options": [
      "Gracefully closing and terminating an established bidirectional TCP connection (FIN -> ACK, FIN -> ACK)",
      "Establishing a 4-party conference call",
      "Encrypting packets with 4 keys",
      "Negotiating window size"
    ],
    "correctAnswer": 0,
    "explanation": "Because TCP is full-duplex, each direction closes independently via FIN and its corresponding ACK."
  },
  {
    "id": "cn-tcp-04",
    "category": "computerNetworks",
    "topic": "TCP",
    "difficulty": "medium",
    "question": "What does the 'TIME_WAIT' state in TCP connection termination do?",
    "options": [
      "Ensures the final ACK was received by the peer and prevents delayed duplicate packets from confusing a future connection with the same socket pair (lasts 2MSL)",
      "Waits for the user to type next command",
      "Pauses connection for 1 hour",
      "A crash state when connection fails"
    ],
    "correctAnswer": 0,
    "explanation": "TIME_WAIT lasts twice the Maximum Segment Lifetime (2MSL) to handle lost ACKs and drain stray packets."
  },
  {
    "id": "cn-tcp-05",
    "category": "computerNetworks",
    "topic": "TCP",
    "difficulty": "medium",
    "question": "What is the TCP 'Sliding Window' protocol used for?",
    "options": [
      "Flow Control: prevents a fast sender from overwhelming a slow receiver's buffer by dynamically advertising available receive window size (rwnd)",
      "Animation rendering",
      "Encrypting window packets",
      "Routing packets across LANs"
    ],
    "correctAnswer": 0,
    "explanation": "Sliding window throttles transmission based on the receiver's explicit buffer capacity advertisement."
  },
  {
    "id": "cn-tcp-06",
    "category": "computerNetworks",
    "topic": "TCP",
    "difficulty": "medium",
    "question": "What are the core phases of TCP Congestion Control algorithms (e.g. Reno, Cubic)?",
    "options": [
      "Slow Start (exponential window growth), Congestion Avoidance (linear growth), Fast Retransmit, and Fast Recovery",
      "Fast Start, Slow Stop",
      "Always send at maximum speed",
      "Send packets in random batches"
    ],
    "correctAnswer": 0,
    "explanation": "TCP probes bandwidth exponentially in Slow Start, then increments congestion window (cwnd) linearly in Congestion Avoidance."
  },
  {
    "id": "cn-tcp-07",
    "category": "computerNetworks",
    "topic": "TCP",
    "difficulty": "medium",
    "question": "What triggers 'Fast Retransmit' in TCP before a retransmission timer expires?",
    "options": [
      "Receipt of 3 duplicate ACKs for the same sequence number, signaling an isolated packet loss",
      "A user clicking refresh",
      "A hardware router beep",
      "The connection closing"
    ],
    "correctAnswer": 0,
    "explanation": "3 duplicate ACKs indicate subsequent packets arrived, signaling that only one packet was lost and should be resent immediately."
  },
  {
    "id": "cn-tcp-08",
    "category": "computerNetworks",
    "topic": "TCP",
    "difficulty": "medium",
    "question": "What is a 'SYN Flood' attack?",
    "options": [
      "A Denial of Service (DoS) attack where an attacker sends massive volumes of SYN requests with spoofed IPs, filling the server's backlog queue with half-open connections",
      "Flooding servers with water",
      "A virus that deletes web pages",
      "A high-speed download"
    ],
    "correctAnswer": 0,
    "explanation": "SYN floods exhaust server connection state memory; mitigated using SYN Cookies."
  },
  {
    "id": "cn-tcp-09",
    "category": "computerNetworks",
    "topic": "TCP",
    "difficulty": "hard",
    "question": "What is the minimum header size of a standard TCP segment without options?",
    "options": [
      "20 bytes",
      "8 bytes",
      "40 bytes",
      "14 bytes"
    ],
    "correctAnswer": 0,
    "explanation": "A standard TCP header without options is 20 bytes (compared to UDP's 8 bytes)."
  },
  {
    "id": "cn-tcp-10",
    "category": "computerNetworks",
    "topic": "TCP",
    "difficulty": "hard",
    "question": "What does the TCP 'RST' (Reset) flag indicate when received by a host?",
    "options": [
      "An immediate, ungraceful abort of the connection (e.g. connection refused because no listening process exists on that port)",
      "Restart the computer",
      "Re-read the previous packet",
      "Resume downloading"
    ],
    "correctAnswer": 0,
    "explanation": "RST tears down invalid or rejected connections immediately without handshake."
  },
  {
    "id": "cn-udp-01",
    "category": "computerNetworks",
    "topic": "UDP",
    "difficulty": "easy",
    "question": "What are the core characteristics of the User Datagram Protocol (UDP)?",
    "options": [
      "Connectionless, lightweight, unreliable, unordered datagram delivery with zero handshake overhead",
      "Connection-oriented with retransmissions",
      "Guarantees in-order delivery",
      "Slow and heavy"
    ],
    "correctAnswer": 0,
    "explanation": "UDP is a minimal 'fire-and-forget' transport protocol prioritizing low latency over reliability."
  },
  {
    "id": "cn-udp-02",
    "category": "computerNetworks",
    "topic": "UDP",
    "difficulty": "easy",
    "question": "What is the header size of a UDP packet?",
    "options": [
      "8 bytes (Source Port, Dest Port, Length, Checksum: 2 bytes each)",
      "20 bytes",
      "4 bytes",
      "16 bytes"
    ],
    "correctAnswer": 0,
    "explanation": "UDP headers are fixed at 8 bytes, incurring minimal per-packet transmission overhead."
  },
  {
    "id": "cn-udp-03",
    "category": "computerNetworks",
    "topic": "UDP",
    "difficulty": "easy",
    "question": "Why do real-time applications like online multiplayer gaming and live audio/video streaming prefer UDP over TCP?",
    "options": [
      "Low latency: retransmitting delayed stale audio/video frames is useless; fresh real-time data is preferred over waiting for retransmissions",
      "UDP encrypts audio automatically",
      "UDP is supported only by games",
      "TCP cannot send sound"
    ],
    "correctAnswer": 0,
    "explanation": "In live communication, timeliness trumps completeness; lost packets are simply concealed rather than resent."
  },
  {
    "id": "cn-udp-04",
    "category": "computerNetworks",
    "topic": "UDP",
    "difficulty": "easy",
    "question": "Which foundational internet services rely on UDP by default?",
    "options": [
      "DNS (queries), DHCP, NTP, and SNMP",
      "HTTP/1.1 and HTTPS",
      "SSH and SFTP",
      "SMTP and IMAP"
    ],
    "correctAnswer": 0,
    "explanation": "DNS lookups and NTP time sync use single-packet UDP exchanges for instantaneous turnaround."
  },
  {
    "id": "cn-udp-05",
    "category": "computerNetworks",
    "topic": "UDP",
    "difficulty": "medium",
    "question": "Does UDP provide flow control or congestion control?",
    "options": [
      "No, UDP has zero built-in flow control or congestion control mechanisms",
      "Yes, identical to TCP",
      "Only flow control, not congestion",
      "Only on Linux"
    ],
    "correctAnswer": 0,
    "explanation": "UDP transmits at the rate dictated by the application; congestion management must be built in user-space if needed."
  },
  {
    "id": "cn-udp-06",
    "category": "computerNetworks",
    "topic": "UDP",
    "difficulty": "medium",
    "question": "What happens if a UDP packet is corrupted during transit over the physical link?",
    "options": [
      "The UDP checksum detects the bit corruption and the receiving kernel silently discards the packet",
      "UDP asks the sender to retransmit",
      "The computer crashes",
      "The corrupted bits are automatically repaired"
    ],
    "correctAnswer": 0,
    "explanation": "Checksum verification drops corrupted datagrams; UDP provides no retransmission requests."
  },
  {
    "id": "cn-udp-07",
    "category": "computerNetworks",
    "topic": "UDP",
    "difficulty": "medium",
    "question": "What is QUIC (HTTP/3 transport protocol) and why is it built on top of UDP instead of TCP?",
    "options": [
      "A transport protocol implemented in user-space over UDP that provides TLS 1.3 encryption, zero head-of-line blocking, and fast connection migration",
      "A new hardware cable",
      "An alternative to Ethernet",
      "A video compression codec"
    ],
    "correctAnswer": 0,
    "explanation": "QUIC avoids OS kernel deployment inertia and solves TCP head-of-line blocking by multiplexing streams over UDP."
  },
  {
    "id": "cn-udp-08",
    "category": "computerNetworks",
    "topic": "UDP",
    "difficulty": "medium",
    "question": "Can UDP send Broadcast and Multicast traffic across a local network?",
    "options": [
      "Yes, UDP inherently supports Unicast, Broadcast, and Multicast communication",
      "No, UDP only supports Unicast",
      "Only multicast, not broadcast",
      "Only if encrypted"
    ],
    "correctAnswer": 0,
    "explanation": "Because UDP is connectionless and state-free, it easily broadcasts to 255.255.255.255 or multicast groups."
  },
  {
    "id": "cn-udp-09",
    "category": "computerNetworks",
    "topic": "UDP",
    "difficulty": "hard",
    "question": "What is 'Head-of-Line Blocking' in TCP and why does UDP/QUIC eliminate it?",
    "options": [
      "In TCP, one lost packet stalls all subsequent streams waiting for in-order delivery; UDP streams operate independently so one lost packet does not stall others",
      "A traffic jam at router antennas",
      "When the first computer on a LAN blocks others",
      "A firewall error"
    ],
    "correctAnswer": 0,
    "explanation": "TCP's strict single-stream ordering blocks all multiplexed data when any byte is lost; QUIC isolates streams."
  },
  {
    "id": "cn-udp-10",
    "category": "computerNetworks",
    "topic": "UDP",
    "difficulty": "hard",
    "question": "What is the maximum theoretical payload size of a UDP datagram over IPv4?",
    "options": [
      "65,507 bytes (65,535 max IP packet - 20 byte IP header - 8 byte UDP header)",
      "1500 bytes",
      "1024 bytes",
      "Unlimited"
    ],
    "correctAnswer": 0,
    "explanation": "Total IPv4 packet size is 16-bit (65,535 bytes); subtracting 20 bytes IP and 8 bytes UDP yields 65,507 bytes."
  },
  {
    "id": "cn-ip-01",
    "category": "computerNetworks",
    "topic": "IP Addressing",
    "difficulty": "easy",
    "question": "How many bits are in an IPv4 address vs an IPv6 address?",
    "options": [
      "IPv4 is 32 bits (4 bytes); IPv6 is 128 bits (16 bytes)",
      "IPv4 is 16 bits; IPv6 is 32 bits",
      "IPv4 is 64 bits; IPv6 is 128 bits",
      "Both are 32 bits"
    ],
    "correctAnswer": 0,
    "explanation": "IPv4 provides ~4.3 billion addresses (32 bits); IPv6 provides 3.4 × 10^38 addresses (128 bits)."
  },
  {
    "id": "cn-ip-02",
    "category": "computerNetworks",
    "topic": "IP Addressing",
    "difficulty": "easy",
    "question": "How is an IPv4 address conventionally represented in human-readable notation?",
    "options": [
      "Dotted-decimal notation (e.g. 192.168.1.1)",
      "Hexadecimal separated by colons",
      "Binary digits with commas",
      "Roman numerals"
    ],
    "correctAnswer": 0,
    "explanation": "IPv4 is formatted as four decimal octets (0-255) separated by periods."
  },
  {
    "id": "cn-ip-03",
    "category": "computerNetworks",
    "topic": "IP Addressing",
    "difficulty": "easy",
    "question": "How is an IPv6 address formatted?",
    "options": [
      "8 groups of 4 hexadecimal digits separated by colons (e.g. 2001:0db8:85a3:0000:0000:8a2e:0370:7334)",
      "Dotted decimal with 8 numbers",
      "Base64 encoded string",
      "Dashed octets"
    ],
    "correctAnswer": 0,
    "explanation": "IPv6 uses 8 colon-delimited 16-bit hexadecimal blocks, with '::' compressing consecutive zero blocks."
  },
  {
    "id": "cn-ip-04",
    "category": "computerNetworks",
    "topic": "IP Addressing",
    "difficulty": "easy",
    "question": "What is the IPv4 Loopback address (localhost)?",
    "options": [
      "127.0.0.1",
      "192.168.0.1",
      "0.0.0.0",
      "255.255.255.255"
    ],
    "correctAnswer": 0,
    "explanation": "127.0.0.1 (and the 127.0.0.0/8 block) routes internally within the local host without hitting physical NICs."
  },
  {
    "id": "cn-ip-05",
    "category": "computerNetworks",
    "topic": "IP Addressing",
    "difficulty": "medium",
    "question": "Which of the following IPv4 ranges is reserved for Private Networks (RFC 1918) and non-routable on public internet?",
    "options": [
      "10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16",
      "8.8.8.0/24",
      "1.1.1.0/24",
      "128.0.0.0/16"
    ],
    "correctAnswer": 0,
    "explanation": "RFC 1918 defines private non-routable address pools for enterprise LANs and home routers."
  },
  {
    "id": "cn-ip-06",
    "category": "computerNetworks",
    "topic": "IP Addressing",
    "difficulty": "medium",
    "question": "What does the IP address 0.0.0.0 signify when used as a server bind address?",
    "options": [
      "The server listens on all available network interface IP addresses on the machine",
      "The loopback interface only",
      "A broadcast address to all internet servers",
      "An invalid connection error"
    ],
    "correctAnswer": 0,
    "explanation": "Binding to INADDR_ANY (0.0.0.0) accepts incoming connections on all local network interfaces."
  },
  {
    "id": "cn-ip-07",
    "category": "computerNetworks",
    "topic": "IP Addressing",
    "difficulty": "medium",
    "question": "What is an APIPA (Automatic Private IP Addressing) address (169.254.x.x)?",
    "options": [
      "A link-local address self-assigned by a client when a DHCP server fails to respond, allowing local subnet communication only",
      "A high-speed public IP",
      "A static Google DNS IP",
      "A hacker IP address"
    ],
    "correctAnswer": 0,
    "explanation": "169.254.0.0/16 indicates the client could not reach a DHCP server and self-configured a link-local fallback."
  },
  {
    "id": "cn-ip-08",
    "category": "computerNetworks",
    "topic": "IP Addressing",
    "difficulty": "medium",
    "question": "What is the IPv6 equivalent of the IPv4 loopback address (127.0.0.1)?",
    "options": [
      "::1",
      "::0",
      "fe80::1",
      "ff02::1"
    ],
    "correctAnswer": 0,
    "explanation": "The IPv6 loopback is represented compactly as ::1 (0:0:0:0:0:0:0:1)."
  },
  {
    "id": "cn-ip-09",
    "category": "computerNetworks",
    "topic": "IP Addressing",
    "difficulty": "hard",
    "question": "What is the Time-To-Live (TTL) field in an IPv4 header used for?",
    "options": [
      "An 8-bit hop counter decremented by each router to prevent packets from looping infinitely across routing cycles",
      "The packet creation timestamp",
      "The time taken to download the packet",
      "The expiration date of the IP address"
    ],
    "correctAnswer": 0,
    "explanation": "Every router decrements TTL by 1; when TTL hits 0, the packet is discarded and an ICMP Time Exceeded is returned."
  },
  {
    "id": "cn-ip-10",
    "category": "computerNetworks",
    "topic": "IP Addressing",
    "difficulty": "hard",
    "question": "Why does IPv6 eliminate the Header Checksum and fragmentation by routers?",
    "options": [
      "To accelerate router packet forwarding throughput, offloading error checking to L2/L4 and mandating Path MTU Discovery by endpoints",
      "Because IPv6 packets never have errors",
      "To make IPv6 headers larger",
      "Because routers cannot read IPv6"
    ],
    "correctAnswer": 0,
    "explanation": "Removing checksums and router fragmentation accelerates router processing pipelines in high-speed backbones."
  },
  {
    "id": "cn-sub-01",
    "category": "computerNetworks",
    "topic": "Subnetting",
    "difficulty": "easy",
    "question": "What is the primary purpose of Subnetting in IP networks?",
    "options": [
      "Dividing a single large network into smaller, manageable, and logically isolated sub-networks to conserve IP space and enhance security/performance",
      "Increasing internet bandwidth speed",
      "Encrypting WiFi traffic",
      "Creating backup servers"
    ],
    "correctAnswer": 0,
    "explanation": "Subnetting partitions network addresses into smaller broadcast domains, reducing congestion and segmenting traffic."
  },
  {
    "id": "cn-sub-02",
    "category": "computerNetworks",
    "topic": "Subnetting",
    "difficulty": "easy",
    "question": "What is a Subnet Mask?",
    "options": [
      "A 32-bit number where binary 1s designate the Network portion and binary 0s designate the Host portion of an IP address",
      "A password for routers",
      "A physical face mask for network engineers",
      "An encryption key for VPNs"
    ],
    "correctAnswer": 0,
    "explanation": "Subnet masks define the boundary separating the network ID prefix from host identifier bits."
  },
  {
    "id": "cn-sub-03",
    "category": "computerNetworks",
    "topic": "Subnetting",
    "difficulty": "easy",
    "question": "What is the standard subnet mask for a /24 network in dotted decimal notation?",
    "options": [
      "255.255.255.0",
      "255.255.0.0",
      "255.0.0.0",
      "255.255.255.255"
    ],
    "correctAnswer": 0,
    "explanation": "/24 represents twenty-four leading 1 bits: 11111111.11111111.11111111.00000000 = 255.255.255.0."
  },
  {
    "id": "cn-sub-04",
    "category": "computerNetworks",
    "topic": "Subnetting",
    "difficulty": "easy",
    "question": "How many total IP addresses are in a /24 subnet, and how many are usable for host devices?",
    "options": [
      "256 total IP addresses, 254 usable hosts (Network address and Broadcast address are reserved)",
      "256 total, 256 usable",
      "254 total, 250 usable",
      "128 total, 126 usable"
    ],
    "correctAnswer": 0,
    "explanation": "2^(32-24) = 2^8 = 256 total. Subtract 2 (first is Network ID, last is Broadcast): 254 usable hosts."
  },
  {
    "id": "cn-sub-05",
    "category": "computerNetworks",
    "topic": "Subnetting",
    "difficulty": "medium",
    "question": "Given IP address 192.168.1.130 with subnet mask 255.255.255.192 (/26). What is the Network Address?",
    "options": [
      "192.168.1.128",
      "192.168.1.0",
      "192.168.1.130",
      "192.168.1.192"
    ],
    "correctAnswer": 0,
    "explanation": "Block size for /26 is 256 - 192 = 64. Subnet ranges: 0-63, 64-127, 128-191. 130 falls in 128-191; Network address is 192.168.1.128."
  },
  {
    "id": "cn-sub-06",
    "category": "computerNetworks",
    "topic": "Subnetting",
    "difficulty": "medium",
    "question": "What is the Broadcast Address for the subnet 192.168.1.128/26?",
    "options": [
      "192.168.1.191",
      "192.168.1.255",
      "192.168.1.128",
      "192.168.1.192"
    ],
    "correctAnswer": 0,
    "explanation": "The broadcast address is the final address in the block: 192.168.1.191."
  },
  {
    "id": "cn-sub-07",
    "category": "computerNetworks",
    "topic": "Subnetting",
    "difficulty": "medium",
    "question": "How many host bits are needed to support a company department requiring at least 50 host devices?",
    "options": [
      "6 bits (2^6 - 2 = 62 usable hosts)",
      "5 bits (2^5 - 2 = 30 usable hosts)",
      "7 bits (2^7 - 2 = 126 usable hosts)",
      "4 bits"
    ],
    "correctAnswer": 0,
    "explanation": "5 bits yields only 30 hosts (insufficient); 6 bits yields 2^6 - 2 = 62 usable hosts, satisfying 50 devices."
  },
  {
    "id": "cn-sub-08",
    "category": "computerNetworks",
    "topic": "Subnetting",
    "difficulty": "medium",
    "question": "What is CIDR (Classless Inter-Domain Routing) notation?",
    "options": [
      "A slash notation indicating the number of contiguous binary 1s in the network prefix (e.g. 10.0.0.0/16)",
      "A legacy routing class system",
      "An encryption cipher",
      "A router hardware standard"
    ],
    "correctAnswer": 0,
    "explanation": "CIDR replaced rigid Class A/B/C allocations with flexible prefix lengths, mitigating IPv4 exhaustion."
  },
  {
    "id": "cn-sub-09",
    "category": "computerNetworks",
    "topic": "Subnetting",
    "difficulty": "hard",
    "question": "What is Variable Length Subnet Masking (VLSM)?",
    "options": [
      "Designing subnets with different prefix lengths (/24, /26, /30) within the same network topology to match actual host counts and minimize wasted IPs",
      "A mask that changes every minute",
      "A mask for VPN encryption",
      "A dynamic routing protocol"
    ],
    "correctAnswer": 0,
    "explanation": "VLSM tailors subnet allocations hierarchically (e.g. /30 for point-to-point links, /26 for user LANs)."
  },
  {
    "id": "cn-sub-10",
    "category": "computerNetworks",
    "topic": "Subnetting",
    "difficulty": "hard",
    "question": "What is Route Summarization (Supernetting / CIDR Aggregation)?",
    "options": [
      "Combining multiple contiguous smaller subnet routes into a single summary route advertisement to reduce global router routing table size",
      "Splitting an IP into 10 subnets",
      "Translating IPv4 to IPv6",
      "A firewall rule"
    ],
    "correctAnswer": 0,
    "explanation": "Supernetting aggregates adjacent routing prefixes (e.g. four /24s into one /22), keeping core BGP tables compact."
  },
  {
    "id": "cn-dns-01",
    "category": "computerNetworks",
    "topic": "DNS",
    "difficulty": "easy",
    "question": "What is the primary function of the Domain Name System (DNS)?",
    "options": [
      "Translates human-readable domain names (e.g. google.com) into machine-routable IP addresses (e.g. 142.250.190.46)",
      "Assigns MAC addresses to computers",
      "Encrypts web page text",
      "Speeds up CPU clock frequency"
    ],
    "correctAnswer": 0,
    "explanation": "DNS acts as the hierarchical distributed directory phonebook of the internet, mapping names to IPs."
  },
  {
    "id": "cn-dns-02",
    "category": "computerNetworks",
    "topic": "DNS",
    "difficulty": "easy",
    "question": "What transport protocol and port number does standard DNS query resolution use by default?",
    "options": [
      "UDP port 53",
      "TCP port 80",
      "TCP port 443",
      "UDP port 67"
    ],
    "correctAnswer": 0,
    "explanation": "DNS queries use UDP port 53 for fast single-packet resolution; zone transfers use TCP port 53."
  },
  {
    "id": "cn-dns-03",
    "category": "computerNetworks",
    "topic": "DNS",
    "difficulty": "easy",
    "question": "What is an 'A Record' in DNS zone configurations?",
    "options": [
      "Maps a domain hostname to an IPv4 address",
      "Maps a domain to an IPv6 address",
      "Maps an email server",
      "An alias to another domain"
    ],
    "correctAnswer": 0,
    "explanation": "An 'A' (Address) record resolves a hostname to a 32-bit IPv4 address."
  },
  {
    "id": "cn-dns-04",
    "category": "computerNetworks",
    "topic": "DNS",
    "difficulty": "easy",
    "question": "What is an 'AAAA Record' in DNS?",
    "options": [
      "Maps a domain hostname to an IPv6 address (Quad-A)",
      "A 4-way backup record",
      "A high-priority mail server",
      "A domain certificate"
    ],
    "correctAnswer": 0,
    "explanation": "AAAA records resolve hostnames to 128-bit IPv6 addresses."
  },
  {
    "id": "cn-dns-05",
    "category": "computerNetworks",
    "topic": "DNS",
    "difficulty": "medium",
    "question": "What is a 'CNAME' (Canonical Name) record used for?",
    "options": [
      "Creates an alias pointing one domain name to another canonical domain name (e.g. www.example.com -> example.com)",
      "Maps domain to IP directly",
      "Specifies mail server",
      "Stores cryptographic keys"
    ],
    "correctAnswer": 0,
    "explanation": "CNAME records alias hostnames to other canonical names rather than binding directly to IP addresses."
  },
  {
    "id": "cn-dns-06",
    "category": "computerNetworks",
    "topic": "DNS",
    "difficulty": "medium",
    "question": "What is an 'MX' (Mail Exchange) record in DNS?",
    "options": [
      "Specifies the responsible mail server designated to accept incoming emails on behalf of the domain",
      "Measures network latency",
      "Maps MX missile coordinates",
      "A domain registrar record"
    ],
    "correctAnswer": 0,
    "explanation": "MX records direct SMTP email routing to designated mail servers with priority rankings."
  },
  {
    "id": "cn-dns-07",
    "category": "computerNetworks",
    "topic": "DNS",
    "difficulty": "medium",
    "question": "What are the 4 hierarchical levels of DNS servers involved in resolving a query for 'api.google.com'?",
    "options": [
      "1. Recursive Resolver -> 2. Root Nameserver ('.') -> 3. TLD Nameserver ('.com') -> 4. Authoritative Nameserver ('google.com')",
      "1. Router -> 2. Switch -> 3. Server -> 4. Client",
      "1. Google -> 2. Microsoft -> 3. Apple -> 4. IBM",
      "1. Localhost -> 2. Gateway"
    ],
    "correctAnswer": 0,
    "explanation": "Resolvers query Root (.) -> Top-Level Domain (.com) -> Authoritative server holding the canonical record."
  },
  {
    "id": "cn-dns-08",
    "category": "computerNetworks",
    "topic": "DNS",
    "difficulty": "medium",
    "question": "What is 'DNS TTL' (Time-To-Live) and what does it control?",
    "options": [
      "The duration in seconds that a DNS resolver or browser is permitted to cache the DNS record before fetching a fresh copy",
      "The lifetime of the domain registration",
      "The timeout of the ping query",
      "The duration of an SSL session"
    ],
    "correctAnswer": 0,
    "explanation": "TTL controls caching validity: lower TTL allows fast DNS updates; higher TTL reduces query traffic."
  },
  {
    "id": "cn-dns-09",
    "category": "computerNetworks",
    "topic": "DNS",
    "difficulty": "hard",
    "question": "What is 'DNS Spoofing' (DNS Cache Poisoning)?",
    "options": [
      "An attack where corrupt, fraudulent DNS records are injected into a resolver cache, redirecting unsuspecting users to malicious replica servers",
      "Spelling domain names backwards",
      "Registering expired domain names",
      "Flooding DNS with ping packets"
    ],
    "correctAnswer": 0,
    "explanation": "Cache poisoning compromises resolver caches, diverting banking or login traffic to spoofed destinations."
  },
  {
    "id": "cn-dns-10",
    "category": "computerNetworks",
    "topic": "DNS",
    "difficulty": "hard",
    "question": "What does DNSSEC (DNS Security Extensions) add to traditional DNS to prevent spoofing?",
    "options": [
      "Cryptographic digital signatures (RRSIG) on DNS records verified using public key cryptography to prove authenticity and integrity",
      "Encrypts all DNS queries with TLS",
      "Deletes all CNAME records",
      "Makes DNS run on port 443"
    ],
    "correctAnswer": 0,
    "explanation": "DNSSEC creates a cryptographic chain of trust from root to zone, guaranteeing records haven't been forged."
  },
  {
    "id": "cn-dhc-01",
    "category": "computerNetworks",
    "topic": "DHCP",
    "difficulty": "easy",
    "question": "What does DHCP stand for and what is its primary function?",
    "options": [
      "Dynamic Host Configuration Protocol; automatically assigns IP addresses, subnet masks, default gateways, and DNS servers to network client devices",
      "Domain Host Control Protocol",
      "Dynamic Hardware Connection Provider",
      "Digital Host Communication Path"
    ],
    "correctAnswer": 0,
    "explanation": "DHCP automates network configuration, eliminating error-prone manual static IP assignment."
  },
  {
    "id": "cn-dhc-02",
    "category": "computerNetworks",
    "topic": "DHCP",
    "difficulty": "easy",
    "question": "What is the 4-step message handshake exchange of DHCP called?",
    "options": [
      "DORA: Discover -> Offer -> Request -> Acknowledge",
      "POLL: Probe -> Open -> Listen -> Link",
      "ACID: Ask -> Confirm -> Identify -> Deliver",
      "HAND: Hello -> Allocate -> Negotiate -> Done"
    ],
    "correctAnswer": 0,
    "explanation": "Client broadcasts DHCP Discover; Server offers IP (Offer); Client requests lease (Request); Server acknowledges (Ack)."
  },
  {
    "id": "cn-dhc-03",
    "category": "computerNetworks",
    "topic": "DHCP",
    "difficulty": "easy",
    "question": "What transport protocol and port numbers does DHCP use?",
    "options": [
      "UDP: Port 67 (Server) and Port 68 (Client)",
      "TCP: Port 80 and 443",
      "UDP: Port 53 and 54",
      "TCP: Port 21 and 22"
    ],
    "correctAnswer": 0,
    "explanation": "DHCP utilizes UDP port 67 for servers/relays and port 68 for clients."
  },
  {
    "id": "cn-dhc-04",
    "category": "computerNetworks",
    "topic": "DHCP",
    "difficulty": "easy",
    "question": "Why does the initial DHCP Discover message use broadcast address 255.255.255.255 and source address 0.0.0.0?",
    "options": [
      "The unconfigured client has no assigned IP address yet and does not know the location/IP of the DHCP server on the local subnet",
      "Because the router is turned off",
      "To test cable connectivity",
      "It is an illegal broadcast"
    ],
    "correctAnswer": 0,
    "explanation": "Without an IP or server address, the client must broadcast to 255.255.255.255 from 0.0.0.0."
  },
  {
    "id": "cn-dhc-05",
    "category": "computerNetworks",
    "topic": "DHCP",
    "difficulty": "medium",
    "question": "What is a DHCP 'Lease Time'?",
    "options": [
      "The duration of time for which a client is permitted to use the assigned IP address before requesting a lease renewal",
      "The monthly cost of internet access",
      "The timeout of a web browser",
      "The lifetime of a router's warranty"
    ],
    "correctAnswer": 0,
    "explanation": "Lease timers reclaim inactive IPs; clients typically attempt lease renewal at 50% and 87.5% of lease expiry."
  },
  {
    "id": "cn-dhc-06",
    "category": "computerNetworks",
    "topic": "DHCP",
    "difficulty": "medium",
    "question": "What is a 'DHCP Reservation' (Static DHCP)?",
    "options": [
      "Configuring the DHCP server to permanently assign the exact same IP address to a specific device based on its hardware MAC address",
      "Reserving all IP addresses for administrators",
      "Blocking an IP address forever",
      "A backup DHCP pool"
    ],
    "correctAnswer": 0,
    "explanation": "Reservations bind specific IP configurations to known MAC addresses (ideal for printers and local servers)."
  },
  {
    "id": "cn-dhc-07",
    "category": "computerNetworks",
    "topic": "DHCP",
    "difficulty": "medium",
    "question": "What is a 'DHCP Relay Agent' and why is it required in enterprise networks?",
    "options": [
      "A router or service that forwards broadcast DHCP Discover messages across subnets to a centralized DHCP server on a different VLAN/network",
      "A device that speeds up DHCP",
      "A backup wireless access point",
      "A tool that encrypts DHCP packets"
    ],
    "correctAnswer": 0,
    "explanation": "Routers drop broadcasts by default; a DHCP relay converts client broadcasts to unicast packets directed to the DHCP server."
  },
  {
    "id": "cn-dhc-08",
    "category": "computerNetworks",
    "topic": "DHCP",
    "difficulty": "medium",
    "question": "What is a 'Rogue DHCP Server' attack?",
    "options": [
      "An unauthorized, malicious DHCP server placed on a network that distributes rogue gateways and DNS servers to intercept and eavesdrop on traffic (MitM)",
      "A DHCP server with expired software",
      "A server that has no IP addresses left",
      "A server that runs out of electricity"
    ],
    "correctAnswer": 0,
    "explanation": "Rogue DHCP servers hijack client gateway/DNS settings to execute Man-in-the-Middle eavesdropping."
  },
  {
    "id": "cn-dhc-09",
    "category": "computerNetworks",
    "topic": "DHCP",
    "difficulty": "hard",
    "question": "What switch security feature mitigates Rogue DHCP servers?",
    "options": [
      "DHCP Snooping (classifying switch ports as trusted or untrusted and filtering unauthorized DHCP offers)",
      "Port Mirroring",
      "Spanning Tree Protocol",
      "VLAN Trunks"
    ],
    "correctAnswer": 0,
    "explanation": "DHCP Snooping drops DHCP server responses arriving on untrusted user-facing switch ports."
  },
  {
    "id": "cn-dhc-10",
    "category": "computerNetworks",
    "topic": "DHCP",
    "difficulty": "hard",
    "question": "What happens if two DHCP servers on the same broadcast domain offer overlapping IP address pools without synchronization?",
    "options": [
      "IP Address Collisions occur: two distinct devices may be assigned the identical IP address, breaking connectivity for both",
      "Internet speed doubles",
      "The router combines their pools",
      "The clients merge into one computer"
    ],
    "correctAnswer": 0,
    "explanation": "Uncoordinated pools assign duplicate IPs, causing ARP flapping and broken IP routing for collided hosts."
  },
  {
    "id": "cn-http-01",
    "category": "computerNetworks",
    "topic": "HTTP / HTTPS",
    "difficulty": "easy",
    "question": "What are the standard port numbers for unencrypted HTTP and encrypted HTTPS respectively?",
    "options": [
      "HTTP uses Port 80; HTTPS uses Port 443",
      "HTTP uses Port 443; HTTPS uses Port 80",
      "HTTP uses Port 21; HTTPS uses Port 22",
      "HTTP uses Port 8080; HTTPS uses Port 8443"
    ],
    "correctAnswer": 0,
    "explanation": "Standard IANA ports: plain HTTP operates on 80; TLS-encrypted HTTPS operates on 443."
  },
  {
    "id": "cn-http-02",
    "category": "computerNetworks",
    "topic": "HTTP / HTTPS",
    "difficulty": "easy",
    "question": "What does it mean that HTTP is fundamentally a 'Stateless Protocol'?",
    "options": [
      "The server retains zero session memory of past client requests; every HTTP request is treated as completely independent",
      "HTTP has no states in the USA",
      "HTTP connections never terminate",
      "HTTP cannot send cookies"
    ],
    "correctAnswer": 0,
    "explanation": "HTTP does not retain transaction state natively; statefulness is achieved via cookies, sessions, or tokens."
  },
  {
    "id": "cn-http-03",
    "category": "computerNetworks",
    "topic": "HTTP / HTTPS",
    "difficulty": "easy",
    "question": "What do the HTTP status code ranges (2xx, 3xx, 4xx, 5xx) signify?",
    "options": [
      "2xx: Success, 3xx: Redirection, 4xx: Client Error, 5xx: Server Error",
      "2xx: Error, 3xx: Success, 4xx: Redirection, 5xx: Server",
      "2xx: Fast, 3xx: Medium, 4xx: Slow, 5xx: Crash",
      "Status codes have no category standard"
    ],
    "correctAnswer": 0,
    "explanation": "1xx=Informational, 2xx=Success, 3xx=Redirection, 4xx=Client Error (e.g. 404), 5xx=Server Error (e.g. 500)."
  },
  {
    "id": "cn-http-04",
    "category": "computerNetworks",
    "topic": "HTTP / HTTPS",
    "difficulty": "easy",
    "question": "What is the difference between an HTTP GET request and an HTTP POST request?",
    "options": [
      "GET is idempotent, caches responses, and passes parameters in the URL query string; POST submits data in the request body and mutates server state",
      "GET is used only for images",
      "POST can only be executed once",
      "GET is encrypted, POST is not"
    ],
    "correctAnswer": 0,
    "explanation": "GET retrieves representations without side effects; POST transmits stateful payloads modifying server resources."
  },
  {
    "id": "cn-http-05",
    "category": "computerNetworks",
    "topic": "HTTP / HTTPS",
    "difficulty": "medium",
    "question": "What is an 'Idempotent' HTTP method?",
    "options": [
      "A method that produces the identical server state whether executed once or executed multiple times consecutively (e.g. GET, PUT, DELETE)",
      "A method that takes zero time to run",
      "A method that cannot be cached",
      "A method that returns no data"
    ],
    "correctAnswer": 0,
    "explanation": "Idempotent methods (GET, PUT, DELETE, HEAD) can be safely retried upon network timeout without unintended side effects."
  },
  {
    "id": "cn-http-06",
    "category": "computerNetworks",
    "topic": "HTTP / HTTPS",
    "difficulty": "medium",
    "question": "What major advancement did HTTP/2 introduce over HTTP/1.1 to eliminate Head-of-Line blocking?",
    "options": [
      "Binary framing and multiplexing multiple concurrent request/response streams over a single TCP connection",
      "Switching from TCP to UDP",
      "Eliminating all headers",
      "Requiring fiber optic cables"
    ],
    "correctAnswer": 0,
    "explanation": "HTTP/2 multiplexes interleaved binary streams over a single connection, ending HTTP/1.1 domain sharding and pipelining flaws."
  },
  {
    "id": "cn-http-07",
    "category": "computerNetworks",
    "topic": "HTTP / HTTPS",
    "difficulty": "medium",
    "question": "What is HPACK in HTTP/2?",
    "options": [
      "A header compression algorithm that eliminates redundant header transmission across requests",
      "A video compression codec",
      "A software packaging format",
      "A load balancer"
    ],
    "correctAnswer": 0,
    "explanation": "HPACK compresses repetitive HTTP headers using static/dynamic tables and Huffman coding."
  },
  {
    "id": "cn-http-08",
    "category": "computerNetworks",
    "topic": "HTTP / HTTPS",
    "difficulty": "medium",
    "question": "What is the difference between HTTP/2 and HTTP/3?",
    "options": [
      "HTTP/2 uses TCP; HTTP/3 runs over QUIC (built on UDP) to eliminate TCP-level head-of-line blocking and speed up handshakes",
      "HTTP/3 does not use encryption",
      "HTTP/2 is for mobile only",
      "HTTP/3 is an unreleased draft"
    ],
    "correctAnswer": 0,
    "explanation": "HTTP/3 replaces TCP with QUIC over UDP, ensuring packet drops in one stream do not block unrelated parallel streams."
  },
  {
    "id": "cn-http-09",
    "category": "computerNetworks",
    "topic": "HTTP / HTTPS",
    "difficulty": "hard",
    "question": "What is the function of the HTTP 'Cookie' and 'Set-Cookie' headers?",
    "options": [
      "Allows servers to store small stateful session tokens on the client browser and have the client send them back with future requests",
      "Stores downloaded images",
      "Caches HTML code",
      "Blocks pop-up advertisements"
    ],
    "correctAnswer": 0,
    "explanation": "Set-Cookie issues session identifiers; browsers automatically transmit matching cookies via Cookie header."
  },
  {
    "id": "cn-http-10",
    "category": "computerNetworks",
    "topic": "HTTP / HTTPS",
    "difficulty": "hard",
    "question": "What does the HTTP header 'Strict-Transport-Security' (HSTS) enforce on browsers?",
    "options": [
      "Instructs the browser to interact with the domain exclusively over HTTPS, automatically upgrading all HTTP links and rejecting invalid certificates",
      "Requires users to enter a password twice",
      "Enforces 20-character passwords",
      "Blocks external API calls"
    ],
    "correctAnswer": 0,
    "explanation": "HSTS prevents SSL-stripping attacks by forcing browsers to communicate strictly over encrypted HTTPS."
  },
  {
    "id": "cn-tls-01",
    "category": "computerNetworks",
    "topic": "TLS",
    "difficulty": "easy",
    "question": "What is the difference between SSL (Secure Sockets Layer) and TLS (Transport Layer Security)?",
    "options": [
      "TLS is the modern, secure successor to SSL; SSL versions (1.0, 2.0, 3.0) are deprecated and cryptographically broken",
      "SSL is for Linux; TLS is for Windows",
      "SSL is faster than TLS",
      "They are identical protocols"
    ],
    "correctAnswer": 0,
    "explanation": "IETF standardized TLS in 1999 as the successor to Netscape's SSL; modern web traffic uses TLS 1.2 or 1.3."
  },
  {
    "id": "cn-tls-02",
    "category": "computerNetworks",
    "topic": "TLS",
    "difficulty": "easy",
    "question": "What are the three core security guarantees provided by TLS?",
    "options": [
      "Confidentiality (encryption), Integrity (tamper-proofing), and Authentication (certificate identity verification)",
      "Speed, Redundancy, and Storage",
      "Atomicity, Consistency, and Durability",
      "Backup, Firewall, and Antivirus"
    ],
    "correctAnswer": 0,
    "explanation": "TLS ensures nobody can eavesdrop (confidentiality), tamper with packets (integrity), or impersonate the host (authentication)."
  },
  {
    "id": "cn-tls-03",
    "category": "computerNetworks",
    "topic": "TLS",
    "difficulty": "easy",
    "question": "How does TLS use Asymmetric Encryption vs Symmetric Encryption?",
    "options": [
      "Asymmetric encryption (public/private keys) is used initially during handshake to authenticate and exchange a shared secret; Symmetric encryption (AES/ChaCha20) encrypts bulk data fast",
      "Symmetric is used for handshake; Asymmetric for bulk data",
      "Only asymmetric encryption is used",
      "Only symmetric encryption is used"
    ],
    "correctAnswer": 0,
    "explanation": "Asymmetric cryptography solves key exchange securely; symmetric encryption delivers high-throughput bulk payload encryption."
  },
  {
    "id": "cn-tls-04",
    "category": "computerNetworks",
    "topic": "TLS",
    "difficulty": "easy",
    "question": "What is a Digital Certificate (X.509 Certificate) presented by an HTTPS web server?",
    "options": [
      "A cryptographically signed public key document issued by a trusted Certificate Authority (CA) binding domain identity to a public key",
      "A software license agreement",
      "A database password",
      "A physical receipt for web hosting"
    ],
    "correctAnswer": 0,
    "explanation": "X.509 certificates prove domain ownership through digital signatures verified against trusted Root CAs."
  },
  {
    "id": "cn-tls-05",
    "category": "computerNetworks",
    "topic": "TLS",
    "difficulty": "medium",
    "question": "What is a Certificate Authority (CA)?",
    "options": [
      "A trusted third-party organization (e.g. Let's Encrypt, DigiCert) that cryptographically signs and issues digital certificates",
      "A government computer agency",
      "A web browser company",
      "A hardware manufacturer"
    ],
    "correctAnswer": 0,
    "explanation": "Operating systems and browsers ship with pre-installed Root CAs to authenticate server certificates."
  },
  {
    "id": "cn-tls-06",
    "category": "computerNetworks",
    "topic": "TLS",
    "difficulty": "medium",
    "question": "How did TLS 1.3 reduce handshake latency compared to TLS 1.2?",
    "options": [
      "Reduced the handshake from 2 round-trips (2-RTT) down to a single round-trip (1-RTT), and supports 0-RTT resumption",
      "By removing encryption entirely",
      "By using UDP exclusively",
      "By making certificates shorter"
    ],
    "correctAnswer": 0,
    "explanation": "TLS 1.3 combines key exchange with client hello, cutting connection setup time in half."
  },
  {
    "id": "cn-tls-07",
    "category": "computerNetworks",
    "topic": "TLS",
    "difficulty": "medium",
    "question": "What is 'Forward Secrecy' (Perfect Forward Secrecy / PFS) in TLS?",
    "options": [
      "A property ensuring that compromise of the server's long-term private key in the future does NOT compromise past recorded encrypted session traffic (using ephemeral Diffie-Hellman)",
      "Predicting future encryption keys",
      "Encrypting files before sending them",
      "Saving passwords in the cloud"
    ],
    "correctAnswer": 0,
    "explanation": "Ephemeral Diffie-Hellman keys (ECDHE) discard session keys after use; stealing the server's master key cannot decrypt past traffic."
  },
  {
    "id": "cn-tls-08",
    "category": "computerNetworks",
    "topic": "TLS",
    "difficulty": "medium",
    "question": "What is SNI (Server Name Indication) in TLS?",
    "options": [
      "An extension where the client indicates the target hostname it is trying to connect to during the initial TLS handshake, enabling multi-tenant virtual hosting on one IP",
      "A tool for naming routers",
      "An encryption algorithm",
      "A server identification number"
    ],
    "correctAnswer": 0,
    "explanation": "SNI enables web servers to present the correct SSL certificate when multiple HTTPS sites share a single IP address."
  },
  {
    "id": "cn-tls-09",
    "category": "computerNetworks",
    "topic": "TLS",
    "difficulty": "hard",
    "question": "What is 'Certificate Pinning' in mobile applications?",
    "options": [
      "Hardcoding the expected server certificate or public key hash inside the app client to prevent rogue CA interception (Man-in-the-Middle)",
      "Printing certificates on pinboards",
      "Attaching certificates to emails",
      "A security vulnerability"
    ],
    "correctAnswer": 0,
    "explanation": "Pinning protects apps from compromised root CAs by rejecting certificates that don't match embedded public keys."
  },
  {
    "id": "cn-tls-10",
    "category": "computerNetworks",
    "topic": "TLS",
    "difficulty": "hard",
    "question": "What is Mutual TLS (mTLS)?",
    "options": [
      "Both the client and server authenticate each other's identities using digital certificates (widely used in zero-trust microservice communication)",
      "Encrypting data twice",
      "Using two certificates on the server",
      "Connecting to two servers simultaneously"
    ],
    "correctAnswer": 0,
    "explanation": "mTLS establishes two-way cryptographic identity verification, securing service-to-service microservice meshes."
  },
  {
    "id": "cn-rtg-01",
    "category": "computerNetworks",
    "topic": "Routing",
    "difficulty": "easy",
    "question": "What is the primary function of a Router in an IP network?",
    "options": [
      "Examining destination IP addresses in incoming packets and determining the optimal next-hop interface along the path to destination using routing tables",
      "Connecting monitors to laptops",
      "Broadcasting WiFi to phones",
      "Converting AC power to DC"
    ],
    "correctAnswer": 0,
    "explanation": "Routers inspect Layer 3 destination headers to forward packets between disparate network subnets."
  },
  {
    "id": "cn-rtg-02",
    "category": "computerNetworks",
    "topic": "Routing",
    "difficulty": "easy",
    "question": "What is the difference between Static Routing and Dynamic Routing?",
    "options": [
      "Static routing uses manually configured routes entered by network engineers; Dynamic routing uses protocols (OSPF, BGP) to learn and adapt routes automatically",
      "Static routing is for WiFi; Dynamic is for cables",
      "Dynamic routing is always slower",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Static routes are manual and fixed; dynamic routing automatically converges around failed links and topology shifts."
  },
  {
    "id": "cn-rtg-03",
    "category": "computerNetworks",
    "topic": "Routing",
    "difficulty": "easy",
    "question": "What is the 'Default Gateway' configured on a host machine?",
    "options": [
      "The local router IP address to which a host forwards all outbound packets destined for IP addresses outside its own local subnet",
      "The main computer in the company",
      "The entrance door to the server room",
      "The DNS server IP"
    ],
    "correctAnswer": 0,
    "explanation": "If destination IP is outside local subnet mask, packets are directed to the default gateway router."
  },
  {
    "id": "cn-rtg-04",
    "category": "computerNetworks",
    "topic": "Routing",
    "difficulty": "easy",
    "question": "What is a 'Routing Table'?",
    "options": [
      "An internal database table stored in a router listing network destination prefixes, metric costs, and associated next-hop gateway interfaces",
      "A table where routers are placed",
      "A list of router passwords",
      "A table of open TCP connections"
    ],
    "correctAnswer": 0,
    "explanation": "Routing tables match incoming destination IPs against stored CIDR prefixes using longest prefix match."
  },
  {
    "id": "cn-rtg-05",
    "category": "computerNetworks",
    "topic": "Routing",
    "difficulty": "medium",
    "question": "What algorithm rule is used by IP routers when multiple matching routes exist in the routing table?",
    "options": [
      "Longest Prefix Match (the route with the most specific, longest subnet mask / prefix length is chosen)",
      "Shortest Prefix Match",
      "Alphabetical order",
      "Random selection"
    ],
    "correctAnswer": 0,
    "explanation": "The most specific route (highest prefix length, e.g. /28 over /16) always takes routing precedence."
  },
  {
    "id": "cn-rtg-06",
    "category": "computerNetworks",
    "topic": "Routing",
    "difficulty": "medium",
    "question": "What is the difference between Interior Gateway Protocols (IGP) and Exterior Gateway Protocols (EGP)?",
    "options": [
      "IGPs (OSPF, RIP) route traffic within a single Autonomous System (AS); EGPs (BGP) route traffic between different Autonomous Systems across the global internet",
      "IGPs are for internal hard drives",
      "EGPs are deprecated",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "IGP handles internal corporate/datacenter routing; BGP (EGP) glues together global internet service providers."
  },
  {
    "id": "cn-rtg-07",
    "category": "computerNetworks",
    "topic": "Routing",
    "difficulty": "medium",
    "question": "What type of routing protocol is OSPF (Open Shortest Path First)?",
    "options": [
      "A Link-State routing protocol using Dijkstra's shortest path algorithm (SPF) to calculate least-cost loop-free paths",
      "A distance-vector protocol based on hop counts",
      "A path-vector protocol for ISPs",
      "A static routing tool"
    ],
    "correctAnswer": 0,
    "explanation": "OSPF builds a full topology map using link-state advertisements (LSAs) and computes shortest paths via Dijkstra's algorithm."
  },
  {
    "id": "cn-rtg-08",
    "category": "computerNetworks",
    "topic": "Routing",
    "difficulty": "medium",
    "question": "What protocol serves as the global routing backbone protocol connecting Autonomous Systems across the worldwide Internet?",
    "options": [
      "BGP (Border Gateway Protocol)",
      "RIP",
      "OSPF",
      "ICMP"
    ],
    "correctAnswer": 0,
    "explanation": "BGP-4 is the path-vector exterior gateway protocol that manages routing policies across global internet backbones."
  },
  {
    "id": "cn-rtg-09",
    "category": "computerNetworks",
    "topic": "Routing",
    "difficulty": "hard",
    "question": "What is a 'Routing Loop' and what mechanism in OSPF prevents it?",
    "options": [
      "A failure where packets circulate perpetually between routers due to routing table inconsistencies; prevented by Dijkstra's SPF tree calculation",
      "A loop of Ethernet cables",
      "A programming loop in router code",
      "A WiFi signal loop"
    ],
    "correctAnswer": 0,
    "explanation": "Dijkstra's SPF tree guarantees a loop-free acyclic directed graph across link-state areas."
  },
  {
    "id": "cn-rtg-10",
    "category": "computerNetworks",
    "topic": "Routing",
    "difficulty": "hard",
    "question": "What is 'BGP Hijacking'?",
    "options": [
      "When a malicious or misconfigured autonomous system falsely announces IP prefixes it does not own, diverting global internet traffic to itself",
      "Physically stealing router hardware",
      "Hacking router passwords",
      "Disabling internet cables"
    ],
    "correctAnswer": 0,
    "explanation": "BGP accepts unverified prefix announcements; malicious advertisements can hijack traffic globally (mitigated via RPKI)."
  },
  {
    "id": "cn-arp-01",
    "category": "computerNetworks",
    "topic": "ARP",
    "difficulty": "easy",
    "question": "What does ARP stand for and what is its primary function?",
    "options": [
      "Address Resolution Protocol; resolves a known Layer 3 IP address to its corresponding Layer 2 physical MAC address on a local network segment",
      "Automatic Routing Provider",
      "Application Resource Protocol",
      "Access Restriction Policy"
    ],
    "correctAnswer": 0,
    "explanation": "ARP bridges Layer 3 IP logic to Layer 2 physical Ethernet transmission on the local link."
  },
  {
    "id": "cn-arp-02",
    "category": "computerNetworks",
    "topic": "ARP",
    "difficulty": "easy",
    "question": "How does an ARP Request discover a target host's MAC address?",
    "options": [
      "By broadcasting an Ethernet frame (destination FF:FF:FF:FF:FF:FF) asking: 'Who has this IP? Tell me your MAC.'",
      "By asking the Google DNS server",
      "By scanning all ports sequentially",
      "By querying a centralized database"
    ],
    "correctAnswer": 0,
    "explanation": "ARP Requests are broadcast to all nodes on the L2 segment; the owner unicasts an ARP Reply."
  },
  {
    "id": "cn-arp-03",
    "category": "computerNetworks",
    "topic": "ARP",
    "difficulty": "easy",
    "question": "What is the 'ARP Table' (or ARP Cache) maintained by computers and routers?",
    "options": [
      "An in-memory lookup table mapping recently resolved IP addresses to their corresponding physical MAC addresses",
      "A table of internet passwords",
      "A routing table on disk",
      "A list of open applications"
    ],
    "correctAnswer": 0,
    "explanation": "The ARP cache caches IP-to-MAC mappings with a TTL to avoid broadcasting ARP requests on every frame."
  },
  {
    "id": "cn-arp-04",
    "category": "computerNetworks",
    "topic": "ARP",
    "difficulty": "easy",
    "question": "Can ARP resolve MAC addresses across different subnets or across the internet?",
    "options": [
      "No, ARP operates strictly within the local broadcast domain (Layer 2 segment); crossing subnets uses the default gateway's MAC address",
      "Yes, ARP queries traverse the global internet",
      "Only if IPv6 is disabled",
      "Only with administrative permissions"
    ],
    "correctAnswer": 0,
    "explanation": "ARP is a non-routable link-layer protocol; hosts send packets destined for remote subnets to the local router's MAC."
  },
  {
    "id": "cn-arp-05",
    "category": "computerNetworks",
    "topic": "ARP",
    "difficulty": "medium",
    "question": "What is an 'ARP Reply' message?",
    "options": [
      "A unicast frame sent directly back to the requesting host containing the responding device's hardware MAC address",
      "A broadcast to all computers",
      "An ICMP ping response",
      "A DNS response"
    ],
    "correctAnswer": 0,
    "explanation": "The device possessing the queried IP responds with a unicast ARP reply containing its MAC address."
  },
  {
    "id": "cn-arp-06",
    "category": "computerNetworks",
    "topic": "ARP",
    "difficulty": "medium",
    "question": "What is 'ARP Spoofing' (ARP Poisoning)?",
    "options": [
      "A cyberattack where an attacker broadcasts falsified ARP messages linking the attacker's MAC address with the default gateway's IP, facilitating Man-in-the-Middle interception",
      "Deleting the ARP table",
      "Flooding the router with ping requests",
      "Hacking the router password"
    ],
    "correctAnswer": 0,
    "explanation": "ARP lacks authentication; attackers poison neighbor caches to route local subnet traffic through their machine."
  },
  {
    "id": "cn-arp-07",
    "category": "computerNetworks",
    "topic": "ARP",
    "difficulty": "medium",
    "question": "What is a 'Gratuitous ARP'?",
    "options": [
      "An unprompted ARP announcement sent by a host to announce its IP/MAC to the network (used for IP collision detection or updating switch tables during failover)",
      "A polite email between routers",
      "A free internet connection",
      "An error message when ARP fails"
    ],
    "correctAnswer": 0,
    "explanation": "Gratuitous ARP notifies peers of IP/MAC updates without prior request, enabling seamless virtual IP clustering."
  },
  {
    "id": "cn-arp-08",
    "category": "computerNetworks",
    "topic": "ARP",
    "difficulty": "medium",
    "question": "What protocol performs the function of ARP in IPv6 networks?",
    "options": [
      "Neighbor Discovery Protocol (NDP) using ICMPv6 messages (Neighbor Solicitation/Advertisement)",
      "ARPv6",
      "DHCPv6",
      "DNS"
    ],
    "correctAnswer": 0,
    "explanation": "IPv6 completely eliminates broadcast ARP, replacing it with multicast Neighbor Discovery Protocol (NDP)."
  },
  {
    "id": "cn-arp-09",
    "category": "computerNetworks",
    "topic": "ARP",
    "difficulty": "hard",
    "question": "What switch security mechanism mitigates ARP Spoofing attacks?",
    "options": [
      "Dynamic ARP Inspection (DAI), which validates ARP packets against the DHCP Snooping database before forwarding",
      "Spanning Tree Protocol (STP)",
      "Quality of Service (QoS)",
      "Port Mirroring"
    ],
    "correctAnswer": 0,
    "explanation": "DAI snoops on ARP packets on untrusted switch ports, dropping forged ARP responses."
  },
  {
    "id": "cn-arp-10",
    "category": "computerNetworks",
    "topic": "ARP",
    "difficulty": "hard",
    "question": "What is 'Proxy ARP'?",
    "options": [
      "A technique where a router responds to an ARP request for an IP that is not on the local subnet on behalf of the remote host",
      "A proxy server that speeds up browsing",
      "A VPN protocol",
      "An anonymizing proxy"
    ],
    "correctAnswer": 0,
    "explanation": "Proxy ARP allows a router to answer ARP queries on behalf of target nodes across subnets transparently."
  },
  {
    "id": "cn-nat-01",
    "category": "computerNetworks",
    "topic": "NAT",
    "difficulty": "easy",
    "question": "What does NAT stand for and what is its primary historical purpose?",
    "options": [
      "Network Address Translation; translates private non-routable IP addresses into public routable IP addresses, conserving IPv4 space",
      "Network Access Terminal",
      "Network Authentication Token",
      "Network Algorithm Tool"
    ],
    "correctAnswer": 0,
    "explanation": "NAT allows hundreds of local private devices to share one or a few public IPv4 addresses."
  },
  {
    "id": "cn-nat-02",
    "category": "computerNetworks",
    "topic": "NAT",
    "difficulty": "easy",
    "question": "What is Port Address Translation (PAT / NAT Overload)?",
    "options": [
      "A form of NAT that maps multiple private IP addresses to a single public IP address by tracking unique TCP/UDP source port numbers",
      "Translating port numbers to IP addresses",
      "A firewall that blocks all ports",
      "A hardware routing port"
    ],
    "correctAnswer": 0,
    "explanation": "PAT (used in almost all home/enterprise routers) differentiates thousands of internal sockets using port mapping tables."
  },
  {
    "id": "cn-nat-03",
    "category": "computerNetworks",
    "topic": "NAT",
    "difficulty": "easy",
    "question": "What is 'Static NAT'?",
    "options": [
      "A one-to-one permanent mapping between an internal private IP address and a dedicated external public IP address (used for public web/mail servers)",
      "A NAT configuration that never turns on",
      "A router with no ports",
      "An unchangeable hardware NAT"
    ],
    "correctAnswer": 0,
    "explanation": "Static NAT provides a consistent public IP identity for inbound servers behind a firewall."
  },
  {
    "id": "cn-nat-04",
    "category": "computerNetworks",
    "topic": "NAT",
    "difficulty": "easy",
    "question": "What is 'Dynamic NAT'?",
    "options": [
      "Maps an unregistered private IP to an available public IP chosen from an allocated pool of public IP addresses on a first-come, first-served basis",
      "NAT that changes every millisecond",
      "NAT that works without routers",
      "Wireless NAT"
    ],
    "correctAnswer": 0,
    "explanation": "Dynamic NAT allocates from a pool of public IPs; if pool exhausts, subsequent connections stall."
  },
  {
    "id": "cn-nat-05",
    "category": "computerNetworks",
    "topic": "NAT",
    "difficulty": "medium",
    "question": "What is 'Port Forwarding' (DNAT / Destination NAT)?",
    "options": [
      "Configuring a router to forward incoming traffic on a specific public port directly to a designated private IP and port inside the local network",
      "Forwarding network packets to a foreign country",
      "A method for hacking routers",
      "An Ethernet cable splitter"
    ],
    "correctAnswer": 0,
    "explanation": "Port forwarding enables external internet clients to reach internal servers (e.g. public port 80 -> private 192.168.1.10:80)."
  },
  {
    "id": "cn-nat-06",
    "category": "computerNetworks",
    "topic": "NAT",
    "difficulty": "medium",
    "question": "Why does NAT break end-to-end connectivity and peer-to-peer protocols (like WebRTC, VoIP, BitTorrent)?",
    "options": [
      "Internal hosts behind NAT do not possess public IP addresses and cannot receive unsolicited inbound connection requests from external peers",
      "NAT blocks all internet traffic",
      "NAT deletes video files",
      "NAT makes computers too slow"
    ],
    "correctAnswer": 0,
    "explanation": "External nodes cannot initiate connections directly to private IP endpoints shielded behind NAT gateways."
  },
  {
    "id": "cn-nat-07",
    "category": "computerNetworks",
    "topic": "NAT",
    "difficulty": "medium",
    "question": "What protocols are designed for 'NAT Traversal' to establish peer-to-peer connections through NAT firewalls?",
    "options": [
      "STUN (Session Traversal Utilities for NAT), TURN, and ICE",
      "TCP, UDP, and IP",
      "HTTP, FTP, and SMTP",
      "OSPF and BGP"
    ],
    "correctAnswer": 0,
    "explanation": "STUN discovers public-facing reflexive addresses, and TURN relays traffic when direct P2P connection fails."
  },
  {
    "id": "cn-nat-08",
    "category": "computerNetworks",
    "topic": "NAT",
    "difficulty": "medium",
    "question": "What is 'Carrier-Grade NAT' (CGNAT / Large-Scale NAT)?",
    "options": [
      "An ISP-level NAT layer deployed to share a single public IPv4 address among hundreds of different residential households/subscribers",
      "A military satellite NAT",
      "A router on aircraft carriers",
      "A NAT used for shipping containers"
    ],
    "correctAnswer": 0,
    "explanation": "ISPs deploy CGNAT (100.64.0.0/10) to cope with IPv4 exhaustion, placing consumers behind double-NAT."
  },
  {
    "id": "cn-nat-09",
    "category": "computerNetworks",
    "topic": "NAT",
    "difficulty": "hard",
    "question": "What does 'Full-Cone NAT' (One-to-One NAT) mean in NAT taxonomy?",
    "options": [
      "Once an internal address (iAddr:iPort) is mapped to external (eAddr:ePort), ANY external host can send packets to eAddr:ePort to reach the internal host",
      "A cone-shaped router antenna",
      "A NAT that blocks all connections",
      "A NAT with 360-degree coverage"
    ],
    "correctAnswer": 0,
    "explanation": "Full-Cone NAT is the least restrictive NAT type, permitting unrestricted inbound traffic from any external source."
  },
  {
    "id": "cn-nat-10",
    "category": "computerNetworks",
    "topic": "NAT",
    "difficulty": "hard",
    "question": "Why do protocols that embed IP addresses inside their payload data (e.g. FTP, SIP) require an Application Layer Gateway (ALG)?",
    "options": [
      "Standard NAT only rewrites IP packet headers; ALGs inspect and rewrite private IP addresses embedded inside application payloads",
      "ALGs speed up downloading",
      "ALGs encrypt passwords",
      "ALGs are not needed"
    ],
    "correctAnswer": 0,
    "explanation": "Protocols embedding IP addresses in payloads fail under NAT unless an ALG rewrites application-level strings."
  },
  {
    "id": "cn-fw-01",
    "category": "computerNetworks",
    "topic": "Firewalls",
    "difficulty": "easy",
    "question": "What is a Firewall in computer network security?",
    "options": [
      "A network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules",
      "A physical wall that blocks room fires",
      "An antivirus that scans hard drives",
      "A backup power supply"
    ],
    "correctAnswer": 0,
    "explanation": "Firewalls establish perimeter security barriers inspecting and filtering network traffic against policy rules."
  },
  {
    "id": "cn-fw-02",
    "category": "computerNetworks",
    "topic": "Firewalls",
    "difficulty": "easy",
    "question": "What is a 'Packet Filtering Firewall' (Stateless Firewall)?",
    "options": [
      "Inspects individual packets in isolation based on Layer 3 and Layer 4 headers (Source/Dest IP, Port, Protocol) without tracking connection state",
      "A firewall that deletes all packets",
      "A firewall that inspects emails",
      "A firewall that runs in memory"
    ],
    "correctAnswer": 0,
    "explanation": "Stateless firewalls evaluate packet headers independently without remembering whether a packet belongs to an existing flow."
  },
  {
    "id": "cn-fw-03",
    "category": "computerNetworks",
    "topic": "Firewalls",
    "difficulty": "easy",
    "question": "What is a 'Stateful Inspection Firewall'?",
    "options": [
      "Tracks active TCP and UDP connection states in a state table, automatically allowing return response traffic matching established connections",
      "A firewall owned by a government state",
      "A firewall that has no rules",
      "A firewall that operates on physical wires"
    ],
    "correctAnswer": 0,
    "explanation": "Stateful firewalls maintain connection tables; outbound requests automatically permit matching inbound replies."
  },
  {
    "id": "cn-fw-04",
    "category": "computerNetworks",
    "topic": "Firewalls",
    "difficulty": "easy",
    "question": "What is a Web Application Firewall (WAF)?",
    "options": [
      "A specialized Layer 7 firewall that inspects HTTP/HTTPS traffic to block web exploits like SQL Injection, Cross-Site Scripting (XSS), and CSRF",
      "A firewall built into Windows desktop",
      "A hardware router switch",
      "A firewall for home WiFi"
    ],
    "correctAnswer": 0,
    "explanation": "WAFs analyze application-layer HTTP payloads to protect web servers from application exploits."
  },
  {
    "id": "cn-fw-05",
    "category": "computerNetworks",
    "topic": "Firewalls",
    "difficulty": "medium",
    "question": "What is a 'Next-Generation Firewall' (NGFW)?",
    "options": [
      "Combines stateful inspection with deep packet inspection (DPI), application awareness, integrated intrusion prevention (IPS), and threat intelligence",
      "A firewall that runs on quantum computers",
      "A software tool released in 2030",
      "A router with 10 antennas"
    ],
    "correctAnswer": 0,
    "explanation": "NGFWs inspect beyond ports and IPs, identifying specific applications (e.g. blocking Facebook video while allowing messaging)."
  },
  {
    "id": "cn-fw-06",
    "category": "computerNetworks",
    "topic": "Firewalls",
    "difficulty": "medium",
    "question": "What is the 'Default Deny' (Drop by Default) security posture in firewall configuration?",
    "options": [
      "All traffic is blocked and rejected unless explicitly permitted by an authorized allow rule",
      "All traffic is allowed unless reported by users",
      "The firewall is turned off by default",
      "All passwords are reset"
    ],
    "correctAnswer": 0,
    "explanation": "Default Deny enforces zero-trust: everything is prohibited except explicitly whitelisted traffic."
  },
  {
    "id": "cn-fw-07",
    "category": "computerNetworks",
    "topic": "Firewalls",
    "difficulty": "medium",
    "question": "What is a Demilitarized Zone (DMZ) in network architecture?",
    "options": [
      "A perimeter subnet that hosts external-facing services (web servers, DNS, mail) isolated between internal corporate LAN and the public internet",
      "A zone where all firewalls are removed",
      "A military server base",
      "A network with no computers"
    ],
    "correctAnswer": 0,
    "explanation": "DMZs protect internal private enterprise networks if publicly exposed web servers are compromised."
  },
  {
    "id": "cn-fw-08",
    "category": "computerNetworks",
    "topic": "Firewalls",
    "difficulty": "medium",
    "question": "What is the difference between an Intrusion Detection System (IDS) and an Intrusion Prevention System (IPS)?",
    "options": [
      "An IDS monitors and alerts on suspicious traffic out-of-band; an IPS sits in-line with traffic and actively blocks/drops malicious packets in real time",
      "An IDS blocks traffic; an IPS only logs",
      "An IDS is hardware; an IPS is software",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "IDS passively alerts administrators; IPS acts as an in-line active defense barrier terminating malicious flows."
  },
  {
    "id": "cn-fw-09",
    "category": "computerNetworks",
    "topic": "Firewalls",
    "difficulty": "hard",
    "question": "What is 'Deep Packet Inspection' (DPI)?",
    "options": [
      "Inspecting the actual payload contents and application data of a packet beyond its Layer 3/4 headers to detect malware, spam, or protocol violations",
      "Reading packets under an optical microscope",
      "Checking the depth of network cables",
      "Analyzing packet electrical voltage"
    ],
    "correctAnswer": 0,
    "explanation": "DPI examines the raw application byte stream to identify protocols, signatures, and malicious payloads."
  },
  {
    "id": "cn-fw-10",
    "category": "computerNetworks",
    "topic": "Firewalls",
    "difficulty": "hard",
    "question": "In Linux, what modern framework replaces legacy iptables for kernel-level packet filtering?",
    "options": [
      "nftables (and eBPF / XDP)",
      "ipfw",
      "UFW only",
      "pfSense"
    ],
    "correctAnswer": 0,
    "explanation": "nftables provides a clean, unified kernel VM replacing legacy iptables/ip6tables; eBPF enables programmable kernel filtering."
  },
  {
    "id": "cn-sec-01",
    "category": "computerNetworks",
    "topic": "Network Security",
    "difficulty": "easy",
    "question": "When you type 'https://www.google.com' into a web browser and press Enter, what is the VERY FIRST network resolution step executed?",
    "options": [
      "The browser checks its internal DNS cache, OS DNS cache, and hosts file to resolve 'www.google.com' to an IP address",
      "The browser immediately sends an HTTP GET request",
      "The CPU switches to kernel mode",
      "The router restarts"
    ],
    "correctAnswer": 0,
    "explanation": "Before any packets can be dispatched, the browser must obtain the target IP address via DNS lookup."
  },
  {
    "id": "cn-sec-02",
    "category": "computerNetworks",
    "topic": "Network Security",
    "difficulty": "easy",
    "question": "During the 'google.com' browser lifecycle, after resolving the IP address, what protocol handshake must complete before sending HTTP data?",
    "options": [
      "TCP 3-Way Handshake (SYN -> SYN-ACK -> ACK) followed by TLS Handshake",
      "ARP Handshake only",
      "DHCP Request",
      "UDP ping"
    ],
    "correctAnswer": 0,
    "explanation": "A reliable transport connection (TCP 3-way handshake) is established first, followed by TLS 1.3 cryptographic negotiation."
  },
  {
    "id": "cn-sec-03",
    "category": "computerNetworks",
    "topic": "Network Security",
    "difficulty": "easy",
    "question": "In the 'google.com' lifecycle, why does the local host emit an ARP request before dispatching the TCP SYN packet?",
    "options": [
      "To find the Layer 2 MAC address of the default gateway router on the local LAN",
      "To find Google's MAC address in California",
      "To find the DNS server's password",
      "To check if the cable is plugged in"
    ],
    "correctAnswer": 0,
    "explanation": "The host knows the gateway's IP address, but must discover its physical MAC address to encapsulate the Ethernet frame."
  },
  {
    "id": "cn-sec-04",
    "category": "computerNetworks",
    "topic": "Network Security",
    "difficulty": "easy",
    "question": "Once the TLS connection to google.com is established, what HTTP request does the browser send to fetch the homepage?",
    "options": [
      "GET / HTTP/2 (or HTTP/1.1) with Host, User-Agent, and Accept headers",
      "POST /homepage",
      "CONNECT google.com",
      "SEND index.html"
    ],
    "correctAnswer": 0,
    "explanation": "The browser issues an HTTP GET request for the root path '/' with request headers."
  },
  {
    "id": "cn-sec-05",
    "category": "computerNetworks",
    "topic": "Network Security",
    "difficulty": "medium",
    "question": "What is a Distributed Denial of Service (DDoS) attack?",
    "options": [
      "Overwhelming a target server or network with a flood of coordinated traffic from thousands of compromised distributed botnet devices",
      "A virus that deletes hard drives",
      "Hacking a server password",
      "Cutting physical fiber optic cables"
    ],
    "correctAnswer": 0,
    "explanation": "DDoS attacks saturate target link bandwidth or application server thread capacity using distributed botnet nodes."
  },
  {
    "id": "cn-sec-06",
    "category": "computerNetworks",
    "topic": "Network Security",
    "difficulty": "medium",
    "question": "What is a Man-in-the-Middle (MitM) attack?",
    "options": [
      "An attacker secretly intercepts and potentially alters communication between two parties who believe they are communicating directly with each other",
      "A referee in an online game",
      "An employee standing between servers",
      "A hardware router failure"
    ],
    "correctAnswer": 0,
    "explanation": "MitM intercepts confidential data streams, prevented by end-to-end TLS encryption with valid CA certificates."
  },
  {
    "id": "cn-sec-07",
    "category": "computerNetworks",
    "topic": "Network Security",
    "difficulty": "medium",
    "question": "What is Cross-Site Scripting (XSS)?",
    "options": [
      "Injecting malicious client-side JavaScript scripts into trusted websites, which execute in the victim user's browser context to steal cookies or tokens",
      "Writing CSS that breaks layouts",
      "Hacking server hardware",
      "Cross-linking websites"
    ],
    "correctAnswer": 0,
    "explanation": "XSS executes arbitrary scripts in user browsers, mitigated via context-aware output encoding and Content Security Policy (CSP)."
  },
  {
    "id": "cn-sec-08",
    "category": "computerNetworks",
    "topic": "Network Security",
    "difficulty": "medium",
    "question": "What is Cross-Site Request Forgery (CSRF)?",
    "options": [
      "Tricking an authenticated victim user's browser into sending unauthorized commands to a web application where the user is currently authenticated",
      "Forging physical paper checks",
      "Stealing passwords via keyloggers",
      "Creating fake website logos"
    ],
    "correctAnswer": 0,
    "explanation": "CSRF exploits ambient credentials (cookies); mitigated using anti-CSRF tokens and SameSite cookie attributes."
  },
  {
    "id": "cn-sec-09",
    "category": "computerNetworks",
    "topic": "Network Security",
    "difficulty": "hard",
    "question": "What does the browser's DOM rendering engine do after receiving the HTML payload from google.com?",
    "options": [
      "Parses HTML to build the DOM tree, parses CSS for CSSOM, combines them into a Render Tree, calculates Layout, and Paints pixels",
      "Immediately compiles HTML into assembly code",
      "Sends the HTML back to Google",
      "Deletes the browser cache"
    ],
    "correctAnswer": 0,
    "explanation": "The browser rendering pipeline: HTML -> DOM; CSS -> CSSOM; combines into Render Tree -> Layout (reflow) -> Paint."
  },
  {
    "id": "cn-sec-10",
    "category": "computerNetworks",
    "topic": "Network Security",
    "difficulty": "hard",
    "question": "What is a Zero-Day Vulnerability?",
    "options": [
      "A software security flaw that is known to attackers or discovered in the wild before the software vendor has released a patch (zero days of notice to fix)",
      "A vulnerability that occurs on day zero of the month",
      "A harmless software warning",
      "A computer virus that expires in 24 hours"
    ],
    "correctAnswer": 0,
    "explanation": "Zero-day vulnerabilities have no existing manufacturer patch, making them potent vectors for targeted exploits."
  }
]
  };

  if (typeof window !== 'undefined') {
    window.interviewPrepData = window.interviewPrepData || {};
    window.interviewPrepData['computerNetworks'] = computerNetworksData;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = computerNetworksData;
  }
})();
