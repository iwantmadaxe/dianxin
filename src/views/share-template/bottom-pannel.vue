<template>
	<div class="bottom-bar-pannel">
		<mt-tabbar v-model="currentTabSelected" :fixed="fixed">
			<mt-tab-item id="home" @click.native="goPath('home')">
				<img slot="icon" v-if="currentTabSelected === 'home'" src="../../assets/images/tab-bars/home-confirm.png">
				<img slot="icon" v-else src="../../assets/images/tab-bars/home.png">
				首页
			</mt-tab-item>
			<mt-tab-item id="enroll" @click.native="goPath('PackageList')">
				<img slot="icon" v-if="currentTabSelected === 'enroll'" src="../../assets/images/tab-bars/list-confirm.png">
				<img slot="icon" v-else src="../../assets/images/tab-bars/list.png">
				套餐列表
			</mt-tab-item>
			<mt-tab-item id="shoppingcart" @click.native="goPath('QueryData')">
				<img slot="icon" v-if="currentTabSelected === 'shoppingcart'" src="../../assets/images/tab-bars/data-confirm.png">
				<img slot="icon" v-else src="../../assets/images/tab-bars/data.png">
				消费记录
			</mt-tab-item>
			<mt-tab-item id="mine" @click.native="goPath('mine')">
				<img slot="icon" v-if="currentTabSelected === 'mine'" src="../../assets/images/tab-bars/my-confirm.png">
				<img slot="icon" v-else src="../../assets/images/tab-bars/my.png">
				我的
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	import { Tabbar, TabItem } from 'mint-ui';

	export default {
		name: 'boss-bottom-pannel',
		props: {
			tabSelected: {
				default: 'home'
			}
		},
		data () {
			return {
				currentTabSelected: this.tabSelected,
				fixed: true
			};
		},
		watch: {
			tabSelected (val) {
				this.currentTabSelected = val;
			}
		},
		components: {
			[Tabbar.name]: Tabbar,
			[TabItem.name]: TabItem
		},
		methods: {
			goPath (place) {
				// 跳转<>
				if (place === 'home') {
					this.$router.push({name: 'Index'});
					return false;
				}
				// 跳转<>
				if (place === 'PackageList') {
					this.$router.push({name: 'PackageListChoose'});
					return false;
				}
				// 跳转<>
				if (place === 'QueryData') {
					this.$router.push({name: 'QueryDataChoose'});
					return false;
				}
				// 跳转<>
				if (place === 'mine') {
					this.$router.push({name: 'Mine'});
					return false;
				}

				return true;
			}
		}
	};
</script>

<style scoped lang="scss">
	@import '../../assets/sass/partials/_var.scss';

	/* .bottom-bar-pannel{
		height: 0.55rem;
	} */
	.bottom-bar-pannel .mint-tabbar > .mint-tab-item.is-selected {
	}
</style>
