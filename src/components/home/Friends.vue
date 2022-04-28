<script lang="ts" setup name="friends">
import friendImage1 from '@/statics/images/friend1.png';
import friendImage2 from '@/statics/images/friend2.png';
import friendImage3 from '@/statics/images/friend3.png';
import friendImage4 from '@/statics/images/friend4.png';
import friendImage5 from '@/statics/images/friend5.png';
import friendImage6 from '@/statics/images/friend6.png';
import friendImage7 from '@/statics/images/friend7.png';
const friendImages = [
  friendImage1,
  friendImage2,
  friendImage3,
  friendImage4,
  friendImage5,
  friendImage6,
  friendImage7,
];
</script>
<template>
  <div class="content-friends">
    <!-- friends -->
    <div class="friends">
      <h2>合作伙伴</h2>
      <div class="friend-list">
        <template v-for="(item, index) of friendImages" :key="index">
          <img class="friend-item" :src="item" />
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.content-friends {
  background: url('@/statics/images/friends.png') no-repeat center bottom;
  background-size: 100% calc(100vh - 320px);
  height: calc(100vh + 70px);
  overflow: hidden;
  .friends {
    min-height: 240px;
    margin-top: 140px;
    text-align: center;

    .friend-list {
      margin: 20px auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: stretch;
      max-width: 1260px;
      width: 80vw;
      img {
        height: 30px;
        margin: 10px;
        width: 138px;
      }
    }
  }
}
</style>
