<template>
	<div class="buy-post">
		<div class="buy-post-con cl-fx">
			<div class="context cl-fx">
				<div class="head-left cl-fx">
					<p class="detail cl-fx">
					<span class="text">{{card.price}}</span>
					<span class="unit">元</span><span class="area">全国</span></p>
					<p class="mark">免邮费</p>
				</div>
				<div class="head-right cl-fx">
					<k-number v-model:value="data.num" :min="1" :max="5"></k-number>
				</div>
			</div>
			<div class="post-field-con">
				<div class="mt-field-con">
					<p class="topic">收货人：&nbsp;&nbsp;{{data.name?data.name:'暂无'}}</p>
				</div>
				<div class="mt-field-con">
					<p class="topic">联系方式：&nbsp;&nbsp;{{data.phone?data.phone:'暂无'}}</p>
				</div>
				<div class="mt-field-con">
					<p class="topic">选择地址：&nbsp;&nbsp;{{data.address?data.address:'暂无'}}</p>
				</div>
				<div class="mt-field-con">
					<div class="no-more" v-show="addressList.length === 0">
						暂无收货地址
					</div>
				</div>
				<div class="mt-field-con">
					<span class="add-address" @click="goChooseAddress">选择收货地址</span>
				</div>
			</div>
		</div>
		<div class="buy-post-btn">
			<mt-button size="large" type="primary" @click="buyCard">立刻购买</mt-button>
		</div>
	</div>
</template>
<script>
	import { Progress, Indicator, Button, Field, MessageBox } from 'mint-ui';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { readLocal } from '../../utils/localstorage.js';
	import KNumber from '../../components/number/number.vue';
	import wx from 'weixin-js-sdk';
	import { getCookie } from '../../utils/cookie.js';

	export default {
		name: 'buy-post',
		data () {
			return {
				token: '',
				data: {
					name: '',
					address: '',
					addressId: '',
					recommendId: '',
					num: 1
				},
				card: {
					id: '',
					price: ''
				},
				addressList: [],
				isWx: '',
				openid: '',
				jsSdkConfig: {}
			};
		},
		created () {
			document.body.style.backgroundColor = '#ffffff';
			Indicator.open('加载中...');
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			this.data.recommendId = this.$route.query.recommend;
			if (this.isWeixin()) {
				this.isWx = true;
			}
			this.openid = getCookie('openid');
			// setCookie('openid', 'odRcE1BAeR2rXLU7R6uyj2awMh4o');
			// setCookie('wechat', 2);
			if (this.$route.query.num) {
				this.data.num = parseInt(this.$route.query.num);
			}
			if (this.$route.query.address) {
				this.data.addressId = this.$route.query.address;
				this.getAddressList(this.data.addressId);
			} else {
				axios.get(apis.urls.defaultAddress)
				.then((response) => {
					if (response.data !== '') {
						this.data.address = response.data.data.area[0].name + ' ' + response.data.data.area[1].name + ' ' + response.data.data.area[2].name + ' ' + response.data.data.address;
						this.data.name = response.data.data.receiver;
						this.data.phone = response.data.data.contact;
					}
					this.data.addressId = response.data.data.id;
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
					return false;
				});
				this.getAddressList();
			}
			axios.get(apis.urls.getPackageDetail)
			.then((response) => {
				Indicator.close();
				this.card.price = response.data.data.price;
				this.card.id = response.data.data.id;
			})
			.catch((error) => {
				Indicator.close();
				apis.errors.errorPublic(error.response, this);
				return false;
			});
		},
		methods: {
			isWeixin () {
				let ua = navigator.userAgent.toLowerCase();
				try {
					if (ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
						return true;
					} else {
						return false;
					}
				} catch (err) {
					return false;
				}
			},
			wxinit (config) {
				wx.config(config);
			},
			pay () {
				wx.chooseWXPay({
					timestamp: this.jsSdkConfig.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					nonceStr: this.jsSdkConfig.nonceStr, // 支付签名随机串，不长于 32 位
					package: this.jsSdkConfig.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
					signType: this.jsSdkConfig.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					paySign: this.jsSdkConfig.paySign, // 支付签名
					success: function (res) {
						this.$message('支付成功！');
					}
				});
			},
			getAddressList (id) {
				let _this = this;
				axios.get(apis.urls.getAddressList)
				.then((response) => {
					_this.addressList = response.data.data;
					if (id) {
						_this.addressList.map(function (item) {
							if (parseInt(item.id) === parseInt(id)) {
								_this.data.name = item.receiver;
								_this.data.phone = item.contact;
								_this.data.address = item.area[0].name + ' ' + item.area[1].name + ' ' + item.area[2].name + ' ' + item.address;
							}
						});
					}
					// this.addressList = response.data.data.map(function (item) {
					// 	item.label = item.area[0].name + ' ' + item.area[1].name + ' ' + item.area[2].name + ' ' + item.address;
					// 	return item;
					// });
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
					return false;
				});
			},
			goChooseAddress () {
				this.$router.push({name: 'AddressChoose', query: {recommend: this.data.recommendId, num: this.data.num}});
			},
			chooseAddress (item) {
				this.data.address = item.label;
				this.data.name = item.receiver;
				this.data.phone = item.contact;
			},
			buyCard () {
				if (this.data.num <= 0) {
					MessageBox.alert('购买数量必须大于零！', '提示');
					return false;
				}
				let tpl = {
					amount: this.data.num,  //  正整数，小于等于5
					recommend: this.data.recommendId,  //  不必填
					address: this.data.addressId
				};
				axios.post(apis.urls.buyCard + '/' + this.card.id, tpl)
				.then((response) => {
					if (this.isWx) {
						this.jsSdkConfig = response.data;
						this.wxinit(this.jsSdkConfig);
						this.pay();
					}
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
					return false;
				});
			}
		},
		components: {
			[Progress.name]: Progress,
			[Indicator.name]: Indicator,
			[Field.name]: Field,
			[Button.name]: Button,
			[KNumber.name]: KNumber,
			[MessageBox.name]: MessageBox
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.buy-post {
		.no-more {
			font-size: $page-title;
		}
		.address-list-ul {
			height: 102px;
			overflow-y: auto;
			li {
				height: auto;
				line-height: 24px;
				font-size: $page-title;
				width: 100%;
				padding: 10px 5%;
				text-align: left;
				border-bottom: 1px solid $color-gray;
				.choose {
					float: right;
					margin-right: 10px;
				    color: $color-blue;
				}
				.edit {
					float: right;
				    color: $color-blue;
				}
			}
		}
		.add-address {
		    height: 0.45rem;
			line-height: 0.45rem;
			font-size: 0.16rem;
			color: $color-blue;
			margin-top: 0.2rem;
			background: #fff;
		}
		.topic {
			font-size: 15px;
			height: auto;
			line-height: 48px;
			text-align: left;
			width: 90%;
			margin: 0 auto;
		}
		.picker-items {
			height: 108px;
			overflow: hidden;
		}
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
