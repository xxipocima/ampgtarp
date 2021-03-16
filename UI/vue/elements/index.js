import Vue from 'vue'
import App from './index.vue'

if (typeof (mp) === 'undefined') {
  window.mp = {}
  mp.trigger = (...d) => { console.log(...d) }
}
let events = {}
mp.on = (call, calback) => {
  events[call] = calback
}
mp.call = (call, ...args) => {
  let event = events[call]
  if (event)event(...args)
}
new Vue({
  el: '#app',
  data: {
    cdn: 'packages://HTML/'
  },
  render: h => h(App)

})
