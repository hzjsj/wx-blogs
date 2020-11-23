// pages/index/index.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      blogs:[],
      skip:0,
      title:""
  },
  search(e) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBlogs()
  },
  getBlogs:function(callback){
    wx.showLoading({
      title: '加载中',
    })

    if (!callback) {
      callback = res => { }
    }

    var that = this;
    wx.request({
      url: 'https://hzpc.service.tcloudbase.com/api/v1.0/blogs',
      data: {
        limit:10,
        skip:this.data.skip,
        fields:{
          "desc":0
        },
        sort:{
          _updateTime:-1
        }
      },
      success (res) {
        let skip = that.data.skip
        let blogs = that.data.blogs;
        let data = res.data.data
        for (let i = 0; i < data.length; i++) {
          data[i].createTime = util.formatTime(new Date(data[i]._createTime))
        }
        
        that.setData({
          blogs: skip == 0 ? data : blogs.concat(data),
          skip:skip+10
        })
      },
      complete(){
        wx.hideLoading()
        callback();
      }
    })
    
  },
desc:function(e){
  wx.navigateTo({
    url: '../desc/desc?id=' + e.currentTarget.dataset.id
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
    this.setData({
      skip:0
    })
    this.getBlogs(res => {
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getBlogs()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})