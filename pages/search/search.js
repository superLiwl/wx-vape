const app = getApp();
var commonUrl = app.globalData.commonUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKeyword: '',  //需要搜索的字符  
    searchList: [], //放置返回数据的数组  
    pageIndex: 1,   // 设置加载的第几次，默认是第一次  
    pageSize: 15,      //返回数据的个数  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false,//“没有数据”的变量，默认false，隐藏  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getSearchList();
  },

  toArticle: function () {
    wx: wx.navigateTo({
      url: '../article/article',
    })
  },


  //输入框事件，每输入一个字符，就会触发一次  
  bindKeywordInput: function (e) {
    console.log("输入框事件")
    this.setData({
      searchKeyword: e.detail.value,
      searchPageNum: 1,   //第一次加载，设置1  
      searchList: [],  //放置返回数据的数组,设为空  
      searchLoading: true,  //把"上拉加载"的变量设为true，显示  
      searchLoadingComplete: false //把“没有数据”设为false，隐藏  
    }),
      this.getSearchList();
  },
  //搜索，访问网络  
  getSearchList: function () {
    let that = this;
    let searchKeyword = that.data.searchKeyword;//输入框字符串作为参数  
    let pageIndex = that.data.pageIndex;//把第几次加载次数作为参数  
    let pageSize = that.data.pageSize;//返回数据的个数 
    url1: commonUrl + "encyclopedia/micro/" + pageIndex + "/" + pageSize,
      //访问网络  
      wx.request({
        url: commonUrl + "encyclopedia/micro/" + pageIndex + "/" + pageSize,
        header: { "Content-Type": "application/json" },
        method: "POST",
        data: {
          // "keyWord": searchKeyword,
          "id": "",
          "title": "",
          "author": "",
          "content": ""
        },
        success: function (res) {
          //判断是否有数据，有则取数据  
          let list = res.data.data.list;
          if (list != null && list.length != 0) {
            that.setData({
              searchList: that.data.searchList.concat(res.data.data.list), //获取数据数组
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

  //滚动到底部触发事件  
  onReachBottom: function () {
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        pageIndex: that.data.pageIndex + 1,  //每次触发上拉事件，把searchPageNum+1  
      });
      that.getSearchList();
    }
  },

})