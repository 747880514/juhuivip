// pages/diy/tushu/ceshi/ceshi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },




  mytouchstart: function(e) {
    var that = this;
    //开始触摸，获取触摸坐标
    console.log(e)
    that.setData({
      startpoint: [e.touches[0].pageX,
        e.touches[0].pageY
      ]
    });
  },
  //触摸点移动
  mytouchmove: function(e) {
    //当前触摸点坐标
    var that = this;
    var curPoint = [e.touches[0].pageX, e.touches[0].pageY];
    var startpoint = that.data.startpoint;
    console.log(startpoint)
    console.log(curPoint)
    //比较pagex值
    if (curPoint[0] < startpoint[0]) {
      if (Math.abs(curPoint[0] - startpoint[0]) >= Math.abs(curPoint[1] - startpoint[1])) {
        console.log(e.timestamp + '-touch left move')
        that.setData({
          dellStyle: "dellList"
        })
      } else {
        if (curPoint[1] >= startpoint[1]) {
          console.log(e.timestamp + '-touch down move')
        } else {
          console.log(e.timestamp + '-touch up move')
        }
      }
    } else {
      if (Math.abs(curPoint[0] - startpoint[0] >= Math.abs(curPoint[1] - startpoint[1]))) {
        console.log(e.timestamp + '-touch right move')
        that.setData({
          dellStyle: "modList"
        })
      } else {
        if (curPoint[1] >= startpoint[1]) {
          console.log(e.timestamp + '-touch down move')
        } else {
          console.log(e.timestamp + '-touch up move')
        }
      }
    }
  }




})