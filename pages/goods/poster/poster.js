var e = getApp(), t = e.requirejs("core"), o = e.requirejs("foxui");

Page({
    data: {
        show: !1,
        accredit: "",
        errMsg: "",
        Image: ""
    },
    // 返回上一页
    return_top_tushu: function () {
      console.log(123);
      wx.navigateBack({ changed: true });//返回上一页
    },
    onLoad: function(e) {
        (e = e || {}).id ? this.getImage(e.id) : wx.redirectTo({
            url: "/pages/goods/index/index"
        });
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
    getImage: function(e) {
        var s = this;
        t.json("goods/poster/getimage", {
            id: e
        }, function(e) {
            console.log(e), 0 != e.error ? o.toast(s, e.message) : s.setData({
                Image: e.url
            });
        });
    },
    loadImg: function(e) {
        this.setData({
            show: !0
        });
    },
    previewImage: function() {
        var e = this;
        wx.previewImage({
            current: e.data.Image,
            urls: [ e.data.Image ]
        });
    },
    savePicture: function() {
        var e = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.writePhotosAlbum"] ? (wx.showLoading({
                    title: "图片下载中..."
                }), setTimeout(function() {
                    wx.hideLoading();
                }, 1e3), wx.downloadFile({
                    url: e.data.Image,
                    success: function(t) {
                        wx.saveImageToPhotosAlbum({
                            filePath: t.tempFilePath,
                            success: function(t) {
                                o.toast(e, "保存图片成功");
                            },
                            fail: function(t) {
                                e.setData({
                                    errMsg: t.errMsg
                                }), o.toast(e, "保存图片失败");
                            }
                        });
                    }
                })) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        wx.showLoading({
                            title: "图片下载中..."
                        }), setTimeout(function() {
                            wx.hideLoading();
                        }, 1e3), wx.downloadFile({
                            url: e.data.Image,
                            success: function(t) {
                                wx.saveImageToPhotosAlbum({
                                    filePath: t.tempFilePath,
                                    success: function(t) {
                                        o.toast(e, "保存图片成功");
                                    },
                                    fail: function(t) {
                                        e.setData({
                                            errMsg: t.errMsg
                                        }), o.toast(e, "保存图片失败");
                                    }
                                });
                            }
                        });
                    },
                    fail: function() {
                        wx.showModal({
                            title: "警告",
                            content: "您点击了拒绝授权，将无法正常使用保存图片或视频的功能体验，请删除小程序重新进入。"
                        });
                    }
                });
            }
        });
    }
});