import {songUrl,lyricsUrl,albumCoverUrl} from './helper.js'
import { ProgressBar } from './progress_bar.js'
import { Lyrics } from './lyrics_player.js'

export class MusicPlayer {
  constructor(el) {
    this.$el = el
    this.$el.addEventListener('click', this)  
    this.$audio = this.createAudio()
    this.progress = new ProgressBar(this.$el.querySelector('.progress'))
    this.lyrics = new Lyrics(this.$el.querySelector('.player-lyrics'), this.$audio)    
    this.fetching = false 
  }

  handleEvent(event) {
    let target = event.target
    switch (true) {
      case target.matches('.icon-pause'):
        this.onPause(event)
        break
      case target.matches('.icon-play'):
        this.onPlay(event)
        break
      case target.matches('.icon-list'):
        this.hide()
        break
    }
  }


  createAudio() {
    let audio = document.createElement('audio')
    audio.id = `player-${Math.floor(Math.random() * 100)}-${+new Date()}`

    audio.addEventListener('ended', () => {
      this.$audio.play()
      this.lyrics.restart()
      this.progress.restart()
    })

    document.body.appendChild(audio)
    return audio
  }

  play(options = {}) {
    if (!options) return

    this.$el.querySelector('.song-name').innerText = options.songname
    this.$el.querySelector('.song-artist').innerText = options.artist

    let bgUrl = albumCoverUrl(options.albummid)
    this.$el.querySelector('.album-image').src = bgUrl
    this.$el.querySelector('.player-background').style.backgroundImage = `url(${bgUrl})`

    this.progress.reset(options.duration)
    if(options.songid){
      this.songid = options.songid
      this.$el.querySelector('.icon-action').className = 'icon-action icon-play'
      this.$audio.src = songUrl(this.songid) 

      this.fetching = true   
      fetch(lyricsUrl(this.songid))
        .then(res => res.json())
        .then(json => json.lyric)
        .then(text => this.lyrics.reset(text))
        .catch(e => {})
        .then(() => this.fetching = false) // 渲染才可以操作
    }    
    this.show()
  }

  onPause(event) {
    event.target.classList.remove('icon-pause')
    event.target.classList.add('icon-play')
    this.$audio.pause()
    this.progress.pause()
    this.lyrics.pause()
  }
  onPlay(event) {
    if(this.fetching) return
    event.target.classList.remove('icon-play')
    event.target.classList.add('icon-pause')

    this.$audio.play()
    this.progress.start()
    this.lyrics.start()
  }

  hide() {
    this.$el.classList.remove('show')
  }
  show() {
    this.$el.classList.add('show')
  }

}