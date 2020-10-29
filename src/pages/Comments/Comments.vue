<template>
	<view class="comments">
		<view class="header">{{courseName}}</view>
        <view class="content">
            <view class="line1">
                <p>
                    <span>点名</span>
                    <span :class="{lineActive:line1Active[0]}" @click="handleLine1(0,'签到')">签到</span>
                    <span :class="{lineActive:line1Active[1]}" @click="handleLine1(1,'点名')">点名</span>
                    <span :class="{lineActive:line1Active[2]}" @click="handleLine1(2,'均不')">均不</span>
                </p>
                <p>
                    <span>考核</span>
                    <span :class="{lineActive:line2Active[0]}" @click="handleLine2(0,'课程论文')">课程论文</span>
                    <span :class="{lineActive:line2Active[1]}" @click="handleLine2(1,'考试')">考试</span>
                    <span :class="{lineActive:line2Active[2]}" @click="handleLine2(2,'其他')">其他</span>
                </p>
                <p>
                    <span>上课状态</span>
                    <span :class="{lineActive:line3Active[0]}" @click="handleLine3(0,'清醒')">清醒</span>
                    <span :class="{lineActive:line3Active[1]}" @click="handleLine3(1,'偶尔犯困')">偶尔犯困</span>
                    <span :class="{lineActive:line3Active[2]}" @click="handleLine3(2,'经常犯困')">经常犯困</span>
                </p>
            </view>
            <div class="rate">
                <p>
                    <span>课程难度</span>
                    <van-rate :value="value1" @change.native="onChange1" color="#52A08D" void-color="#DFDFDF" size="25"/>
                </p>
                <p>
                    <span>课程气氛</span>
                    <van-rate :value="value2" @change.native="onChange2" color="#52A08D" void-color="#DFDFDF" size="25"/>
                </p>
                <p>
                    <span>综合评价</span>
                    <van-rate :value="value3" @change.native="onChange3" color="#52A08D" void-color="#DFDFDF" size="25"/>
                </p>
            </div>
            <view class="form">
                <p>选择标签</p>
                <view class="select">
                    <span :class="{selectInacive:selectInacive[0],selectActive:!selectInacive[0]}" @click="handleSelect('没有意思',0)">没有意思</span>
                    <span :class="{selectInacive:selectInacive[1],selectActive:!selectInacive[1]}" @click="handleSelect('比较无聊',1)">比较无聊</span>
                    <span :class="{selectInacive:selectInacive[2],selectActive:!selectInacive[2]}" @click="handleSelect('不负责任',2)">不负责任</span>
                    <span :class="{selectInacive:selectInacive[3],selectActive:!selectInacive[3]}" @click="handleSelect('不太能懂',3)">不太能懂</span>
                </view>
                <view class="select">
                    <span :class="{selectInacive:selectInacive[4],selectActive:!selectInacive[4]}" @click="handleSelect('讲得很好',4)">讲得很好</span>
                    <span :class="{selectInacive:selectInacive[5],selectActive:!selectInacive[5]}" @click="handleSelect('没有逻辑',5)">没有逻辑</span>
                    <span :class="{selectInacive:selectInacive[6],selectActive:!selectInacive[6]}" @click="handleSelect('字很好看',6)">字很好看</span>
                    <span :class="{selectInacive:selectInacive[7],selectActive:!selectInacive[7]}" @click="handleSelect('给分很高',7)">给分很高</span>
                </view>
                <view class="text">
                    <van-field
                        :value="message"
                        @change.native="handleInput"
                        type="textarea"
                        placeholder="请输入对该课程和老师的评价"
                        :autosize="autosize"
                        :border="border"
                    />
                </view>
                <view class="anomouse">
                    <van-radio-group :value="radio" @change.native="anomouse">
                        <van-radio name="1" shape="square" checked-color="#52A08D">匿名提交</van-radio>
                    </van-radio-group>
                </view>
                <button @click="onSubmit">提交</button>
                
            </view>
        </view>
	</view>
</template>

