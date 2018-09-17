var a = getApp(), t = a.requirejs("core");

a.requirejs("jquery");

Page({
    data: {
        swiperCurrent: 0,
        indicatorDots: !0,
        autoplay: !0,
        interval: 3e3,
        duration: 800,
        circular: !0,
        imgUrls: [],
        links: [],
        params: {},
        lotterydraws: [],
        exchanges: [],
        coupons: [],
        balances: [],
        category: [],
        hidden: !1,
        keywords: ""
    },
    // 屠苏返回键
    return_return_top_tushu: function () {
      // console.log(123);
      wx.navigateBack({ changed: true });//返回上一页
    },
    onLoad: function(a) {
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
    doinput: function(a) {
        this.setData({
            keywords: a.detail.value
        });
    },
    search: function() {
        var a = "/pages/creditshop/lists/index?keywords=" + this.data.keywords;
        wx.navigateTo({
            url: a
        });
    },
    focus: function() {
        this.setData({
            showbtn: "in"
        });
    },
    onReady: function() {
        this.get_index();
    },
    changeTo: function(a) {
        var t = a.currentTarget.dataset.url + "?id=" + a.currentTarget.dataset.gid;
        wx.navigateTo({
            url: t
        });
    },
    get_index: function() {
        var a = this;
        t.post("creditshop/index", a.data.params, function(t) {
            0 == t.error && a.setData({
                imgUrls: t.data.advs,
                category: t.data.category,
                lotterydraws: t.data.lotterydraws,
                exchanges: t.data.exchanges,
                coupons: t.data.coupons,
                balances: t.data.balances,
                redbags: t.data.redbags
            }), a.setData({
                hidden: !0
            });
        });
    }
});