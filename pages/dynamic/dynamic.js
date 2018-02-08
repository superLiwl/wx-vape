// pages/dynamic/dynamic.js
const app = getApp();
var commonUrl = app.globalData.commonUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    nickName: "",
    headPortraitImg: '',
    // sex: '1',
    describe: '海贼王',
    isFollow: '0',
    content: '',
    images: [],
    fabulous: [],
    rewards: [],
    commentList: [],
    commentInput: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      id: options.id
    })
    var attentionIcon;
    var attentionState = this.data.attentionState;
    if (attentionState == '0') {
      this.setData({ attentionIcon: '../../images/attention_heart.png' })
    } else {
      this.setData({ attentionIcon: '../../images/unattention_heart.png' })
    }
    that.getDynamicdetails()
  },
  getDynamicdetails: function () {
    let that = this;
    wx.request({
      url: commonUrl + "dynamic/micro/" + that.data.id + '/' + app.globalData.userId,
      header: { "Content-Type": "application/json" },
      method: "GET",
      success: function (res) {
        that.setData({
          id: res.data.data.id,
          nickName: res.data.data.nickName,
          headPortraitImg: res.data.data.headPortraitImg,
          sex: '1',
          autograph: '海贼王',
          attentionState: '0',
          content: res.data.data.content,
          images: res.data.data.images,
          fabulous: res.data.data.fabulous,
          rewards: res.data.data.rewards,
          comments: res.data.data.comments,
          describe: res.data.data.describe,
          isFollow: res.data.data.isFollow,
        })

      },
    })
  },
  sendComment: function () {
    let that = this;
    wx.request({
      url: commonUrl + "dynamicComment/micro/add",
      header: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        "commentId": "",
        "dynamicId": that.data.id,
        "comment": that.data.commentInput,
        "createUserId": app.globalData.userId
      },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '评论成功',
          })
        } else {
          wx.showToast({
            title: '评论失败',
          })
        }

      },
    })
  },
  commentInput: function (e) {
    this.setData({
      commentInput: e.detail.value
    })
  }

})