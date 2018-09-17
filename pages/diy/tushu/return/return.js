// pages/diy/tushu/return/return.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({  //tushu
      success: function (res) {
        console.log(res.model)//手机机型
        console.log(res.model == "iPhone X")
        that.setData({
          statusBarHeight: res.statusBarHeight,
          fuzhukongbaiq: 105 + res.statusBarHeight * 2 + "rpx",
          
        })
        if (res.model == "iPhone X") {
          that.setData({
            isIPX: "ipx"
          });
        }
        else if (res.model == "iPhone 7 Plus" || res.model == "iPhone 7" || res.model == "iPhone 6 Plus" || res.model == "iPhone 6" || res.model == "iPhone 5" || res.model == "iPhone 7 Plus<iPhone9,2>") {
          that.setData({
            isIPX: "iPhone"
          });
        }
        else {
          that.setData({
            isIPX: "Android"
          });
        }
      }
    });
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

  },
  // 屠苏返回键
  return_return_top_tushu: function () {
    // console.log(123);
    wx.navigateBack({ changed: true });//返回上一页
  }

})