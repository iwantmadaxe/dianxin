<template>
	<div class="point-center cl-fx">
		<div class="list-con">
			<div class="mine-list-row">
				<div class="list-row-context" @click="goPointList">
					<span class="title">积分明细</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
<!-- 			<div class="mine-list-row">
				<div class="list-row-context" @click="goPointExchange">
					<span class="title">积分兑换</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
			<div class="mine-list-row">
				<div class="list-row-context">
					<span class="title">积分兑换历史记录</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div> -->
			<div class="mine-list-row">
				<div class="list-row-context" @click="goPointCash">
					<span class="title">积分提现</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
<!-- 			<div class="mine-list-row">
				<div class="list-row-context" @click="goPointExchangeList">
					<span class="title">积分提现历史记录</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div> -->
		</div>
	</div>
</template>
<script>
	import { MessageBox, Indicator } from 'mint-ui';

	export default {
		name: 'point-center',
		data () {
			return {
				token: ''
			};
		},
		created () {
		},
		methods: {
			goPointList () {
				this.$router.push({name: 'PointList'});
			},
			goPointExchange () {
				this.$router.push({name: 'PointExchange'});
			},
			goPointCash () {
				this.$router.push({name: 'WithdrawCash'});
			},
			goPointExchangeList () {
				this.$router.push({name: 'PointExchangeList'});
			}
		},
		components: {
			[Indicator.name]: Indicator,
			[MessageBox.name]: MessageBox
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.point-center {
		background: $color-white;
		.fa {
			color: #8691a6;
		}
		.list-con {
			margin-top: 0.12rem;
			.mine-list-row {
				height: 0.45rem;
				line-height: 0.45rem;
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				padding-left: 0.1rem;
				.list-row-context {
					@include border-bottom($color-gray);
				}
				.left-icon {
				    width: 14px;
				    display: block;
				    margin: 0.15rem 0.1rem 0 0.1rem;
				    height: 0.14rem;
				}
				.left-icon-fa {
					font-size: 16px;
					min-width: 14px;
				    display: block;
				    margin: 0.15rem 0.1rem 0 0.1rem;
				    height: 0.14rem;
				}
				.list-row-context {
					-webkit-box-flex: 1;
					-ms-flex: 1;
					flex: 1;
					text-align: left;
					position: relative;
					.title{
						font-size: $square-title;
						color: $color-text;
					}
					.right-icon {
						position: absolute;
						width: 0.07rem;
						height: 0.14rem;
						right: 0.15rem;
						top: 0;
						bottom: 0;
						margin-top: auto;
						margin-bottom: auto;
					}
				}
			}
		}
	}
</style>
