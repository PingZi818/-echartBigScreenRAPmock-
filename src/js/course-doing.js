// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('main1'));
var myChart2 = echarts.init(document.getElementById('main2'));
var myChart3 = echarts.init(document.getElementById('main3'));
var myChart5 = echarts.init(document.getElementById('main5'));
var myChart6 = echarts.init(document.getElementById('main6'));
$(function () {
    //设置标题信息
    $('#titleContainer').html(back_ground_info['front.workspace.bigscreen.action.area'].textContent + '大数据');
    new AreaSelect({
        areaInfoUrl: BACK_ROOT + '/bigscreen/area/getbyid.do',
        url: BACK_ROOT + '/bigscreen/area/childlist.do',
        container: $('.location'),
        defaultBaseAreaId: back_ground_info['baseAreaId'],
        callback: function (baseAreaId, areaCode, areaLevel) {
            onAreaChange(baseAreaId, areaCode, areaLevel);
        }
    }).init();
});

function onAreaChange(baseAreaId) {
    //年级分布
    courseClassLevel(baseAreaId);
    //学科分布
    courseSubject(baseAreaId);
    //所有课程数据
    startCourseCount(baseAreaId);
    //学生偏好
    studentFavor(baseAreaId);
    //教师排行
    teacherRank(baseAreaId);
}

getNowFormatDate();

// ----------------------------------------数据渲染方法
//-----------------年级分布
function courseClassLevel(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/behavioranalysis/courseclassleveldata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result;
        if (!data) {
            $('.subject-distribution .no-data').show();
            myChart1.clear();
            return false;
        }else{
            $('.subject-distribution .no-data').hide();
        }
        var classlevelName = [];
        var blackboard = [];
        var interaction = [];
        var exercise = [];
        var teaching = [];
        var balance = [];
        for (var i = 0; i < data.length; i++) {
            classlevelName.push(data[i].classlevelName);
            blackboard.push(data[i].countInstructModeBlackboard);
            interaction.push(data[i].countInstructModeInteraction);
            exercise.push(data[i].countInstructModeExercise);
            teaching.push(data[i].countInstructModeTeaching);
            balance.push(data[i].countInstructModeBalance);
        }

        var dataZoom = [ {
            show: false,},
            {
                type: "inside",
                show: false,
                zoomLock: true,
            }];
        if (data.length > 7) {
            dataZoom = [
                {
                    show: true,
                    height: 8,
                    width: '50%',
                    xAxisIndex: [0],
                    bottom: 5,
                    left: 'center',
                    startValue: 0,
                    endValue: 6,
                    fillerColor: '#1e7eb0',
                    dataBackground: {
                        areaStyle: {
                            color: '#222e43'
                        }
                    },
                    handleStyle: {
                        color: "#1e7eb0"
                    },
                    textStyle: {
                        color: "#fff"
                    },
                    borderColor: "#222e43",
                    borderRadius: 8,
                    borderWidth: 2
                },
                {
                    type: "inside",
                    show: true,
                    zoomLock: true,
                }
            ];
        }

        option2 = {
            tooltip: {
                trigger: 'axis',
                transitionDuration: 0,
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                backgroundColor: 'transparent',
                formatter: function (params) {
                    var res = '<div class="com-promp">'+params[0].axisValue + '<br/>';
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>';
                    }
                    return res+'</div>';
                }
            },
            grid: {
                left: '20',
                top: '70',
                right: '2',
                bottom: '20',
                containLabel: true
            },
            dataZoom: dataZoom,
            legend: {
                x: 'right',
                itemWidth: 8,
                itemHeight: 4,
                itemGap: 10,
                data: ['讲授型', '对话型', '平衡型', '练习型', '板块型'],
                textStyle: {
                    fontSize: 12,
                    color: '#fff'
                }
            },
            yAxis: {
                type: 'value',
                show: true,
                splitLine: {show: false},
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#7e848f'
                    }
                },
                axisTick: {
                    show: false
                }
            },
            xAxis: {
                type: 'category',
                data: classlevelName,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#7e848f'
                    }
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    fontSize: '12',
                    color: 'rgba(255,255,255,0.5)'
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    name: '讲授型',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            position: 'insideRight'
                        }
                    },
                    barWidth: '15',
                    data: teaching
                },
                {
                    name: '对话型',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            position: 'insideRight'
                        }
                    },
                    barWidth: '15',
                    data: interaction
                },
                {
                    name: '平衡型',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            position: 'insideRight'
                        }
                    },
                    barWidth: '15',
                    data: balance
                },
                {
                    name: '练习型',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            // show: true,
                            position: 'insideRight'
                        }
                    },
                    barWidth: '15',
                    data: exercise
                },
                {
                    name: '板块型',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            // show: true,
                            position: 'insideRight'
                        }
                    },
                    barWidth: '15',
                    data: blackboard
                }
            ],
            color: ['#3134d1', '#4a4df0', '#0190fc', '#01defd', '#54f4cd']
        };
        myChart1.setOption(option2);
    });
}

