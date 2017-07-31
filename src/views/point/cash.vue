<template>
	<div class="point-cash">
		<div class="check-status" v-show="status === 1">
			<p class="check-text">当前状态：{{statusName}}</p>
			<p class="check-text">所属银行：{{showDetail.card_bank}}</p>
			<p class="check-text">银行卡号：{{showDetail.card_no}}</p>
			<p class="check-text">持卡人：{{showDetail.card_owner}}</p>
			<p class="check-text">联系电话：{{showDetail.card_owner_phone}}</p>
			<p class="check-text">使用积分：{{showDetail.consume_points}}</p>
			<p class="check-text">提现金额：{{showDetail.exchange_money}}</p>
			<div class="point-cash-btn">
				<mt-button size="small" type="primary" @click="goBack">返回</mt-button>
			</div>
		</div>
		<div class="point-cash-con cl-fx" v-show="status !== 1">
			<div class="check-status">
				<p class="check-text">当前状态：{{statusName}}</p>
			</div>
			<div class="post-field-con">
				<p class="cash-now">兑换规则：<span class="point-num">{{rule.description?rule.description:'暂无'}}</span></p>
				<p class="cash-now">当前可用积分：<span class="point-num">{{points?points + '分':'暂无'}}</span></p>
				<div class="mt-field-con">
					<mt-field @change="getCash(data.points)" label="提现积分：" type="number" v-model="data.points" placeholder="输入提现积分"></mt-field>
				</div>
				<p class="cash-now">使用的积分：<span class="point-num">{{getPoints.used_points?getPoints.used_points + '分':'暂无'}}</span></p>
				<p class="cash-now">换取的金额：<span class="point-num">{{getPoints.money?getPoints.money + '元':'暂无'}}</span></p>
				<div class="mt-field-con">
					<mt-field label="所属银行：" type="text" v-model="data.card_bank" placeholder="输入所属银行"></mt-field>
				</div>
				<div class="mt-field-con">
					<mt-field label="银行卡号：" type="text" v-model="data.card_no" placeholder="输入银行卡号"></mt-field>
				</div>
				<div class="mt-field-con">
					<mt-field label="持卡人：" type="text" v-model="data.card_owner" placeholder="输入持卡人"></mt-field>
				</div>
				<div class="mt-field-con">
					<mt-field label="联系电话：" type="text" v-model="data.card_owner_phone" placeholder="输入联系电话"></mt-field>
				</div>
			</div>
			<div class="point-cash-btn">
				<mt-button size="small" type="primary" @click="postOrder">确定提现</mt-button>
			</div>
		</div>
	</div>
