const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary:[],
    skip: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      skip:0
    })
    this.getDiary()
  //  this.getTask()
  },
  getDiary:function(callback){
    wx.showLoading({
      title: '数据加载中',
    })
    if (!callback) {
      callback = res => { }
    }
    var that = this;
    wx.request({
      url: 'https://hzpc.service.tcloudbase.com/api/v1.0/diary',
      data: {
        limit:10,
        skip:this.data.skip,
        sort:{
          _updateTime:-1
        }
      },
      success (res) {
        let skip = that.data.skip;
        let diary = that.data.diary;
        let data = res.data.data;
        for (let i = 0; i < data.length; i++) {
          data[i].date = util.getDay(new Date(data[i]._updateTime))
          data[i].time = util.getTime(new Date(data[i]._updateTime))
        }
        that.setData({
          diary: skip == 0 ? data : diary.concat(data),
          skip:skip+10
        })
      },complete(){
        wx.hideLoading()
        callback()
      }
      })
  },

  // 图片预览
  viewImage:function(e){
    wx.previewImage({
      current: e.currentTarget.dataset.photo, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.photo] // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    this.setData({
      skip:0
    })
    this.getDiary(res => {
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getDiary()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})