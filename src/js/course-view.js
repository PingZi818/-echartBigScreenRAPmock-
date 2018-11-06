var
    dataType = $('.filter-type li.active').data('type'),
    featuresDataArr;
var currentBaseAreaId;
var echart1 = echarts.init(document.getElementById('main1'));
var echart2 = echarts.init(document.getElementById('main2'));
var echart3 = echarts.init(document.getElementById('main3'));
var echart4 = echarts.init(document.getElementById('main4'));
var echart5 = echarts.init(document.getElementById('main5'));
var echart6 = echarts.init(document.getElementById('main6'));
var echart7 = echarts.init(document.getElementById('main7'));
var echart8 = echarts.init(document.getElementById('main8'));
var echart9 = echarts.init(document.getElementById('main9'));
var echart10 = echarts.init(document.getElementById('main10'));

setOptionClassBuild(0, 0);
setOptionlivingData(0, 0, 0, 0);
scheduleClassStatus(0, 0);
courseAnalysisSetOption([{value: 0, name: '故障数'}], 0);
//获取当前时间
getNowFormatDate();
//选择行政区
//根据参数填充页面，以及渲染地图
function resetData(baseAreaId, areaCode) {
    dateMapRegisterCode = areaCode;
    if (areaCode == '000000') {
        dateMapRegisterCode = 'china';
    }
    var jsonPath = areaCodeToFile[areaCode];
    if (!jsonPath) {
        $.ajax({
            url: BACK_ROOT + '/bigscreen/area/getarealevel3code.do',
            data: {baseAreaId: baseAreaId},
            async: false,
            success: function (data) {
                dateMapRegisterCode = data;
                jsonPath = areaCodeToFile[data];
            }
        });
    }

    if (!jsonPath) {
        mapDataExist = false;
        return false;
    }
    mapDataExist = true;
    $.ajax({
        url: 'resource/data/' + jsonPath,
        async: false,
        success: function (mapJson) {
            //渲染地图
            echarts.registerMap(dateMapRegisterCode, mapJson);
            featuresDataArr = mapJson.features;
        }
    });
}
$(function () {
    //设置标题信息
    $('#titleContainer').html(back_ground_info['front.workspace.bigscreen.supervise.area'].textContent + '大数据');


    new AreaSelect({
        areaInfoUrl: BACK_ROOT + '/bigscreen/area/getbyid.do',
        url: BACK_ROOT + '/bigscreen/area/childlist.do',
        container: $('.location'),
        defaultBaseAreaId: back_ground_info['baseAreaId'],
        callback: function (baseAreaId, areaCode, areaLevel, areaName) {
            onAreaChange(baseAreaId, areaCode, areaLevel, areaName);
        }
    }).init();

    //数据类型切换
    $('.filter-type1').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
        dataType = $(this).data('type');
        if (dataType == 'subject') {
            subjectAndClasslevelList(subjectDataList, dataType);
        } else if (dataType == 'classlevel') {
            subjectAndClasslevelList(classlevelDataList, dataType);
        }
    });
    $('.filter-type2').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
        dataType = $(this).data('type');
        if (dataType == 'baseArea') {
            areaAndTeacherList(areaDataListTop, dataType);
        } else if (dataType == 'teacher') {
            areaAndTeacherList(userDataListTop, dataType);
        }
    });


    $("#baseTrimesterContainer").on('change', 'select', function () {
        trimesterId = $("#baseTrimesterContainer select option:checked").val();
        interStartLesson(currentBaseAreaId, trimesterId);
    });
});


