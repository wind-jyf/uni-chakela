<template>
	<view class="list">
		<view class="header">
            <view class="tab">
                <p class="tab-select">选择课程</p>
                <p class="tab-center" @click="center">个人中心</p>
            </view>
            <view class="search">
                <van-search :value="search" placeholder="请输入课程名称" shape="round" 
                v-model="search"
                background="#52A08D" 
                @search.native="onSearch" 
                @change.native="changeSearch"
                use-left-icon-slot
                >
                <view slot="left-icon" @click.native="handleSearch"><van-icon name="search" style="margin-right:4upx" /></view>
                </van-search>
            </view>
        </view>
        <view class="middle">
            <view class="select">
                <ms-dropdown-menu>
                    <ms-dropdown-item v-model="value1" :list="classes" @input="changeClass">
                        <view slot="title">
                            <view class="dropdown-item-title">
                                <view class="title">课程类别</view>
                            </view>
                        </view>
                    </ms-dropdown-item>
                    <ms-dropdown-item v-model="value2" :list="time" @input="changeTime">
                        <view slot="title">
                            <view class="dropdown-item-title">
                                <view class="title">上课时间</view>
                            </view>
                        </view>
                    </ms-dropdown-item>
                    <ms-dropdown-item v-model="value3" :list="credit" @input="changeCredit">
                        <view slot="title">
                            <view class="dropdown-item-title">
                                <view class="title">学分</view>
                            </view>
                        </view>
                    </ms-dropdown-item>
                    <ms-dropdown-item v-model="value4" :list="check" @input="changeCheck">
                        <view slot="title">
                            <view class="dropdown-item-title">
                                <view class="title">考核方式</view>
                            </view>
                        </view>
                    </ms-dropdown-item>
                </ms-dropdown-menu>
                
                
            </view>
            <view class="classList" v-for="(item,index) in list" :key="index" @click.native="detail(item.courseId)">
                <view class="line1">
                    <p>{{item.name}}</p>
                    <span>{{item.type}}</span>
                </view>
                <view class="line2">
                    <span>{{item.teacher}}</span>
                </view> 
                <view class="line3">
                    <p>4.7分</p>
                    <span>{{item.credit}}</span>
                </view>
            </view>
            <uni-pagination v-show="total" title="标题文字" show-icon="true" :total="total" :current="current" @change="changePage"></uni-pagination>
        </view>
	</view>
</template>

<script>
import uniPagination from '../../components/uni-pagination/uni-pagination.vue'
import msDropdownMenu from '../../components/ms-dropdown/dropdown-menu.vue'
import msDropdownItem from '../../components/ms-dropdown/dropdown-item.vue'
import { getCourseList } from '../../network/api';
	export default {
		data() {
			return {
                page: 1,
                pageSize: 10,
                total:0,
                current:1,
                menu:['课程类别','上课时间','学分','考核方式'],
                list:[],
                search:'',
                classes:[
                    {text:'全部',value:''},
                    {text:'通识',value:'通识'},
                    {text:'专业选修',value:'专业选修'},
                    {text:'必修',value:'必修'}
                ],
                time:[
                    {text:'全部',value:''},
                    {text:'周一',value:'周一'},
                    {text:'周二',value:'周二'},
                    {text:'周三',value:'周三'},
                    {text:'周四',value:'周四'},
                    {text:'周五',value:'周五'},
                    {text:'周六',value:'周六'},
                    {text:'周日',value:'周日'}
                ],
                credit:[
                    {text:'全部',value:''},
                    {text:'1',value:'1'},
                    {text:'1.5',value:'1.5'},
                    {text:'2',value:'2'}
                ],
                check:[
                    {text:'全部',value:''},
                    {text:'考试',value:'考试'},
                    {text:'考察',value:'考察'}
                ],
                value1:'',
                value2:'',  
                value3:'',
                value4:'',
                listLoading:true
			}
		},
		onLoad() {
            uni.showLoading({
                title: '加载中'
            });
            let data = {
                pageSize:this.pageSize,
                pageNum:this.current
            }
            getCourseList(data).then(res=>{
                console.log(res);
                this.list = res.data.data.records;
                this.total = res.data.data.total;
                //this.list = this.list.slice(0,10);
                uni.hideLoading();
                //console.log(this.list.slice(0,10));
            })
		},
		methods: {
            getCourseList(data){
                uni.showLoading({
                    title: '加载中'
                });
                getCourseList(data).then(res=>{
                    this.list = res.data.data.records;
                    this.total = res.data.data.total;
                    uni.hideLoading();
                })
            },
            center(){
                uni.reLaunch({
                    url: '/pages/Center/Center'
                });
            },
            detail(id){
                uni.navigateTo({
                    url: `/pages/Detail1/Detail1?id=${id}`
                });
            }, 
            changeClass(value){
                this.value1 = value;
                console.log(value);
                let data = {
                    type:this.value1,
                    pageSize:this.pageSize,
                    pageNum:this.current
                };
                this.getCourseList(data);
            },
            changeTime(value){
                this.value2 = value;
                console.log(value);
                let data = {
                    time:this.value2,
                    pageSize:this.pageSize,
                    pageNum:this.current
                };
                this.getCourseList(data);
            },
            changeCredit(value){
                this.value3 = value;
                console.log(value);
                let data = {
                    credit:this.value3,
                    pageSize:this.pageSize,
                    pageNum:this.current
                };
                this.getCourseList(data);
            },
            changeCheck(value){
                this.value4 = value;
                console.log(value);
                let data = {
                    testType:this.value4,
                    pageSize:this.pageSize,
                    pageNum:this.current
                };
                this.getCourseList(data);
            },
            changeSearch(event){
                this.search = event.detail;
            },
            onSearch(event){
                console.log(event.detail);
                let data = {
                    name:event.detail,
                    pageSize:this.pageSize,
                    pageNum:this.current
                };
                this.getCourseList(data);
            },
            handleSearch(){ 
                console.log(this.search);
            },
            changePage(e){
                console.log(e.current);
                this.current = e.current;
                let data = {
                    pageSize:this.pageSize,
                    pageNum:this.current,
                    //name:this.search,
                    //type:this.value1,
                    //time:this.value2,
                    //credit:this.value3,
                    //testType:this.value4
                };
                this.getCourseList(data);
            }
        },
        components: {uniPagination,msDropdownMenu,msDropdownItem}
	}
</script>

<style>
	page{
        height: 100%;
    }
    .list{
        width: 100%;
        background: #52A08D;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 5upx;
    }
    .header{
        width: 80%;
    }
    .tab{
        display: flex;
        justify-content: space-between;
        margin-top: 15%;
    }
    .tab-select{
        font-size:40upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:300;
        color:rgba(255,255,255,1);
        line-height:40upx;
        border-bottom: 1px solid #FFFFFF;
    }
    .tab-center{
        font-size:40upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:300;
        color:rgba(211,231,226,1);
        line-height:50upx;
    }
    .search{
        margin-top: 8%;
        padding-bottom: 5%;
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
    }
    .middle .select{
        width: 100%;
        border-bottom: 1px solid #E0E0E0;
    }
    .classList{
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #E0E0E0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 10upx 0upx;
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
        justify-content: flex-end;
    }
    .classList .line3{
        width: 90%;
        display: flex;
        justify-content: space-between;
    }
    .classList .line3 p{
        font-size:28upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(21,20,20,1);
        line-height:40upx;
    }
    .uni-pagination{ 
        margin: 3% 0;
        width: 100%; 
    } 
    .uni-pagination__num{ left: auto !important; }
</style>
