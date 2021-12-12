<template>
  <el-container class="con">
      <el-container class="loginBox">
          
          <div v-if="registry==false" class="flexBox" align-items="center" direction="column" display="flex">
            <el-header z-depth=0 style="width: 100%;" title="登录">
              <el-button flat slot="right" @click="registry=!registry">注册</el-button>
            </el-header>
             <el-input v-model="username" placeholder="Please input" />
            <el-input v-model="password" placeholder="Please input password" show-password />
            <el-button color="red" @click="loginHandler">
               Login
          </el-button>
          </div>

          <div v-else class="flexBox"  align-items="center" direction="column" display="flex">
            <el-header z-depth=0 style="width: 100%;" title="注册">
              <el-button flat slot="right" @click="registry=!registry">登录</el-button>
            </el-header>
              <el-input v-model="username" placeholder="Please input" />
            <el-input v-model="password" placeholder="Please input password" show-password />
            <el-button color="indigo400" @click="registryHandler">
               Registry
          </el-button>
          </div>
    </el-container>

  </el-container>
</template>
<script>

import {login, registry,checklogin} from '../apis/type.js'
export default {
  async mounted(){
        const response = await checklogin();
        if(response.data.success==true){
          sessionStorage.setItem("userId",response.data.data.id);
          sessionStorage.setItem("userName",response.data.data.name);
          this.$toast.success("done");
          this.$router.push('/list');
        }
},
  data(){
    return{
      registry:false,
      userName:'',
      password:'',
      regName:'',
      regPassword:'',
      uid:0,
    }
  },
  methods:{
   resHandler(res,action){
     if(res.status==200){
       if(res.data.success==true){
         this.$toast.success(`${action}成功`);
         sessionStorage.setItem('userName',res.data.data.name);
         sessionStorage.setItem('userId',res.data.data.id);
         this.$parent.recalc =! this.$parent.recalc;
         this.$router.push("/list");
       }
     }else{
       this.$toast.error(res.status)
     }
     return;
   },
   async loginHandler(){
      if(this.GLOBAL.isEmpty(this.userName)){
         this.$toast.warning("username can't be empty");
          return;
       }
       if(this.GLOBAL.isEmpty(this.password)){
         this.$toast.warning("password can't be empty");
         return;
       }
       const response = await login(this.userName,this.password);
       this.resHandler(response,"登录")
   },
   async registryHandler(){
       const response = await registry(this.regName,this.regPassword);
       this.resHandler(response,"注册")
   }
  }
}
</script>
<style scoped>
  .con{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loginBox{
    width:50%;

  }
  .demo-paper{
    padding: 5%;
    height: 100%;
  }
  .flexBox{
    height: 100%;
  }

</style>