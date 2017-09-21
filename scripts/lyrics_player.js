export class Lyrics {
  constructor(el, audio) {
    this.$el = el
    this.$el.innerHTML = `<div class="lyric-box"></div>`
    this.$lyricbox = this.$el.querySelector('.lyric-box')
    this.index = 0
    this.text = ''
    this.lyrics = []
    this.$audio = audio
    this.reset(this.text)
  }
  pause() {
    clearInterval(this.intervalId)
  }
  start() {
    this.pause()
    this.intervalId = setInterval(this.update.bind(this), 1000)
  }

  update() {
    this.elapsed = Math.round(this.$audio ? this.$audio.currentTime : this.elapsed + 1)
    if (this.index === this.lyrics.length - 1) return
    for (let i = 0, len = this.lyrics.length; i < len; i++) {
      let seconds = this.getSeconds(this.lyrics[i])
      if (this.elapsed === seconds && (!this.lyrics[i + 1] || this.elapsed < this.getSeconds(this.lyrics[i + 1]))) {
        this.$lyricbox.children[this.index].classList.remove('active')
        this.$lyricbox.children[i].classList.add('active')
        this.index = i
        break
      }
    }

    if (this.index > 2) {
      let y = -(this.index - 2) * this.LINE_HEIGHT
      this.$lyricbox.style.transform = `translateY(${y}px)`
    }
  }

  reset(text) {
    this.pause()
    this.index = 0
    this.elapsed = 0
    this.$lyricbox.style.transform = `translateY(0)`

    let $active = this.$lyricbox.querySelector('.active')
    if ($active) $active.classList.remove('active')

    if (text) {
      this.text = this.formateText(text) || ''
      this.lyrics = this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || []
      if (this.lyrics.length) this.render()
    }
    if (this.lyrics.length) this.$lyricbox.children[this.index].classList.add('active')

  }

  restart() {
    this.reset()
    this.start()
  }

  render() {
    this.$lyricbox.innerHTML = this.lyrics.map(item =>
      `<p class="lyric-line ">${item.slice(10)}</p>`
    ).join('')
  }

  formateText(text) {
    let div = document.createElement('div')
    div.innerHTML = text
    return div.innerText
  }
  getSeconds(line) {
    return +line.replace(/^\[(\d{2}):(\d{2}).*/, (match, p1, p2) => 60 * (+p1) + (+p2))
  }
}
Lyrics.prototype.LINE_HEIGHT = 42