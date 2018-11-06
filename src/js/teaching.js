var dataType = $('.filter-type li.active').data('type'),
    resourceDataType = $('.data-label li.active').data('type');
// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('main1'));
var myChart2 = echarts.init(document.getElementById('main2'));
var myChart3 = echarts.init(document.getElementById('main3'));
var myChart4 = echarts.init(document.getElementById('main4'));
var myChart5 = echarts.init(document.getElementById('main5'));
var myChart6 = echarts.init(document.getElementById('main6'));
// 使用刚指定的配置项和数据显示图表。
getNowFormatDate();

$(function () {
    //设置标题信息
    $('#titleContainer').html(back_ground_info['front.workspace.bigscreen.resource.area'].textContent + '大数据');

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

var viewRatioData;
var downloadRatioData;
var favoriteRatioData;
var commentRatioData;

var sourceData = [];
var resourceClasslevelData;
function onAreaChange(baseAreaId) {
    //进30日资源增加量
    resResourceAddedCountData(baseAreaId);
    //资源使用情况(资源+评论+收藏量)
    resResourceCountData(baseAreaId);
    //按月统计资源上传量
    resourceMonthCountData(baseAreaId);
    //资源上传量比例图
    resourceRatioTypeData2(baseAreaId);
    // 资源按学科分类
    resourceSubjectResCountData(baseAreaId);
    // 资源区域统计
    resourceAreaCountData(baseAreaId);
    //学校排行
    schoolRank(baseAreaId);

    // 资源使用情况-比例图-浏览量
    $.get(BACK_ROOT + '/bigscreen/resource/getresourceviewcountdata', {baseAreaId: baseAreaId}).done(function (data) {
        viewRatioData = data.result;

        if ($('.data-label li.active').data('type') == 1) {
            resourceRatioTypeData(viewRatioData, '浏览');
        }
    });

    // 资源使用情况-比例图-下载量
    $.get(BACK_ROOT + '/bigscreen/resource/getresourcedownloadcountdata', {baseAreaId: baseAreaId}).done(function (data) {
        downloadRatioData = data.result;

        if ($('.data-label li.active').data('type') == 2) {
            resourceRatioTypeData(downloadRatioData, '下载');
        }
    });

    // 资源使用情况-比例图-下载量
    $.get(BACK_ROOT + '/bigscreen/resource/getresourcefavoritecountdata', {baseAreaId: baseAreaId}).done(function (data) {
        favoriteRatioData = data.result;

        if ($('.data-label li.active').data('type') == 3) {
            resourceRatioTypeData(favoriteRatioData, '收藏');
        }
    });

    // 资源使用情况-比例图-下载量
    $.get(BACK_ROOT + '/bigscreen/resource/getresourcecommentcountdata', {baseAreaId: baseAreaId}).done(function (data) {
        commentRatioData = data.result;

        if ($('.data-label li.active').data('type') == 4) {
            resourceRatioTypeData(commentRatioData, '评论');
        }
    });

    //资源年级分布
    $.get(BACK_ROOT + '/bigscreen/resource/getresourceclasslevelrescountdata.do', {baseAreaId: baseAreaId}).done(function (data) {
        resourceClasslevelData = data.result;

        if ($('.filter-type li.active').data('type') == 1) {
            resourceUrl(resourceClasslevelData);
        }
    });

    //资源来源
    $.get(BACK_ROOT + '/bigscreen/resource/getresourcesourcecountdata.do', {baseAreaId: baseAreaId}).done(function (data) {
        data = data.result;
        sourceData = [];
        sourceData.push({'sourceName': '本级上传', 'cnt': data.uploadCount});
        sourceData.push({'sourceName': '上级下发', 'cnt': data.pushCount});
        sourceData.push({'sourceName': '下级推荐', 'cnt': data.recommendCount});

        if ($('.filter-type li.active').data('type') == 2) {
            resourceUrl(sourceData);
        }
    });

}

/*-----------------------------------------------资源使用情况数据请求------------------------------------------*/
function resResourceAddedCountData(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/resource/getresresourceaddedcountdata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result;
        {
            var html = '';
            html += '<li><p class="data-count">' + data.resAddCount + '</p><span class="data-name">近30日资源增加量</span></li>';
            html += '<li><p class="data-count">' + data.commentAddCount + '</p><span class="data-name">近30日评论量</span></li>';
            html += '<li><p class="data-count">' + data.favoriteAddCount + '</p><span class="data-name">近30日收藏量</span></li>';
            $('.com-screen-content .use-data').html(html);
        }
        {
            var html2 = '';
            activeUserCnt = data.userCount.toString();
            for (var i = 0; i < activeUserCnt.length; i++) {
                html2 += '<li>' + activeUserCnt[i] + '</li>';
            }

            $('.re-all-data.two').html(html2)
        }
    });
}

