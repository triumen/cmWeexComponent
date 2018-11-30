<template>
  <div class="index" ref="index">
    <div class="ball" ref="ball" @touchstart="panBind"></div>
  </div>
</template>
 
<script>
import Binding from 'weex-bindingx';
export default {
  mounted() {
    //this.$toast("这是首页");
  },
  // beforeDestroy() {
  //   this.panDestory()
  // },
  data() {
    return {
      gesToken: 0,
      x: 0,
      y: 0
    };
  },
  methods: {
    panBind() {
      const ball = this.$refs.ball.ref;

      const bi = Binding.bind({
        eventType: 'pan',
        anchor: ball,
        props: [
          {
            element: ball,
            property: 'transform.translateX',
            expression: `x+${this.x}`
          },
          {
            element: ball,
            property: 'transform.translateY',
            expression: `y+${this.y}`
          }
        ]
      },(e)=> {
        this.$toast('滑动结束')
        if(e.state == 'end') {  
          this.x += e.deltaX;
          this.y += e.deltaY;
        }
      })
      this.gesToken = bi.token;
    },
    panDestory() {
      if(this.gesToken != 0) {
        Binding.unbind({
          eventType: 'pan',
          token: this.gesToken
        })
        this.gesToken = 0;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "./common/scss/base.scss";
.index {
  // align-items: center;
  // justify-content: center;
}
.test {
  width: 200px;
}
.ball {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: red;
}
</style>