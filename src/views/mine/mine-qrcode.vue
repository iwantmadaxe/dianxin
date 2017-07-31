<template>
	<div class="mine-qrcode input-field-con">
		<p class="mine-qrcode-p">推荐二维码：</p>
		<img class="mine-qrcode-img" v-bind:src="user.url" v-show="user.url">
	</div>
</template>
<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { Indicator } from 'mint-ui';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'mine-qrcode',
		data () {
			return {
				token: '',
				user: {
					points: null,
					url: ''
				},
				valid: {
					msg: '',
					ok: true
				}
			};
		},
		created () {
			Indicator.open('加载中...');
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			this.user.url = this.$route.query.img;
			if (!this.user.url) {
				this.getQrcode();
			} else {
				this.$nextTick(function () {
					Indicator.close();
				});
			}
		},
		methods: {
			getQrcode () {
				let url = window.location.href;
				axios.get(apis.urls.getQrcode, {params: {url: url}})
				.then((response) => {
					this.user = response.data.data;
					Indicator.close();
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
				});
			}
		},
		components: {
			[Indicator.name]: Indicator
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.mine-qrcode {
		.mine-qrcode-p {
		    height: auto;
		    line-height: 24px;
		    font-size: 0.16rem;
		    width: 100%;
		    padding: 0 5%;
		    text-align: left;
		    padding: 10px 5%;
		}
		.mine-qrcode-img {
			width: 80%;
			display: block;
			margin: 0 auto;
		}
	}
</style>