function resResourceCountData(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/resource/getresresourcecountdata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result;
        {
            var html = '';
            resourceCnt = data.resCount.toString();
            for (var i = 0; i < resourceCnt.length; i++) {
                html += '<li>' + resourceCnt[i] + '</li>';
            }
            var html3 = '';
            html3 += '<span class="data-type-two"></span>';
            html3 += '<li><span>浏览量</span><p class="bottom">' + data.viewCount + '</p></li>';
            html3 += '<li><span>收藏量</span><p class="bottom">' + data.favoriteCount + '</p></li>';
            html3 += '<li><span>下载量</span><p class="bottom">' + data.downloadCount + '</p></li>';

            $('.re-all-data.one').html(html);
            $('.re-top-right .six-border').html(html3);
        }
    });
}

function resourceMonthCountData(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/resource/getresourcemonthcountdata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result;
        if (data.length == 0) {
            $('.resource-using .no-data').show();
            myChart1.clear();
            return false;
        }
        $('.resource-using .no-data').hide();
        var videoTypeData = [];
        var docTypeData = [];
        var imageTypeData = [];
        var audioTypeData = [];
        //查找最大的月份
        var maxMonth = 1;
        $.each(data, function (i, d) {
            if (d.month > maxMonth) {
                maxMonth = d.month;
            }
        });

        var monthData = [];
        for (var i = 0; i < maxMonth; i++) {
            monthData[i] = (i + 1) + '月';
            videoTypeData[i] = 0;
            docTypeData[i] = 0;
            imageTypeData[i] = 0;
            audioTypeData[i] = 0;
        }

        //填充数据
        $.each(data, function (i, d) {
            switch (d.resType) {
                case 'video':
                    videoTypeData[d.month - 1] = d.cnt;
                    break;
                case 'doc':
                    docTypeData[d.month - 1] = d.cnt;
                    break;
                case 'image':
                    imageTypeData[d.month - 1] = d.cnt;
                    break;
                case 'audio':
                    audioTypeData[d.month - 1] = d.cnt;
                    break;
            }
        });
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
                formatter: function (params) {
                    var res = params[0].name + '<br/>';
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>';
                    }
                    return res;
                },
                transitionDuration: 0,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderColor: '#535b69',
                borderRadius: 8,
                borderWidth: 1,
                padding: [5, 10],
                fontSize: '13',
                fontFamily: 'PingFangMedium',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        type: 'dashed',
                        color: '#ffff00'
                    }
                }
            },
            legend: {
                icon: 'circle',
                itemWidth: 6,
                itemHeight: 6,
                itemGap: 10,
                top: '12',
                right: '10',
                data: ['视频', '文档', '图片', '音频'],
                textStyle: {
                    fontSize: 12,
                    color: '#a0a8b9'
                }
            },
            grid: {
                top: '48',
                left: '23',
                right: '40',
                bottom:'35',
                containLabel: true,
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    interval: 0,
                    show: true,
                    inside: false,
                    margin: 2,
                    fontSize: '12',
                    fontFamily: 'PingFangMedium',
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#a0a8b9'
                    }
                },
                axisTick: {
                    show: false
                },
                data: monthData,
                offset: 8
            }],
            yAxis: [{
                type: 'value',
                position:'left',
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#a0a8b9'
                    }
                },
                offset: 5,
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: '12',
                        fontFamily: 'PingFangMedium'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#2b3646'
                    }
                },
                axisTick: {
                    show: false
                }
            }, {
                    type: 'value',
                    position:'right',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#a0a8b9'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: '12',
                            fontFamily: 'PingFangMedium'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#2b3646'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                }],
            series: [{
                name: '视频',
                type: 'line',
                smooth: true,
                showSymbol: false,
                // yAxisIndex:1,
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
                        color: '#1cc840'
                    }
                },
                data: videoTypeData
            }, {
                name: '文档',
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
                        color: '#43bbfb'
                    }
                },
                data: docTypeData
            }, {
                name: '图片',
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
                        color: '#eb5690'
                    }
                },
                data: imageTypeData
            }, {
                name: '音频',
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
                        color: '#fe9c43'
                    }
                },
                data: audioTypeData
            }]
        };
        myChart1.setOption(option1);
    });
}

