// pages/list/list.js
const fetch = require("../../utils/fetch")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    list:[],
    currentPage:0,
    totalPage:10,
    id:1,
    hasMore:true,
    isDone:true,
    searchText:'',
    searchShowed:false
  },
  searchChangeHandle(e) {
    console.log('开始检索');
    this.setData({
      title: e.detail.value,
      list: [],
      searchText: e.detail.value,
      currentPage: 0,
      hasMore: true
    })
    this.loadMore()
  },
  searchHandle(e) {
    console.log('开始搜索');
    this.setData({
      title: e.detail.value,
      list:[],
      searchText,
      currentPage: 0,
      hasMore: true
    })
    this.loadMore()
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  showSearchHandle(e) {
    this.setData({
      searchShowed:true
    })
  },
  hideSearchHandle(e) {
    this.setData({
      searchShowed: false,
      searchText: ''
    })
  },
  blurHandle(e) {
    this.setData({
      searchShowed: false,
      searchText:''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch(`/categories/${options.cat}`).then(res => {
      this.setData({
        id:res.data.id,
        title:res.data.name
      })
      this.loadMore()
    })
  },
  loadMore() {
    if (!this.data.hasMore || !this.data.isDone) {
      return 
    }
    this.setData({
      isDone:false
    })
      let { currentPage, totalPage, searchText } = this.data
      currentPage++
      let params = {
        _page: currentPage, 
        _limit: totalPage
      }
      if (searchText) {
        params.q = searchText
      }
        console.log(params);
        return fetch(`/categories/${this.data.id}/shops`, params).then(res => {
          console.log(res.data);
        let total = parseInt(res.header['X-Total-Count'])
        let hasMore = currentPage * this.data.totalPage <= total
        let list = this.data.list.concat(res.data)
        let isDone = true
        this.setData({
          list,
          currentPage,
          hasMore,
          isDone
        });
      })
    

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.title) {
      wx.setNavigationBarTitle({
        title:this.data.title
      })
    }
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
      list: [],
      currentPage: 0,
      hasMore: true,
      isDone: true
    })
    this.loadMore().then(()=> {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})