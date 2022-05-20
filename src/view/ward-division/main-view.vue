<template>
  <div>
    <a-card title="病区列表">
      <a-button
        class="mb-4"
        type="primary"
        @click="onAddClick"
      >新增病区</a-button>
      <a-table
        :dataSource="data"
        :columns="columns"
        :pagination="pagination"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
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
        address: `西区${index}栋`,
      })),
    };
  },
  methods: {
    onAddClick() {
      this.$ztools.dialog({
        componentProps: {
          title: '新增病区',
        },
        component: AddDialog,
      });
    },
    onDeleteClick() {
      Modal.confirm({
        title: '是否删除该病区?',
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
