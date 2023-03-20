<template>
  <el-table
      :data="tableData"
      style="width: 100%"
      max-height="250">
    <el-table-column
        fixed
        prop="scid"
        label="选课序号"
        width="150">
    </el-table-column>
    <el-table-column
        fixed
        prop="cid"
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
        prop="stuname"
        label="姓名"
        width="120">
    </el-table-column>
    <el-table-column
        prop="sid"
        label="学号"
        width="120">
    </el-table-column>
    <el-table-column
        prop="score"
        label="课程分数"
        width="120">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
            size="mini"
            type="danger"
            @click="open(scope.row)">打分
        </el-button>
      </template>
    </el-table-column>
  </el-table>




</template>

<script>
export default {
  name: "scInfo",

  data() {
    return {
      tableData: ''
    }
  },

  created() {
    let _list = this;
    axios.get("api/php/getStudentScores.php").then(function (resp) {
      _list.tableData = resp.data;
    })
  },

  methods: {
    open(row) {
      this.$prompt('请输入分数', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        var formData = new FormData();
        formData.append('scid',row.scid);
        formData.append('score',value);
        axios.post('/api/php/updateScore.php', formData);
        this.$message({
          type: 'success',
          message: '你的打分是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }
  }
}
</script>

<style scoped>

</style>