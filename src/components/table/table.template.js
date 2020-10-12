const CODES = {
  A: 65,
  Z: 90
}

function createCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `
}

function createRow(content, info = '') {
  return `
        <div class="row">
            <div class="row-info">${info}</div>
            <div class="row-data">${content}</div>
        </div>
  `
}

function toChar(el, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    // eslint-disable-next-line max-len
    rows.push(createRow(new Array(colsCount).fill(createCell()).join(''), i + 1))
  }

  return rows.join('')
}
