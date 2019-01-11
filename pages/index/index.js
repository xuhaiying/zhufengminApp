// pages/index/index.js
//const app = getApp();
//console.log(app);
//const app = getApp();
//console.log(app)
//import {base_url,fn} from '../../utils/config.js';
import { request } from '../../utils/request-promis.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    item:"",
    imgUrls:null,
    lession:null  
  },
  onMyEvent(event){
    //console.log(event);
    const detail = JSON.stringify(event.detail);
    wx.navigateTo({
      url: `/pages/detail/detail?param=${detail}`,
    })
  },
  callPhone(){
    wx.makePhoneCall({
      phoneNumber: '12344566777',
    });
  },
  toH5Page(e){
    // target 触发事件的源组件，也就是事件源
    // currentTarget 事件绑定的当前组件
    console.log(e)
    const url = e.target.dataset.url;
    console.log(url)
    wx.navigateTo({
      url: "/pages/webview/webview?url="+encodeURIComponent(url)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSliders();
    this.getLessons();
  },
  getLessons(){
    request({
      url: '/getLessons',
    }).then((data)=>{
      this.setData({
        lession: data
      })
    })
  },

  getSliders(){
    request({
      url:'/getSliders'
    }).then((data)=>{
      this.setData({
        imgUrls: data
      })
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
    console.log("lower")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})