const CODES = {
	A: 65,
	Z: 90
}

function toCell(_, col) {
	return `<div class="cell" contenteditable data-col="${col}"></div>`
}

function toColumn(el, index) {
	return `
		<div class="column unselectable" data-type="resizable" data-col="${index}">
			${el}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`
}

function toRow(index, content) {
	const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
	return `
		<div class="row" data-type="resizable">
			<div class="row-info unselectable">
				${index ? index : ''}
				${resize}
			</div>
			<div class="row-data" data-resize="row">${content}</div>
		</div>
	`
}

function toChar(_, index) {
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
	
	rows.push(toRow(null, cols))
	
	for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(toCell)
			.join('')
		
		rows.push(toRow(i+1, cells))
	}
	
	return rows.join('')
}
