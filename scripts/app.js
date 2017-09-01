(function () {


	fetch('json/rec.json')
		.then(res => res.json())
		.then(render)



	function render(json) {
		renderSlider(json.data.slider)
		renderRadioList(json.data.radioList)
		renderSongList(json.data.songList)
		lazyload(document.querySelectorAll('.lazyload'))
	}

	function renderSlider(sliders) {
		sliders = sliders.map(slider => ({
			link: slider.linkUrl,
			image: slider.picUrl
		}))
		new Slider({
			el: document.getElementById("slider"),
			sliders
		})
	}

	function renderRadioList(radioList) {
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

	function renderSongList(songList) {
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


	fetch('json/rank.json') // 获取排行榜数据
		.then(res => res.json())
		.then(renderRank)


	function renderRank(json) { // 渲染排行榜数据
		renderRankList(json.data.topList)
		lazyload(document.querySelectorAll('.lazyload')) // 调用懒加载
	}

	function renderRankList(rankList) {
		let itemlist;
		document.querySelector('.rank-view .qq-toplist').innerHTML = rankList.map(rank => {
			itemlist = rank.songList.map((song, i) =>
				`<p class="threedot">${i}<span class="title">${song.songname}</span>-${song.singername}</p>`).join('')
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


	fetch('json/hotsearch.json') // 获取排行榜数据
		.then(res => res.json())
		.then(renderSearch)

		function renderSearch(json){
			let first = `<a href="${json.data.special_url}" class="tag">${json.data.special_key}</a>`
			let hotkey = json.data.hotkey.sort((a,b) => b.n-a.n)
			hotkey = hotkey.slice(0,11)
			document.querySelector('.hot-keys .hot-tags').innerHTML = first + hotkey.map(key =>
				`<a href="${key.n}" class="tag">${key.k}</a>`).join('')
		}






})()