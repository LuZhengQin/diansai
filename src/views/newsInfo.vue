<template>
  <el-table
      :data="tableData"
      border
      style="width: 100%">
    <el-table-column
        fixed
        prop="news_id"
        label="通知序号"
        width="150">
    </el-table-column>
    <el-table-column
        fixed
        prop="title"
        label="标题"
        width="150">
    </el-table-column>
    <el-table-column
        prop="time"
        label="时间"
        width="120">
    </el-table-column>
    <el-table-column
        prop="detail"
        label="内容"
        width="120">
    </el-table-column>
    <el-table-column
        prop="pig_src"
        label="图片"
        width="120">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
            size="mini"
            @click="dialogFormVisible = true">编辑
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
  name: "newsInfo",
  methods: {
    handleEdit(row) {
      this.$router.push('/shenhe?user_id=' + row.user_id);
    },
    handleDelete(row) {
      let _this = this;
      this.$confirm('此操作将删除该通知, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get("api/login/admin/deleteNews.php?news_id=" + row.news_id).then(function (resp) {
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
    axios.get("api/login/admin/getNewsList.php").then(function (resp) {
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