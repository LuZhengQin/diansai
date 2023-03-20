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
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
            size="mini"
            @click="handleReturn( scope.row)">返还
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'userBorrowInfo',

  created() {
    let _list = this;
    axios.get("api/php/getBorrowList.php").then(function (resp) {
      _list.tableData = resp.data;
    })
  },

  data() {
    return {
      tableData: ''
    }
  },

  methods: {
    handleReturn(row) {
      let _this = this;
      this.$confirm('此操作将返还该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get("api/php/returnDevice.php?borrowId=", + row.borrowid).then(function (resp) {
          if (resp.data.status == 200) {
            _this.$alert('返还成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: '已成功返还'
                });
              }
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消返还'
        });
      });
    }
  },
}
</script>