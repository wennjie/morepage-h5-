<template>
    <header class="mui-bar mui-bar-nav">
        <h1 id="title" class="mui-title">{{title}}</h1>
        <div v-if="!hide">
            <a class="mui-icon mui-icon-plusempty mui-pull-left" v-if="inType=='farmers'&&!back" @click="push('./addorder.html')"></a>
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" v-if="back"></a>
            <div class="mui-pull-right" v-if="!back"  @click="push('./orderhistory.html')">历史</div>
        </div>
    </header>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "植保需求"
    },
    back: {
      type: Boolean,
      default: true
    },
    hide: {
      type: Boolean,
      default: false
    },
  },
  created() {
    this.inType=localStorage.getItem("inType") 
  },
  data(){
    // == "farmers"
    return {
       user:'',
       inType:'flyteam'
    }
  },
  methods: {
    push(e) {
      router(e);
    }
  }
};
</script>
<style lang='less'>
header {
  a {
    color: #8ec1a0;
  }
  .mui-pull-left{
      padding: 7px !important;
      font-size: 30px !important;
  }
  .mui-pull-right {
    font-size: 0.16rem !important;
    color: #8ec1a0;
    padding: 12px 10px;
    z-index: 1;
  }
}
</style>
