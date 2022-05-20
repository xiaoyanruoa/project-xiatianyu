<template>
  <a-modal
    ref="dialogRef"
    :visible="visible"
    :title="title"
    width="350px"
    ok-text="确定"
    cancel-text="取消"
    :confirm-loading="loading"
    @cancel="onCancelClick"
    @ok="onOKClick"
  >
    <a-form>
      <a-form-item
        label="患者姓名"
        :help="$et(v$.formData.name)"
        :validateStatus="$et(v$.formData.name) ? 'error' : ''"
      >
        <a-input-password v-model:value="formData.name"></a-input-password>
      </a-form-item>
      <a-form-item
        label="患者年龄（岁）"
        :help="$et(v$.formData.age)"
        :validateStatus="$et(v$.formData.age) ? 'error' : ''"
      >
        <a-input-password v-model:value="formData.age"></a-input-password>
      </a-form-item>
      <a-form-item label="患者所在病区">
        <a-form>
          <a-form-item
            label="病区"
            :help="$et(v$.formData.area)"
            :validateStatus="$et(v$.formData.area) ? 'error' : ''"
          ></a-form-item>
          <a-form-item
            label="楼栋"
            :help="$et(v$.formData.area)"
            :validateStatus="$et(v$.formData.area) ? 'error' : ''"
          ></a-form-item>
          <a-form-item
            label="层数"
            :help="$et(v$.formData.area)"
            :validateStatus="$et(v$.formData.area) ? 'error' : ''"
          ></a-form-item>
          <a-form-item
            label="床位"
            :help="$et(v$.formData.area)"
            :validateStatus="$et(v$.formData.area) ? 'error' : ''"
          ></a-form-item>
        </a-form>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { computed, ref, defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { message } from 'ant-design-vue';
import { useDialogPluginComponent } from '@/plugin/ztools/ztools';
import errorHandler from '@/plugin/error-handler';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '标题',
    },
  },

  emits: [...useDialogPluginComponent.emits],

  errors: {
    required: '该项不能为空',
    sameAs: '两次密码输入不一致',
  },

  setup() {
    const { visible, onDialogHide, onDialogOK } = useDialogPluginComponent();

    const formData = ref({
      name: '',
      age: '',
      area: '',
    });

    const loading = ref(false);

    const rules = computed(() => ({
      formData: {
        name: {
          required,
        },
        age: {
          required,
        },
        area: {
          required,
        },
      },
    }));

    const v$ = useVuelidate(rules, { formData });

    return {
      visible,
      onDialogHide,

      loading,
      v$,
      formData,

      async onOKClick() {
        v$.value.$touch();
        if (v$.value.$invalid) {
          return;
        }

        try {
          loading.value = true;
          message.success('修改成功');

          onDialogOK();
          onDialogHide();
        } catch (error) {
          console.error(error);
          errorHandler('修改失败', error);
        } finally {
          loading.value = false;
        }
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
