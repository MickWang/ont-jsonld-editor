<template>
	<div class="home">
        <div class="container">
            <div class="input-container">
                <div class="input-owner-data">
                    <p>Input owner data:</p>
                    <textarea type="textarea" v-model="owner_data_input" />
                </div>
                <div class="input-context-data">
                    <p>Input context data:</p>
                    <textarea type="textarea" v-model="context_data_input" />
                </div>
                <button class="btn-confirm" @click="onConfirm">确认</button>
            </div>
            <json-ld-editor 
        :jsonldContext="context_data"
        :jsonldData="jsonldData"
            @editorCompact="onEditorCompact"
            @editorExpand="onEditorExpand"
             ></json-ld-editor>    
        </div>
		<div class="modal" v-show="showModal">
            <div class="modal-content">
                <p>{{showData}}</p>
                <div class="modal-footer">
                    <button class="normal-button" @click="() => {this.showModal = false}">OK</button>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
// import SButton from '../../packages/button'
import * as jsonld from 'jsonld';
export default {
    name: "home",
    data() {
        const context_data  = require('../data/context_data.json')
        const owner_data = require('../data/owner_data.json')
        return {
            jsonldData: {
                "@context": {}
            },
            owner_data_input: JSON.stringify(owner_data),
            context_data_input : JSON.stringify(context_data),
            context_data: {'@context': {}},
            showModal: false,
            showData: ''
        }
    },

    async mounted() {
        
    },
    methods: {
        onEditorCompact(data) {
            this.showData = JSON.stringify(data)
            this.showModal = true
        },
        onEditorExpand(data) {
            this.showData = JSON.stringify(data)
            this.showModal = true
        },
        //context data: 过滤限制输入项，做输入的placeholder；指定输入值的类型
        // owner_data: 用户的值，如果有做默认值
        // 输出 expanded data
        async onConfirm() {
            if(!this.owner_data_input || !this.context_data_input) return;
            const owner_data = JSON.parse(this.owner_data_input)
            const context_data = JSON.parse(this.context_data_input)
            this.context_data = context_data;
            let packed = await jsonld.compact(owner_data, context_data)
            // packed = Object.freeze(packed)
            console.log(packed)
            this.filterObjectKeys(packed, context_data)
            this.addMissedKeys(packed, context_data)
            // 根据context，过滤packed，只保留context里有的key，
            
            // alert(JSON.stringify(packed))
            this.jsonldData = packed;
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
};
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    display: flex;
    .input-container {
        width: 50%;
        margin-right: 20px;
        border: 1px solid #cccccc;
        padding: 15px;
        display: flex;
        flex-direction: column;
        .input-owner-data, .input-context-data {
            textarea {
                width: 100%;
                height: 360px;
            }
            & > p {
                margin: 0;
                margin-bottom: 5px;
            }
        }
        .input-owner-data {
            margin-bottom: 15px;
        }

        .btn-confirm {
            width: 150px;
            height: 40px;
            background: #ffffff;
            cursor: pointer;
            margin: 10px;
        }
    }
}

.modal {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    top: 0;
    left: 0;
    .modal-content {
        position: absolute;
        left: 0;
        right: 0;
        width: 50%;
        background: #ffffff;
        display: block;
        margin: 100px auto;
        padding: 15px;
        
        p {
            margin: 0;
            height: 400px;
            background: rgba(0,0,0,.1);
            overflow-y: auto;
            margin-bottom: 20px;
            padding: 10px;
            word-wrap: none;
        }
        .modal-footer {
            width: 100%;
            text-align: center;
        }
        
    }
}
.normal-button {
    border: 1px solid #000000;
    background: #ffffff;
    width: 100px;
    height: 30px;
    cursor: pointer;
    outline: none;
}
.normal-button:hover {
    background: rgba(0,0,0,.3)
}
</style>