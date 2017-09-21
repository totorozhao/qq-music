import {
  searchUrl
} from './helper.js'
import {
  SearchHistory
} from './search_history.js'

export class Search {
  constructor(el) {
    this.$el = el
    this.$input = this.$el.querySelector('#search-input')
    this.$input.addEventListener('keyup', this.onkeyup.bind(this))
    this.$songs = this.$el.querySelector('.song-list')
    this.page = 1
    this.songs = {}
    this.keyWord = ''
    this.nomore = false
    this.onscroll = this.onScroll.bind(this)
    window.addEventListener('scroll', this.onscroll)

    this.fetching = false
    this.history = new SearchHistory(el, this.$input, this)
  }
  onkeyup(event) {
    window.addEventListener('scroll', this.onscroll)
    let keyword = event.target.value.trim()
    this.history.showDelete()
    if (!keyword) {
      this.reset()
      this.history.hideDelete()
      return
    }
    if (event.keyCode !== 13) return
    this.search(keyword)
    this.history.setStorage(keyword)
    this.history.hideStrorage()
  }

  onScroll(event) {
    if (this.nomore) return window.removeEventListener('scroll', this.onscroll)
    if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 40)
      this.search(this.keyWord, this.page + 1)
  }

  search(keyword, page) {
    //if (this.keyWord === keyword && this.songs[this.page]) return   
    if (this.nomore || this.fetching) return // 没有更多 或者 正在加载中 返回
    if (this.keyWord !== keyword) this.reset()
    this.keyWord = keyword
    this.loading()
    fetch(searchUrl(this.keyWord, page || this.page))
      .then(res => res.json())
      .then(json => {
        this.page = json.data.song.curpage
        this.songs[this.page] = json.data.song.list
        this.nomore = json.message === 'no results'
        return json.data.song.list
      })
      .then(songs => this.append(songs))
      .then(() => this.done())
      .catch(() => this.fetching = false)
  }

  loading() {
    this.fetching = true // 正在加载中说明可以继续fetch
    this.$el.querySelector('.search-loading').classList.add('show')
  }

  cancalLoading() { // 取消正在加载
    this.fetching = false
    this.$el.querySelector('.search-loading').classList.remove('show')
    //if (this.fetchSong) this.fetchSong.abort()
  }

  append(songs) {
    let str = songs.map(song => {
      let artist = song.singer.map(s => s.name).join(' ')
      return `<a class="song-item" href="#player?artist=${artist}&songid=${song.songid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
      <i class="icon-show"></i>
      <h6 class="threedot">${song.songname}</h6>
      <p class="threedot">${artist}</p>
      </a>`}).join('')

    this.$songs.insertAdjacentHTML('beforeend', str)
  }

  done() {
    this.fetching = false // 一旦完成此次加载就先不fetch  保证滚动的时候才去加载
    if (this.nomore) {
      this.$el.querySelector('.loading-icon').style.display = 'none'
      this.$el.querySelector('.loading-text').style.display = 'none'
      this.$el.querySelector('.loading-done').style.display = 'block'
      this.$el.querySelector('.search-loading').classList.add('show')
    } else {
      this.$el.querySelector('.search-loading').classList.remove('show')
    }
  }
  reset() {
    this.page = 1
    this.songs = {}
    this.keyword = ''
    this.nomore = false
    this.$songs.innerHTML = ''
  }
}