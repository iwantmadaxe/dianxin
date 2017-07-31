<template>
	<div class="exchange-square">
		<div v-show="item.choose" class="choose-icon">
		</div>
		<div class="title">
			{{item.name?item.name:'暂无'}}
		</div>
		<div class="topic one-line">
			<span class="num">消耗积分：{{item.price}}积分</span>
			<!-- <span class="unit">元</span> -->
		</div>
	</div>
</template>
<script>
	export default {
		name: 'exchange-square',
		data () {
			return {
			};
		},
		props: {
			item: {
				default: function () {
					return {
						choose: null
					};
				}
			},
			list: {
				default: function () {
					return [];
				}
			}
		},
		methods: {
			choose () {
				let _this = this;
				if (_this.item.choose) {
					_this.item.choose = false;
				} else {
					_this.list.map(function (item) {
						item.choose = false;
						return item;
					});
					_this.item.choose = true;
				}
			}
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.exchange-square {
		width: 90%;
		margin: 0.1rem auto 0;
	    background: #f5f5f5;
	    padding: 0 0.2rem 0 0.14rem;
	    border-radius: 0.05rem;
	    -webkit-border-radius: 0.05rem;
	    border-left: 0.08rem solid $color-blue;
	    position: relative;
	    .choose-icon {
			width: 0.15rem;
			height: 0.15rem;
			background-image: url('../../assets/images/package/choose-icon.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			position: absolute;
			right: 0;
			top: 0;
	    }
		.title {
			width: 100%;
			font-size: $square-title;
			color: $color-text;
			height: auto;
			line-height: 0.24rem;
			text-align: left;
		}
		.topic {
			width: 100%;
			text-align: left;
			font-size: $square-title;
			color: $color-orange;
			height: 0.24rem;
			line-height: 0.24rem;
		}
	}
</style>
