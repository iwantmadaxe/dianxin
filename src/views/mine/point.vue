<template>
	<div class="my-point">
		<div class="my-point-con cl-fx">
			<img class="icon" src="../../assets/images/mine/point.png">
			<p class="name">Arthur-黎亚宇</p>
			<p class="num-p">200<span class="unit">分</span></p>
			<p class="detail" @click="goPointList">积分明细&nbsp;&nbsp;&gt;</p>
		</div>
		<div class="my-point-btn">
			<mt-button size="large" type="primary" @click="goExchange">积分兑换</mt-button>
		</div>
		<div class="my-point-btn bg-orange">
			<mt-button size="large" type="primary" @click="goCash">积分提现</mt-button>
		</div>
	</div>
</template>
<script>
	import { Progress, Indicator, Button } from 'mint-ui';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'my-point',
		data () {
			return {
				token: '',
				data: {
					total: '',
					used: '',
					remained: '',
					card_number: '',
					rate: 0
				}
			};
		},
		created () {
			document.body.style.backgroundColor = '#ffffff';
			Indicator.open('加载中...');
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			axios.get(apis.urls.userProfile)
			.then((response) => {
				Indicator.close();
			})
			.catch((error) => {
				Indicator.close();
				apis.errors.errorPublic(error.response, this);
			});
		},
		methods: {
			goExchange () {
				this.$router.push({name: 'PointExchange'});
			},
			goCash () {
				this.$router.push({name: 'WithdrawCash'});
			},
			goPointList () {
				this.$router.push({name: 'PointList'});
			}
		},
		components: {
			[Progress.name]: Progress,
			[Indicator.name]: Indicator,
			[Button.name]: Button
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.my-point  .my-point-btn .mint-button {
		border-radius: 0.2rem;
		width: 80%;
		margin: 0.3rem auto;
	}
	.my-point .bg-orange  .mint-button{
		background: $color-light-orange;
	}

	.my-point .my-point-con {
		.icon {
			width: 0.88rem;
			display: block;
			margin: 0.4rem auto 0.2rem;
		}
		.name {
			font-size: $normal-text;
			color: $color-text;
		}
		.num-p {
			font-size: 0.4rem;
			color: $color-orange;
			margin-top: 0.2rem;
			.unit {
				font-size: $result-text;
				color: $color-text;
				margin-left: 0.04rem;
			}
		}
		.detail {
			font-size: $normal-text;
			color: #0092e4;
			margin-top: 0.2rem;
			margin-bottom: 0.5rem;
		}
	}
</style>
