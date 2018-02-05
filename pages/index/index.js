//index.js
//获取应用实例
const app = getApp();
var imageDomain = app.globalData.imageDomain;
var commonUrl = app.globalData.commonUrl;
var openId = app.globalData.openId;
var sign_state = false;
var pageIndex = 1;
var pageSize = 10;
Page({
  data: {
    hotImage1: imageDomain + "2343424/93f61c0a31764383a4c19c44278a9a91.png",
    hotImage2: imageDomain + "2343424/7df0d4f87109460b883dfe5b535406fc.png",
    hotImage3: imageDomain + "2343424/93f61c0a31764383a4c19c44278a9a91.png",
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    searchKeyword: '',  //需要搜索的字符  
    searchSongList: [], //放置返回数据的数组  
    isFromSearch: true,   // 用于判断searchSongList数组是不是空数组，默认true，空的数组  
    pageIndex: 1,   // 设置加载的第几次，默认是第一次  
    pageSize: 10,      //返回数据的个数  
    searchLoading: true, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: true , //“没有数据”的变量，默认false，隐藏  
    pictureList: [

    ],

    sign_icon: '../../images/unsign.png',
  },

  onLoad: function () {
    let that = this;
    let sign_state = this.data.sign_state;
    if (sign_state) {
      this.setData({
        sign_icon: '../../images/sign.png'
      })
    }
    that.getIndicator();
    that.getHotImage();
  },
  //获取轮播图
  getIndicator: function () {
    let that = this;
    wx.request({
      url: commonUrl + "carouselFigure/micro/1/4",
      header: { "Content-Type": "application/json" },
      method: "GET",
      success: function (res) {
        console.log(res);
        that.setData({
          imgUrls: res.data.data.list,
        })
      },
      fail: function () {
        console.log('getIndicator--GG');
      }
    })
  },
  //top
  toTop: function () {
    wx.navigateTo({
      url: '../top/top',
    })
  },
  //百科（跳搜索）
  toSearch: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  //花（商城，暂未开放）
  toFlower: function () {
    wx.showModal({
      content: '商城暂未开放',
      showCancel: false,
      confirmColor: "#000000",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },
  //签到
  sign: function () {
    let that = this;
    // url: commonUrl + "userSign/micro/" + openId;
    if (!sign_state) {
      wx.request({
        url: commonUrl + "userSign/micro/" + app.globalData.openId,
        header: { "Content-Type": "application/json" },
        method: "GET",
        success: function (res) {
          sign_state = true,
            that.setData({
              sign_icon: '../../images/sign.png'
            })
          wx.showToast({
            title: '签到成功',
            duration: 1000,
            mask: true
          })
        },
        fail: function () {
          wx.showToast({
            title: '签到失败',
            duration: 1000,
            mask: true
          })
        }
      })
    }
  },
  //热区图片
  getHotImage: function () {
    let that = this;
    wx.request({
      url: commonUrl + "dynamicImage/micro/hot",
      header: { "Content-Type": "application/json" },
      method: "GET",
      success: function (res) {
        that.setData({
          // hotImage: res.data.data,
        })
      },
    })
  },
  //图片展示区图片
  getImagesList: function () {
    let that = this;
    wx.request({
      url: commonUrl + "dynamicImage/micro/" + pageIndex + "/" + pageSize,
      header: { "Content-Type": "application/json" },
      method: "GET",
      success: function (res) {
        that.setData({
          pictureList: res.data.data.list
        })
      },
    })
  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    pageIndex++;
    let that = this;
    that.getImagesList();
  },
}, )


