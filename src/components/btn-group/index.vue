<template>
		<div class="btn-group">
		      <span class="btn-list"
		            :class="{'active':index===zIndex}"
		            v-for="(item,index) in btns" :key="index"
		            @click="tabBtn(index)"
		      >{{item.btnText}} <i>({{item.num}})</i>  </span>
   		 </div>
</template>

<script>
	export default{
		data(){
			 return{
			 }
		},
		props:{
			btns:Array,
			zIndex:Number
		},
		methods:{
			tabBtn(index,status=''){
				this.$emit('selectBtn',index);
			}
		}
	}
</script>

<style scoped lang="scss">
.btn-group{
  .btn-list{
    display: inline-block;
    width: 120px;
    text-align: center;
    line-height: 34px;
    margin-right: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    &.active{
      background: #409EFF;
      color: #fff;
      border: 1px solid #409EFF;
    }
  }
}
</style>
