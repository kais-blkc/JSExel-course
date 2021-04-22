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
		setTimeout(() => {
			$('.excel__table')
			.$el.insertAdjacentHTML('afterbegin', '<div class="resize-line"></div>')
		}, 100)
		
		return createTable(100)
	}
	
	onMousedown(e) {
		const $columnsArr = []
		const $columns = $('.row').$el.querySelectorAll('.column')
		$columns.forEach(col => {
			$columnsArr.push(col)
		})
		console.log($columnsArr)
		
		if (e.target.dataset.resize) {
			const $resizer = $(e.target)
			const $parent = $resizer.closest('[data-type="resizable"]')
			const coords = $parent.getCoords()
			const $resizeLine = $('.resize-line')
			
			document.onmousemove = coords.left !== 0
				? e => {
						const delta = e.clientX - coords.right
						const value = coords.width + delta
						$parent.$el.style.width = value + 'px'
						$resizeLine.$el.classList.add('line-col')
						$resizeLine.$el.style.left = (e.pageX - 2) + 'px'
					}
				: e => {
						const delta = e.clientY - coords.bottom
						const value = coords.height + delta
						$parent.$el.style.height = value + 'px'
						$resizeLine.$el.classList.add('line-row')
						$resizeLine.$el.style.top = (e.clientY) + 'px'
					}
			
			document.onmouseup = () => {
				$resizeLine.$el.classList.remove('line-col')
				$resizeLine.$el.classList.remove('line-row')
				$resizeLine.$el.style = {left: 0, top: 0}
				document.onmousemove = null
			}
		}
	}
}
