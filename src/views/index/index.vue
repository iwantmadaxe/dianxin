<template>
	<div class="index">
		<div class="scwrapper">
			<div class="banner-con" v-bind:style="{ height: bannerHeight}">
				<img class="banner-img" src="../../assets/images/index/banner.png">
			</div>
			<div class="service-bg cl-fx">
				<div class="hide">
				</div>
				<div class="service-con cl-fx service-con-border">
					<div @click="goPackageList" class="service-topic-square-con cl-fx" style="border-bottom: 1px solid #e5e5e5;border-right: 1px solid #e5e5e5;">
						<div class="rad service-topic-square">
							<img src="../../assets/images/index/service-square1.png">
						</div>
						<div class="text">
							<p class="topic one-line">套餐列表</p>
							<p class="exp">更多超值优惠套餐</p>
						</div>
					</div>
					<div @click="goFlowCheck" class="service-topic-square-con cl-fx" style="border-bottom: 1px solid #e5e5e5;">
						<div class="rad service-topic-square">
							<img src="../../assets/images/index/service-square2.png">
						</div>
						<div class="text">
							<p class="topic one-line">流量查询</p>
							<p class="exp">看看还剩下多少流量吧</p>
						</div>
					</div>
					<div @click="goFlowRecord" class="service-topic-square-con cl-fx" style="border-right: 1px solid #e5e5e5;">
						<div class="rad service-topic-square">
							<img src="../../assets/images/index/service-square3.png">
						</div>
						<div class="text">
							<p class="topic one-line">消费记录</p>
							<p class="exp">钱都花在哪儿了吧</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 底部栏 -->
		<boss-bottom-pannel tab-selected="home"></boss-bottom-pannel>
	</div>
</template>

