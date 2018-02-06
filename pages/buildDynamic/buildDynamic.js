Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesFilePaths: [],
    location: '北京'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
          imagesFilePaths: res.tempFilePaths
        })
      }
    })
  },

  manageImage: function (e) {
    //获取当前图片的下表
    index = e.currentTarget.dataset.index;
    pictures = that.data.imagesFilePaths;
    //触摸时间距离页面打开的毫秒数  
    var touchTime = that.data.touch_end - that.data.touch_start;
    //如果按下时间大于350为长按  
    if (touchTime > 350) {
      wx.showModal({
        content: '删除',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.setData({
              pictures: pictures.splice(e.index, 1)
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
})