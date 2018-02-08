//app.js
// var util = require('/utils/util.js');
// 引入腾讯地图SDK核心类
var QQMapWX = require('/libs/qqmap-wx-jssdk.js');
var qqmapsdk;
App({
  onLaunch: function () {
    // this.utils = new util()
    var that = this;
    var qqmapsdk = new QQMapWX({
      key: '2GHBZ-2VXCO-7LRWH-SOBRZ-CTK4Q-UMBK3'
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const APP_ID = 'wx75b6f98051d03aa7';//输入小程序appid  
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
            SESSION_KEY = res.data.session_key;//获取到session_key  
            that.globalData.openId = res.data.openid
            that.getUserInfo();
          }
        })
      }

    })


  },
  getUserInfo: function () {
    let that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // var location = util.getLocation
              that.getLocation();
              // that.globalData.address = location.data[0].address
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
  },

  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.log("定位成功");
        that.globalData.latitude = res.latitude
        that.globalData.longitude = res.longitude
      },
      complete: function () {
        that.bindUser();
      }
    })
  },
  bindUser: function () {
    let that = this;
    wx.request({
      url: that.globalData.commonUrl + "/user/micro/add",
      header: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        "openId": that.globalData.openId,
        "address": that.globalData.address,
        "age": "",
        "code": "",
        "gender": "",
        "headPortraitImg": that.globalData.userInfo.avatarUrl,
        "hobby": "",
        "status": "",
        "loginName": "",
        "password": "",
        "nickName": that.globalData.userInfo.nickName,
        "ration": "",
        "skill": "",
        "longitude": that.globalData.longitude,//经度
        "latitude": that.globalData.latitude,//纬度
      },
      success: function (res) {
        if (res.data.status == 200) {
          that.globalData.userId = res.data.data.id
        }
        if (that.globalData.userId == "") {
          wx.showToast({
            title: res.data.data.msg,
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: "请检查网络连接",
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: '',//储存获取到openid  
    address: '',
    longitude: '',//经度
    latitude: '',//纬度
    userImag: '',
    userId: '',//储存获取到userId  
    commonUrl: 'http://47.95.2.132:9041/',
    imageDomain: 'http://47.95.2.132:9999/images/'
  }
})