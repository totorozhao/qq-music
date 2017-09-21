import {SEARCH_URL,LYRICS_URL} from './constants.js'

export function searchUrl(keyword,page){
    return `${SEARCH_URL}?keyword=${keyword}&page=${page}`
}


export function songUrl(id){
    return  `http://dl.stream.qqmusic.qq.com/${id}.m4a?fromtag=38`
    // &vkey=1DD39EB7002582B2695A64406818D55BE15A8C2CBF6A1EA02BD552ED73F8A2FA58D6F9E86C8FF7BAA725F1B56671DD2C4EA77BCCB0314804&guid=4586389572
}
export function lyricsUrl(id){
    return `${LYRICS_URL}?id=${id}`
}
export function albumCoverUrl(id) {
    return `https://y.gtimg.cn/music/photo_new/T002R150x150M000${id}.jpg`
  }