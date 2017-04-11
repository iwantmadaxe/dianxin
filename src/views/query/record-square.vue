<template>
	<div class="record-square">
		<div class="title">
			{{item.package_name}}
		</div>
		<div class="context">
			<div class="intro one-line">
				有效期至：{{item.end_time}}
			</div>
		</div>
		<div class="topic one-line">
			<span class="num">合计：<i class="unit">{{item.package_price}}元</i></span>
			<span class="time">{{item.start_time}}</span>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'record-square',
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
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.record-list .record-square {
		&:first-child {
	    	margin: 0.15rem auto 0;
	    }
	    &:last-child {
	    	margin: 0.1rem auto;
	    }
	}
	.record-square {
		width: 90%;
		margin: 0.1rem auto 0;
	    background: $color-white;
	    border-radius: 0.05rem;
	    -webkit-border-radius: 0.05rem;
	    position: relative;
		.title {
			width: 100%;
			font-size: $square-title;
			color: $color-gray-dx;
			height: 0.32rem;
			line-height: 0.32rem;
			text-align: left;
			padding: 0 0.2rem 0 0.14rem;
		}
		.topic {
			width: 100%;
			text-align: left;
			font-size: $price;
			color: $color-black;
			height: 0.36rem;
			line-height: 0.36rem;
			padding: 0 0.2rem 0 0.14rem;
			.num {
				color: $color-gray-dx;
				width: 50%;
				display: block;
				float: left;
				font-size: $normal-text;
				.unit {
					color: $color-text;
				    font-style: normal;
				    font-size: $page-title;
				}
			}
			.time {
				color: $color-gray-dx;
				width: 50%;
				display: block;
				float: left;
				text-align: right;
				font-size: $normal-text;
			}
		}
		.context {
			width: 100%;
			text-align: left;
			height: 0.3rem;
			line-height: 0.3rem;
			color: $color-gray-dx;
			padding: 0 0.2rem 0 0.14rem;
			border-bottom: 0.01rem dashed $border-gray;
			.intro {
			}
		}
	}
</style>
