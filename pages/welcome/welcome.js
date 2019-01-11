// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized:false,
    userInfo: null
  },
  onToIndexPage: function (){
    // wx.navigateTo({
    //   url: '/pages/flex/flex',
    // })
    wx.switchTab({
      url: '/pages/index/index',
      success:()=>{},
      fail:()=>{

      },
      complete:()=>{

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onGetUserInfo: function (event){
   // console.log(event);
    this.setData({
      authorized: true,
      userInfo: event.detail.userInfo
    })
  },
  onLoad: function (options) {
   // console.log("onLoad");
    // 判断是否用户已经授权
    this.userAuthlorized();
    // wx.getUserInfo({
    //   success:data=>{
    //     console.log(data)
    //   }
    // })
  },
  userAuthlorized: function(){
    wx.getSetting({
      success:data=>{
        if (data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              });
             // console.log(this.data)
            }
          })
        } else {
         // console.log("未授权")
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   // console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //console.log("onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   // console.log("onUnload");
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
    return {
      title: '我的第一个小程序',
      path: '/page/index/index'
    }
  }
})