<template>
	<div class="cert-add input-field-con cl-fx">
		<div class="content">
			<div class="bg-cert-name mt-field-con">
				<mt-field placeholder="输入真实姓名" type="text" v-model="cert.name"></mt-field>
			</div>
			<div class="bg-cert-code mt-field-con">
				<mt-field placeholder="输入身份证号码" type="text" v-model="cert.code"></mt-field>
			</div>
			<div class="bg-cert-card mt-field-con">
				<mt-field placeholder="输入卡号" type="text" v-model="cert.idNumber"></mt-field>
			</div>
			<div class="bg-cert-phone mt-field-con">
				<mt-field placeholder="输入手机号" type="text" v-model="cert.phone"></mt-field>
			</div>
		</div>
		<div class="upload-con cl-fx">
			<div class="upload-square" style="margin: 0 4% 0 10%;">
				<input type="file" class="upload-file front-input" @change="uploadFront">
				<div class="notice">
					<div class="add-icon"></div>
					<span class="text">身份证正面</span>
				</div>
				<div class="preview" v-show="imgFrontPreview">
					<img v-bind:src="imgFrontPreview">
				</div>
			</div>
			<div class="upload-square" style="margin: 0 10% 0 4%;">
				<input type="file" class="upload-file back-input" @change="uploadBack">
				<div class="notice">
					<div class="add-icon"></div>
					<span class="text">身份证反面</span>
				</div>
				<div class="preview" v-show="imgBackPreview">
					<img v-bind:src="imgBackPreview">
				</div>
			</div>
		</div>
		<div class="upload-again" @click="reload">
			重新上传
		</div>
		<div class="btn-register">
			<mt-button size="large" type="primary" @click="certPost">提交认证</mt-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { Field, Button, MessageBox, Toast, Navbar, TabItem, TabContainer, TabContainerItem, Indicator } from 'mint-ui';
	import { requiredMe, phone } from '../../utils/valids.js';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'dx-cert-add',
		data () {
			return {
				isCert: false,
				valid: {
					msg: '',
					ok: ''
				},
				token: '',
				cert: {
					name: '',
					code: '',
					phone: '',
					idNumber: ''
				},
				imgFront: '',
				imgBack: '',
				imgFrontPreview: '',
				imgBackPreview: ''
			};
		},
		created () {
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
		},
		methods: {
			uploadFront (event) {
				let _this = this;
				let file = event.target.files[0];
				_this.imgFront = file;
				let fr = new window.FileReader();
				fr.onloadend = function () {
					_this.imgFrontPreview = fr.result;
				};
				if (file) {
					fr.readAsDataURL(file);
				} else {
				}
				return true;
			},
			uploadBack (event) {
				let _this = this;
				let file = event.target.files[0];
				_this.imgBack = file;
				let fr = new window.FileReader();
				fr.onloadend = function () {
					_this.imgBackPreview = fr.result;
				};
				if (file) {
					fr.readAsDataURL(file);
				} else {
				}
				return true;
			},
			reload () {
				this.imgFront = '';
				this.imgBack = '';
				this.imgFrontPreview = '';
				this.imgBackPreview = '';
				// $('.front-input').
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
			certPost () {
				let _this = this;
				// 验证各个所填参数必填
				if (!requiredMe(_this.cert.name)) {
					_this.valid.msg = '真实姓名必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写真实姓名！', '提示');
					return false;
				}
				if (!requiredMe(_this.cert.code)) {
					_this.valid.msg = '身份证号必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写身份证号！', '提示');
					return false;
				}
				if (!requiredMe(_this.cert.idNumber)) {
					_this.valid.msg = '卡号必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写卡号！', '提示');
					return false;
				}
				if (!requiredMe(_this.cert.phone)) {
					_this.valid.msg = '手机号必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写手机号！', '提示');
					return false;
				}
				if (!phone(_this.cert.phone)) {
					_this.valid.msg = '手机号验证错误！';
					_this.valid.ok = false;
					MessageBox.alert('请填写正确的手机号！', '提示');
					return false;
				}
				if (!requiredMe(_this.imgFront)) {
					_this.valid.msg = '身份证正面必传！';
					_this.valid.ok = false;
					MessageBox.alert('请上传身份证正面！', '提示');
					return false;
				}
				if (!requiredMe(_this.imgBack)) {
					_this.valid.msg = '身份证反面必传！';
					_this.valid.ok = false;
					MessageBox.alert('请上传身份证反面！', '提示');
					return false;
				}
				if (_this.isCert) {
					return false;
				}
				_this.isCert = true;
				let postTpl = new FormData();
				postTpl.append('name', this.cert.name);
				postTpl.append('card_code', this.cert.idNumber);
				postTpl.append('phone', this.cert.phone);
				postTpl.append('id_number', this.cert.code);
				postTpl.append('front_image', this.imgFront);
				postTpl.append('back_image', this.imgBack);
				axios.post(apis.urls.certPost, postTpl)
				.then((response) => {
					Toast({
						message: '已提交！',
						iconClass: 'mintui mintui-success'
					});
					this.$router.push({name: 'CertList'});
				})
				.catch((error) => {
					this.isCert = false;
					apis.errors.errorPublic(error.response, this);
				});
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
	
	.bg-cert-name {
		.mint-field-core {
			background-image: url('../../assets/images/cert/bg1.png');
			background-repeat: no-repeat;
			background-position: 0.2rem center;
			background-size: 0.17rem 0.16rem;
		}
	}
	.bg-cert-code {
		.mint-field-core {
			background-image: url('../../assets/images/cert/bg2.png');
			background-repeat: no-repeat;
			background-position: 0.2rem center;
			background-size: 0.17rem 0.16rem;
		}
	}
	.bg-cert-card {
		.mint-field-core {
			background-image: url('../../assets/images/login/card.png');
			background-repeat: no-repeat;
			background-position: 0.2rem center;
			background-size: 0.17rem 0.16rem;
		}
	}
	.bg-cert-phone {
		.mint-field-core {
			background-image: url('../../assets/images/cert/bg3.png');
			background-repeat: no-repeat;
			background-position: 0.2rem center;
			background-size: 0.17rem 0.16rem;
		}
	}
	.cert-add {
		.upload-again {

		}
		.upload-con {
			padding: 0.15rem 0;
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			.upload-square {
				width: 0.6rem;
				height: 0.8rem;
				position: relative;
				-webkit-box-flex: 1;
				-ms-flex: 1;
				flex: 1;
				background: #f5f5f5;
				border: 0.01rem dashed #dcdcdc;
				.upload-file {
					z-index: 10;
					position: absolute;
					width: 100%;
					height: 100%;
					display: block;
					opacity: 0;
				}
				.notice {
					position: absolute;
					width: 100%;
					height: 100%;
					display: block;
					z-index: 5;
					.add-icon {
						background-image: url('../../assets/images/cert/add-icon.png');
						background-size: 100% 100%;
						height: 0.22rem;
						width: 0.22rem;
						background-repeat: no-repeat;
						margin: 0.2rem auto 0;
					}
					.text {
						margin: 0.1rem auto;
						width: 100%;
						display: block;
					}
				}
				.preview {
					position: absolute;
					width: 100%;
					height: 100%;
					display: block;
					z-index: 9;
					img {
						width: 100%;
						height: 100%;
						display: block;
					}
				}
			}
		}
	}
</style>
