<template>
	<div class="query-data">
		<div class="query-data-con cl-fx">
			<div v-show="item.choose" class="choose-icon">
			</div>
			<div class="title">
				{{item.name}}卡号：{{data.card_number}}
			</div>
			<div class="context cl-fx">
				<span class="last">剩余 {{data.remained}}MB</span>
				<span class="total">总量 {{data.total}}MB</span>
			</div>
			<div class="context cl-fx">
				<div class="progess">
					<mt-progress :value="data.rate" :barHeight="8">
	<!-- 				  <div slot="start">0%</div>
					  <div slot="end">100%</div> -->
					</mt-progress>
				</div>
			</div>
		</div>
		<div class="query-data-btn">
			<mt-button size="large" type="primary" @click="goBuyFlow">购买流量</mt-button>
		</div>
	</div>
</template>
<script>
	import { Progress, Indicator, Button } from 'mint-ui';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'package-square',
		data () {
			return {
				id: '',
				token: '',
				data: {
					total: '',
					used: '',
					remained: '',
					card_number: '',
					rate: 0
				}
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
		created () {
			Indicator.open('加载中...');
			this.id = this.$route.params.id;
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			axios.get(apis.urls.flowCheck, {params: {card_id: this.id}})
			.then((response) => {
				this.data = apis.pures.pureQueryData(response.data.data);
				this.data.rate = 100 - this.data.rate;
				Indicator.close();
			})
			.catch((error) => {
				Indicator.close();
				apis.errors.errorPublic(error.response, this);
				return false;
			});
		},
		methods: {
			goBuyFlow () {
				this.$router.push({name: 'BuyFlow'});
			}
		},
		components: {
			[Progress.name]: Progress,
			[Indicator.name]: Indicator,
			[Button.name]: Button
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.query-data  .query-data-btn .mint-button {
		border-radius: 0.2rem;
		width: 80%;
		margin: 0.3rem auto;
	}

	.query-data .query-data-con {
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
		.context {
			width: 100%;
			text-align: left;
			height: auto;
			line-height: 0.3rem;
			.last {
				font-size: $normal-text;
				color: $color-blue;
				width: 50%;
				display: block;
				float: left;
				text-align: left;
			}
			.total {
				font-size: $normal-text;
				color: $color-gray-dx;
				width: 50%;
				display: block;
				float: left;
				text-align: right;
			}
			.progess {
				height: 0.08rem;
				border-radius: 0.05rem;
				overflow: hidden;
				margin-bottom: 0.1rem;
				.mt-progress {
				    height: 0.08rem;
    				line-height: 0.08rem;
				}
			}
		}
	}
</style>
