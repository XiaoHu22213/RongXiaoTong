<template>
    <div class="register-box">
        <div class="register">
            <div class="header">
                <h1>银行管理注册</h1>
            </div>
            <div id="register_form">
                <div class="head">
                    <h1 @click="Register">返回<span class="arrow">&gt;</span></h1>
                </div>
                <div class="form-group">
                    <label for="bank">选择银行</label>
                    <select class="form-control" id="bank" name="bank" v-model="selectedBank">
                        <option value="">请选择银行</option>
                        <option value="1001">青岛银行</option>
                        <option value="1002">中国银行</option>
                        <option value="1004">中国工商银行</option>
                        <option value="1005">日照银行</option>
                        <option value="1006">华夏银行</option>
                        <option value="1007">中国建设银行</option>
                        <option value="1008">浦发银行</option>
                        <option value="1009">中国平安银行</option>
                        <option value="1010">中国民生银行</option>
                        <!-- 可以根据需要添加更多银行选项 -->
                    </select>
                </div>
                <div class="form-group">
                    <label for="username">用户名</label>
                    <input type="text" class="form-control" id="username" name="username" v-model="userName"
                        placeholder="请输入用户名" />
                </div>
                <div class="form-group">
                    <label for="nickname">昵称</label>
                    <input type="text" class="form-control" id="nickname" name="nickname" v-model="nickName"
                        placeholder="请输入昵称" />
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="password" class="form-control" id="password" name="password" v-model="password"
                        placeholder="请输入密码" />
                </div>
                <button class="btn btn-success btn-block" @click="registerBtn">
                    注册
                </button>
                <!-- <input type="submit" value="tijiao" /> -->
            </div>
            <div class="message">
                <p>已有账号? <router-link to="/login">点击登录</router-link>.</p>
            </div>
        </div>
    </div>
</template>

<script>
import { userRegister } from "../api/user";
export default {
    data() {
        return {
            userName: "",
            password: "",
            nickName: "",
            selectedBank: "",
        };
    },
    methods: {
        Register() {
            this.$router.push("/Register").catch((err) => err);
        },
        registerBtn() {
            if (this.userName == "") {
                alert("用户名不能为空");
                return;
            } else if (this.nickName == "") {
                alert("昵称不能为空");
            } else if (this.password == "") {
                alert("密码不能为空");
                return;
            } else if (this.selectedBank == "") {
                alert("银行不能为空");
            }
            else {
                userRegister({
                    userName: this.userName,
                    bankId: this.selectedBank,
                    password: this.password,
                    nickName: this.nickName,
                    avatar: "rongxiaotong.gif",
                })
                    .then((res) => {
                        if (res.flag == true) {
                            alert(res.message);
                            this.$store.commit("updateLoginUserNickname", this.nickName);
                            this.$router.push("/login").catch((err) => err);
                        } else {
                            alert(res.data);
                        }
                    })
                    .catch((err) => {
                        alert(err);
                    });
            }
        },
    },
    created() { },
};
</script>

<style lang="less" scoped>
@import url("../../node_modules/bootstrap/dist/css/bootstrap.css");

body {
    background-color: #f9f9f9;
}

.register-box {
    box-sizing: border-box;
    // width: 1897px;
    height: 800px;
    padding-top: 150px;
    background: url("../assets/img/rice.png");
    background-size: 1897px 920px;

    .register {
        width: 340px;
        margin: 0 auto;
        color: #333;

        .header {
            height: 40px;
            text-align: center;

            h1 {
                margin: 0;
                font-size: 26px;
                color: white;
            }
        }

        #register_form {
            padding: 20px;
            margin-bottom: 15px;
            border: 1px solid #d8dee2;
            border-radius: 5px;
            background-color: #fff;
        }

        .message {
            padding: 10px;
            padding-bottom: 0;
            color: white;
            border: 1px solid #d8dee2;
            border-radius: 5px;
            text-align: center;
        }

        .head {
            text-align: right;
            margin-bottom: 20px;
        }

        .head h1 {
            font-size: 13px;
            color: #333;
            margin: 0;
            display: inline-block;
            cursor: pointer;
            transition: color 0.3s;
        }

        .head h1:hover {
            color: #4CAF50;
            /* 绿色 */
        }

        .head .arrow {
            display: inline-block;
            margin-left: 5px;
            font-size: 18px;
        }

    }
}
</style>