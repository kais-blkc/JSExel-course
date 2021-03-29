import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
	static className = 'excel__formula'
	
	constructor($root) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'click', 'keyup']
		})
	}
	
	onInput(e) {
		console.log(e.target.textContent)
	}
	
	onClick(e) {
	}
	
	onKeyup(e) {
		return ''
	}
	
	
	toHTML() {
		return `
			<div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
		`
	}
}
