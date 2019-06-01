//脚本源码：https://github.com/shellingfordly/jsbox
$ui.render({
    props: {
        title: "瓯江教务系统"
    },
    views: [{
        type: "input",
        props: {
          id: "xh",
          placeholder: "学号",
          type: $kbType.search,
          darkKeyboard: true,
          bgcolor: $color("#eceac6")
        },
        layout: function(make, view) {
          make.top.equalTo(10)
          make.left.equalTo(50)
          make.size.equalTo($size(200, 40))
        }
        },
        {
            type: "input",
            props: {
            id: "pwd",
            placeholder: "密码",
            type: $kbType.search,
            darkKeyboard: true,
            secure: true,
            bgcolor: $color("#eceac6")
            },
            layout: function(make, view) {
            make.top.equalTo(60)
            make.left.equalTo(50)
            make.size.equalTo($size(200, 40))
            }
        },
        {
            type: "button",
            props: {
            title: "确定"
            },
            layout: function(make, view) {
            make.top.equalTo(110)
            make.left.equalTo(50)
            make.width.equalTo(64)
            },
            events: {
                tapped: function(sender) {
                    let xh = $("xh").text
                    let pwd = $("pwd").text
                    if(xh && pwd){
                        getToken(xh,pwd)
                    } else $ui.alert("请输入正确的学号和密码")
                }
            }
        }
    ]
})

function getToken(xh,pwd){
    $http.post({
        //数据爬取来自：https://github.com/dairoot/school-api
        //本脚本数据来自：在线查询https://server.dairoot.cn
        url: "https://server.dairoot.cn/login",
        header: {
            "Content-Type": "application/json"
        },
        body: {
            account: xh,
            password: pwd,
            //温州大学瓯江学院教务系统http://ojjx.wzu.edu.cn，可自行更改
            url: "http://ojjx.wzu.edu.cn",
            user_type: 0,
        },
        handler: function(resp) {
            let data = resp.data.token
            conserve(data)
        }
    })
}

//存token
let aToken = ""
function conserve(data){
    aToken = data
    // console.info(aToken)
    startSearch(aToken)
}

//返回键
let btnBack = {
    type: "button",
    props: {
        title: "返回",
        titleColor: $color("#000"),
        bgcolor: $color("#fff")
    },
    layout: function(make, view) {
        make.center.equalTo(view.super)
        make.width.equalTo(200)
    },
    events: {
        tapped: function(sender) {
            conserve(aToken)
        }
    
    }
}

// 选择查看
function startSearch(mes){
    $ui.render({
        props: {
            title: "我"
        },
        views: [{
            type: "list",
            props: {
              data: [
                {
                    rows: [
                      {
                        type: "button",
                        props: {
                          title: "课表"
                        },
                        layout: function(make, view) {
                          make.center.equalTo(view.super)
                          make.width.equalTo(64)
                        },
                        events: {
                          tapped: function(sender) {
                            chooseSchedule(mes)
                          }
                        }
                      },
                      {
                        type: "button",
                        props: {
                          title: "成绩"
                        },
                        layout: function(make, view) {
                          make.center.equalTo(view.super)
                          make.width.equalTo(64)
                        },
                        events: {
                          tapped: function(sender) {
                            chooseAchievement(mes)
                          }
                        }
                      },
                      {
                        type: "button",
                        props: {
                          title: "信息"
                        },
                        layout: function(make, view) {
                          make.center.equalTo(view.super)
                          make.width.equalTo(64)
                        },
                        events: {
                          tapped: function(sender) {
                            getInformation(mes)
                          }
                        }
                      }
                    ]
                  }
              ]
            },
            layout: $layout.fill,
          }]
    })
}


//选择要查询的课表信息
function chooseSchedule(mes){
    $ui.render({
        props: {
            title: "选择课表"
        },
        views: [{
            type: "input",
            props: {
                id: "year",
                placeholder: "xxxx-xxxx格式",
                type: $kbType.search,
                darkKeyboard: true,
                bgcolor: $color("#eceac6")
            },
            layout: function(make, view) {
                make.top.equalTo(10)
                make.left.equalTo(50)
                make.size.equalTo($size(200, 40))
            }
        },
        {
            type: "input",
            props: {
                id: "term",
                placeholder: "1/2(学期)",
                type: $kbType.search,
                bgcolor: $color("#eceac6")
            },
            layout: function(make, view) {
                make.top.equalTo(60)
                make.left.equalTo(50)
                make.size.equalTo($size(200, 40))
            }
        },
        {
            type: "input",
            props: {
                id: "type",
                placeholder: "0/1(个人/班级课表)",
                type: $kbType.search,
                bgcolor: $color("#eceac6")
            },
            layout: function(make, view) {
                make.top.equalTo(110)
                make.left.equalTo(50)
                make.size.equalTo($size(200, 40))
            }
        },
        {
            type: "button",
            props: {
                title: "确定"
            },
            layout: function(make, view) {
                make.top.equalTo(160)
                make.left.equalTo(50)
                make.width.equalTo(64)
            },
            events: {
                tapped: function(sender) {
                    let year = $("year").text
                    let term = $("term").text
                    let type = $("type").text
                    let data = {
                        //学期
                        term: term,
                        //课表类型
                        type: type,
                        //学年
                        year: year
                    }
                    if(year && term && type){
                        //获取课表
                        getSchedule(mes,data)
                    } else $ui.alert("请输入查询条件")
                    
                }
            }
        },btnBack]
    })
}

