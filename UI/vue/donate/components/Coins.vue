<template>
    <div class="coins">
        <shop-items :items="items" :cur="current" class="coins-items" @onSelect="onItemSelect"/>
        <div class="button" @click="coinKitOrder">Обменять</div>
        <div class="row coins-services">
            <div class="coins-block">
                <p>Пополнить счет на произвольную сумму: </p>
                <input type="number" v-model="coin.coin" @input="calc(coin, false)"> <img :src="$root.cdn + 'img/donate/coin.png'" alt="coin" class="coin-icon">
                <input type="number" v-model="coin.money" @input="calc(coin)" min="0" :step="coin.course"> <img :src="$root.cdn + 'img/donate/rub.png'" alt="coin" class="coin-icon">
                <div class="button" @click="coinOrder">Купить</div>
            </div>
            <div class="coins-block">
                <p>Обмен монет на внутриигровую валюту: </p>
                <input type="number" v-model="trans.coin" @input="calc(trans, false)"> <img :src="$root.cdn + 'img/donate/coin.png'" alt="coin" class="coin-icon">
                <input type="number" v-model="trans.money" @input="calc(trans)" min="0" :step="trans.course"> <img :src="$root.cdn + 'img/donate/dollars.png'" alt="coin" class="coin-icon">
                <div class="button" @click="coinToMoney">Обменять</div>
            </div>
        </div>
    </div>
</template>

<script>
import ShopItems from './ShopItems.vue'
import { transConfig, coinConfig, coinKits } from '../../../../server_side/server/donate/shopConfig'

export default {
  data () {
    return {
      current: 2,
      trans: transConfig,
      coin: coinConfig,
      items: coinKits
    }
  },
  methods: {
    coinToMoney () {
      this.$emit('onOrder', 'COIN_SHOP::TO_MONEY', this.trans.coin, false)
    },
    coinKitOrder () {
      this.$emit('onOrder', 'COIN_SHOP::ORDER_COIN_KIT', this.current, true)
    },
    coinOrder () {
      this.$emit('onOrder', 'COIN_SHOP::ORDER_COIN', this.coin.coin, true)
    },
    onItemSelect (data) {
      this.current = data
    },
    calc (obj, rev = true) {
      if (rev) obj.coin = Math.ceil(obj.money / obj.course)
      else obj.money = obj.coin * obj.course
    }
  },
  components: {
    ShopItems
  }
}
</script>

<style lang="scss" src="../../../styles/donate/coins.scss" />
