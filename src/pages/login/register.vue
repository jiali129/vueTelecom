<template>
  <div id="home">
    <div id="head">
      <img src="../../assets/images/a1.png" alt="">
    </div>
    <div id="content">
      <div id="verfication">
        <!-- @click="login_way='account'" -->
        <p id="headP">
          <span @click="tab_change('qrcode')" :class="active_change('qrcode')">二维码登录</span>
          <span @click="tab_change('account')" :class="active_change('account')">账号登录</span>
        </p>
        <div>
          <Component :is="login_way"></Component>
        </div>
      </div>
    </div>
    <div id="footer">
      <img src="../../assets/images/logins_03.png" alt="">
      <p class="title">
        <span>集团邮件系统</span> |
        <span>集团OA系统</span> |
        <span>集团BSS系统</span> |
        <span>集团官网</span> |
        <span>北京电信通官网</span>
      </p>
      <p class="foot">北京电信通电信工程有限公司 版权所有 2011-2111 技术支持：IT共享中心</p>
    </div>
  </div>
</template>
<script>
  import qrcode from './qrcode'
  import account from './account'
  export default {
    name: "Register",
    data() {
      return {
        login_way: "qrcode",
        active_class: "account"
      };
    },
    beforeRouteEnter(to, from, next) {
      //console.log('component')
      next()
    },
    components: {
      qrcode: qrcode,
      account
    },
    methods: {
      tab_change(str) {
        this.login_way = str
      },
      active_change(str) {
        return this.login_way === str ? 'active' : ''
      }
    }
  };
</script>
<style scoped>
  #home {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  #head {
    padding: 20px 0;
    height: 100px;
    box-sizing: border-box;
  }
  #head img {
    width: 35%;
    height: auto;
  }
  #content {
    position: relative;
    flex: 1;
    background: url(../../assets/images/a2.png);
    background-repeat: no-repeat;
  }
  #verfication {
    position: absolute;
    background: #fff;
    bottom: 20px;
    right: 100px;
    width: 240px;
    height: 70%;
    border-radius: 8px;
  }
  #headP {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0;
    margin: 0;
  }
  #headP>span {
    width: 49%;
    display: inline-block;
    text-align: center;
  }
  #footer {
    height: 150px;
    text-align: center;
  }
  #footer img {
    margin-top: 10px;
  }
  .title {
    display: inline-block;
  }
  .title span {
    color: #999;
  }
  .foot {
    margin-left: 70px;
  }
  .active {
    width: 50%;
    height: 40px;
    background: #ccc;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px
  }
</style>

