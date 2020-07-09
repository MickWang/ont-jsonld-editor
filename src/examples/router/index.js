import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/home.vue";
import Editor from '../views/editor.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "home",
        component: Editor
    },
    // {
    //     path: "/editor",
    //     name: "editor",
    //     component: () =>
    //         import(/* webpackChunkName: "editor" */ "../views/editor.vue")
    // }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;