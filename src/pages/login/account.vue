<template>
    <div id="accounts">
        <el-form :model='login_model' ref="form">
            <el-form-item prop="account" :rules="rules" label="登录账号">
                <el-input v-model="login_model.account" placeholder="请输入手机号或者邮箱"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="isphoneDisabled" type="primary" v-on:click="checkValidate('phone')">{{phonemsg}}</el-button>
                <el-button :disabled="isemailDisabled" type="primary" v-on:click="checkValidate('email')">{{emailmsg}}</el-button>
            </el-form-item>
            <el-form-item label="动态密码">
                <el-input placeholder="请输入动态密码"></el-input>
                <el-button type="primary" id="btns" @click="goLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                login_model: {
                    account: ""
                },
                rules: [{
                        required: true,
                        message: "请输入账户信息"
                    }
                    //{ type: "email", message: "请输入正确的邮箱地址" }
                ],
                phonemsg: '使用手机获取动态密码',
                emailmsg: '使用邮箱获取密码',
                timer: null,
                isphoneDisabled: false,
                isemailDisabled: false
            }
        },
        methods: {
            count_down(type) {
                let start = 10;
                this.timer = setInterval(() => {
                    start--;
                    type == 'phone' ? (this.isphoneDisabled = true, this.phonemsg = start + 's后重新发送') : (this.isemailDisabled = true, this.emailmsg = start + 's后重新发送')
                    if (start <= 0) {
                        type == 'phone' ? this.phonemsg = '重新发送动态密码' : this.emailmsg = '重新发送动态密码'
                        clearInterval(this.timer)
                        type == 'phone' ? this.isphoneDisabled = false : this.isemailDisabled = false
                    }
                }, 1000)
            },
            goLogin() {
                sessionStorage.setItem('islogin', 1);
                this.$router.push('/home')
            },
            checkValidate(type) {
                if (this.rules.length > 1) {
                    this.rules.pop()
                }
                if (type == 'phone') {
                    this.rules.push({
                        validator: (rule, value, callback) => {
                            // console.log(callback)
                            if (/^1[3578]\d{9}$/.test(value)) {
                                callback()
                            } else {
                                callback(new Error('请输入正确的手机号'))
                            }
                        },
                        message: '请输入正确的手机号'
                    });
                } else if (type == 'email') {
                    this.rules.push({
                        type,
                        message: '请输入正确的邮箱'
                    });
                }
                this.$refs.form.validate((isValid, rules) => {
                    if (isValid) {
                        this.count_down(type)
                        //  this.$http.post('',{account:login_model.account}).then(res=>{
                        //      console.log(res)
                        //  })
                    }
                })
            }
        }
    };
</script>
<style scoped>
    .el-input {
        width: 70%;
        margin-left: 15%;
    }
    .el-form-item {
        line-height: 28px;
        margin-bottom: 5px;
        padding: 0 0 0;
    }
    .el-button {
        width: 100px;
        border-radius: 0;
        padding: 4px 5px;
        float: left;
        margin-top: 15px;
        margin-left: 10px;
    }
    label {
        padding: 0 0 0;
    }
    #btns {
        width: 75%;
        margin-top: 10px;
        margin-left: 32px;
        height: 30px;
    }
</style>


