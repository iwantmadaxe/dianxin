<template>
	<div class="mine">
		<div class="company-achievement">
			<div class="topic-row">
				<img class="topic-icon" src="../../assets/images/mine/default-avatar.png">
				<div class="topic-text-con cl-fx">
					<p class="topic-text cl-fx">{{mine.name?mine.name:'暂无'}}  </p>
					<p class="topic-text-small cl-fx">
						<span class="point">积分： {{mine.points}}</span>
						<span class="edit" @click="goMineInfoEdit">修改个人资料</span>
					</p>
				</div>
			</div>
		</div>
		<div class="list-con">
			<div class="mine-list-row" @click="goEditPhone" v-show="hasPhone">
				<img class="left-icon" src="../../assets/images/login/phone.png">
				<div class="list-row-context">
					<span class="title">修改手机号</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
			<div class="mine-list-row" @click="goBindingPhone" v-show="!hasPhone">
				<img class="left-icon" src="../../assets/images/login/phone.png">
				<div class="list-row-context">
					<span class="title">绑定手机号</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
			<div class="mine-list-row" @click="goMsgCenter">
				<img class="left-icon" src="../../assets/images/login/msg.png">
				<div class="list-row-context">
					<span class="title">消息中心</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
			<div class="mine-list-row" @click="goCardList">
				<i class="fa fa-credit-card left-icon-fa" style="margin: 0.15rem 0.08rem 0 0.08rem;"></i>
				<div class="list-row-context">
					<span class="title">我拥有的卡</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
			<div class="mine-list-row" @click="goEditPassword">
				<img class="left-icon" src="../../assets/images/login/password.png">
				<div class="list-row-context">
					<span class="title">修改密码</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
			<div class="mine-list-row" @click="goCert">
				<i class="fa fa-certificate left-icon-fa"></i>
				<div class="list-row-context">
					<span class="title">实名认证</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
			<div class="mine-list-row" @click="goAddressList">
				<i class="fa fa-address-book left-icon-fa"></i>
				<div class="list-row-context">
					<span class="title">我的收货地址</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
			<div class="mine-list-row" @click="goMineQrcode">
				<i class="fa fa-qrcode left-icon-fa"></i>
				<div class="list-row-context">
					<span class="title">推荐二维码</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
			<div class="mine-list-row" @click="goMinePointCenter">
				<i class="fa fa-star left-icon-fa"></i>
				<div class="list-row-context">
					<span class="title">我的积分管理</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
<!-- 			<div class="mine-list-row" @click="goPoint">
				<i class="fa fa-star-o left-icon-fa"></i>
				<div class="list-row-context">
					<span class="title">我的积分</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div> -->
			<div class="logout-row" @click="logout">
				退出登录
			</div>
		</div>
		<!-- 底部栏 -->
		<boss-bottom-pannel tab-selected="mine"></boss-bottom-pannel>
	</div>
</template>
<script>
	import { Indicator, Button, MessageBox } from 'mint-ui';
	import { saveLocal, readLocal } from '../../utils/localstorage.js';
	import apis from '../../apis';
	import axios from 'axios';
	import localLogout from '../../services/logout.js';
	import BottomPannel from '../share-template/bottom-pannel.vue';

	export default {
		name: 'mine',
		data () {
			return {
				token: '',
				isLogin: false,
				mine: {
					area: {},
					name: ''
				},
				hasPhone: false
			};
		},
		created () {
			Indicator.open('加载中...');
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			axios.get(apis.urls.userProfile)
			.then((response) => {
				this.mine = response.data.data;
				if (response.data.data.phone) {
					this.hasPhone = true;
				} else {
					this.hasPhone = false;
				}
				saveLocal('mine', this.mine);
				Indicator.close();
			})
			.catch((error) => {
				Indicator.close();
				apis.errors.errorPublic(error.response, this);
			});
		},
		methods: {
			goCert () {
				this.$router.push({name: 'CertList'});
			},
			goEditPhone () {
				this.$router.push({name: 'EditPhone'});
			},
			goBindingPhone () {
				this.$router.push({name: 'BindPhone'});
			},
			goMineInfoEdit () {
				this.$router.push({name: 'MineInfoEdit'});
			},
			goEditPassword () {
				this.$router.push({name: 'EditPassword'});
			},
			goMineQrcode () {
				this.$router.push({name: 'MineQrcode', query: {img: this.mine.qrcode}});
			},
			goMsgCenter () {
				this.$router.push({name: 'MsgCenter'});
			},
			goCardList () {
				this.$router.push({name: 'CardList'});
			},
			goPoint () {
				this.$router.push({name: 'MyPoint'});
			},
			goAddressList () {
				this.$router.push({name: 'AddressList'});
			},
			goMinePointCenter () {
				this.$router.push({name: 'PointCenter'});
			},
			logout () {
				axios.get(apis.urls.logout)
				.then((response) => {
					if (response.data.data) {
						localLogout();
						MessageBox.alert(response.data.data.message, '提示');
						this.$router.push({name: 'Login'});
					}
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
				});
			}
		},
		components: {
			[Button.name]: Button,
			[MessageBox.name]: MessageBox,
			[Indicator.name]: Indicator,
			[BottomPannel.name]: BottomPannel
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.mine {
		.fa {
			color: #8691a6;
		}
		.company-achievement {
			background: $color-white;
			.topic-row {
				width: 90%;
				margin: 0 auto;
				height: auto;
				line-height: 0.24rem;
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				.topic-icon {
					width: 0.5rem;
					height: 0.5rem;
					border-radius: 50%;
					-webkit-border-radius: 50%;
					overflow: hidden;
					display: block;
					float: left;
					margin: 0.1rem 0.1rem;
				}
				.topic-text-con {
					-webkit-box-flex: 1;
					-ms-flex: 1;
					flex: 1;
					.topic-text {
						font-size: $square-title;
						color: $color-text;
						text-align: left;
						padding-left: 0.15rem;
						display: block;
						width: 100%;
						margin-top: 0.1rem;
					}
					.topic-text-small {
						font-size: $normal-text;
						color: $color-gray-dx;
						text-align: left;
						padding-left: 0.15rem;
						display: block;
						width: 100%;
						.point {
							float: left;
						}
						.edit {
							float: right;
						}
					}
				}
			}
			.context {

			}
		}
		.logout-row {
			height: 0.45rem;
			line-height: 0.45rem;
			font-size: $square-title;
			color: $color-blue;
			margin-top: 0.2rem;
			background: $color-white;
		}
		.list-con {
			margin-top: 0.12rem;
			background: $color-white;
			.mine-list-row {
				height: 0.45rem;
				line-height: 0.45rem;
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				padding-left: 0.1rem;
				&:not(:last-child) .list-row-context {
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
