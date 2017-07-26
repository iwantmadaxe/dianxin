<template>
	<div class="address-edit input-field-con cl-fx">
		<div class="content common-navbar">
			<div class="mt-field-con">
				<mt-field placeholder="请输入收货人姓名" type="text" v-model="receiver"></mt-field>
			</div>
			<div class="mt-field-con">
				<mt-field placeholder="请输入联系方式" type="text" v-model="contact"></mt-field>
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
			<mt-button size="large" type="primary" @click="postEdit">保存</mt-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Field, Button, MessageBox, Toast, Indicator } from 'mint-ui';
	import { requiredMe } from '../../utils/valids.js';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { mapActions } from 'vuex';
	import AreaPicker from '../../components/area-picker/area-picker.vue';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'address-edit',
		data () {
			return {
				id: '',
				token: '',
				receiver: '',
				contact: '',
				addressDetail: '',
				valid: {
					msg: '',
					ok: true
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
				Indicator.open('加载中...');
				this.token = 'bearer ' + readLocal('user').token;
				this.id = this.$route.params.id;
				axios.defaults.headers.common['Authorization'] = this.token;
				axios.get(apis.urls.getSingleAddress + '/' + this.id + '/edit')
				.then((response) => {
					this.receiver = response.data.data.receiver;
					this.contact = response.data.data.contact;
					this.addressDetail = response.data.data.address;
					this.address.defaultPath.province = response.data.data.area[0];
					this.address.defaultPath.city = response.data.data.area[1];
					this.address.defaultPath.district = response.data.data.area[2];
					Indicator.close();
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorLogin(error.response, this);
					return false;
				});
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
			postEdit () {
				let _this = this;
				// 数据验证
				if (!requiredMe(_this.receiver)) {
					_this.valid.msg = '请填写收货人姓名！';
					_this.valid.ok = false;
					MessageBox.alert('请填写收货人姓名！', '提示');
					return false;
				}
				if (!requiredMe(_this.contact)) {
					_this.valid.msg = '请填写联系方式！';
					_this.valid.ok = false;
					MessageBox.alert('请填写联系方式！', '提示');
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
					receiver: _this.receiver,
					contact: _this.contact,
					area: _this.address.defaultPath.district.code,
					address: _this.addressDetail
				};
				axios.post(apis.urls.getSingleAddress + '/' + this.id + '/update', postTpl)
				.then((response) => {
					// 提示成功并返回登录
					Toast({
						message: '更新地址成功！',
						iconClass: 'mintui mintui-success'
					});
					window.history.go(-1);
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, _this);
					return false;
				});
			}
		},
		components: {
			[Field.name]: Field,
			[Button.name]: Button,
			[AreaPicker.name]: AreaPicker,
			[Indicator.name]: Indicator
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.address-edit .mint-field-core {
	    padding: 0.1rem 0.2rem;
	}
	.address-edit .operate {
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

	.address-edit .register-textarea {
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
