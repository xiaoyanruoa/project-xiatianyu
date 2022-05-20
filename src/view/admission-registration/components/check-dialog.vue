<template>
  <a-modal
    ref="dialogRef"
    :visible="visible"
    :title="title"
    width="350px"
    ok-text="确定"
    cancel-text="取消"
    @cancel="onCancelClick"
    @ok="onOKClick"
  >
    <a-form>
      <a-form-item label="患者姓名">
        张三
      </a-form-item>
      <a-form-item label="患者年龄（岁）">
      </a-form-item>
      <a-form-item label="患者所在病区">
      </a-form-item>
      <div class="mb-2">病区</div>
      <div class="mb-2">楼栋</div>
      <div class="mb-2">层数</div>
      <div>床位</div>
    </a-form>
  </a-modal>
</template>

<script>
import { defineComponent } from 'vue';
import { useDialogPluginComponent } from '@/plugin/ztools/ztools';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '患者详情',
    },
  },

  emits: [...useDialogPluginComponent.emits],

  setup() {
    const { visible, onDialogHide, onDialogOK } = useDialogPluginComponent();

    return {
      visible,
      onDialogHide,

      onOKClick() {
        onDialogOK();
        onDialogHide();
      },

      onCancelClick() {
        onDialogHide();
      },
    };
  },
});
</script>

<style
  lang="scss"
  scoped
>
.form-item-box {
  border: 1px solid #eeeeee;
  padding: 10px 10px 0;
  border-radius: 5px;
}
</style>
