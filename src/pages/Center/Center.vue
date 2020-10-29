<template>
	<view class="center">
		<view class="header">
            <view class="message">
                <view class="avator"><open-data type="userAvatarUrl"></open-data></view>
                <view class="name">
                    <p><open-data type="userNickName"></open-data></p>
                    <span>学生</span>
                </view>
            </view>
            <view class="tab">
                <p class="tab-select" @click="List">选择课程</p>
                <p class="tab-center">个人中心</p>
            </view>
        </view>
        <view class="middle">
            <view class="middle-tab">
                <p>我的评价 </p>
                <span @click="List">评价新课程</span>
            </view>
            <view class="line"></view>
            <view class="classList" v-for="(item,index) in list" :key="index" @click="detail(item.courseId)">
                <view class="line1">
                    <p>{{item.name}}</p>
                    <span>{{item.teacher}}</span> 
                </view>
                <view class="line2">
                    <span>{{item.content}}</span>
                </view>
                <view class="line3">
                    <p>{{item.score.toFixed(2)}}</p> 
                    <span><van-button type="danger" size="mini" plain @tap.stop="handleDelete(item.commentId)">删除</van-button></span>
                </view>
            </view>
        </view>
        <van-dialog id="van-dialog" />
	</view>
</template>

<script>
    import {getUserAllComment ,deleteComment} from '../../network/api'
    import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	export default {
		data() {
			return {
                title: 'Center',
                list:[]
			}
		},
		onLoad() {
            this.getUserAllComment();
		},
		methods: {
            List(){
                uni.reLaunch({
                    url: '/pages/List/List'
                });
            },
            detail(id){
                uni.navigateTo({
                    url: `/pages/Detail1/Detail1?id=${id}`
                });
            },
            handleDelete(id){
                Dialog.confirm({
                    title: '删除评价',
                    message: '您是否确定删除？',
                    })
                    .then(() => {
                        uni.showLoading({
                            title: '删除中'
                        });
                        deleteComment({id}).then(res=>{
                            if(res.data.status == 200){
                                uni.hideLoading();
                                uni.showToast({
                                    title: '删除成功',
                                });
                                this.getUserAllComment();
                            }
                        })
                    })
                    .catch(() => {
                        // on cancel
                    });
                
            },
            getUserAllComment(){
                uni.showLoading({
                    title: '加载中'
                });
                getUserAllComment().then(res=>{
                    this.list = res.data.data.records;
                    uni.hideLoading();
                    console.log(this.list);
                })
            }
		}
	}
</script>

<style>
	page{
        height: 100%;
    }
    .center{
        width: 100%;
        background: #52A08D;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .header{
        width: 80%;
    }
    .message{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 50upx;
    }
    .avator{
        width: 128upx;
        height: 128upx;
        border-radius: 50%;
        overflow: hidden;
        background: #979797;
    }
    .name{
        margin-left: 50upx;
        color: #FFFFFF;
        font-family:PingFangSC-Regular,PingFang SC;
    }
    .name p{
        font-size: 35upx;
    }
    .name span{
        font-size: 28upx;
    }
    .tab{
        display: flex;
        justify-content: space-between;
        margin-top: 50upx;
    }
    .tab-select{
        font-size:40upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:300;
        color:rgba(211,231,226,1);
        line-height:50upx;
    }
    .tab-center{
        font-size:40upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:300;
        color:rgba(255,255,255,1);
        line-height:40upx;
        border-bottom: 1px solid #FFFFFF;
    }
    .middle{
        width: 100%;
        height: 100%;
        background: #FFFFFF;
        border-top-left-radius: 60upx;
        border-top-right-radius: 60upx;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        margin-top: 50upx;
    }
    .middle-tab{
        width: 90%;
        height: 120upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 38upx;
    }
    .middle-tab p{
        font-size:40upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(82,160,141,1);
        line-height:50upx;
    }
    .middle-tab span{
        font-size:40upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(156,156,156,1);
        line-height:50upx;
    }
    .line{
        border-bottom: 1upx solid #E0E0E0;
        width: 100%;
        height: 1upx;
    }
    .classList{
        width: 100%;
        
        border-bottom: 1px solid #E0E0E0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 20upx 0;
    }
    .classList .line1{
        width: 90%;
        display: flex;
        justify-content: space-between;
    }
    .classList .line1 p{
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:59upx;
        font-size: 38upx;
        color: #52A08D;
    }
    .classList span{
        font-size:28upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:#000000;
        line-height:40upx;
    }
    .classList .line2{
        width: 90%;
        display: flex;
        justify-content: flex-start;
        margin-top: 8upx;
        margin-bottom: 8upx;
    }
    .classList .line3{
        font-size:28upx;
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 8upx;
    }
    .classList .line3 p{
        font-size:28upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(21,20,20,1);
        line-height:40upx;
    }
</style>
