import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/home.vue";
import Editor from '../views/editor.vue'
import DemoEditor from '../views/demo/demoEditor.vue'
import DemoViewer from '../views/demo/view.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        redirect: '/demo-editor',
        children: [
            {
                path: '/demo-editor',
                name: "demo-editor",
                component: DemoEditor
            },
            {
                path: '/demo-viewer',
                name: "demo-viewer",
                component: DemoViewer
            }
        ]
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