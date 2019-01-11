// pages/search/search.js
import {request} from '../../utils/request-promis.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:"",
    hotLesson:[],
    lesson:[],
    shareLesson: false,
    timer: 0,
    noData: false,
    historySearch: wx.getStorageSync("historySearch")||[],
    size: 6,
    noMore: false,
    total: null
  },
  onScroll(e){
   // console.log(e)
  },
  onLowder(e){
    //console.log(e)
  },
  onUpper(e){
    console.log(e)
  },
  onMyEvent(event){
    const detail = JSON.stringify(event.detail);
    wx.navigateTo({
      url: `/pages/detail/detail?param=${detail}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotLesson();
    let height = wx.getSystemInfoSync()
    console.log(height)
  },
  getHotLesson(){
    request({
      url:'/hot_lesson'
    }).then((data)=>{
      this.setData({
        hotLesson: data
      })
    })
  },
  onConfirm(event){
    const word = event.detail.value || event.target.dataset.word;
    if (word){
      this.searchBykeyword(word);
      this.addHistroySearch(word);
      this.setData({
        shareLesson: true,
        keyword:word
      })
    }
  },
  addHistroySearch(word){
    let historySearch = wx.getStorageSync("historySearch")||[];
    const has = historySearch.includes(word);
    if (!has){
      const len = historySearch.length;
      if (len >= 10){
        historySearch.pop();
      }
      historySearch.unshift(word);
      wx.setStorage({
        key: 'historySearch',
        data: historySearch,
        success:()=>{
          this.setData({
            historySearch: historySearch
          })
        }
      })
    }
  },
  searchBykeyword(word){
    const start = this.data.lesson.length;
    request({
      url: `/query?q=${encodeURIComponent(word)}&start=${start}&size${this.data.size}`
    }).then((data) => {
      setTimeout(()=>{
        this.setLesson(data);
      },2000);
      // this.setData({
      //   shareLesson: true,
      //   lesson: data.lesson
      // })
      // console.log(data)
    })
  },
  setLesson(data){
    this.data.total = data.total;
    if(data.total == 0) {
      this.setData({
        noData: true,
        lesson: []
      })
    } else {
      let lesson = this.data.lesson.concat(data.lesson);
      this.setData({
        lesson: lesson
      })
    }
  },
  clearStorage(){
    wx.removeStorageSync("historySearch");
    this.setData({
      historySearch:[]
    })
  },
  onCancel(){
    this.init();
  },
  init(){
    this.setData({
      lesson:[],
      noData: false,
      shareLesson: false,
      keyword: "",
      noMore: false,
      total: null
    })
  },
  // 模糊查询
  onInput(event){
    clearTimeout(this.data.timer)
    let timer = setTimeout(()=>{
      const word = event.detail.value;
      if (word){
        // 向服务器发送请求
        //console.log(event);
      }
    },600);
    this.data.timer = timer;
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.init();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.hasMore()){
      this.searchBykeyword(this.data.keyword);
    } else {
      this.setData({
        noMore: true
      })
    }
  },
  hasMore(){
    return this.data.lesson.length < this.data.total
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})