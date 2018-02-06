//index.js
//获取应用实例
const app = getApp();
var imageDomain = app.globalData.imageDomain;
var commonUrl = app.globalData.commonUrl;
var openId = app.globalData.openId;
var sign_state = false;

Page({
  data: {
    hotImage1: "",
    hotImage2: "",
    hotImage3: "",
    imgUrls: [],//轮播图
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    searchKeyword: '',  //需要搜索的字符  
    searchSongList: [], //放置返回数据的数组  
    isFromSearch: true,   // 用于判断searchSongList数组是不是空数组，默认true，空的数组  
    pageIndex: 1,   // 设置加载的第几次，默认是第一次  
    pageSize: 12,      //返回数据的个数  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏  
    pictureList: [],
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
    that.getImagesList();
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
          hotImage1: res.data.data[0].url,
          hotImage2: res.data.data[1].url,
          hotImage3: res.data.data[2].url,
        })
      },
    })
  },
  //图片展示区图片
  getImagesList: function () {
    let that = this;
    let pageIndex = that.data.pageIndex;//把第几次加载次数作为参数  
    let pageSize = that.data.pageSize; //返回数据的个数  
    wx.request({
      url: commonUrl + "dynamicImage/micro/" + pageIndex + "/" + pageSize,
      header: { "Content-Type": "application/json" },
      method: "GET",
      success: function (res) {
        //判断是否有数据，有则取数据  
        let list = res.data.data.list;
        if (list != null && list.length != 0) {
          that.setData({
            pictureList: that.data.pictureList.concat(res.data.data.list), //获取数据数组
            searchLoading: true   //把"上拉加载"的变量设为false，显示  
          });
          //没有数据了，把“没有数据”显示，把“上拉加载”隐藏  
        } else {
          that.setData({
            searchLoadingComplete: true, //把“没有数据”设为true，显示  
            searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
          });
        }
      },
    })
  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        pageIndex: that.data.pageIndex + 1,  //每次触发上拉事件，把searchPageNum+1  
      });
      that.getImagesList();
    }
  },
  //创建动态提示框
  buildDynamic: function () {
    wx.navigateTo({
      url: '../buildDynamic/buildDynamic',
    })
    
    // let that = this;
    // wx.showActionSheet({
    //   itemList: ['拍摄', '从相册选择'],
    //   success: function (res) {
    //     if (res.tapIndex == 0) {
    //       that.chooseImage('camera');
    //     } else if (res.tapIndex == 1) {
    //       that.chooseImage('album');
    //     }
    //   }
    // })
  },
  chooseImage: function (sourceType) {
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: [sourceType], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  }
}, )


