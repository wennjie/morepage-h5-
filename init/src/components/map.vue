<template>
	<div class="map" style="width: 100%;">
		<div class="box">
			<div id="map" style="width: 100%;height: 2.3rem;">
			
			</div>
			<span class="iconfont icon-hongyuan-copy"></span>
			<div class="dw iconfont icon-weibiaoti-" @click='dw'></div>
		</div>
		<three :dz='dz' @dzchange='change'></three>
		<div class="three item"><i class="itemleft cc" style="width: 1rem;text-align: right;">详细地址<em>*</em>：</i>
			<input type="text" name="" id="" value="" v-model='address' placeholder="输入详细地址" v-uppercase='address'/>
			<!--<inputl v-model='address' placeholder="输入详细地址" inType='text'></inputl>-->
		</div>
	</div>
</template>
<script>
import three from './three'
  export default {
	props:{
		info:null
	},
  	data(){
  		return {
  			mapStyle:'width:100%,height:200px;',
  			dz:'',
  			address:''
  		}
  		
  	},
	methods:{
		init() {
			let map = new BMap.Map("map");  
			// 创建Map实例
			                
			map.enableScrollWheelZoom();                 //启用滚轮放大缩小
			let geolocation = new BMap.Geolocation();
			this.geolocation=geolocation
			let _this=this
			
			if(this.info!=null){
				////console.log('caogao')
				var point = new BMap.Point(this.info.lng,this.info.lat);
				map.centerAndZoom(point,15);
//				map.setCenter(new BMap.Point())
				
			}else{
				map.centerAndZoom('四川',15); 
				////console.log('xinjian')
				geolocation.getCurrentPosition(function(r){//定位
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
						map.panTo(r.point);
						_this.getAddressComponents(r.point)
					}
					else {
						alert('failed'+this.getStatus());
					}        
				},{enableHighAccuracy: true})
			}
			this.map=map
			this.addeventdragging()
		},
		addeventdragging(){
			let _this=this
			this.map.addEventListener('dragend',function(e){
				////console.log('tuod')
				let pt=this.getCenter()
				_this.getAddressComponents(pt)
			})
		},
		dw(){
			let _this=this
			this.geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					_this.map.panTo(r.point);
					_this.getAddressComponents(r.point)
				}
				else {
					alert('failed'+this.getStatus());
				}        
			},{enableHighAccuracy: true})
		},
		getAddressComponents(pt){//通过经纬点
			let _this=this
			let geoc = new BMap.Geocoder();	
				geoc.getLocation(pt, function(rs){
				let addComp = rs.addressComponents;
				_this.dz=addComp.province+' '+addComp.city+' '+addComp.district
				_this.province=addComp.province
				_this.city=addComp.city
				_this.district=addComp.district
				_this.address=addComp.street+addComp.streetNumber
				_this.point=pt
				_this.$emit('mapDz',{province:_this.province,address:_this.address,city:_this.city,district:_this.district,point:_this.point})
			});
		},
		change(e){//获取经纬点 //修改切换之后的城市切换
			this.map.setCenter(e)
			this.xxdz=''
			this.dz=e
			let _this=this
			_this.province=e.split(' ')[0]
			_this.city=e.split(' ')[1]
			_this.district=e.split(' ')[2]
			_this.address=''
			setTimeout(()=>{
				_this.point=_this.map.getCenter()

				_this.$emit('mapDz',{province:_this.province,address:_this.address,city:_this.city,district:_this.district,point:_this.point})
			},1000)
			
		}
	},
	mounted(){
		let _this=this
		setTimeout(()=>{
			if(_this.info!=null){
				_this.dz=_this.info.province+' '+_this.info.city+' '+_this.info.district
				_this.address=_this.info.address
				
				
				
			_this.province=_this.info.province
			_this.city=_this.info.city
			_this.district=_this.info.district
			_this.point={lng:_this.info.lng,lat:_this.info.lat}
//			_this.point.lat=
				
			}
		
			_this.init()
		},100)
		
	},
	components:{
	three
	},
	watch:{
		address(e){
			this.$emit('mapDz',{province:this.province,address:this.address,city:this.city,district:this.district,point:this.point})
		}
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
		font-size:12px ;
		.box{
			height: 2.3rem;
			display: flex;
			flex-direction: column;
			position: relative;
			span{
				position: absolute;
				width: 0.25rem;
				height: 25px;
				left: 50%;
				top: 50%;
				margin-left: -12.5px;
				margin-top: -12.5px;
				color: red;
			}
			.cc{
				width: 100px;
				display: block;
			}
			.dw{
				position: absolute;
				width: 30px;
				height: 30px;
				right: 20px;
				bottom: 15px;
				color: red;
			}
		}
		
		em{
			color: red;
			font-size:15px ;
			margin: 0 5px;
		}
		#map{
			position: absolute;
		}
		.three{
			width: 100%;
			/*margin-left: 20px;
			margin-top:5px ;*/
			input{
				width: 250px;
				border: none;
			}
		}
		i{
			margin: 14.5px 0;
		}
		.item{
			/*align-items: center;*/
		}
	}
</style>