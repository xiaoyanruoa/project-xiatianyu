import {
  h, ref, nextTick, watch,
} from 'vue';

import { useRoute } from 'vue-router';
import { createChildApp } from '../util/app-util';
import { createGlobalNode, removeGlobalNode } from '../util/global-node';

export function merge(target, source) {
  for (const key in source) {
    if (key !== 'spinner' && Object(source[key]) === source[key]) {
      target[key] = Object(target[key]) !== target[key] ? {} : { ...target[key] };

      merge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

// eslint-disable-next-line func-names
export default function (DefaultComponent, supportsCustomComponent, parentApp) {
  return (pluginProps) => {
    let DialogComponent;
    let props;
    const isCustom = supportsCustomComponent === true && pluginProps.component !== void 0;

    if (isCustom === true) {
      const { component, componentProps } = pluginProps;

      DialogComponent = typeof component === 'string' ? parentApp.component(component) : component;

      props = componentProps;
    } else {
      const { class: klass, style, ...otherProps } = pluginProps;

      DialogComponent = DefaultComponent;
      props = otherProps;
      klass !== void 0 && (otherProps.cardClass = klass);
      style !== void 0 && (otherProps.cardStyle = style);
    }

    let vm;
    let emittedOK = false;
    const dialogRef = ref(null);
    const el = createGlobalNode();

    const applyState = (cmd) => {
      if (dialogRef.value !== null && dialogRef.value[cmd] !== void 0) {
        dialogRef.value[cmd]();
      } else if (
        // account for "script setup" way of declaring component
        vm.$.subTree
        && vm.$.subTree.component
        && vm.$.subTree.component.proxy
        && vm.$.subTree.component.proxy[cmd]
      ) {
        vm.$.subTree.component.proxy[cmd]();
      } else {
        console.error('[Quasar] Incorrectly defined Dialog component');
      }
    };

    const okFns = [];
    const cancelFns = [];
    const API = {
      onOk(fn) {
        okFns.push(fn);
        return API;
      },
      onCancel(fn) {
        cancelFns.push(fn);
        return API;
      },
      onDismiss(fn) {
        okFns.push(fn);
        cancelFns.push(fn);
        return API;
      },
      hide() {
        applyState('hide');
        return API;
      },
      update(componentProps) {
        if (vm !== null) {
          if (isCustom === true) {
            Object.assign(props, componentProps);
          } else {
            const { class: klass, style, ...cfg } = componentProps;

            klass !== void 0 && (cfg.cardClass = klass);
            style !== void 0 && (cfg.cardStyle = style);
            merge(props, cfg);
          }

          vm.$forceUpdate();
        }

        return API;
      },
    };

    const onOk = (data) => {
      emittedOK = true;
      okFns.forEach((fn) => {
        fn(data);
      });
    };

    const onHide = () => {
      app.unmount(el);
      removeGlobalNode(el);
      app = null;
      vm = null;

      if (emittedOK !== true) {
        cancelFns.forEach((fn) => {
          fn();
        });
      }
    };

    let app = createChildApp(
      {
        name: 'QGlobalDialog',
        setup: () => {
          const route = useRoute();
          watch(route, () => {
            onHide();
          });
          return () => h(DialogComponent, {
            ...props,
            ref: dialogRef,
            onOk,
            onHide,
          });
        },
      },
      parentApp,
    );

    vm = app.mount(el);

    function show() {
      applyState('show');
    }

    if (typeof DialogComponent.__asyncLoader === 'function') {
      DialogComponent.__asyncLoader().then(() => {
        nextTick(show);
      });
    } else {
      nextTick(show);
    }

    return API;
  };
}
