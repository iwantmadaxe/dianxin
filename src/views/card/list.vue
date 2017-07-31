<template>
	<div class="card-list">
		<div class="title">
			我拥有的卡
		</div>
		<table class="card-list-con">
			<tr>
				<td>卡ID</td>
				<td>卡昵称</td>
				<td>操作</td>
			</tr>
			<tr v-for="(item, index) in list">
				<td>
					{{item.id}}
				</td>
				<td>
					{{item.nick_name?item.nick_name:'暂无'}}
				</td>
				<td class="check" @click="edit(item)">
					修改卡昵称
				</td>
			</tr>
		</table>
	</div>
</template>
<script>
	import { Indicator, MessageBox, Toast } from 'mint-ui';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'card-list',
		data () {
			return {
				token: '',
				list: {
					data: [],
					meta: {
						pagination: {
							total_pages: null
						}
					}
				},
				page: 1
			};
		},
		created () {
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			this.fetchData();
		},
		methods: {
			fetchData () {
				// 获取卡列表
				Indicator.open('加载中...');
				this.loading = true;
				axios.get(apis.urls.cardsList)
				.then((response) => {
					Indicator.close();
					this.list = apis.pures.pureCardList(response.data.data);
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
				});
			},
			edit (item) {
				MessageBox.prompt('请输入卡昵称').then(({ value, action }) => {
					if (action === 'confirm') {
						axios.post(apis.urls.editCardNick + '/' + item.id + '/nick_name', {nick_name: value})
						.then((response) => {
							item.nick_name = value;
							Toast({
								message: '修改成功！',
								iconClass: 'mintui mintui-success'
							});
						})
						.catch((error) => {
							apis.errors.errorPublic(error.response, this);
						});
					}
				});
			}
		},
		components: {
			[Indicator.name]: Indicator,
			[MessageBox.name]: MessageBox,
			[Toast.name]: Toast
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.card-list .package-list-btn .mint-button {
		border-radius: 0.2rem;
		width: 80%;
		margin: 0.3rem auto;
	}
	.card-list {
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
	}
</style>
