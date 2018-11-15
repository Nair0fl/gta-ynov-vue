<template>

    <div id="app" >
        <div id="nav">
            <b-navbar v-if="authenticated" toggleable="md" type="dark" variant="info">

  <b-navbar-toggle v-if="authenticated" target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand v-if="authenticated" href="#">NavBar</b-navbar-brand>

  <b-collapse v-if="authenticated" is-nav id="nav_collapse">

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#"><router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link></b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
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