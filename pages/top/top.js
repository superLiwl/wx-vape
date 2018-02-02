Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "路飞",
    photo: '../../images/photo.jpg',
    sex: '1',
    autograph: '海贼王',
    information: '基本资料：康康的广发卡喝上咖啡打开拉克丝大姐夫卡号发的卡拉东方航空拉黑啊数据库的弗拉很舒服的',
    attentionState: '0',
    lableList: [
      {
        lable: '未来海贼王'
      },
      {
        lable: '汉库克的男人'
      },
      {
        lable: '娜美的男人'
      },
      {
        lable: '娜美的男人'
      },
    ],
    progress: 50,
    smokeNum: 20,
    rankingList: [
      {
        topNumber: '../../images/top1.png',
        name: '娜美',
        photo: '../../images/image5.jpg',
        smoke: '60ml'
      },
      {
        topNumber: '../../images/top2.png',
        name: '诺诺罗亚.索隆',
        photo: '../../images/image6.jpg',
        smoke: '40ml'
      },
      {
        topNumber: '../../images/top3.png',
        name: '路飞',
        photo: '../../images/photo.jpg',
        smoke: '20ml'
      }
    ],
    progressNum: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var attentionIcon;
    var attentionState = this.data.attentionState;
    if (attentionState == '0') {
      this.setData({ attentionIcon: '../../images/attention_heart.png' })
    } else {
      this.setData({ attentionIcon: '../../images/unattention_heart.png' })
    }
    var sex = this.data.sex;
    var name = this.data.name;
    if (sex == '1') {
      this.setData({ name: name + ' ♂' })
    } else {
      this.setData({ name: name + ' ♀' })
    }

    that.smokeProgress();
  },
  smokeProgress: function () {
    let progressNum = this.data.progressNum;
    let progress = this.data.progress;
    var length = (progress / 20);
    for (var i = 0; i < length; i++) {
      progressNum.push(80 * i - 80 + 'rpx')
    }
    this.setData({
      progressNum: progressNum
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