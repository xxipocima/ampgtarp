<template>
    <div class="service">
        <shop-items :items="items" :cur="current" class="service-items" @onSelect="onItemSelect"/>
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
      items: [
        {
          name: 'Внешность',
          type: 'услуга',
          desc: 'Смена внешности',
          img: 'exterior.png',
          price: 599
        },
        {
          name: 'Никнейм',
          type: 'услуга',
          desc: 'Смена никнейма',
          img: 'changeNickname.png',
          price: 299
        },
        {
          name: 'Залог',
          type: 'услуга',
          desc: 'Выход из тюрьмы',
          img: 'pledge.png',
          price: 399
        },
        {
          name: 'Варн',
          type: 'услуга',
          desc: 'Снять варн',
          img: 'warn.png',
          price: 199
        },
        {
          name: 'Набор бандита',
          type: 'подарок',
          desc: 'Набор бандита',
          img: 'bandit.png',
          price: 200
        }
      ],
      descriptions: [
        [
          'вы можете изменить свою внешность',
          'начните жизнь с чистого листа',
          'разовая покупка'
        ],
        [
          'смена никнейма вашего персонажа',
          'смена документов позволит вам уйти в тень',
          'разовая покупка'
        ],
        [
          'заплатите залог и выйдите из тюрьмы досрочно',
          'проводить время на свободе в компании друзей всегда приятнее',
          'разовая покупка'
        ],
        [
          'снимите варн и можете быть свободны',
          'каждый должен иметь право на второй шанс',
          'разовая покупка'
        ],
        [
          'получите преимущество перед другими игроками',
          'автомат АК-47',
          '30 патронов для АК-47'
        ]
      ]
    }
  },
  methods: {
    onItemSelect (data) {
      this.current = data
    }
  },
  components: {
    ShopDesc,
    ShopItems
  }
}
</script>

<style lang="scss" src="../../../styles/donate/services.scss" />
