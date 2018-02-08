const app = getApp();
var commonUrl = app.globalData.commonUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: '',
    author: ' ',
    createTime: '',
    content: '',
    pageIndex: 1,
    pageSize: 10,
    commentList: '',
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏  
    comment: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getData()
    this.getComment()
  },
  getData: function () {
    let that = this;
    wx.request({
      url: commonUrl + 'encyclopedia/micro/' + that.data.id,
      header: { "Content-Type": "application/json" },
      method: "GET",

      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            title: res.data.data.title,
            author: res.data.data.author,
            content: res.data.data.content,
            createTime: res.data.data.createTime
          })
        } else if (res.data.msg != null) {
          wx.showToast({
            title: res.data.msg
          })
        }

      },
      fail: function () {
        wx.showToast({
          title: '请检查网络连接'
        })
      }
    })
  },
  getComment: function () {
    let that = this;
    let pageIndex = that.data.pageIndex;//把第几次加载次数作为参数  
    let pageSize = that.data.pageSize; //返回数据的个数  
    wx.request({
      url: commonUrl + "encyclopediaComment/micro/" + pageIndex + "/" + pageSize,
      header: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        commentId: '',
        encyclopediaId: "",
        createUserId: "",
      },
      success: function (res) {
        //判断是否有数据，有则取数据  
        let list = res.data.data.list;
        if (list != null && list.length != 0) {
          that.setData({
            commentList: that.data.commentList.concat(res.data.data.list), //获取数据数组
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
  commentUpload: function () {
    let that = this;
    wx.request({
      url: commonUrl + 'encyclopedia/micro/' + that.data.id,
      header: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        commentId: "",
        encyclopediaId: "",
        comment: that.data.comment,
        createUserId: "",
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            pageIndex: 1,  //每次触发上拉事件，把searchPageNum+1  
          });
          that.getComment()
        } else if (res.data.msg != null) {
          wx.showToast({
            title: res.data.msg
          })
        }

      },
      fail: function () {
        wx.showToast({
          title: '请检查网络连接'
        })
      }
    })
  },
  getInputComment: function (e) {
    this.setData({
      comment: e.detail.value
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
      that.getComment();
    }
  },
})