//-----------------学科分布
function courseSubject(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/behavioranalysis/coursesubjectdata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result;
        if (data.length == 0) {
            $('.grade-distribution .no-data').show();
            myChart2.clear();
            return false;
        }else{
            $('.grade-distribution .no-data').hide();
        }
        var subjectData = [];
        var blackboard = [];
        var interaction = [];
        var exercise = [];
        var teaching = [];
        var balance = [];
        for (var i = 0; i < data.length; i++) {
            subjectData.push(data[i].subjectName);
            blackboard.push(data[i].countInstructModeBlackboard);
            interaction.push(data[i].countInstructModeInteraction);
            exercise.push(data[i].countInstructModeExercise);
            teaching.push(data[i].countInstructModeTeaching);
            balance.push(data[i].countInstructModeBalance);
        }

        var dataZoom = [{show: false},
            {
                type: "inside",
                show: false,
                zoomLock: true,
            }];
        if (data.length > 12) {
            dataZoom = [
                {
                    show: true,
                    height: 8,
                    width: '50%',
                    xAxisIndex: [0],
                    bottom: 5,
                    left: 'center',
                    startValue: 0,
                    endValue: 11,
                    fillerColor: '#1e7eb0',
                    dataBackground: {
                        areaStyle: {
                            color: '#222e43'
                        }
                    },
                    handleStyle: {
                        color: "#1e7eb0"
                    },
                    textStyle: {
                        color: "#fff"
                    },
                    borderColor: "#222e43",
                    borderRadius: 8,
                    borderWidth: 2
                },
                {
                    type: "inside",
                    show: true,
                    zoomLock: true,
                }
            ];
        }

        option1 = {
            title: {
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: '#F1F1F3'
                },
                left: '6%'
            },
            tooltip: {
                trigger: 'axis',
                transitionDuration: 0,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderColor: '#535b69',
                borderRadius: 8,
                borderWidth: 1,
                padding: [5, 10],
                fontSize: 12,
                fontFamily: 'PingFangMedium',
                position: function (p) {
                    return [p[0], p[1] - 60];
                },
                showContent: true,
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        type: 'dashed',
                        color: '#ffff00'
                    }
                },
                formatter: function (params) {
                    var res = params[0].axisValue + '<br/>';
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>';
                    }
                    return res;
                }
            },
            dataZoom: dataZoom,
            legend: {
                icon: 'circle',
                itemWidth: 8,
                itemHeight: 8,
                itemGap: 10,
                x: 'right',
                y: 'top',
                data: ['讲授型', '对话型', '平衡型', '练习型', '板块型'],
                textStyle: {
                    fontSize: 12,
                    color: '#e7e7e7',
                    fontFamily: 'PingFangMedium'
                }
            },
            grid: {
                left: '30',
                top: '60',
                right: '10',
                bottom: '60',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    interval: 0,
                    show: true,
                    inside: false,
                    rotate: 45,
                    margin: 2,
                    formatter: null,
                    showMinLabel: null,
                    showMaxLabel: null,
                    textStyle: {
                        fontSize: 12,
                        color: '#a5a6bb',
                        fontFamily: 'PingFangMedium'
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#a5a6bb'
                    }
                },
                axisTick: {
                    show: false
                },
                offset: 20,
                data: subjectData
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#a0a8b9'
                    }
                },
                offset: '10',
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'PingFangMedium'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#2a3546'
                    }
                },
                axisTick: {
                    show: false
                }
            }],
            series: [
                {
                    name: '讲授型',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(137, 189, 27, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(137, 189, 27, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#eb5690'
                        }
                    },
                    data: teaching
                },
                {
                    name: '对话型',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 136, 212, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 136, 212, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#23c53f'
                        }
                    },
                    data: interaction
                },
                {
                    name: '平衡型',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(219, 50, 51, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(219, 50, 51, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#43bbfb'
                        }
                    },
                    data: balance
                },
                {
                    name: '练习型',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 150, 220, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 150, 51, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ff9d41'
                        }
                    },
                    data: exercise
                },
                {
                    name: '板块型',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 50, 151, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 50, 151, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#1cc840'
                        }
                    },
                    data: blackboard
                }
            ]
        };
        myChart2.setOption(option1);
    });
}

