import {lazyload} from './lazyload.js'
import { TOPLIST_URL } from './constants.js'

export class Rank{
    constructor(el){
        this.$el = el
    }

    launch(){
        fetch(TOPLIST_URL) // 获取排行榜数据
        .then(res => res.json())
        .then(json => this.json = json)
        .then(() => this.renderRank())

        return this
    }

    renderRank() { // 渲染排行榜数据
		this.renderRankList(this.json.data.topList)
		lazyload(document.querySelectorAll('.lazyload')) // 调用懒加载
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