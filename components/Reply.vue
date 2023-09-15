<template>
	<view class="replyPage" v-if="props.allCommentDetail.length>0">
		<view class="replyTitle" >
			<span>全部回复 ·{{commentNum}}</span>
		</view>
		<view  v-for="item in commentData" :key="item.ID">
			<comment :checkAll="false" :commentData="item" @openAllComent="openAllComent" @showComment="showComment"></comment>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		watch,
		toRefs,
		computed
	} from "vue";
	import comment from "./comment.vue"
	const props = defineProps(["allCommentDetail"])
	const emit = defineEmits(["openAllComent", "showComment"])
	const commentData = ref(props.allCommentDetail)
	const commentNum = computed(()=>{
		if(commentData.value[0]!=undefined){
			return commentData.value[0].child_remarks.length
		}else{
			return 0
		}
	})
	const openAllComent = (id)=>{
		emit("openAllComent",id)
	}
	const showComment = (msg, data)=>{
		emit("showComment",msg, data)
	}
	watch(() => props.allCommentDetail, (newValue,oldValue) => {
		commentData.value = newValue
	})
</script>

<style>
	.replyPage {
		padding: 20rpx;
	}

	.replyTitle {
		width: 100%;
		font-weight: 600;
		text-align: center;
	}
</style>