var lastAreaMapLevel = 3;
var dateMapRegisterCode;
var mapDataExist = true;
var livingDataInterval;
function onAreaChange(baseAreaId, areaCode, areaLevel, areaName) {
    clearInterval(livingDataInterval);
    currentBaseAreaId = baseAreaId;
    resetData(baseAreaId, areaCode);


    classBuild(baseAreaId);
    getBenefitStudentCnt(baseAreaId);
    livingData(baseAreaId);
    livingDataInterval = setInterval(livingData, 60000, baseAreaId);
    //授课分析
    courseAnalysis(baseAreaId);
    //本周情况
    thisWeek(baseAreaId);
    //查询区域学期
    getBaseTrimester(baseAreaId);
    var trimesterId = $('#baseTrimesterContainer select option:checked').val();
    interStartLesson(baseAreaId, trimesterId);

    //下级行政区数据
    $.get(BACK_ROOT + '/bigscreen/classroom/getschedulesubareadata.do', {baseAreaId: baseAreaId}, function (data) {
        data = data.result;
        //地图数据


        var hasChildArea = true;
        //最后一级行政区域查询直属校统计资源
        $.ajax({
            url: BACK_ROOT + '/bigscreen/area/getchildrenareacount.do',
            data: {baseAreaId: baseAreaId},
            async: false,
            success: function (data) {
                if (data == 0) {
                    hasChildArea = false;
                }
            }
        });

        var areaMapData = [];
        if (hasChildArea) {
            $('#areaNameContainer').html('行政区排行');
            areaDataListTop = data.areaDataTop;
            areaMapData = data.areaData;
        } else {
            $('#areaNameContainer').html('学校排行');
            var planCourseCnt = 0;
            $.ajax({
                url: BACK_ROOT + '/bigscreen/classroom/getdirectscheduleschoolcountdata.do',
                data: {baseAreaId: baseAreaId},
                async: false,
                success: function (data) {
                    data = data.result;
                    $.each(data, function (i, d) {
                        d.areaName = d.schoolName;
                        planCourseCnt += d.planCourseCnt;
                    });
                    areaDataListTop = data;
                    if (data.length > 0) {
                        areaMapData = [{areaName: areaName, areaCode: areaCode, planCourseCnt: planCourseCnt}];
                    }
                }
            });
        }

        mapData(areaMapData, dateMapRegisterCode, areaLevel);

        areaDataListTop.reverse();
        if ($('.filter-type2 li.active').data('type') == 'baseArea') {
            areaAndTeacherList(areaDataListTop, 'baseArea');
        }
    });

    //学科统计
    $.get(BACK_ROOT + '/bigscreen/classroom/getschedulesubjectdata.do', {baseAreaId: baseAreaId}, function (data) {
        subjectDataList = data.result;
        if ($('.filter-type1 li.active').data('type') == 'subject') {
            subjectAndClasslevelList(subjectDataList, 'subject');
        }
    });

    //年级统计
    $.get(BACK_ROOT + '/bigscreen/classroom/getscheduleclassleveldata.do', {baseAreaId: baseAreaId}, function (data) {
        classlevelDataList = data.result;
        if ($('.filter-type1 li.active').data('type') == 'classlevel') {
            subjectAndClasslevelList(classlevelDataList, 'classlevel');
        }
    });

    //教师排行
    $.get(BACK_ROOT + '/bigscreen/classroom/getscheduleteacherdata.do', {baseAreaId: baseAreaId}, function (data) {
        userDataListTop = data.result;
        userDataListTop.reverse();
        if ($('.filter-type2 li.active').data('type') == 'teacher') {
            areaAndTeacherList(userDataListTop, 'teacher');
        }
    });

    //开课状态数量统计
    $.get(BACK_ROOT + '/bigscreen/classroom/getschedulestatusdata.do', {baseAreaId: baseAreaId}, function (data) {
        scheduleClassStatus(data.result.validCourseCnt, data.result.invalidCourseCnt)
        scheduleStatusCnt(data.result);
    });
}

var areaDataListTop;
var userDataListTop;
var classlevelDataList;
var subjectDataList;


//受益学生人数
function getBenefitStudentCnt(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/classroom/getbenefitstudentcnt.do', {baseAreaId: baseAreaId}, function (data) {
        var stuCnt = data.result;
        var stuCntHtml = '';
        for (var i = 0; i < stuCnt.toString().length; i++) {
            stuCntHtml += '<li>' + stuCnt.toString()[i] + '</li>';
        }
        $('.studentCnt').html(stuCntHtml);
    });
}

//查询区域的学期
function getBaseTrimester(baseAreaId) {
    $.ajax({
        url: BACK_ROOT + '/bigscreen/trimester/getbyareaid.do',
        data: {baseAreaId: baseAreaId},
        async: false,
        success: function (data) {
            var html = '<select>';
            var trimesters = data.result;
            $.each(trimesters, function (i, d) {
                html += '<option value="' + d.baseTrimesterId + '">' + d.trimesterName + '</option>';
            });
            html += '</select>';
            $('#baseTrimesterContainer').html(html);
        }
    });
}


// ----------------------------------------数据渲染方法

