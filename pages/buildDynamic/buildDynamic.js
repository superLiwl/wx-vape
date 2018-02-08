const app = getApp();
// 引入腾讯地图SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var commonUrl = app.globalData.commonUrl;
var imageIndex = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesFilePaths: [],
    address: '',
    content: '',
    createUserId: '',
    tag: '',
    images: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '2GHBZ-2VXCO-7LRWH-SOBRZ-CTK4Q-UMBK3'
    });
    let that = this;
  },
  onShow: function () {
    let that = this;
    // 调用接口
    qqmapsdk.search({
      keyword: '街道 ',
      success: function (res) {
        console.log(res);
        that.setData({
          address: res.data[0].address
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  //创建动态提示框
  uploadImages: function () {
    let that = this;
    wx.showActionSheet({
      itemList: ['拍摄', '从相册选择'],
      success: function (res) {
        if (res.tapIndex == 0) {
          that.chooseImage('camera');
        } else if (res.tapIndex == 1) {
          that.chooseImage('album');
        }
      }
    })
  },
  chooseImage: function (sourceType) {
    let that = this;
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: [sourceType], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        that.setData({
          imagesFilePaths: that.data.imagesFilePaths.concat(res.tempFilePaths)
        })
      }
    })
  },

  manageImage: function (e) {
    let that = this;
    //获取当前图片的下表
    let index = e.currentTarget.dataset.index;
    //触摸时间距离页面打开的毫秒数  
    var touchTime = that.data.touch_end - that.data.touch_start;
    //如果按下时间大于350为长按  
    if (touchTime > 350) {
      wx.showModal({
        content: '删除',
        success: function (res) {
          if (res.confirm) {
            that.data.imagesFilePaths.splice(index, 1);
            console.log('用户点击确定')
            that.setData({
              imagesFilePaths: that.data.imagesFilePaths
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.previewImage({
        //当前显示下表
        current: pictures[index],
        //数据源
        urls: pictures
      })
    }
  },

  //按下事件开始  
  mytouchstart: function (e) {
    let that = this;
    that.setData({
      touch_start: e.timeStamp
    })
    console.log(e.timeStamp + '- touch-start')
  },
  //按下事件结束  
  mytouchend: function (e) {
    let that = this;
    that.setData({
      touch_end: e.timeStamp
    })
    console.log(e.timeStamp + '- touch-end')
  },
  uploadImage: function () {
    let that = this;
    wx.uploadFile({
      url: commonUrl + 'fileUpload/' + app.globalData.userId + '/' + that.data.tag,
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      filePath: that.data.imagesFilePaths[imageIndex],
      name: 'file',
      success: function (res) {
        that.setData({
          tag: res.data
        })
        //do something
      }, complete() {
        imageIndex++
        if (imageIndex == that.data.imagesFilePaths.length) {
          imageIndex = 0;
          that.uploadDynamin()
        } else if (imageIndex < that.data.imagesFilePaths.length) {//若图片还没有传完，则继续调用函数  
          that.uploadImage()
        }
      }
    })
  },
  uploadDynamin: function () {
    let that = this;
    wx.request({
      url: commonUrl + 'dynamic/micro/add',
      header: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        'address': that.data.address,
        'content': that.data.content,
        'createUserId': userId,
        'images': that.data.images,
        'type': 1,
      },
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: '创建成功',
        })
      },
      fail: function () {
        wx.showToast({
          title: res.data.msg,
        })
      }
    })
  }
})