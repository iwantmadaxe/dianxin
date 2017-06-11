<template>
	<div class="buy-post">
		<div class="buy-post-con cl-fx">
			<div class="context cl-fx">
				<div class="head-left cl-fx">
					<p class="detail cl-fx">
					<span class="text">20.00</span>
					<span class="unit">元</span><span class="area">全国</span></p>
					<p class="mark">免邮费</p>
				</div>
				<div class="head-right cl-fx">
					<k-number v-model:value="data.num"></k-number>
				</div>
			</div>
			<div class="post-field-con">
				<div class="mt-field-con">
					<mt-field label="收件人：" type="text" v-model="data.name"></mt-field>
				</div>
				<div class="mt-field-con">
					<mt-field label="手机号：" type="text" v-model="data.phone"></mt-field>
				</div>
				<div class="mt-field-con">
					<mt-field label="地址：" type="text" v-model="data.area"></mt-field>
				</div>
			</div>
		</div>
		<div class="buy-post-btn">
			<mt-button size="large" type="primary" @click="">立刻购买</mt-button>
		</div>
	</div>
</template>
<script>
	import { Progress, Indicator, Button, Field } from 'mint-ui';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { readLocal } from '../../utils/localstorage.js';
	import KNumber from '../../components/number/number.vue';

	export default {
		name: 'buy-post',
		data () {
			return {
				token: '',
				data: {
					name: '',
					phone: '',
					area: '',
					num: 1
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
			[Button.name]: Button,
			[KNumber.name]: KNumber
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.buy-post {
		.post-field-con {
			padding: 0.2rem 0 1.2rem;
			background-image: url('../../assets/images/flow/bg.png');
			background-size: 90% auto;
			background-repeat: no-repeat;
			background-position: bottom center;
			.mint-cell-title {
				width: 0.8rem;
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
		.buy-post-btn {
			.mint-button {
				border-radius: 0.2rem;
				width: 80%;
				margin: 0 auto 0.2rem;
			}
		}
		.context {
		    width: 95%;
		    margin: 0 0 0 5%;
		    height: auto;
		    padding-bottom: 0.1rem;
		    border-bottom: 1px solid #eee;
		    padding-right: 5.55%;
			.head-left {
				width: 50%;
				float: left;
				.detail {
					height: auto;
					line-height: 0.4rem;
					.text {
						text-align: left;
						font-size: $result-text;
						color: $color-black;
						display: block;
						float: left;
					}
					.unit {
						font-size: $huge-unit;
						display: block;
						float: left;
						margin-left: 0.04rem;
						color: $color-black;
					}
					.area {
						width: 0.4rem;
						height: 0.16rem;
						line-height: 0.16rem;
						border-radius: 0.04rem;
						background: $color-blue;
						color: $color-white;
						font-size: $normal-text;
						text-align: center;
						display: block;
						float: left;
						margin-top: 0.12rem;
						margin-left: 0.1rem;
					}
				}
				.mark {
					color: $color-context-title;
					font-size: $normal-text;
					text-align: left;
				}
			}
			.head-right {
				width: 50%;
				float: left;
				height: 100%;
				.k-number-panel {
					float: right;
					display: block;
					position: relative;
					margin-top: 0.12rem;
				}
			}
		}
	}
</style>
