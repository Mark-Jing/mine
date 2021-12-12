<template>
  <el-container style="height:100%;">
    <el-table :data="list" style="width: 100%"
    :loading="true"
    :sort.sync="sort" 
     @sort-change="handleSortChange" 
    >
    <template slot="expand" slot-scope="prop">
          
          
          <el-row>
    <el-col :span="12"><div class="grid-content bg-purple"><span>PASSAGEID:{{prop.row.passageId}}</span></div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light"><el-button @click="delrecord(prop.row.id)" flat slot="right">清除</el-button></div></el-col>
  </el-row>
      </template>
      <template slot-scope="scope"> 
        <td class="is-center">{{scope.row.title}}</td>
        <td class="is-center">{{scope.row.wpm}}</td>
      </template>
    </el-table>
</el-container>
</template>

<script>
import {getContent,getrecord,delrecord} from '../apis/type.js'
export default {
  mounted(){
    this.getrecord();
  },
  data () {
    return {
      sort: {
        name: '',
        order: 'asc'
      },
      columns: [
          { title: 'TITLE',  name: 'name',align: 'center' },
          { title: 'best(wpm)', name: 'wpm', align: 'center', sortable: true },
      ],
      list: [
          {
            name: 'none',
            wpm: 0,
          }
          
      ]
    };
  },
  methods: {
    handleSortChange ({name, order}) {
      this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
    },
    async getrecord(){
      const response = await getrecord(sessionStorage.getItem('userId'),1);
      this.list.splice(0,this.list.length);
      response.data.data.records.map((item)=>{
        this.list.push(item)
      })  
      this.list.map(async (item)=>{
          const response = await getContent(item.passageId);
          this.$set(item,'title',response.data.data.title);
      })
    },
    async delrecord(id){
        const response = await delrecord(id);
        if(response.data.success==true ){
          this.$toast.error("err")
          this.list.map((item,index)=>{
            if(item.id == id){
              this.list.splice(index,1)
            }
          })
        }
        else{
          this.$toast.success("none")
        }
    }
  }
};
</script>