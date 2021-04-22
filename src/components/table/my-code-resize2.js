import {$} from '@core/dom'
import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'

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
		if (e.target.dataset.resize) {
			const $resizer = $(e.target)
			const $parent = $resizer.closest('[data-type="resizable"]')
			const coords = $parent.getCoords()
			
			document.onmousemove = coords.left !== 0
				? e => {
						const delta = e.pageX - coords.right
						const value = coords.width + delta
						$parent.$el.style.width = value + 'px'
					}
				: e => {
						const delta = e.pageY - coords.bottom
						const value = coords.height + delta
						$parent.$el.style.height = value + 'px'
					}
			
			document.onmouseup = () => {
				document.onmousemove = null
			}
		}
	}
}
