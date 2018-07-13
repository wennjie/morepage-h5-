<template>
   <div class="active">
            <li v-for="(item,index) in economicData" class="clearfix col-xs-12" style="padding: 0">
              <p class="col-xs-1" style="vertical-align: center;width:22px;height: 22px">

                <div class="img-box jihui" v-if="item.opportunityType==='机会'"  />
                <div class="img-box weixie" v-else-if="item.opportunityType==='威胁'"  />
                <div v-else  class="img-box"></div>
              </p>
              <p class="col-xs-9" >
                <span>{{item.articles}}</span>
                <span>{{item.content}}</span>
              </p>
              <p class="col-xs-2" style="text-align: right">
                <span class="editing" @click="centerDialogVisible = true">作用分析</span>
              </p>
            </li>
          </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
.img-box {
  background-origin: 50% 50%;
  background-size: cover;
  background-image: url(../../../images/noAnasis.png);
  .jihui {
    background-image: url(../../../images/jihui.png);
  }
  .weixie {
    background-image: url(../../../images/weixie.png);
  }
}

@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";

body {
  background-color: #fbf9fe;
  font-size: 0.14rem;
}
html,
body,
.page,
#app {
  width: 100%;
  height: 100%;
  background: #f8f9fb;
  color: #333333;
}
.page {
  display: flex;
  flex-direction: column;
}
.scroll {
  flex: 1;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  position: relative;
}
span.active {
  color: #333333;
}
input {
  border: none;
  padding: 0.1rem 0;
  font-size: 0.16rem;
  color: #333;
}
input:active {
  border: none;
}
input[placeholder],
[placeholder],
*[placeholder] {
  color: #9b9b9b !important;
}

button {
  border: none;
  font-size: 0.16rem;
}
.icons {
  img {
    width: 0.12rem;
  }
}
</style>
