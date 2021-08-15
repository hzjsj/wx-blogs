const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '111',
    hasUser: 0,
    uid: '',
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkUser()
    if (options.scene) {
      const scene = decodeURIComponent(options.scene)
      this.setData({
        uid: scene
      })
    }
  },
  checkUser() {
    wx.cloud.callFunction({
        // 云函数名称
        name: 'checkUser'
      })
      .then(res => {
        console.log(res.result) 
        this.setData({
          hasUser: res.result.data.length
        })
      })
      .catch(console.error)
  },
  getUserProfile() {
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.hasUser) {
      wx.cloud.callFunction({
          // 云函数名称
          name: 'updateUser',
          // 传给云函数的参数
          data: {
            uid: this.data.uid
          },
        })
        .then(res => {
          console.log(res.result) // 3
          this.setData({
            isLogin:true
          })
          wx.showToast({
            title: '登入成功',
            icon: 'success',
            duration: 2000
          })
        })
        .catch(console.error)
    } else {
      const that = this;
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)

          db.collection('user').add({
              // data 字段表示需新增的 JSON 数据
              data: {
                ...res.userInfo,
                uid: that.data.uid
              }
            })
            .then(res => {
              this.setData({
                hasUser: 1,
                isLogin:true
              })
              wx.showToast({
                title: '登入成功',
                icon: 'success',
                duration: 2000
              })

              console.log("创建结果", res)
            })
        }
      })
    }
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