// ─────────────────────────────────────────────────────────────────────────────
// questions.js  —  Edit this file to add, remove, or change questions.
//
// Question types:
//   'multiplechoice' — choices[] array, correct is the letter ('A','B','C','D')
//   'truefalse'      — correct is 'TRUE' or 'FALSE'
//   'fillinblank'    — text contains ___ where the dropdown goes, correct is
//                      the exact word from WORD_BANK
//   'matching'       — single question with pairs[]; answer stored as object
//                      keyed by term. Each correct pair = 1 point.
// ─────────────────────────────────────────────────────────────────────────────

const WORD_BANK = [
  'Controller', 'Graphic', 'BACnet', 'Digital',
  'Commissioning', 'Server', 'Router', 'Trend'
];

const QUESTIONS = [

  // ── Part 1: Multiple Choice (2 points each = 16 pts) ──────────────────────

  {
    id: 1,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 2,
    text: 'What does BAS stand for?',
    choices: [
      { letter: 'A', text: 'Building Automation System' },
      { letter: 'B', text: 'Basic Alarm Software' },
      { letter: 'C', text: 'Building Analog Sensor' },
      { letter: 'D', text: 'BACnet Application Suite' },
    ],
    correct: 'A',
  },
  {
    id: 2,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 2,
    text: 'WebCTRL is a building automation software platform made by which company?',
    choices: [
      { letter: 'A', text: 'Siemens' },
      { letter: 'B', text: 'Automated Logic Corporation (ALC)' },
      { letter: 'C', text: 'Johnson Controls' },
      { letter: 'D', text: 'Distech Controls' },
    ],
    correct: 'B',
  },
  {
    id: 3,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 2,
    text: 'Which communication protocol is most commonly used by BAS field controllers on an RS-485 fieldbus?',
    choices: [
      { letter: 'A', text: 'Modbus TCP' },
      { letter: 'B', text: 'HTTP' },
      { letter: 'C', text: 'BACnet MS/TP' },
      { letter: 'D', text: 'Ethernet/IP' },
    ],
    correct: 'C',
  },
  {
    id: 4,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 2,
    text: 'In WebCTRL, the hierarchy used to organize sites, buildings, floors, and equipment is called the:',
    choices: [
      { letter: 'A', text: 'Network Tree' },
      { letter: 'B', text: 'Point Tree' },
      { letter: 'C', text: 'Equipment Tree' },
      { letter: 'D', text: 'Geographic Tree' },
    ],
    correct: 'D',
  },
  {
    id: 5,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 2,
    text: 'Which input type would a temperature sensor typically be wired to on a controller?',
    choices: [
      { letter: 'A', text: 'Digital Input (DI)' },
      { letter: 'B', text: 'Analog Input (AI)' },
      { letter: 'C', text: 'Analog Output (AO)' },
      { letter: 'D', text: 'Digital Output (DO)' },
    ],
    correct: 'B',
  },
  {
    id: 6,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 2,
    text: 'A digital output (DO) is most commonly used to:',
    choices: [
      { letter: 'A', text: 'Read a temperature value' },
      { letter: 'B', text: 'Measure CO2 levels in a zone' },
      { letter: 'C', text: 'Turn equipment on or off' },
      { letter: 'D', text: 'Vary a VFD speed from 0–100%' },
    ],
    correct: 'C',
  },
  {
    id: 7,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 2,
    text: "What does the term 'setpoint' mean in a BAS?",
    choices: [
      { letter: 'A', text: 'The current measured value of a sensor' },
      { letter: 'B', text: 'The target value the system is trying to maintain' },
      { letter: 'C', text: 'The maximum voltage allowed at a controller terminal' },
      { letter: 'D', text: 'A type of BACnet communication object' },
    ],
    correct: 'B',
  },
  {
    id: 8,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 2,
    text: 'In WebCTRL, an alarm is generated when:',
    choices: [
      { letter: 'A', text: 'A controller loses power for the first time' },
      { letter: 'B', text: "A point value goes outside of its defined normal range" },
      { letter: 'C', text: 'A technician logs in from a new computer' },
      { letter: 'D', text: 'The WebCTRL server is restarted' },
    ],
    correct: 'B',
  },

  // ── Part 2: True / False (1 point each = 8 pts) ───────────────────────────

  {
    id: 9,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 1,
    text: 'WebCTRL can only monitor HVAC equipment — it cannot send control commands to it.',
    correct: 'FALSE',
  },
  {
    id: 10,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 1,
    text: 'BACnet is an open communication protocol developed specifically for building automation systems.',
    correct: 'TRUE',
  },
  {
    id: 11,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 1,
    text: 'An analog output (AO) is typically used to control a variable-speed device, such as a VFD or modulating valve actuator.',
    correct: 'TRUE',
  },
  {
    id: 12,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 1,
    text: 'All sensors used in a BAS communicate wirelessly to the controller by default.',
    correct: 'FALSE',
  },
  {
    id: 13,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 1,
    text: "A trend log in WebCTRL is used to record a point's value over a period of time.",
    correct: 'TRUE',
  },
  {
    id: 14,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 1,
    text: 'MS/TP stands for Master-Slave / Token-Passing.',
    correct: 'TRUE',
  },
  {
    id: 15,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 1,
    text: 'A controller with a higher BACnet Device Instance number always has higher priority on the network.',
    correct: 'FALSE',
  },
  {
    id: 16,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 1,
    text: 'Schedules in WebCTRL allow operators to automatically change setpoints or equipment states at specific times of day.',
    correct: 'TRUE',
  },

  // ── Part 3: Fill in the Blank (1 point each = 8 pts) ─────────────────────

  {
    id: 17,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'The physical device that reads inputs and drives outputs in a BAS field installation is called a ___.',
    correct: 'Controller',
  },
  {
    id: 18,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'In WebCTRL, the software screen that displays a visual overview of a piece of equipment is called a ___.',
    correct: 'Graphic',
  },
  {
    id: 19,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'The communication standard developed by ASHRAE specifically for building automation is called ___.',
    correct: 'BACnet',
  },
  {
    id: 20,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'A ___ input changes between only two states: on/off, open/closed, or true/false.',
    correct: 'Digital',
  },
  {
    id: 21,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'The process of verifying that a BAS system is installed correctly and operating as designed is called ___.',
    correct: 'Commissioning',
  },
  {
    id: 22,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'WebCTRL stores its configuration, graphics, and database on a machine called the ___.',
    correct: 'Server',
  },
  {
    id: 23,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'A device that connects MS/TP field controllers to a BACnet/IP backbone network is called a ___.',
    correct: 'Router',
  },
  {
    id: 24,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'A ___ log captures the value of a point at regular time intervals for later review or reporting.',
    correct: 'Trend',
  },

  // ── Part 4: Matching (1 point per correct pair = 8 pts) ───────────────────

  {
    id: 'M',
    part: 'Part 4 — Matching',
    type: 'matching',
    points: 8,
    text: 'Match each term to its correct definition.',
    pairs: [
      { term: 'Analog Output (AO)', correct: 'A' },
      { term: 'Digital Output (DO)', correct: 'B' },
      { term: 'BACnet',             correct: 'C' },
      { term: 'Trend Log',          correct: 'D' },
      { term: 'Setpoint',           correct: 'E' },
      { term: 'Geographic Tree',    correct: 'F' },
      { term: 'Alarm',              correct: 'G' },
      { term: 'DDC Controller',     correct: 'H' },
    ],
    definitions: [
      { letter: 'A', text: 'Sends a continuous variable signal (e.g., 0–10 Vdc) to a valve or VFD' },
      { letter: 'B', text: 'Turns equipment on or off — relay or binary control signal' },
      { letter: 'C', text: 'Open protocol standard for building automation communication' },
      { letter: 'D', text: "Records a point's value over time for later analysis or reporting" },
      { letter: 'E', text: 'The target value a control loop is trying to reach and maintain' },
      { letter: 'F', text: "WebCTRL's site / floor / equipment hierarchy for organizing points" },
      { letter: 'G', text: 'Notification generated when a point value exceeds its normal range' },
      { letter: 'H', text: 'Direct Digital Control device — reads inputs and drives outputs' },
    ],
  },

];
