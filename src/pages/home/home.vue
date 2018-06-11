<template>
  <el-container>
    <el-header style="height:50px">
      <span>北京电信通企业信息平台</span>
      <b class="time">时间+ {{this.time}}</b>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <dl>
          <dt>(*^▽^*)</dt>
          <dd>姓名</dd>
        </dl>
        <el-menu :default-openeds="['1']">
          <el-submenu index="1" v-for="(item,index) in menu" :index="index+'1'" :key="item.id">
            <template slot="title">{{item.name}}</template>
              <el-menu-item index="1-1" v-for="(j,idx) in item.submenus" :index ="index+1+'-'+idx+1" :key="j.id">
               <router-link :to="{name:j.type}">{{j.name}}</router-link>
                </el-menu-item>  
          </el-submenu>  
        </el-menu>
        </el-aside> 
      <el-main> 
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template >
<script>
import { mapState, mapActions } from "vuex";
//console.log(mapState(['menu']))
export default {
    data() {
        return {
            time: ""
        };
    },
    created() {
        let times = new Date();
        this.time = times;
    },
    computed: {
        ...mapState(["menu"])
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        }
    },
    mounted() {
        //dispatch流程
        this.$store.dispatch("fetchMenu");
    }
};
</script>
<style scoped>
a {
    text-decoration: none;
    color: #000;
}
.time {
    float: right;
}
.el-header {
    background: skyblue;
    line-height: 50px;
    color: #fff;
}
.el-header span {
    font-size: 18px;
}
.el-main {
    padding: 0;
}
</style>


