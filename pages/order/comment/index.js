var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        stars_class: [ "text-default", "text-primary", "text-success", "text-warning", "text-danger" ],
        stars_text: [ "差评", "一般", "挺好", "满意", "非常满意" ],
        normalSrc: "icox icox-star",
        selectedSrc: "icox icox-xing selected",
        key: -1,
        content: "",
        images: [],
        imgs: []
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
    onLoad: function(a) {
        this.setData({
            options: a
        }), t.url(a), this.get_list();
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
    get_list: function() {
        var t = this;
        a.get("order/comment", t.data.options, function(e) {
            0 == e.error ? (e.show = !0, t.setData(e)) : (a.toast(e.message, "loading"), wx.navigateBack());
        }, !0);
    },
    select: function(t) {
        var a = t.currentTarget.dataset.key;
        this.setData({
            key: a
        });
    },
    change: function(t) {
        var e = {};
        e[a.data(t).name] = t.detail.value, this.setData(e);
    },
    submit: function() {
        var t = {
            orderid: this.data.options.id,
            comments: []
        };
        if ("" == this.data.content || -1 == this.data.key) return a.alert("有未填写项目!"), !1;
        for (var e = 0, s = this.data.goods.length; e < s; e++) {
            var i = {
                goodsid: this.data.goods[e].goodsid,
                level: this.data.key + 1,
                content: this.data.content,
                images: this.data.images
            };
            t.comments.push(i);
        }
        a.post("order/comment/submit", t, function(t) {
            0 != t.error && a.toast(t.message, "loading"), wx.navigateBack();
        }, !0);
    },
    upload: function(t) {
        var e = this, s = a.data(t), i = s.type, o = e.data.images, n = e.data.imgs, r = s.index;
        "image" == i ? a.upload(function(t) {
            o.push(t.filename), n.push(t.url), e.setData({
                images: o,
                imgs: n
            });
        }) : "image-remove" == i ? (o.splice(r, 1), n.splice(r, 1), e.setData({
            images: o,
            imgs: n
        })) : "image-preview" == i && wx.previewImage({
            current: n[r],
            urls: n
        });
    }
});