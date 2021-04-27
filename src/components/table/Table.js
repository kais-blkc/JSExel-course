import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template'
import {resizehandler} from '@/components/table/table.resize'
import {TableSelection} from '@/components/table/TableSelection'
import {shouldResize, isCell, matrix, nextSelector} from './table.functions'

export class Table extends ExcelComponent {
	static className = 'excel__table'
	
	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options
		});
	}

	toHTML() {
		return createTable(100)
	}

	prepare() {
		this.selection = new TableSelection()
	}

	init(id='0:0') {
		super.init()

		const $cell = this.$root.find(`[data-id="${id}"]`)
		this.selectCell($cell)

		this.$on('formula:input', text => {
			this.selection.current.text(text)
		})
		this.$on('formula:done', () => {
			this.selection.current.focus()
		})
	}

	selectCell($cell) {
		this.selection.select($cell)
		this.$emit('table:select', $cell)
	}
	
	onMousedown(e) {
		if (shouldResize(e)) {
			resizehandler(this.$root, e)
		} else if (isCell(e)) {
			const $target = $(e.target)
			if (e.shiftKey) {
				const $cells = matrix($target, this.selection.current)
					.map(id => this.$root.find(`[data-id="${id}"]`))

				this.selection.selectGroup($cells)
			} else {
				this.selection.select($target)
			}
		}
	}

	onKeydown(e) {
		const {key} = e
		const keys = [
			'Enter',
			'Tab',
			'ArrowLeft',
			'ArrowRight',
			'ArrowUp',
			'ArrowDown',
		]

		if (keys.includes(key) && !e.shiftKey) {
			e.preventDefault()
			const id = this.selection.current.id(true)
			const $next = this.$root.find(nextSelector(key, id))
			this.selectCell($next)
		}
	}

	onInput(e) {
		this.$emit('table:input', $(e.target).text())
	}
}
