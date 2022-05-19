<template>
  <div>
    <a-card>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane
          v-for="(item, index) in tabList"
          :key="index"
          :tab="item.tabTitle"
        >
          <div class="grid grid grid-cols-4 gap-y-4">
            <a-card
              class="w-[300px] h-[350px] border-[#243c5a]"
              v-for="data in dataList"
              :key="data.id"
            >
              <a-form>
                <a-form-item label="患者姓名"></a-form-item>
                <a-form-item label="患者年龄（岁）"></a-form-item>
                <a-form-item label="患者所在病区"></a-form-item>
                <a-form-item label="体温情况"></a-form-item>
                <a-form-item label="当前体温"></a-form-item>
              </a-form>
              <a-button type="primary">查看</a-button>
            </a-card>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const dataList = ref(new Array(5).fill('').map((item, index) => ({ id: index + 1 })));
    return {
      activeKey: ref(0),
      tabList: [
        {
          tabTitle: '异常患者体温',
        },
        {
          tabTitle: '正常患者体温',
        },
      ],
      dataList,
    };
  },

});
</script>
