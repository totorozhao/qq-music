
export class Hotkey {
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