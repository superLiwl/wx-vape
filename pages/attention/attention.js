Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendList: [
      {
        id: 0,
        name: '路飞',
        photo: '../../images/photo.jpg',
        friend_text: '今天天气不错，挺风和日丽的,我们下午没有课，天气也挺爽的，啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
        imageList: [
          {
            icon: '../../images/image1.jpg',
          },
          {
            icon: '../../images/image2.jpg',
          },
          {
            icon: '../../images/image3.jpg',
          },
          {
            icon: '../../images/image4.jpg',
          },
          {
            icon: '../../images/image1.jpg',
          }
        ],
        commentList: [
          {
            id: 0,
            commentator: '娜美',
            be_commented: '',
            comment_content: '你是白痴吗'
          },
          {
            id: 1,
            commentator: '索隆',
            be_commented: '娜美',
            comment_content: '这还用问吗？他肯定是白痴啊，他不是还能谁是。。。。。。。。'
          }
        ],
        praiseList: [
          {
            name: '乌索普',
          },
          {
            name: '卡普',
          },
          {
            name: '博雅.汉库克',
          }
        ]
      },
      {
        id: 1,
        name: '娜美',
        photo: '../../images/image5.jpg',
        friend_text: '今天天气不错，挺风和日丽的,我们下午没有课，天气也挺爽的，啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
        imageList: [
          {
            icon: '../../images/image1.jpg',
          },
          {
            icon: '../../images/image2.jpg',
          },
          {
            icon: '../../images/image3.jpg',
          },
          {
            icon: '../../images/image4.jpg',
          },
          {
            icon: '../../images/image1.jpg',
          }
        ],
      }, {
        id: 2,
        name: '诺诺罗亚.索隆',
        photo: '../../images/image6.jpg',
        friend_text: '今天天气不错，挺风和日丽的,我们下午没有课，天气也挺爽的，啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
        imageList: [
          {
            icon: '../../images/image1.jpg',
          },
          {
            icon: '../../images/image2.jpg',
          },
          {
            icon: '../../images/image3.jpg',
          },
          {
            icon: '../../images/image4.jpg',
          },
          {
            icon: '../../images/image1.jpg',
          }
        ],
      }

    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  toDynamic: function () {
    wx.navigateTo({
      url: '../dynamic/dynamic',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})