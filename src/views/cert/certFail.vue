<template>
	<div class="cert-fail cert-result input-field-con cl-fx">
		<img class="result-img" src="../../assets/images/cert/result-fail.png">
		<p class="p1">对不起，实名认证失败了</p>
		<p class="p2">身份信息不匹配，请核对后重新验证</p>
		<div class="btn-register">
			<mt-button size="large" type="primary" @click="backAdd">重新认证</mt-button>
		</div>
	</div>
</template>
<script>
	import { Button } from 'mint-ui';

	export default {
		name: 'cert-fail',
		data () {
			return {
				token: ''
			};
		},
		components: {
			[Button.name]: Button
		},
		methods: {
			backAdd () {
				this.$router.push({name: 'CertAdd'});
			}
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.cert-result {
		.result-img {
			width: 1.6rem;
			display: block;
			margin: 0.4rem auto 0.15rem;
		}
		.p1 {
			font-size: $result-text;
			color: $color-text;
		}
		.p2 {
			margin-top: 0.1rem;
			color: $color-context-title;
			font-size: $normal-text;
		}
	}
</style>
