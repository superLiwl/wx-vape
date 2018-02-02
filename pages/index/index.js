//index.js
//获取应用实例
const app = getApp();
var imageDomain = app.globalData.imageDomain;
Page({
  data: {
    imgUrls: [
      {
        id: 'image1',
        // link: 'https://www.baidu.com/',
        url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg'
        // url: imageDomain+'2.jpg'
      },
      {
        id: 'image2',
        // link: 'https://www.baidu.com/',
        url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg'
        // url: imageDomain + '3.jpg'
      },
      {
        id: 'image3',
        // link: 'https://www.baidu.com/',
        url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg'
        // url: imageDomain + '4.jpg'
      },
      {
        id: 'image4',
        // link: 'https://www.baidu.com/',
        url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg'
        // url: imageDomain + '5.jpg'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    pictureList: [
      {
        icon: '../../images/image1.jpg'
      },
      {
        icon: '../../images/image2.jpg'
      },
      {
        icon: '../../images/image3.jpg'
      },
      {
        icon: '../../images/image4.jpg'
      },
      {
        icon: '../../images/image4.jpg'
      },
      {
        icon: '../../images/image3.jpg'
      },
      {
        icon: '../../images/image2.jpg'
      },
      {
        icon: '../../images/image1.jpg'
      },
      {
        icon: '../../images/image2.jpg'
      },
      {
        icon: '../../images/image3.jpg'
      },
      {
        icon: '../../images/image4.jpg'
      },
      {
        icon: '../../images/image1.jpg'
      },
      {
        icon: '../../images/image3.jpg'
      },
      {
        icon: '../../images/image4.jpg'
      },
      {
        icon: '../../images/image1.jpg'
      },
      {
        icon: '../../images/image2.jpg'
      },
      {
        icon: '../../images/image3.jpg'
      },
      {
        icon: '../../images/image3.jpg'
      },
      {
        icon: '../../images/image3.jpg'
      },
      {
        icon: '../../images/image4.jpg'
      },
    ],
    sign_state: false,
    sign_icon: '../../images/unsign.png',
  },

  onLoad: function () {
    let sign_state = this.data.sign_state;
    if (sign_state) {
      this.setData({
        sign_icon: '../../images/sign.png'
      })
    }
  },
  toTop: function () {
    wx.navigateTo({
      url: '../top/top',
    })
  },
  toSearch: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  sign: function () {
    let sign_state = this.data.unsign_state;
    if (!sign_state) {
      this.setData({
        // unsign_state: false
        sign_icon: '../../images/sign.png'
      })
    }
  },

  // test: function () {
  //   wx.request({
  //     url: "http://4795.2.132:9041/encyclopedia/micro/addEncyclopedi",
  //     header: {
  //       "Content-Type": "application/json"
  //     },
  //     method: "POST",

  //     success: function (res) {

  //     },
  //     fail: function () {

  //     }
  //   }),
  //  },
  test: function () {
    wx.request({
      url: "http://47.95.2.132:9041/encyclopedia/micro/addEncyclopedia",
      header: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        author: "1",
        title: "2",
        content: "3"
      },
      success: function (res) {
        console.log(res);
      },
      fail: function () { }

    })
  },

}, )


