import SimpleCrypto from 'simple-crypto-js'

const super_secret_secret = "Christmas2020"

export const useEncryptor = (obj) => {
  const crypto = new SimpleCrypto(super_secret_secret)
  return crypto.encrypt(obj)
}

export const useDecryptor = (encryptedObj) => {
  if(!encryptedObj){return null}
  const crypto = new SimpleCrypto(super_secret_secret)
  return JSON.parse(crypto.decrypt(encryptedObj))
}