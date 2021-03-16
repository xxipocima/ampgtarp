<template>
    <div class="shop-items">
        <div
            :style="{'background-image': `url(${$root.cdn}img/donate/bgItem.png)`}"
            class="shop-item"
            v-for="(item, index) in items" :key="index"
            @click="onSelect(index)"
            :class="{'shop-item-active': index == current}"
        >
            <img
                :src="$root.cdn + 'img/donate/' + item.img"
                alt="item"
                class="shop-item-img"
            />
            <div class="shop-items-block">
                <div class="shop-item-name">{{item.name}}</div>
                <div class="shop-item-bonus" v-if="item.bonus">{{item.bonus}}</div>
                <div class="shop-item-type">{{item.type}}</div>
                <div class="shop-item-desc">{{item.desc}}</div>
                <div class="shop-item-price">
                    {{item.price}}
                    <img :src="$root.cdn + 'img/donate/' + (item.money || 'coin.png')" alt="coin" class="coin-icon">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      current: 3
    }
  },
  props: ['items', 'cur'],
  methods: {
    onSelect (id) {
      this.current = id
      this.$emit('onSelect', id)
    }
  },
  mounted () {
    this.current = this.cur || 2
  }
}
</script>

<style lang="scss" src="../../../styles/donate/items.scss" />
