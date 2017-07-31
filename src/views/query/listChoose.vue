<template>
	<div class="card-list-choose">
		<div class="title">
			选择卡
		</div>
		<table class="card-list-con"  v-show="list.length !== 0">
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
				<td class="check" @click="checkCard(item.id)">
					查看此卡
				</td>
			</tr>
		</table>
		<div class="no-data" v-show="list.length === 0">
			暂无信息
		</div>
	</div>
</template>

<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { Navbar, TabItem, TabContainer, TabContainerItem, Indicator, Button } from 'mint-ui';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'card-list-choose',
		data () {
			return {
				token: '',
				list: []
			};
		},
		created () {
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			// 获取卡列表
			this.fetchData();
		},
		beforeDestroy () {
			Indicator.close();
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
			checkCard (id) {
				this.$router.push({name: 'RecordList', params: {id: id}});
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
	
	.card-list-choose .package-list-btn .mint-button {
		border-radius: 0.2rem;
		width: 80%;
		margin: 0.3rem auto;
	}
	.card-list-choose {
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
	.card-list-con {
		width: 100%;
		background: $color-white;
		border-top: 1px solid $color-gray;
		tr {
			height: 0.32rem;
			line-height: 0.32rem;
			border-bottom: 1px solid $color-gray;
			.check {
				color: $color-blue;
			}
		}
	}
	.no-data {
		font-size: $square-title;
	}
</style>
