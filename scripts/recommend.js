import {Slider} from './slider.js'
import {lazyload} from './lazyload.js'
import { RECOMMEND_URL } from './constants.js'

export class Recommend {

    constructor(el) {
        this.$el = el
    }
    launch() {
        fetch(RECOMMEND_URL)
            .then(res => res.json())
            .then(json => this.json = json)
            .then(() => this.render())
        return this
    }

    render() {
        this.renderSlider(this.json.data.slider)
        this.renderRadioList(this.json.data.radioList)
        this.renderSongList(this.json.data.songList)
        lazyload(document.querySelectorAll('.lazyload'))
    }


    renderSlider(sliders) {
        sliders = sliders.map(slider => ({
            link: slider.linkUrl,
            image: slider.picUrl
        }))
        new Slider({
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