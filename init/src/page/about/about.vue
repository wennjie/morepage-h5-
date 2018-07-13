<template>
	<div  style="width:100%;height:100%;position: absolute;font-size:0.2rem;color:#666666;display: flex;flex-direction: column;align-items: center;">
			<wheader title="关于"/>
			<div style="margin-top:1.73rem;">
				植保服务平台
			</div>
			<div style="margin-top:0.04rem">
				V1.0.0
			</div>
			<!-- <div style="position: absolute;bottom: 0.2rem;font-size:0.13rem;color:#999999;" @click="click">
				天麒科技 用户协议
			</div> -->
	</div>
</template>

<script>
import wheader from '@/components/Header'
 export	default{
	 components:{
		 wheader
	 },
 	methods: {
			click(){
				router('./agreement.html')
			}

		}
 }
</script>

<style>
</style>