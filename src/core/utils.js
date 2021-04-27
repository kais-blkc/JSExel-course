// Pure functions
export function capitalize(string) {
	if (typeof string !== 'string') {
		return ''
	}
	return string.charAt(0).toUpperCase() + string.slice(1)
}

// input 0, 3
// output [0, 1, 2, 3]
export function range(start, end) {
	if (start > end) {
		[end, start] = [start, end]
	}
	return new Array(end - start + 1)
		.fill('')
		.map((_, index) => start + index)
}
