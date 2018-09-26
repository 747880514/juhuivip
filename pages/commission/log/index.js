var t = getApp().requirejs("core");

Page({
    data: {
        status: 0,
        page: 1,
        list: []
    },
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
    onLoad: function() {
        this.getList();
        var that = this;
        wx.getSystemInfo({  //tushu
          success: function (res) {
            console.log(res.model)//手机机型
            console.log(res.model == "iPhone X")
            that.setData({
              statusBarHeight: res.statusBarHeight,
              fuzhukongbaiq: 105 + res.statusBarHeight + "rpx",
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
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getList: function() {
        var a = this;
        t.get("commission/log/get_list", {
            page: a.data.page,
            status: a.data.status
        }, function(t) {
            var s = {
                total: t.total,
                pagesize: t.pagesize,
                commissioncount: t.commissioncount,
                textyuan: t.textyuan,
                textcomm: t.textcomm,
                textcomd: t.textcomd,
                show: !0
            };
            t.list.length > 0 && (s.page = a.data.page + 1, s.list = a.data.list.concat(t.list), 
            t.list.length < t.pagesize && (s.loaded = !0)), a.setData(s), wx.setNavigationBarTitle({
                title: t.textcomd + "(" + t.total + ")"
            });
        }, this.data.show);
    },
    myTab: function(a) {
        var s = this, e = t.pdata(a).status;
        s.setData({
            status: e,
            page: 1,
            list: []
        }), s.getList();
    }
});