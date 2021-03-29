import {ExcelComponent} from '@core/ExcelComponent'

export class Toolbar extends ExcelComponent {
	static className = 'excel__toolbar'
	
	constructor($root) {
		super($root, {
			name: 'Toolbar',
			listeners: ['click']
		})
	}

	toHTML() {
		return `
			<button class="button">
          <span class="material-icons">format_align_left</span>
      </button>
      <button class="button">
          <span class="material-icons">format_align_center</span>
      </button>
      <button class="button">
          <span class="material-icons">format_align_right</span>
      </button>
      <button class="button">
          <span class="material-icons">format_bolder</span>
      </button>
      <button class="button">
          <span class="material-icons">format_italic</span>
      </button>
      <button class="button">
          <span class="material-icons">format_underlined</span>
      </button>
		`
	}
	
	onClick(e) {
		console.log(e.target)
	}
}
