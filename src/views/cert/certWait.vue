<template>
	<div class="cert-wait cert-result input-field-con cl-fx">
		<img class="result-img" src="../../assets/images/cert/result-wait.png">
		<p class="p1">实名认证已提交</p>
		<p class="p2">认证中...请您耐心等待</p>
	</div>
</template>
<script>

	export default {
		name: 'cert-wait',
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
