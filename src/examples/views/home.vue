<template>
	<div class="home">
        <el-tabs v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane label="商家发布" name="seller"></el-tab-pane>
            <el-tab-pane label="买家查看" name="buyer"></el-tab-pane>
        </el-tabs>
		<router-view></router-view>
	</div>
</template>

<script>
// 商家发布：根据jsonld 显示表单，保存时将去除context的json保存在本地sessionStorage
// 买家展示：根据jsond和保存的json 显示
export default {
    name: "home",
    data() {
        return {
            activeTab: 'seller',
            activeIndex: "1"
        }
    },
    methods: {
        handleClick(tab) {
            if(tab.name === 'seller') {
                this.$router.replace({path: '/demo-editor'})
            } else {
                this.$router.replace({path: '/demo-viewer'})
            }
        }
    }
};
</script>