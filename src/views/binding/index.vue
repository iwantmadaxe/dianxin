<template>
	<div class="buy-binding">
		<div class="binding-operate cl-fx">
			<div class="binding-field-con">
				<mt-field placeholder="输入卡底下9位数" type="text" v-model="cardNo"></mt-field>
			</div>
			<div class="binding-list-btn">
				<mt-button size="large" type="primary" @click="">绑定</mt-button>
			</div>
		</div>
		<div class="bg-gray-con">
			<div class="binding-list-con cl-fx">
				<p class="topic">已绑定的卡</p>
			</div>
			<div class="cl-fx bindng-list">
				<binding-square v-for="item in list" :item="item" :list="list"></binding-square>
			</div>
		</div>
	</div>
</template>

<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { Navbar, TabItem, TabContainer, TabContainerItem, Indicator, Button, MessageBox, Field } from 'mint-ui';
	import { readLocal } from '../../utils/localstorage.js';
	import BindingSquare from '../../views/binding/binding-square.vue';

	export default {
		name: 'buy-binding',
		data () {
			return {
				token: '',
				list: [],
				cardNo: ''
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
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			document.body.style.backgroundColor = '#f0f2f5';
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
				axios.get(apis.urls.flow)
				.then((response) => {
					Indicator.close();
					this.list = apis.pures.purePackageList(response.data.data);
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
				});
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
			[BindingSquare.name]: BindingSquare,
			[MessageBox.name]: MessageBox,
			[Field.name]: Field
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.buy-binding {
		.binding-operate {
			background: #fff;
		}
		.binding-field-con {
			width: 100%;
			padding-left: 0.2rem;
			margin-bottom: 0.2rem;
			.mint-cell-wrapper {
				background-image: none;
			}
			.mint-field {
				background-image: none;
				border-bottom: 1px solid $color-gray;
			}
		}
		.binding-list-con {
			.topic {
				font-size: $navbar-title;
				color: $color-text;
				text-align: left;
				padding-top: 0.2rem;
			}
			width: 100%;
			padding: 0 0.2rem 0.1rem;
		}
	}
	.buy-binding .binding-list-btn .mint-button {
		border-radius: 0.2rem;
		width: 80%;
		margin: 0.3rem auto;
	}
	.bg-gray-con {
		padding-bottom: 0.2rem;
	}
</style>
