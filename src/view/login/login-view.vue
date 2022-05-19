<template>
  <div class="login-view">
    <a-card
      title="物联网医院体温监测平台"
      class="login-card"
    >
      <a-form v-bind="layout">
        <a-form-item
          label="账号"
          :validateStatus="$et(v$.loginForm.account) ? 'error' : 'validating'"
          :help="$et(v$.loginForm.account)"
        >
          <a-input v-model:value="loginForm.account"></a-input>
        </a-form-item>
        <a-form-item
          label="密码"
          :validateStatus="$et(v$.loginForm.password) ? 'error' : 'validating'"
          :help="$et(v$.loginForm.password)"
        >
          <a-input-password
            v-model:value="loginForm.password"
            @keydown.enter="handleLogin"
          />
        </a-form-item>
        <div class="operation">
          <a-button
            :loading="loading"
            type="primary"
            @click="handleLogin"
          >登录</a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { message } from 'ant-design-vue';
import { mapActions } from 'vuex';
import { defineComponent } from 'vue';
import { removeToken } from '@/utils/local-store-token';

import errorHandler from '@/plugin/error-handler';

export default defineComponent({
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      layout: {
        labelCol: { span: 3 },
      },
      loginForm: {
        account: '',
        password: '',
      },
      loading: false,
    };
  },
  validations() {
    return {
      loginForm: {
        account: {
          accountRequired: required,
        },
        password: {
          passwordRequired: required,
        },
      },
    };
  },
  errors: {
    accountRequired: '账号不能为空',
    passwordRequired: '密码不能为空',
  },
  methods: {
    ...mapActions({
      Login: 'LOGIN',
    }),

    async handleLogin() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      try {
        this.loading = true;
        await this.Login(this.loginForm);
        message.success('登录成功');
        this.$router.push({
          path: '/',
        });
      } catch (error) {
        console.error(error);
        this.$store.commit('SET_TOKEN', '');
        errorHandler('登录失败', error);
        removeToken();
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style
  lang="scss"
  scoped
>
.login-view {
  height: calc(100vh - 52px);
  display: flex;
  align-items: center;

  .login-card {
    width: 350px;
    height: 300px;
    margin: auto;
  }

  .operation {
    text-align: center;
  }
}
</style>
