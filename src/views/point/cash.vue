<template>
	<div class="point-cash">
		<div class="point-cash-con cl-fx">
			<div class="post-field-con">
				<div class="mt-field-con">
					<mt-field label="银行账号：" type="text" v-model="data.account"></mt-field>
				</div>
				<div class="mt-field-con">
					<mt-field label="姓名：" type="text" v-model="data.name"></mt-field>
				</div>
				<div class="mt-field-con">
					<mt-field label="提现金额：" type="text" v-model="data.cash"></mt-field>
				</div>
				<p class="cash-now">可提现金额：<span class="cash-num">200元</span></p>
			</div>
		</div>
		<div class="point-cash-btn">
			<mt-button size="large" type="primary" @click="">确定提现</mt-button>
		</div>
	</div>
</template>
<script>
	import { Progress, Indicator, Button, Field } from 'mint-ui';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'point-cash',
		data () {
			return {
				token: '',
				data: {
					account: '',
					name: '',
					cash: ''
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
				return false;
			});
		},
		methods: {
		},
		components: {
			[Progress.name]: Progress,
			[Indicator.name]: Indicator,
			[Field.name]: Field,
			[Button.name]: Button
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.point-cash {
		.post-field-con {
			padding: 0.2rem 0 1.2rem;
			background-image: url('../../assets/images/flow/bg.png');
			background-size: 90% auto;
			background-repeat: no-repeat;
			background-position: bottom center;
			.cash-now {
				margin-top: 0.12rem;
				font-size: $normal-text;
				color: $color-context-title;
				.cash-num {
					color: $color-orange;
				}
			}
			.mint-cell-title {
				width: 1rem;
				text-align: left;
			}
			.mint-cell-text {
				font-size: $result-text;
			}
			.mint-cell-wrapper {
				width: 90%;
				min-width: 2.4rem;
				margin: 0 auto;
				position: relative;
				overflow: hidden;
				padding: 0;
				background-image: none;
			}
			.mint-cell {
				background-image: none;
			}
			.mint-field-core {
				width: 100%;
				height: 0.35rem;
				padding: 0.1rem 0.2rem;
				line-height: 0.15rem;
				font-size: $input-text;
				background: $bg-gray;
			    -webkit-box-flex: none;
			    -ms-flex: none;
			    flex: none;
			    border-radius: 0.05rem;
			}
			.mint-field-other {
				.mint-button  {
					height: 0.35rem;
					line-height: 0.35rem;
					font-size: $input-text;
				}
			}
		}
		.point-cash-btn {
			.mint-button {
				border-radius: 0.2rem;
				width: 80%;
				margin: 0.4rem auto 0.2rem;
			}
		}
	}
</style>
