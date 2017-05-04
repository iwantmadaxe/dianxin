<template>
	<div class="msg-center list-con cl-fx">
		<div class="title">
			消息中心
		</div>
		<div class="cert-list-con">
			<div class="msg-list-row" v-for="item in list">
				<div class="msg-content">
					{{item.data.content?item.data.content:'暂无'}}
				</div>
				<div class="msg-read">
					已读
				</div>
			</div>
			<div v-show="list.length === 0" class="list-null">
				暂无记录!
			</div>
		</div>
		<div class="package-list-btn">
			<mt-button size="large" type="primary" @click="">选择</mt-button>
		</div>
	</div>
</template>

<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { Navbar, TabItem, TabContainer, TabContainerItem, Indicator, Button } from 'mint-ui';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'msg-center',
		data () {
			return {
				token: '',
				list: []
			};
		},
		created () {
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			// 获取信息列表
			this.fetchData();
		},
		beforeDestroy () {
			Indicator.close();
		},
		methods: {
			fetchData () {
				// 获取信息列表
				Indicator.open('加载中...');
				this.loading = true;
				axios.get(apis.urls.msgList)
				.then((response) => {
					Indicator.close();
					this.list = response.data.data;
					this.read();
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
				});
			},
			read () {
				axios.get(apis.urls.msgRead)
				.then((response) => {
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
				});
			}
		},
		components: {
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[TabContainer.name]: TabContainer,
			[TabContainerItem.name]: TabContainerItem,
			[Indicator.name]: Indicator,
			[Button.name]: Button
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';
	
	.msg-center .package-list-btn .mint-button {
		border-radius: 0.2rem;
		width: 80%;
		margin: 0.3rem auto;
	}
	.msg-center {
		.title {
			width: 100%;
			font-size: 0.16rem;
			color: $color-gray-dx;
			height: 0.32rem;
			margin: 0.1rem 0;
			line-height: 0.32rem;
			text-align: left;
			padding: 0 10px;
		}
		.msg-list-row {
			width: 100%;
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			height: auto;
			line-height: 0.32rem;
			border-bottom: 1px solid $border-gray;
			.msg-content {
				-webkit-box-flex: 1;
				-ms-flex: 1;
				flex: 1;
				text-align:center;
				padding: 0 0.1rem;
				border-right: 1px solid $border-gray;
			}
			.msg-read {
				width: 0.5rem;
				text-align:center;
			}
		}
	}
</style>
