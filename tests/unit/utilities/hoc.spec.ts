import { mount } from "@vue/test-utils";
import Vue, { CreateElement } from "vue";
import { withInjectedReadonly } from "@/utilities/hoc";

describe("hoc", () => {
  describe("withInjectedReadonly", () => {
    describe("when applied to a component with a readonly prop with a default of false", () => {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const component = withInjectedReadonly("readonly")({
        props: { readonly: { type: Boolean, default: false } },
        render(h: CreateElement) {
          return h("div", `${this.readonly}`);
        },
      } as any);
      /* eslint-enable @typescript-eslint/no-explicit-any */

      describe("the decorated component", () => {
        it("has a readonly value of false by default", () => {
          const wrapper = mount(component);
          expect(wrapper.text()).toBe("false");
        });

        it("has a readonly value of false when given a readonly prop of false", () => {
          const wrapper = mount(component, {
            propsData: { readonly: false },
          });
          expect(wrapper.text()).toBe("false");
        });

        it("has a readonly value of true when given a readonly prop of true", () => {
          const wrapper = mount(component, {
            propsData: { readonly: true },
          });
          expect(wrapper.text()).toBe("true");
        });

        it("has a readonly value of false when provided readonly of false", () => {
          const wrapper = mount(component, {
            provide: { readonly: { value: false } },
          });
          expect(wrapper.text()).toBe("false");
        });

        it("has a readonly value of true when provided readonly of true", () => {
          const wrapper = mount(component, {
            provide: { readonly: { value: true } },
          });
          expect(wrapper.text()).toBe("true");
        });

        it.each([
          [false, false, false],
          [false, true, false],
          [true, false, true],
          [true, true, true],
        ])(
          "lets prop override provide regardless of values %#",
          (prop, provide, expected) => {
            const wrapper = mount(component, {
              propsData: { readonly: prop },
              provide: { readonly: { value: provide } },
            });
            expect(wrapper.text()).toBe(`${expected}`);
          }
        );

        it("reacts to provide changes", async () => {
          // Provide works differently in test utils?
          // An observable is normally added automatically.
          const readonly = Vue.observable({ value: true });
          const wrapper = mount(component, {
            provide: { readonly },
          });
          expect(wrapper.text()).toBe("true");
          readonly.value = false;
          await Vue.nextTick();
          expect(wrapper.text()).toBe("false");
        });
      });
    });

    describe("when applied to a component with another prop (not readonly)", () => {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const component = withInjectedReadonly("readonly")({
        props: {
          readonly: { type: Boolean, default: false },
          something: { type: String },
        },
        render(h: CreateElement) {
          return h("div", this.something);
        },
      } as any);
      /* eslint-enable @typescript-eslint/no-explicit-any */

      describe("the decorated component", () => {
        it("lets attrs through", () => {
          const wrapper = mount(component, {
            attrs: { hello: "hello" },
          });
          expect(wrapper.attributes().hello).toBe("hello");
        });

        it("lets props through", () => {
          const wrapper = mount(component, {
            propsData: { something: "hello" },
          });
          expect(wrapper.text()).toBe("hello");
        });
      });
    });
  });
});
