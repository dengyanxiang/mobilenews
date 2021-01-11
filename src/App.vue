<template>
  <div id="app">
    <!-- 利用 :include="['LayoutIndex'] 进行有条件的缓存，只缓存中括号内部的组件 -->
    <keep-alive :include="cachePages">
       <router-view />
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['cachePages'])
  }
}
</script>

<style lang="less">
@font-face {
    font-family: "icomoon";
    src: url("fonts/icomoon.eot?kmi40n");
    src: url("fonts/icomoon.eot?kmi40n#iefix") format("embedded-opentype"),
    url("fonts/icomoon.ttf?kmi40n") format("truetype"),
    url("fonts/icomoon.woff?kmi40n") format("woff"),
    url("fonts/icomoon.svg?kmi40n#icomoon") format("svg");
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }
  span {
    font-family: "icomoon";
  }
</style>
