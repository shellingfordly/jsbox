//https://github.com/shellingfordly/jsbox
let url = $clipboard.link
if(!url){$ui.alert("无链接");}
$ui.render({
    views: [
        {
            type: "list",
            props: {
                data: [
                    {
                        type: "button",
                        props: {
                        title: "访问",
                            titleColor: $color("#111"),
                            bgcolor: $color("#FFF"),
                        },
                        layout: function(make) {
                            make.left.bottom.right.equalTo(0)
                            make.top.equalTo(0)
                        },
                        events: {
                            tapped: function(sender) {
                                $safari.open({
                                    url: url,
                                    entersReader: true,
                                    handler: function() {
                                    }
                                });
                            }
                        }
                    },
                    {
                        type: "button",
                        props: {
                        title: "显示",
                            titleColor: $color("#111"),
                            bgcolor: $color("#FFF"),
                        },
                        layout: function(make) {
                            make.left.bottom.right.equalTo(0)
                            make.top.equalTo(0)
                        },
                        events: {
                            tapped: function(sender) {
                                $ui.render({
                                    props: {
                                        title: "文本"
                                    },
                                    views: [{
                                        type: "text",
                                        props: {
                                          text: url,
                                        },
                                        layout: $layout.fill
                                      },
                                      {
                                        type: "button",
                                        props: {
                                            title: "退出",
                                            },
                                        layout: function(make) {
                                            make.bottom.equalTo(-10)
                                            make.width.equalTo(150)
                                        },
                                        events: {
                                            tapped: function(sender){
                                                $app.close();
                                            }
                                        }
                                      }]
                                });
                            }
                        }
                    },
                    {
                        type: "button",
                        props: {
                        title: "下载",
                            titleColor: $color("#111"),
                            bgcolor: $color("#FFF"),
                        },
                        layout: function(make) {
                            make.left.bottom.right.equalTo(0)
                            make.top.equalTo(0)
                        },
                        events: {
                            tapped: function(sender) {
                                $ui.toast("开始下载: " + url)
                                $ui.loading(true)
                                $http.download({
                                    url: url,
                                    handler: function(resp) {
                                        $ui.loading(false)
                                        $share.sheet(resp.data)
                                    }
                                })
                            }
                        }
                    },
                    {
                        type: "button",
                        props: {
                            title: "变短",
                            titleColor: $color("#111"),
                            bgcolor: $color("#FFF"),
                        },
                        layout: function(make) {
                            make.left.bottom.right.equalTo(0)
                            make.top.equalTo(0)
                        },
                        events: {
                            tapped: function(sender) {
                                $http.shorten({
                                    url: url,
                                    handler: function(url) {
                                        $ui.toast("已复制到粘贴板: " + url)
                                        $clipboard.text = url
                                    }
                                  })
                            }
                        }
                    },
                    {
                        type: "button",
                        props: {
                            title: "变长",
                            titleColor: $color("#111"),
                            bgcolor: $color("#FFF"),
                        },
                        layout: function(make) {
                            make.left.bottom.right.equalTo(0)
                            make.top.equalTo(0)
                        },
                        events: {
                            tapped: function(sender) {
                                $http.lengthen({
                                    url: url,
                                    handler: function(url) {
                                        $ui.toast("已复制到粘贴板: " + url)
                                        $clipboard.text = url
                                    }
                                })
                            }
                        }
                    }
                    
              ]
            },
            layout: $layout.fill,
        }
    ]
  })
