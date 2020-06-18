<template>
	<div class="home">
        <div class="container">
            <div class="input-container">
                <div class="input-owner-data">
                    <textarea type="textarea" v-model="owner_data" />
                </div>
                <div class="input-context-data">
                    <textarea type="textarea" v-model="context_data" />
                </div>
                <button class="btn-confirm" @click="onConfirm">确认</button>
            </div>
            <json-ld-editor 
        :jsonldContext="jsonldData['@context']"
        :jsonldData="jsonldData"
            @editorCompact="onEditorCompact"
            @editorExpand="onEditorExpand"
             ></json-ld-editor>    
        </div>
		
	</div>
</template>

<script>
// import SButton from '../../packages/button'
import * as jsonld from 'jsonld';
export default {
    name: "home",
    data() {
        const context_data  = require('./context_data.json')
        const owner_data = require('./owner_data.json')
        return {
            jsonldData: {
                "@context": {}
            },
            owner_data: JSON.stringify(owner_data),
            context_data : JSON.stringify(context_data),
        }
    },

    async mounted() {
        const jsonldData = {
    "@context": {
        "addon": "https://store.dev.ont.io/addon/v1/",
        "triones":"ons://triones.addon.ont/v1/",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "meta":"addon:meta",
        "config": "addon:meta/config",
        "step": {
            "@id":"addon:step",
            "@type":"@id",
            "@context": {
                "idx": {
                    "@id":"addon:step#idx",
                    "@type":"xsd:integer"
                },
                "callback": {
                    "@id":"addon:step/callback",
                    "@type":"xsd:anyURI"
                },
                "param": {
                    "@id":"addon:step/param",
                    "@type":"xsd:string"
                },
                "rollback_of": {
                    "@id":"addon:step/rollback_of",
                    "@type":"xsd:integer"
                },
                "rollbackable": {
                    "@id":"addon:step/rollbackable",
                    "@type":"xsd:boolean"
                },
                "status": {
                    "@id":"addon:step/status",
                    "@type":"xsd:string"
                },
                "description":{
                    "@id":"addon:step/description",
                    "@type":"xsd:string"
                },
                "Date":{
                    "@id":"triones:charge_day",
                    "@type":"xsd:integer"
                },
                "Delegate wallet":{
                    "@id":"triones:delegate_wallet",
                    "@type":"xsd:string"
                },
                "Ops pubkey":{
                    "@id":"triones:ops_pubkey",
                    "@type":"xsd:string"
                },
                "初始质押":{
                    "@id":"triones:init_pos",
                    "@type":"xsd:integer"
                }
            }
        },
        "runtime": {
            "@id":"addon:meta/runtime",
            "@type":"@id",
            "@context": {
                "callback": {
                    "@id":"addon:meta/runtime#callback",
                    "@type":"xsd:anyURI"
                },
                "cron": {
                    "@id":"addon:meta/runtime#cron",
                    "@type":"xsd:string"
                }
            }
        }    
    },
    "@id":"ons://triones.addon.ont",
    "info": {
        "icon64x64": "https://node.ont.io/static/img/logo.ba93ed20.png",
        "i18n":[
            {
                "lang":"en",
                "name": "Triones node delegation addon",
                "description": "Ontology Foundation enabled free access for node delegation, any wallet with >=10,000 ONT is able to delegate to Ontology Triones network. Node has to be started as an Ontology Triones node. Ontology Foundation provides maintenance and operating work for node delegation. This addon helps any community members to run a live node with low price (150 ONT per month)."
            }]
    },
    "meta": [
        {
            "version": "0.5.0",
            "extra": "https://node.ont.io",
            "config": {
                "step": [
                    {
                        "idx": 1,
                        "description":"Node delegation requires any \"Delegate Wallet\" with >=10,000 ONT, \"Init Pos\" will be used to delegate to Triones network, 500 ONG will be charged by then. \"Ops Pubkey\" is generated automatically, for common operating.",
                        "Delegate wallet":"Axxxxxx",
                        "Ops pubkey":"!$RAND_PUBKEY$!",
                        "初始质押":10000
                    },
                    {
                        "idx": 2,
                        "description":"This step will generate a transaction to delegate \"Init Pos\" to Triones network, will charge 500 ONG, the node operator is set to \"Ops Pubkey\", all node incentive will go to \"Delegate Wallet\". Please confirm.",
                        "callback":"!#qrsign#!/Axxx/delegate/!$Delegate wallet$!/!$Ops pubkey$!/!$Init pos$!",
                        "rollbackable":true
                    },
                    {
                        "rollback_of": 2,
                        "description":"This will quit node delegation from \"Delegate Wallet\". Please aware enough ONG in  \"Delegate Wallet\". Please confirm.",
                        "callback":"!#qrsign#!/Axxx/withdraw/!$Delegate wallet$!"
                    },
                    {
                        "idx": 3,
                        "description":"Ontology Foundation is about to start your node. The node operating fee is set to 150 ONT per month, and will charge every month. Please scan the qrcode and pay for the first month. Ontology Foundation will notify you every month at \"Date\". Thanks for your corperation.",
                        "Date":"!$DAY$!",
                        "callback":"https://node.ont.io/subscription/!$Delegate Wallet$!",
                        "param":"base64({\"unit\":\"ONT\",\"amount\":150})"
                    },
                    {
                        "idx": 4,
                        "description":"Ontology Foundation is starting your node. Please view the node status report at https://node.ont.io."
                    }]
            },
            "runtime":[
                {
                    "callback":"https://node.ont.io/notify/!$HOSTID$!",
                    "cron":"0 0 !$Date$! * *"
                }]
        }]
}
        // const expand = await jsonld.expand(jsonldData)
        // console.log(expand)
        // const packed = await jsonld.compact(expand, jsonldData['@context'])
        // console.log(packed)
        // this.jsonldData = packed
    },
    methods: {
        onEditorCompact(data) {
            alert(JSON.stringify(data))
        },
        onEditorExpand(data) {
            alert(JSON.stringify(data))
        },
        async onConfirm() {
            if(!this.owner_data || !this.context_data) return;
            const owner_data = JSON.parse(this.owner_data)
            const context_data = JSON.parse(this.context_data)
            const packed = await jsonld.compact(owner_data, context_data)
            console.log(packed)
            // alert(JSON.stringify(packed))
            this.jsonldData = packed;
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
        height: 100vh;
        .input-owner-data, .input-context-data {
            flex:1;
            padding: 10px;
            textarea {
                width: 100%;
                height: 100%;
            }
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
</style>