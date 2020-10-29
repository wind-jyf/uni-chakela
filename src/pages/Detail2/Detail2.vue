<template>
	<view class="detail2">
		<view class="content">
            <view class="line1" v-show="course.name">
                    <p>{{course.name}} <span style="margin-left:8upx">{{course.teacher}}</span></p>
                    <span>第{{course.semester}}学期</span>
                </view>
                <view class="line2">
                    <p>签到</p>
                    <p>清醒</p>
                    <p>课程论文</p>
                </view>
                <view class="line-all" v-show="course.type">
                    <view class="line3">
                        <p>课程类别</p>
                        <p>{{course.type}}</p>
                    </view>
                    <view class="line4" v-show="course.credit">
                        <p>对应学分</p>
                        <p>{{course.credit}}</p>
                    </view>
                </view>
                <view class="rate-all">
                    <view class="rate">
                        <span>课程难度</span>
                        <van-rate readonly :value="course.difficultyScore" color="#52A08D" void-color="#DFDFDF"/>
                    </view>
                    <view class="rate">
                        <span>课堂气氛</span>
                        <van-rate readonly :value="course.atmosphereScore" color="#52A08D" void-color="#DFDFDF"/>
                    </view>
                    <view class="rate">
                        <span>综合评价</span>
                        <van-rate readonly :value="course.generalScore" color="#52A08D" void-color="#DFDFDF"/>
                    </view>
                </view>
        </view>
        <div class="img">
            <img src="../../static/plmm.png" alt="img">
        </div>
        <div class="button">
            <button @click="handleClick">添加评价与评分</button>
        </div>
	</view>
</template>

<script>
    import {getCourseDetail} from '../../network/api'
	export default {
		data() {
			return {
                title: 'Detaill2',
                id:'',
                course:{}
			}
		},
		onLoad(option) {
            this.id = option.id;
            let data = {id:this.id}
            this.getCourseDetail(data)
		},
		methods: {
            getCourseDetail(data){
                uni.showLoading({
                    title: '加载中'
                });
                getCourseDetail(data).then(res=>{
                    this.course = res.data.data;
                    uni.hideLoading();
                })
            },
            handleClick(){
                uni.navigateTo({
                    url: `/pages/Comments/Comments?id=${this.id}&className=${this.course.name}`
                });
            }
		}
	}
</script>

<style>
	page{
        height: 100%;
        background: #52A08D;
        font-family:PingFangSC-Regular,PingFang SC;
    }
    .detail2{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .content{
        margin-top: 100upx;
        width:80%;
        height:56%;
        background:rgba(255,255,255,1);
        box-shadow:0px 4upx 8upx 0px rgba(0,0,0,0.5);
        border-radius:28upx;
        opacity:0.96;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding-top: 25upx;
    }
    .line1{
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
    }
    .line1 p{
        font-size:45upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(82,160,141,1);
        line-height:74upx;
    }
    .line1 span{
        font-size:28upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(82,160,141,1);
        line-height:40upx;
    }
    .line2{
        margin-top: 20upx;
        width: 80%;
        display: flex;
        justify-content: space-around;
        padding:0 50upx;
        font-size: 30upx;
        color:rgba(82,160,141,1);
        font-weight:400;
    }
    .line-all{
        margin-top: 60upx;
        margin-bottom: 60upx;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 0 95upx;
        font-size: 30upx;
        color:rgba(0,0,0,1);
        font-weight:400;
    }
    .line3{
        display: flex;
        justify-content: space-between;
    }
    .line4{
        margin-top: 20upx;
        display: flex;
        justify-content: space-between;
    }
    .rate{
        margin-top: 20upx;
        display: flex;
        justify-content: space-around;
        font-size: 30upx;
        color:rgba(0,0,0,1);
        font-weight:400;
    }
    .img{
        margin-left: 70%;
        width: 200upx;
        height: 280upx;
    }
    img{
        width: 100%;
        height: 100%;
    }
    button{
        margin-top: -10upx;
        width:300upx;
        height:80upx;
        background:rgba(255,255,255,1);
        box-shadow:0px 4upx 8upx 0px rgba(0,0,0,0.5);
        border-radius:40upx;
        font-weight:400;
        font-size: 28upx;
        color:rgba(82,160,141,1);
        line-height:80upx;
    }
</style>
