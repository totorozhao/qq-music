/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const RECOMMEND_URL = `https://qq-music-totorozhao.now.sh/`
/* harmony export (immutable) */ __webpack_exports__["b"] = RECOMMEND_URL;
   //推荐
const TOPLIST_URL = `https://qq-music-totorozhao.now.sh/top`
/* harmony export (immutable) */ __webpack_exports__["d"] = TOPLIST_URL;
  // 排行榜
const SEARCH_URL = `https://qq-music-totorozhao.now.sh/search`
/* harmony export (immutable) */ __webpack_exports__["c"] = SEARCH_URL;
 // 搜索
const HOTKEY_URL = `https://qq-music-totorozhao.now.sh/hotkey`
/* unused harmony export HOTKEY_URL */
  // 热键
const LYRICS_URL = `https://qq-music-totorozhao.now.sh/lyrics`
/* harmony export (immutable) */ __webpack_exports__["a"] = LYRICS_URL;
  //歌词

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = lazyload;
function lazyload(images) {

  let imgs = [].slice.call(images) //Array.from(images)

  if ('IntersectionObserver' in window) {
    let observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          loadImage(entry.target, () => {
            observer.unobserve(entry.target)
          })
        }
      })
    }, {
      threshold: 0.01
    })
    imgs.forEach(img => observer.observe(img))
  } else {
    let onscroll = throttle(function () {
      console.log(new Date())
      if (imgs.length === 0) {
        return window.removeEventListener('scroll', onscroll)
      }
      imgs = imgs.filter(img => img.classList.contains('lazyload'))
      imgs.forEach(img => {
        inViewport(img) && loadImage(img)
      })
    }, 500)
    window.addEventListener('scroll', onscroll)
    window.dispatchEvent(new Event('scroll'))
  }
}
  

function throttle(func, wait) { // 节流函数
  let prev, timer
  return function fn() {
    let curr = Date.now()
    let diff = curr - prev
    if (!prev || diff >= wait) {
      func()
      prev = curr
    } else if (diff < wait) {
      clearTimeout(timer)
      timer = setTimeout(func, wait - diff)
    }
  }
}

function loadImage(img, callback) {
  let image = new Image()
  image.src = img.dataset.src
  image.onload = function () {
    img.src = image.src
    img.classList.remove('lazyload') // 已经加载过就不再加载，上面有过滤
    if (typeof callback === 'function') callback()
  }
}

