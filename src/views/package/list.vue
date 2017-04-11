<template>
	<div class="package-list">
		<package-square v-for="item in list" :item="item"></package-square>
		<div class="package-list-btn">
			<mt-button size="large" type="primary" @click="">充值</mt-button>
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
		name: 'package-list',
		data () {
			return {
				token: '',
				list: []
			};
		},
		created () {
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			// 获取套餐列表
			this.fetchData();
		},
		beforeDestroy () {
			// Indicator.close();
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
	
	.package-list .package-list-btn .mint-button {
		border-radius: 0.2rem;
		width: 80%;
		margin: 0.3rem auto;
	}
</style>