function resourceRatioTypeData2(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/resource/getresourcerescountdata', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result;
        var allCount = 0;
        var videoTypeData;
        var docTypeData;
        var imageTypeData;
        var audioTypeData;
        var ratio;
        $.each(data, function (i, d) {
            allCount += data[i].cnt;
        });

        $.each(data, function (i, d) {
            ratio = (d.cnt * 100 / allCount).toFixed(0);

            if (d.resType == 'video') {
                videoTypeData = ratio;
            } else if (d.resType == 'doc') {
                docTypeData = ratio;
            } else if (d.resType == 'image') {
                imageTypeData = ratio;
            } else if (d.resType == 'audio') {
                audioTypeData = ratio;
            }
        });

        var html = '';
        html += '<tr><td>视频：</td><td>' + (videoTypeData ? videoTypeData : 0) + '%</td></tr>';
        html += '<tr><td>文档：</td><td>' + (docTypeData ? docTypeData : 0) + '%</td></tr>';
        html += '<tr><td>图片：</td><td>' + (imageTypeData ? imageTypeData : 0) + '%</td></tr>';
        html += '<tr><td>音频：</td><td>' + (audioTypeData ? audioTypeData : 0) + '%</td></tr>';
        $('.inner-pie table').html(html);
    });
}

function resourceRatioTypeData(data, type) {
    var resourceCountData = [], resourceCountData2 = [];
    var allCount = 0;
    var resType;
    var noData=0;
    if (data && data.length > 0) {
        $('.resource-using').removeClass('noData');
        $.each(data, function (i, d) {
            if (d.resType == 'video') {
                resType = '视频';
            } else if (d.resType == 'doc') {
                resType = '文档';
            } else if (d.resType == 'image') {
                resType = '图片';
            } else if (d.resType == 'audio') {
                resType = '音频';
            }
            allCount += data[i].cnt;
            resourceCountData.push({value: d.cnt, name: resType});
        });
    }else{
       $('.resource-using').addClass('noData');
    }

    var scale = 1;
    var borderColor = '#021421';

    for (var i = 0; i < resourceCountData.length; i++) {
        var Values = (resourceCountData[i].value / allCount * 100).toFixed(0);
        resourceCountData2.push({
            value: Values,
            name: resourceCountData[i].name,
            resCount: resourceCountData[i].value,
            type: type,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#1ad1fc'
                    }, {
                        offset: 1,
                        color: '#1d69f1'
                    }])
                }
            }
        });
    }

    var blank = 30;
    resourceCountData2.push({
        value: blank,
        name: '123',
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                color: 'none',
                borderColor: 'none'
            }
        }
    });
    $('.data-sum-title').html('总量');
    $('.data-sum').html(allCount);
    option2 = {
        tooltip: {
            show: false,
            trigger: 'item',
            transitionDuration: 0,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderColor: '#535b69',
            borderRadius: 8,
            borderWidth: 1,
            fontSize: '13',
            fontFamily: 'PingFangMedium',
            padding: [5, 10],
            formatter: function (param) {
                var html = param.data.name + '<br/>';
                html += param.data.type + '量：' + param.data.resCount + '<br/>';
                html += param.data.type + '占比：' + param.data.value + '%<br/>';
                return html;
            }
        },
        title: {
            text: '',
            textStyle: {
                color: '#fff',
                fontSize: '18',
                fontWeight: '400'
            },
            x: 'center',
            y: 'center'
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                startAngle: -133,
                hoverAnimation: false,
                avoidLabelOverlap: false,
                radius: ['71%', '80%'],
                center: ['50%', '45%'],
                data: resourceCountData2,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                    },
                },
                itemStyle: {
                    normal: {
                        borderColor: borderColor,
                        borderWidth: 4 * scale
                    },
                    emphasis: {
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        borderColor: borderColor,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: '#ff9d41'
                        }, {
                            offset: 1,
                            color: '#e9702c'
                        }]),
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
    };

    myChart2.setOption(option2);
    myChart2.on('mouseout', function (params) {
        $('.data-sum-title').html('总量');
        $('.data-sum').html(allCount);
    });
    myChart2.on('mouseover', function (params) {
        var percent=(params.percent).toFixed(0)+'%';
        $('.data-sum-title').html(params.name);
        $('.data-sum').html(percent);
    });
}