//教室建设
function classBuild(baseAreaId) {
    var receiveRoomCnt = 0, masterRoomCnt = 0;
    $.get(BACK_ROOT + '/bigscreen/classroom/classroomtypedata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result, total = {};
        receiveRoomCnt = data.receiveRoomCnt;
        masterRoomCnt = data.masterRoomCnt;
        setOptionClassBuild(masterRoomCnt, receiveRoomCnt);
    });
}
function setOptionClassBuild(masterRoomCnt, receiveRoomCnt) {
    var total = masterRoomCnt + receiveRoomCnt;
    var masterRoomCntShadow = total - masterRoomCnt;

    var receiveRoomCntShadow = total - receiveRoomCnt;
    var masterData = [
        {
            value: masterRoomCntShadow,
            name: 'shadow',
            itemStyle: {
                normal: {
                    borderColor: "#112958",
                    color: "#112958"
                }
            }
        },
        {
            value: masterRoomCnt,
            name: 'mainSubject',
            itemStyle: {
                normal: {
                    borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#1d69f1'
                    }, {
                        offset: 1,
                        color: '#1ad1fc'
                    }]),
                    shadowBlur: 20,
                    shadowColor: 'rgba(28,132,244,0.6)',
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#1d69f1'
                    }, {
                        offset: 1,
                        color: '#1ad1fc'
                    }]),
                }
            }
        }
    ];
    var receiveData = [
        {
            value: receiveRoomCntShadow,
            name: 'shadow',
            itemStyle: {
                normal: {
                    borderColor: "#112958",
                    color: "#112958"
                }
            }
        },
        {
            value: receiveRoomCnt,
            name: 'mainSubject',
            itemStyle: {
                normal: {
                    borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#09994c'
                    }, {
                        offset: 1,
                        color: '#3ef99b'
                    }]),
                    shadowBlur: 20,
                    shadowColor: 'rgba(28,132,244,0.6)',
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#09994c'
                    }, {
                        offset: 1,
                        color: '#3ef99b'
                    }]),
                }
            }
        }
    ];
    if (total == 0) {
        masterData = [
            {
                value: masterRoomCntShadow,
                name: 'shadow',
                itemStyle: {
                    normal: {
                        borderColor: "#112958",
                        color: "#112958"
                    }
                }
            }
        ];
        receiveData = [
            {
                value: receiveRoomCntShadow,
                name: 'shadow',
                itemStyle: {
                    normal: {
                        borderColor: "#112958",
                        color: "#112958"
                    }
                }
            }
        ];
    }
    var masterRoomRatio;
    var receiveRoomRatio;

    if (total == 0) {
        masterRoomRatio = '0%';
        receiveRoomRatio = '0%';
    } else {
        masterRoomRatio = (masterRoomCnt * 100 / total).toFixed(0);
        receiveRoomRatio = 100 - masterRoomRatio;
        masterRoomRatio += '%';
        receiveRoomRatio += '%';
    }
    $('.class-build .echart-text li:nth-child(1)').html('<p>' + masterRoomCnt + '</p>');
    $('.class-build  .echart-text li:nth-child(2)').html('<p>' + receiveRoomCnt + '</p>');

    echart1.setOption({
        tooltip: {
            trigger: 'item',
            transitionDuration: 0,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderColor: '#535b69',
            borderRadius: 8,
            borderWidth: 0,
            padding: 10,
            show: true,
            formatter: function (param) {
                if (param.data.name == 'shadow') {
                    return '';
                }
                var html = '主讲教室<br/>';
                html += '教室数量：' + masterRoomCnt + '<br/>';
                html += '教室占比：' + masterRoomRatio;
                return html;
            }
        },
        series: [{
            name: masterRoomCnt,
            type: 'pie',
            clockWise: false,
            radius: ['64', '80'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    shadowColor: '#112958' //边框阴影
                }
            },
            data: masterData
        }]
    });

    echart2.setOption({
        tooltip: {
            trigger: 'item',
            show: true,
            transitionDuration: 0,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderColor: '#535b69',
            borderRadius: 8,
            borderWidth: 0,
            padding: 10,
            formatter: function (param) {
                if (param.data.name == 'shadow') {
                    return '';
                }
                var html = '接收教室<br/>';
                html += '教室数量：' + receiveRoomCnt + '<br/>';
                html += '教室占比：' + receiveRoomRatio;
                return html;
            }
        },
        series: [{
            name: receiveRoomCnt,
            type: 'pie',
            clockWise: false,
            radius: ['64', '80'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    shadowColor: 'rgba(0, 0, 0, 0)', //边框阴影
                }
            },
            data: receiveData
        }]
    });
}
//实时动态
function livingData(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/classroom/getschedulerealtimedata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result, Tpl = '';
        if (data) {
            Tpl += '<li>' + data.livingCourseCnt + '</li>';
            Tpl += '<li>' + data.joinUserCnt + '</li>';
            Tpl += '<li>' + data.finishedCourseCnt + '</li>';
            Tpl += '<li>' + data.planCourseCnt + '</li>';
        }
        $('.living-status .status-data').html(Tpl);


        var textData, receiveRoomCnt, masterRoomCnt, faultRoomCnt;

        receiveRoomCnt = data.receiveRoomCnt;
        masterRoomCnt = data.masterRoomCnt;
        faultRoomCnt = data.abnormalRoomCnt;
        textData = receiveRoomCnt + masterRoomCnt;

        setOptionlivingData(textData, masterRoomCnt, receiveRoomCnt, faultRoomCnt);
    });
}
function setOptionlivingData(textData, masterRoomCnt, receiveRoomCnt, faultRoomCnt) {
    var faultMax = Math.max.call(receiveRoomCnt, masterRoomCnt, faultRoomCnt);
    faultMax = faultMax * 1.2;
    var circleData = function (val) {
        let total = faultMax;
        let count = val;
        let shadeCount;
        let noneCount = faultMax * 0.25;
        if (val > total) {
            count = total;
            shadeCount = 0;
        } else if (val == 0) {
            total = 1;
            shadeCount = total * 0.75;
            count = 0;
            noneCount = total * 0.25
        } else {
            shadeCount = total - val;
        }
        return {
            count: count,
            shadeCount: shadeCount,
            noneCount: noneCount,
        }
    };

    placeHolderStyle = {
        normal: {
            borderWidth: 5,
            shadowBlur: 40,
            borderColor: "#132235",
            shadowColor: 'rgba(0, 0, 0, 0)', //边框阴影
            color: "#132235"
        }
    };

    echart3.setOption({
        title: {
            show: true,
            text: textData + '间正在直播',
            right: 20,
            top: 40,
            textStyle: {
                fontSize: 16,
                color: '#19a3dd'
            }
        },
        color: ['#1c68e5', '#11a754'],
        tooltip: {
            show: false,
            trigger: 'item'
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: '13%',
            top: '40%',
            itemWidth: 10,
            itemHeight: 5,
            itemGap: 10,
            textStyle: {
                color: ['#1bbcfa', '#5beca0'],
                fontSize: 12
            },
            data: ['主讲教室 ' + masterRoomCnt, '接入教室 ' + receiveRoomCnt]
        },
        series: [
            {
                name: '主讲教室 ' + masterRoomCnt,
                type: 'pie',
                clockWise: false,
                radius: ['51%', '55%'],
                center: ['30%', '50%'],
                hoverAnimation: false, //鼠标移入变大
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        borderWidth: 5,
                        shadowBlur: 40,
                        borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: '#1d69f1'
                        }, {
                            offset: 1,
                            color: '#1bbcfa'
                        }]),
                        shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                    }
                },
                data: [
                    {
                        value: circleData(masterRoomCnt).count,
                        name: '主讲教室'
                    },
                    {
                        value: circleData(masterRoomCnt).shadeCount,
                        name: '',
                        itemStyle: placeHolderStyle
                    },
                    {
                        value: circleData(masterRoomCnt).noneCount,
                        name: '',
                        itemStyle: {
                            normal: {
                                color: 'none',
                                borderColor: 'none'
                            }
                        }
                    }
                ]
            }, {
                name: '接入教室 ' + receiveRoomCnt,
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                radius: ['31%', '35%'],
                center: ['30%', '50%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        borderWidth: 5,
                        shadowBlur: 40,
                        borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: '#20a65a'
                        }, {
                            offset: 1,
                            color: '#5beca0'
                        }]),
                        shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                    }
                },
                data: [
                    {
                        value: circleData(receiveRoomCnt).count,
                        name: '接入教室'
                    },
                    {
                        value: circleData(receiveRoomCnt).shadeCount,
                        name: '',
                        itemStyle: placeHolderStyle
                    },
                    {
                        value: circleData(receiveRoomCnt).noneCount,
                        name: '',
                        itemStyle: {
                            normal: {
                                color: 'none',
                                borderColor: 'none'
                            }
                        }
                    }
                ]
            }]
    });

