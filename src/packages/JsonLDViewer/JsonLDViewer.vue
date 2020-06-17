<template>
<div>
    <div v-for="(key, index) of Object.keys(jsonld).filter(k => k !== '@context')" 
        :key="index" class="saga-json-item">
        <p class="saga-json-item-key">{{key}}</p>
        <div class="saga-json-item-value saga-json-item-array" 
            v-if="Array.isArray(jsonld[key])">
            <div v-for="(item, index2) of jsonld[key]" :key="index2">
                {{item}}
            </div>
        </div>
        <div class="saga-json-item-value" v-else-if="typeof jsonld[key] === 'object'">
            <json-ld-viewer :jsonld="jsonld[key]"></json-ld-viewer>
        </div>
        <div class="saga-json-item-value" v-else>{{jsonld[key]}}</div>
    </div>
</div>
    
</template>
<script>
export default {
    name: 'JsonLdViewer',
    props: {
        jsonld: {
            type: Object,
            required: true
        }
    }
}
</script>