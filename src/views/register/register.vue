<template>
	<div class="register input-field-con cl-fx">
		<div class="content common-navbar">
			<div class="bg-user mt-field-con">
				<mt-field placeholder="请输入姓名" type="text" v-model="name">
				</mt-field>
			</div>
			<div class="bg-phone mt-field-con">
				<mt-field placeholder="请输入手机号" type="text" v-model="phone">
					<mt-button type="primary" v-if="downTime.time" disabled>重新发送({{ downTime.time }})</mt-button>
					<mt-button type="primary" @click="sendSms" v-else>获取验证码</mt-button>
				</mt-field>
			</div>
			<div class="bg-sms mt-field-con">
				<mt-field placeholder="请输入验证码" type="text" v-model="code">
				</mt-field>
			</div>
			<div class="bg-password mt-field-con">
				<mt-field placeholder="请输入密码" type="password" v-model="pass"></mt-field>
			</div>
		</div>
		<div class="operate cl-fx">
			<div class="operate-row cl-fx" v-for="item in detail[0].attributes">
				<div
					class="choose-con cl-fx"
					readonly
					@click="changeAreaVisible">
					<div v-if="address.defaultPath.province.name === ''" class="choose-area color-gray">
						地址选择
					</div>
					<div v-else class="choose-area color-black">
						{{address.defaultPath.province.name}}-
						{{address.defaultPath.city.name}}-
						{{address.defaultPath.district.name}}
					</div>
				</div>
				<k-area-picker
				class="operate-row cl-fx"
				v-model="areaVisible"
				:area-choose="address.defaultPath"
				@choose-area="chooseArea"
				></k-area-picker>
			</div>
		</div>
		<div class="register-textarea">
			<textarea v-model="addressDetail" size="large" type="textarea" rows="5" placeholder="输入详细地址"></textarea>
		</div>
		<div class="btn-register">
			<mt-button size="large" type="primary" @click="register">注册</mt-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { Field, Button, MessageBox, Toast } from 'mint-ui';
	import { requiredMe, phone } from '../../utils/valids.js';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { downTime, dropTime } from '../../utils/downTime.js';
	import { saveLocal } from '../../utils/localstorage.js';
	import { mapActions } from 'vuex';
	import AreaPicker from '../../components/area-picker/area-picker.vue';

	export default {
		name: 'dx-register',
		data () {
			return {
				phone: '',
				pass: '',
				code: '',
				name: '',
				addressDetail: '',
				valid: {
					msg: '',
					ok: true
				},
				downTime: {
					time: 0
				},
				address: {
					defaultPath: {
						province: {
							id: '',
							code: '',
							name: ''
						},
						city: {
							code: '',
							id: '',
							name: ''
						},
						district: {
							code: '',
							id: '',
							name: ''
						}
					}
				},
				detail: [
					{
						attributes: [
							{
								option: []
							}
						]
					}
				],
				areaVisible: false
			};
		},
		created () {
			this.fetchData();
		},
		methods: {
			...mapActions([
				'goLogin'
			]),
			fetchData () {
				// axios.get(apis.urls.address + '1').then((response) => {
				// 	_this.categoryData = response;
				// 	saveLocal('serviceCategory', _this.categoryData);
				// }, (response) => {
				// 	apis.errors(response, _this);
				// 	return false;
				// });
			},
			changeAreaVisible () {
				if (this.areaVisible) {
					this.areaVisible = false;
				} else {
					this.areaVisible = true;
				}
			},
			chooseArea () {
				let area = arguments[0];
				this.address.defaultPath = area;
			},
			sendSms () {
				let _this = this;
				// 数据验证
				// _this.valid = {msg: '', ok: true};
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
				let setTime = downTime(60, _this.downTime);
				// 发送验证码
				axios.get(apis.urls.sms, {params: {phone: _this.phone, type: 'register'}}).then((response) => {
					Toast({
						message: '发送成功！',
						iconClass: 'mintui mintui-success'
					});
					_this.valid = {msg: '', ok: true};
					return false;
				})
				.catch((error) => {
					dropTime(setTime);
					apis.errors.errorPublic(error.response, this);
					return false;
				});
			},
			registerRedict () {
				if (this.$route.query.redict) {
					window.location.href = this.$route.query.redict;
				} else {
					this.$router.push({name: 'Index'});
				}
			},
			register () {
				let _this = this;
				// 数据验证
				_this.valid = {msg: '', ok: true};
				// 验证各个所填参数必填
				if (!requiredMe(_this.name)) {
					_this.valid.msg = '姓名必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写姓名！', '提示');
					return false;
				}
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
				if (!requiredMe(_this.pass)) {
					_this.valid.msg = '密码必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写密码！', '提示');
					return false;
				}
				if (!requiredMe(_this.address.defaultPath.district.code)) {
					_this.valid.msg = '地址必选！';
					_this.valid.ok = false;
					MessageBox.alert('请选择地址！', '提示');
					return false;
				}
				if (!requiredMe(_this.addressDetail)) {
					_this.valid.msg = '详细地址必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写详细地址！', '提示');
					return false;
				}
				// 发送请求
				// 组织发送请求参数
				let postTpl = {
					name: _this.name,
					phone: parseInt(_this.phone),
					password: _this.pass,
					smsCode: parseInt(_this.code),
					areaCode: _this.address.defaultPath.district.code,
					address: _this.addressDetail,
					openid: '1',
					wechat: '1'
				};
				axios.post(apis.urls.user, postTpl)
				.then((response) => {
					// 提示成功并返回登录
					Toast({
						message: '注册成功！',
						iconClass: 'mintui mintui-success'
					});
					// 储存信息
					let loginTpl = apis.pures.pureLogin(response.data.data);
					saveLocal('user', loginTpl);
					_this.goLogin(loginTpl);
					_this.registerRedict();
				})
				.catch((error) => {
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
			[Button.name]: Button,
			[AreaPicker.name]: AreaPicker
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.input-field-con {
		min-height: 100vh;
		background-color: #fff;
	}
	.input-field-con .btn-register{
		width: 100%;
		margin: 20px auto;
		padding: 0 10px;
	}
	.input-field-con .heading{
		min-height: 1.4rem;
		display: flex;
		justify-content: center;
  		align-items: center;
	}
	.input-field-con .heading .heading-img{
		width: 30%;
		border-radius: 50%;
	}
	.register .btn-register .mint-button {
		border-radius: 0.2rem;
		width: 80%;
	}
	.register .operate {
		width: 100%;
	    margin: 0.35rem 0 0;
	    .operate-row {
		    height: auto;
	    	line-height: 0.25rem;
		    display: -webkit-box;
		    display: -ms-flexbox;
		    display: flex;
		    .title {
				font-size: $normal-text;
		        min-width: 0.6rem;
				float: left;
			}
			.choose-con {
				font-size: $normal-text;
				width: 100%;
				.color-gray {
					color: $color-gray;
				}
				.color-black {
					color: $color-text;
				}
				.choose-area {
			        width: 80%;
			    	padding: 0 0.2rem;
				    height: 0.35rem;
				    line-height: 0.35rem;
				    text-align: left;
				    border-radius: 0.2rem;
				    height: 0.35rem;
				    margin: 0 auto;
				    background-color: $bg-gray;
				    background-image: url('../../assets/images/login/select.png');
				    background-repeat: no-repeat;
					background-size: 0.09rem 0.1rem;
			    	background-position: 96% center;
				}
			}
			.choose-button {
				min-width: 0.65rem;
		    	padding: 0 0.1rem;
				height: 0.24rem;
				line-height: 0.24rem;
				text-align: center;
				color: $color-text;
				border: 0.01rem solid $border-gray;
				border-radius: 0.03rem;
			    float: left;
			    margin: 0 0 0.1rem 0.08rem;
			}
			.choose-button-active {
				background-image: url('../../assets/images/index/button-active.png');
			    background-repeat: no-repeat;
			    background-size: 0.09rem 0.09rem;
			    background-position: 100% 100%;
			    border: 0.01rem solid $color-context-active;
			    color: $color-context-active;
			}
		}
	}
	
	.register .register-textarea {
		width: 80%;
		margin: 0.15rem auto 0;
		textarea {
			width: 100%;
			display: block;
			resize: none;
			background: $bg-gray;
			border: 0;
			padding: 0.1rem;
		}
	}
</style>
