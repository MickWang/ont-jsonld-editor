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
                       <editor-form :data="item" v-if="typeof item === 'object'"></editor-form>
                       <input type="text" v-else v-model="data[key][index]"> 
                   </div>
                    
				</div>
				<div class="saga-json-item-value"
					v-else-if="typeof data[key] === 'object'">
                    <label >{{key}}</label>
					<editor-form :data="data[key]"></editor-form>
				</div>
				<div class="saga-json-item-value"
					v-else>
					<label>{{key}}</label>
					<input type="text"
						v-model="data[key]" />
				</div>
			</div>
		</form>
	</div>
</template>
<script>
export default {
	name: "EditorForm",
	props: {
		data: {}
	}
};
</script>