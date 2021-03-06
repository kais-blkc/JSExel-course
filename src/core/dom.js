class DOM {
	constructor(selector) {
		this.$el = typeof(selector) === 'string'
			? document.querySelector(selector)
			: selector
	}
	
	html(html) {
		if (typeof(html) === 'string') {
			this.$el.innerHTML = html
			return this
		}
		return this.$el.outerHTML.trim()
	}
	
	on(evetType, callback) {
		this.$el.addEventListener(evetType, callback)
	}
	
	off(evetType, callback) {
		this.$el.removeEventListener(evetType, callback)
	}
	
	clear() {
		this.html('')
		return this
	}
	
	append(node) {
		if (node instanceof DOM) {
			node = node.$el
		}
		
		if (Element.prototype.append) {
			this.$el.append(node)
		} else {
			this.$el.appendChild(node)
		}
		
		return this
	}
	
	get data() {
		return this.$el.dataset
	}
	
	closest(selector) {
		return $(this.$el.closest(selector))
	}
	
	getCoords() {
		return this.$el.getBoundingClientRect()
	}
	
	find(selector) {
		return this.$el.querySelector(selector)
	}
	
	findAll(selector) {
		return this.$el.querySelectorAll(selector)
	}
	
	css(styles = {}) {
		Object.keys(styles).forEach(key => {
			this.$el.style[key] = styles[key]
		})
	}
}

export function $(selector) {
	return new DOM(selector)
}

$.create = (tagName, classes='') => {
	const el = document.createElement(tagName)
	if (classes) {
		el.classList.add(classes)
	}
	return $(el)
}
