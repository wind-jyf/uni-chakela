<template>
	<view class="register">
		<view class="img">
            <img src="../../static/logo.png" alt="logo">
        </view>
        <view class="registerForm">
            <input type="text" placeholder="请输入你的注册邮箱" class="text" v-model="mail"/>
            <input type="text" placeholder="请输入你的真实姓名" class="text" v-model="username"/>
            <input type="password" placeholder="请输入密码" class="password" v-model="password"/>
        </view>
        <button class="btn" @click="handleToRegister">注 册</button>
	</view>
</template>

<script>
import {validateEmail} from "../../utils";
import {register} from "../../network/api";
	export default {
		data() {
			return {
                title: 'Register',
                mail:'',
                username:'',
                password:''
			}
		},
		onLoad() {

		},
		methods: {
            handleToRegister(){
                if(this.mail!='' && this.username!='' && this.password!=''){
                    if(validateEmail(this.mail)){
                        let data = {
                            mail:this.mail,
                            username:this.username,
                            password:this.password
                        }
                        console.log(data);
                        /**
                         register(data).then(res)=>{
                             console.log(res);
                         }
                         */
                        uni.showToast({
                            title: '注册成功，请返回进行登录'
                        });
                        /*
                        uni.redirectTo({
                            url: '/pages/Login/Login'
                        });
                        */
                    }else{
                        uni.showToast({
                        title: '邮箱格式不正确',
                        icon:'none'
                    });
                    }
                }else{
                        uni.showToast({
                        title: '邮箱或姓名或密码不能为空',
                        icon:'none'
                    });
                }
            }
		}
	}
</script>

<style>
page{
    height: 100%;
}
.register{
    width: 100%;
    height: 100%;
    background: #52A08D;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.img{
    margin-top: 15%;
    width: 478upx;
    height: 300upx;
}	
img{
    width: 100%;
    height: 100%;
}
.registerForm{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    margin-top: 40upx;
}
.text{
    width: 518upx;
    height: 100upx;
    background:rgba(255,255,255,1);
    border-radius:26upx;
    opacity:0.68;
    padding-left: 48upx;
    margin-top: 24upx;
}
.password{
    width: 518upx;
    height: 100upx;
    background:rgba(255,255,255,1);
    border-radius:26upx;
    opacity:0.68;
    padding-left: 48upx;
    margin-top: 24upx;
}
.btn{
    width:592upx;
    height:112upx;
    background:rgba(255,255,255,1);
    border-radius:22upx;
    margin-top: 80upx;
    color: #52A08D;
    font-size: 48upx;
}
</style>