<script type="text/javascript">
	import SearchBar from '../../components/searchbar/searchbar.vue';
	import BottomPannel from '../share-template/bottom-pannel.vue';
	import { Swipe, SwipeItem } from 'mint-ui';
	// import apis from '../../apis/index.js';
	// import axios from 'axios';

	export default {
		name: 'dx-index',
		data () {
			return {
				bannerHeight: ''
			};
		},
		created () {
			let _this = this;
			// document.background.color = '#e9ecf5';
			_this.bannerHeight = document.body.clientWidth / 320 * 130 + 'px';
		},
		methods: {
			goServiceDetail (id) {
				this.$router.push({name: 'ServiceList', params: {category_no: id}});
			},
			goPackageList () {
				this.$router.push({name: 'PackageListChoose'});
			},
			goFlowCheck () {
				this.$router.push({name: 'QueryDataChoose'});
			},
			goFlowRecord () {
				this.$router.push({name: 'RecordListChoose'});
			}
		},
		components: {
			SearchBar,
			[BottomPannel.name]: BottomPannel,
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.index {
		padding-bottom: 0.55rem;
	}
	.index .fixedtop{
		display: block;
		position: fixed;
		top: 0;
		width: 100%;
		max-width: 640px;
		transform: translateY(0);
		color: $color-white;
		z-index: 999;
	}
	.index .user-top-nav-shadow {
	    height: 0.46rem;
	    width: 100%;
	    position: absolute;
	    top: 0;
	    background-color: #333;
	    opacity: 0.5;
	}
	.index .user-top-nav .index-search {
	    width: 0.65rem;
	    height: 0.2rem;
	    line-height: 0.2rem;
	    float: right;
	    background: #000;
	    border-radius: 0.2rem;
	    margin: 0.13rem 5% 0 0;
	    text-align: right;
	    padding-right: 0.12rem;
	    background-image: url('../../assets/images/index/mag.png');
	    background-size: 12px 12px;
	    background-repeat: no-repeat;
	    background-position: 8px 4px;
	    color: #fff;
	}
	.index .user-top-nav {
	    height: 0.46rem;
	    width: 100%;
	    position: absolute;
	    top: 0;
	}
	.index .user-top-nav .user-info-con {
		width: 2rem;
	    margin-left: 5%;
	    height: 100%;
	    padding: 0.05rem 0;
	    float: left;
	}
	.index .user-top-nav .user-info-con .user-head {
	    position: relative;
	    width: 0.36rem;
	    height: 0.36rem;
	    float: left;
	}
	.index .user-head img {
	    position: absolute;
	    width: 100%;
	    height: 100%;
	    top: 0;
	    left: 0;
	    display: block;
	}
	.index .user-info-con .user-info {
		float: left;
	    width: 1rem;
	    margin: 0 0 0 0.1rem;
	}
	.index .user-info-con .user-info .user-info-row {
	    height: 0.18rem;
	    line-height: 0.18rem;
	}
	.index .user-info-row .username {
		color: #fff;
	    font-size: $normal-text;
		display: block;
	    float: left;
	}
	.index .user-info-row .level {
	    padding: 0.01rem 0.04rem;
		line-height: 1;
		border-radius: 2px;
		text-align: center;
		color: $color-white;
		font-size: $normal-text;
		background-color: $color-red;
	    margin-left: 0.1rem;
	    margin-top: 0.01rem;
	}
	.index .user-info-row .star {
		width: 0.1rem;
	    display: block;
	    float: left;
	    margin: 0.04rem 0.05rem 0 0;
	}
	.index .banner-con {
		background: #fff;
	    position: relative;
	    height: 1.6rem;
	}
	.index .banner-con .banner-img {
		width: 100%;
		height: 100%;
		display: block;
	}
	.index .servie-title {
	    height: 0.2rem;
	    width: 100%;
	    font-size: $page-title;
	    color: #333;
	    text-align: left;
	    margin: 0.25rem 0 0.05rem;
	    line-height: 0.2rem;
	    padding: 0 5%;
	}
	.index .service-con {
		
	}
	.index .service-bg {
		background: #fff;
		position: relative;
	}
	.index .service-bg .hide{
		background: #fff;
		position: absolute;
		width: 0.4rem;
	    height: 0.4rem;
	    left: 0;
	    right: 0;
	    top: 0;
	    bottom: 0;
	    margin: auto;
	}
	.index .service-con-border {
	    border-top: 0.01rem solid #edefef;
	    border-bottom: 0.01rem solid #edefef;
	}
	.index .service-con .service-icon-square {
	    width: 25%;
	    float: left;
	    padding-top: 0.1rem;
	    padding-bottom: 0.1rem;
	}
	.index .service-con .service-icon-square img {
		display: block;
	    margin: 0 auto;
	    width: 0.22rem;
	}
	.index .service-con .service-icon-square p {
	    width: 100%;
	    font-size: $square-title;
	    color: #333;
	    text-align: center;
	    margin-top: 0.1rem;
	}
	.index .service-con .service-topic-square-con{
		width: 50%;
	    float: left;
        padding: 0.25rem 2% 0.25rem 5%;
	}
	.index .service-con .service-topic-square-con .service-topic-square{
		width: 40px;
	    float: left;
	    margin: 0 4% 0 6%;
	    display: block;
	    position: relative;
	    height: 40px;
	}
	.index .service-topic-square-con img {
	    width: 40px;
	    height: 40px;
	    display: block;
	}
	.index .service-topic-square-con .text {
	    width: 60%;
	    float: left;
	}
	.index .service-topic-square-con .text .topic {
	    font-size: $square-title;
	    color: #111;
	    text-align: left;
	}
	.index .service-topic-square-con .text .exp {
	    font-size: $normal-text;
	    color: $color-gray;
	    text-align: left;
        margin-top: 0.1rem;
        height: 0.28rem;
        line-height: 0.14rem;
	}
	.index .package-select {
	    width: 100%;
	    padding: 0.1rem 0 0;
	    margin: 0.1rem 0 0.2rem;
	    background: #fff;
	}
	.index .package-select .package-topic {
	    width: 1.2rem;
	    margin: 0.05rem auto;
	    position: relative;
	}
	.index .package-select .topic-left-icon {
		display: block;
	    left: 0;
	    width: 0.17rem;
	    top: 0.08rem;
	    position: absolute;
	}
	.index .package-select .topic-right-icon {
	    width: 0.17rem;
	    display: block;
	    right: 0;
	    top: 0.08rem;
	    position: absolute;
	}
	.index .package-select .topic {
	    display: block;
	    width: 100%;
	    height: 0.2rem;
	    line-height: 0.2rem;
	    font-size: $page-title;
	    color: #5a5a5a;
	}
	.index .package-select .package-index {
	    display: block;
	    width: 90%;
	    margin: 0.2rem auto;
	}
</style>