//选择要查询的成绩信息
function chooseAchievement(mes){
    $ui.render({
        props: {
            title: "啦啦啦"
        },
        views: [{
            type: "input",
            props: {
                id: "year",
                placeholder: "xxxx-xxxx格式",
                type: $kbType.search,
                darkKeyboard: true,
                bgcolor: $color("#eceac6")
            },
            layout: function(make, view) {
                make.top.equalTo(10)
                make.left.equalTo(50)
                make.size.equalTo($size(200, 40))
            }
        },
        {
            type: "input",
            props: {
                id: "term",
                placeholder: "1/2(学期)",
                type: $kbType.search,
                bgcolor: $color("#eceac6")
            },
            layout: function(make, view) {
                make.top.equalTo(60)
                make.left.equalTo(50)
                make.size.equalTo($size(200, 40))
            }
        },
        {
            type: "input",
            props: {
                id: "api",
                placeholder: "0/1/2/3(获取接口)",
                type: $kbType.search,
                bgcolor: $color("#eceac6")
            },
            layout: function(make, view) {
                make.top.equalTo(110)
                make.left.equalTo(50)
                make.size.equalTo($size(200, 40))
            }
        },
        {
            type: "button",
            props: {
                title: "确定"
            },
            layout: function(make, view) {
                make.top.equalTo(160)
                make.left.equalTo(50)
                make.width.equalTo(64)
            },
            events: {
                tapped: function(sender) {
                    let year = $("year").text
                    let term = $("term").text
                    let api = $("api").text
                    let data = {
                        //学期
                        term: term,
                        //接口
                        api: api,
                        //学年
                        year: year
                    }
                    if(year && term && api){
                        //获取成绩信息
                        getAchievement(mes,data)
                    } else $ui.alert("请输入查询条件")
                    
                }
            }
        },btnBack]
    })

}


//获取课表
function getSchedule(mes,data){
    $http.post({
        url: "https://server.dairoot.cn/schedule",
        header: {
            token: mes,
            "Content-Type": "application/json"
          },
        body: {
            //学期
            schedule_term: data.term,
            //课表类型
            schedule_type: data.type,
            //学年
            schedule_year: data.year
        },
        handler: function(resp) {
            //展示课表
            Schedule(resp.data)
        }
    })
}


//获取成绩
function getAchievement(mes,data){
    $http.post({
        url: "https://server.dairoot.cn/score",
        header: {
            token: mes,
            "Content-Type": "application/json"
          },
        body: {
            //学期
            score_term: data.term,
            //接口
            use_api: data.api,
            //学年
            score_year: data.year
        },
        handler: function(resp) {
            //展示成绩
            achievement(resp.data)
        }
    })
}

//获取信息
function getInformation(mes){
    $http.post({
        url: "https://server.dairoot.cn/user-info",
        header: {
            token: mes,
            "Content-Type": "application/json"
          },
        handler: function(resp) {
            //展示个人信息
            information(resp.data)
        }
    })
}




//展示课表
function Schedule(mes){
    let data = []
    let week = ["星期一","星期二","星期三","星期四","星期五","星期六","星期天"]
    for(let j=0; j<7; j++){
        //添加标题
        data.push({title:week[j],rows:[]})
        for(let i=0; i<4; i++){
            if(mes.schedule[j][i][0]){
                //添加内容
                data[j].rows[i] = mes.schedule[j][i][0].name
            }
        }
    }
    //添加返回键
    data.push({
        rows:[btnBack]
        
    })
    //展示
    $ui.render({
        props: {
            title: "课表"
        },
        views: [{
            type: "list",
            props: {
            data: data
            },
            layout: $layout.fill,
        }]
    })
}

//展示成绩
function achievement(mes){
    let data = []
    for(let i=0; i<mes.length; i++){
        //添加内容
        data.push(mes[i].lesson_name+"："+mes[i].score)
    }
    //添加返回键
    data.push(btnBack)
    $ui.render({
        props: {
            title: "课表"
        },
        views: [{
            type: "list",
            props: {
            data: data
            },
            layout: $layout.fill,
        }]
    })
}

//展示个人信息
function information(mes){
    $ui.render({
        props: {
            title: "信息"
        },
        views: [{
            type: "list",
            props: {
              data: [
                {
                  rows: [mes.real_name,
                    mes.faculty,
                    mes.class_name,]
                },
                {
                    rows: [{
                        type: "button",
                        props: {
                            title: "返回",
                            titleColor: $color("#000"),
                            bgcolor: $color("#fff")
                        },
                        layout: function(make, view) {
                            make.center.equalTo(view.super)
                            make.width.equalTo(200)
                        },
                        events: {
                            tapped: function(sender) {
                                conserve(aToken)
                            }
                        }
                      }]
                }
              ]
            },
            layout: $layout.fill,
          }]
    })
}












