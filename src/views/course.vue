<template>
  <el-table
      :data="tableData"
      style="width: 100%"
      max-height="250">
    <el-table-column
        fixed
        prop="cosid"
        label="课程号"
        width="150">
    </el-table-column>
    <el-table-column
        fixed
        prop="cosname"
        label="课程名"
        width="150">
    </el-table-column>
    <el-table-column
        prop="coscredit"
        label="学分"
        width="120">
    </el-table-column>
    <el-table-column
        prop="cosintro"
        label="简介"
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
      this.$confirm('此操作将删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get("api/php/deleteCourse.php?cosid=" + row.cosid).then(function (resp) {
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
    axios.get("api/php/getCourseList.php").then(function (resp) {
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