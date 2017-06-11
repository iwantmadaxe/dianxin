<template>
	<div class="flow-square" @click="choose">
		<div v-show="item.choose" class="choose-icon">
		</div>
		<div class="topic one-line">
			<span class="num">{{item.price}}</span>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'flow-square',
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

	.package-list .flow-square {
		&:first-child {
	    	margin: 0.15rem auto 0;
	    }
	    &:last-child {
	    	margin: 0.1rem auto;
	    }
	}
	.flow-square {
		margin: 0.1rem 0 0;
	    background: $color-light-gray-bg;
	    padding: 0 0.2rem 0 0.14rem;
	    border-radius: 0.05rem;
	    -webkit-border-radius: 0.05rem;
	    border-left: 0.08rem solid $color-blue;
	    position: relative;
	    .choose-icon {
			width: 0.2rem;
			height: 0.2rem;
			background-image: url('../../assets/images/package/choose-icon.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			position: absolute;
			right: 0;
			top: 0;
	    }
		.topic {
			width: 100%;
			text-align: left;
			font-size: $price;
			color: $color-black;
			height: 0.36rem;
			line-height: 0.36rem;
			.num {
				color: $color-black;
			}
			.unit {
				color: $color-black;
			}
		}
	}
</style>
