const emptyGrid = [
  // TOP ROW
  [
    { right: false, down: false, highlighted: false },
    { left: false, right: false, down: false, highlighted: false },
    { left: false, right: false, down: false, highlighted: false },
    { left: false, right: false, down: false, highlighted: false },
    { left: false, right: false, down: false, highlighted: false },
    { left: false, down: false, highlighted: false },
  ],

  // MIDDLE ROWS
  [
    { right: false, down: false, up: false, highlighted: false },
    { left: false, right: false, down: false, up: false, highlighted: false },
    { left: false, right: false, down: false, up: false, highlighted: false },
    { left: false, right: false, down: false, up: false, highlighted: false },
    { left: false, right: false, down: false, up: false, highlighted: false },
    { left: false, down: false, up: false, highlighted: false },
  ],
  [
    { right: false, down: false, up: false, highlighted: false },
    { left: false, right: false, down: false, up: false, highlighted: false },
    { left: false, right: false, down: false, up: false, highlighted: false },
    { left: false, right: false, down: false, up: false, highlighted: false },
    { left: false, right: false, down: false, up: false, highlighted: false },
    { left: false, down: false, up: false, highlighted: false },
  ],
  [
    { right: false, down: false, up: false, highlighted: false },
    { left: false, right: false, down: false, up: false, highlighted: false },
    { left: false, right: false, down: false, up: false, highlighted: false },
    { left: false, right: false, down: false, up: false, highlighted: false },
    { left: false, right: false, down: false, up: false, highlighted: false },
    { left: false, down: false, up: false, highlighted: false },
  ],

  // BOTTOM ROW
  [
    { right: false, up: false, highlighted: false },
    { left: false, right: false, up: false, highlighted: false },
    { left: false, right: false, up: false, highlighted: false },
    { left: false, right: false, up: false, highlighted: false },
    { left: false, right: false, up: false, highlighted: false },
    { left: false, up: false, highlighted: false },
  ],
];

export default emptyGrid;
