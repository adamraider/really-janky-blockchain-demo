<template lang="pug">
  #app
    .container
      h1 Blockchain Demo
      .block(v-for="(block, index) in blocks")
        .block__index Index \#{{ index }}
        .block__datum(v-for="key in keys") 
          .block__datum__key {{ key }}&nbsp;
          .block__datum__val {{ block[key] }}
      form(v-if="!mining" @submit.prevent="mineBlock")
        input(v-model="data", id="input", ref="input")
        button(type="submit") Mine Block
      template(v-if="mining")
        h2 mining new block...
</template>

<script>
import Crypto from 'crypto-js'

const difficulty = 2

export default {
  name: 'app',
  data () {
    return {
      keys: ['data', 'previousHash', 'timestamp', 'nonce', 'hash'],
      blocks: [],
      data: '',
      mining: false
    }
  },
  mounted () {
    this.buildGenesisBlock()
  },
  methods: {
    buildGenesisBlock () {
      const index = 0
      const previousHash = 0
      const data = 'Genesis Block'
      const timestamp = Date.now()
      this.proofOfWork(index, previousHash, data, timestamp)
    },

    hashBlock (index, previousHash, data, timestamp, nonce) {
      const block = `${index}${timestamp}${previousHash}${data}${nonce}`
      return Crypto.SHA256(block).toString()
    },

    mineBlock () {
      const index = this.blocks.length
      const previousHash = this.blocks[index - 1].hash
      const data = this.data
      const timestamp = Date.now()
      this.data = ''
      this.proofOfWork(index, previousHash, data, timestamp)
    },

    proofOfWork (index, previousHash, data, timestamp, nonce = 0) {
      this.mining = true
      let hash = this.hashBlock(index, previousHash, data, timestamp, nonce)
      console.log(nonce, hash)
      if (hash.slice(0, difficulty) === '0'.repeat(difficulty)) {
        this.mining = false
        this.$nextTick(() => this.$refs.input.focus())
        this.blocks.push({
          index,
          previousHash,
          hash,
          data,
          timestamp,
          nonce
        })
      } else {
        nonce++
        setTimeout(() => this.proofOfWork(index, previousHash, data, timestamp, nonce), 5)
      }
    }
  }
}
</script>

<style lang="sass">
body
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  margin-top: 60px
  background: linear-gradient(to bottom, #6141f9, #5131c4);
  min-height: 100vh
  color: #fff

.container
  max-width: 960px
  margin: 2rem auto 0
  padding: 0 2rem

.block
  background-color: #fff
  padding: 2rem
  color: #333
  box-shadow: 0 2px 40px rgba(0,0,0,0.25)
  border-radius: 0.2rem  
  margin-bottom: 1rem
.block__datum
  display: flex
  &:not(:last-of-type)
    margin-bottom: 0.25rem
  &__key
    width: 200px
    text-align: right
    margin-right: 1rem
    font-weight: bold
  &__val
    margin: 0

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
