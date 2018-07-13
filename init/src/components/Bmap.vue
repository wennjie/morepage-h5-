<template>
	<div class="bmap">
		<div class="add-item vux-1px-b">
			<div>*</div>
			<div>{{name}}</div>
			<div @click="showPicker" class="active" style="padding-left:17px;">{{province}}-{{city}}-{{district}}</div>
			<div @click="show" style="display: flex;align-items: center;justify-content: flex-end;"> <img src="../assets/icons/selected.png" style="width: 0.15rem;" /></div>
		</div>
		<div class="add-item vux-1px-b" v-if='showstreet'>
			<div></div>
			<div>详细地址</div>
			<div><input type="text" v-model="street" placeholder="请输入详细地址" /></div>
		</div>
		<div class="bm-view-box">
			<div>
				<baidu-map class="bm-view" @ready='ready' :center='center' :zoom='zoom'>

					<!--<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>-->
				</baidu-map>
				<img src="http://file.skylinuav.com/r/mapPoint.png?imageView2/0/w/35/h/45" alt="" class="bm-img"  />
			</div>

		</div>
		<div>
			<x-address style="display:none;" title="title" v-model="value" :list="addressData" placeholder="请选择地址" :show.sync="showAddress"></x-address>
		</div>
	</div>
</template>

<script>
	import { XAddress, ChinaAddressV4Data, Value2nameFilter as value2name } from 'vux'
	export default {
		props: {
			name: ''
		},
		data() {
			return {
				center: '成都市',
				zoom: 12,
				showAddress: false,
				value: [],
				addressData: ChinaAddressV4Data,
				resData: {},
				street: '',
				obj: {},
				province: '',
				city: '',
				district: '',
				showstreet: false

			}
		},
		components: {
			XAddress
		},
		methods: {
			ready({
				BMap,
				map
			}) {
				this.BMap = BMap
				this.map = map
				this.geoc = new BMap.Geocoder();
				this.addMapEvenet()
			},
			show() {
				this.showstreet = this.showstreet == false ? true : false
			},
			addMapEvenet() {
				var _this = this
				this.map.addEventListener('zoomend', function() {
					_this.getCenter()
				})
				//拖拽监听
				this.map.addEventListener('dragend', function() {
					_this.getCenter()
				})
			},
			getCenter() {
				let center = this.map.getCenter()

				this.obj.center = center
				let _this = this
				//				this.$emit('res',)
				this.geoc.getLocation(center, function(rs) {
					var addComp = rs.addressComponents;
					//					console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
					_this.obj.province = addComp.province
					_this.obj.city = addComp.city
					_this.obj.district = addComp.district
					_this.province = addComp.province
					_this.city = addComp.city
					_this.district = addComp.district
					_this.obj.street = ''
					_this.resData = JSON.stringify(_this.obj)

				});
			},
			showPicker() {
				this.showAddress = true
			},
			setCenter() {

			},

		},
		watch: {
			value(e, a) {
				let name = value2name(e, ChinaAddressV4Data)
				this.map.setCenter(name)
				this.province = name.split(' ')[0]
				this.city = name.split(' ')[1]
				this.district = name.split(' ')[2]
				this.street = ''
				setTimeout(() => {
					this.getCenter()
				}, 500)
			},
			resData(e) {
				//				console.log(e)
				this.$emit('res', JSON.parse(e))
			},
			street(e) {
				this.obj.street = e
				this.resData = JSON.stringify(this.obj)
			}
		}
	}
</script>

<style lang="less">
	.bmap {
		#active {
			color: #000000;
		}
	}
	
	.addorder .add-item div:nth-child(3).active {
		color: #000000;
	}
	
	.bm-view {
		height: 0.83rem;
		position: relative;
	}
	
	.bm-view-box {
		padding-top: 0.09rem;
		padding-bottom: 0.43rem;
		margin: 0 0.24rem;
		position: relative;
	}
	.bm-img{
		width: 0.35rem;
		position: absolute;
		left: 45%;
		top: 20%;
	}
</style>