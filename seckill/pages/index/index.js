var t = getApp(), e = t.requirejs("/core"), a = t.requirejs("jquery");

Page({
    data: {
        audios: {},
        audiosObj: {},
        roomid: "0",
        timeindex: "0",
        taskid: "0",
        timeid: "0",
        timer: 0,
        goods: "",
        rooms: "",
        room_num: 0,
        times: "",
        time_num: 0,
        advs: "",
        adv_num: 0,
        list_error: 0,
        goods_error: 0,
        message: "",
        lasttime: 0,
        hour: "-",
        min: "-",
        sec: "-",
        diypages: "",
        seckill_style: "",
        seckill_color: "",
        color: {
            red: "#ff5555",
            blue: "#4e87ee",
            purple: "#a839fa",
            orange: "#ff8c1e",
            pink: "#ff7e95"
        }
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
        var t = this;
        e.get("seckill/get_list", {}, function(e) {
            1 == e.error ? t.setData({
                list_error: 1,
                message: e.message
            }) : (void 0 != e.diypages.items && a.each(e.diypages.items, function(a, s) {
                var i = {};
                "seckill_advs" == s.id && (i.adv_num = s.data.length), i.diypages = e.diypages, 
                t.setData(i);
            }), console.log(t.data), t.setData({
                rooms: e.rooms,
                room_num: e.rooms.length,
                times: e.times,
                time_num: e.times.length,
                timeindex: e.timeindex,
                roomid: e.roomid,
                taskid: e.taskid,
                timeid: e.timeid,
                seckill_style: e.seckill_style,
                seckill_color: e.seckill_color,
                background_color: e.diypages.background_color
            }), "style2" == e.seckill_style ? (wx.setNavigationBarColor({
                frontColor: e.diypages.titlebarcolor,
                backgroundColor: t.data.color[e.seckill_color]
            }), wx.setNavigationBarTitle({
                title: e.diypages.page_title
            })) : wx.setNavigationBarColor({
                frontColor: "#000000",
                backgroundColor: "#ffffff"
            }), t.getGoods(e.timeid));
        }), wx.getSystemInfo({  //tushu
          success: function (res) {
            console.log(res.model)//手机机型
            console.log(res.model == "iPhone X")
            t.setData({
              statusBarHeight: res.statusBarHeight,
              fuzhukongbaiq: 105 + res.statusBarHeight * 2 + "rpx",
              zhongjian: 25 + res.statusBarHeight * 2 + "rpx",
            })
            if (res.model == "iPhone X") {
              t.setData({
                isIPX: "ipx"
              });
            }
            else if (res.model == "iPhone 7 Plus" || res.model == "iPhone 7" || res.model == "iPhone 6 Plus" || res.model == "iPhone 6" || res.model == "iPhone 5" || res.model == "iPhone 7 Plus<iPhone9,2>") {
              t.setData({
                isIPX: "iPhone"
              });
            }
            else {
              t.setData({
                isIPX: "Android"
              });
            }
          }
        });
    },
    selected: function(t) {
        var a = this;
        a.setData({
            roomid: t.currentTarget.dataset.id
        });
        var s = t.currentTarget.dataset.id;
        e.get("seckill/get_list", {
            roomid: s
        }, function(t) {
            1 == t.error ? a.setData({
                list_error: 1,
                message: t.message
            }) : a.setData({
                rooms: t.rooms,
                times: t.times,
                time_num: t.times.length,
                timeindex: t.timeindex
            }), a.getGoods(t.timeid);
        });
    },
    current: function(t) {
        var e = this;
        e.getGoods(t.currentTarget.dataset.timeid), e.setData({
            timeindex: t.currentTarget.dataset.index
        });
    },
    getGoods: function(t) {
        var a = this;
        e.get("seckill/get_goods", {
            taskid: a.data.taskid,
            roomid: a.data.roomid,
            timeid: t
        }, function(e) {
            1 == e.error ? a.setData({
                goods_error: 1,
                message: e.message
            }) : (a.setData({
                goods_error: 0,
                goods: e.goods
            }), a.initTimer(t));
        });
    },
    initTimer: function(e) {
        var s = this, i = "";
        a.each(s.data.times, function(t, a) {
            a.id === e && (i = a);
        });
        var r = parseInt(i.status), o = i.starttime, n = i.endtime;
        if (clearInterval(s.data.timer), -1 != r) {
            var d = 0, u = 0, l = t.globalData.approot;
            wx.request({
                url: l + "map.json",
                success: function(t) {
                    var e = new Date(t.header.Date) / 1e3;
                    d = 0 == r ? n - e : o - e, s.setData({
                        lasttime: d
                    }), s.setTimer(), u = s.setTimerInterval(), s.setData({
                        timer: u
                    });
                }
            });
        }
    },
    formatSeconds: function(t) {
        var e = parseInt(t), a = 0, s = 0;
        return e > 60 && (a = parseInt(e / 60), e = parseInt(e % 60), a > 60 && (s = parseInt(a / 60), 
        a = parseInt(a % 60))), {
            hour: s < 10 ? "0" + s : s,
            min: a < 10 ? "0" + a : a,
            sec: e < 10 ? "0" + e : e
        };
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
    play: function(t) {
        var e = t.target.dataset.id, a = this.data.audiosObj[e] || !1;
        if (!a) {
            a = wx.createInnerAudioContext("audio_" + e);
            var s = this.data.audiosObj;
            s[e] = a, this.setData({
                audiosObj: s
            });
        }
        var i = this;
        a.onPlay(function() {
            var t = setInterval(function() {
                var s = a.currentTime / a.duration * 100 + "%", r = Math.floor(Math.ceil(a.currentTime) / 60), o = (Math.ceil(a.currentTime) % 60 / 100).toFixed(2).slice(-2), n = Math.ceil(a.currentTime);
                r < 10 && (r = "0" + r);
                var d = r + ":" + o, u = i.data.audios;
                u[e].audiowidth = s, u[e].Time = t, u[e].audiotime = d, u[e].seconds = n, i.setData({
                    audios: u
                });
            }, 1e3);
        });
        var r = t.currentTarget.dataset.audio, o = t.currentTarget.dataset.time, n = t.currentTarget.dataset.pausestop, d = t.currentTarget.dataset.loopplay;
        0 == d && a.onEnded(function(t) {
            u[e].status = !1, i.setData({
                audios: u
            });
        });
        var u = i.data.audios;
        u[e] || (u[e] = {}), a.paused && 0 == o ? (a.src = r, a.play(), 1 == d && (a.loop = !0), 
        u[e].status = !0, i.pauseOther(e)) : a.paused && o > 0 ? (a.play(), 0 == n ? a.seek(o) : a.seek(0), 
        u[e].status = !0, i.pauseOther(e)) : (a.pause(), u[e].status = !1), i.setData({
            audios: u
        });
    },
    pauseOther: function(t) {
        var e = this;
        a.each(this.data.audiosObj, function(a, s) {
            if (a != t) {
                s.pause();
                var i = e.data.audios;
                i[a] && (i[a].status = !1, e.setData({
                    audios: i
                }));
            }
        });
    },
    navigate: function(t) {
        var e = t.currentTarget.dataset.url, a = t.currentTarget.dataset.phone, s = t.currentTarget.dataset.appid, i = t.currentTarget.dataset.appurl;
        e && wx.navigateTo({
            url: e,
            fail: function() {
                wx.switchTab({
                    url: e
                });
            }
        }), a && wx.makePhoneCall({
            phoneNumber: a
        }), s && wx.navigateToMiniProgram({
            appId: s,
            path: i
        });
    },
    tabwidget: function(t) {
        var a = this, s = a.data.diypages, i = s.items, r = t.currentTarget.dataset.id, o = t.currentTarget.dataset.url, n = t.currentTarget.dataset.type;
        for (var d in i) d == r && (i[d].status = n);
        s.items = i, a.setData({
            diypages: s
        }), "" != o && void 0 != o && e.get("diypage/getInfo", {
            dataurl: o
        }, function(t) {
            for (var e in s.items) e == r && (s.items[e].data[n].data = t.goods.list, s.items[e].data[n].type = t.type, 
            s.items[e].type = t.type, t.goods.list.length <= 8 && (s.items[e].data[n].showmore = !0), 
            console.log(s.items[e]), a.setData({
                diypages: s
            }));
        });
    }
});