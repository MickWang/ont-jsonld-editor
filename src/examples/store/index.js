/** 
使用Vue.observable实现简易的vuex
*/
import Vue from 'vue'

export const store = Vue.observable({
    lang: 'zh'
})

export const mutations = {
    setLang(lang) {
        store.lang = lang
    }
}