<template>
  <div id="app">
  <!-- <el-container> -->
  <el-header style="width: 100%;" color="gray">
  <el-button v-if="this.$route.name!='login'" icon @click="open = !open" >
    =
  </el-button>
  Tenzor-Typer
  
  <el-button flat 
  >
          _{{userName}}
  </el-button>
  <el-button flat  v-if="this.$route.name!='login'"
  @click="openModUser =true">
        更改信息
  </el-button>
  <el-button flat 
  @click="logoutHandler">
        注销
  </el-button>
  </el-header>

  <el-drawer  :docked="docked" :right="false">
    <ul>
     <li><button @click="jumpHandler('list')">Type列表</button></li> 
      <li><button @click="jumpHandler('history')">个人Info</button></li>
      <li><button  @click="open = false">Close</button></li>
    </ul>
  </el-drawer>
  <el-button type="text" @click="dialogVisible = true"
    >modify identity</el-button
  >
  <el-dialog title="更改信息?" v-model="dialogVisible" width="400" max-width="40%" :esc-press-close="false" :overlay-close="false" :open.sync="openModUser">
    <el-input v-model="newname" placeholder="Please input" /><br/>
    <el-input v-model="newPwd" placeholder="Please input password" show-password />
    <el-button  flat color="primary" @click="openModUser=false">CANCEL</el-button>
    <el-button flat color="primary" @click="modUser">SUBMIT</el-button>
  </el-dialog>
  <router-view/>
  </div>
 <!-- </el-container> -->
</template>

<script>
import {logout,modUser} from './apis/type.js'
export default {
  data(){
    return{
      visibility:false,
      newname:'',
      newPwd:'',
      docked: false,
      open: false,
      openModUser:false,
      recalc:false,
    }
  },
  methods:{
   jumpHandler(tp){
      this.open =false;
      if(this.$route.name==tp){
        return;
      }
      this.$router.push(`/${tp}`)
    },
    async logoutHandler(){
          const response = await logout();
          if(response.status==200){
            if(response.data.success ==true){
              this.$toast.success("注销成功");
              this.$router.push('/login')
              this.recalc = !this.recalc
              sessionStorage.clear();
            }else{
              this.$toast.error(response.data.error); 
            }
          }else{
            this.$toast.error("注销失败"); 
          }
    },
    async modUser(){
      if(this.GLOBAL.isEmpty(this.userName)) {
         this.$toast.warning("用户名不能为空");
          return;
       }
       if(this.GLOBAL.isEmpty(this.password)){
         this.$toast.warning("密码不能为空");
         return;
       }
        const response =await modUser(sessionStorage.getItem('userId'),this.newname,this.newPwd);
        sessionStorage.setItem('userName',this.newname);
        this.recalc = !this.recalc
        if(response.data.success == true){
          this.$toast.success("修改成功");   

        }else{
          this.$$toast.error("修改失败")
        }
         this.openModUser =false;
    }
  },
  computed: {
    userName() {
        if(this.recalc) {
          return sessionStorage.getItem('userName')
          } else {
            return sessionStorage.getItem('userName')
        }
    }
  },
  setup() {
    const dialogVisible = ref(false)

    const handleClose = (done) => {
      ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
    }
    return {
      dialogVisible,
      handleClose,
    }
  },
}
</script>
<style>
*{
  margin: 0;
  padding:0;
  box-sizing: border-box;
}
body,html{
  width:100%;
  height: 100%;
}
#app {
  display: flex;
  flex-direction:column;
  height: 100%;
}
.app-content {
  flex: 1;
}
.menu-activator {
  vertical-align:center;
}
</style>
