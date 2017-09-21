export class ProgressBar {
    constructor(el, duration) {
        this.$el = el
        this.progress = 0
        this.duration = duration || 0 // 总时间
        this.elapsed = 0 // 逝去的时间
        this.render()

        this.$progress = this.$el.querySelector('.progress-bar-inner')
        this.$elapsed = this.$el.querySelector('.progress-elapsed')
        this.$duration = this.$el.querySelector('.progress-duration')
        this.$elapsed.innerText = this.formatTime(this.elapsed)
        this.$duration.innerText = this.formatTime(this.duration)

        this.start()
    }


    start() {
        this.intervalId = setInterval(this.update.bind(this), 50)
    }

    //暂停
    pause() {
        clearInterval(this.intervalId)
    }

    reset(duration) {
        this.pause()
        this.progress = 0
        this.elapsed = 0

        this.$progress.style.transform = `translate(-100%)`
        this.$elapsed.innerText = this.formatTime(this.elapsed)
        if (duration) {
            this.duration = +duration
            this.$duration.innerText = this.formatTime(this.duration)
        }
    }


   
    //更新进度条
    update() {
        this.elapsed += 0.05
        this.progress = this.elapsed / this.duration
        if (this.elapsed >= this.duration) this.reset()
        this.$progress.style.transform = `translate(${ this.progress *100 -100 }%)`
        this.$elapsed.innerText = this.formatTime(this.elapsed)
    }

    render() {
        this.$el.innerHTML = `
        <div class="progress-time progress-elapsed"></div>
             <div class="progress-bar">
                  <div class="progress-bar-inner"></div>
            </div>
        <div class="progress-time progress-duration"></div>`
    }

    // 375s  向下取整 06:05
    formatTime(seconds) {
        let mins = Math.floor(seconds / 60)
        let secs = Math.floor(seconds % 60)
        if (mins < 10) mins = '0' + mins
        if (secs < 10) secs = '0' + secs
        return `${mins}:${secs}`
    }

    restart(){
        this.reset()
        this.start()
    }

}