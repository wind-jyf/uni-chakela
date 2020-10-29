<template>
	<view class="login">
		<view class="img">
            <img src="../../static/logo.png" alt="logo">
        </view>
        <view class="line"></view>
        <button class="btn" open-type="getUserInfo" @getuserinfo.native="onGetUserInfo">登陆/注册</button>
        <van-popup :show='show' @close="onClose" position="bottom" custom-style="height: 47%;">
            <view class="message">
                <view class="line1">
                    <view class="line-img">
                        <img src="../../static/smallLogo.png" alt="logo">
                    </view> 
                    <p>查课啦</p>
                    <span>申请</span>
                </view>
                <view style="font-size:32upx;margin-top:4%;font-weight:600;margin-bottom:4%">获取你的昵称、头像</view>
                <view class="line2">
                    <view class="line-img">
                        <open-data type="userAvatarUrl"></open-data>
                    </view>
                    <view class="line2-name">
                        <p><open-data type="userNickName"></open-data></p>
                        <span>微信个人信息</span>
                    </view>
                </view>
                <view class="line3">
                    <van-button type="default" size="normal" @click.native="onClose">取消</van-button>
                    <van-button type="primary" size="normal" @click.native="agree">允许</van-button>
                </view>
            </view>
        </van-popup>
	</view>
</template>

<script>
    import {login} from '../../network/api';
	export default {
		data() {
			return {
                title: 'Login',
                show:false,
                code:'',
                encrypteData:'',
                iv:'',
                rawData:'',
                signature:''
			}
		},
		onLoad() {
            
		},
		methods: {
            Login(){
                uni.login({
                    provider: 'weixin',
                    success:(loginRes) =>{
                        this.code=loginRes.code;//js_code可以给后台获取unionID或openID作为用户标识
                        console.log(this.code);
                        this.handleLogin(); 
                    } 
                });
            },
            onClose(){
                this.show = false;
            },
            agree(){
                uni.reLaunch({
                    url: '/pages/List/List'
                });
            },
            onGetUserInfo(e){
                console.log(e);
                let {encryptedData,iv,rawData,signature} = e.detail;
                this.encryptedData = encryptedData;
                this.iv = iv;
                this.rawData = rawData;
                this.signature = signature;
                this.Login(); 
                //this.handleLogin();
            },
            handleLogin(){
                let query = {
                    code:this.code, 
                    encrypteData:this.encryptedData,
                    iv:this.iv,
                    rawData:this.rawData,
                    signature:this.signature
                };
                uni.showLoading({ 
                    title: '登录中...'
                });
                console.log(query)
                login(query).then(res=>{
                    if(res.data.data.status == 200){
                        uni.setStorageSync('token', res.data.data.data);
                        uni.hideLoading();
                        uni.reLaunch({
                            url: '/pages/List/List'
                        });
                    }else{ 
                        uni.hideLoading();
                        uni.showToast({
                            title: '登录失败',
                            icon:'none'
                        });
                    }
                })
            }
        },
        onShow(){ 
            /*
            uni.login({
                    provider: 'weixin',
                    success: (loginRes)=> {
                        this.code=loginRes.code;//js_code可以给后台获取unionID或openID作为用户标识
                        console.log(this.code);
                    },
                    fail:function(error){
                        console.log(error);
                    }
                    });
                    */
            uni.checkSession({
                success:function(sucess){
                    console.log(sucess);
                },
                fail:function(error){
                    console.log(error);
                }
            })
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
.line-img{
    width: 100upx;
    height: 100upx;
}	
img{
    width: 100%;
    height: 100%;
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
    margin-top: 140upx;
    color: #52A08D;
    font-size: 42upx;
}
.message{
    display: flex;
    flex-direction: column;
    padding: 20upx;
}
.line1{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.line1 p{
    margin-left: 3%;
}
.line1 span{
    margin-left: 2%;
    font-weight: lighter;
    font-size: 26upx;
}
.line2{
    display: flex;
    align-items: center;
    padding: 2% 0;
    border-top: 1px  solid #cccccc;
    border-bottom: 1px  solid #cccccc;
}
.line2-name{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 3%;
}
.line-name p{
    margin-bottom: 2%;
}
.line2-name span{
    font-weight: lighter;
    font-size: 26upx;
    margin-top: 2%;
}
.line3{
    margin-top: 10%;
    display: flex;
    justify-content: center;
}
van-button{
    margin-right: 5%;
    margin-left: 5%;
}
</style>
