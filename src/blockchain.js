import Crypto from 'crypto-js'

export default class Blockchain {
  constructor (initialData = null, difficulty = 2) {
    const blocks = []
    const self = this
  
    this.getBlocks = () => blocks
    this.getLastBlock = () => blocks[blocks.length - 1]
    this.addBlock = addBlock

    function toHash (block) {
      const template = `${block.index}${block.timestamp}${block.previousHash}${block.payload}${block.nonce}`
      return Crypto.SHA256(template).toString()
    }

    function buildGenesisBlock (payload) {
      const genesisBlock = {
        index: 0,
        nonce: 0,
        previousHash: 0,
        timestamp: Date.now(),
        payload
      }
      genesisBlock.hash = toHash(genesisBlock)
      addBlock(genesisBlock)
    }

    function addBlock (payload) {
      const latestBlock = self.getLastBlock()
      const previousHash = latestBlock ? latestBlock.hash : 0
      const newBlock = {
        index: blocks.length,
        nonce: 0,
        timestamp: Date.now(),
        previousHash,
        payload
      }

      const promise = new Promise(function(resolve, reject) {
        function mine () {
          setTimeout(() => {
            const isValid = validateBlock(newBlock)
            if (isValid.valid) {
              newBlock.hash = isValid.hash
              resolve()
            } else {
              newBlock.nonce++
              mine(newBlock)
            }
          })
        }

        mine()
      })

      promise.then(() => {
        blocks.push(newBlock)
      })

      return promise
    }

    function validateBlock (newBlock) {
      const hash = toHash(newBlock)      
      const difficultyZeros = '0'.repeat(difficulty)
      const valid = hash.slice(0, difficulty) === difficultyZeros
      return {
        hash,
        valid
      }
    }

    buildGenesisBlock(initialData)
  }
}
