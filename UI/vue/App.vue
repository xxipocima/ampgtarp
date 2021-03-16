<template>
    <div>
        <chat />
        <education />
    </div>
</template>

<script>
import education from './education/index.vue'
import chat from './chat/index.vue'

export default {
  data () {
    return {
    }
  },
  created () {
  },
  components: {
    chat,
    education
  }
}

</script>
