<script>
	export default {
		onLaunch: function() {
			uni.checkSession({
                success:function(sucess){
					console.log(sucess);
					if(!uni.getStorageSync('token')){
						uni.reLaunch({
							url: '/pages/Login/Login'
						});
					}
                },
                fail:function(error){
                    uni.reLaunch({
						url: '/pages/Login/Login'
					});
                }
            })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
