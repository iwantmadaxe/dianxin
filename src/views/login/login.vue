<template>
	<div class="login input-field-con cl-fx">
		<div class="login-navbar-header common-navbar">
			<mt-navbar class="page-part" v-model="selected">
				<mt-tab-item id="local-login">
					<div class="border-navbar-right border-right">账号密码</div>
				</mt-tab-item>
				<mt-tab-item id="sms-login">
					<div class="border-navbar-right">短信密码</div>
				</mt-tab-item>
			</mt-navbar>
		</div>
		<mt-tab-container v-model="selected" swipeable>
			<mt-tab-container-item id="local-login">
				<div class="content">
					<div class="bg-phone mt-field-con">
						<mt-field placeholder="请输入手机号/卡号" type="text" v-model="phone"></mt-field>
					</div>
					<div class="bg-password mt-field-con">
						<mt-field placeholder="请输入密码" type="password" v-model="pass"></mt-field>
					</div>
		<!-- 			<mt-field placeholder="请输入验证码" type="text" v-model="code">
						<mt-button type="primary" v-if="downTime.time" disabled>重新发送({{ downTime.time }})</mt-button>
						<mt-button type="primary" @click="sendSms" v-else>发送验证码</mt-button>
					</mt-field> -->
				</div>
				<div class="cl-fx login-operate">
					<span @click="goLoginPage" class="fl">注册账号</span>
					<span @click="goForgetPage" class="fr">忘记密码</span>
				</div>
				<div class="btn-register">
					<mt-button size="large" type="primary" @click="localLogin">登录</mt-button>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="sms-login">
				<div class="content">
					<div class="bg-phone mt-field-con">
						<mt-field placeholder="请输入手机号" type="text" v-model="phone"></mt-field>
					</div>
					<div class="bg-sms mt-field-con">
						<mt-field placeholder="请输入验证码" type="text" v-model="code">
							<mt-button type="primary" v-if="downTime.time" disabled>重新发送({{ downTime.time }})</mt-button>
							<mt-button type="primary" @click="sendSms" v-else>获取验证码</mt-button>
						</mt-field>
					</div>
				</div>
				<div class="cl-fx login-operate">
					<span @click="goLoginPage" class="fl">注册</span>
					<span @click="goForgetPage" class="fr">忘记密码？</span>
				</div>
				<div class="btn-register">
					<mt-button size="large" type="primary" @click="smsLogin">登录</mt-button>
				</div>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script type="text/javascript">
	import { Field, Button, MessageBox, Toast, Navbar, TabItem, TabContainer, TabContainerItem, Indicator } from 'mint-ui';
	import { requiredMe, phone } from '../../utils/valids.js';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { saveLocal } from '../../utils/localstorage.js';
	import { mapActions } from 'vuex';

	export default {
		name: 'dx-login',
		data () {
			return {
				phone: '',
				pass: '',
				code: '',
				valid: {
					msg: '',
					ok: true
				},
				downTime: {
					time: 0
				},
				selected: 'local-login'
			};
		},
		created () {
			let hasAuth = this.getCookie('token');
			if (hasAuth) {
				this.$router.push({name: 'Index'});
			}
		},
		methods: {
			...mapActions([
				'goLogin'
			]),
			sendSms () {
				let _this = this;
				// 数据验证
				_this.valid = {msg: '', ok: true};
				if (!requiredMe(_this.phone)) {
					_this.valid.msg = '手机号必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写手机号！', '提示');
					return false;
				}
				if (!phone(_this.phone)) {
					_this.valid.msg = '手机号格式错误！';
					_this.valid.ok = false;
					MessageBox.alert('手机号格式错误！', '提示');
					return false;
				}
				// 发送验证码
				axios.get(apis.urls.sms, {params: {phone: _this.phone, type: 'login'}})
				.then((response) => {
					Toast({
						message: '发送成功！',
						iconClass: 'mintui mintui-success'
					});
					_this.valid = {msg: '', ok: true};
					return false;
				})
				.catch((error) => {
					apis.errors(error.response, this);
					return false;
				});
			},
			loginPostLocal (postTpl) {
				let postTpl2 = {
					cardNum: postTpl,
					auth_name: 'card',
					password: postTpl.password
				};
				axios.post(apis.urls.login, postTpl2)
				.then((response) => {
					Toast({
						message: '登录成功！',
						iconClass: 'mintui mintui-success'
					});
					// 储存信息
					let loginTpl = apis.pures.pureLogin(response.data.data);
					saveLocal('user', loginTpl);
					this.goLogin(loginTpl);
					this.$router.push({name: 'Index'});
				})
				.catch((error) => {
					apis.errors.errorLogin(error.response, this);
				});
			},
			loginPostPhone (postTpl) {
				postTpl.auth_name = 'phone';
				axios.post(apis.urls.login, postTpl)
				.then((response) => {
					Toast({
						message: '登录成功！',
						iconClass: 'mintui mintui-success'
					});
					// 储存信息
					let loginTpl = apis.pures.pureLogin(response.data.data);
					saveLocal('user', loginTpl);
					this.goLogin(loginTpl);
					this.$router.push({name: 'Index'});
				})
				.catch((error) => {
					apis.errors.errorLogin(error.response, this);
				});
			},
			loginPostSms (postTpl) {
				postTpl.auth_name = 'sms';
				axios.post(apis.urls.login, postTpl)
				.then((response) => {
					Toast({
						message: '登录成功！',
						iconClass: 'mintui mintui-success'
					});
					// 储存信息
					let loginTpl = apis.pures.pureLogin(response.data.data);
					saveLocal('user', loginTpl);
					this.goLogin(loginTpl);
					this.$router.push({name: 'Index'});
				})
				.catch((error) => {
					apis.errors.errorLogin(error.response, this);
				});
			},
			smsLogin () {
				let _this = this;
				// 数据验证
				_this.valid = {msg: '', ok: true};
				// 验证各个所填参数必填
				if (!requiredMe(_this.phone)) {
					_this.valid.msg = '手机号必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写手机号！', '提示');
					return false;
				}
				// 手机号检测
				if (!phone(_this.phone)) {
					_this.valid.msg = '手机号格式错误！';
					_this.valid.ok = false;
					MessageBox.alert('手机号格式错误！', '提示');
					return false;
				}
				if (!requiredMe(_this.code)) {
					_this.valid.msg = '验证码必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写验证码！', '提示');
					return false;
				}
				// 发送请求
				// 组织发送请求参数
				let postTpl = {
					phone: _this.phone,
					// password: _this.pass,
					smsCode: _this.code,
					auth_name: 'sms'
				};
				_this.loginPostSms(postTpl);
			},
			localLogin () {
				let _this = this;
				// 数据验证
				_this.valid = {msg: '', ok: true};
				// 验证各个所填参数必填
				if (!requiredMe(_this.phone)) {
					_this.valid.msg = '手机号/卡号必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写手机号/卡号！', '提示');
					return false;
				}
				if (!requiredMe(_this.pass)) {
					_this.valid.msg = '密码必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写密码！', '提示');
					return false;
				}
				let postTpl = {
					phone: _this.phone,
					password: _this.pass,
					smsCode: _this.code,
					auth_name: ''
				};
				if (_this.phone.length !== 11) {
					_this.loginPostLocal(postTpl);
				} else {
					_this.loginPostPhone(postTpl);
				}
			},
			getCookie (name) {
				let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
				let arr = document.cookie.match(reg);
				if (arr) {
					return unescape(arr[2]);
				} else {
					return null;
				}
			},
			goLoginPage () {
				this.$router.push({name: 'Register'});
			},
			goForgetPage () {
				this.$router.push({name: 'Forget'});
			}
		},
		components: {
			[Field.name]: Field,
			[Button.name]: Button,
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[TabContainer.name]: TabContainer,
			[TabContainerItem.name]: TabContainerItem,
			[Indicator.name]: Indicator
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';
	
	.input-field-con {
		.mint-field {
			background-image: none;
		}
		.mt-field-con {
			margin: 0.15rem auto 0;
		}
		.login-operate {
			width: 80%;
			padding: 0 0.1rem;
			margin:  0.2rem auto 0;
		}
		.mint-cell {
			min-height: auto;
		}
		.mint-cell-wrapper {
			width: 80%;
			min-width: 2.4rem;
			margin: 0 auto;
			position: relative;
			overflow: hidden;
			border-radius: 0.2rem;
			padding: 0;
		}
		.mint-field-core {
			width: 100%;
			height: 0.35rem;
			padding: 0.1rem 0.4rem;
			line-height: 0.15rem;
			font-size: $input-text;
			background: $bg-gray;
		    -webkit-box-flex: none;
		    -ms-flex: none;
		    flex: none;
		}
		.mint-field-other {
			.mint-button  {
				height: 0.35rem;
				line-height: 0.35rem;
				font-size: $input-text;
			}
		}
		.border-right {
			@include border-right($border-gray);
		}
	}
	.mint-tab-container {
		.mint-cell-wrapper {
			background-image: none;
		}
		.mint-cell:last-child {
			background-image: none;
		}
	}
	.common-navbar {
		.mint-navbar {
			.mint-tab-item-label {
				height: 0.25rem;
				line-height: 0.25rem;
			}
			.mint-tab-item {
				padding: 0.1rem 0;
				background: $bg-gray;
				color: $color-text;
			}
			.mint-tab-item.is-selected {
				position: relative;
				margin-bottom: 0 !important;
				border-bottom: 0 !important;
				color: $color-text;
			}
			.is-selected::after {
				content: '';
				background: $color-blue;
				left: 0;
				right: 0;
				bottom: 0;
				margin-left: auto;
				margin-right: auto;
				position: absolute;
			    height: 0.03rem;
				width: 0.8rem;
			}
			.mint-tab-item-label {
				font-size: $navbar-title;
			}
		}
	}
	.bg-choose {
		.mint-field-core {
			background-image: url('../../assets/images/login/choose.png');
		    background-repeat: no-repeat;
    		background-position: 0.2rem center;
    		background-size: 0.12rem 0.14rem;
		}
	}
	.bg-card {
		.mint-field-core {
			background-image: url('../../assets/images/login/card.png');
		    background-repeat: no-repeat;
    		background-position: 0.2rem center;
    		background-size: 0.16rem 0.14rem;
		}
	}
	.bg-phone {
		.mint-field-core {
			background-image: url('../../assets/images/login/phone.png');
		    background-repeat: no-repeat;
    		background-position: 0.2rem center;
    		background-size: 0.12rem 0.14rem;
		}
	}
	.bg-password {
		.mint-field-core {
			background-image: url('../../assets/images/login/password.png');
		    background-repeat: no-repeat;
    		background-position: 0.2rem center;
    		background-size: 0.12rem 0.14rem;
		}
	}
	.bg-sms {
		.mint-field-core {
			background-image: url('../../assets/images/login/sms.png');
		    background-repeat: no-repeat;
    		background-position: 0.2rem center;
    		background-size: 0.12rem 0.14rem;
		}
	}
	.input-field-con .btn-register .mint-button {
		border-radius: 0.2rem;
		width: 80%;
		margin: 0 auto;
	}
</style>
