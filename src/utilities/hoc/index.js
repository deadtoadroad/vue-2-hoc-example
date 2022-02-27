import { isFunction } from "lodash/fp";

export const withInjectedReadonly = (readonlyPropName) => (component) => ({
  props: isFunction(component) ? component.options.props : component.props,
  inject: {
    injectedReadonly: {
      from: "readonly",
      // Use an object for reactivity.
      default: () => ({ value: false }),
    },
  },
  computed: {
    computedReadonly() {
      // Let prop override if it exists.
      return readonlyPropName in this.$options.propsData
        ? this[readonlyPropName]
        : // Only accept true, not truthy.
          this.injectedReadonly.value === true;
    },
  },
  render(h) {
    return h(component, {
      // class, style and attrs are included automatically.
      props: { ...this.$options.propsData, readonly: this.computedReadonly },
      on: this.$listeners,
    });
  },
});
