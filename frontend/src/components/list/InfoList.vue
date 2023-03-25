<template>
   <ul class="info-list">
    <li
      class="info-item pointer"
      v-for="(item, index) in list"
      :key="item.id"
      @click="$emit('clickitem', item)"
    >
      <slot name="index" :index="index"></slot>
      <slot name="img" :item="item">
        <img class="sub-img mleft-10" :src="item.ar.picUrl" />
      </slot>
      <div class="sub-title font-14 mleft-10">
        <slot name="title" :item="item">
          {{ item.name }}
        </slot>
      </div>
      <div class="sub-item font-12">
        <slot name="item1" :item="item"></slot>
      </div>
      <div class="sub-item font-12">
        <slot name="item2" :item="item"></slot>
      </div>
      <div class="sub-item sub-final font-12">
        <slot name="item3" :item="item"></slot>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'InfoList',
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
  .info-item {
  display: flex;
  height: 90px;
  align-items: center;
  }
  .info-item:nth-child(odd) {
  background-color: #eee;
  }
  .info-item:nth-child(even) {
  background-color: #fff;
  }
  .info-item:hover {
  background-color: #f6f6f9;
  }
  .sub-img {
  height: 60px;
  width: 60px;
  border-radius: 4px;
  }
  .sub-title {
  min-width: 100px;
  flex: 1;
  }
  .sub-item {
  width: 150px;
  color: #c3c3c4;
  }
  .sub-final {
  width: 100px;
  text-align: center;
  }
  .sub-index {
  width: 50px;
  text-align: center;
  color: #cfcfdf;
  }
</style>
