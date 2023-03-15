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
        label="姓名"
        width="120">
    </el-table-column>
    <el-table-column
        prop="stuid"
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
            @click="dialogFormVisible = true">打分
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
    axios.get("api/login/admin/getStudentScores.php").then(function (resp) {
      _list.tableData = resp.data;
    })
  }
}
</script>

<style scoped>

</style>