<template>
	<div class="edit-password input-field-con cl-fx">
		<div class="content">
			<div class="bg-phone mt-field-con">
				<mt-field placeholder="请输入原密码" type="password" v-model="passwordOld"></mt-field>
			</div>
			<div class="bg-phone mt-field-con">
				<mt-field placeholder="请输入新密码" type="password" v-model="passwordNew"></mt-field>
			</div>
			<div class="bg-phone mt-field-con">
				<mt-field placeholder="请确认新密码" type="password" v-model="passwordNew2"></mt-field>
			</div>
		</div>
		<div class="btn-register">
			<mt-button size="large" type="primary" @click="edit">确定</mt-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { Field, Button, MessageBox, Toast, Navbar, TabItem, TabContainer, TabContainerItem, Indicator } from 'mint-ui';
	import { requiredMe } from '../../utils/valids.js';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { mapActions } from 'vuex';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'dx-edit-password',
		data () {
			return {
				token: '',
				passwordOld: '',
				passwordNew: '',
				passwordNew2: '',
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
			edit () {
				let _this = this;
				// 数据验证
				_this.valid = {msg: '', ok: true};
				// 验证各个所填参数必填
				if (!requiredMe(_this.passwordOld)) {
					_this.valid.msg = '请填写旧密码！';
					_this.valid.ok = false;
					MessageBox.alert('请填写旧密码！', '提示');
					return false;
				}
				if (!requiredMe(_this.passwordNew)) {
					_this.valid.msg = '请填写新密码！';
					_this.valid.ok = false;
					MessageBox.alert('请填写新密码！', '提示');
					return false;
				}
				if (!requiredMe(_this.passwordNew2)) {
					_this.valid.msg = '请确认新密码！';
					_this.valid.ok = false;
					MessageBox.alert('请确认新密码！', '提示');
					return false;
				}
				if (_this.passwordNew2 !== _this.passwordNew) {
					_this.valid.msg = '前后密码不一致！';
					_this.valid.ok = false;
					MessageBox.alert('前后密码不一致！', '提示');
					return false;
				}
				let postTpl = {
					oldPassword: _this.passwordOld,
					newPassword: _this.passwordNew
				};
				axios.put(apis.urls.editPassword, postTpl)
				.then((response) => {
					Toast({
						message: '密码更新成功！',
						iconClass: 'mintui mintui-success'
					});
					this.passwordOld = '';
					this.passwordNew = '';
					this.passwordNew2 = '';
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
	
	.edit-password {}
</style>
