<template>
    <div>
        <json-ld-editor 
            ref="editor"
            :jsonldContext="context_data"
            :jsonldData="jsonldData"
            @editorCompact="onEditorCompact"
            @editorExpand="onEditorExpand"
            :showFooter="false"
             ></json-ld-editor>    
        <button @click="onPublish">发布</button>
    </div>
</template>
<script>
import * as jsonld from 'jsonld';
var cloneDeep = require('lodash.clonedeep');

export default {
    name: 'DemoEditor',
    data() {
        const context_data  = require('./data/context_zh.json')
        return {
            context_data,
            jsonldData: {
                "@context": {}
            },
        }
    },
    async mounted() {
        this.onConfirm()
    },
    methods: {
        onEditorCompact(data) {
            console.log(data)
            // 保存用户填写后的data到本地，用于viewer 展示
            localStorage.setItem('sell_data', JSON.stringify(data))
        },
        onEditorExpand() {

        },
        onPublish() {
            this.$refs.editor.handleCompact()
        },
        async onConfirm() {
            const owner_data = require('./data/default.json')
            let packed = await jsonld.compact(owner_data, this.context_data)
            // packed = Object.freeze(packed)
            console.log(packed)
            this.filterObjectKeys(packed, this.context_data)
            // this.addMissedKeys(packed, this.context_data)
            this.jsonldData = packed
        },
        filterObjectKeys(source, target) {
            for(const key of Object.keys(source)) {
                if(key === '@context') continue;
                if(!target[key]) {
                    delete source[key]
                } else if(Array.isArray(source[key])) {
                    this.filterArrayKeys(source[key], target[key])
                } else if(typeof source[key] === 'object') {
                    this.filterObjectKeys(source[key], target[key])
                } else {
                    // TODO 根据context data的context 设置类型，placeholder
                }
            }
        },
        addMissedKeys(source, target) {
            for(const key of Object.keys(target)) {
                if(key === '@context') continue;
                if(!Array.isArray(target[key]) && typeof target[key] === 'object') {
                    this.addMissedKeys(source[key], target[key])
                }
                else if(!source[key]) {
                    source[key] = '' //补上user data缺失的key，后面根据context data 渲染placeholder
                }
            }
        },
        filterArrayKeys(source, target) {

        }
    }
}
</script>