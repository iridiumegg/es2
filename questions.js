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
//   'scenario'       — like multiplechoice but with a scenario context box
// ─────────────────────────────────────────────────────────────────────────────

const WORD_BANK = [
  'BAI', 'BBI', 'BAO', 'BBO', 'PAI', 'FMO', 'PWO',
  'Dead Band', 'Historian', 'Gain', 'Active Text', 'Duration'
];

const QUESTIONS = [

  // ── Part 1: Multiple Choice (3 points each = 30 pts) ──────────────────────

  {
    id: 1,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 3,
    text: 'Which microblock reads a continuous variable signal such as temperature or pressure from a physical sensor wired to the controller?',
    choices: [
      { letter: 'A', text: 'BACnet Binary Input (BBI)' },
      { letter: 'B', text: 'BACnet Analog Output (BAO)' },
      { letter: 'C', text: 'BACnet Analog Input (BAI)' },
      { letter: 'D', text: 'Pulse to Analog Input (PAI)' },
    ],
    correct: 'C',
  },
  {
    id: 2,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 3,
    text: 'A BAI microblock is displaying a question mark (?) in WebCTRL. What is the most likely cause?',
    choices: [
      { letter: 'A', text: 'The sensor is physically disconnected from the controller' },
      { letter: 'B', text: "The Input Type is set to 'Universal Input' with a driver newer than v2.02.022" },
      { letter: 'C', text: 'The Display Name field is blank' },
      { letter: 'D', text: 'The Trend Log is not enabled' },
    ],
    correct: 'A',
  },
  {
    id: 3,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 3,
    text: 'A filter status differential pressure switch needs to be wired to a controller. Which microblock type should be used?',
    choices: [
      { letter: 'A', text: 'BACnet Analog Input (BAI)' },
      { letter: 'B', text: 'BACnet Analog Output (BAO)' },
      { letter: 'C', text: 'Pulse to Analog Input (PAI)' },
      { letter: 'D', text: 'BACnet Binary Input (BBI)' },
    ],
    correct: 'D',
  },
  {
    id: 4,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 3,
    text: 'A cooling coil valve actuator expects a 2–10 Vdc signal and is controlled by a PID that outputs 0–100%. What is the correct BAO configuration?',
    choices: [
      { letter: 'A', text: 'Minimum Value = 2, Maximum Value = 10' },
      { letter: 'B', text: 'Minimum Value = 0, Maximum Value = 100' },
      { letter: 'C', text: 'Minimum Value = 4, Maximum Value = 20' },
      { letter: 'D', text: 'Minimum Value = 10, Maximum Value = 2' },
    ],
    correct: 'A',
  },
  {
    id: 5,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 3,
    text: 'Which property on a BACnet Binary Output prevents a supply fan from short cycling by enforcing minimum run and rest periods?',
    choices: [
      { letter: 'A', text: 'COV Increment' },
      { letter: 'B', text: 'Dead Band' },
      { letter: 'C', text: 'Minimum Off Time and Minimum On Time' },
      { letter: 'D', text: 'Polarity' },
    ],
    correct: 'C',
  },
  {
    id: 6,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 3,
    text: 'A water meter outputs 1 pulse per 15 gallons. Which microblock and Gain value should be used?',
    choices: [
      { letter: 'A', text: 'BACnet Analog Input, Gain = 1' },
      { letter: 'B', text: 'Pulse to Analog Input, Gain = 15' },
      { letter: 'C', text: 'BACnet Binary Input, Gain = 15' },
      { letter: 'D', text: 'BACnet Analog Output, Gain = 1' },
    ],
    correct: 'B',
  },
  {
    id: 7,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 3,
    text: 'An older damper actuator has two wires — one for Open and one for Close — with no analog signal. Which output microblock should be used?',
    choices: [
      { letter: 'A', text: 'BACnet Analog Output (BAO)' },
      { letter: 'B', text: 'Pulse-Width Output (PWO)' },
      { letter: 'C', text: 'Floating Motor Output (FMO)' },
      { letter: 'D', text: 'BACnet Binary Output (BBO)' },
    ],
    correct: 'C',
  },
  {
    id: 8,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 3,
    text: 'Which two settings must BOTH be enabled on a BAI microblock for trend data to appear in a long-term WebCTRL chart?',
    choices: [
      { letter: 'A', text: 'Lock Present Value and Network Visible' },
      { letter: 'B', text: 'Enable Trend Log and Enable Trend Historian' },
      { letter: 'C', text: 'Show Property Page Text and Potential Alarm Source' },
      { letter: 'D', text: 'Sample on COV and COV Increment' },
    ],
    correct: 'B',
  },
  {
    id: 9,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 3,
    text: 'An alarm for a freezestat keeps triggering and clearing every few minutes near the threshold. Which property should be increased to stop this?',
    choices: [
      { letter: 'A', text: 'Delay Seconds only' },
      { letter: 'B', text: 'Dead Band' },
      { letter: 'C', text: 'High Limit' },
      { letter: 'D', text: 'Max Samples' },
    ],
    correct: 'B',
  },
  {
    id: 10,
    part: 'Part 1 — Multiple Choice',
    type: 'multiplechoice',
    points: 3,
    text: 'An RS Zone Sensor microblock is used for which purpose?',
    choices: [
      { letter: 'A', text: 'Reading a 4–20 mA pressure sensor wired to a universal input' },
      { letter: 'B', text: 'Two-way communication with an RS-series wall sensor — reading zone temperature and sending mode/setpoint back to the sensor display' },
      { letter: 'C', text: 'Counting pulses from a utility meter' },
      { letter: 'D', text: 'Sending a continuous voltage signal to a damper actuator' },
    ],
    correct: 'B',
  },

  // ── Part 2: True / False (2 points each = 20 pts) ────────────────────────

  {
    id: 11,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 2,
    text: 'The BACnet Analog Input (BAI) microblock can only read temperature sensors.',
    correct: 'FALSE',
  },
  {
    id: 12,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 2,
    text: "Setting 'Polarity' to Reversed on a BBI microblock means the output is ON when the physical contact is OPEN.",
    correct: 'TRUE',
  },
  {
    id: 13,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 2,
    text: "You must enable both 'Enable Trend Log' AND 'Enable Trend Historian' to view long-term trend data in WebCTRL reports.",
    correct: 'TRUE',
  },
  {
    id: 14,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 2,
    text: 'A Floating Motor Output uses three physical output wires: Open, Close, and a neutral reference.',
    correct: 'FALSE',
  },
  {
    id: 15,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 2,
    text: "The 'Dead Band' property on an alarm prevents the alarm from re-triggering immediately after the value returns to just inside the normal limit.",
    correct: 'TRUE',
  },
  {
    id: 16,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 2,
    text: "Setting 'Lock Present Value' on an output microblock means the controller will output the locked value regardless of what the control logic commands.",
    correct: 'TRUE',
  },
  {
    id: 17,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 2,
    text: "The Pulse to Analog Input (PAI) microblock requires the Input Type to be set to 'Counter Input'.",
    correct: 'TRUE',
  },
  {
    id: 18,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 2,
    text: 'A BACnet Binary Output (BBO) can output variable voltage levels such as 0–10 Vdc to position a modulating valve.',
    correct: 'FALSE',
  },
  {
    id: 19,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 2,
    text: 'The RS Zone Sensor and LogiStat Zone Sensor are interchangeable and use the same microblock in Eikon.',
    correct: 'FALSE',
  },
  {
    id: 20,
    part: 'Part 2 — True / False',
    type: 'truefalse',
    points: 2,
    text: "The 'Expander' field on an I/O microblock should be set to 0 when the sensor is wired directly to the controller with no expander board.",
    correct: 'TRUE',
  },

  // ── Part 3: Fill in the Blank (2 points each = 20 pts) ───────────────────

  {
    id: 21,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 2,
    text: 'The abbreviation for BACnet Analog Input is ___.',
    correct: 'BAI',
  },
  {
    id: 22,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 2,
    text: 'The abbreviation for BACnet Binary Output is ___.',
    correct: 'BBO',
  },
  {
    id: 23,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 2,
    text: 'A ___ microblock is used when a utility meter outputs pulses and you need to calculate an average flow rate.',
    correct: 'PAI',
  },
  {
    id: 24,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 2,
    text: 'The property that defines how much inside the normal range a value must return before an alarm clears is called the ___.',
    correct: 'Dead Band',
  },
  {
    id: 25,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 2,
    text: 'To archive controller trend data to the WebCTRL server database, you must enable Trend Log AND Trend ___.',
    correct: 'Historian',
  },
  {
    id: 26,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 2,
    text: 'On a Pulse to Analog Input, the ___ property defines the real-world quantity that each pulse represents.',
    correct: 'Gain',
  },
  {
    id: 27,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 2,
    text: 'A ___ microblock controls a bi-directional actuator using two separate on/off digital outputs.',
    correct: 'FMO',
  },
  {
    id: 28,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 2,
    text: 'The ___ microblock sends a continuous variable signal from the control program to a physical output such as a valve actuator or VFD.',
    correct: 'BAO',
  },
  {
    id: 29,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 2,
    text: 'On a BACnet Binary Input, the text label displayed in WebCTRL when the output is ON is called the ___.',
    correct: 'Active Text',
  },
  {
    id: 30,
    part: 'Part 3 — Fill in the Blank',
    type: 'fillinblank',
    points: 2,
    text: 'A Pulse-Width Output varies the ___ of its on signal rather than outputting a continuous analog voltage.',
    correct: 'Duration',
  },

  // ── Part 4: Matching (1 point per correct pair = 10 pts) ─────────────────

  {
    id: 'M',
    part: 'Part 4 — Matching',
    type: 'matching',
    points: 10,
    text: 'Match each microblock abbreviation to its correct definition.',
    pairs: [
      { term: 'BAI', correct: 'I' },
      { term: 'BBI', correct: 'B' },
      { term: 'BAO', correct: 'A' },
      { term: 'BBO', correct: 'C' },
      { term: 'PAI', correct: 'E' },
      { term: 'FMO', correct: 'D' },
      { term: 'PWO', correct: 'J' },
      { term: 'RSF', correct: 'H' },
      { term: 'TLO', correct: 'G' },
      { term: 'AFC', correct: 'F' },
    ],
    definitions: [
      { letter: 'A', text: 'Sends a continuous variable signal (e.g., 0–10 Vdc) to a valve or VFD' },
      { letter: 'B', text: 'Reads an on/off signal from a switch or relay wired to the controller' },
      { letter: 'C', text: 'Sends an on/off command to a relay or digital output on the controller' },
      { letter: 'D', text: 'Controls a bi-directional actuator using two separate open/close digital outputs' },
      { letter: 'E', text: 'Counts pulses from a utility meter and outputs an average rate' },
      { letter: 'F', text: "Manages VAV zone airflow at setpoint using the controller's built-in algorithm" },
      { letter: 'G', text: 'Reads a push button in the zone and outputs a remaining override timer' },
      { letter: 'H', text: 'Two-way communication with an RS-series wall sensor' },
      { letter: 'I', text: 'Reads a continuous variable sensor signal and converts it to engineering units' },
      { letter: 'J', text: 'Converts a percent value to a variable-duration on/off digital signal' },
    ],
  },

  // ── Part 5: Scenario Questions (5 points each = 20 pts) ──────────────────

  {
    id: 31,
    part: 'Part 5 — Scenario Questions',
    type: 'scenario',
    points: 5,
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
    points: 5,
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
    points: 5,
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
    points: 5,
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
