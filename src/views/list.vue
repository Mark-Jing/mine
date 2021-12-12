
<template>
  <el-container>
  <el-header style="width: 100%;" title="段落列表" class="title">
     <el-select label="难度" v-model="type" slot="right" style="transform:translateY(10px)" @change="difficultyHandler" >
        <el-option v-for="(option) in options" :key="option" :label="option" :value="option"></el-option>
      </el-select>
  </el-header>
    <div style="height:100%" justify-content="center" align-items="center"> 
      <h4>暂无文章</h4>
    </div>
  <div v-for="(passage,index) in passages"
  :key="index"
  :expand="panel === `panel${index}`" 
  @change="toggle(`panel${index}`)"
  >
    <div slot="header">{{passage.title}}
    </div>
    <el-button slot="action" flat color="primary" @click="PLAY(passage.id)">PLAY</el-button>
  </div>
  </el-container>

</template>
<script>
import {getList} from '../apis/type.js'
export default {
  async mounted(){
    var that = this;
      const response = await getList('all',1);
      const list = response.data.data.passages;
      that.total = response.data.data.total;
      list.map((item)=>{
        that.passages.push(item);
      })
  },
  data(){
    return{
      options:['all','easy','hard'],
      total:0,
      current:1,
      type:null,
      panel: '',  
      rando:100,
      passages:[ 
      ]
    }
  },
  methods:{
      toggle (panel) {
        this.panel = panel === this.panel ? '' : panel;
      },
async pageChangeHandler(){
          const response =await getList(this.type,this.current);
          if(response.data.success ==true){
            this.passages.splice(0,this.passages.length);
            const list = response.data.data.passages;
            this.total = response.data.data.total;
            list.map((item)=>{
            this.passages.push(item);
            })
          }
      },
      PLAY(id){
        this.$router.push(`/main/${id}`)
      },
      difficultyHandler(){
        this.current =1;
        this.pageChangeHandler();
      }
  },
  computed:{
     pageNum(){
        return Math.floor(this.total/6)+1;
      },
  }
}
</script>
<style scoped>
  .title{
    margin-top:25px;
  }
</style>

