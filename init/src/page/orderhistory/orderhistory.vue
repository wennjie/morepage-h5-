<template>
	<div class="scroll page ">
		<wheader title="历史订单"/>
		<scroller :on-refresh="refresh" :on-infinite="infinite" class="mui-content">
			<!-- content goes here -->
			<items v-for='(n,index) in item' :key='index' :items='n'></items>
			<load-more :show-loading="showloding" :tip="loding(showloding)" background-color="#fbf9fe"></load-more>
		</scroller>
	</div>
</template>

<script>
	import items from '@/components/Items'
	import wheader from '@/components/Header'
	import { LoadMore } from 'vux'
	export default {
		components: {
			items,
			LoadMore,
			wheader
		},
		props: {

		},
		created() {
			//			var callback = function() {}
			//			if(this.inType == 'farmers') {
			//				this.DemandPublishHistory( 1, callback)
			//			} else {
			//				this.FlyTeamEnrollHistory( 1, callback)
			//			}
		},
		data() {
			return {
				item: [],
				showloding: false,
				inType: localStorage.getItem('inType'),
				event: 'up',
				page: 1
			}
		},
		methods: {
			loding(e) {
				if(e) {
					return '加载中'
				}
				return '暂无其余数据'
			},
			infinite(done) {
				this.event = 'down'
				if(this.inType == 'farmers') {
					this.DemandPublishHistory(this.page, callback)
				} else {
					this.FlyTeamEnrollHistory(this.page, callback)
				}

				function callback() {
					setTimeout(() => {

						done()
					}, 1000)
				}

			},
			refresh(done) {
				this.event = 'up'
				this.page = 1
				if(this.inType == 'farmers') {
					this.DemandPublishHistory(1, callback)
				} else {
					this.FlyTeamEnrollHistory(1, callback)
				}

				function callback() {

					setTimeout(() => {

						done()
					}, 1000)
				}

			},
			//飞防队报名历史
			FlyTeamEnrollHistory(page, callback) {
				this.$http.get(HTTPS + 'work/Public/demand/?service=Demand.FlyTeamEnrollHistory&token=' + JSON.parse(localStorage.getItem('user')).token + '&order[_id]=-1' + '&page=' + page, {
					timeout: 30000
				}).then((res) => {
					console.log(res)
					let ret = res.body
					let event = this.event
					if(ret.ret == 200) {

						if(page == 1) {
							this.item = ret.data.data
							this.page++
						} else {

							for(var i in ret.data.data) {
								this.item.push(ret.data.data[i])
							}
							if(ret.data.data.length == 0) {

							} else {
								this.page++
							}

						}
						callback()

					} else {
						mui.toast(resMsg(res.body.msg))
					}
				}, (err) => {
					mui.toast('网络连接失败')
				})
			},
			//农场主发布历史
			DemandPublishHistory(page, callback) {
				this.$http.get(HTTPS + 'work/Public/demand/?service=Demand.DemandPublishHistory&token=' + JSON.parse(localStorage.getItem('user')).token + '&order[_id]=-1' + '&page=' + page, {
					timeout: 30000
				}).then((res) => {
					console.log(res)
					let ret = res.body
					let event = this.event
					if(ret.ret == 200) {
						if(page == 1) {
							this.item = ret.data.data
							this.page++
						} else {

							for(var i in ret.data.data) {
								this.item.push(ret.data.data[i])
							}
							if(ret.data.data.length == 0) {

							} else {
								this.page++
							}

						}
						callback()
					} else {
						mui.toast(resMsg(res.body.msg))

					}
				}, (err) => {
					mui.toast('网络连接失败')
				})
			}
		}

	}
</script>

<style>

</style>