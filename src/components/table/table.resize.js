import {$} from '@core/dom'

export function resizehandler($root, e) {
	let valueX
	let valueY
	const $resizer = $(e.target)
	const $parent = $resizer.closest('[data-type="resizable"]')
	const coords = $parent.getCoords()
	const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
	const type = $resizer.data.resize
	const sideProp = type === 'col' ? 'bottom' : 'right'
	
	$resizer.css({
		opacity: 1,
		[sideProp]: '-5000px',
	})
	
	document.onmousemove = e => {
		if (type === 'col') {
			const delta = e.clientX - coords.right
			valueX = coords.width + delta
			$resizer.css({
				right: -delta + 'px',
			})
		} else {
			const delta = e.clientY - coords.bottom
			valueY = coords.height + delta
			$resizer.css({
				bottom: -delta + 'px',
			})
		}
	}
	
	document.onmouseup = () => {
		if (type === 'col') {
			$parent.css({'width': valueX + 'px'})
			cells.forEach(cell => cell.style.width = valueX + 'px')
		} else {
			$parent.css({'height': valueY + 'px'})
		}
		
		$resizer.css({
			opacity: 0,
			right: 0,
			bottom: 0
		})
		
		document.onmousemove = null
		document.onmouseup = null
	}
}
