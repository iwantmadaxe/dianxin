<template>
	<div class="point-exchange">
		<div class="point-context">
			<img class="banner" src="../../assets/images/point/banner.png">
			<p class="title-p">流量兑换包</p>
			<div class="exchange-con">
				<exchange-square v-for="item in list" :item="item" :list="list"></exchange-square>
			</div>
			<p class="point-now">当前可用积分：<span class="point-num">500分</span></p>
		</div>
		<div class="exchange-btn">
			<mt-button size="large" type="primary" @click="postOrder">确定兑换</mt-button>
		</div>
	</div>
</template>

<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { Navbar, TabItem, TabContainer, TabContainerItem, Indicator, Button, MessageBox } from 'mint-ui';
	import { readLocal } from '../../utils/localstorage.js';
	import ExchangeSquare from '../../views/package/exchange-square.vue';

	export default {
		name: 'point-exchange',
		data () {
			return {
				token: '',
				list: [
					{
						name: '1G 当月流量',
						price: '240分',
						choose: false
					},
					{
						name: '3G 当月流量',
						price: '480分',
						choose: false
					}
				],
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
			// this.fetchData();
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
			[ExchangeSquare.name]: ExchangeSquare,
			[MessageBox.name]: MessageBox
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.point-exchange {
		.point-context {
			padding: 0.2rem 0 1.6rem;
			background-image: url('../../assets/images/flow/bg.png');
			background-size: 90% auto;
			background-repeat: no-repeat;
			background-position: bottom center;
			.banner {
				width: 100%;
				display: block;
			}
			.title-p {
				font-size: $navbar-title;
				color: $color-text;
				text-align: left;
				margin: 0.2rem auto 0.12rem;
				width: 90%;
			}
			.point-now {
				font-size: $normal-text;
				color: $color-context-title;
				text-align: left;
				margin: 0.1rem auto 0.12rem;
				width: 90%;
				.point-num {
					color: $color-orange;
				}
			}
			.exchange-con {
				width: 100%;
				padding: 0 5% 20px;
				display: -webkit-box;
			    display: -webkit-flex;
			    display: -ms-flexbox;
			    display: flex;
			    justify-content: space-between;
				.exchange-square {
					width: 45%;
				}
			}
		}
	}
	.point-exchange .exchange-btn .mint-button {
		border-radius: 0.2rem;
		width: 80%;
		margin: 0 auto 0.3rem;
	}
</style>
