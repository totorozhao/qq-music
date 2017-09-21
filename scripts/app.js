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


import './tab.js'
import { Recommend } from './recommend.js'
import {Rank} from './ranklist.js'
import {Hotkey} from './hotkey.js'
import {Search} from './search.js'
import { MusicPlayer } from './music_player.js'

let recommend = new Recommend(document.querySelector('.rec-view')).launch()
let randList = new Rank(document.querySelector('.rank-view')).launch()
let search = new Search(document.querySelector('.search-view'))	
let hotkey = new Hotkey(document.querySelector('.search-view')).launch()
let player = new MusicPlayer(document.querySelector('#player'))

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
