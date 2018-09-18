var e = getApp(),
  t = e.requirejs("core"),
  a = e.requirejs("wxParse/wxParse"),
  i = e.requirejs("biz/diypage"),
  o = e.requirejs("jquery");
// pages/diy/tushu/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 返回上一页
  return_top_tushu: function () {
    console.log(123);
    wx.navigateBack({ changed: true });//返回上一页
  },
  return_index_tushu: function () {
    wx.switchTab({
      //返回首页
      url: '/pages/index/index',
    })
  },
  onLoad: function (options) {
    
    this.setData({
      merchid : options.id,
    })
    console.log(this.data.merchid);
    this.getData();
    this.getDatb();
    var that = this;
    wx.getSystemInfo({  //tushu
      success: function (res) {
        console.log(res.model)//手机机型
        console.log(res.model == "iPhone X")
        that.setData({
          statusBarHeight: res.statusBarHeight
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

 
  


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  console.log(12)
  },
  // ajax调用
  getData: function () {
    var merchid = this.data.merchid;
    console.log(merchid);
    var that = this;
    t.get("shop/baili/get_shop_info", { 'merchid': merchid}, function (t) {
      that.setData({
        shop: t.data,
        tel: t.data.tel,
        mobile: t.data.mobile,

      });
    });
  },
  getDatb: function () {
    var merchid = this.data.merchid;
    var that = this;
    t.get("shop/baili/get_goods_lists", {'merchid':merchid}, function (t) {
      that.setData({
        linst:t.lists,
      });
    });
  },
  // 拨打电话
  correspondence: function () {
    var that = this;
    var phone = that.data.mobile = '' ? that.data.mobile : that.data.tel;
    console.log(phone);
    wx.makePhoneCall({
      phoneNumber: phone, //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  }

})