// 资源按学科分类
function resourceSubjectResCountData(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/resource/getresourcesubjectrescountdata', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result, subjectName = [];
        var allCount = 0;
        if (data) {
            for (var i = 0; i < data.length; i++) {
                subjectName.push({name: data[i].subjectName, value: data[i].cnt, selected: true});
                allCount += data[i].cnt;
            }
        }
        option3 = {
            color: ['#4bc965', '#e0b455', '#eb4d4e', '#9c90ff', '#2774ba', '#2ecec4', '#abb659', '2a86aa'],
            tooltip: {
                trigger: 'item',
                transitionDuration: 0,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderColor: '#535b69',
                borderRadius: 8,
                borderWidth: 1,
                padding: [5, 10],
                formatter: function (p) {
                    var html = p.data.name + '<br/>';
                    html += '资源数量：' + p.data.value;
                    return html;
                }
            },
            series: [
                {    // 饼图的属性配置
                    name: 'outPie',
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: ['76.5%', '75%'],
                    hoverAnimation: false,
                    // avoidLabelOverlap: false,
                    startAngle: 20,
                    zlevel: 0,
                    itemStyle: {
                        normal: {
                            borderColor: "#192342",
                            borderWidth: 2
                        },
                        emphasis: {
                            shadowBlur: 2,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.8)'
                        }
                    },
                    // 图形样式
                    label: {
                        normal: {
                            show: true,
                            formatter: function (param) {
                                return param.name + '(' + param.value + ')';
                            },
                            position: 'top',
                            fontSize: '13',
                            fontFamily: 'PingFangMedium'
                        },
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.name + '(' + param.value + ')';
                            },
                            textStyle: {
                                fontSize: '17',
                                fontFamily: 'PingFangMedium'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: subjectName
                }
            ]
        };
        myChart3.setOption(option3);
    });
}

