const app = getApp();
var commonUrl = app.globalData.commonUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attentionList: [],
    pageIndex: 1,   // 设置加载的第几次，默认是第一次  
    pageSize: 12,      //返回数据的个数  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAttentionList()
  },


  toDynamic: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../dynamic/dynamic?id=' + that.data.attentionList[index].id,
    })
  },
  getAttentionList: function () {
    let that = this;
    let pageIndex = that.data.pageIndex;//把第几次加载次数作为参数  
    let pageSize = that.data.pageSize; //返回数据的个数  
    wx.request({
      url: commonUrl + "dynamic/micro/" + pageIndex + "/" + pageSize,
      header: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        "id": "",
        "content": "",
        "createUserId": ""
      },
      success: function (res) {
        //判断是否有数据，有则取数据  
        let list = res.data.data.list;
        if (list != null && list.length != 0) {
          that.setData({
            attentionList: that.data.attentionList.concat(res.data.data.list), //获取数据数组
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
      that.getAttentionList();
    }
  },
})