<script>
    import {addComment} from '../../network/api'
	export default {
		data() {
			return {
                line1Active:[true,false,false],
                line1:'签到',
                line2Active:[true,false,false],
                line2:'课程论文',
                line3Active:[true,false,false],
                line3:'清醒',
                selectInacive:[true,true,true,true,true,true,true,true],
                selectContent:['没有意思','比较无聊','不负责任','不太能懂','讲得很好','没有逻辑','字很好看','给分很高'],
                content:"热爱劳动", 
                message:'',
                border:false,
                autosize:{
                    minHeight:80
                },
                value1:0,
                value2:0,
                value3:0,
                radio:0,
                courseId:'',
                courseName:''
			}
		},
		onLoad(option) {
            this.courseId = option.id; 
            this.courseName = option.className;
		}, 
		methods: {
            onChange1(event){
                this.value1 = event.detail;
            },
            onChange2(event){
                this.value2 = event.detail;
            },
            onChange3(event){
                this.value3 = event.detail;
            },
            anomouse(event){
                this.radio = this.radio=='1'? 0:event.detail;
            },
            
            handleLine1(index,label){
                this.line1Active = this.line1Active.map(item=>false);
                this.$set(this.line1Active,index,true);
                this.line1 = label
            },
            handleLine2(index,label){
                this.line2Active = this.line2Active.map(item=>false);
                this.$set(this.line2Active,index,true);
                this.line2 = label;
            },
            handleLine3(index,label){
                this.line3Active = this.line3Active.map(item=>false);
                this.$set(this.line3Active,index,true);
                this.line3 = label;
            },
            handleSelect(content,index){
                console.log(index);
                this.$set(this.selectInacive,index,!this.selectInacive[index]);
                if(!this.selectInacive[index]){
                    
                }
                let content1 = this.message + this.selectContent[index]
                this.message = content1;
                console.log(this.message)
            },
            handleInput(event){
                this.message = event.detail;
                console.log(this.message);
            },
            addComment(data){
                addComment(data).then(res=>{
                    if(res.data.status == 200){
                        uni.showToast({
                            title: '添加成功',
                        });
                    }
                })
            },
            onSubmit(){ //添加评价
                let tags = [this.line1,this.line2,this.line3];
                let data = {
                    anonymous:this.radio,
                    atmosphereScore:this.value2,
                    difficultyScore:this.value1,
                    generalScore:this.value3,
                    courseId:this.courseId,
                    content:this.message,
                    tags
                };
                this.addComment(data);
            }
		}
	}
</script>

<style>
	page{
        height: 100%;
        background: #F0F2F5;
        font-family:PingFangSC-Regular,PingFang SC;
        
    }
    .comments{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 30upx;
    }
    .header{
        width: 100%;
        height: 100upx;
        background: #52A08D;
        text-align: center;
        font-size: 45upx;
        font-weight:400;
        color:rgba(255,255,255,1);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .content{
        width: 80%;
        display: flex;
        flex-direction: column;
    }
    .line1{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
    }
    .lineActive{
        background:rgba(82,160,141,1);
        border: 10upx solid rgba(82,160,141,1);
        color: #FFFFFF;
    }
    .line1 p{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 40upx;
    }
    .line1 p span{
        font-size:26upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        line-height:40upx;
    }
    .line1 p span:first-child{
        font-size:34upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(1,1,1,1);
        line-height:50upx;
    }
    .rate{
        margin-top: 50upx;
        font-size: 36upx;
        line-height:50upx;
    }
    .rate p{
        margin-bottom: 15upx;
    }
    .rate p span:first-child{
        margin-right: 70upx;
    }
    .form{
        text-align: center;
    }
    .form p{
        font-weight:400;
        color:rgba(138,138,138,1);
        font-size: 24upx;
    }
    .select{
        display: flex;
        justify-content: space-between;
        margin-top: 20upx;
    }
    .selectInacive{
        background:rgba(216,216,216,1);
        border-radius:16upx;
        opacity:0.52;
        font-weight:400;
        font-size: 24upx;
        color:rgba(255,255,255,1);
        line-height:40upx;
        border: 8upx solid rgba(216,216,216,1);
    }
    .selectActive{
        background: #52A08D;
        border-radius:16upx;
        opacity:0.52;
        font-weight:400;
        font-size: 24upx;
        color:rgba(255,255,255,1);
        line-height:40upx;
        border: 8upx solid #52A08D;
    }
    .text{
        margin-top: 20upx;
    }
    button{
        width:300upx;
        height:80upx;
        line-height: 80upx;
        background:rgba(82,160,141,1);
        box-shadow:0px 4upx 8upx 0px rgba(0,0,0,0.5);
        border-radius:40upx;
        color:rgba(255,255,255,1);
        margin-top: 40upx;
    }
    .anomouse{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-top: 15upx;
    }

</style>
