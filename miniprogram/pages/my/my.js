// pages/my/my.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary:0,
    scan:0,
    note:0
  },

  //弹出赞赏码
  showQrcode() {
    wx.previewImage({
      urls: ['https://687a-hzpc-1258873690.tcb.qcloud.la/images/zanshang.png?sign=4dc26b3dfc93f0d3e226dd802d4f6c1d&t=1606063007'],
      current: 'https://687a-hzpc-1258873690.tcb.qcloud.la/images/zanshang.png?sign=4dc26b3dfc93f0d3e226dd802d4f6c1d&t=1606063007' // 当前显示图片的http链接      
    })
  },

  //统计笔记、日记、扫描次数
  getList:function(){
    var that = this;
    wx.request({
      url: 'https://hzpc.service.tcloudbase.com/api/v1.0/blogs',
      success (res) {
        that.setData({
          note:res.data.total
        })
      }
    })
    wx.request({
      url: 'https://hzpc.service.tcloudbase.com/api/v1.0/diary',
      success (res) {
        that.setData({
          diary:res.data.total
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})