<template>
	<div class="cert-list input-field-con cl-fx">
		<div class="title">
			认证列表
		</div>
		<div class="cert-list-con" v-for="item in list">
			<div class="cert-list-row">
				<div class="cert-id">
					{{item.id?item.id:'暂无'}}
				</div>
				<div class="cert-code">
					{{item.card_code?item.card_code:'暂无'}}
				</div>
				<div class="cert-reason">
					{{item.reason?item.reason:'暂无'}}
				</div>
				<div class="cert-status">
					{{item.status}}
				</div>
			</div>
		</div>
		<div class="btn-register">
			<mt-button size="large" type="primary" @click="goAdd">添加认证</mt-button>
		</div>
	</div>
</template>

<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { Navbar, TabItem, TabContainer, TabContainerItem, Indicator, Button } from 'mint-ui';
	import { readLocal } from '../../utils/localstorage.js';
	import PackageSquare from '../../views/package/package-square.vue';

	export default {
		name: 'cert-list',
		data () {
			return {
				token: '',
				list: []
			};
		},
		created () {
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			// 获取认证列表
			this.fetchData();
		},
		beforeDestroy () {
			// Indicator.close();
		},
		methods: {
			fetchData () {
				// 获取认证列表
				Indicator.open('加载中...');
				this.loading = true;
				axios.get(apis.urls.certList)
				.then((response) => {
					Indicator.close();
					this.list = response.data.data;
					this.list.map(function (item) {
						switch (item.status) {
						case 0:
							item.status = '待审核';
							break;
						case 1:
							item.status = '通过';
							break;
						case 2:
							item.status = '未通过';
							break;
						}
						return item;
					});
					// this.pageInfo.lastPage = response.data.meta.pagination.total_pages;
					// this.pageInfo.currentPage = response.data.meta.pagination.current_page;
					// this.loading = false;
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
					// this.loading = false;
					// this.loadingError = true;
				});
			},
			goAdd () {
				this.$router.push({name: 'CertAdd'});
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
			[PackageSquare.name]: PackageSquare
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';
	
	.cert-list {
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
		.cert-list-con {
			width: 100%;
			border-top: 1px solid $border-gray;
			.cert-list-row {
				width: 100%;
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				height: 0.24rem;
				line-height: 0.24rem;
				border-bottom: 1px solid $border-gray;
				.cert-id {
					width: 0.6rem;
				}
				.cert-code {
					width: 0.6rem;
				}
				.cert-reason {
					-webkit-box-flex: 1;
					-ms-flex: 1;
					flex: 1;
				}
				.cert-status {
					width: 0.6rem;
				}
			}
		}
	}
</style>
