<template>
    <div class="shop-desc">
        <h2 class="shop-desc-tittle">Преимущества</h2>
        <div
            class="shop-desc-row"
            v-for="(item, index) in desc" :key="index"
        >
            <img :src="$root.cdn + 'img/donate/check.png'" alt="check" class="shop-desc-check"> {{item}}
        </div>
    </div>
</template>

<script>
export default {
  props: ['desc']
}
</script>

<style lang="scss" src="../../../styles/donate/description.scss" />
