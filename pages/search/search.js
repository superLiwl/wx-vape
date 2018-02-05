Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList: [

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  toArticle: function () {
    wx: wx.navigateTo({
      url: '../article/article',
    })
  },
  getData: function () {

  },

  //输入框事件，每输入一个字符，就会触发一次  
  bindKeywordInput: function (e) {
    console.log("输入框事件")
    this.setData({
      searchKeyword: e.detail.value
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})