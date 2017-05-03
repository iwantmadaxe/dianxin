<template>
	<div class="record-list">
		<p class="title">记录</p>
		<record-square v-for="item in data" :item="item"></record-square>
		<div v-show="data.length === 0" class="list-null">
			暂无记录!
		</div>
	</div>
</template>
<script>
	import RecordSquare from '../../views/query/record-square.vue';
	import { Indicator } from 'mint-ui';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'package-square',
		data () {
			return {
				id: '',
				token: '',
				data: [
					{}
				]
			};
		},
		created () {
			Indicator.open('加载中...');
			// 获取订单号
			this.id = this.$route.params.id;
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			axios.get(apis.urls.flowRecord, {params: {card_id: this.id}})
			.then((response) => {
				this.data = response.data.data;
				Indicator.close();
			})
			.catch((error) => {
				Indicator.close();
				apis.errors.errorPublic(error.response, this);
				return false;
			});
		},
		props: {
			item: {
				default: function () {
					return {
					};
				}
			}
		},
		components: {
			[RecordSquare.name]: RecordSquare,
			[Indicator.name]: Indicator
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.record-list {
		.title {
			margin: 0.1rem auto 0;
			width: 90%;
			text-align: left;
			height: 0.24rem;
			line-height: 0.24rem;
			font-size: $page-title;
			color: $color-gray-dx;
		}
	}
	.list-null {
		margin-top: 0.1rem;
		height: 0.24rem;
		line-height: 0.24rem;
	}
</style>