//概率环图处理 解决溢出问题
    option4 = {
        title: {
            show: true,
            text: '未正常接入',
            right: 30,
            top: 40,
            textStyle: {
                fontSize: 16,
                color: '#ff3361'
            }
        },
        // color: ['#ff7b5f'],
        tooltip: {
            trigger: 'item',
            show: false
            // formatter:"<p class='center'>{b}</p><p class='center'>{c}</p>"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: '22%',
            top: '40%',
            itemWidth: 10,
            itemHeight: 5,
            itemGap: 10,
            textStyle: {
                color: '#ff3361',
                fontSize: 12
            },
            data: ['' + faultRoomCnt]
        },
        series: [{
            name: '' + faultRoomCnt,
            type: 'pie',
            clockWise: false,
            radius: ['51%', '55%'],
            center: ['30%', '50%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    borderWidth: 5,
                    shadowBlur: 40,
                    borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#ff7b5f'
                    }, {
                        offset: 1,
                        color: '#ff3361'
                    }]),
                    shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                }
            },
            data: [
                {
                    value: circleData(faultRoomCnt).count,
                    name: '未正常接入'
                },
                {
                    value: circleData(faultRoomCnt).shadeCount,
                    name: '',
                    itemStyle: placeHolderStyle
                }, {
                    value: circleData(faultRoomCnt).noneCount,
                    name: '',
                    itemStyle: {
                        normal: {
                            color: 'none',
                            borderColor: 'none'
                        }
                    }
                }
            ]
        }]
    };
    echart4.setOption(option4);
}
//学科年级分布
function subjectAndClasslevelList(data, type) {
    echart5.clear();
    if (data.length == 0) {
        $('.sg-distribution .no-data').show();
        echart5.clear();
        return false;
    } else {
        $('.sg-distribution .no-data').hide();
    }
    var category = [], roomCnt = [];
    var totalCount = 0;
    var scheduleCountRatio = [];
    for (var i = 0; i < data.length; i++) {
        if (type == 'classlevel') {
            category.push(data[i].classlevelName);
        } else if (type == 'subject') {
            category.push(data[i].subjectName);
        }
        roomCnt.push(data[i].scheduleCount);
        totalCount += data[i].scheduleCount;
    }

    for (var i = 0; i < data.length; i++) {
        scheduleCountRatio.push((data[i].scheduleCount * 100 / totalCount).toFixed(0));
    }

    var dataZoom = [{show: false},
        {
            type: "inside",
            show: false,
            zoomLock: true,
        }];
    if (data.length > 10) {
        // var start = (data.length - 8)/ 2;
        // var end = start + 9;
        dataZoom = [
            {
                show: true,
                height: 8,
                width: '50%',
                xAxisIndex: [0],
                bottom: 2,
                left: 'center',
                startValue: 1,
                endValue: 10,
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

    echart5.setOption({
        tooltip: {
            trigger: 'axis',
            transitionDuration: 0,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderColor: '#535b69',
            borderRadius: 8,
            borderWidth: 0,
            padding: 10,
            position: function (p) {
                return [p[0] + 10, p[1] - 10];
            },
            showContent: true,
            formatter: function (param) {
                var html = param[0].axisValue + '<br/>';
                html += '课程数量：' + roomCnt[param[0].dataIndex] + '<br/>';
                html += '课程占比：' + param[0].value + '%';
                return html;
            },
            axisPointer: {
                type: 'line',
                lineStyle: {
                    type: 'dashed',
                    color: '#ffff00'
                }
            },
        },
        grid: {
            show: false,
            top: '6%',
            left: '8',
            right: '15',
            containLabel: true,
        },
        dataZoom: dataZoom,
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#a5a6bb'
                }
            },
            axisLabel: {
                interval: '0',
                show: true,
                inside: false,
                rotate: 45,
                margin: 2,
                textStyle: {
                    fontSize: 12,
                    color: '#a5a6bb'
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            data: category,
            offset: 15
        },
        yAxis: {
            type: 'value',
            data: ['10%', '100%'],
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#a5a6bb'
                }
            },
            axisLabel: {
                formatter: '{value} %',
                margin: 10,
                textStyle: {
                    fontSize: 13,
                    color: '#a5a6bb',
                    fontFamily: 'PingFangRegular'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#273651',
                    width: 1,
                    shadowColor: 'rgba(0, 0, 0, 0.7)',
                    shadowBlur: 10,
                    shadowOffsetX: 5,
                    opacity: '0.3'
                }
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            type: 'line',
            smooth: false,
            symbolSize: 6,
            hoverAnimation: false,
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(25, 153, 227, 0.7)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(25, 153, 227, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: '#1999e3'
                },
                emphasis: {
                    "borderColor": "rgba(208,234,253, 0.3)",
                    "borderWidth": 9,
                },
            },
            data: scheduleCountRatio
        }]
    });
}

