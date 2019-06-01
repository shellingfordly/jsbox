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
    startSearch()
}

//添加返回键
function addBtnBack(kind){
    let btnBack = {
        type: "button",
        props: {
            title: "返回",
            titleColor: $color("#000"),
            bgcolor: $color("#fff")
        },
        layout: function(make, view) {
            make.left.right.inset(50);
        },
        events: {
            tapped: function(sender) {
                switch(kind) {
                    case "1":
                        //1---返回系统
                        startSearch()
                       break;
                    case "Schedule":
                        //Schedule---返回课表学年选择
                        chooseSchedule()
                        break;
                    case "achievement":
                        //Schedule---返回成绩学年选择
                        chooseAchievement()
                        break;
                }
            }
        
        }
    }
    return btnBack
}

// 选择查看
function startSearch(){
    $ui.render({
        props: {
            title: "系统"
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
                          title: "课表",
                          titleColor: $color("#000"),
                          bgcolor: $color("#fff")
                        },
                        layout: function(make, view) {
                          make.center.equalTo(view.super)
                          make.width.equalTo(64)
                        },
                        events: {
                          tapped: function(sender) {
                            chooseSchedule()
                          }
                        }
                      },
                      {
                        type: "button",
                        props: {
                          title: "成绩",
                          titleColor: $color("#000"),
                          bgcolor: $color("#fff")
                        },
                        layout: function(make, view) {
                          make.center.equalTo(view.super)
                          make.width.equalTo(64)
                        },
                        events: {
                          tapped: function(sender) {
                            chooseAchievement()
                          }
                        }
                      },
                      {
                        type: "button",
                        props: {
                          title: "信息",
                          titleColor: $color("#000"),
                          bgcolor: $color("#fff")
                        },
                        layout: function(make, view) {
                          make.center.equalTo(view.super)
                          make.width.equalTo(64)
                        },
                        events: {
                          tapped: function(sender) {
                            getInformation()
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
function chooseSchedule(){
    $ui.render({
        props: {
            title: "课表学年"
        },
        views: [
            {
              type: "picker",
              props: {
                id: "picker",
                items: (function() {
                    let year = ["2016-2017","2017-2018","2018-2019","2019-2020"]
                    let term = ["1","2"]
                    let items = []
                    for(let i =0; i<4; i++){
                            items.push(
                                {
                                    title: year[i],
                                    items: [
                                        {
                                            title: term[0]
                                        },
                                        {
                                            title: term[1]
                                        }
                                    ]
                                }
                            )
                    }
                    return items
                  })()
              },
              layout: function(make) {
                make.left.top.right.equalTo(0);
              }
            },
            {
                type: "button",
                props: {
                    title: "确定",
                    titleColor: $color("#000"),
                    bgcolor: $color("#fff")
                },
                layout: function(make, view) {
                    make.top.equalTo($("picker").bottom);
                    make.left.right.inset(50);
                },
                events: {
                    tapped: function(sender) {
                        let data = {
                            //学期
                            term: $("picker").data[1],
                            //接口
                            type: 0,
                            //学年
                            year: $("picker").data[0]
                        }
                        getSchedule(data)
                    }
                }
            },
            addBtnBack("1")
        ]
    })
    
}

//选择要查询的成绩信息
function chooseAchievement(){
    $ui.render({
        props: {
            title: "成绩学年"
        },
        views: [
            {
              type: "picker",
              props: {
                id: "picker",
                items: (function() {
                    let year = ["2016-2017","2017-2018","2018-2019","2019-2020"]
                    let term = ["1","2"]
                    let items = []
                    for(let i =0; i<4; i++){
                            items.push(
                                {
                                    title: year[i],
                                    items: [
                                        {
                                            title: term[0]
                                        },
                                        {
                                            title: term[1]
                                        }
                                    ]
                                }
                            )
                    }
                    return items
                  })()
              },
              layout: function(make) {
                make.left.top.right.equalTo(0);
              }
            },
            {
                type: "button",
                props: {
                    title: "确定",
                    titleColor: $color("#000"),
                    bgcolor: $color("#fff")
                },
                layout: function(make, view) {
                    make.top.equalTo($("picker").bottom);
                    make.left.right.inset(50);
                },
                events: {
                    tapped: function(sender) {
                        let data = {
                            //学期
                            term: $("picker").data[1],
                            //接口
                            api: 0,
                            //学年
                            year: $("picker").data[0]
                        }
                        // $console.info(data);
                        getAchievement(data)
                    }
                }
            },
            addBtnBack("1")
        ]
    })
    
}


//获取课表
function getSchedule(data){
    $http.post({
        url: "https://server.dairoot.cn/schedule",
        header: {
            token: aToken,
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
function getAchievement(data){
    $http.post({
        url: "https://server.dairoot.cn/score",
        header: {
            token: aToken,
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
function getInformation(){
    $http.post({
        url: "https://server.dairoot.cn/user-info",
        header: {
            token: aToken,
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
        rows:[addBtnBack("Schedule")]
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
    if(mes[0].lesson_name){
        for(let i=0; i<mes.length; i++){
            //添加内容
            data.push(mes[i].lesson_name+"："+mes[i].score)
        }
        //添加返回键
        data.push(addBtnBack("achievement"))
    }else{
        data.push("暂无该学年成绩")
        data.push(addBtnBack("achievement"))
    }
    $ui.render({
        props: {
            title: "成绩"
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
                    mes.sex,
                    mes.enrol_time,
                    mes.faculty,
                    mes.class_name,]
                },
                {
                    rows: [addBtnBack("1")]
                }
              ]
            },
            layout: $layout.fill,
          }]
    })
}