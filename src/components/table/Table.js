import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizehandler} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.functions'

export class Table extends ExcelComponent {
	static className = 'excel__table'
	
	constructor($root) {
		super($root, {
			listeners: ['mousedown']
		});
	}

	toHTML() {
		return createTable(100)
	}
	
	onMousedown(e) {
		if (shouldResize(e)) {
			resizehandler(this.$root, e)
		}
	}
}
