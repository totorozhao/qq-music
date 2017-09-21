export class SearchHistory {

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

SearchHistory.prototype.LOCAL_STORAGE_KEY = 'qq_search_history'