function inViewport(img) {
  let {
    top,
    right,
    left,
    bottom
  } = img.getBoundingClientRect()
  let vpWidth = document.documentElement.clientWidth
  let vpHeight = document.documentElement.clientHeight
  return (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) &&
    (left > 0 && left < vpWidth || right > 0 && right < vpWidth)
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = searchUrl;
/* harmony export (immutable) */ __webpack_exports__["d"] = songUrl;
/* harmony export (immutable) */ __webpack_exports__["b"] = lyricsUrl;
/* harmony export (immutable) */ __webpack_exports__["a"] = albumCoverUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(0);


function searchUrl(keyword,page){
    return `${__WEBPACK_IMPORTED_MODULE_0__constants_js__["c" /* SEARCH_URL */]}?keyword=${keyword}&page=${page}`
}


function songUrl(id){
    return  `http://dl.stream.qqmusic.qq.com/${id}.m4a?fromtag=38`
    // &vkey=1DD39EB7002582B2695A64406818D55BE15A8C2CBF6A1EA02BD552ED73F8A2FA58D6F9E86C8FF7BAA725F1B56671DD2C4EA77BCCB0314804&guid=4586389572
}
function lyricsUrl(id){
    return `${__WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* LYRICS_URL */]}?id=${id}`
}
function albumCoverUrl(id) {
    return `https://y.gtimg.cn/music/photo_new/T002R150x150M000${id}.jpg`
  }

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tab_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tab_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__tab_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recommend_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ranklist_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hotkey_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__music_player_js__ = __webpack_require__(11);
// (function () {
// 	let search = new Search(document.querySelector('.search-view'))
// 	let player = new MusicPlayer(document.querySelector('#player'))
// 	document.querySelector('.show-player').addEventListener('click', () => {
// 		player.show()
// 	})
// 	function onHashChange(){
// 		let hash = location.hash
// 		if (/^#player\?.+/.test(hash)) {
// 			let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g)
// 			let options = matches && matches.reduce((res, cur) => {
// 			  let arr = cur.split('=')
// 			  res[arr[0]] = decodeURIComponent(arr[1])
// 			  return res
// 			}, {})
// 			player.play(options)
// 		  } else {
// 			player.hide()
// 		  }
// 	}
// 	window.addEventListener('hashchange',onHashChange)
// 	function renderRadioList(radioList) {
// 		document.querySelector('.radios .list').innerHTML = radioList.map(radio =>
// 			`<li class="play-radio"><a>
// 				<div class="list-media">
// 					<img data-src="${radio.picUrl}" class="lazyload">
// 					<span class="icon-play"></span>
// 				</div>
// 				<div class="info">
// 				<h3 class="info-title">${radio.Ftitle}</h3>
// 				</div>
// 			</a></li>`).join('')
// 	}
// 	function renderSongList(songList) {
// 		document.querySelector('.songList .list').innerHTML = songList.map(song =>
// 			`<li class="play-radio"><a>
// 				<div class="list-media">
// 					<img data-src="${song.picUrl}" class="lazyload">
// 					<span class="icon-play"></span>
// 				</div>
// 				<div class="info">
// 				<h3 class="info-title threedot">${song.songListDesc}</h3>
// 				<p class="author">${song.songListAuthor}</p>
// 				</div>				
// 			</a></li>`).join('')
// 	}
// 	function renderRank(json) { // 渲染排行榜数据
// 		renderRankList(json.data.topList)
// 		lazyload(document.querySelectorAll('.lazyload')) // 调用懒加载
// 	}
// 	function renderRankList(rankList) {
// 		let itemlist;
// 		document.querySelector('.rank-view .qq-toplist').innerHTML = rankList.map(rank => {
// 			itemlist = rank.songList.map((song, i) =>
// 				`<p class="threedot">${i+1}<span class="title">${song.songname}</span>-${song.singername}</p>`).join('')
// 			return `<li class="topic-item">
// 			<a class="topic-main">
// 				<img data-src="${rank.picUrl}" class="lazyload" >
// 			</a>
// 			<div class="topic-info">
// 				<div class="topic-wrap">
// 					<h3 class="threedot">${rank.topTitle}</h3>${itemlist}</div>
// 			</div></li>`
// 		}).join('')
// 	}
// 	fetch('json/hotsearch.json') // 获取排行榜数据
// 		.then(res => res.json())
// 		.then(renderSearch)
// 	function renderSearch(json) {
// 		let first = `<a href="${json.data.special_url}" class="tag">${json.data.special_key}</a>`
// 		let hotkey = json.data.hotkey.sort((a, b) => b.n - a.n)
// 		hotkey = hotkey.slice(0, 11)
// 		document.querySelector('.hot-keys .hot-tags').innerHTML = first + hotkey.map(key =>
// 			`<a href="${key.n}" class="tag">${key.k}</a>`).join('')
// 	}
// })()









let recommend = new __WEBPACK_IMPORTED_MODULE_1__recommend_js__["a" /* Recommend */](document.querySelector('.rec-view')).launch()
let randList = new __WEBPACK_IMPORTED_MODULE_2__ranklist_js__["a" /* Rank */](document.querySelector('.rank-view')).launch()
let search = new __WEBPACK_IMPORTED_MODULE_4__search_js__["a" /* Search */](document.querySelector('.search-view'))	
let hotkey = new __WEBPACK_IMPORTED_MODULE_3__hotkey_js__["a" /* Hotkey */](document.querySelector('.search-view')).launch()
let player = new __WEBPACK_IMPORTED_MODULE_5__music_player_js__["a" /* MusicPlayer */](document.querySelector('#player'))

document.querySelector('.show-player').addEventListener('click', () => {
	player.show()
})

function onHashChange(){
	let hash = location.hash
	if (/^#player\?.+/.test(hash)) {
		let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g)
		let options = matches && matches.reduce((res, cur) => {
		  let arr = cur.split('=')
		  res[arr[0]] = decodeURIComponent(arr[1]) 	
		  return res
		}, {})
		player.play(options)
	  } else {
		player.hide()
	  }
}

window.addEventListener('hashchange',onHashChange)


