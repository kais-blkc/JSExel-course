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
