<template>
	<div class="title vux-1px-b">
		<div>植保需求</div>
		<div @click="push" class="t-right">历史</div>
	</div>
</template>

<script>
	export default{

		data(){
			return{
				info:'按时间排序',
				farmers:true,
				list1:[['按距离排序','按时间排序' ]]
			}
		},
		mounted(){
			if(localStorage.getItem('inType')=='farmers'){
				this.farmers=true
				
			}else{
				this.farmers=false
			}
			
		},
		methods:{
			push(){
				router('./orderhistory.html')
			}
		}
	}
</script>

<style lang="less">
	.title{
		display: flex;
	/*	width: 100%;*/
		height: 0.44rem;
		align-items: center;
		padding: 0 0.2rem;
		background: #FFFFFF;
		div{
			flex: 1;
		}
		div.t-right{
			text-align: right;
			color: #8EC1A0;
		}
		.icons{
			margin-left: 0.1rem;
		}
		.t-left{
			text-align: left;
			position: relative;
		}
		.vux-cell-box{
			position: absolute;
			right: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
		}
	}
</style>