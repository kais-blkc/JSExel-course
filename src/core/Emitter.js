export class Emitter {
	constructor() {
		this.listeners = {}
	}

	// Уведомляем слушаталей если они есть
	// formula.emit('table:select', {a: 1})
	emit(event, ...args) {
		if (!Array.isArray(this.listeners[event])) {
			return false
		}

		this.listeners[event].forEach(listener => {
			listener(...args)
		})
		return true
	}

	// Подписываемся на уведомления
	// Добовляем нового слушателя
	// formula.subscribe('table:select', () => {})
	subscribe(event, fn) {
		this.listeners[event] = this.listeners[event] || []
		this.listeners[event].push(fn)
		return () => {
			this.listeners[event] =
				this.listeners[event].filter(listener => listener !== fn)
		}
	}
}

// const emitter = new Emitter()
// emitter.subscribe('nweb', data => console.log('Sub:', data))
// emitter.emit('nweb', 42)
