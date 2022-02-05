const jwt = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/Token')

class TokenService {
  // return: accessToken, refreshToken, expiresIn
  generate (payload) {
    let expiresInValue = 3600
    let accessTokenValue = '1h'
    if (payload.stayOn) {
      expiresInValue = 36000000
      accessTokenValue = '600h'
    } 
    const accessToken = jwt.sign(payload, config.get('accessSecret'), {
      expiresIn: accessTokenValue
    })
    const refreshToken = jwt.sign(payload, config.get('refreshSecret'))
    return { accessToken, refreshToken, expiresIn: expiresInValue }
  }

  async save (user, refreshToken) {
    const data = await Token.findOne({ user })
    if (data) {
      data.refreshToken = refreshToken
      return data.save()
    }
    const token = await Token.create({ user, refreshToken })
    return token
  }

  validateRefresh (refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get('refreshSecret'))
    } catch (e) {
      return null
    }
  }

  validateAccess (accessToken) {
    try {
      return jwt.verify(accessToken, config.get('accessSecret'))
    } catch (e) {
      return null
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken })    
    } catch (e) {
      return null
    }
    
  }
}

module.exports = new TokenService()