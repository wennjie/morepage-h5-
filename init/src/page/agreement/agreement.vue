<template>
<div>
	<wheader title="用户协议"/>
	<div v-html="msg" style="padding: 0.05rem 0; padding-left: 0.2rem;padding-right: 0.1rem; padding-top:60px;" class="mui-content">
		
	</div>
</div>
	
</template>

<script>
import wheader from '@/components/Header'
 export	default{
 	data(){
 		return{
 			msg:''		
 		}
	 },
	 components:{
		 wheader
	 },
 	mounted(){
 		this.UserProtocol()
 	},
 	methods: {
			UserProtocol() {
				this.$http.get(
					HTTPS + 'work/Public/demand/?service=Demand.UserProtocol&token=' + JSON.parse(localStorage.getItem('user')).token,{timeout:30000}).then((res) => {
					let ret = res.body
					if(ret.ret == 200) {
						this.msg = ret.data[0].content
					}else{
						mui.toast(mui.toastFiltr(ret.msg))
					}
				}, (err) => {
					mui.toast('网络连接失败')

				})
			}

		}
 }
</script>