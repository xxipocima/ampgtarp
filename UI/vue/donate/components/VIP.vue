<template>
    <div class="vip">
        <div class="row">
            <shop-items :items="items" :cur="current" class="vip-items" @onSelect="onItemSelect"/>
            <div class="vip-info">
                <h3>Ваш текщий премиум</h3>
                <div class="vip-time">{{vipBegine}}</div>
                <div class="button">Забрать набор бандита</div>
                <div class="vip-time">00.00.00</div>
            </div>
        </div>
        <shop-desc :desc="descriptions[current]" />
        <div class="button">Купить</div>
    </div>
</template>

<script>
import ShopItems from './ShopItems.vue'
import ShopDesc from './ShopDescription.vue'

export default {
  data () {
    return {
      current: 2,
      vipBegine: '00.00.00.00',
      vipEnd: '',
      timer: -1,
      items: [
        {
          name: '1 день',
          type: 'VIP',
          desc: 'Базовый набор',
          img: 'premium1.png',
          price: 10
        },
        {
          name: '7 дней',
          type: 'VIP',
          desc: 'Малый набор',
          img: 'premium2.png',
          price: 50
        },
        {
          name: '30 дней',
          type: 'VIP',
          desc: 'Средний набор',
          img: 'premium3.png',
          price: 100
        },
        {
          name: '30 дней',
          type: 'Super VIP',
          desc: 'Супер набор',
          img: 'premium3.png',
          price: 200
        }
      ],
      descriptions: [
        [
          'уникальный цвет ника',
          'набор бандита 1 раз в сутки',
          'х2 зарплата на всех работах кроме фракций',
          'сроком на 1 день'
        ],
        [
          'уникальный цвет ника',
          'набор бандита 1 раз в сутки',
          'х2 зарплата на всех работах кроме фракций',
          'сроком на 7 дней'
        ],
        [
          'уникальный цвет ника',
          'набор бандита 1 раз в сутки',
          'х2 зарплата на всех работах кроме фракций',
          'сроком на 30 дней'
        ],
        [
          'уникальный цвет ника',
          'набор бандита 2 раз в сутки',
          'х4 зарплата на всех работах кроме фракций',
          'сроком на 30 дней'
        ]
      ]
    }
  },
  methods: {
    onItemSelect (data) {
      this.current = data
    },
    time () {
      let today = new Date()
      today = Math.floor((this.$parent.vipEnd - today) / 1000)
      if (today > 0) {
        let tsec = today % 60; today = Math.floor(today / 60); if (tsec < 10)tsec = '0' + tsec
        let tmin = today % 60; today = Math.floor(today / 60); if (tmin < 10)tmin = '0' + tmin
        let thour = today % 24; today = Math.floor(today / 24)
        const timestr = today + ':' + thour + ':' + tmin + ':' + tsec
        this.vipBegine = timestr
      } else {
        this.vipBegine = '00.00.00.00'
        this.$parent.vip = 0
      }
    }
  },
  components: {
    ShopDesc,
    ShopItems
  },
  mounted () {
    const tuday = new Date()
    this.timer = setInterval(() => { this.time() }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" src="../../../styles/donate/vip.scss" />
