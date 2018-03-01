import * as scrypt from '../src/scrypt'
import * as core from '../src/core'

describe('test scrypt', () => {
    it('test encrypt and decrypt', () => {
        let privateKey = core.generatePrivateKeyStr()
        let wifKey = core.getWIFFromPrivateKey(privateKey)
        let encrypt = scrypt.encrypt(wifKey, '123456')
        expect(encrypt).toBeDefined()

        let result = scrypt.decrypt(encrypt, '123456')
        expect(result).toEqual(wifKey)

        result = scrypt.decrypt(encrypt, '1234567')
        expect(result).not.toEqual(wifKey)
    })
})