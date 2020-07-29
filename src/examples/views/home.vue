<template>
	<div class="home">
        <div class="home-header">
            <el-tabs v-model="activeTab" @tab-click="handleClick" class="home-tab">
                <el-tab-pane label="商家发布" name="seller"></el-tab-pane>
                <el-tab-pane label="买家查看" name="buyer"></el-tab-pane>
            </el-tabs>
            <el-dropdown v-show="activeTab === 'seller' ">
                <span class="el-dropdown-link">
                    {{lang | langFilter}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >
                        <span style="display:block;" @click="handleLang('zh')">中文</span>
                        </el-dropdown-item>
                    <el-dropdown-item>
                        <span style="display:block;"  @click="handleLang('en')">EN</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        
		<router-view></router-view>
	</div>
</template>

<script>
// 商家发布：根据jsonld 显示表单，保存时将去除context的json保存在本地sessionStorage
// 买家展示：根据jsond和保存的json 显示
import { store, mutations } from '../store'
export default {
    name: "home",
    filters: {
        langFilter(lang) {  
            return lang === 'zh' ? '中文' : 'EN'
        }
    },
    data() {
        return {
            activeTab: 'seller',
            activeIndex: "1",
        }
    },
    computed: {
        lang() {
            return store.lang
        }
    },
    created() {
        if(this.$route.path === '/demo-editor') {
            this.activeTab = 'seller'
        } else {
            this.activeTab = 'buyer'
        }
    },
    methods: {
        handleClick(tab) {
            if(tab.name === 'seller') {
                this.$router.replace({path: '/demo-editor'})
            } else {
                this.$router.replace({path: '/demo-viewer'})
            }
        },
        handleLang(lang) {
            mutations.setLang(lang)
        }
    }
};
</script>
<style lang="scss" scoped>
.home {
    padding: 10px 20px;
}
.home-tab {
    width: 300px;
}
.home-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>