// ─────────────────────────────────────────────────────────────────────────────
// questions.js  —  Edit this file to add, remove, or change questions.
//
// Question types:
//   'multiplechoice' — choices[] array, correct is the letter ('A','B','C','D')
//   'truefalse'      — correct is 'TRUE' or 'FALSE'
//   'fillinblank'    — text contains ___ where the dropdown goes, correct is
//                      the exact word from WORD_BANK
//   'scenario'       — like multiplechoice but with a scenario context box
//
// Points: set points: 1 or points: 2 per question.
//
// To add Q1–Q18, copy the format below and insert them before Q19.
// ─────────────────────────────────────────────────────────────────────────────

const WORD_BANK = [
  'BAI', 'BBI', 'BAO', 'BBO', 'PAI', 'FMO', 'PWO',
  'Dead Band', 'Historian', 'Gain', 'Active Text', 'Duration'
];

const QUESTIONS = [

  // ── Part 2: True / False (1 point each) ───────────────────────────────────

  {
    id: 19,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 1,
    text: 'The RS Zone Sensor and LogiStat Zone Sensor are interchangeable and use the same microblock in Eikon.',
    correct: 'FALSE',
  },
  {
    id: 20,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 1,
    text: "The 'Expander' field on an I/O microblock should be set to 0 when the sensor is wired directly to the controller with no expander board.",
    correct: 'TRUE',
  },

  // ── Part 3: Fill in the Blank (1 point each) ──────────────────────────────

  {
    id: 21,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'The abbreviation for BACnet Analog Input is ___.',
    correct: 'BAI',
  },
  {
    id: 22,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'The abbreviation for BACnet Binary Output is ___.',
    correct: 'BBO',
  },
  {
    id: 23,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'A ___ microblock is used when a utility meter outputs pulses and you need to calculate an average flow rate.',
    correct: 'PAI',
  },
  {
    id: 24,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'The property that defines how much inside the normal range a value must return before an alarm clears is called the ___.',
    correct: 'Dead Band',
  },
  {
    id: 25,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'To archive controller trend data to the WebCTRL server database, you must enable Trend Log AND Trend ___.',
    correct: 'Historian',
  },
  {
    id: 26,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'On a Pulse to Analog Input, the ___ property defines the real-world quantity that each pulse represents.',
    correct: 'Gain',
  },
  {
    id: 27,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'A ___ microblock controls a bi-directional actuator using two separate on/off digital outputs.',
    correct: 'FMO',
  },
  {
    id: 28,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'The ___ microblock sends a continuous variable signal from the control program to a physical output such as a valve actuator or VFD.',
    correct: 'BAO',
  },
  {
    id: 29,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'On a BACnet Binary Input, the text label displayed in WebCTRL when the output is ON is called the ___.',
    correct: 'Active Text',
  },
  {
    id: 30,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 1,
    text: 'A Pulse-Width Output varies the ___ of its on signal rather than outputting a continuous analog voltage.',
    correct: 'Duration',
  },

  // ── Part 5: Scenario Questions (2 points each) ────────────────────────────

  {
    id: 31,
    part: 'Part 5 — Scenario Questions',
    type: 'scenario',
    points: 2,
    scenario: 'You are reviewing a VAV box in WebCTRL and notice the zone temperature sensor is reading 210°F. The zone occupant says it feels comfortable in the room.',
    text: 'What is the most likely cause of the incorrect sensor reading?',
    choices: [
      { letter: 'A', text: 'The High Limit alarm threshold is set too low' },
      { letter: 'B', text: 'There is a wiring or sensor fault — the physical signal is out of range for the configured Sensor Type or Scaling Range' },
      { letter: 'C', text: 'The Trend Historian is not enabled' },
      { letter: 'D', text: 'The Minimum On Time is set too long on the BBO' },
    ],
    correct: 'B',
  },
  {
    id: 32,
    part: 'Part 5 — Scenario Questions',
    type: 'scenario',
    points: 2,
    scenario: "A supply fan BBO in WebCTRL is commanding 'Fan On' but the fan is not running. You have confirmed the controller is communicating normally.",
    text: 'What should you check next?',
    choices: [
      { letter: 'A', text: 'Increase the Max Samples setting for the trend log' },
      { letter: 'B', text: 'Check the Output Number and Expander fields to confirm they match the physical wiring, and verify the Polarity is set correctly' },
      { letter: 'C', text: 'Enable the Trend Historian on the BBO microblock' },
      { letter: 'D', text: 'Change the BAI sensor type from NTC 10K to Universal Input' },
    ],
    correct: 'B',
  },
  {
    id: 33,
    part: 'Part 5 — Scenario Questions',
    type: 'scenario',
    points: 2,
    scenario: 'A building operator reports that trend charts for a critical chilled water supply temperature sensor only show data for the past 2 days, even though trends were enabled months ago.',
    text: 'What is the most likely cause?',
    choices: [
      { letter: 'A', text: 'The COV Increment is set too high' },
      { letter: 'B', text: "Enable Trend Historian is not checked — data is only stored in the controller's limited buffer and is regularly overwritten" },
      { letter: 'C', text: 'The Dead Band value is preventing trend samples from being recorded' },
      { letter: 'D', text: "The sensor's Polarity is set to Reversed" },
    ],
    correct: 'B',
  },
  {
    id: 34,
    part: 'Part 5 — Scenario Questions',
    type: 'scenario',
    points: 2,
    scenario: 'During commissioning, a TAB technician asks you to lock the outside air damper at exactly 50% open so they can measure airflow. The damper is controlled by a BACnet Analog Output.',
    text: 'How do you accomplish this in WebCTRL?',
    choices: [
      { letter: 'A', text: "Change the BAO's Sensor Type to Linear" },
      { letter: 'B', text: 'Increase the Delay Seconds on the BAO alarm' },
      { letter: 'C', text: "Check 'Lock Present Value' on the BAO and set the locked value to 50" },
      { letter: 'D', text: 'Enable Trend Historian on the BAO so the position can be monitored' },
    ],
    correct: 'C',
  },

];
