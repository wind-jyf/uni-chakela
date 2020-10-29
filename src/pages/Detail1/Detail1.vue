<template>
	<view class="detail1">
		<view class="header">
            <view class="header-detail">
                <view class="line1" v-show="classDetail.name">
                    <p>{{classDetail.name}} <span>{{classDetail.teacher}}</span></p>
                    <span>第{{classDetail.semester}}学期</span>
                </view>
                <view class="line2">
                    <p>签到</p>
                    <p>清醒</p>
                    <p>课程论文</p>
                </view>
                <view class="line3" v-show="classDetail.difficultyScore">
                    <p>{{classDetail.difficultyScore}} 课程难度</p>
                    <p>{{classDetail.atmosphereScore}} 课堂气氛</p>
                    <p>{{classDetail.generalScore}} 综合评分</p>
                </view>
                <view class="tab">
                    <p @click="look">查看详情</p>
                    <p @click="comment">评论</p>
                </view>
            </view>
        </view>
        <view><img :src="base" ></view>
        <view class="middle">
            <p>{{CommentList.length}}条评论</p>
            <p>
                <span :class="{inactive:inactive}" @click="human">人气评论</span>
                <span class="inactive">|</span>
                <span :class="{inactive:!inactive}" @click="update">最新评论</span>
            </p>
        </view>
        <view class="comment" v-for="(item,index) in CommentList" :key="index">
            <view class="comment-line1">
                <view class="avator"><img :src="item.avatarUrl"></view>
                <view class="content">
                    <p>
                        <span>{{item.nickName}}</span> 
                        <span class="qingxing" style="color:#000000">清醒</span>
                    </p>
                    <p>{{item.content}}</p>
                </view>
            </view>
            <view class="comment-line2">
                <p style="color:#D3E7E2;font-size:24upx">发表于{{item.createTime}} <span style="color:#B8B8B8;margin-left:15upx">举报</span></p>
                <p><span class="iconfont icon-good" style="margin-right:8upx" :class="{active:goodactive[index]}" @click="handleGood(index,item.courseId)">{{item.totalLikeCount}}</span> <span class="iconfont icon-bad" :class="{active:badactive[index]}" @click="handleBad(index,item.courseId)">{{item.anonymous}}</span></p>
            </view>
        </view>
        <view class="button">
            <button @click="comment">添加评价与评分</button>
        </view>
	</view>
</template>

<script>
    import {getCourseDetail ,getAllComment ,getUserLikeComment ,getUserTotalDisLike ,addLike ,addDisLike ,deleteLike ,deleteDisLike ,getTotalLike ,getTotalDisLike,getCloude} from '../../network/api'
	export default {
		data() {
			return {
                title: 'Details',
                classId:'',
                classDetail:{},
                CommentList:[],
                inactive:true, //排序方式
                goodactive:[],//
                badactive:[],
                base:'data:image/png;base64,'
			}
		},
		onLoad(option) {
            console.log(option);
            this.classId = option.id;
            
            this.getCourseDetail({id:this.classId});
            this.getAllComment({courseId:this.classId});
            this.getUserLikeComment();
            this.getUserTotalDisLike();
            this.getCloude({courseId:this.classId});
		},
		methods: {
            look(){
                uni.navigateTo({
                    url: `/pages/Detail2/Detail2?id=${this.classId}&className=${this.classDetail.name}`
                });
            },
            comment(){
                uni.navigateTo({
                    url: `/pages/Comments/Comments?id=${this.classId}&className=${this.classDetail.name}`
                });
            },
            human(){//人气评价
                this.inactive = false;
            },
            update(){//最新评价
                this.inactive = true;
            },
            handleGood(index,id){
                this.$set(this.goodactive,index,!this.goodactive[index]);
                let data = {commentId:id}
                this.goodactive[index]?this.addLike(data,index):this.deleteLike(data,index);
            },
            addLike(data,index){
                addLike(data).then(res=>{
                    if(res.data.status == 200){
                        getTotalLike(data).then(res=>{
                            let obj = this.CommentList[index];
                            obj.totalLikeCount = res.data.data
                            this.$set(this.CommentList,index,obj);
                        })
                        uni.showToast({
                            title: '点赞成功',
                        });
                    }
                })
            },
            addDisLike(data,index){
                addDisLike(data).then(res=>{
                    if(res.data.status == 200){
                        getTotalDisLike(data).then(res=>{
                            let obj = this.CommentList[index];
                            obj.totalDisLikeCount = res.data.data
                            this.$set(this.CommentList,index,obj);
                        })
                        uni.showToast({
                            title: '点踩成功',
                        });
                    }
                })
            },
            deleteLike(data,index){
                deleteLike(data).then(res=>{
                    if(res.data.status == 200){
                        getTotalLike(data).then(res=>{
                            let obj = this.CommentList[index];
                            obj.totalLikeCount = res.data.data;
                            console.log(obj);
                            this.$set(this.CommentList,index,obj);
                        })
                        uni.showToast({
                            title: '取消点赞成功',
                        });
                    }
                })
            },
            deleteDisLike(data,index){
                deleteDisLike(data).then(res=>{
                    if(res.data.status == 200){
                        getTotalDisLike(data).then(res=>{
                            let obj = this.CommentList[index];
                            obj.totalDisLikeCount = res.data.data;
                            console.log(obj);
                            this.$set(this.CommentList,index,obj);
                        })
                        uni.showToast({
                            title: '取消点踩成功',
                        });
                    }
                })
            },
            handleBad(index,id){
                this.$set(this.badactive,index,!this.badactive[index]);
                let data = {commentId:id}
                this.badactive[index]?this.addDisLike(data,index):this.deleteDisLike(data,index);
            },
            getCourseDetail(data){
                uni.showLoading({
                    title: '加载中'
                });
                getCourseDetail(data).then(res=>{
                    this.classDetail = res.data.data;
                    uni.hideLoading();
                })
            },
            getAllComment(data){
                getAllComment(data).then(res=>{
                    uni.showLoading({
                        title: '加载中'
                    });
                    this.CommentList = res.data.data.records;
                    uni.hideLoading();
                    this.goodactive = new Array(res.data.data.length);
                    this.goodactive.fill(false);
                    this.badactive = new Array(res.data.data.length);
                    this.badactive.fill(false);
                })
            },
            getUserLikeComment(){
                getUserLikeComment().then(res=>{
                    //console.log(res.data);
                    res.data.data.forEach(like=>{
                        for(let i=0;i<this.CommentList.length;i++){
                            if(like.id == this.CommentList[i].id){
                                this.$set(this.goodactive,i,true);
                            }
                        }
                    })
                })
            },
            getUserTotalDisLike(){
                getUserTotalDisLike().then(res=>{
                    res.data.data.forEach(like=>{
                        for(let i=0;i<this.CommentList.length;i++){
                            if(like.id == this.CommentList[i].id){
                                this.$set(this.badactive,i,true);
                            }
                        }
                    })
                })
            },
            getCloude(data){
                getCloude(data).then(res=>{
                    let binary = '';
                    let bytes = new Uint8Array(res.data);
                    let len = bytes.length;
                    for(let i=0;i<len;i++){
                        binary+=String.fromCharCode(bytes[i]);
                    }
                    // console.log(binary);
                    console.log(uni.arrayBufferToBase64(bytes));
                    this.base+=uni.arrayBufferToBase64(bytes);
                })
            }
		}
	}
