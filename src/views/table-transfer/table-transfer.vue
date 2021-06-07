<template>
  <h2>element-plus</h2>
  <div class="container">
    <div class="left">
      <el-table
        ref="multipleTableLeft"
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
          <i class="el-icon-delete" @click="handleDelete(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

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

const rowKey: keyof User = 'id'

const currentPage = ref(1)

const tableDataLeft = ref<User[]>([])

const multipleSelection = ref<User[]>([])

const isAddOrRemove = ref(true)

const tableDataRight = ref<User[]>([])

const multipleTableLeft = ref()

watch(multipleSelection, (newVal, oldVal) => {
  isAddOrRemove.value = newVal.length > oldVal.length
})

function handleSelectionChange(val: User[]) {
  multipleSelection.value = val
}

async function handleSelect(selection: User[], row: User) {
  await nextTick()
  if (isAddOrRemove.value) {
    selectAdd(row)
  } else {
    selectRemove(row)
  }
}

async function handleSelectAll(selection: User[]) {
  const isAddOrRemove = selection.length !== 0

  if (isAddOrRemove) {
    selection.forEach((row) => selectAdd(row))
  } else {
    tableDataLeft.value.forEach((item) => selectRemove(item))
  }
}

function selectRemove(row: User) {
  const index = tableDataRight.value.findIndex(({ id }) => id === row.id)
  index >= 0 && tableDataRight.value.splice(index, 1)
}

function selectAdd(row: User) {
  if (tableDataRight.value.length === 0) {
    tableDataRight.value.push(row)
  }

  const isExsit = tableDataRight.value.findIndex(({ id }) => row.id === id) >= 0

  if (!isExsit) {
    tableDataRight.value.push(row)
  }
}

function syncLeft(list: User[], addOrRemove: boolean) {
  list.forEach((item) => {
    const row = tableDataLeft.value.find(({ id }) => id === item.id)
    row && multipleTableLeft.value?.toggleRowSelection(row, addOrRemove)
  })
}
function handleDelete(row: User) {
  selectRemove(row)
  syncLeft([row], false)
}

function handleDeleteAll() {
  syncLeft(tableDataRight.value, false)
  tableDataRight.value = []
}

watch(
  currentPage,
  async (page) => {
    tableDataLeft.value = await getData(page)
    syncLeft(tableDataRight.value, true)
  },
  {
    immediate: true
  }
)
</script>

<style lang="less" scoped>
.container {
  display: flex;
  > div {
    flex: 1;
  }
}
</style>
