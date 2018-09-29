var e = getApp(), 
    t = e.requirejs("core"), 
    a = e.requirejs("wxParse/wxParse"), 
    i = e.requirejs("biz/diypage"), 
    o = e.requirejs("jquery");

Page({
    data: {
        route: "member",
        icons: e.requirejs("icons"),
        member: {},
        diypages: {},
        audios: {},
        audiosObj: {},
        modelShow: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        swiperheight: 0,
        iscycelbuy: !1,
        bargain: !1,
        bindagent_res_view_data: '',
        like_lists: !1,         //tushu
    },
    onLoad: function (t) {
        var a = this;
        a.sti_sda();
        a.getInfo();
        e.url(t), wx.getSystemInfo({
            success: function(e) {
                var t = e.windowWidth / 1.7;
                a.setData({
                    windowWidth: e.windowWidth,
                    windowHeight: e.windowHeight,
                    swiperheight: t
                });
            }
        }), i.get(this, "member", function(e) {}), "" == e.getCache("userinfo") && a.setData({
            modelShow: !0
          }), wx.getSystemInfo({
            success: function (res) {
              if (res.model == "iPhone X") {
                a.setData({
                  isIPX: true
                });
              } else {
                a.setData({
                  isIPX: false
                });
              }
            }
          })
    }, 
    getInfo: function () {
      var e = this;
      t.get("member", {}, function (t) {
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

        // 强制绑定手机号
        if (t.needbind == 1) {
          wx.showModal({
            title: '提示',
            content: '请填写手机号',
            showCancel: false,
            confirmText: '前去填写',
            success: function (res) {
              if (res.confirm) {//这里是点击了确定以后

                wx.navigateTo({
                  url: '/pages/member/bind/index'
                })

              }
            }
          })
        }


      });
    },
    onShow: function () {
      var e = this;
      e.getInfo();
      wx.getSetting({
        success: function (t) {
          var a = t.authSetting["scope.userInfo"];
          e.setData({
            limits: a
          }), a || e.setData({
            modelShow: !0
          });
        }
      });
    },
    onShareAppMessage: function() {
        return t.onShareAppMessage();
    },
    cancelclick: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    confirmclick: function() {
        this.setData({
            modelShow: !1
        });
    },
    // phone: function() {
    //     var e = this.data.phonenumber + "";
    //     wx.makePhoneCall({
    //         phoneNumber: e
    //     });
    // },
    play: function(e) {
        var t = e.target.dataset.id, a = this.data.audiosObj[t] || !1;
        if (!a) {
            a = wx.createInnerAudioContext("audio_" + t);
            var i = this.data.audiosObj;
            i[t] = a, this.setData({
                audiosObj: i
            });
        }
        var o = this;
        a.onPlay(function() {
            var e = setInterval(function() {
                var i = a.currentTime / a.duration * 100 + "%", r = Math.floor(Math.ceil(a.currentTime) / 60), s = (Math.ceil(a.currentTime) % 60 / 100).toFixed(2).slice(-2), n = Math.ceil(a.currentTime);
                r < 10 && (r = "0" + r);
                var u = r + ":" + s, c = o.data.audios;
                c[t].audiowidth = i, c[t].Time = e, c[t].audiotime = u, c[t].seconds = n, o.setData({
                    audios: c
                });
            }, 1e3);
        });
        var r = e.currentTarget.dataset.audio, s = e.currentTarget.dataset.time, n = e.currentTarget.dataset.pausestop, u = e.currentTarget.dataset.loopplay;
        0 == u && a.onEnded(function(e) {
            c[t].status = !1, o.setData({
                audios: c
            });
        });
        var c = o.data.audios;
        c[t] || (c[t] = {}), a.paused && 0 == s ? (a.src = r, a.play(), 1 == u && (a.loop = !0), 
        c[t].status = !0, o.pauseOther(t)) : a.paused && s > 0 ? (a.play(), 0 == n ? a.seek(s) : a.seek(0), 
        c[t].status = !0, o.pauseOther(t)) : (a.pause(), c[t].status = !1), o.setData({
            audios: c
        });
    },
    pauseOther: function(e) {
        var t = this;
        o.each(this.data.audiosObj, function(a, i) {
            if (a != e) {
                i.pause();
                var o = t.data.audios;
                o[a] && (o[a].status = !1, t.setData({
                    audios: o
                }));
            }
        });
    },
    onHide: function() {
        this.pauseOther(), this.setData({
            modelShow: !1
        });
    },
    onUnload: function() {
        this.pauseOther();
    },
    navigate: function(e) {
        var t = e.currentTarget.dataset.url, a = e.currentTarget.dataset.phone, i = e.currentTarget.dataset.appid, o = e.currentTarget.dataset.appurl;
        t && wx.navigateTo({
            url: t
        }), a && wx.makePhoneCall({
            // phoneNumber: a
        }), i && wx.navigateToMiniProgram({
            appId: i,
            path: o
        });
    },
    userinfo: function(t) {
        var a = this;
        e.getUserInfo(function() {
            a.onShow();
        });
    },
    //百里 存储输入的邀请码
    getCode: function (e) {
      var val = e.detail.value;
      this.setData({
        phoneCode: val
      });
    },
    //百里 获取输入的邀请码，异步请求
    bindagent: function(e) {
        var code = this.data.phoneCode; 
        var mid  = e.currentTarget.dataset.mid;
        var that = this;
        wx.request({
          url: "https://www.juhuivip.com/app/ewei_shopv2_api.php?i=2&r=member.baili.bindagent&code="+code+"&mid="+mid,
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            that.setData({ bindagent_res_view_data: res.data.result.msg});
            if (res.data.status == 1)
            {
              // wx.navigateTo({
              //   url: '../../../pages/index/index'
              // })
              // wx.redirectTo({
              //   url: '../../../pages/index/index'
              // })
              
              wx.switchTab({
                url: '../../../pages/index/index'
              })
              page.onLoad(); 
              // wx.reLanch({
              //   url: '../../../pages/index/index'
              // })
            }
          }
        });
    },
    // tushu
    copytxt: function (e) {
      //复制文本
      this.setData({
        copytxt: e.currentTarget.dataset.copy
      });
      wx.setClipboardData({
        data: this.data.copytxt,
        success: function (res) {

        }
      });
    },
    // tushu
    sti_sda: function () {
      var a = this;
      var ss;
      wx.request({
        url: 'https://www.juhuivip.com/app/ewei_shopv2_api.php?i=2&r=member.baili.guesslike',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (e) {
            ss = {
              show: !0,
              ismerch: !1,
              empty: e.empty || !1
            }, void 0 === e.data.like_lists ? (ss.list = e.list || [], a.setData(ss)) : (ss.like_lists = e.data.like_lists || [],
              ss.ismerch = !0, a.setData(ss));
        }
      });
      // var t, i = this;
      // var a = this;
      // t.get("member/baili/guesslike", "", function (e) {
      //   t = {
      //     show: !0,
      //     ismerch: !1,
      //     // ischeckall: e.ischeckall,
      //     // total: e.total,
      //     // cartcount: e.total,
      //     // totalprice: e.totalprice,
      //     empty: e.empty || !1
      //   }, void 0 === e.like_lists ? (t.list = e.list || [], a.setData(t)) : (t.like_lists = e.like_lists || [],
      //     t.ismerch = !0, a.setData(t));
      // });
    },
    lianxikefu:function(){
      wx.makePhoneCall({
        phoneNumber: '4008010783',
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })

  }, 
    // 身份按钮
    shenfen: function(){
      wx.switchTab({
        url: '/pages/commission/index'
      })
    },
    // 余额按钮
    yve: function () {
      wx.navigateTo({
        url: '/pages/commission/withdraw/index'
      })
    }, 
  // 优惠券按钮
    youhuijuan: function () {
      wx.navigateTo({
        url: '/pages/sale/coupon/index/index'
      })
    },
  // 头像按钮
    shezhitiaozhuang:function(){
      wx.navigateTo({
        url: '/pages/member/info/index'
      })
    }

});