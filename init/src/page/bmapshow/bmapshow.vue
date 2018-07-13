<template>
	<div class="bmap-show page">
		<wheader title="地址详情"/>
		<baidu-map class="bm-view mui-content" @ready='ready' :center='location' :zoom='zoom'>
			<bm-marker :position="location" :offset='{width: -32, height:-41}' :icon="{url: 'http://file.skylinuav.com/r/910/card/header/1516329320182?imageView2/0/w/65/h/83', size: {width: 65, height: 83}}"></bm-marker>
			<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
		</baidu-map>
		<!--<div>导航</div>-->

	</div>
</template>

<script>
import wheader from '@/components/Header'
	export default {
		props: {
			name: ''
		},
		components:{
			wheader
		},
		data() {
			return {
				zoom: 12,
				location: {},
				markerPoint: {}

			}
		},
		created() {
			let location = JSON.parse(localStorage.getItem('mapshow'))
			this.location.lat = location.latitude
			this.location.lng = location.longitude

		},
		mounted() {
			//			this.center
		},
		methods: {
			ready({
				BMap,
				map
			}) {
				this.BMap = BMap
				this.map = map
				//				map.setCenter('北京')
			}

		},
		watch: {

		}
	}
</script>

<style lang="less">
	.bmap-show {
		width: 100%;
		height: 100%;
		.bm-view {
			width: 100%;
			height: 100%;
			margin: 0;
			padding: 0;
		}
	}
</style>