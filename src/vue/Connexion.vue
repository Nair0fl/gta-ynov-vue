<template>
    <div id="login">
        <h1>Login</h1>
        <b-form >
            <b-form-input v-model="input.username" type="text" placeholder="Username"></b-form-input>
            <b-form-input type="password" name="password" v-model="input.password" placeholder="Password"></b-form-input>
            <b-button v-on:click="login()">Login</b-button>
        </b-form>
    </div>
</template>

<script>
import router from "../router";
import json from "../../data/all/users.json";

export default {
  name: "Login",
  router,
  json,
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        for (var jsonindex in json.users) {
          if (
            this.input.username === json.users[jsonindex].lastname &&
            this.input.password === json.users[jsonindex].password
          ) {
            this.$emit("authenticated", true);
          
            window.localStorage.setItem('user',JSON.stringify(json.users[jsonindex]))
            this.$router.replace({ name: json.users[jsonindex].type + "" });
          } 
        }
      } else {
        alert("A username and password must be present");
      }
    }
  }
};
</script>
