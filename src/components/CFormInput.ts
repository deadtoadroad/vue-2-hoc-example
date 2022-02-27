import { BFormInput } from "bootstrap-vue";
import Vue from "vue";
import { withInjectedReadonly } from "@/utilities/hoc";

export const CFormInput = Vue.extend({
  name: "CFormInput",
  ...withInjectedReadonly("readonly")(BFormInput),
});
