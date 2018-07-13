<template>
	<div>
		<div class="vux-demo">
			<img class="logo" src="../assets/images/vux_logo.png" @click="click">
			<h3> {{msg}}</h3>
			<h3>{{msgs}}</h3>
		</div>
		<group title="cell demo">
			<cell title="VUX" value="cool" is-link></cell>
		</group>
	</div>
</template>

<script>
	import { Group, Cell } from 'vux'

	export default {
		components: {
			Group,
			Cell
		},
		data() {
			return {
				// note: changing this line won't causes changes
				// with hot-reload because the reloaded component
				// preserves its current state and we are modifying
				// its initial state.
				msg: 'Hello World!',
				msgs: '123456'
			}
		},
		mounted() {
			var _this=this
			try {
				this.msg = location.search
				this.$http({
					method: 'get',
					url: 'https://devel.skylinuav.com/work/Public/'+this.msg
				}).then((res) => {
					this.msgs = JSON.stringify(res)
					console.log(res)
				}, (err) => {
					this.msgs = JSON.stringify(err)
					console.log(err)
				})
			} catch(e) {
				alert(JSON.stringify(e))
				console.log('cuow ')
			}
		},
		methods: {
			click() {
				this.$router.push({
					path: '/addOrder'
				})
			}
		}
	}
</script>

<style>
	.vux-demo {
		text-align: center;
	}
	
	.logo {
		width: 100px;
		height: 100px
	}
</style>