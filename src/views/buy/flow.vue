<template>
	<div class="buy-flow">
		<div class="flow-field-con">
			<mt-field placeholder="输入卡号或选择一张卡" type="text" v-model="cardNo"></mt-field>
		</div>
		<div class="flow-list-con">
			<flow-square v-for="item in list" :item="item" :list="list"></flow-square>
		</div>
		<div class="flow-exp cl-fx">
			<p class="topic">订购流量说明</p>
			<p class="text">
				1:请选择一张订购流量的卡<br>
				2:使用前进行实名认证<br>
				3:激活前请提前充值，以免影响正常使用<br>
				4:到账15-30分钟，请耐心等待<br>
				5:有疑问请拨打客服热线：<span class="black-span">021-60163881</span><br>
			</p>
		</div>
		<div class="flow-list-btn">
			<mt-button size="large" type="primary" @click="postOrder">提交</mt-button>
		</div>
	</div>
</template>

<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { Navbar, TabItem, TabContainer, TabContainerItem, Indicator, Button, MessageBox, Field } from 'mint-ui';
	import { readLocal } from '../../utils/localstorage.js';
	import FlowSquare from '../../views/buy/flow-square.vue';

	export default {
		name: 'buy-flow',
		data () {
			return {
				token: '',
				list: [],
				cardNo: ''
			};
		},
		computed: {
			packageId: function () {
				let chooseId = null;
				this.list.map(function (item) {
					if (item.choose === true) {
						chooseId = item.id;
					}
					return item;
				});
				return chooseId;
			}
		},
		created () {
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			document.body.style.backgroundColor = '#ffffff';
			// 获取套餐列表
			this.fetchData();
		},
		beforeDestroy () {
			Indicator.close();
		},
		methods: {
			fetchData () {
				// 获取套餐列表
				Indicator.open('加载中...');
				this.loading = true;
				axios.get(apis.urls.flow)
				.then((response) => {
					Indicator.close();
					this.list = apis.pures.purePackageList(response.data.data);
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
				});
			},
			postOrder () {
				if (!this.packageId) {
					MessageBox.alert('请选择套餐！', '提示');
					return false;
				}
				axios.get(apis.urls.postOrder + '/' + this.packageId + '/card' + '/' + this.cardId + '/order', {params: {openid: this.openid}})
				.then((response) => {
					if (this.isWx) {
						this.jsSdkConfig = response.data;
						this.wxinit(this.jsSdkConfig);
						this.pay();
					}
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
				});
			}
		},
		directives: {
			// InfiniteScroll
		},
		components: {
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[TabContainer.name]: TabContainer,
			[TabContainerItem.name]: TabContainerItem,
			[Indicator.name]: Indicator,
			[Button.name]: Button,
			[FlowSquare.name]: FlowSquare,
			[MessageBox.name]: MessageBox,
			[Field.name]: Field
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.buy-flow {
		.flow-field-con {
			width: 100%;
			padding-left: 0.2rem;
			margin-bottom: 0.2rem;
			.mint-cell-wrapper {
				background-image: none;
			}
			.mint-field {
				background-image: none;
				border-bottom: 1px solid $color-gray;
			}
		}
		.flow-exp {
			text-align: left;
			width: 100%;
			padding: 0.2rem 0.2rem 0.6rem;
			line-height: 28px;
			background-image: url('../../assets/images/flow/bg.png');
			background-size: 90% auto;
			background-repeat: no-repeat;
			background-position: bottom center;
			.topic {
				color: $color-text;
			}
			.text {
				color: $color-context-title;
			}
			.black-span {
				color: $color-text;
			}
		}
		.flow-list-con {
			width: 100%;
			padding: 0 5% 20px;
			display: -webkit-box;
		    display: -webkit-flex;
		    display: -ms-flexbox;
		    display: flex;
		    justify-content: space-between;
			.flow-square {
				width: 48%;
			}
		}
	}
	.buy-flow .flow-list-btn .mint-button {
		border-radius: 0.2rem;
		width: 80%;
		margin: 0 auto 0.3rem;
	}
</style>