/***/ }),
/* 4 */
/***/ (function(module, exports) {

document.addEventListener('click', function (event) {

    let target = event.target

    if (target.dataset.role !== 'tab') return

    [].forEach.call(target.parentElement.children, tab => {
        tab.classList.remove('active')
    })
    target.classList.add('active')
    let content = document.querySelector(target.dataset.target)



    if (content) {
        [].forEach.call(content.parentElement.children, child => {
            child.style.display = 'none'
        })
        content.style.display = 'block'
    }
})

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lazyload_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_js__ = __webpack_require__(0);




class Recommend {

    constructor(el) {
        this.$el = el
    }
    launch() {
        fetch(__WEBPACK_IMPORTED_MODULE_2__constants_js__["b" /* RECOMMEND_URL */])
            .then(res => res.json())
            .then(json => this.json = json)
            .then(() => this.render())
        return this
    }

    render() {
        this.renderSlider(this.json.data.slider)
        this.renderRadioList(this.json.data.radioList)
        this.renderSongList(this.json.data.songList)
        Object(__WEBPACK_IMPORTED_MODULE_1__lazyload_js__["a" /* lazyload */])(document.querySelectorAll('.lazyload'))
    }


    renderSlider(sliders) {
        sliders = sliders.map(slider => ({
            link: slider.linkUrl,
            image: slider.picUrl
        }))
        new __WEBPACK_IMPORTED_MODULE_0__slider_js__["a" /* Slider */]({
            el: this.$el.querySelector('#slider'),
            sliders
        })
    }
    renderRadioList(radioList) {
        document.querySelector('.radios .list').innerHTML = radioList.map(radio =>
            `<li class="play-radio"><a>
            <div class="list-media">
                <img data-src="${radio.picUrl}" class="lazyload">
                <span class="icon-play"></span>
            </div>
            <div class="info">
            <h3 class="info-title">${radio.Ftitle}</h3>
            </div>
        </a></li>`).join('')
    }
    renderSongList(songList) {
        document.querySelector('.songList .list').innerHTML = songList.map(song =>
            `<li class="play-radio"><a>
            <div class="list-media">
                <img data-src="${song.picUrl}" class="lazyload">
                <span class="icon-play"></span>
            </div>
            <div class="info">
            <h3 class="info-title threedot">${song.songListDesc}</h3>
            <p class="author">${song.songListAuthor}</p>
            </div>				
        </a></li>`).join('')
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Recommend;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Slider;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazyload_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_js__ = __webpack_require__(0);



class Rank{
    constructor(el){
        this.$el = el
    }

    launch(){
        fetch(__WEBPACK_IMPORTED_MODULE_1__constants_js__["d" /* TOPLIST_URL */]) // 获取排行榜数据
        .then(res => res.json())
        .then(json => this.json = json)
        .then(() => this.renderRank())

        return this
    }

    renderRank() { // 渲染排行榜数据
		this.renderRankList(this.json.data.topList)
		Object(__WEBPACK_IMPORTED_MODULE_0__lazyload_js__["a" /* lazyload */])(document.querySelectorAll('.lazyload')) // 调用懒加载
	}

	renderRankList(rankList) {
		let itemlist;
		document.querySelector('.rank-view .qq-toplist').innerHTML = rankList.map(rank => {
			itemlist = rank.songList.map((song, i) =>
				`<p class="threedot">${i+1}<span class="title">${song.songname}</span>-${song.singername}</p>`).join('')
			return `<li class="topic-item">
			<a class="topic-main">
				<img data-src="${rank.picUrl}" class="lazyload" >
			</a>
			<div class="topic-info">
				<div class="topic-wrap">
					<h3 class="threedot">${rank.topTitle}</h3>${itemlist}</div>
			</div></li>`
		}).join('')
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Rank;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Hotkey {
    constructor(el) {
        this.$el = el
    }

    launch() {
        fetch('json/hotsearch.json') // 获取排行榜数据
            .then(res => res.json())
            .then(json => this.json = json)
            .then(() => this.renderSearch())

            return this 
    }
	 renderSearch() {
		let first = `<a href="${this.json.data.special_url}" class="tag">${this.json.data.special_key}</a>`
		let hotkey = this.json.data.hotkey.sort((a, b) => b.n - a.n)
		hotkey = hotkey.slice(0, 11)
		this.$el.querySelector('.hot-keys .hot-tags').innerHTML = first + hotkey.map(key =>
			`<a href="${key.n}" class="tag">${key.k}</a>`).join('')
	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Hotkey;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_history_js__ = __webpack_require__(10);



class Search {
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
    this.history = new __WEBPACK_IMPORTED_MODULE_1__search_history_js__["a" /* SearchHistory */](el, this.$input, this)
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
    fetch(Object(__WEBPACK_IMPORTED_MODULE_0__helper_js__["c" /* searchUrl */])(this.keyWord, page || this.page))
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Search;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SearchHistory {

  constructor(el, input, search) {
    this.$el = el
    this.$input = input
    this.Search = search
    this.$cancel = this.$el.querySelector('#cancle-btn') // 取消
    this.$del_btn = this.$el.querySelector('.icon-delete') // 删除


    this.focusOnce = this.onFocus.bind(this)
    this.$input.addEventListener('focus', this.focusOnce)
    
    this.$cancel.addEventListener('click', this.onCancle.bind(this))
    this.$del_btn.addEventListener('click', this.ondelete.bind(this))


    this.search_history = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)) || []
    this.$history = this.$el.querySelector('.record-list')
    this.$record = this.$el.querySelector('.record-keys')
    this.$record.addEventListener('click', this)
  }

  handleEvent(event) {
    let target = event.target
    switch (true) {
      case target.matches('.record-handle') || target.matches('.record-handle a'):
        this.clearStrorage()
        this.showHistory()
        break
      case target.matches('.record-content'):
        this.hideStrorage()
        this.searchItem(target)
        break
      case target.matches('.icon-close'):
        this.deletItem(target)
        this.showHistory()
        break
    }
  }

  onCancle(event) { // 取消
    event.target.classList.add('hide')
    this.$del_btn.classList.add('hide')
    this.$el.querySelector('.hot-keys').classList.remove('hide')
    this.$el.querySelector('.record-keys').classList.add('hide')
    this.$input.addEventListener('focus', this.focusOnce)

    this.$input.value = ''
    this.Search.reset()
    this.Search.cancalLoading()
  }
  onFocus() {
    this.$cancel.classList.remove('hide')
    this.$el.querySelector('.hot-keys').classList.add('hide')
    this.$el.querySelector('.record-keys').classList.remove('hide')
    this.$history.classList.remove('hide')
    this.showHistory()
    this.$input.removeEventListener('focus', this.focusOnce)
     window.removeEventListener('scroll', this.Search.onscroll)
  }
  showDelete() {
    this.$del_btn.classList.remove('hide')
  }
  hideDelete() {
    this.$del_btn.classList.add('hide')
  }
  ondelete() {
    this.$input.value = ''
    this.hideDelete()
    this.showHistory()
    this.Search.reset()
    this.Search.cancalLoading()
  }

  showHistory() { 
    this.$history.innerHTML = this.search_history.map((item, i) =>
      ` <li><a href="javascritp:void(0);" class="record-main">
            <span class="icon-reclick"></span>
            <span class="record-content threedot">${item}</span>
            <span class="icon-close" data-index='${i}'></span>
        </a>
    </li>`).join('')

    let text = this.$el.querySelector('.record-handle')
    if (this.search_history.length > 0) {
      text.classList.remove('hide')
    } else {
      text.classList.add('hide')
    }
  }

  setStorage(keyword) {
    this.search_history = this.search_history.filter(i => i !== keyword)
    this.search_history.unshift(keyword)
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.search_history));
  }

  clearStrorage() {
    this.search_history = [];
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.search_history));
  }
  hideStrorage() {
    this.$el.querySelector('.record-keys').classList.add('hide')
  }
  searchItem(target) {
    let keyword = target.innerText.trim()
    if(!keyword) return
    this.$input.value = keyword
    this.Search.search(keyword)
    this.showDelete()
    this.setStorage(keyword)
    
  }

  deletItem(target) {
    let index = target.dataset.index
    if (!index) return
    this.search_history.splice(index, 1)
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.search_history));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SearchHistory;


SearchHistory.prototype.LOCAL_STORAGE_KEY = 'qq_search_history'

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__progress_bar_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lyrics_player_js__ = __webpack_require__(13);




class MusicPlayer {
  constructor(el) {
    this.$el = el
    this.$el.addEventListener('click', this)  
    this.$audio = this.createAudio()
    this.progress = new __WEBPACK_IMPORTED_MODULE_1__progress_bar_js__["a" /* ProgressBar */](this.$el.querySelector('.progress'))
    this.lyrics = new __WEBPACK_IMPORTED_MODULE_2__lyrics_player_js__["a" /* Lyrics */](this.$el.querySelector('.player-lyrics'), this.$audio)    
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

    let bgUrl = Object(__WEBPACK_IMPORTED_MODULE_0__helper_js__["a" /* albumCoverUrl */])(options.albummid)
    this.$el.querySelector('.album-image').src = bgUrl
    this.$el.querySelector('.player-background').style.backgroundImage = `url(${bgUrl})`

    this.progress.reset(options.duration)
    if(options.songid){
      this.songid = options.songid
      this.$el.querySelector('.icon-action').className = 'icon-action icon-play'
      this.$audio.src = Object(__WEBPACK_IMPORTED_MODULE_0__helper_js__["d" /* songUrl */])(this.songid) 

      this.fetching = true   
      fetch(Object(__WEBPACK_IMPORTED_MODULE_0__helper_js__["b" /* lyricsUrl */])(this.songid))
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
/* harmony export (immutable) */ __webpack_exports__["a"] = MusicPlayer;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ProgressBar {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = ProgressBar;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Lyrics {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Lyrics;

Lyrics.prototype.LINE_HEIGHT = 42

/***/ })
/******/ ]);