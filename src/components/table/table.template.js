const CODES = {
  A: 65,
  Z: 90
}

// function toCell(_, index) {
//   return `
//     <div class="cell" contenteditable data-col="${index}"></div>
//   `
// }

function toCell(row) {
  return function(_, index) {
    return `
      <div 
        class="cell" 
        contenteditable 
        data-col="${index}" 
        data-type="cell"
        data-id="${row}:${index}"
        ></div>
    `
  }
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, info = '') {
  const resizer = info ? `<div class="row-resize" data-resize="row"></div>` : ''
  return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${info}
                ${resizer}
            </div>
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

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('')

    rows.push(createRow(cells, row + 1))
  }

  return rows.join('')
}
