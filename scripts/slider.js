class Slider {

	constructor(options = {}) {
		this.$el = options.el
		this.sliders = options.sliders
		this.auoplay = options.autoplay
		this.interval = options.interval || 3000
		this.duration = options.duration || 300
		this.index = 0
		this.render()
		this.start()
	}

	render() {
		this.$el.innerHTML = `<div class="qq-slider-wrap"></div>`
		this.$wrap = this.$el.firstElementChild
		this.$wrap.style.width = `${this.sliders.length * 100}%`
		this.$wrap.style.transitionDuration = `${this.duration}ms`
		this.$wrap.innerHTML = this.sliders.map(slider =>
			`<div class="qq-slider-item">
            <a href="${slider.link}"><img src="${slider.image}"></a>
        </div>`
		).join('')
	}


	start() {
		//setInterval(() =>{this.next()},this.interval)
		setInterval(this.next.bind(this), this.interval) // 绑定当前变量slider
	}

	next() {
		this.index++
		if (this.index === this.sliders.length) {
			this.index = 0
		}

	   let py = `${this.index / this.sliders.length * 100}`
     this.$wrap.style.transform = `translate(-${py}%)`               
		}	
}