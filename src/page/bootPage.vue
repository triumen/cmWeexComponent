<template>
    <text class="text--normal btn" @click="phoneCall">{{text}}</text>
</template>

<script>
import cm from '../common/util/cmNative';
export default {
    data(){
        return {
            text: '打电话'
        }
    },
    methods: {
        async phoneCall() {
        //    let data = await cm.chooseImage({sourceType: 'camera'})
        //    this.$toast(data)
            cm.showStatusToast({
                status: 'success',
                content: '修改成功'
            })
        }
    }
}
</script>

<style lang="scss">
@import '../common/scss/base.scss';
.btn {
    width: 200px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    @include border(1px, solid, $border-color);
}
</style>
