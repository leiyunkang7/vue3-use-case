import { ref, watch, nextTick, Ref } from 'vue'

export interface UseTableTransferParams<T> {
  rowKey: keyof T
  tableLeft: Ref<any>
  tableDataLeft: Ref<T[]>
  tableDataRight: Ref<T[]>
}

export interface UseTableTransferReturns<T> {
  sync: () => void
  handleSelectionChange: (val: T[]) => void
  handleSelect: (selection: T[], row: T) => Promise<void>
  handleSelectAll: (val: T[]) => void
  handleDelete: (row: T) => void
  handleDeleteAll: () => void
}

export default function useTableTransfer<T = Record<string, unknown>>({
  rowKey,
  tableLeft,
  tableDataLeft,
  tableDataRight
}: UseTableTransferParams<T>): UseTableTransferReturns<T> {
  const multipleSelection: Ref<T[]> = ref([])

  const isAddOrRemove = ref(true)

  function equal(row: T) {
    return (item: T) => item[rowKey] === row[rowKey]
  }

  watch(multipleSelection, (newVal, oldVal) => {
    isAddOrRemove.value = newVal.length > oldVal.length
  })

  function handleSelectionChange(val: T[]) {
    multipleSelection.value = val
  }

  async function handleSelect(selection: T[], row: T) {
    await nextTick()
    if (isAddOrRemove.value) {
      selectAdd(row)
    } else {
      selectRemove(row)
    }
  }

  async function handleSelectAll(selection: T[]) {
    const isAddOrRemove = selection.length !== 0

    if (isAddOrRemove) {
      selection.forEach((row) => selectAdd(row))
    } else {
      tableDataLeft.value.forEach((item) => selectRemove(item))
    }
  }

  function selectRemove(row: T) {
    const index = tableDataRight.value.findIndex(equal(row))
    index >= 0 && tableDataRight.value.splice(index, 1)
  }

  function selectAdd(row: T) {
    if (tableDataRight.value.length === 0) {
      tableDataRight.value.push(row)
    }

    const isExsit = tableDataRight.value.findIndex(equal(row)) >= 0

    if (!isExsit) {
      tableDataRight.value.push(row)
    }
  }

  function syncLeft(list: T[], addOrRemove: boolean) {
    list.forEach((item) => {
      const row = tableDataLeft.value.find(equal(item))
      row && tableLeft.value?.toggleRowSelection(row, addOrRemove)
    })
  }
  function handleDelete(row: T) {
    selectRemove(row)
    syncLeft([row], false)
  }

  function handleDeleteAll() {
    syncLeft(tableDataRight.value, false)
    tableDataRight.value = []
  }

  return {
    sync: () => syncLeft(tableDataRight.value, true),
    handleSelectionChange,
    handleSelect,
    handleSelectAll,
    handleDelete,
    handleDeleteAll
  }
}
