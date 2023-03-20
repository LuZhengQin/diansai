<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="学号" prop="user_id">
      <el-input v-model="form.user_id"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="学院" prop="college">
      <el-input v-model="form.college"></el-input>
    </el-form-item>
    <el-form-item label="班级" prop="class">
      <el-input v-model="form.class"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="description">
      <el-input v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="onExit">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "shenhe",
  created() {
    let _this = this;
    axios.get('api/login/admin/getUserById.php?user_id=' + this.$route.query.user_id).then(function (resp) {
      _this.form = resp.data;
    })
  },
  data() {
    return {
      form: {
        user_id: '',
        name: '',
        college: '',
        class: '',
        phone: '',
        email: '',
        description: ''
      }
    }
  },
  methods: {
    onSubmit() {
      let _this = this;
      console.log('submit!');
      axios.post('/api/php/shenhe.php', this.form).then(function (resp) {
        if (resp.status == 200) {
          _this.$alert('审核添加用户成功');
          _this.$router.push('/home');
        }
      })
    },
    onExit() {
      this.$router.push('/home');
    }
  }
}
</script>

<style scoped>

</style>