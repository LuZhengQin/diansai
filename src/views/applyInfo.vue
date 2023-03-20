<template>
  <el-table
      :data="tableData"
      border
      style="width: 100%">
    <el-table-column
        fixed
        prop="sid"
        label="学号"
        width="150">
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        width="120">
    </el-table-column>
    <el-table-column
        prop="college"
        label="设备号"
        width="120">
    </el-table-column>
    <el-table-column
        prop="class"
        label="设备名"
        width="120">
    </el-table-column>
    <el-table-column
        prop="phone"
        label="时间"
        width="300">
    </el-table-column>
    <el-table-column
        prop="email"
        label="库存"
        width="120">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
            size="mini"
            @click="handlePass( scope.row)">通过
        </el-button>
        <el-button
            size="mini"
            type="danger"
            @click="handleUnPass(scope.row)">不通过
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "applyInfo",

  methods: {
    handleUnPass(row) {
      let _this = this;
      this.$confirm('此操作将否决该申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get("api/login/admin/deleteApply.php?user_id=" + row.user_id).then(function (resp) {
          if (resp.data.status == 200) {
            _this.$alert('删除成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${action}`
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
    },
    handlePass(row) {
      let _this = this;
      this.$confirm('此操作将删除该报名学员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get("api/login/admin/deleteUser.php?user_id=" + row.user_id).then(function (resp) {
          if (resp.data.status == 200) {
            _this.$alert('删除成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${action}`
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
    axios.get("api/login/admin/getApplyList.php").then(function (resp) {
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

<style scoped>

</style>