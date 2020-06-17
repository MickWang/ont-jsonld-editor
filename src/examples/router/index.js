import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/home.vue";


Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/editor",
        name: "editor",
        component: () =>
            import(/* webpackChunkName: "editor" */ "../views/editor.vue")
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;