//资源类型不同调用不同地址resouceTypeUrl
function urlType() {
    resourceDataType = $('.data-label li.active').data('type');
    if (resourceDataType == 1) {
        resourceRatioTypeData(viewRatioData, '浏览');
    } else if (resourceDataType == 2) {
        resourceRatioTypeData(downloadRatioData, '下载');
    } else if (resourceDataType == 3) {
        resourceRatioTypeData(favoriteRatioData, '收藏');
    } else if (resourceDataType == 4) {
        resourceRatioTypeData(commentRatioData, '评论');
    }
}
/*-----------------------------------------------资源统计图数据请求------------------------------------------*/
// 资源区域统计
function resourceAreaCountData(baseAreaId) {
    myChart4.clear();
    var hasChildArea = true;
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

    var uploadCnt = [];
    var viewCnt = [];
    var names = [];
    if (hasChildArea) {
        $.ajax({
            url: BACK_ROOT + '/bigscreen/resource/getresourceareacountdata.do',
            data: {baseAreaId: baseAreaId},
            async: false,
            success: function (data) {
                $.each(data.result, function (i, d) {
                    uploadCnt.push(d.resCnt);
                    viewCnt.push(d.viewCnt);
                    names.push(d.areaName);
                });
            }
        });
    } else {
        $.ajax({
            url: BACK_ROOT + '/bigscreen/resource/getresourceschoolrescountdata.do',
            data: {baseAreaId: baseAreaId, isSort: false, limit: 20},
            async: false,
            success: function (data) {
                $.each(data.result, function (i, d) {
                    uploadCnt.push(d.resCnt);
                    viewCnt.push(d.viewCnt);
                    names.push(d.schoolName);
                });
            }
        });
    }

    if (names.length == 0) {
        $('.resource-count-pic .no-data').show();
        $('.resource-count-pic .axisxy-title').hide();
        myChart4.clear();
        return false;
    } else {
        $('.resource-count-pic .no-data').hide();
        $('.resource-count-pic .axisxy-title').show();
    }

    var dataZoom = [{show: false},
        {
            type: "inside",
            show: false,
            zoomLock: true,
        }];

    if (names.length > 12) {
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
    option4 = {
        dataZoom: dataZoom,
        "tooltip": {
            "trigger": "axis",
            transitionDuration: 0,
            fontSize: '13',
            fontFamily: 'PingFangMedium',
            backgroundColor: 'transparent',
            position: function (p) {
                return [p[0], p[1] - 60];
            },
            showContent: true,
            formatter: function (params, ticket, callback) {
                var res = '<div class="com-promp">'+names[params[0].dataIndex] + '<br/>';
                for (var i = 0, l = params.length; i < l; i++) {
                    res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>';
                }
                return res+'</div>';
            },
            axisPointer: {
                type: 'line',
                lineStyle: {
                    type: 'dashed',
                    color: '#ffff00'
                }
            }
        },
        "grid": {
            "borderWidth": 0,
            "top": '100',
            "left": '10',
            "right": '10',
            "bottom": '17',
            containLabel: true,
            textStyle: {
                color: "#fff"
            }
        },
        "legend": {
            right: '24',
            top: "24",
            itemWidth: 8,
            itemHeight: 12,
            itemGap: 20,
            textStyle: {
                color: '#fff',
                fontSize: '12'
            },
            "data": ['上传总量', '浏览量']
        },
        "calculable": true,
        xAxis: [{
            'type': 'category',
            "axisTick": {
                "show": false
            },
            "axisLine": {
                "show": false,
                lineStyle: {
                    color: '#868c96'
                }
            },
            "axisLabel": {
                "interval": 0,
                fontSize: '12',
                fontFamily: 'PingFangMedium'
            },
            "splitArea": {
                "show": false
            },
            'data': names,
            splitLine: {
                show: false
            }
        }],
        "yAxis": [
            {
                "type": "value",
                offset: -14,
                "splitLine": {
                    "show": false
                },
                "axisLine": {
                    "show": false,
                    lineStyle: {
                        color: '#868c96'
                    }
                },
                "axisTick": {
                    "show": false
                },
                "axisLabel": {
                    "interval": 0,
                    fontSize: '12',
                    fontFamily: 'PingFangMedium'

                },
                "splitArea": {
                    "show": false
                }
            }, {
                "type": "value",
                offset: -20,
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
            }],

        "series": [
            {
                "name": "上传总量",
                "type": "bar",
                "barMaxWidth": 10,
                "barGap": "10%",
                hoverAnimation: false,
                itemStyle: {//图形样式
                    normal: {
                        "color": '#4a4df0'
                    },
                },
                yAxisIndex: 1,
                "data": uploadCnt
            }, {
                "name": "浏览量",
                type: 'line',
                yAxisIndex: 0,
                hoverAnimation: false,
                // smooth: true,
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 8,
                "itemStyle": {
                    "normal": {
                        "color": '#dd8c25',
                        "barBorderRadius": 2,
                        "label": {
                            "show": false,
                            "position": "top",
                            formatter: function (p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    },
                    emphasis:{
                        "borderColor": "rgba(208,234,253, 0.3)",
                        "borderWidth":9,    
                    },
                },
                "data": viewCnt
            }
        ]
    };
    myChart4.setOption(option4);
}

function resourceUrl(data) {
    var indicatorData = [], valueData = [];
    var Tpl = '';
    if (data.length != 0) {
        $('.resource-origin .no-data').hide();
        for (var i = 0; i < data.length; i++) {
            valueData.push(data[i].cnt);
        }
        var max = Math.max.apply(null, valueData);
        max = max + 20;
        var data1 = (max / 4).toFixed(0);
        var data2 = (max / 2).toFixed(0);
        var data3 = (max * 3 / 4).toFixed(0);
        var data4 = max;
        Tpl = `<span class="rangeone">${data1}</span>
                <span class="rangetwo">${data2}</span>
                <span class="rangethr">${data3}</span>
                <span class="rangefou">${data4}</span>`;
        for (var i = 0; i < data.length; i++) {
            if (data[i].classlevelName == null) {
                indicatorData.push({name: data[i].sourceName, max: max})
            } else {
                indicatorData.push({name: data[i].classlevelName, max: max});
            }
        }
        option5 = {
            tooltip: {
                transitionDuration: 0,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderColor: '#535b69',
                borderRadius: 8,
                borderWidth: 1,
                padding: [5, 10],
                fontSize: '12',
                fontFamily: 'PingFangMedium',
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
                indicator: indicatorData,
                center: ['50%', '50%'],
                radius: 170,
                splitArea: {
                    areaStyle: {
                        color: ['rgba(11,35,74,0.7)', 'rgba(11,32,67,0.6)', 'rgba(11,30,62,0.4)', 'rgba(14,29,63,0.2)'],
                        shadowColor: 'rgba(11,32,67,0.6)',
                        shadowBlur: 1,
                    },

                },
                axisLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#132f4c',
                        textStyle: {
                            color: '#19a3de'
                        }
                    }
                },
                axisLabel: {
                    color: '#19a3de',
                    fontSize: '16',
                    fontFamily: 'PingFangMedium',
                },
                splitLine: {
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        },
                        shadowColor: 'rgba(12,30,64,1)',
                        shadowBlur: 1,
                        color: 'rgba(11,37,78,1)'
                    }
                }
            },
            series:[{
                name: '资源来源',
                type: 'radar',
                "symbol": "circle",
                "symbolSize": 8,
                "itemStyle": {
                    "normal": {
                        color: 'rgba(208,234,253, 1)',
                        "borderColor": "transparent",
                        "borderWidth": 10
                    }
                },
                "emphasis": {
                    "itemStyle": {
                        "normal": {
                            color: 'rgba(208,234,253, 1)',
                            "borderColor": "rgba(208,234,253, 0.4)",
                            "borderWidth": 10
                        }
                    },
                },
                "areaStyle": {
                    "normal": {
                        "color": "rgba(19, 173, 255, 0.3)"
                    }
                },
                "lineStyle": {
                    "normal": {
                        "color": "rgba(19, 173, 255, 1)",
                        "width": 2,
                        "type": "solid"
                    }
                },
                data: [{value: valueData}]
            }]
        };
        myChart5.setOption(option5, true);
    } else {
        $('.resource-origin .no-data').show();
        myChart5.clear();
    }
    $('.com-screen-content .dataRange').html(Tpl);
}
/*-----------------------------------------------学校排行数据请求------------------------------------------*/
function schoolRank(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/resource/getresourceschoolrescountdata.do', {baseAreaId: baseAreaId, isSort: true, limit: 10}).done(function (data) {
        var data = data.result, schoolName = [], resourceCnt = [], total = 0, max = 0;
        var fullSchoolNames = [];
        data.reverse();
        var maxData = [];
        if (data.length == 0) {
            $('.school-rank .no-data').show();
            $('.school-rank .axisxy-title').hide();
            myChart6.clear();
            return false;
        } else {
            $('.school-rank .no-data').hide();
            $('.school-rank .axisxy-title').show();
        }

        for (var i = 0; i < data.length; i++) {
            schoolName.push(strEllipsis(data[i].schoolName, 8));
            fullSchoolNames.push(data[i].schoolName);
            resourceCnt.push(data[i].resCnt);
        }
        max = Math.max.apply(null, resourceCnt) * 1.2;
        for (var i = 0; i < data.length; i++) {
            maxData[i] = max;
        }

        option6 = {
            grid: {
                left: '40',
                top: '-6',
                right: '40',
                bottom: '4',
                containLabel: true
            },
            "tooltip": {
                transitionDuration: 0,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderColor: '#535b69',
                borderRadius: 8,
                borderWidth: 1,
                padding: [5, 10],
                formatter: function (params, ticket, callback) {
                    if(params.seriesName=='资源量'){
                        var html = fullSchoolNames[params.dataIndex] + '<br/>';
                        html += '资源数量：' + params.value;
                        return html;
                    } else {
                        return '';
                    }
                },
            },
            xAxis: [{
                show: false
            }],
            yAxis: [{
                splitLine: {show: false},
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#1798cf'
                    }
                },
                axisLabel: {
                    fontSize: '16',
                    fontFamily: 'PingFangMedium',
                    align: 'right'
                },
                axisTick: {
                    show: false
                },
                offset: 28,
                data: schoolName
            }, {
                splitLine: {show: false},
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    fontSize: '24',
                    fontFamily: 'myFirstFont',
                    // align: 'right'
                },
                axisTick: {
                    show: false
                },
                position:'right',
                offset:15,
                data: resourceCnt
            }],
            series: [{
                name: '资源量',
                type: 'bar',
                yAxisIndex: 0,
                data: resourceCnt,
                label: {
                    normal: {
                        show: false,
                        position: 'right',
                        formatter: function (param) {
                            return param.value;
                        },
                        textStyle: {
                            color: '#fff',
                            fontSize: '16'
                        }
                    }
                },
                barWidth: 6,
                itemStyle: {
                    normal: {
                        barBorderRadius: 6,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: '#1d6bf1'
                        }, {
                            offset: 1,
                            color: '#1ad0fc'
                        }])
                    }
                },
                z: 6
            }, {
                name: 'outline',
                type: 'bar',
                yAxisIndex: 1,
                barGap: '-100%',
                data: maxData,
                barWidth: 10,
                itemStyle: {
                    normal: {
                        // color: 'red',
                        color: '#0a182e',
                        barBorderRadius: 10
                    }
                },
                z: 3,
            }, {
                name: 'outline2',
                type: 'bar',
                yAxisIndex: 1,
                barGap: '-100%',
                data: maxData,
                barWidth: 10,
                itemStyle: {
                    normal: {
                        color: "#4e6a8c",
                        // color: "green",
                        borderColor: '#4e6a8c',
                        // borderColor: 'green',
                        barBorderRadius: 12
                    }
                },
                z: 1
            }, {
                name: '内圆',
                type: 'scatter',
                hoverAnimation: false,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                yAxisIndex: 1,
                symbolSize: 14,
                itemStyle: {
                    normal: {
                        color: '#1367fb',
                        opacity: 1
                    }
                },
                z: 5
            }, {
                name: '外圆',
                type: 'scatter',
                hoverAnimation: false,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                yAxisIndex: 1,
                symbolSize: 20,
                itemStyle: {
                    normal: {
                        color: '#0a182e',
                        borderColor: '#4e6a8c',
                        opacity: 1
                    }
                },
                z: 1
            }]
        };
        myChart6.setOption(option6);
    });
}


//    资源类型点击切换
$('.data-label').on('click', 'li', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.active-data-label').html($('.canvas-pic-two .data-label li.active').html());
    urlType();
});


$('.filter-type').on('click', 'li', function () {
    $(this).addClass('active').siblings().removeClass('active');
    dataType = $(this).data('type');
    if (dataType == 1) {
        resourceUrl(resourceClasslevelData);
    } else if (dataType == 2) {
        resourceUrl(sourceData);
    }
});