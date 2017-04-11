<template>
	<div class="edit-phone input-field-con cl-fx">
		<div class="content">
			<div class="bg-phone mt-field-con">
				<mt-field placeholder="请输入现有手机号" type="text" v-model="phoneOld"></mt-field>
			</div>
			<div class="bg-password mt-field-con">
				<mt-field placeholder="请输入验证码" type="text" v-model="code">
					<mt-button type="primary" v-if="downTime.time" disabled>重新发送({{ downTime.time }})</mt-button>
					<mt-button type="primary" @click="sendSms" v-else>发送验证码</mt-button>
				</mt-field>
			</div>
			<div class="bg-phone mt-field-con">
				<mt-field placeholder="请输入新手机号" type="text" v-model="phoneNew"></mt-field>
			</div>
		</div>
		<div class="btn-register">
			<mt-button size="large" type="primary" @click="edit">确定</mt-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { Field, Button, MessageBox, Toast, Navbar, TabItem, TabContainer, TabContainerItem, Indicator } from 'mint-ui';
	import { requiredMe, phone } from '../../utils/valids.js';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { mapActions } from 'vuex';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'dx-edit-phone',
		data () {
			return {
				token: '',
				phoneOld: '',
				phoneNew: '',
				code: null,
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
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
		},
		methods: {
			...mapActions([
				'goLogin'
			]),
			sendSms () {
				let _this = this;
				// 数据验证
				_this.valid = {msg: '', ok: true};
				if (!requiredMe(_this.phoneOld)) {
					_this.valid.msg = '旧手机号必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写旧手机号！', '提示');
					return false;
				}
				if (!phone(_this.phoneOld)) {
					_this.valid.msg = '旧手机号格式错误！';
					_this.valid.ok = false;
					MessageBox.alert('旧手机号格式错误！', '提示');
					return false;
				}
				// 发送验证码
				axios.get(apis.urls.sms, {params: {phone: _this.phoneOld, type: 'updatePhone'}}).then((response) => {
					Toast({
						message: '发送成功！',
						iconClass: 'mintui mintui-success'
					});
					_this.valid = {msg: '', ok: true};
					return false;
				}, (response) => {
					apis.errors(response, _this);
					return false;
				});
			},
			edit () {
				let _this = this;
				// 数据验证
				_this.valid = {msg: '', ok: true};
				// 验证各个所填参数必填
				if (!requiredMe(_this.phoneOld)) {
					_this.valid.msg = '旧手机号必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写旧手机号！', '提示');
					return false;
				}
				if (!phone(_this.phoneOld)) {
					_this.valid.msg = '旧手机号格式错误！';
					_this.valid.ok = false;
					MessageBox.alert('旧手机号格式错误！', '提示');
					return false;
				}
				if (!requiredMe(_this.phoneNew)) {
					_this.valid.msg = '新手机号必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写新手机号！', '提示');
					return false;
				}
				if (!phone(_this.phoneNew)) {
					_this.valid.msg = '新手机号格式错误！';
					_this.valid.ok = false;
					MessageBox.alert('新手机号格式错误！', '提示');
					return false;
				}
				if (!requiredMe(_this.code)) {
					_this.valid.msg = '验证码必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写验证码！', '提示');
					return false;
				}
				let postTpl = {
					phone: _this.phoneNew,
					smsCode: _this.code
				};
				axios.put(apis.urls.editPhone, postTpl)
				.then((response) => {
					Toast({
						message: '手机号更新成功！',
						iconClass: 'mintui mintui-success'
					});
					this.phoneOld = '';
					this.phoneNew = '';
					this.code = '';
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
					return false;
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
	
	.edit-phone {}
</style>
