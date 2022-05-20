<template>
  <div>
    <a-card title="患者列表">
      <a-button
        class="mb-4"
        type="primary"
        @click="onAddClick"
      >新增患者</a-button>
      <a-table
        :dataSource="data"
        :columns="columns"
        :pagination="pagination"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <a-button
              type="link"
              @click="onCheckClick"
            >查看</a-button>
            <a-button
              type="link"
              danger
              @click="onDeleteClick"
            >删除</a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue';
import AddDialog from './components/add-dialog.vue';
import CheckDialog from './components/check-dialog.vue';

export default {
  data() {
    return {
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total) => `共${total}条`,
      },
      columns: [
        {
          title: '患者姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '患者年龄（岁）',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '患者所在病区',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
        },
      ],

      data: new Array(5).fill('').map((item, index) => ({
        id: index + 1,
        name: `患者${index}`,
        age: index + 50,
      })),
    };
  },
  methods: {
    onAddClick() {
      this.$ztools.dialog({
        componentProps: {
          title: '新增患者',
        },
        component: AddDialog,
      });
    },
    onCheckClick() {
      this.$ztools.dialog({
        componentProps: {
          title: '患者详情',
        },
        component: CheckDialog,
      });
    },
    onDeleteClick() {
      Modal.confirm({
        title: '您是否删除该患者信息?',
        onOk() {
        },
        onCancel() {
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
