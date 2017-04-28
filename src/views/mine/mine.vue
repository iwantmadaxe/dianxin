<template>
	<div class="mine">
		<div class="company-achievement" @click="goMineInfo">
			<div class="topic-row">
				<img class="topic-icon" src="../../assets/images/mine/default-avatar.png">
				<div class="topic-text-con cl-fx">
					<p class="topic-text">{{mine.name?mine.name:'暂无'}}</p>
					<p class="topic-text-small">修改个人资料</p>
				</div>
			</div>
		</div>
		<div class="list-con">
			<div class="mine-list-row" @click="goEditPhone">
				<img class="left-icon" src="../../assets/images/login/phone.png">
				<div class="list-row-context">
					<span class="title">修改手机号</span>
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
			<div class="mine-list-row" @click="goEditPassword">
				<img class="left-icon" src="../../assets/images/login/password.png">
				<div class="list-row-context">
					<span class="title">修改密码</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
			<div class="mine-list-row" @click="goCert">
				<img class="left-icon" src="../../assets/images/login/msg.png">
				<div class="list-row-context">
					<span class="title">实名认证</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
		</div>
		<div class="logout-row" @click="logout">
			退出登录
		</div>
		<!-- 底部栏 -->
		<boss-bottom-pannel tab-selected="mine"></odin-bottom-pannel>
	</div>
</template>
<script>
	import { Indicator, Button, MessageBox } from 'mint-ui';
	import BottomPannel from '../share-template/bottom-pannel.vue';
	import { saveLocal, readLocal } from '../../utils/localstorage.js';
	import apis from '../../apis';
	import axios from 'axios';
	import localLogout from '../../services/logout.js';

	export default {
		name: 'mine',
		data () {
			return {
				token: '',
				isLogin: false,
				mine: {
					area: {},
					name: ''
				}
			};
		},
		created () {
			Indicator.open('加载中...');
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			let mineCache = readLocal('mine');
			if (mineCache) {
				this.mine = mineCache;
				this.$nextTick(() => {
					Indicator.close();
				});
			} else {
				axios.get(apis.urls.userProfile)
				.then((response) => {
					this.mine = response.data.data;
					saveLocal('mine', this.mine);
					Indicator.close();
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
				});
			}
		},
		methods: {
			goCert () {
				this.$router.push({name: 'CertList'});
			},
			goEditPhone () {
				this.$router.push({name: 'EditPhone'});
			},
			goMineInfo () {
				this.$router.push({name: 'MineInfo'});
			},
			goEditPassword () {
				this.$router.push({name: 'EditPassword'});
			},
			goMineInfoEdit () {
				this.$router.push({name: 'MineInfoEdit'});
			},
			goMsgCenter () {

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
			[BottomPannel.name]: BottomPannel,
			[Button.name]: Button,
			[MessageBox.name]: MessageBox,
			[Indicator.name]: Indicator
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.mine {
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
						font-size: $page-title;
						color: $color-text;
						text-align: left;
						margin-left: 0.15rem;
						display: block;
						width: 100%;
						margin-top: 0.1rem;
					}
					.topic-text-small {
						font-size: $normal-text;
						color: $color-gray-dx;
						text-align: left;
						margin-left: 0.15rem;
						display: block;
						width: 100%;
					}
				}
			}
			.context {

			}
		}
		.logout-row {
			height: 0.45rem;
			line-height: 0.45rem;
			font-size: $page-title;
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
				    width: auto;
				    display: block;
				    margin: 0.16rem 0.1rem 0 0.1rem;
				    height: 0.14rem;
				}
				.list-row-context {
					-webkit-box-flex: 1;
					-ms-flex: 1;
					flex: 1;
					text-align: left;
					position: relative;
					.title{
						font-size: $page-title;
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
