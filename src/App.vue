<template lang="pug">
  #app
    .container
      h1.app__heading blockchain
      block(v-for="(block, index) in $store.state.blocks", :key="block.hash", :block="block")
</template>

<script>
import Crypto from 'crypto-js'
import Block from './components/Block'

export default {
  name: 'app',
  components: { Block },
  data () {
    return {
      mining: false,
      blocks: [
        {
          nonce: 0,
          index: 0,
          payload: 'Genesis',
          timestamp: Date.now(),
        }
      ],
    }
  }
}
</script>

<style lang="sass">
body
  font-family: 'Graphik', 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  margin-top: 60px
  background-color: #F8F8F8
  min-height: 100vh
  color: #333

.container
  max-width: 960px
  margin: 6rem auto 0
  padding: 0 2rem

.app
  &__heading
    font-size: 2.5rem
    text-align: center
    font-weight: 600
    letter-spacing: -2.3px

input
  padding: 0.5rem 1rem
  font-size: 1.25rem
  border: 0
  outline: 0
  margin-right: 0.5rem
  border-radius: 4px

button
  padding: 0.5rem 1rem
  font-size: 1.25rem
  border: 0
  outline: 0
  border-radius: 4px
  text-transform: uppercase
  font-weight: bold
</style>
