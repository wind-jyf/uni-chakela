<template>
	<view class="login">
		<view class="img">
            <img src="../../static/logo.png" alt="logo">
        </view>
        <view class="loginForm">
            <input type="text" placeholder="请输入你的邮箱" class="text" v-model="mail"/>
            <input type="password" placeholder="请输入密码" class="password" v-model="password">
            <a>忘记了密码？</a>
        </view>
        <view class="line"></view>
        <button class="btn" @click="Login">登 陆</button>
        <view class="register">
            <p>还没有注册？</p>
            <a @click="register">注册</a>
        </view>
	</view>
</template>

<script>
    import {login} from '../../network/api';
	export default {
		data() {
			return {
                title: 'Login',
                mail:'',
                password:''
			}
		},
		onLoad() {

		},
		methods: {
            Login(){
                /*
                uni.showToast({
                    title: '账号或密码错误',
                    icon:'none'
                });
                */
               if(this.mail!='' && this.password!=''){
                   let data = {
                       mail:this.mail,
                       password:this.password
                    }
                    console.log(data);
                    /*
                        login(data).then(res=>{
                            console.log(res);
                        })
                        */
                    uni.reLaunch({
                            url: '/pages/List/List'
                        });
               }else{
                   uni.showToast({
                    title: '账号或密码不能为空',
                    icon:'none'
                });
               }
            }, 
            register(){
                uni.navigateTo({
                    url:'/pages/Register/Register'
                })
            }
		}
	}
</script>

<style>
page{
    height: 100%;
}
.login{
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
.loginForm{
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
.loginForm a{
    font-size:32upx;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:300;
    color:rgba(244,244,244,1);
    line-height:44upx;
    margin-top: 10upx;
}
.line{
    width: 100%;
    height: 1upx;
    border-bottom: 1upx solid #EBEBEB;
    margin-top: 120upx;
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
.register{
    margin-top: 60upx;
    display: flex;
}
.register p{
    font-size:28upx;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:300;
    color:rgba(255,255,255,1);
    line-height:28upx;
}
.register a{
    font-size:28upx;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:300;
    color:rgba(0,0,0,1);
    line-height:28upx;
    border-bottom: 1upx solid rgba(0,0,0,1);
    padding-bottom: 5upx;
}
</style>
