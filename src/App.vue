<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <c-form-input
      class="{ test: true }"
      style="background-color: gold"
      @input="log"
    />
    <b-button @click="flip">Flip to readonly {{ !readonly.value }}</b-button>
  </div>
</template>

<script lang="ts">
import { BButton } from "bootstrap-vue";
import { Component, Provide, Vue } from "vue-property-decorator";
import { CFormInput } from "./components/CFormInput";
import HelloWorld from "./components/HelloWorld.vue";

@Component({
  components: {
    BButton,
    CFormInput,
    HelloWorld,
  },
})
export default class App extends Vue {
  @Provide() readonly = { value: false };

  log(value: string) {
    console.log(value);
  }

  flip() {
    this.readonly.value = !this.readonly.value;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
