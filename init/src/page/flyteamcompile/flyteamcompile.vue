<template>
	<div class="page addorder history flyteamCompile">
		<wheader title="编辑信息"/>
		<div class="scroll mui-content">
			<!--<winput v-model='model'></winput>-->
			<div class="bx">
				<div class="add-item vux-1px-b" style="">
					<div>*</div>
					<div>名称</div>
					<div><input type="text" name="" id="" value="" v-model="flyteam.name" placeholder="请填写飞防队名称"  maxlength="8"/></div>
					<!--<div>V</div>-->
				</div>
			</div>
			<div class="bx ">
				<div class="add-item vux-1px-b">
					<div>*</div>
					<div>称呼</div>
					<div>
						<input type="text" name="" id="" value="" v-model="flyteam.uname" placeholder="请填写联系人称呼" maxlength="8"/>
					</div>
					<!--<div>V</div>-->
				</div>
			</div>
			<div class="bx margin">
				<div class="add-item ">
					<div>*</div>
					<div>手机</div>
					<div>
						<input type="tel" name="" id="" value="" v-model="flyteam.telphone" placeholder="请填写联系人手机号" />
					</div>
					<!--<div>V</div>-->
				</div>
			</div>

			<div class="bx ">

				<Bmap @res='bmapRes' name='驻地'></Bmap>
			</div>

			<!--<wtextarea v-model='flyteam.info' v-if='' name='简介' class='margin'></wtextarea>-->
			<div class="textareas textarea margin">
				<div class="t-info">简介</div>
				<x-textarea :max="500" placeholder="请填写备注信息" v-model="flyteam.info"></x-textarea>
			</div>
			<!-- <div class="bx pic">
				<div class="add-item vux-1px-b">
					<div></div>
					<div>图片</div>
				</div>
				<div class="imgs-boxs">

					<div v-for="(n,index) in items" :key='index' v-if='n.imgres!=""' class="imgs-boxs-b">
						<div class="imgback">

							<div class="jian" v-if="n.imgres!='_' && n.imgres!=''" @click="deleteThis(index)">
								<img src="../../../assets/images/jia.png" />
							</div>
							<div class="upImg">

								<img_up @res='res' type='banner' :name='index'></img_up>
			
								<img src="../../../assets/images/back.png" class="back" v-if="n.imgres=='_'" />
								<img :src="n.imgres" class="up" v-else/>
							</div>
						</div>
					</div>
				</div>
			</div> -->

		</div>
		<div class="button">
			<button class="bm" @click="CreateflyTeam">提交</button>
		</div>

	</div>
</template>

<script>
	import Bmap from '@/components/Bmap'
	// import img_up from '@/components/Img_up'
	import { XTextarea} from 'vux'
	import wheader from '@/components/Header'

	export default {

		components: {
			wheader,
			Bmap,
			XTextarea,
			// img_up,

		},
		beforeDestroy(){
			this.$vux.loading.hide()
		},
		data() {
			return {
				imgres: '',
				time: '',
				info: '',
				items: [{
					imgres: '_'
				}],

				flyteam: {
					name: '',
					uname: '',
					telphone: '',
					province: '',
					city: '',
					district: '',
					street: '',
					center: '',
					info: '',
					imgs: []
					

				}
			}
		},
		methods: {

			res(e) {
				if(this.items.length >= 5) {
					mui.toast('最多上传4张图片')
					return
				}
				this.items[e.index].imgres = e.res+'?imageView2/0/w/658/h/380'
				let arr = []
				for(var i in this.items) {
					if(this.items[i].imgres != '' && this.items[i].imgres != '_') {
						arr.push(this.items[i])
					}
				}
				this.items = arr
				this.items.push({
					imgres: '_'
				})

			},
			deleteThis(i) {
				let arr=[]
				this.items[i].imgres = ''
				
				for(var i in this.items) {
					if(this.items[i].imgres !='') {
						arr.push(this.items[i])
					}
				}
				this.items = arr

			},
			bmapRes(e) {
				console.log(e)
				this.flyteam.province = e.province
				this.flyteam.city = e.city
				this.flyteam.district = e.district
				this.flyteam.street = e.street
				this.flyteam.center = e.center
			},
			CreateflyTeam() {
				let flyteam=this.flyteam
				if(flyteam.name==''){
					mui.toast('请输入飞防队名称')
					return
				}
				if(flyteam.uname==''){
					mui.toast('请输入联系人称呼')
					return
				}
				if(flyteam.telphone==''){
					mui.toast('请输入联系人手机号码')
					return
				}
				if(flyteam.telphone.length!=11){
					mui.toast('请输入正确手机号')
					return
				}
				if(flyteam.province==''){
					mui.toast('请选择驻地')
					return
				}
				this.flyteam.imgs=this.items
				this.$http.post(
					HTTPS + 'work/Public/demand/?service=Demand.CreateflyTeam&token=' + JSON.parse(localStorage.getItem('user')).token, this.flyteam, {
						emulateJSON: true,
						timeout:30000
					}).then((res) => {

					if(res.body.ret == 200) {
						mui.toast('飞防队信息修改成功')
						update()
						mui.back()
					} else {
						mui.toast(resMsg(res.body.msg))
					}

				}, (err) => {
					mui.toast('网络连接失败')
				})
			},
			GetflyTeamById(teamid) {
				this.$http.get(HTTPS + 'work/Public/demand/?service=Demand.GetflyTeamById&token=' + JSON.parse(localStorage.getItem('user')).token + '&teamId=' + teamid,{timeout:30000}).then((res) => {
					if(res.body.ret == 200) {
						if(res.body.data.length == 0) return // 未编辑时 跳过拉去数据
						let ret = res.body.data[0]
						this.flyteam.center = ret.center
						this.flyteam.city = ret.city
						this.flyteam.district = ret.district
						this.flyteam.info = ret.info
						this.flyteam.name = ret.name
						this.flyteam.province = ret.province
						this.flyteam.street = ret.street
						this.flyteam.telphone = ret.telphone
						this.flyteam.uname = ret.uname
						this.items=ret.imgs
					} else {
						mui.toast(resMsg(res.body.msg))
					}

				}, (err) => {
					mui.toast('网络连接失败')
				})
			},
		},
		created() {
			this.GetflyTeamById(localStorage.getItem('fly_team_id'))
		},
		watch: {
			info(e) {
				//				console.log(e)
			}
		}
	}
</script>

<style lang="less">
	.flyteamCompile {
		.imgs-boxs {
			padding-top: 0.18rem;
			padding-left: 0.1rem;
			padding-bottom: 0.05rem;
			display: flex;
			overflow-x: scroll;
			-webkit-overflow-scrolling: touch;
		}
	}
	.imgs-boxs-b{
				margin-right: 0.1rem;
			}
	.imgback {
		width: 0.6rem;
		height: 0.6rem;
		position: relative;
		.img-up {
			left: 0 !important;
			/*opacity: 0;*/
			z-index:2;
			overflow: hidden;
		}
		button {
			width: 0.6rem !important;
			height: 0.6rem !important;
			position: absolute;
			left: 0;
			top: 0;
			border-radius: 0.05rem;
			opacity: 0;
		}
		.jian {
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
			top: -0.06rem;
			img {
				width: 0.12rem;
			}
		}
		.upImg {
			.weui-loading {
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
			
			.up {
				width: 100%;
				z-index: 0;
			}
			img{
				position:absolute;
				z-index:0;
			}
			.upload-demo{
				width: 100%;
				height: 100%;
				div{
				width: 100%;
				height: 100%;
				}
			}
		}
	}
</style>