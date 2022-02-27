import Vue, { Component, ComponentOptions } from "vue";

export const withInjectedReadonly: (
  readonlyPropName: string
) => (component: Component) => ComponentOptions<Vue>;
