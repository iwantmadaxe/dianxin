<template>
	<div class="package-square" @click="choose">
		<div v-show="item.choose" class="choose-icon">
		</div>
		<div class="title">
			{{item.name}}
		</div>
		<div class="topic one-line">
			<span class="num">{{item.price}}</span>
			<span class="unit">元</span>
		</div>
		<div class="context">
			<div class="intro one-line">
				套餐内容：{{item.instruction?item.instruction:'暂无'}}
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'package-square',
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
			}
		},
		methods: {
			choose () {
				let _this = this;
				if (_this.item.choose) {
					_this.item.choose = false;
				} else {
					_this.item.choose = true;
				}
			}
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.package-list .package-square {
		&:first-child {
	    	margin: 0.15rem auto 0;
	    }
	    &:last-child {
	    	margin: 0.1rem auto;
	    }
	}
	.package-square {
		width: 90%;
		margin: 0.1rem auto 0;
	    background: $color-white;
	    padding: 0 0.2rem 0 0.14rem;
	    border-radius: 0.05rem;
	    -webkit-border-radius: 0.05rem;
	    border-left: 0.08rem solid $color-blue;
	    position: relative;
	    .choose-icon {
			width: 0.32rem;
			height: 0.3rem;
			background-image: url('../../assets/images/package/choose-icon.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			position: absolute;
			right: 0;
			top: 0;
	    }
		.title {
			width: 100%;
			font-size: $package-title;
			color: $color-gray-dx;
			height: 0.32rem;
			line-height: 0.32rem;
			text-align: left;
		}
		.topic {
			width: 100%;
			text-align: left;
			font-size: $price;
			color: $color-black;
			height: 0.36rem;
			line-height: 0.36rem;
			border-bottom: 0.01rem dashed $border-gray;
			.num {
				color: $color-black;
			}
			.unit {
				color: $color-black;
			}
		}
		.context {
			width: 100%;
			text-align: left;
			height: 0.3rem;
			line-height: 0.3rem;
			color: $color-gray-dx;
			.intro {
			}
		}
	}
</style>
