<template>
  <div class="body" v-if="show">
    <div class="nav container">
      <div class="nav-balance">
        <div class="nav-coins">{{coins}} <img :src="$root.cdn + 'img/donate/coin.png'" alt="coin" class="coin-icon"></div>
        <div class="nav-money">{{money}} $</div>
      </div>
      <div class="nav-menu">
        <div
          v-for="(item, index) in navItems" :key="index"
          class="nav-item"
          @click="target = item.target"
          :class="{'nav-active': target == item.target }"
        >
            {{item.text}}
        </div>
      </div>
      <div class="nav-vip">VIP lvl: {{vip}}</div>
    </div>
    <component
        :is="target"
        class="container"
        :refData="referralData"
        :errorMsg="refsErrorMsg"
        @onOrder="oreder"
    />
  </div>
</template>

<script>

import VIP from './components/VIP.vue'
import Coins from './components/Coins.vue'
import Services from './components/Services.vue'
import Referals from './components/Referals.vue'

window.api = {}
if (window.mp == undefined) {
  window.mp = {
    trigger () {
      window.console.log(arguments)
    },
    on () {
      window.console.log(arguments)
    }
  }
}

export default {
  data () {
    return {
      show: false,
      target: 'VIP',
      coins: 10,
      money: 1600,
      vip: 0,
      vipDays: 0,
      vipEnd: new Date(),
      navItems: [
        {
          text: 'Пополнить',
          target: 'Coins'
        },
        {
          text: 'Премиуим',
          target: 'VIP'
        },
        {
          text: 'Услуги',
          target: 'Services'
        },
        {
          text: 'Рефералы',
          target: 'Referals'
        }
      ],
      referralData: {},
      refsErrorMsg: ''
    }
  },
  methods: {
    hide () {
      this.show = false
      mp.trigger('guitoggle', false)
    },
    onRefsError (message) {
      this.refsErrorMsg = message
    },
    oreder (event, amount, needClose) {
      mp.trigger('CallRemote', event, amount)
      if (needClose) this.hide()
    },
    updateDonateData (data) {
      const { coin = 0, money = 0, vipDate = 0, kitDate = 0, vip = 0 } = JSON.parse(data)
      this.coins = coin
      this.money = money
      this.vip = vip
      this.vipEnd = new Date(vipDate)
    }
  },
  components: {
    VIP,
    Coins,
    Services,
    Referals
  },
  created () {
    window.donate = this
    mp.on('DONATE::UPDATE', (money) => {
      donate.money = money
    })
    $('body').keyup(function (event) {
      if (event.which == 27 && donate.show) {
        donate.hide()
      }
    })
  }
}
</script>

<style lang="scss" src="../../styles/donate/donate.scss" />
