<template>
  <h2>element-plus</h2>
  <div class="container">
    <div class="left">
      <el-table
        ref="tableLeft"
        :data="tableDataLeft"
        tooltip-effect="dark"
        style="width: 45%"
        @selection-change="handleSelectionChange"
        @select="handleSelect"
        @select-all="handleSelectAll"
        :row-key="rowKey"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="日期" width="120">
          <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="20"
        :page-size="10"
        v-model:current-page="currentPage"
      >
      </el-pagination>
    </div>

    <el-table
      ref="multipleTableRight"
      :data="tableDataRight"
      tooltip-effect="dark"
      style="width: 45%"
      :row-key="rowKey"
    >
      <el-table-column label="日期" width="120">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column>
        <template #header>
          <i class="el-icon-delete" @click="handleDeleteAll()"></i>
        </template>
        <template #default="scope">
          <i class="el-icon-delete" @click="myHndleDelete(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useTableTransfer from './useTableTransfer'

function getData(page: number) {
  let index = 0
  const data: User[] = []
  while (index < 10) {
    const id = index + page * 10
    data.push({
      id,
      date: `2016-05-0${id}`,
      name: `王小虎${id}`,
      address: '上海市普陀区金沙江路 1518 弄'
    })
    index++
  }
  return Promise.resolve(data)
}

interface User {
  id: number
  date: string
  name: string
  address: string
}

const rowKey = 'id'

const currentPage = ref(1)

const tableDataLeft = ref<User[]>([])

const tableDataRight = ref<User[]>([])

const tableLeft = ref()

const {
  sync,
  handleSelectionChange,
  handleSelect,
  handleSelectAll,
  handleDelete,
  handleDeleteAll
} = useTableTransfer<User>({ rowKey, tableLeft, tableDataLeft, tableDataRight })

watch(
  currentPage,
  async (page) => {
    tableDataLeft.value = await getData(page)
    sync()
  },
  {
    immediate: true
  }
)

function myHndleDelete(row: User) {
  handleDelete(row)
  // 如果有特殊的业务逻辑再包一层
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  > div {
    flex: 1;
  }
}
</style>
