<template>
	<div class="binding-square">
		<div v-show="item.choose" class="choose-icon">
		</div>
		<div class="title">
			{{item.name?item.name:'暂无'}}
		</div>
		<div class="context cl-fx">
			<div class="ope one-line" @click="promptNickname">
				修改昵称
			</div>
			<div class="ope one-line">
				查询流量
			</div>
			<div v-if="item.status" class="status one-line fr">
				<img class="icon" src="../../assets/images/binding/renzheng.png">
				<span class="text">已认证</span>
			</div>
			<div v-else class="status one-line fr">
				<mt-button size="small">认证</mt-button>
			</div>
		</div>
	</div>
</template>
<script>
	import { Button, MessageBox } from 'mint-ui';

	export default {
		name: 'binding-square',
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
			promptNickname () {
				MessageBox.prompt('请输入新昵称').then(({ value, action }) => {
					if (value) {
						this.item.name = value;
						MessageBox.alert(`你的新昵称是 ${value}`, '设置昵称成功');
					}
				});
			}
		},
		components: {
			[Button.name]: Button,
			[MessageBox.name]: MessageBox
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.binding-list .binding-square {
		&:first-child {
	    	margin: 0.15rem auto 0;
	    }
	    &:last-child {
	    	margin: 0.1rem auto;
	    }
	}
	.binding-square {
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
			font-size: $price;
			color: $color-gray-dx;
			height: 0.36rem;
			line-height: 0.36rem;
			text-align: left;
			border-bottom: 0.01rem dashed $border-gray;
		}
		.context {
			width: 100%;
			text-align: left;
			height: 0.54rem;
			padding: 0.1rem 0;
			line-height: 0.3rem;
			color: $color-gray-dx;
			.ope {
				width: auto;
				float: left;
				margin-right: 0.2rem;
			}
			.status {
				.icon {
					width: 0.14rem;
					height: 0.14rem;
					display: block;
					float: left;
					margin-right: 0.06rem;
					margin-top: 0.06rem;
				}
				.text {

				}
			}
		}
	}
</style>
