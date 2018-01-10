<template lang="pug">
  .block
    .block__index Block \#{{ block.index }}
    .block__datum
      .block__datum__key P.Hash
      .block__datum__val {{ block.previousHash }}
    .block__datum
      .block__datum__key Hash
      .block__datum__val {{ block.hash }}
    .block__datum
      .block__datum__key Nonce
      .block__datum__val {{ block.nonce }}
</template>

<script>
import Crypto from 'crypto-js'

export default {
  name: 'block',
  data () {
    return {
      keys: ['payload', 'previousHash', 'timestamp', 'nonce', 'hash'] 
    }
  },
  props: {
    block: {
      required: true,
      type: Object
    }
  },
  computed: {
    blockHash () {
      const template = `${this.block.index}${this.block.timestamp}${this.block.previousHash}${this.block.payload}${this.block.nonce}`
      const hash = Crypto.SHA256(template).toString()
      this.block.hash = hash
      return hash
    }
  }
}
</script>

<style lang="sass" scoped>
.block
  background-color: #fff
  padding: 2rem
  color: #333
  box-shadow: 0 20px 80px rgba(0,0,0,0.15)
  border-radius: 0.4rem  
  margin-bottom: 1rem
  &__datum
    display: flex
    &__key
      margin-right: 1rem
      font-weight: bold
    &__val
      margin: 0
</style>
