<template>
	<div class="point-exchange-list">
		<ul
			v-show="list.data.length !== 0"
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="5">
			<li v-for="item in list.data">
				<div class="list-row cl-fx">
					<div class="left-half">
						<p class="title">{{item.point}}</p>
						<p class="time">{{item.created_at}}</p>
					</div>
					<div class="right-half">
						{{item.type}}
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
	import { InfiniteScroll, Indicator, Spinner, MessageBox } from 'mint-ui';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'point-exchange-list',
		data () {
			return {
				token: '',
				loading: false,
				allLoaded: false,
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
		directives: {
			InfiniteScroll
		},
		created () {
			Indicator.open('加载中...');
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			this.loadPage(1);
		},
		methods: {
			loadMore () {
				this.loading = true;
				if (this.page + 1 >= this.list.meta.pagination.total_pages && this.list.meta.pagination.total_pages > 1) {
					MessageBox.alert('暂无更多！', '提示');
					return false;
				} else {
					this.loadPage(this.page + 1);
				}
				// setTimeout(() => {
				// 	let last = this.list[this.list.length - 1];
				// 	for (let i = 1; i <= 10; i++) {
				// 		this.list.push(last + i);
				// 	}
				// 	this.loading = false;
				// }, 2500);
			},
			loadPage (p) {
				axios.get(apis.urls.pointList, {params: {page: p}})
				.then((response) => {
					this.list.meta = response.data.meta;
					this.list.data = this.list.data.concat(response.data.data);
					Indicator.close();
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
					return false;
				});
			}
		},
		components: {
			[Indicator.name]: Indicator,
			[Spinner.name]: Spinner,
			[MessageBox.name]: MessageBox
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.point-exchange-list {
		background: #fff;
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
	.page-infinite-loading {
		padding: 10px 0;
	}
</style>
