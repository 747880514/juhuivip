var t = getApp(), e = t.requirejs("core"), o = t.requirejs("foxui"), oe = t.requirejs("biz/order");

Page({
    data: {
        icons: t.requirejs("icons"),
        success: !1,
        successData: {},
        coupon: !1
    },
    // 返回上一页
    return_top_tushu: function () {
      console.log(123);
      wx.navigateBack({ changed: true });//返回上一页
    },
    onLoad: function(e) {
        this.setData({
            options: e
        }), t.url(e);
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
    onShow: function() {
        this.get_list();
    },
    get_list: function() {
        var t = this;
        e.get("order/pay", t.data.options, function(o) {
            50018 != o.error ? (!o.wechat.success && "0.00" != o.order.price && o.wechat.payinfo && e.alert(o.wechat.payinfo.message + "\n不能使用微信支付!"), 
            t.setData({
                list: o,
                show: !0
            })) : wx.navigateTo({
                url: "/pages/order/details/index?id=" + t.data.options.id
            });
          t.ouririj();
        });
      //验证是否存在下架商品
      e.get("order/baili/taokezhushou_detail", t.data.options, function (res) {
        t.setData({
          showpaylist: res.min
        });

        if (res.min == 0) {
          oe.cancel(res.orderid, '商品下架，系统自动取消', "/pages/order/index?status=0");
        }

      });
      
       
    },
    ouririj:function(){
      var t = this;
      
        //  验证是否需要填写身份证号
        e.get("order/baili/checkIdNumber", { ordersn: t.data.list.order.ordersn }, function (res) {
          console.log(123);
          t.setData({
            status: res.status,
          })
          if (res.status == 0)
            {

              wx.showModal({
                title: '提示',
                content: '订单存在海外商品，需要提供您的身份证号，立即填写',
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/pages/member/info/index'
                    })
                  } else if (res.cancel) {

                  }
                }
              })
            }

        })
    },

    pay: function(t) {
        var o = e.pdata(t).type, a = this, i = this.data.list.wechat;
        "wechat" == o ? e.pay(i.payinfo, function(t) {
            "requestPayment:ok" == t.errMsg && a.complete(o);
        }) : "credit" == o ? e.confirm("确认要支付吗?", function() {
            a.complete(o);
        }, function() {}) : "cash" == o ? e.confirm("确认要使用货到付款吗?", function() {
            a.complete(o);
        }, function() {}) : a.complete(o);
    },
    complete: function(t) {
        var a = this;
        e.post("order/pay/complete", {
            id: a.data.options.id,
            type: t
        }, function(t) {
            if (0 != t.error) o.toast(a, t.message); else {
                wx.setNavigationBarTitle({
                    title: "支付成功"
                });
                var e = Array.isArray(t.ordervirtual);
                a.setData({
                    success: !0,
                    successData: t,
                    order: t.order,
                    ordervirtual: t.ordervirtual,
                    ordervirtualtype: e
                });
            }
        }, !0, !0);
    },
    shop: function(t) {
        0 == e.pdata(t).id ? this.setData({
            shop: 1
        }) : this.setData({
            shop: 0
        });
    },
    phone: function(t) {
        e.phone(t);
    },
    closecoupon: function() {
        this.setData({
            coupon: !1
        });
    }
});