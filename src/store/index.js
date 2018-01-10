import Vue from 'vue'
import Vuex from 'vuex'
import Crypto from 'crypto-js'

Vue.use(Vuex)

const genesisBlock = {
  index: 0,
  nonce: 7463,
  timestamp: 1513742176297,
  previousHash: '0',
  hash: '000cead0525dc64004789531bfb1a00e8c33de5d98472a942d4b3617823d6a3f',
  data: 'Genesis Block!'
}

function toHash (index, timestamp, previousHash, data, nonce) {
  const template = `${index}${timestamp}${previousHash}${data}${nonce}`
  return Crypto.SHA256(template).toString()
}

export default new Vuex.Store({
  state: {
    blocks: [genesisBlock]
  }
})