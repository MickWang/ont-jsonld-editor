<template>
	<div>
		<form>
			<div v-for="(key, index) of Object.keys(data)"
				:key="index"
				class="saga-json-item">
                <div class="saga-json-item-value"
					v-if="Array.isArray(data[key])" >
                    <label for="">{{key}}</label>
                   <div class="saga-json-item" v-for="(item, index) of data[key]" :key="index">
                       <editor-form :data="item" :context="getContext(key)" :rootContext="rootContext[key]"
                       v-if="typeof item === 'object'"></editor-form>
                       <input type="text" v-else v-model="data[key][index]"> 
                   </div>
				</div>
				<div class="saga-json-item-value"
					v-else-if="typeof data[key] === 'object'">
                    <label >{{key}}</label>
					<editor-form :data="data[key]" :context="getContext(key)" :rootContext="rootContext[key]"></editor-form>
				</div>
				<div class="saga-json-item-value"
					v-else>
					<label>{{key}}</label>
					<input type="text" v-if="getType(key) === 'xsd:string' "
						v-model="data[key]" :placeholder="getPlaceholder(key)" />
                    <input type="text" v-else-if="getType(key) === 'xsd:anyURI' "
						v-model="data[key]" :placeholder="getPlaceholder(key)"/>   
				</div>
			</div>
		</form>
	</div>
</template>
<script>
export default {
	name: "EditorForm",
	props: {
        data: {
            type: Object,
            required: true
        },
        context: {
            type: Object,
            required: true
        },
        rootContext: {
            type: Object,
            required: true
        }
    },
    methods: {
        getContext(key) {
            if(this.context['@context']) {
                return this.context['@context'][key]['@context']
            } else if(this.context[key]) {
                return this.context[key]['@context']
            }
        },
        getType(key) {
            if(this.context[key] && this.context[key]['@type']) {
                return this.context[key]['@type']
            } else {
                return 'xsd:string'
            }
        },
        getPlaceholder(key) {
            if(this.rootContext && this.rootContext[key]) {
                return this.rootContext[key]
            }
        }
    }
};
</script>