</script>
 
<style>
@import '../../static/iconfont/iconfont.css';
	page{
        height: 100%;
        font-family:PingFangSC-Regular,PingFang SC;
        background:#F0F2F5 ;
    }
    .detail1{
        width: 100%;
        height: 100%;
    }
    .header{
        width: 100%;
        height: 510upx;
        background: #52A08D;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .header-detail{
        height: 70%;
        width: 87%;
        background: #FFFFFF;
        border-radius: 28upx;
        box-shadow:0px 2px 4px 0px rgba(0,0,0,0.5);
        padding-top: 30upx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .line1{
        display: flex;
        justify-content: space-between;
        padding: 0 40upx;
    }
    .line1 p{
        font-size:40upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(82,160,141,1);
        line-height:70upx;
    }
    .line1 p span{
        margin-left: 10upx;
    }
    .line1 span{
        font-size:28upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(82,160,141,1);
        line-height:40upx;
    }
    .line2{
        display: flex;
        justify-content: space-between;
        padding: 0 60upx;
    }
    .line2 p {
        font-size:36upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(82,160,141,1);
        line-height:50upx;
    }
    .line3{
        display: flex;
        justify-content: space-between;
        padding: 0 60upx;
    }
    .line3 p{
        font-size:28upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(82,160,141,1);
        line-height:50upx;
    }
    .tab{
        display: flex;
        justify-content: space-between;
        padding: 0 80upx;
        margin-bottom: 15upx;
    }
    .tab p{
        font-size:32upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(82,160,141,1);
        line-height:44upx;
    }
    .middle{
        height: 90upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10upx;
        background: #F0F2F5;
        font-size: 28upx;
        color: #52A08D;
        border-bottom: 1px solid #E0E0E0;
    }
    .inactive{
        color: #C0C0C0;
    }
    .comment{
        background: #F0F2F5;
        border-bottom: 1px solid #E0E0E0;
        padding:15upx;
    }
    .comment-line1{
        display: flex;
        align-items: center;
        margin-bottom: 45upx;
    }
    .avator{
        width: 70upx;
        height: 70upx;
        border-radius: 50%;
        overflow: hidden;
        background: #979797;
        margin-left: 5upx;
    }
    .content{
        display: flex;
        flex-direction: column;
        margin-left: 5upx;
    }
    .content p{
        font-size:28upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:40upx;
    }
    .content p span{
        font-size:24upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(82,160,141,1);
        line-height:38upx;
    }
    .comment-line2{
        display: flex;
        justify-content: space-between;
    }
    .qingxing{
        margin-left: 200upx;
        text-decoration: underline;
        font-size:24upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        line-height:38upx;
    }
    .active{
        color: rgba(82,160,141,1);
    }
   
    button{
        position: fixed;
        bottom: 50upx;
        left: 30%;
        width:300upx;
        height:80upx;
        background:rgba(82,160,141,1);
        box-shadow:0upx 4upx 8upx 0upx rgba(0,0,0,0.5);
        border-radius:40upx;
        color:rgba(255,255,255,1);
        font-size:28upx;
        font-weight:400;
        line-height:80upx;
    }
</style>
