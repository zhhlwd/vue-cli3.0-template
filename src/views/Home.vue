<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>

    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import homeHeader from "@components/home-header.vue";
import requestConfig from "@api/index";

export default {
  name: "home",
  components: {
    homeHeader
  },
  created() {},
  mounted() {},

  methods: {}
};
</script>
