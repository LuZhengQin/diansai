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
            @click="handleInsert(scope.row)">选课
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'course',

  methods: {
    handleInsert(row) {
      let _this = this;
      this.$confirm('此操作将选择该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var username = window.sessionStorage.getItem('username');
        var formData = new FormData();
        formData.append('cosid',row.cosid);
        formData.append('username',username);
        axios.post("api/php/insertSc.php", formData).then(function (resp) {
          if (resp.data.status == 200) {
            _this.$alert('选课成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: '已成功选课'
                });
              }
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消选课'
        });
      });
    }
  },

  created() {
    let _list = this;
    axios.get("api/login/admin/getCourseList.php").then(function (resp) {
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