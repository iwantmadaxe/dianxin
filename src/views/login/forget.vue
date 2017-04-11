<template>
	<div class="forget input-field-con cl-fx">
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
			<div class="bg-password mt-field-con">
				<mt-field placeholder="输入新密码" type="password" v-model="newpass"></mt-field>
			</div>
			<div class="bg-choose mt-field-con">
				<mt-field placeholder="确认新密码" type="password" v-model="newpass2"></mt-field>
			</div>
		</div>
		<div class="btn-register">
			<mt-button size="large" type="primary" @click="forget">确定</mt-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { Field, Button, MessageBox, Toast } from 'mint-ui';
	import { requiredMe, phone } from '../../utils/valids.js';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { downTime, dropTime } from '../../utils/downTime.js';

	export default {
		name: 'boss-login',
		data () {
			return {
				phone: '',
				newpass: '',
				newpass2: '',
				code: '',
				valid: {
					msg: '',
					ok: true
				},
				downTime: {
					time: 0
				}
			};
		},
		created () {
			let hasAuth = this.getCookie('has_auth');
			if (hasAuth) {
				this.$router.push({name: 'Index'});
			}
		},
		methods: {
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
				// 开启倒计时
				let setTime = downTime(120, _this.downTime);
				// 发送验证码
				axios.get(apis.urls.sms, {params: {phone: _this.phone, type: 'password'}})
				.then((response) => {
					Toast({
						message: '发送成功！',
						iconClass: 'mintui mintui-success'
					});
					_this.valid = {msg: '', ok: true};
					return false;
				})
				.catch((error) => {
					dropTime(setTime);
					// apis.errors(error.response, _this);
					apis.errors.errorLogin(error.response, _this);
				});
			},
			forget () {
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
				if (!requiredMe(_this.newpass)) {
					_this.valid.msg = '新密码必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写新密码！', '提示');
					return false;
				}
				if (!requiredMe(_this.newpass2)) {
					_this.valid.msg = '请确认新密码！';
					_this.valid.ok = false;
					MessageBox.alert('确认新密码未填！', '提示');
					return false;
				}
				if (_this.newpass2 !== _this.newpass) {
					_this.valid.msg = '两次输入的新密码不一致！';
					_this.valid.ok = false;
					MessageBox.alert('确认新密码有误！', '提示');
					return false;
				}
				if (!requiredMe(_this.code)) {
					_this.valid.msg = '验证码必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写验证码！', '提示');
					return false;
				}
				let postTpl = {
					phone: _this.phone,
					password: _this.newpass,
					smsCode: _this.code
				};
				axios.put(apis.urls.forget, postTpl)
				.then((response) => {
					Toast({
						message: '新密码设置成功！',
						iconClass: 'mintui mintui-success'
					});
					_this.$router.push({name: 'Login'});
				})
				.catch((error) => {
					// apis.errors(error.response, _this);
					apis.errors.errorLogin(error.response, _this);
				});
			},
			getCookie (name) {
				let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
				let arr = document.cookie.match(reg);
				if (arr) {
					return unescape(arr[2]);
				} else {
					return null;
				}
			}
		},
		components: {
			[Field.name]: Field,
			[Button.name]: Button
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

</style>
