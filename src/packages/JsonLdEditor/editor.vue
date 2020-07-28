<template>
<div>
    <editor-form :data="jsonForm" :context="jsonldContext" :rootContext="jsonldContext"></editor-form>
    <div class="footer" v-if="showFooter">
        <button @click="handleCompact">输出Compacted</button>
        <button @click="handleExpand">输出Expanded</button>
    </div>
</div>

</template>
<script>
var cloneDeep = require('lodash.clonedeep');
import EditorForm from './editorForm'
import * as jsonld from 'jsonld';

export default {
    name: 'JsonLdEditor',
    components: {
        EditorForm
    },
    props: {
        jsonldContext: {
            type: Object,
            required: false
        },
        jsonldData: {
            type: Object,
            required: false
        },
        showFooter: {
            type: Boolean,
            default: true
        }
    },
    
    data() {
        // const data = {}
        // this.constructData(this.jsonldContext, data)
        // if(this.jsonldData) {
        //     this.applyData(this.jsonldData, data)
        // }
        const data = cloneDeep(this.jsonldData)
        delete data['@context']
        return {
            // jsonForm: cloneDeep(this.jsonld)
            //TODO 根据jsonldData选择表单，根据jsonldContext确定类型和placeholder
            jsonForm: data
        }
    },
    watch: {
        jsonldData(val) {
            const data = cloneDeep(val)
            delete data['@context']
            this.jsonForm = data;
        }
    },
    methods: {
        // 递归的根据context构建表单的data
        constructData(context, data) {
            for(const key of Object.keys(context)) {
                if(context[key].indexOf && context[key].indexOf('http') > -1) continue;
                if(context[key]['@context']) {
                    data[key] = {}
                    this.constructData(context[key]['@context'], data[key])
                }
                if(context[key]['@type']) {
                    if(context[key]['@type'].indexOf('anyURI') > -1) {
                        data[key] = ''
                    } else if(context[key]['@type'].indexOf('string') > -1) {
                        data[key] = ''
                    } else if(context[key]['@type'].indexOf('number') > -1) {
                        data[key] = 0.0
                    } 
                } else if(context[key]['@id']) {
                        data[key] = ''
                }
            }
        },
        applyData(sourceData, targetData) {
            for(const key of Object.keys(sourceData)) {
                if(key === '@context') continue;
                if(Array.isArray(sourceData[key])) {
                    targetData[key] = Object.assign({}, sourceData[key])
                    targetData[key].value = ''
                    targetData[key].placeholder = sourceData[key].value
                }
                else if(typeof sourceData[key] === 'object') {
                    this.applyData(sourceData[key], targetData[key])
                }
                else {
                    targetData[key] = sourceData[key]
                }
            }
        },
        async handleCompact () {
            // const packed = await jsonld.compact(this.jsonForm, this.context)
            const data = {
                "@context": {...this.jsonldContext['@context']},
                ...this.jsonForm
            }
            // console.log(JSON.stringify(data))
            delete data['@context']
            this.$emit('editorCompact', data)
        },
        async handleExpand() {
            const data = {
                "@context": {...this.jsonldContext['@context']},
                ...this.jsonForm
            }
            const expand = await jsonld.expand(data)
            console.log(expand)
            this.$emit('editorExpand', expand)

        }
    }
}
</script>