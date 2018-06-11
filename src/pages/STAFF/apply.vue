<template>
    <div class='box'>
       <div v-for="(item,index) in dataArr" :key='index' class="smallB">
           <router-link :to="{name:item.type}">{{item.title}}</router-link>
           <p>{{item.content}}</p>
       </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    // :to里面的name名对应的是router里面的index里面对应的name名
    data(){
        return{
          dataArr:[
              {
                  type:'rename',
                  title:'发起更名流程工单',
                  content:'功能说明：发起梗米带你飞不但能'
              },
              {
                  type:'transfer',
                  title:'发起过户流程工单',
                  content:'功能说明：里面是过户工单发起和用户管理'
              },
              {
                  type:'maintain',
                  title:'工程维护单',
                  content:'功能说明：发起梗米带你飞不但能'
              },
              {
                  type:'else',
                  title:'其他类型工单',
                  content:'功能说明明：查询。发起其他类型的工单'
              }
          ]
        }
        
    }
}
</script>
<style>
  .box{
      width: 100%;
      height: 100%;
      margin:0;
      padding:0;
  }
  .smallB{
      width: 30%;
      height: 50%;
      display: inline-block;
      background: #ccc;
      margin-left: 10px;
      margin-top:10px;
  }
  a{
      text-decoration: none;
      font-size: 20px;
      color: #000;
  }
</style>


