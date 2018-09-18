var e = getApp(),
    t = e.requirejs("core"),
    a = e.requirejs("wxParse/wxParse"),
    i = e.requirejs("biz/diypage"),
    o = e.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.geren();
    this.getInfo();
    this.getData();
    this.getList();
    this.getdairu();
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  // geren() {
  //   var that = this;

  //   wx.request({
  //     url: '',
  //     method: "GET",
  //     header: {
  //       'Content-Type': 'application/json'
  //     },

  //     success: function(res) {
  //       console.log(res.data);
  //       that.setData({
  //         list: res.data.result.lists,
  //       })
  //     }
  //   })
  // },

  getInfo: function() {
    var e = this;
    t.get("member", {}, function(t) {
      0 != t.error ? e.setData({
        modelShow: !0
      }) : e.setData({
        member: t,
        show: !0,
        nickname: t.nickname,
        agent_nickname: t.agent_nickname,
        invitation_code: t.invitation_code,
        avatar: t.avatar,
        agent_weixin: t.agent_weixin
      }), a.wxParse("wxParseData", "html", t.copyright, e, "5");
    });
  },
  getData: function() {
    var that = this;
    t.get("commission/index", {}, function(t) {
      that.setData({
        mm: t.member,
        ee:t
      });
      // 7e4 != t.error ? (t.show = !0, that.setData(t), wx.setNavigationBarTitle({
      //   title: t.set.texts.center
      // })) : wx.redirectTo({
      //   url: "/pages/commission/register/index"
      // });
    });
  },
  getList: function() {
    var that = this;
    t.get("https://www.juhuivip.com/app/ewei_shopv2_api.php?i=2&r=commission.order_baili", {}, function(t) {
      that.setData({
        rr: t
      });
    });
  },
  // 复制
  copyTBL: function() {
    var self = this;
    wx.setClipboardData({
      data: self.data.invitation_code, //写传的值
      success: function(res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    });
  },
  // 联系他复制
  copyWeixin: function() {
    var self = this;
    if (self.data.agent_weixin != ''){
      wx.showModal({
        title: '提示',
        content: '是否复制微信号：' + self.data.agent_weixin,
        success: function (res) {
          if (res.confirm) {
            wx.setClipboardData({
              data: self.data.agent_weixin, //写传的值
            });
          }
        }
      })
    }else{
      wx.showToast({
        title: '导师还没有上传微信号。',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 待入账
  getdairu: function() {
    var that = this;
    t.get("commission/withdraw_baili", {}, function (t) {
      that.setData({
        dd: t
      });
    });
  },
  // 跳转链接
  // 我的蒜队
  wodesuandui: function () {
    wx.navigateTo({
      url: '/pages/commission/down/index'
    })
  },
  // 总收益、可提现、待入账
  zongshouyi: function () {
    wx.navigateTo({
      url: '/pages/commission/withdraw/index'
    })
  },
  // 业绩订单
  yejidingdan:function(){
    wx.navigateTo({
      url: '/pages/commission/order/index'
    })
  },
  // 今日收益
  jinrishouyi: function () {
    wx.navigateTo({
      url: '/pages/commission/down/index'
    })
  },
  // 本周收益
  benzhoushouyi: function () {
    wx.navigateTo({
      url: '/pages/commission/down/index'
    })
  },
  // 本月收益
  benyueshouyi: function () {
    wx.navigateTo({
      url: '/pages/commission/down/index'
    })
  },
  // 导航首页
  shouyetushu:function(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  // 导航全部分类
  quanbutushu: function () {
    wx.switchTab({
      url: '/pages/shop/caregory/index'
    })
  },
  // 导航vip会员
  huiyuanviptushu: function () {
    wx.switchTab({
      url: '/pages/commission/index'
    })
  },
  // 导航购物车
  gouwuchetushu: function () {
    wx.switchTab({
      url: '/pages/member/cart/index'
    })
  },
  // 导航会员中心
  huiyuanzhongxintushu: function () {
    wx.switchTab({
      url: '/pages/member/index/index'
    })
  },

})



