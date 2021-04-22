import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'

export class Table extends ExcelComponent {
	static className = 'excel__table'
	
	constructor($root) {
		super($root, {
			listeners: ['mousedown', 'mouseup']
		});
	}

	toHTML() {
		return createTable(100)
	}
	
	onMousedown(e) {
		this.el = null
		this.col = e.target.parentNode
		this.row = e.target.parentNode.parentNode
		
		if (e.target.dataset.resize === 'col') {
			this.oldX = e.clientX
			this.oldWidth = this.col.getBoundingClientRect().width
			this.el = 'col'
		}
		
		if (e.target.dataset.resize === 'row') {
			this.oldY = e.clientY
			this.oldHeight = this.row.getBoundingClientRect().height
			this.el = 'row'
		}
	}
	
	onMouseup(e) {
		if (this.el === 'col') {
			const newX = e.clientX
			const newWidth = newX > this.oldX
				? this.oldWidth + (newX - this.oldX)
				: this.oldWidth - (this.oldX - newX)
			
			this.col.style.width = `${newWidth}px`
			this.col = null
		}
		
		if (this.el === 'row') {
			this.newY = e.clientY
			this.newHeight = this.newY > this.oldY
				? this.oldHeight + (this.newY - this.oldY)
				: this.oldHeight - (this.oldY - this.newY)
			
			this.row.style.height = `${this.newHeight}px`
			this.row = null
		}
	}
}
