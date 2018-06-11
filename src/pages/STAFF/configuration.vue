<template>
  <div>
    <div class="header">
      <span>首页</span>
    </div>
    <div class="content">
      <p>合同待办</p>
      <p>工程待办</p>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.header {
    height: 25px;
    background: #ccc;
    border-bottom: 1px solid #666;
}
.header > span {
    font-size: 14px;
    display: inline-block;
    line-height: 26px;
    margin-left: 3px;
    width: 40px;
    text-align: center;
    background: #fff;
    height: 26px;
}
.content {
    margin-top: 10px;
}
.content p {
    margin-left: 6px;
    height: 25px;
    background: #e9eef3;
    border: 1px solid #ccc;
}
</style>