//实际开课总量+计划开课总量+开课占比
function scheduleStatusCnt(data) {
    var realCourseCnt = data.validCourseCnt;
    var planCourseCnt = data.planCourseCnt;

    var realCourseCntHtml = '', planCourseCntHtml = '';
    var courseRatio = '0', courseRatioHtml = '';
    if (planCourseCnt > 0) {
        var courseRatio = realCourseCnt * 100 / planCourseCnt;
        if(courseRatio > 0.95) {
            courseRatio = courseRatio.toFixed(0);
        } else {
            courseRatio = parseFloat(courseRatio.toFixed(1)) + '';
        }
    }

    for (var i = 0; i < realCourseCnt.toString().length; i++) {
        realCourseCntHtml += '<li>' + realCourseCnt.toString()[i] + '</li>';
    }
    for (var i = 0; i < planCourseCnt.toString().length; i++) {
        planCourseCntHtml += '<li>' + planCourseCnt.toString()[i] + '</li>';
    }
    for (var i = 0; i < courseRatio.length; i++) {
        courseRatioHtml += '<li>' + courseRatio[i] + '</li>';
    }
    courseRatioHtml += '<li>%</li>';
    $('.allCourseCnt').html(realCourseCntHtml);
    $('.unStartCourseCnt').html(planCourseCntHtml);
    $('.realCourseRatio').html(courseRatioHtml);
}

function echartMapSize(areaCode) {
    var layoutCenter = ['50%', '50%'];
    var layoutSize = '75%';
    //配置特殊地图区域位置和大小
    if ((!areaCode) || (areaCode == 'china') || (areaCode == '000000')) {
        //中国的配置
        layoutSize = '100%';
    }
    if (areaCode == '230000') {
        //黑龙江的配置
        layoutCenter = ['50%', '60%'];
        layoutSize = '65%';
    } else if (areaCode == '620000') {
        //甘肃的配置
        layoutCenter = ['60%', '60%'];
        layoutSize = '65%';
    } else if (areaCode == '350000') {
        //福建的配置
        layoutCenter = ['50%', '40%'];
    }
    return {
        layoutCenter: layoutCenter,
        layoutSize: layoutSize
    };
}

//地图数据(气泡图)中
function mapData(data, areaCode, areaLevel) {
    if (typeof data == 'undefined') {
        return false;
    }
    if (!mapDataExist) {
        echart6.clear();
        return false;
    }
    var geoCoordMap = {};

    /*获取地图数据*/
    var mapFeatures = featuresDataArr;
    mapFeatures.forEach(function (v) {
        // 地区名称
        var areaCode = v.id;
        // 地区经纬度
        geoCoordMap[areaCode] = v.properties.cp;
    });

    var planCourseCnt = [];
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].areaCode];
            if (geoCoord) {
                res.push({
                    name: data[i].areaName,
                    value: geoCoord.concat(data[i].planCourseCnt),
                });
            }
        }
        return res;
    };
    for (var i = 0; i < data.length; i++) {
        planCourseCnt.push(data[i].planCourseCnt);
    }
    var oMax = Math.max.apply(null, planCourseCnt);
    var oMin = Math.min.apply(null, planCourseCnt);
    var mapSize = echartMapSize(areaCode);

    option = {
        geo: {
            map: areaCode,
            type: 'map',
            left: 'center',
            label: {
                normal: {
                    show: true,
                    color: '#8dbdff'
                },
                emphasis: {
                    show: false,
                    color: '#8dbdff'
                }
            },
            layoutCenter: mapSize.layoutCenter,
            layoutSize: mapSize.layoutSize,
            roam: false,
            itemStyle: {
                borderSize: '2',
                normal: {
                    color: '#072558',
                    borderColor: '#12d7f7',
                    borderSize: '2'
                },
                emphasis: {
                    color: '#2382c1'
                }
            }
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderColor: 'rgba(255,255,255,0.3)',
            borderRadius: 8,
            borderWidth: 0,
            padding: [5, 10],
            formatter: function (param) {
                var html = param.data.name + '<br/>';
                html += '计划开课：' + param.data.value[2];
                return html;
            }
        },
        series: [

            {
                name: '点',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin', //气泡
                symbolSize: function (val) {
                    // 映射到对应[30,70]区间
                    if (oMax == oMin) {
                        return 55;
                    }
                    var size = (val[2] - oMin) * 40;
                    size = size / (oMax - oMin) + 30;
                    return size;
                },
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 9,
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#79b2ff', //标志颜色
                    }
                },
                zlevel: 6,
                data: convertData(data),
            }
        ]
    };
    echart6.setOption(option);
}


