<template>
    <div id="secure">
        <h1>Bonjour {{user.firstname +" "+ user.lastname}}</h1>
        <b-tabs>
  <b-tab title="first" active>
    <br>I'm the first fading tab
  </b-tab>
  <b-tab title="second" >
    <br>I'm the second tab content
  </b-tab>
  <b-tab title="disabled" disabled>
    <br>Disabled tab!
  </b-tab>
</b-tabs>
    </div>
</template>

<script>
 import json from '../../data/user.json'

    export default {
        name: 'Secure',
        data() {
            return {
                            user:json

            };
        }
    }
</script>

<style scoped>
    #secure {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>