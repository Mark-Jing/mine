<template>
  <el-container class="con">
    <el-dialog title="Result" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
    完成typing 用时{{time}} 速度 {{wpm}}words per minutes
    <el-button slot="actions" flat color="primary" @click="$router.push('/list')">回到列表</el-button>
    <el-button slot="actions" flat color="primary" @click="restart">再试一次</el-button>
    </el-dialog>
    <el-header style="width: 100%;padding:2%;" >
      <h2>{{title}}</h2>
      <h2 slot="right"> 用时:{{time}}s  wpm:{{wpm}}</h2>
    </el-header>
    <div id="test">
      <span 
        class="letter"
        :class="index==letterindex?'typing':''"
        v-for="(char, letterindex) in model"
        :key ="letterindex"
        :style ="getcolor(letterindex)"
        >
        {{char === " "? "":char}} 
        <svg v-if="char == ' ' " t="1638556244999" class="space" :fill="correct[letterindex]!=undefined? getcolor(letterindex).color : '#eeeeee'" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2346" 
><path d="M170.666667 384v170.666667h682.666666V384h85.333334v213.333333a42.666667 42.666667 0 0 1-42.666667 42.666667H128a42.666667 42.666667 0 0 1-42.666667-42.666667V384h85.333334z" p-id="2347" ></path></svg>
      </span>
    </div>
   
  </el-container>
</template>
<script>
import {addrecord,getContent} from '../apis/type.js'
export default {
  mounted(){
    var that = this;
    that.passageId =this.$route.params.id;
    this.getContent(this.$route.params.id);
    document.addEventListener("keydown", this.input);
    setInterval(
      function(){
        if(that.start == false){
          return
        }else{
          that.time +=1;
        }
      },1000
    )
  },
  unmounted() {
    document.removeEventListener("keydown", this.input);
  },
  data(){
    return{
      openAlert:false,
      passageId:0,
      time:0,
      start:false,
      title:'title',
      correct:[],
      correctWord:[],
      index:0,
      model:"",
    }
  },
  methods:{
    input(event){
        if(this.index==this.maxn){
          this.start = false;
          this.$toast.success("done")
          document.removeEventListener("keydown",this.input);
          this.handleWpm();
          return;
        }
        const model =this.model;
        const correct = this.correct;
        if (event.key === "Backspace") {
          correct.pop();
          if(this.index>0){
            if(this.model[this.index]==" "){
              this.correctWord.pop();
            }
            this.index--;
          }
        } else if (event.key=="Enter") {
          correct.push("\n"==model[this.index]);
          this.index++;
        } else {
          this.start = true;
          correct.push(event.key==model[this.index]);
          this.index++;
          if(event.key==" ") {
            this.correctWord.push(true);
            for(let scan =this.index;this.model[scan]!=" ";scan--) {
              if(this.correct[scan]==false) {
                this.correctWord[this.correctWord.length-1]=false;
                break;
              }
            }
          }
        }
    },
    getcolor(index){
      const correct = this.correct;
      let color;
      if(correct[index]==undefined){
        color = 'gray'
      }else if(correct[index]==true){
        color = 'green'
      }else{
        color = 'red'
      }
      return {
        color:color
      }
    },
    async handleWpm(){
        const response= await addrecord(this.passageId,sessionStorage.getItem('userId'),this.wpm);
        if(response.data.success == true){
          this.$toast.success("done");
          this.openAlert = true;
        }
    },
    async getContent(id){
        const response =await getContent(id);
        this.title = response.data.data.title;  
        this.model = response.data.data.content;
    },
    restart(){
      this.start = false;
      this.time = 0;
      this.correct.splice(0,this.correct.length)
      this.correctWord.splice(0,this.correctWord.length);
      this.index = 0;
      document.addEventListener("keydown", this.input);
      this.openAlert =false;
    }
  },
  computed:{
      maxn(){
      return this.model.length;
    },
    linear(){
      return 100*this.index/this.maxn
    },
    wpm(){
      let count = this.correctWord.reduce((sum,item)=>{
        if(item==true){
          sum+=1;
        }
        return sum
      },0)
      return Math.round(10*60*count/(this.time))/10;
    }
  }
}
</script>
<style scoped>
  .letter {
    font-size: 20px;
    font-weight: 500;
  }
  .demo-paper{
    padding:3%;
    min-height: 500px;
  }
  .demo-linear-progress{
    margin:2%;
  }
  .space{
    height: 20px;
    width:20px;
    stroke: blue;
  }
  .correct{
      fill:currentColor;
      color:rgba(19, 250, 19, 0.986);
  }
  .incorrect{
    fill:currentColor;
    color:red;
  }
  .typing{
    background-color:#dce775;

  }
</style>