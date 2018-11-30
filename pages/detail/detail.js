// pages/detail/detail.js
const fetch = require('../../utils/fetch')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    info:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch(`/shops/${options.id}`).then(res => {
      console.log(res);
      this.setData({
        id: options.id,
        info:res.data
      })

      wx.setNavigationBarTitle({
        title: this.data.info.name
      })
    })
    
  },
  previewHandle(e) {
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: this.data.info.images // 需要预览的图片http链接列表
    })
  },
  previewUserHandle(e) {
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: [e.target.dataset.src] // 需要预览的图片http链接列表
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