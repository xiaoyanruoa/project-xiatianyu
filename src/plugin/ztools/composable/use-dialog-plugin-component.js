import { ref, getCurrentInstance } from 'vue';

import getEmitsObject from '../util/get-emits-object';

// To be used for the custom component
// used on a Dialog plugin

function useDialogPluginComponent() {
  const { emit, proxy } = getCurrentInstance();

  // we need a Vue reference to the QDialog
  // component so we can handle it;
  // <q-dialog ref="dialogRef" ...
  // make sure that the setup() in which this
  // function is called returns dialogRef variable
  const visible = ref(false);

  function show() {
    visible.value = true;
  }
  function hide() {
    visible.value = false;
  }

  function onDialogOK(payload) {
    emit('ok', payload);
    hide();
  }

  function onDialogHide() {
    emit('hide');
  }

  // expose public methods required by Dialog plugin
  Object.assign(proxy, { show, hide });

  return {
    visible,
    onDialogHide,
    onDialogOK,
    onDialogCancel: hide,
  };
}

// Don't forget to update the types in "ui/types/composables.d.ts"
const emits = ['ok', 'hide'];

useDialogPluginComponent.emits = emits;
useDialogPluginComponent.emitsObject = getEmitsObject(emits);

export default useDialogPluginComponent;
