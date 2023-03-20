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
  </el-table>




</template>

<script>
export default {
  name: "userSc",

  data() {
    return {
      tableData: ''
    }
  },

  created() {
    let _list = this;
    var username = window.sessionStorage.getItem('username')
    axios.get("api/php/getStudentScoreByName.php?username=" + username).then(function (resp) {
      _list.tableData = resp.data;
    })
  },
}
</script>

<style scoped>

</style>