//互动课堂开课分析
function interStartLesson(baseAreaId, trimesterId) {
    $.get(BACK_ROOT + '/bigscreen/classroom/curvegraphdata.do', {baseAreaId: baseAreaId, trimesterId: trimesterId}).done(function (data) {
        var data = data.result;
        var dataZoom;
        if (data.planCourseData.length == 0 && data.realCourseData.length == 0 && data.startCourseRatioData.length == 0) {
            $('.course-analysis .no-data').show();
            $('.course-analysis .axisxy-title').hide();
            echart7.clear();
            return false;
        } else {
            $('.course-analysis .no-data').hide();
            $('.course-analysis .axisxy-title').show();
        }

        var weekCount = data.planCourseData.length;
        var xData = function () {
            var data = [];
            for (var i = 0; i < weekCount; i++) {
                var j = i + 1;
                data.push(j);
            }
            return data;
        }();
        if (data.planCourseData.length > 10) {
            var start = (data.planCourseData.length - 8) / 2;
            var end = start + 9;
            dataZoom = [
                {
                    show: true,
                    height: 8,
                    width: '50%',
                    xAxisIndex: [0],
                    bottom: 5,
                    left: 'center',
                    startValue: start,
                    endValue: end,
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
        } else {
            dataZoom = [{show: false},
                {
                    type: "inside",
                    show: false
                }];
        }
        var planCourseCnt = [], startCourseRatioCnt = [], realCourseCnt = [];

        if (data.planCourseData) {
            for (var i = 0; i < data.planCourseData.length; i++) {
                planCourseCnt.push(data.planCourseData[i].scheduleCount);
            }
        }
        if (data.startCourseRatioData) {
            for (var i = 0; i < data.startCourseRatioData.length; i++) {
                startCourseRatioCnt.push((data.startCourseRatioData[i].ratio).toFixed(0));
            }
        }
        if (data.realCourseData) {
            for (var i = 0; i < data.realCourseData.length; i++) {
                realCourseCnt.push(data.realCourseData[i].scheduleCount);
            }
        }
        option7 =
        {
            "title": {
                "text": "",
                "subtext": "",
                x: "1%",
                y: '5%',
                textStyle: {
                    color: '#1bb4f9',
                    fontSize: '20',
                    fontFamily: 'PingFangBold'
                },
                subtextStyle: {
                    color: '#90979c',
                    fontSize: '14'
                }
            },
            "tooltip": {
                "trigger": "axis",
                transitionDuration: 0,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderColor: '#535b69',
                borderRadius: 8,
                borderWidth: 0,
                position: function (p) {
                    // 位置回调
                    return [p[0] - 80, 80];
                },
                padding: [5, 10],
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        type: 'dashed',
                        color: '#ffff00'
                    }
                },
                formatter: function (params) {
                    var res = '第' + (params[0].dataIndex + 1) + '周<br/>';
                    for (var i = 0, l = params.length; i < l; i++) {
                        var seriesName = '';
                        var value = '';
                        if (params[i].seriesName == '实际开课') {
                            seriesName = '实际开课数';
                            value = params[i].value;
                        } else if (params[i].seriesName == '计划开课') {
                            seriesName = '计划开课数';
                            value = params[i].value;
                        } else if (params[i].seriesName == '实开课占比') {
                            seriesName = '实开课占比';
                            value = params[i].value + '%';
                        }
                        res += seriesName + ': ' + value + '<br>';
                    }
                    return res;
                }
            },
            "grid": {
                "borderWidth": 0,
                "left": '15',
                "right": '15',
                "top": '85',
                "bottom": '40',
                containLabel: true,
                textStyle: {
                    color: "#fff"
                }
            },
            "legend": {
                // x: 'right',
                itemWidth: 8,
                itemHeight: 12,
                top: '14',
                right: '12',
                itemGap: 10,
                textStyle: {
                    color: '#fff'
                },
                "data": ['实际开课', '计划开课', '实开课占比']
            },
            "calculable": true,
            "xAxis": [{
                "type": "category",
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#90979c'
                    }
                },
                "splitLine": {
                    "show": false
                },
                "axisTick": {
                    "show": false
                },
                "splitArea": {
                    "show": false
                },
                "axisLabel": {
                    // "interval": 0

                },
                "data": xData
            }],
            "yAxis": [
                {
                    "type": "value",
                    "splitLine": {
                        "show": false
                    },
                    "axisLine": {
                        "show": false,
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    "axisTick": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0
                    },
                    "splitArea": {
                        "show": false
                    }
                }, {
                    "name": "",
                    "type": "value",
                    "splitLine": {
                        "show": false
                    },
                    "axisLine": {
                        "show": false,
                        lineStyle: {
                            color: '#90979c'
                        }

                    },
                    "axisTick": {
                        "show": false
                    },
                    "axisLabel": {
                        formatter: '{value} %',
                        show: true,
                        "interval": "auto"
                    },
                    "splitArea": {
                        "show": false
                    }

                }],
            dataZoom: dataZoom,
            "series": [{
                "name": "实际开课",
                "type": "bar",
                // "stack": "总量",
                "showAllSymbol": true,
                "symbol": 'circle',
                "symbolSize": 5,
                "barMaxWidth": 10,
                "barGap": "5%",
                "itemStyle": {
                    "normal": {
                        "color": new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: '#1ad1fc'
                        }, {
                            offset: 1,
                            color: '#1d79f3'
                        }]),
                        "label": {
                            "show": true,
                            "textStyle": {
                                "color": "#fff"
                            },
                            "position": "top",
                            formatter: function (p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    }
                },
                "data": realCourseCnt
            },
                {
                    "name": "计划开课",
                    "showAllSymbol": true,
                    "symbol": 'circle',
                    "symbolSize": 5,
                    "type": "bar",
                    // "stack": "总量",
                    "barMaxWidth": 10,
                    "itemStyle": {
                        "normal": {
                            "color": new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#4ed8a2'
                            }, {
                                offset: 1,
                                color: '#086c36'
                            }]),
                            "barBorderRadius": 0,
                            "label": {
                                "show": true,
                                "textStyle": {
                                    "color": "#61defc"
                                },
                                "position": "top",
                                formatter: function (p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }
                        }
                    },
                    "data": planCourseCnt
                }, {
                    "name": "实开课占比",
                    "type": "line",
                    yAxisIndex: 1,
                    symbolSize: 8,
                    symbol: 'circle',
                    "itemStyle": {
                        "normal": {
                            "color": "#c47e26",
                            "barBorderRadius": 0,
                            "label": {
                                "show": false,
                                "position": "top",
                                formatter: function (p) {
                                    return (p.value * 100).toFixed(0) + ' %';
                                }
                            }
                        }

                    },
                    "data": startCourseRatioCnt
                }
            ]
        };
        echart7.setOption(option7);
    });
}

