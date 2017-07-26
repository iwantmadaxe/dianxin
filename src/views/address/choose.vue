<template>
	<div class="address-choose input-field-con cl-fx">
		<div class="mt-field-con">
			<ul class="address-list-ul">
				<li v-for="(item, index) in addressList" class="cl-fx">
					<p>收货人：&nbsp;&nbsp;{{item.receiver}}</p>
					<p>联系方式：&nbsp;&nbsp;{{item.contact}}</p>
					<p>地址：{{item.label}}</p>
					<div class="cl-fx">
						<span class="choose delete" @click="choose(item, index)">选择该地址</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="mt-field-con">
			<div class="no-more" v-show="addressList.length === 0">
				暂无收货地址
			</div>
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
		name: 'address-choose',
		data () {
			return {
				recommend: '',
				num: '',
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
				this.recommend = this.$route.query.recommend;
				this.num = this.$route.query.num;
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
			},
			choose (item, index) {
				this.$router.push({name: 'BuyPost', query: {recommend: this.recommend, address: item.id, num: this.num}});
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

	.address-choose {
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
