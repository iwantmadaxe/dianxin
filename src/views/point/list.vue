<template>
	<div class="point-list">
		<ul
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="5">
			<li v-for="item in list">
				<div class="list-row cl-fx">
					<div class="left-half">
						<p class="title">{{item.title}}</p>
						<p class="time">{{item.time}}</p>
					</div>
					<div class="right-half">
						{{item.num}}
					</div>
				</div>
			</li>
		</ul>
		<p v-show="loading" class="page-infinite-loading">
			<mt-spinner type="fading-circle"></mt-spinner>
			暂无更多
		</p>
	</div>
</template>
<script>
	import { InfiniteScroll, Indicator, Spinner } from 'mint-ui';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'point-list',
		data () {
			return {
				token: '',
				loading: false,
				allLoaded: false,
				list: [
					{
						title: '积分兑换',
						time: '今天17:39',
						num: '-100'
					},
					{
						title: '积分兑换',
						time: '今天17:39',
						num: '-100'
					},
					{
						title: '积分兑换',
						time: '今天17:39',
						num: '-100'
					},
					{
						title: '积分兑换',
						time: '今天17:39',
						num: '-100'
					},
					{
						title: '积分兑换',
						time: '今天17:39',
						num: '-100'
					},
					{
						title: '积分兑换',
						time: '今天17:39',
						num: '-100'
					},
					{
						title: '积分兑换',
						time: '今天17:39',
						num: '-100'
					},
					{
						title: '积分兑换',
						time: '今天17:39',
						num: '-100'
					},
					{
						title: '积分兑换',
						time: '今天17:39',
						num: '-100'
					},
					{
						title: '积分兑换',
						time: '今天17:39',
						num: '-100'
					},
					{
						title: '积分兑换',
						time: '今天17:39',
						num: '-100'
					},
					{
						title: '积分兑换',
						time: '今天17:39',
						num: '-100'
					}
				]
			};
		},
		directives: {
			InfiniteScroll
		},
		created () {
			document.body.style.backgroundColor = '#ffffff';
			Indicator.open('加载中...');
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			axios.get(apis.urls.userProfile)
			.then((response) => {
				Indicator.close();
			})
			.catch((error) => {
				Indicator.close();
				apis.errors.errorPublic(error.response, this);
				return false;
			});
		},
		methods: {
			loadMore () {
				this.loading = true;
				setTimeout(() => {
					let last = this.list[this.list.length - 1];
					for (let i = 1; i <= 10; i++) {
						this.list.push(last + i);
					}
					this.loading = false;
				}, 2500);
			}
		},
		components: {
			[Indicator.name]: Indicator,
			[Spinner.name]: Spinner
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.point-list {
		.list-row {
			padding: 0.12rem 5.55% 0.12rem 0;
			width: 95%;
			margin-left: 5%;
			border-bottom: 1px solid #e6e6e6;
			.left-half {
				text-align: left;
				line-height: 0.2rem;
				width: 50%;
				float: left;
				.title {
					font-size: $result-text;
					color: $color-text;
				}
				.time {
					font-size: $normal-text;
					color: $color-context-title;
				}
			}
			.right-half {
				text-align: right;
				line-height: 0.4rem;
				width: 50%;
				float: left;
				font-size: $result-text;
				color: $color-text;
			}
		}
	}
</style>
