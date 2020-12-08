<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
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
