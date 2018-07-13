<template>
	<div class="imgback">

		<div class="jian" v-if="imgres" @click="deleteThis">
			<img src="../assets/images/jia.png" />
		</div>
		<div class="upImg">
			
			<img_up @res='res' type='banner' name='banner'></img_up>
			<i class="weui-loading"  v-if="!imgres"></i>
			<img src="../assets/images/back.png" class="back"  v-if="!imgres"/>
			<img :src="imgres" class="up" v-else/>
			
			
		</div>
	</div>
</template>
<script>
	import img_up from './Img_up'
	export default {
		props: {
			index:''
		},
		data() {
			return {
				imgres:''
			}
		},
		methods: {
			res(e){
				console.log(e)
				this.imgres=e.res
			},
			deleteThis(){
				this.imgres=''
			}
		},
		mounted() {

		},
		components: {
			img_up
		},
		watch: {
			imgres(e){
				this.$emit('res',{path:e,index:this.index,show:true})
			}
		},
		filters: {

		}

	}
</script>
<style lang='less'>
	.imgback{
		width: 0.6rem;
		height: 0.6rem;
		position: relative;
		
		.img-up{
			left: 0 !important;
			/*opacity: 0;*/
		}
		button{width: 0.6rem !important;height:0.6rem !important;position: absolute;left: 0;top: 0;border-radius: 5px;opacity: 0;}
		.jian{
			position: absolute;
			background: rgba(228, 122, 122, 0.8);
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			width: 0.25rem;
			height: 0.25rem;
			z-index: 5;
			right: -0.06rem;
			top:-0.06rem;
			img {
				width: 0.12rem;
			}
		}
		
	}
	
	.upImg {
		.weui-loading{
		z-index: 10;
	}
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 0.05rem;
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		.back {
			width: 100%;
			z-index: 0;
		}
		.up{
			width: 100%;
			z-index: 0;
		}
	}
</style>