//-------------------授课分析
//故障情况
function courseAnalysis(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/classroom/getmalguideratiodata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result, dataGZ = [], dataAll = 0;
        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                dataGZ.push({value: data[i].catalogCnt, name: data[i].catalogName});
                dataAll += data[i].catalogCnt;
            }
            dataGZ[0].itemStyle = {
                normal: {
                    shadowBlur: 16,
                    shadowColor: 'rgba(255,148,148,0.6)',
                }
            };
            courseAnalysisSetOption(dataGZ, dataAll);
        } else {
            courseAnalysisSetOption([{value: 0, name: '故障数'}], 0);
        }
    });
}
function courseAnalysisSetOption(dataGZ, dataAll) {
    $('.teaching-analysis .echart-text li:nth-child(2)').html('<span>故障总数</span>' + '<p>' + dataAll + '</p>');
    option8 = {
        title: {
            x: 'center',
            y: 'center'
        },
        series: [
            {
                type: 'pie',
                radius: ['64', '80'],
                hoverAnimation: false,
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: dataGZ
            }
        ],
        color: ['#f54f41', '#4578f9', '#c367f4', '#44def3', '#f58260', '#e5b039']
    };
    echart8.setOption(option8);
    echart8.on('mouseout', function (params) {
        $('.teaching-analysis .echart-text li:nth-child(2)').html('<span>故障总数</span>' + '<p>' + dataAll + '</p>');
    });
    echart8.on('mouseover', function (params) {
        var percent = (params.percent).toFixed(0) + '%';
        $('.teaching-analysis .echart-text li:nth-child(2)').html('<span>' + params.name + '</span>' + '<p>' + percent + '</p>');
    });
}
//开课情况
function scheduleClassStatus(validCourseCnt, invalidCourseCnt) {
    var dataSK = [], dataAll = 0;
    dataSK.push({
        value: validCourseCnt,
        name: '有效课时',
        type: 'valid',
        itemStyle: {
            normal: {
                borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#1d69f1'
                }, {
                    offset: 1,
                    color: '#1ad1fc'
                }]),
                shadowBlur: 20,
                shadowColor: 'rgba(28,132,244,0.6)',
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#1d69f1'
                }, {
                    offset: 1,
                    color: '#1ad1fc'
                }]),
            }
        }
    });
    dataSK.push({
        value: invalidCourseCnt,
        name: '无效课时',
        type: 'invalid',
        itemStyle: {
            normal: {
                color: '#112958',
            }
        }
    });
    dataAll = validCourseCnt + invalidCourseCnt;
    $('.teaching-analysis .echart-text li:nth-child(1)').html('<span>开课总数</span>' + '<p>' + dataAll + '</p>');
    option9 = {
        title: {
            text: '',
            textStyle: {
                color: '#fff',
                fontSize: '18'
            },
            x: 'center',
            y: 'center'
        },
        series: [
            {
                type: 'pie',
                radius: ['64', '80'],
                hoverAnimation: false,
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: dataSK
            }
        ],
        color: ['#1ac9fb', '#112958']
    };
    echart9.setOption(option9);
    echart9.on('mouseout', function (params) {
        $('.teaching-analysis .echart-text li:nth-child(1)').html('<span>开课总数</span>' + '<p>' + dataAll + '</p>');
    });
    echart9.on('mouseover', function (params) {
        var percent = (params.percent).toFixed(0) + '%';
        $('.teaching-analysis .echart-text li:nth-child(1)').html('<span>' + params.name + '</span>' + '<p>' + percent + '</p>');
    });
}
//本周情况
function thisWeek(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/classroom/weekdata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result, Tpl = '', TplRate = '';
        if (data) {
            Tpl = '<span>' + data.validCourseCnt + '</span>' +
                '<span>' + data.planCourseCnt + '</span>';
            TplRate = '<span>' + data.masterRoomCnt + '</span>' +
                '<span>' + data.receiveRoomCnt + '</span>';
            $('.this-week-status .status_title span').html(data.validCourseRatio + '%');
            $('.use-rate .status_title span').html(data.usedRoomRatio + '%');
        } else {
            $('.this-week-status .status_title span').html('');
            $('.use-rate .status_title span').html('');
        }
        $('.this-week-status .data-count').html(Tpl);
        $('.use-rate .data-count').html(TplRate);
    });
}
//行政区和教师排行
function areaAndTeacherList(data, type) {
    if (data.length == 0) {
        $('.grand  .no-data').show();
        $('.grand .axisxy-title').hide();
        echart10.clear();
        return false;
    } else {
        $('.grand .no-data').hide();
        $('.grand .axisxy-title').show();
    }
    var areaName = [], realCourseCnt = [], planCourseCnt = [], CourseRate = [], maxCount = [];
    var fullAreaName = [];
    if (data) {
        for (var i = 0; i < data.length; i++) {
            if ('baseArea' == type) {
                areaName.push(strEllipsis(data[i].areaName, 8));
                fullAreaName.push(data[i].areaName);
            } else if ('teacher' == type) {
                areaName.push(strEllipsis(data[i].teacherUserName, 8));
                fullAreaName.push(data[i].teacherUserName);
            }

            realCourseCnt.push(data[i].realCourseCnt);
            planCourseCnt.push(data[i].planCourseCnt);
            CourseRate.push(( '(' + (data[i].realCourseCnt * 100 / data[i].planCourseCnt).toFixed(0)) + '%)');
        }
    }
    var maxPlanCourseCnt = Math.max.apply(null, planCourseCnt);
    var maxRealCourseCnt = Math.max.apply(null, realCourseCnt);
    var maxCourseCnt = Math.max(maxPlanCourseCnt, maxRealCourseCnt);
    $.each(data, function (i, d) {
        maxCount.push(maxCourseCnt);
    });
    option10 = {
        title: {
            text: '计划开课',
            left: '70',
            bottom: '-11',
            textStyle:{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '12',
                fontfamily: 'PingFangMedium',
                fontWeight:'light'
            }

        },
        grid: {
            left: '29',
            top: '20',
            right: '28',
            bottom: '6',
            containLabel: true
        },
        tooltip: {
            show: "true",
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'none' // 默认为直线，可选为：'line' | 'shadow'
            },
            transitionDuration: 0,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderColor: '#535b69',
            borderRadius: 8,
            borderWidth: 0,
            padding: [5, 10],
            formatter: function (param) {
                var html = fullAreaName[param[1].dataIndex] + '<br/>';
                html += '实际开课：' + param[0].value + '<br/>';
                html += '计划开课：' + planCourseCnt[param[1].dataIndex] + '<br/>';
                html += '开课占比：' + param[1].axisValue;
                return html;
            }
        },
        xAxis: {
            type: 'value',
            axisTick: {show: false},
            max: maxCourseCnt,
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#90979c'
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#1bb9f9'
                    }
                },
                axisLabel: {
                    fontSize: '16',
                    fontFamily: 'PingFangMedium',
                },
                data: areaName,
                offset: 57
            }, {
                type: 'category',
                axisTick: {show: false},
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#7e9bc6'
                    }
                },
                axisLabel: {
                    fontSize: '14'
                },
                position: 'left',
                offset: 5,
                data: CourseRate,
                zLevel: '2'
            }, {
                type: 'category',
                axisTick: {show: false},
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#7e9bc6'
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#fff',
                    interval: '0',
                    fontSize: '24',
                    fontFamily: 'myFirstFont'
                },
                position: 'right',
                offset: 10,
                data: realCourseCnt,
                zLevel: '3'
            }
        ],
        series: [
            {
                name: '计划开课',
                type: 'bar',
                yAxisIndex: 1,
                barWidth: '12',
                itemStyle: {
                    normal: {
                        show: true,
                        color: '#09152a',
                        borderType: 'solid',
                        barBorderRadius: 50,
                        borderWidth: 1,
                        borderColor: '#61738c'
                    }
                },
                barGap: '0%',
                barCategoryGap: '20%',
                data: planCourseCnt
            },
            {
                name: '实际开课',
                type: 'bar',
                // yAxisIndex: 2,
                barWidth: '6',
                label: {
                    normal: {
                        show: false,
                        color: '#fff',
                        position: [320, -8],
                        fontSize: '24',
                        fontFamily: 'myFirstFont'
                    }
                },
                itemStyle: {
                    normal: {
                        show: true,
                        color: '#1bb2f9',
                        barBorderRadius: 50,
                        borderWidth: 0,
                        borderColor: '#333'
                    }
                },
                barGap: '0%',
                barCategoryGap: '20%',
                data: realCourseCnt,
                zLevel: '2'
            }
        ]
    };
    echart10.setOption(option10);
}