</template>
<script>
	import { Progress, Indicator, Button, Field, MessageBox, Toast } from 'mint-ui';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { readLocal, saveLocal } from '../../utils/localstorage.js';
	import { requiredMe } from '../../utils/valids.js';

	export default {
		name: 'point-cash',
		data () {
			return {
				token: '',
				data: {
					points: null,
					card_bank: null,
					card_no: null,
					card_owner: null,
					card_owner_phone: null
				},
				valid: {
					msg: '',
					ok: true
				},
				points: '',
				getPoints: {
					used_points: '',
					money: ''
				},
				showDetail: {
					card_bank: '',
					card_no: '',
					card_owner: '',
					card_owner_phone: '',
					consume_points: '',
					exchange_money: ''
				},
				status: null,
				statusName: null,
				rule: {
					description: null,
					points: null
				}
			};
		},
		created () {
			Indicator.open('加载中...');
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			this.getPoint();
			// 获取兑换规则
			axios.get(apis.urls.pointRule)
			.then((response) => {
				Indicator.close();
				this.rule = {
					description: response.data.data.description,
					points: response.data.data.points
				};
			})
			.catch((error) => {
				Indicator.close();
				apis.errors.errorPublic(error.response, this);
				return false;
			});
			// 积分提现状况 控制页面状态 待处理，已处理，已拒绝
			axios.get(apis.urls.pointGetCash)
			.then((response) => {
				console.log(response.data);
				if (!response.data) {
					this.status = 0;
					this.statusName = '暂未提交';
				} else {
					this.status = response.data.data.status;
					this.statusName = response.data.data.status_name;
					this.showDetail = response.data.data;
				}
			})
			.catch((error) => {
				apis.errors.errorPublic(error.response, this);
				return false;
			});
		},
		methods: {
			getPoint (points) {
				axios.get(apis.urls.userProfile)
				.then((response) => {
					this.points = response.data.data.points;
					saveLocal('mine', response.data.data);
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
				});
			},
			getCash (points) {
				if (this.data.points <= 0) {
					this.valid.msg = '提现积分必须大于零！';
					this.valid.ok = false;
					MessageBox.alert('提现积分必须大于零！', '提示');
					return false;
				}
				if (this.data.points > parseInt(this.points)) {
					this.valid.msg = '提现积分不足！';
					this.valid.ok = false;
					MessageBox.alert('提现积分不足！', '提示');
					return false;
				}
				if (isNaN(this.data.points)) {
					this.valid.msg = '请输入正确的提现积分！';
					this.valid.ok = false;
					MessageBox.alert('请输入正确的提现积分！', '提示');
					return false;
				}
				points = Number(points);
				axios.get(apis.urls.pointCountMoney, {params: {points: points}})
				.then((response) => {
					this.getPoints = response.data.data;
					this.data.points = response.data.data.used_points;
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
				});
			},
			goBack () {
				this.$router.push({name: 'PointCenter'});
			},
			postOrder () {
				if (!requiredMe(this.data.points)) {
					this.valid.msg = '请输入提现积分！';
					this.valid.ok = false;
					MessageBox.alert('请输入提现积分！', '提示');
					return false;
				}
				if (this.data.points <= 0) {
					this.valid.msg = '提现积分必须大于零！';
					this.valid.ok = false;
					MessageBox.alert('提现积分必须大于零！', '提示');
					return false;
				}
				if (this.data.points > parseInt(this.points)) {
					this.valid.msg = '提现积分不足！';
					this.valid.ok = false;
					MessageBox.alert('提现积分不足！', '提示');
					return false;
				}
				if (isNaN(this.data.points)) {
					this.valid.msg = '请输入正确的提现积分！';
					this.valid.ok = false;
					MessageBox.alert('请输入正确的提现积分！', '提示');
					return false;
				}
				if (!requiredMe(this.data.card_bank)) {
					this.valid.msg = '请输入所属银行！';
					this.valid.ok = false;
					MessageBox.alert('请输入所属银行！', '提示');
					return false;
				}
				if (!requiredMe(this.data.card_no)) {
					this.valid.msg = '请输入银行卡号！';
					this.valid.ok = false;
					MessageBox.alert('请输入银行卡号！', '提示');
					return false;
				}
				if (!requiredMe(this.data.card_owner)) {
					this.valid.msg = '请输入持卡人！';
					this.valid.ok = false;
					MessageBox.alert('请输入持卡人！', '提示');
					return false;
				}
				if (!requiredMe(this.data.card_owner_phone)) {
					this.valid.msg = '请输入联系电话！';
					this.valid.ok = false;
					MessageBox.alert('请输入联系电话！', '提示');
					return false;
				}
				let tpl = {
					points: Number(this.data.points),
					card_bank: this.data.card_bank,
					card_no: this.data.card_no,
					card_owner: this.data.card_owner,
					card_owner_phone: this.data.card_owner_phone
				};
				axios.post(apis.urls.pointCashApply, tpl)
				.then((response) => {
					if (response.data.message === 'success') {
						Toast({
							message: '已提交！',
							iconClass: 'mintui mintui-success'
						});
						this.$router.push({name: 'PointCenter'});
					}
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
					return false;
				});
			}
		},
		components: {
			[Progress.name]: Progress,
			[Indicator.name]: Indicator,
			[Field.name]: Field,
			[Button.name]: Button,
			[MessageBox.name]: MessageBox,
			[Toast.name]: Toast
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.point-cash {
		background: #fff;
		padding-bottom: 20px;
		.check-status {
			.check-text {
				font-size: $square-title;
				padding: 10px 5%;
				text-align: left;
			}
		}
		.post-field-con {
			padding: 0.2rem 0 1.2rem;
			background-image: url('../../assets/images/flow/bg.png');
			background-size: 90% auto;
			background-repeat: no-repeat;
			background-position: bottom center;
			.cash-now {
				margin: 0.12rem 0;
				font-size: $normal-text;
				color: $color-black;
				text-align: left;
				padding: 0 5%;
				.cash-num {
					color: $color-orange;
				}
			}
			.mint-cell-title {
				width: 1rem;
				text-align: left;
			}
			.mint-cell-text {
				font-size: $result-text;
			}
			.mint-cell-wrapper {
				width: 90%;
				min-width: 2.4rem;
				margin: 0 auto;
				position: relative;
				overflow: hidden;
				padding: 0;
				background-image: none;
			}
			.mint-cell {
				background-image: none;
			}
			.mint-field-core {
				width: 100%;
				height: 0.35rem;
				padding: 0.1rem 0.2rem;
				line-height: 0.15rem;
				font-size: $input-text;
				background: $bg-gray;
			    -webkit-box-flex: none;
			    -ms-flex: none;
			    flex: none;
			    border-radius: 0.05rem;
			}
			.mint-field-other {
				.mint-button  {
					height: 0.35rem;
					line-height: 0.35rem;
					font-size: $input-text;
				}
			}
		}
		.point-cash-btn {
			.mint-button {
				border-radius: 0.2rem;
				margin: 0.2rem auto 0.2rem;
			}
		}
	}
</style>
