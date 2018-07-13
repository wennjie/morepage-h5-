<template>
	<div class="lable" >
	<img src="../assets/images/yxz.png"/>
	</div>
</template>

<script>
	export default{
		props:{
			
		},
		data(){
			return{
				is : false
			}
		},
		mounted(){
			
		},
		methods:{

		},
		filters:{
			fa(e){
				if(e){
					return '已报名'
				}else{
					return '已选中'
				}
				
			}
		}
		
		
	}
</script>

<style lang="less">
	.lable{
		height: 0.2rem;
		display: flex;
		align-items: center;
		transform: rotate(-45deg);
		position: absolute;
		justify-content: center;
		z-index: 2;
		background: #09BB07;
		/*background:-webkit-gradient(linear, 0 0, 0 bottom, from(#ff0000), to(rgba(0, 0, 255, 0.5)));*/
		background: -webkit-linear-gradient(225deg, #8EC1A0, #C1E2CE); /* Safari 5.1 - 6.0 */
		  background: linear-gradient(225deg, #8EC1A0, #C1E2CE); /* 标准的语法 */
		width: 0.8rem;
		top: 0.08rem;
		left: -0.2rem;
		span{
			font-size:10px ;
			color: #FFFFFF;
			transform: scale(0.8);
		}
		&.is{
			background: #FFEF79;
		/*background:-webkit-gradient(linear, 0 0, 0 bottom, from(#ff0000), to(rgba(0, 0, 255, 0.5)));*/
		background: -webkit-linear-gradient(225deg, #F4DE37, #FFEF79); /* Safari 5.1 - 6.0 */
		  background: linear-gradient(225deg, #F4DE37, #FFEF79); /* 标准的语法 */
		}
		
	}
	
</style>