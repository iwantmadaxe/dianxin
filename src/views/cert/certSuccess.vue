<template>
	<div class="cert-success cert-result input-field-con cl-fx">
		<img class="result-img" src="../../assets/images/cert/result-success.png">
		<p class="p1">已通过</p>
		<p class="p2">恭喜！您已经通过实名认证</p>
	</div>
</template>
<script>

	export default {
		name: 'cert-success',
		data () {
			return {
				token: ''
			};
		},
		components: {
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';
</style>
