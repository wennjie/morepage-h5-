<template>
	<div class="ydpage" v-if="show=='true'&&inType=='farmers'">
		<div class="yd" @click="click">

			<img src="../assets/images/top.png" class="top" />

			<img src="../assets/images/button.png" class="botton" />

			<img src="../assets/images/btm.png" class="btm" />
			<img src="../assets/images/jt.png" class="jt" />
			<div class="add" @click="push('addOrder')">
				<div>
					<span>发布</span>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		props: {
			show: '',
			inType:''
		},
		methods: {
			click() {
				localStorage.setItem('first', false)
				this.$emit('first', false)
			},
			push(e){
				this.click()
				this.$router.push({path:e})
			}
		}

	}
</script>

<style lang="less">
	.ydpage {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.5);
		.add{
			position: absolute;
			width: 0.85rem;
			height: 0.85rem;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #fdfdfd;
			border-radius:50% ;
			box-shadow:0px -1px 3px 0px rgba(0,0,0,0.1) ;
			margin-left: -0.425rem;
			left:50%;
			bottom:0.02rem;
			z-index: 1;
		
			div{
				width: 0.7rem;
				height: 0.7rem;
				border-radius:50% ;
				background: #8ec1a0;
				display: flex;
				justify-content: center;
				align-items: center;
				span{
					color: #FFFFFF;
					font-size:0.13rem ;
					
				}
			}
		
		}
	}
	
	.yd {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		z-index: 2;
		overflow: hidden;
		/*filter: blur(5px);*/
		/*-webkit-filter: blur(5px);*/
		/* chrome, opera */
		/*-ms-filter: blur(5px);
		-moz-filter: blur(5px);*/
		display: flex;
		flex-direction: column;
		align-items: center;
		.top {
			width: 2.4rem;
			position: absolute;
			top: 0.4rem;
		}
		.botton {
			width: 1.05rem;
			position: absolute;
			top: 1.6rem;
		}
		.btm {
			width: 3rem;
			/*margin-top: 120px;*/
			position: absolute;
			bottom: 1.7rem;
		}
		.jt {
			width: 0.75rem;
			position: absolute;
			left: 0.7rem;
			bottom: 0.6rem;
		}
	}
</style>