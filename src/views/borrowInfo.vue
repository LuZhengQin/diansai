<template>
  <el-table
      :data="tableData"
      style="width: 100%"
      max-height="250">
    <el-table-column
        fixed
        prop="borrowId"
        label="序号"
        width="150">
    </el-table-column>
    <el-table-column
        fixed
        prop="deviceid"
        label="设备号"
        width="150">
    </el-table-column>
    <el-table-column
        fixed
        prop="devicename"
        label="设备名"
        width="150">
    </el-table-column>
    <el-table-column
        prop="borrowtime"
        label="借出时间"
        width="120">
    </el-table-column>
    <el-table-column
        prop="returntime"
        label="归还时间"
        width="120">
    </el-table-column>
    <el-table-column
        prop="flag"
        label="是否归还"
        width="120">
    </el-table-column>
    <el-table-column
        prop="flag"
        width="120"
        label="归还状态">
      <template slot-scope="{row}">
        <el-tag :type="row.flag | statusFilter">
          {{ row.flag | statusChinaFilter }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  name: 'borrowInfo',

  filters: {
    statusFilter(status) {
      const statusMap = {
        2: 'success',
        1: 'danger'
      }
      return statusMap[status]
    },
    statusChinaFilter(status) {
      const statusMap = {
        2: '已归还',
        1: '未归还'
      }
      return statusMap[status]
    }
  },
  methods: {

  },

  created() {
    let _list = this;
    axios.get("api/login/admin/getBorrowList.php").then(function (resp) {
      _list.tableData = resp.data;
      _list.flag = resp.data.flag;
    })
  },

  data() {
    return {
      tableData: '',
      flag: ''
    }
  }
}
</script>