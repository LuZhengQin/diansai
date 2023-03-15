<template>
  <el-table
      :data="tableData"
      border
      style="width: 100%">
    <el-table-column
        fixed
        prop="user_id"
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
        label="学院"
        width="120">
    </el-table-column>
    <el-table-column
        prop="class"
        label="班级"
        width="120">
    </el-table-column>
    <el-table-column
        prop="phone"
        label="电话"
        width="300">
    </el-table-column>
    <el-table-column
        prop="email"
        label="邮箱"
        width="120">
    </el-table-column>
    <el-table-column
        prop="description"
        label="简介"
        width="120">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
            size="mini"
            @click="handleEdit( scope.row)">编辑
        </el-button>
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
  name: "baoming",

  methods: {
    handleEdit(row) {
      this.$router.push('/shenhe?user_id=' + row.user_id);
    },
    handleDelete(row) {
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
    axios.get("api/login/admin/getUserList.php").then(function (resp) {
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