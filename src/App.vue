<template>

    <div id="app" >
        <div id="nav">
            <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
        </div>
        <router-view @authenticated="setAuthenticated" />
    </div>
</template>
<script>
import router from './router'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);
import { Card } from 'bootstrap-vue/es/components';
Vue.use(Card);
import {Form } from 'bootstrap-vue/es/components';
Vue.use(Form);



    export default {
        
        name: 'App',
        router,
        data() {
            return {
                authenticated: false,
                iduser:null

            }
        },
        mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "login" });

            }
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            setIduser(id) {
                this.iduser = id;
            },
            logout() {
                this.authenticated = false;
            }
        }
    }
</script>

<style>
    body {
        background-color: #F0F0F0;
    }
    h1 {
        padding: 0;
        margin-top: 0;
    }
    #app {
        width: 1024px;
        margin: auto;
    }
</style>