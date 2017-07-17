<template>
	<div class="package-list">
		<package-square v-for="item in list" :item="item" :list="list"></package-square>
		<div class="package-list-btn">
			<mt-button size="large" type="primary" @click="postOrder">充值</mt-button>
		</div>
	</div>
</template>

<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { Navbar, TabItem, TabContainer, TabContainerItem, Indicator, Button, MessageBox } from 'mint-ui';
	import { readLocal } from '../../utils/localstorage.js';
	import PackageSquare from '../../views/package/package-square.vue';
	import wx from 'weixin-js-sdk';
	import { getCookie } from '../../utils/cookie.js';

	export default {
		name: 'package-list',
		data () {
			return {
				cardId: '',
				token: '',
				list: [],
				openid: '',
				jsSdkConfig: {},
				isWx: false
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
			if (this.isWeixin()) {
				this.isWx = true;
			}
			this.cardId = this.$route.params.id;
			this.token = 'bearer ' + readLocal('user').token;
			this.openid = getCookie('openid');
			axios.defaults.headers.common['Authorization'] = this.token;
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
				axios.get(apis.urls.flow, {params: {code: this.cardId}})
				.then((response) => {
					Indicator.close();
					this.list = apis.pures.purePackageList(response.data.data);
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
				});
			},
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
			[PackageSquare.name]: PackageSquare,
			[MessageBox.name]: MessageBox
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';
	
	.package-list .package-list-btn .mint-button {
		border-radius: 0.2rem;
		width: 80%;
		margin: 0.3rem auto;
	}
</style>
