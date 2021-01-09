<template>
   <div class="user-profile">
      <van-nav-bar title="个人信息"
       class="app-nav-bar"
       left-arrow
       @click-left="$router.back()" />
       <van-cell title="头像" is-link center>
         <van-image
         width="30" height="30" round fit="cover"
         :src="user.photo" />
       </van-cell>
       <van-cell title="昵称" is-link
       @click="isEditNameShow = true"
        :value="user.hello" />
       <van-cell title="性别" is-link
       @click="isEditGenderShow = true"
       :value="user.gender === 0 ? '男':'女' " />
       <van-cell title="生日" is-link
        @click="isEditBirthdayShow = true"
        :value="user.birthday" />
       <!-- 修改昵称部分 -->
       <van-popup
        v-model="isEditNameShow"
        position="bottom" :style="{ height: '100%' }"
        >
          <update-name
          v-if="isEditNameShow"
          @close="isEditNameShow = false"
          @updata-name="user.name=$event"
          :name="user.name"
          ></update-name>
        </van-popup>
        <!-- 修改性别部分 -->
        <van-popup
        v-model="isEditGenderShow"
        position="bottom"
        >
        <updata-gender
         @updata-gender="user.gender=$event"
         :gender="user.gender"
          @close="isEditGenderShow = false"
         />
        </van-popup>
        <van-popup
        v-model="isEditBirthdayShow"
        position="bottom"
        >
        <updata-birthday
         v-if="isEditBirthdayShow"
         @updata-birthday="user.birthday=$event"
         :birthday="user.birthday"
         @close="isEditBirthdayShow=false"
        />
        </van-popup>
   </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name.vue'
import UpdataGender from './components/updata-gender.vue'
import UpdataBirthday from './components/updata-birthday.vue'
export default {
  components: {
    updateName,
    UpdataGender,
    UpdataBirthday
  },
  name: 'UserProfile',
  data () {
    return {
      user: {},
      isEditNameShow: false, // 编辑名称的显示状态
      isEditGenderShow: false, // 编辑性别的显示状态
      isEditBirthdayShow: false
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
    }
  }
}
</script>

<style scoped lsng="less">
.van-popup{
  background: #eeeef0;
}
</style>
