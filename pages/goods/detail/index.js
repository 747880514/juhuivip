function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a, o = getApp(), i = o.requirejs("core"), s = (o.requirejs("icons"), o.requirejs("foxui")), n = o.requirejs("biz/diypage"), r = o.requirejs("biz/diyform"), c = o.requirejs("biz/goodspicker"), d = o.requirejs("jquery"), u = o.requirejs("wxParse/wxParse"), l = 0, g = o.requirejs("biz/selectdate");

var mta = o.requirejs("mta_analysis");

Page((a = {
    data: (e = {
        diypages: {},
        usediypage: !1,
        specs: [],
        options: [],
        icons: o.requirejs("icons"),
        goods: {},
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        circular: !0,
        play: "https://static.btaeo.cn/static/images/video_play.png",
        mute: "https://static.btaeo.cn/static/images/icon/mute.png",
        voice: "https://static.btaeo.cn/static/images/icon/voice.png",
        active: "",
        slider: "",
        tempname: "",
        info: "active",
        preselltimeend: "",
        presellsendstatrttime: "",
        advWidth: 0,
        dispatchpriceObj: 0,
        now: parseInt(Date.now() / 1e3),
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        timer: 0,
        discountTitle: "",
        istime: 1,
        istimeTitle: "",
        isSelected: !1,
        params: {},
        total: 1,
        optionid: 0,
        audios: {},
        audiosObj: {},
        defaults: {
            id: 0,
            merchid: 0
        },
        buyType: "",
        pickerOption: {},
        specsData: [],
        specsTitle: "",
        canBuy: "",
        diyform: {},
        showPicker: !1,
        showcoupon: !1,
        pvalOld: [ 0, 0, 0 ],
        pval: [ 0, 0, 0 ],
        areas: [],
        noArea: !0,
        commentObj: {},
        commentObjTab: 1,
        loading: !1,
        commentEmpty: !1,
        commentPage: 1,
        commentLevel: "all",
        commentList: [],
        closeBtn: !1,
        soundpic: !0,
        animationData: {},
        uid: "",
        stararr: [ "all", "good", "normal", "bad", "pic" ],
        nav_mask: !1,
        nav_mask2: !1,
        nav: 0,
        giftid: "",
        limits: !0,
        modelShow: !1,
        showgoods: !0
    }, t(e, "timer", 0), t(e, "lasttime", 0), t(e, "hour", "-"), t(e, "min", "-"), t(e, "sec", "-"), 
    t(e, "currentDate", ""), t(e, "dayList", ""), t(e, "currentDayList", ""), t(e, "currentObj", ""), 
    t(e, "currentDay", ""), t(e, "checkedDate", ""), t(e, "showDate", ""), t(e, "scope", ""), 
    e),
    favorite: function(t) {
        var e = this;
        if (e.data.limits) {
            var a = t.currentTarget.dataset.isfavorite ? 0 : 1;
            i.get("member/favorite/toggle", {
                id: e.data.options.id,
                isfavorite: a
            }, function(t) {
                t.isfavorite ? e.setData({
                    "goods.isfavorite": 1
                }) : e.setData({
                    "goods.isfavorite": 0
                });
            });
        } else this.setData({
            modelShow: !0
        });
    },
    menucart: function() {
        this.data.limits ? wx.switchTab({
            url: "/pages/member/cart/index"
        }) : this.setData({
            modelShow: !0
        });
    },
    goodsTab: function(t) {
        var e = this, a = t.currentTarget.dataset.tap;
        if ("info" == a) this.setData({
            info: "active",
            para: "",
            comment: ""
        }); else if ("para" == a) this.setData({
            info: "",
            para: "active",
            comment: ""
        }); else if ("comment" == a) {
            if (e.setData({
                info: "",
                para: "",
                comment: "active"
            }), e.data.commentList.length > 0) return void e.setData({
                loading: !1
            });
            e.setData({
                loading: !0
            }), i.get("goods/get_comment_list", {
                id: e.data.options.id,
                level: e.data.commentLevel,
                page: e.data.commentPage
            }, function(t) {
                t.list.length > 0 ? e.setData({
                    loading: !1,
                    commentList: t.list,
                    commentPage: t.page
                }) : e.setData({
                    loading: !1,
                    commentEmpty: !0
                });
            });
        }
    },
    comentTap: function(t) {
        var e = this, a = t.currentTarget.dataset.type, o = "";
        1 == a ? o = "all" : 2 == a ? o = "good" : 3 == a ? o = "normal" : 4 == a ? o = "bad" : 5 == a && (o = "pic"), 
        a != e.data.commentObjTab && i.get("goods/get_comment_list", {
            id: e.data.options.id,
            level: o,
            page: e.data.commentPage
        }, function(t) {
            t.list.length > 0 ? e.setData({
                loading: !1,
                commentList: t.list,
                commentPage: t.page,
                commentObjTab: a,
                commentEmpty: !1
            }) : e.setData({
                loading: !1,
                commentList: t.list,
                commentPage: t.page,
                commentObjTab: a,
                commentEmpty: !0
            });
        });
    },
    getDetail: function(t) {
        var e = this, a = parseInt(Date.now() / 1e3);

        //腾讯移动分析
        mta.Event.stat(t.id, {})
        // console.log(t.id);
        e.setData({
            loading: !0
        }), i.get("goods/get_detail", {
            id: t.id
        }, function(t) {
            console.log(t), t.error > 0 && (e.setData({
                show: !0,
                showgoods: !1
            }), s.toast(e, t.message), setTimeout(function() {
                wx.navigateBack();
            }, 800));
            var o = t.goods.coupons, n = t.goods.thumbMaxHeight, r = t.goods.thumbMaxWidth / n;
            if (wx.getSystemInfo({
                success: function(t) {
                    var a = t.windowWidth / r;
                    e.setData({
                        advWidth: t.windowWidth,
                        advHeight: a
                    });
                }
            }), e.setData({
                coupon: o,
                coupon_l: o.length,
                packagegoods: t.goods.packagegoods,
                packagegoodsid: t.goods.packagegoods.goodsid,
                credittext: t.goods.credittext,
                activity: t.goods.activity,
                phonenumber: t.goods.phonenumber,
                showDate: t.goods.showDate,
                scope: t.goods.scope
            }), t.goods.packagegoods && e.package(), u.wxParse("wxParseData", "html", t.goods.content, e, "0"), 
            u.wxParse("wxParseData_buycontent", "html", t.goods.buycontent, e, "0"), e.setData({
                show: !0,
                goods: t.goods,
                minprice: t.goods.minprice,
                maxprice: t.goods.maxprice,
                preselltimeend: t.goods.preselltimeend,
                style: t.goods.labelstyle.style,
                navbar: t.goods.navbar,
                labels: t.goods.labels
            }), console.log(t.goods), wx.setNavigationBarTitle({
                title: t.goods.title || "商品详情"
            }), l = t.goods.hasoption, d.isEmptyObject(t.goods.dispatchprice) || "string" == typeof t.goods.dispatchprice ? e.setData({
                dispatchpriceObj: 0
            }) : e.setData({
                dispatchpriceObj: 1
            }), t.goods.isdiscount > 0 && t.goods.isdiscount_time >= a) {
                clearInterval(e.data.timer);
                c = setInterval(function() {
                    e.countDown(0, t.goods.isdiscount_time);
                }, 1e3);
                e.setData({
                    timer: c
                });
            } else e.setData({
                discountTitle: "活动已结束"
            });
            if (t.goods.istime > 0) {
                clearInterval(e.data.timer);
                var c = setInterval(function() {
                    e.countDown(t.goods.timestart, t.goods.timeend, "istime");
                }, 1e3);
                e.setData({
                    timer: c
                });
            }
            t.goods.ispresell > 0 && e.setData({
                preselltimeend: t.goods.preselltimeend || t.goods.preselltimeend.getMonth() + "月" + t.goods.preselltimeend || t.goods.preselltimeend.getDate() + "日 " + t.goods.preselltimeend || t.goods.preselltimeend.getHours() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getMinutes() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getSeconds(),
                presellsendstatrttime: t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getMonth() + "月" + t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getDate() + "日"
            }), t.goods.getComments > 0 && i.get("goods/get_comments", {
                id: e.data.options.id
            }, function(t) {
                e.setData({
                    commentObj: t
                });
            }), t.goods.fullbackgoods && e.setData({
                fullbackgoods: t.goods.fullbackgoods
            });
            var g = e.data.fullbackgoods;
            if (void 0 != g) {
                console.log(g);
                var m = g.maxfullbackratio, h = g.maxallfullbackallratio, m = Math.round(m), h = Math.round(h);
                e.setData({
                    maxfullbackratio: m,
                    maxallfullbackallratio: h
                });
            }
            9 == t.goods.type && (e.setData({
                checkedDate: t.goods.nowDate
            }), e.show_cycelbuydate()), t.goods.seckillinfo && e.initSeckill(t.goods);
        });
    },
    initSeckill: function(t) {
        var e = this, a = parseInt(t.seckillinfo.status), i = t.seckillinfo.starttime, s = t.seckillinfo.endtime;
        if (-1 != a) {
            var n = 0, r = 0, c = o.globalData.approot;
            wx.request({
                url: c + "map.json",
                success: function(t) {
                    var o = new Date(t.header.Date) / 1e3;
                    n = 0 == a ? s - o : i - o, e.setData({
                        lasttime: n
                    }), clearInterval(e.data.timer), e.setTimer(), r = e.setTimerInterval(), e.setData({
                        timer: r
                    });
                }
            });
        }
    },
    setTimer: function() {
        var t = this, e = parseInt(t.data.lasttime) - 1, a = t.formatSeconds(e);
        t.setData({
            lasttime: e,
            hour: a.hour,
            min: a.min,
            sec: a.sec
        }), e <= 0 && t.onLoad();
    },
    setTimerInterval: function() {
        var t = this;
        return setInterval(function() {
            t.setTimer();
        }, 1e3);
    },
    formatSeconds: function(t) {
        var e = parseInt(t), a = 0, o = 0;
        return e > 60 && (a = parseInt(e / 60), e = parseInt(e % 60), a > 60 && (o = parseInt(a / 60), 
        a = parseInt(a % 60))), {
            hour: o < 10 ? "0" + o : o,
            min: a < 10 ? "0" + a : a,
            sec: e < 10 ? "0" + e : e
        };
    },
    countDown: function(t, e, a) {
        var o = parseInt(Date.now() / 1e3), i = (t > o ? t : e) - o, s = parseInt(i), n = Math.floor(s / 86400), r = Math.floor((s - 24 * n * 60 * 60) / 3600), c = Math.floor((s - 24 * n * 60 * 60 - 3600 * r) / 60), d = [ n, r, c, Math.floor(s - 24 * n * 60 * 60 - 3600 * r - 60 * c) ];
        if (this.setData({
            time: d
        }), "istime") {
            var u = "";
            t > o ? u = "距离限时购开始" : t <= o && e > o ? u = "距离限时购结束" : (u = "活动已经结束，下次早点来~", 
            this.setData({
                istime: 0
            })), this.setData({
                istimeTitle: u
            });
        }
    },
    cityPicker: function(t) {
        var e = this;
        t.currentTarget.dataset.tap;
        wx.navigateTo({
            url: "/pages/goods/region/index?id=" + e.data.goods.id + "&region=" + e.data.goods.citys.citys + "&onlysent=" + e.data.goods.citys.onlysent
        });
    },
    giftPicker: function() {
        this.setData({
            active: "active",
            gift: !0
        });
    },
    couponPicker: function() {
        this.setData({
            active: "active",
            showcoupon: !0
        });
    },
    couponrecived: function(t) {
        var e = t.currentTarget.dataset.id, a = this;
        i.post("goods.pay_coupon", {
            id: e
        }, function(t) {
            console.log(t), 0 == t.error ? (a.setData({
                showcoupon: !1,
                active: ""
            }), s.toast(a, "已领取")) : s.toast(a, t.message);
        });
    },
    selectPicker: function(t) {
        var e = this;
        if (e.data.limits) {
            c.selectpicker(t, e, "goodsdetail");
        } else e.setData({
            modelShow: !0
        });
    },
    specsTap: function(t) {
        var e = this;
        c.specsTap(t, e);
    },
    emptyActive: function() {
        this.setData({
            active: "",
            slider: "out",
            tempname: "",
            showcoupon: !1,
            gift: !1,
            cycledate: !1
        });
    },
    buyNow: function(t) {
        var e = this;
        c.buyNow(t, e, "goods_detail");
    },
    getCart: function(t) {
        var e = this;
        c.getCart(t, e);
    },
    select: function() {
        var t = this, e = t.data.optionid;
        t.data.diyform;
        l > 0 && 0 == e ? s.toast(t, "请选择规格") : this.setData({
            active: "",
            slider: "out",
            isSelected: !0,
            tempname: ""
        });
    },
    inputNumber: function(t) {
        var e = this;
        c.inputNumber(t, e);
    },
    number: function(t) {
        var e = this;
        c.number(t, e);
    },
    // 返回上一页
    return_top_tushu: function () {
      console.log(123);
      wx.navigateBack({ changed: true });//返回上一页
    },
    onLoad: function(t) {
        var e = this;
        n.get(this, "goodsdetail", function(t) {
            // console.error(t);
            var a = t.diypage.items;
            for (var o in a) "copyright" == a[o].id && e.setData({
                copyright: a[o]
            });
        }), t = t || {};
        var a = decodeURIComponent(t.scene);
        if (!t.id && a) {
            var s = i.str2Obj(a);
            t.id = s.id, s.mid && (t.mid = s.mid);
        }
        this.setData({
            id: t.id
        }), o.url(t), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    windowWidth: t.windowWidth,
                    windowHeight: t.windowHeight
                });
            }
        }), e.setData({
            uid: t.id
        });
        o.getUserInfo(function() {
            e.setData({
                options: t
            }), wx.getSystemInfo({
                success: function(t) {
                    e.setData({
                        advWidth: t.windowWidth
                    }), console.log(t.windowHeight);
                }
            }), e.setData({
                success: !0,
                cover: !0,
                showvideo: !0
            }), e.getDetail(t), setTimeout(function() {
                e.setData({
                    areas: o.getCache("cacheset").areas
                });
            }, 3e3);
        }, function() {
            wx.redirectTo({
                url: "/pages/message/auth/index"
            });
          }), wx.getSystemInfo({
            success: function (res) {
              console.log(res.model)//手机机型
              console.log(res.model == "iPhone X")
              if (res.model == "iPhone X") {
                e.setData({
                  isIPX: "ipx"
                });
              }
              else if (res.model == "iPhone 7 Plus" || res.model == "iPhone 7" || res.model == "iPhone 6 Plus" || res.model == "iPhone 6" || res.model == "iPhone 5" || res.model == "iPhone 7 Plus<iPhone9,2>") {
                e.setData({
                  isIPX: "iPhone"
                });
              }
              else {
                e.setData({
                  isIPX: "Android"
                });
              }
            }
          });
        
    },
    show_cycelbuydate: function() {
        var t = this, e = g.getCurrentDayString(this, t.data.showDate), a = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ];
        t.setData({
            currentObj: e,
            currentDate: e.getFullYear() + "年" + (e.getMonth() + 1) + "月" + e.getDate() + "日 " + a[e.getDay()],
            currentYear: e.getFullYear(),
            currentMonth: e.getMonth() + 1,
            currentDay: e.getDate(),
            initDate: Date.parse(e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()),
            checkedDate: Date.parse(e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()),
            maxday: t.data.scope
        });
    },
    package: function() {
        var t = this;
        i.get("package.get_list", {
            goodsid: this.data.packagegoodsid
        }, function(e) {
            console.log(e.list[0]), t.setData({
                packageList: e.list[0]
            });
        });
    },
    onShow: function() {
        var t = this;
        o.getCache("isIpx") ? t.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : t.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), wx.getStorage({
            key: "mydata",
            success: function(e) {
                wx.removeStorage({
                    key: "mydata",
                    success: function(t) {}
                }), t.getDetail(e.data), wx.pageScrollTo({
                    scrollTop: 0
                });
            }
        }), wx.getSetting({
            success: function(e) {
                var a = e.authSetting["scope.userInfo"];
                t.setData({
                    limits: a
                });
            }
        });
    },
    onChange: function(t) {
        return r.onChange(this, t);
    },
    DiyFormHandler: function(t) {
        return r.DiyFormHandler(this, t);
    },
    selectArea: function(t) {
        return r.selectArea(this, t);
    },
    bindChange: function(t) {
        return r.bindChange(this, t);
    },
    onCancel: function(t) {
        return r.onCancel(this, t);
    },
    onConfirm: function(t) {
        return r.onConfirm(this, t);
    },
    getIndex: function(t, e) {
        return r.getIndex(t, e);
    },
    onShareAppMessage: function() {
        return this.setData({
            closeBtn: !1
        }), i.onShareAppMessage("/pages/goods/detail/index?id=" + this.data.options.id, this.data.goods.title);
    },
    showpic: function() {
        this.setData({
            showpic: !0,
            cover: !1,
            showvideo: !1
        }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.pause();
    },
    showvideo: function() {
        this.setData({
            showpic: !1,
            showvideo: !0
        }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.play();
    },
    startplay: function() {
        this.setData({
            cover: !1
        }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.play();
    },
    bindfullscreenchange: function(t) {
        1 == t.detail.fullScreen ? this.setData({
            success: !1
        }) : this.setData({
            success: !0
        });
    },
    phone: function() {
        var t = this.data.phonenumber + "";
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    sharePoster: function() {
        wx.navigateTo({
            url: "/pages/goods/poster/poster?id=" + this.data.uid
        });
    },
    closeBtn: function() {
        this.setData({
            closeBtn: !1
        });
    },
    onHide: function() {
        this.setData({
            closeBtn: !1
        });
    },
    showshade: function() {
        this.setData({
            closeBtn: !0
        });
    },
    nav: function() {
        this.setData({
            nav_mask: !this.data.nav_mask
        });
    },
    nav2: function() {
        this.setData({
            nav_mask2: !this.data.nav_mask2
        });
    },
    changevoice: function() {
        this.data.sound ? this.setData({
            sound: !1,
            soundpic: !0
        }) : this.setData({
            sound: !0,
            soundpic: !1
        });
    },
    radioChange: function(t) {
        this.setData({
            giftid: t.currentTarget.dataset.giftgoodsid,
            gift_title: t.currentTarget.dataset.title
        });
    },
    activityPicker: function() {
        this.setData({
            fadein: "in"
        });
    },
    actOutPicker: function() {
        this.setData({
            fadein: ""
        });
    },
    hintclick: function() {
        wx.openSetting({
            success: function(t) {}
        });
    },
    cancelclick: function() {
        this.setData({
            modelShow: !1
        });
    },
    confirmclick: function() {
        this.setData({
            modelShow: !1
        }), wx.openSetting({
            success: function(t) {}
        });
    },
    sendclick: function() {
        wx.navigateTo({
            url: "/pages/map/index"
        });
    },
    syclecancle: function() {
        this.setData({
            cycledate: !1
        });
    },
    sycleconfirm: function() {
        this.setData({
            cycledate: !1
        });
    },
    editdate: function(t) {
        g.setSchedule(this), this.setData({
            cycledate: !0
        });
    },
    doDay: function(t) {
        g.doDay(t, this);
    },
    selectDay: function(t) {
        g.selectDay(t, this), g.setSchedule(this);
    },
    play: function(t) {
        var e = t.target.dataset.id, a = this.data.audiosObj[e] || !1;
        if (!a) {
            a = wx.createInnerAudioContext("audio_" + e);
            var o = this.data.audiosObj;
            o[e] = a, this.setData({
                audiosObj: o
            });
        }
        var i = this;
        a.onPlay(function() {
            var t = setInterval(function() {
                var o = a.currentTime / a.duration * 100 + "%", s = Math.floor(Math.ceil(a.currentTime) / 60), n = (Math.ceil(a.currentTime) % 60 / 100).toFixed(2).slice(-2), r = Math.ceil(a.currentTime);
                s < 10 && (s = "0" + s);
                var c = s + ":" + n, d = i.data.audios;
                d[e].audiowidth = o, d[e].Time = t, d[e].audiotime = c, d[e].seconds = r, i.setData({
                    audios: d
                });
            }, 1e3);
        });
        var s = t.currentTarget.dataset.audio, n = t.currentTarget.dataset.time, r = t.currentTarget.dataset.pausestop, c = t.currentTarget.dataset.loopplay;
        0 == c && a.onEnded(function(t) {
            d[e].status = !1, i.setData({
                audios: d
            });
        });
        var d = i.data.audios;
        d[e] || (d[e] = {}), a.paused && 0 == n ? (a.src = s, a.play(), 1 == c && (a.loop = !0), 
        d[e].status = !0, i.pauseOther(e)) : a.paused && n > 0 ? (a.play(), 0 == r ? a.seek(n) : a.seek(0), 
        d[e].status = !0, i.pauseOther(e)) : (a.pause(), d[e].status = !1), i.setData({
            audios: d
        });
    },
    pauseOther: function(t) {
        var e = this;
        d.each(this.data.audiosObj, function(a, o) {
            if (a != t) {
                o.pause();
                var i = e.data.audios;
                i[a] && (i[a].status = !1, e.setData({
                    audios: i
                }));
            }
        });
    }
}, t(a, "onHide", function() {
    this.pauseOther();
}), t(a, "onUnload", function() {
    this.pauseOther();
}), t(a, "navigate", function(t) {
    var e = t.currentTarget.dataset.url, a = t.currentTarget.dataset.phone, o = t.currentTarget.dataset.appid, i = t.currentTarget.dataset.appurl;
    e && wx.navigateTo({
        url: e
    }), a && wx.makePhoneCall({
        phoneNumber: a
    }), o && wx.navigateToMiniProgram({
        appId: o,
        path: i
    });
}), t(a, "userinfo", function(t) {
    var e = this;
    o.getUserInfo(function() {
        e.onShow();
    });
}), a));