//-----------------开课总量
function startCourseCount(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/behavioranalysis/allcoursedata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result;
        // var colors = ['rgba(22, 75, 50, 0.5)', 'rgba(52, 16, 76, 0.5)', 'rgba(77, 57, 122, 0.5)', 'rgba(175, 168, 42, 0.5)', 'rgba(30, 168, 200, 0.5)'];
        var colors = ['#1cc840', '#43bbfb', '#eb5690'];
        // var defaultColor = 'rgba(100, 100, 150, 0.5)';
        var defaultColor = 'rgb(100, 100, 150)';
        //计算学科个数
        var semesterIds = [];
        var semesterNames = [];
        var allCourseCount = 0;
        var chSum = 0;
        var rtSum = 0;
        $.each(data, function (i, d) {
            allCourseCount++;
            chSum += d.ch;
            rtSum += d.rt;
        });

        if (allCourseCount == 0) {
            $('.allCourseCnt').html('<li>0</li>');
            $('.chAvg').html('<li>0</li>');
            $('.rtAvg').html('<li>0</li>');
            myChart3.clear();
            return false;
        }

        if (allCourseCount > 0) {
            //课程总览，rt平均值，ch平均值
            var TplAllCourseCnt = '';
            var TplChAvg = '';
            var TplRtAvg = '';
            var chAvg = (chSum / allCourseCount).toFixed(2);
            var rtAvg = (rtSum / allCourseCount).toFixed(2);
            for (var i = 0; i < allCourseCount.toString().length; i++) {
                TplAllCourseCnt += '<li>' + allCourseCount.toString()[i] + '</li>';
            }
            for (var i = 0; i < chAvg.toString().length; i++) {
                TplChAvg += '<li>' + chAvg.toString()[i] + '</li>';
            }
            for (var i = 0; i < rtAvg.toString().length; i++) {
                TplRtAvg += '<li>' + rtAvg.toString()[i] + '</li>';
            }
            $('.allCourseCnt').html(TplAllCourseCnt);
            $('.chAvg').html(TplChAvg);
            $('.rtAvg').html(TplRtAvg);
        } else {
            $('.allCourseCnt').html('<li>0</li>');
            $('.chAvg').html('<li>0</li>');
            $('.rtAvg').html('<li>0</li>');
        }

        //最多显示500个点
        var maxPointCount = 500;
        if (data.length > maxPointCount) {
            data.sort(function () {
                return Math.round(Math.random());
            });
            data = data.slice(0, maxPointCount);
        }

        //安装学段排序
        data.sort(function (o1, o2) {
            if(o1.semesterSort < o2.semesterSort) {
                return -1;
            } else if(o1.semesterSort > o2.semesterSort) {
                return 1;
            } else {
                return 0;
            }
        });

        $.each(data, function (i, d) {
            if (semesterIds.indexOf(d.baseSemesterId) == -1) {
                semesterIds.push(d.baseSemesterId);
                semesterNames.push(d.semesterName);
            }
        });

        var dataList = [];
        for (var i = 0; i < semesterIds.length; i++) {
            dataList[i] = [];
        }

        var dataIndex;
        $.each(data, function (i, d) {
            dataIndex = semesterIds.indexOf(d.baseSemesterId);
            dataList[dataIndex].push([d.rt, d.ch, d.semesterName]);
        });
        var series = [];

        var color;
        $.each(dataList, function (i, d) {
            color = colors[i];
            if (!color) {
                color = defaultColor;
            }
            series[i] = {
                name: semesterNames[i],
                data: dataList[i],
                type: 'scatter',
                symbolSize: function (data) {
                    // 映射到对应[0,15]区间
                    var size = data[1] * 15;
                    return size;
                },
                label: {
                    normal: {
                        show: true,
                        formatter: "",
                        position: 'top'
                    }
                },
                itemStyle: {
                    normal: {
                        // shadowBlur: 2,
                        // shadowColor: color,
                        // shadowOffsetY: 2,
                        color: color
                    }
                }
            }
        });

        option3 = {
            color: ['#1cc840', '#43bbfb', '#eb5690'],
            legend: {
                top: '5%',
                show: true,
                itemWidth: 5,
                itemHeight: 5,
                // shadowColor: 'rgba(77, 57, 122, 1.5)',
                // shadowOffsetY: 5,
                right: 35,
                data: semesterNames,
                color: ['#1cc840', '#43bbfb', '#eb5690'],
                textStyle: {
                    fontSize: 12,
                    color: '#a5a6bb'
                }
            },
            grid: {
                top: '55',
                left: '60',
                right: '90',
                bottom: '5',
                containLabel: true
            },
            tooltip: {
                transitionDuration: 0,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderColor: '#535b69',
                borderRadius: 8,
                borderWidth: 1,
                padding: [5, 10],
                show: true,
                formatter: function (param) {
                    var rt = param.value[0];
                    var ch = param.value[1];
                    var html = getCourseType(rt, ch) + '<br/>';
                    html += 'Rt：' + rt.toFixed(2) + '<br/>';
                    html += 'Ch：' + ch.toFixed(2) + '<br/>';
                    return html;
                },
            },
            xAxis: {
                name: 'Rt',
                max: 1,
                splitNumber: 8,
                axisTick: {show: false},
                axisLine: {
                    lineStyle: {
                        color: '#2a3150'
                    }
                },
                axisLabel: {
                    interval: 1,
                    color: '#a5a6bb',
                    fontSize: '16'
                },
                nameTextStyle: {
                    color: '#a5a6bb',
                    fontSize: '20'
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                name: 'Ch',
                max: 1,
                type: 'value',
                splitNumber: 6,
                axisTick: {show: false},
                axisLine: {
                    lineStyle: {
                        color: '#2a3150'
                    }
                },
                axisLabel: {
                    interval: 1,
                    color: '#a5a6bb',
                    fontSize: '16'
                },
                nameTextStyle: {
                    color: '#a5a6bb',
                    fontSize: '20'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2b3646'
                    }
                },
                scale: true
            },
            series: series
        };
        myChart3.setOption(option3);

    });
}
//-----------------学生偏好
function studentFavor(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/behavioranalysis/courseratingdata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result;
        var Tpl = '';
        if (data.length == 0) {
            $('.student-favorite .no-data').show();
            myChart5.clear();
            $('.com-screen-content .dataRange').html(Tpl);
            return false;
        }else{
            $('.student-favorite .no-data').hide();
        }
        var typeName = [], GeneralCourses, VeryGoodCourses, generalCoursesData = [], veryGoodCoursesData = [];
        var generalData;
        var veryGoodData;
        $.each(data, function (i, d) {
            if (d.courseRating == 'verygood') {
                veryGoodData = [d.countInstructModeTeaching, d.countInstructModeInteraction, d.countInstructModeBalance, d.countInstructModeExercise, d.countInstructModeBlackboard];
            } else if (d.courseRating == 'general') {
                generalData = [d.countInstructModeTeaching, d.countInstructModeInteraction, d.countInstructModeBalance, d.countInstructModeExercise, d.countInstructModeBlackboard];
            }
        });
        var veryGoodDataMax = Math.max.apply(null, veryGoodData);
        var generalDataMax = Math.max.apply(null, generalData);
        var Max = Math.max(veryGoodDataMax, generalDataMax);
        var data1 = (Max / 4).toFixed(0);
        var data2 = (Max / 2).toFixed(0);
        var data3 = (Max * 3 / 4).toFixed(0);
        var data4 = Max;
        Tpl = `<span class="rangeone">${data1}</span>
                <span class="rangetwo">${data2}</span>
                <span class="rangethr">${data3}</span>
                <span class="rangefou">${data4}</span>`;
        var typeNames = [{name: '讲授型', max: Max}, {name: '对话型', max: Max}, {name: '平衡型', max: Max}, {name: '练习型', max: Max}, {name: '板块型', max: Max}];

        if (data.veryGoodCourses) {
            VeryGoodCourses = data.veryGoodCourses;
            for (var i = 0; i < VeryGoodCourses.length; i++) {
                veryGoodCoursesData.push(VeryGoodCourses[i].courseCnt);
            }
        } else {
            myChart5.clear();
        }
        option5 = {
            tooltip: {
                trigger: 'item',
                transitionDuration: 0,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderColor: '#535b69',
                borderRadius: 8,
                borderWidth: 1,
                padding: [5, 10]
            },
            legend: {
                icon: 'circle',
                itemWidth: 8,
                itemHeight: 8,
                itemGap: 14,
                x: 'right',
                data: ['好评', '中评'],
                color: ['#1f9cf3', '#fde649'],
                textStyle: {
                    fontSize: 14,
                    color: '#a0a8b9'
                }
            },
            radar: {
                shape: 'circle',
                splitNumber: 4,
                name: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#1bb9f9',
                        fontSize: 16,
                        fontFamily: 'PingFangMedium',
                    }
                },
                indicator: typeNames,
                center: ['51.6%', '54.3%'],
                radius: 188,
                splitArea: {
                    show:false,
                    areaStyle: {
                        // color: ['rgba(14,52,111,0.8)', 'rgba(14,52,111,0.6)', 'rgba(14,52,111,0.4)', 'rgba(14,29,63,0.3)'],
                        // shadowBlur: 10
                    }
                },
                axisLine: {
                    // show:false,
                    lineStyle: {
                        type: 'dashed',
                        color: '#132f4c'
                    }
                },
                splitLine: {
                    // show:false,
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        },
                        color: 'rgba(14, 58, 125,0.6)'
                    }
                }
            },
            series: [
                {
                    name: '中评',
                    type: 'radar',
                    symbolSize: 8,
                    "itemStyle": {
                        "normal": {
                            color: '#fde649',
                            "borderColor": "rgba(208,234,253, 0.3)",
                            "borderWidth": 5,
                            // "shadowColor": "rgba(208,234,253, 0.4)",
                            // "shadowBlur": 10
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: 'rgba(241,220,72,0.2)'
                        }
                    },
                    "lineStyle": {
                        "normal": {
                            "color": "#fde649",
                            "width": 2,
                            "type": "solid"
                        }
                    },
                    data: [
                        {
                            value: generalData,
                            name: '中评'
                        }
                    ]
                },
                {
                    name: '好评',
                    type: 'radar',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: '#1f9cf3',
                            "borderColor": "rgba(208,234,253, 0.3)",
                            "borderWidth": 5,
                            "shadowColor": "rgba(208,234,253, 0.4)",
                            "shadowBlur": 10
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: 'rgba(22,102,161,0.2)'
                        }
                    },
                    "lineStyle": {
                        "normal": {
                            "color": "#1f9cf3",
                            "width": 2,
                            "type": "solid"
                        }
                    },
                    data: [
                        {
                            value: veryGoodData,
                            name: '好评'
                        }
                    ]
                }
            ]
        };
        myChart5.setOption(option5, true);
        $('.com-screen-content .dataRange').html(Tpl);
    });
}
//-----------------教师排行榜
function teacherRank(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/behavioranalysis/courseteacherdata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result;
        if (data.length > 0) {
            $('.teacher-rank .no-data').hide();
            $('.teacher-rank .axisxy-title').show();
            data.reverse();
        } else {
            $('.teacher-rank .no-data').show();
            $('.teacher-rank .axisxy-title').hide();
            myChart6.clear();
            return false;
        }

        var teacherNames = [];
        var teacherLongNames = [];
        var allCourseCnt = [];
        var goodCourseCnt = [];
        var maxCount = [];
        var goodCourseRatio = [];
        var maxCourseCnt = 0;

        $.each(data, function (i, d) {
            if(d.teacherUserName == null || d.teacherUserName == '') {
                d.teacherUserName = '未知';
            }

            teacherNames.push(strEllipsis(d.teacherUserName, 8));
            teacherLongNames.push(d.teacherUserName);
            allCourseCnt.push(d.countCourse);
            goodCourseCnt.push(d.countCourseRatingVerygood);
            goodCourseRatio.push('(' + (d.countCourseRatingVerygood * 100 / d.countCourse).toFixed(0) + '%)');
        });
        maxCourseCnt = Math.max.apply(null, allCourseCnt);
        $.each(data, function (i, d) {
            maxCount.push(maxCourseCnt);
        });
        option6 = {
            tooltip: {
                show: "true",
                trigger: 'item',
                transitionDuration: 0,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderColor: '#535b69',
                borderRadius: 8,
                borderWidth: 1,
                padding: [5, 10],
                fontSize: '13',
                fontFamily: 'PingFangMedium',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (param) {
                    var html = teacherLongNames[param.dataIndex] + '<br/>';
                    html += '好评课程数：' + goodCourseCnt[param.dataIndex] + '<br/>';
                    html += '课程总数：' + allCourseCnt[param.dataIndex] + '<br/>';
                    html += '好评占比：' + goodCourseRatio[param.dataIndex] + '<br/>';
                    return html;
                }
            },
            grid: {
                show: false,
                top: '12',
                bottom: '20',
                left: '29',
                right: '22',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                show: true,
                max: maxCourseCnt,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.5)'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    fontSize: '12',
                    interval: 10
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: [
                {
                    type: 'category',
                    position: "left",
                    data: allCourseCnt,
                    offset: 11,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval:'0',
                        fontSize: '24',
                        fontFamily: 'myFirstFont'
                    },

                    splitLine: {
                        show: false
                    }
                },
                {
                    type: 'category',
                    position: "left",
                    data: teacherNames,
                    nameGap: 20,
                    offset: 45,
                    axisLine: {
                        show: false,
                        onZero: true,
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval:'0',
                        color: '#1bb9f9',
                        fontSize: '17',
                        fontFamily: 'PingFangBold'
                    },
                    splitLine: {
                        show: false
                    }
                },
                {
                    type: 'category',
                    position: "right",
                    data: goodCourseRatio,
                    nameGap: 20,
                    offset: 13,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        color: '#6f8ab2',
                        fontSize: '16'
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    barWidth: 4,
                    silent: true,
                    yAxisIndex: 0,
                    label: {
                        normal: {
                            show: false,
                            color: '#7e9bc6',
                            fontSize: '14',
                            position: 'right'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#3134d1',
                            barBorderRadius: 20
                        }
                    },
                    data: maxCount
                }, {
                    name: '',
                    type: 'bar',
                    barWidth: 4,
                    silent: false,
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            color: '#1c9bfb',
                        }
                    },
                    data: goodCourseCnt
                }, {
                    name: 'yuan',
                    type: 'scatter',
                    hoverAnimation: false,
                    data: goodCourseCnt,
                    yAxisIndex: 1,
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            color: '#1c9bfb',
                            opacity: 1,
                            label: {
                                show: true,
                                position: [0,-19],
                                fontSize: '19',
                                fontFamily: 'myFirstFont',
                                color:'#fff'
                            },           
                        },
                        emphasis:{
                            "borderColor": "rgba(208,234,253, 0.3)",
                            "borderWidth":9,    
                        },
                    },

                    zLevel: 5
                }]
        };
        myChart6.setOption(option6);
    });
}

function getCourseType(rt, ch) {
    if (rt <= 0.3) {
        return '练习型';
    } else if (rt >= 0.7) {
        return '讲授型';
    } else if (ch >= 0.6) {
        return '对话型';
    } else if (ch <= 0.2) {
        return '板块型';
    } else {
        return '平衡型';
    }
}