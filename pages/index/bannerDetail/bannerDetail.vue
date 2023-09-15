<template>
	<view>
		学校简介
	</view>
</template>

<script setup>
	import {
		useRouter
	} from 'vue-router'
	import {onLoad} from '@dcloudio/uni-app'
	const router = useRouter()
	onLoad((e) => {
		console.log(e);
	})
</script>

<style>

</style>