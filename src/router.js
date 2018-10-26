import Vue from 'vue'
import Router from 'vue-router'
import ConnexionComponent from "./components/Connexion.vue"
import SalariedZoneComponent from "./components/SalariedZone.vue"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: "login"
            }
        },
        {
            path: "/login",
            name: "login",
            component: ConnexionComponent
        },
        {
            path: "/secure",
            name: "secure",
            component: SalariedZoneComponent
        }
    ]
})