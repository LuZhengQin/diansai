<template>
  <el-table
      :data="tableData"
      style="width: 100%"
      max-height="250">
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
        prop="available_nums"
        label="库存"
        width="120">
    </el-table-column>
    <el-table-column
        prop="total_nums"
        label="总数"
        width="120">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'course',

  methods: {
    handleDelete(row) {
      let _this = this;
      this.$confirm('此操作将删除该设备信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get("api/login/admin/deleteDevice.php?deviceid=" + row.deviceid).then(function (resp) {
          if (resp.data.status == 200) {
            _this.$alert('删除成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: '已成功删除'
                });
              }
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },

  created() {
    let _list = this;
    axios.get("api/login/admin/getDeviceList.php").then(function (resp) {
      _list.tableData = resp.data;
    })
  },

  data() {
    return {
      tableData: ''
    }
  }
}
</script>