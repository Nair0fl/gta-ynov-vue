import Vue from 'vue'
import Router from 'vue-router'
import ConnexionComponent from "./vue/Connexion.vue"
import SalariedZoneComponent from "./vue/SalariedZone.vue"
import ManagerZoneComponent from "./vue/ManagerZone.vue"
import DrhZoneComponent from "./vue/DrhZone.vue"


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
            path: "/Salaried",
            name: "Salaried",
            component: SalariedZoneComponent
        },
        {
            path: "/Manager",
            name: "Manager",
            component: ManagerZoneComponent
        },
        {
            path: "/Drh",
            name: "Drh",
            component: DrhZoneComponent
        }
    ]
})