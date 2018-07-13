<template>
	<div class="textareas textarea">
		<div class="t-info">{{name}}</div>
		<x-textarea :max="500" placeholder="请填写备注信息" v-model="value"></x-textarea>
	</div>
</template>

<script>
	import { XTextarea } from 'vux'
	export default {
		props:{
			name:''
		},
		components: {
			XTextarea
		},
		data() {
			return {
				value: ''
			}
		},
		watch: {
			value(e) {
				this.$emit('input', e)
			}
		}

	}
</script>

<style lang="less">
	.textareas {
		margin-top: 0.1rem;
		
		.weui-textarea-counter {
			width: auto;
			position: absolute;
			background: none;
			right: 0.3rem;
			bottom: 0.1rem;
			color: #D1D1D6;
		}
		.weui-cell:before {
			height: 0;
			border-top: none;
		}
		.t-info {
			padding-left: 0.24rem;
			font-size:0.16rem ;
			padding-top:0.18rem ;
		}
		.weui-cell {
			padding: 0.1rem 0.24rem;
			padding-top: 0.05rem;
		}
		.weui-cell__bd{
			border: 1px solid #999999;
			border-radius:0.05rem ;
		}
		textarea{
			height: 1.02rem;
			border-radius:0.05rem ;
			border: none;
			/*border:1px solid #999999 ;*/
			font-size:0.16rem ;
			/*border: none;*/
		}
		textarea::-webkit-input-placeholder {
			/* WebKit browsers */
			color: #D1D1D6;
		}
		textarea:-moz-placeholder {
			/* Mozilla Firefox 4 to 18 */
			color: #D1D1D6;
		}
		textarea::-moz-placeholder {
			/* Mozilla Firefox 19+ */
			color: #D1D1D6;
		}
		textarea::-ms-input-placeholder {
			/* Internet Explorer 10+ */
			color: #D1D1D6;
		}
	}
</style>