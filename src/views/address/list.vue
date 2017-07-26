<template>
	<div class="address-list input-field-con cl-fx">
		<div class="mt-field-con">
			<ul class="address-list-ul">
				<li v-for="(item, index) in addressList" class="cl-fx">
					<p>{{item.label}}</p>
					<div class="cl-fx">
						<span class="choose delete" @click="deleteAddress(item, index)">删除</span>
						<span class="choose" @click="editAddress(item.id)">编辑</span>
						<span v-if="item.id === defaultId" class="choose">默认</span>
						<span v-else class="choose" @click="setDefault(item.id)">设为默认</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="mt-field-con">
			<div class="no-more" v-show="addressList.length === 0">
				暂无收货地址
			</div>
		</div>
		<div class="mt-field-con">
			<span class="add-address" @click="addAddress">+ 添加新的收货地址</span>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { Button, MessageBox, Indicator, Toast } from 'mint-ui';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { mapActions } from 'vuex';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'address-list',
		data () {
			return {
				defaultId: '',
				token: '',
				addressList: []
			};
		},
		created () {
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			this.fetchData();
		},
		methods: {
			...mapActions([
				'goLogin'
			]),
			fetchData () {
				Indicator.open('加载中...');
				axios.get(apis.urls.getAddressList)
				.then((response) => {
					this.addressList = response.data.data.map(function (item) {
						item.label = item.area[0].name + ' ' + item.area[1].name + ' ' + item.area[2].name + ' ' + item.address;
						return item;
					});
					Indicator.close();
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
					return false;
				});
				axios.get(apis.urls.defaultAddress)
				.then((response) => {
					if (response.data !== '') {
						this.defaultId = response.data.data.id;
					}
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
					return false;
				});
			},
			addAddress () {
				this.$router.push({name: 'AddAddress'});
			},
			editAddress (id) {
				this.$router.push({name: 'EditAddress', params: {id: id}});
			},
			deleteAddress (item, index) {
				console.log(item, index);
				axios.post(apis.urls.getSingleAddress + '/' + item.id + '/delete')
				.then((response) => {
					// 提示成功并返回登录
					Toast({
						message: '删除成功！',
						iconClass: 'mintui mintui-success'
					});
					this.addressList.splice(index);
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
					return false;
				});
			},
			setDefault (id) {
				axios.post(apis.urls.getSingleAddress + '/' + id + '/default')
				.then((response) => {
					// 提示成功并返回登录
					Toast({
						message: '设置成功！',
						iconClass: 'mintui mintui-success'
					});
					this.defaultId = id;
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
					return false;
				});
			}
		},
		components: {
			[Button.name]: Button,
			[Indicator.name]: Indicator,
			[MessageBox.name]: MessageBox,
			[Toast.name]: Toast
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.address-list {
		.no-more {
			font-size: $page-title;
		}
		.address-list-ul {
			height: auto;
			overflow-y: auto;
			li {
				height: auto;
				line-height: 24px;
				font-size: $page-title;
				width: 100%;
				padding: 0 5%;
				text-align: left;
				border-bottom: 1px solid $color-gray;
				padding: 10px 5%;
				.choose {
					float: right;
					margin-right: 10px;
				    color: $color-blue;
				}
				.delete {
					color: $color-red;
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
			height: 48px;
			line-height: 48px;
			text-align: left;
			width: 90%;
			margin: 0 auto;
		}
		.picker-items {
			height: 108px;
			overflow: hidden;
		}
	}
</style>
