// pages/test/test.js
// 引入`towxml3.0`解析方法
const towxml= require('../../towxml/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })

    var that = this;
    wx.request({
      url: 'https://hzpc.service.tcloudbase.com/api/v1.0/blogs/'+options.id,
      success (res) {
        let obj = towxml(res.data.data.desc,'markdown',{
          // theme:'dark',
          events:{
            tap:e => {

              let data = e.currentTarget.dataset.data
              if(data.tag == "img"){
                wx.previewImage({
                  current: data.attr.src, // 当前显示图片的http链接
                  urls: [data.attr.src] // 需要预览的图片http链接列表
                })
              }
            },
            change:e => {
              console.log('todo',e);
            }
          }
        });
  
        that.setData({
          article:obj
        });
      },
      complete(){
        wx.hideLoading()
      }

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