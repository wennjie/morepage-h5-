<template>

	<div id="map" style="width: 100%;height: 2.3rem;">
	
	</div>
</template>
<script>
  export default {
	props:{
		point:''
	},
  	data(){
  		return {
  		
  		}
  		
  	},
	methods:{
		init() {
			let map = new BMap.Map("map");  
			// 创建Map实例
			let pt=new BMap.Point(this.point.lng,this.point.lat)
			map.centerAndZoom(pt,15);                 
			map.enableScrollWheelZoom();       
//			//启用滚轮放大缩小

			let marker = new BMap.Marker(pt);  // 创建标注
//			marker.enableDragging()
			map.addOverlay(marker);
		}
	},
	mounted(){
		let _this=this
		setTimeout(()=>{
			_this.init()
		},100)
	},
	components:{

	},
	watch:{
	
	},
	filters:{
	
	}
 
  	
  }
  
</script>
<style lang='scss'>
	.anchorBL{
		display: none;	
	}
	.map{
		font-size:0.14rem ;
		.box{
			height: 2.3rem;
			display: flex;
			flex-direction: column;
			position: relative;
		}
		
		span{
			position: absolute;
			width: 0.25rem;
			height: 0.25rem;
			left: 50%;
			top: 50%;
			margin-left: -0.125rem;
			margin-top: -0.125rem;
			color: red;
		}
		#map{
			position: absolute;
		}
		.three{
			width: 100%;
			/*margin-left: 20px;
			margin-top:5px ;*/
		}
		.item{
			align-items: center;
		}
	}
</style>