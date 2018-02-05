//app.js
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const APP_ID = 'wx75b6f98051d03aa7';//输入小程序appid  
    var OPEN_ID = ''//储存获取到openid  
    const APP_SECRET = '9421a8b369d580df2f47e4b59460f0da';//输入小程序app_secret  
    var SESSION_KEY = ''//储存获取到session_key 
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data)
            OPEN_ID = res.data.openid;//获取到的openid  
            SESSION_KEY = res.data.session_key;//获取到session_key  
            // that.setData({
            //   openid: res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length),
            //   session_key: res.data.session_key.substr(0, 8) + '********' + res.data.session_key.substr(res.data.session_key.length - 6, res.data.session_key.length)
            // })
            that.globalData.openId = res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length), OPEN_ID
          }
        })
      }

    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // wx.request({
    //   url: commonUrl + "/user/micro/" + OPEN_ID,
    //   header: { "Content-Type": "application/json" },
    //   method: "GET",
    //   success: function (res) {
    //     sign_state = true,
    //       that.setData({
    //       })
    //   },
    //   fail: function () {

    //   }
    // })
  },

  globalData: {
    userInfo: null,
    openId: '',//储存获取到openid  
    userId: '',//储存获取到userId  
    commonUrl: 'http://47.95.2.132:9041/',
    imageDomain: 'http://47.95.2.132:9999/images/'
  }
})