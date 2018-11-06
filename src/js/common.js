/**
 * Created by codyy on 2018/4/11.
 */
//echart hover定时器
function hoverTurn(option, myChart, index) {
    var intervalVal = setInterval(function () {
        var dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
        myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: index
        });
        index = (index + 1) % dataLen;
        // 高亮当前图形
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: index
        });
        // 显示 tooltip
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
        });
    }, 2000);
    return intervalVal;
}
//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var Hour = date.getHours();       // 获取当前小时数(0-23)
    var Minute = date.getMinutes();     // 获取当前分钟数(0-59)
    var Second = date.getSeconds();     // 获取当前秒数(0-59)
    var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    var day = date.getDay();
    if (Hour < 10) {
        Hour = "0" + Hour;
    }
    if (Minute < 10) {
        Minute = "0" + Minute;
    }
    if (Second < 10) {
        Second = "0" + Second;
    }
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = '<div><p>' + year + '年' + month + '月' + strDate + '日</p><p>' + show_day[day] + '</p></div>';
    var HMS = Hour + ':' + Minute + ':' + Second;
    $('.nowTime li:nth-child(1)').html(HMS);
    $('.nowTime li:nth-child(2)').html(currentdate);
    setTimeout(getNowFormatDate, 1000);//每隔1秒重新调用一次该函数
}
//切换大屏
function bigscreenTurn() {
    var Tpl = ` <div class="screen-turn">
            <span>切换</span><i class="icon iconfont icon-shangxiajiantou1"></i>
            </div>
            <ul class="screen-list">`;
    Tpl += '<li id="classSupervisionPage"><a href="' + BACK_ROOT + '/classsupervision.html"><img src="images/courseveiw.jpg">' + back_ground_info['front.workspace.bigscreen.supervise.area'].textContent + '<i class="icon iconfont icon-duigouzhong"></i></a></li>';
    Tpl += '<li id="behaviorAnalysisPage"><a href="' + BACK_ROOT + '/behavioranalysis.html"><img src="images/coursedoing.jpg">' + back_ground_info['front.workspace.bigscreen.action.area'].textContent + '<i class="icon iconfont icon-duigouzhong"></i></a></li>';
    Tpl += '<li id="teachingResourcePage"><a href="' + BACK_ROOT + '/teachingresource.html"><img src="images/teaResource.jpg">' + back_ground_info['front.workspace.bigscreen.resource.area'].textContent + '<i class="icon iconfont icon-duigouzhong"></i></a></li>';
    Tpl += '</<ul>';

    $('.container-header').prepend(Tpl);
    $('#' + bigScreenPage).addClass('active').siblings().removeClass('active');
}
// 清除echart定时器

function clearIntervals(element, timer, option, mychart) {
    $(element).unbind('mouseenter').unbind('mouseleave');
    $(element).hover(function () {
        clearInterval(timer);
    }, function () {
        timer = hoverTurn(option, mychart, -1);
    });
}
bigscreenTurn();
$('body').on('click', '.screen-list li', function () {
    $(this).addClass('active').siblings().removeClass('active');
});
$('body').on('mouseover', '.screen-turn', function () {
    $('.screen-list').show();
});
$('body').on('mouseleave', '.screen-list', function () {
    $('.screen-list').hide();
});
function strEllipsis(str, len) {
    if(!str) {
        return '';
    }
    var r = /[^\x00-\xff]/g;
    var oldSubStr;
    var newSubStr;
    if (str.replace(r, '**').length > len) {
        oldSubStr = str.substr(0, Math.floor(len / 2));
        for (var i = Math.floor(len / 2); i < str.length; i++) {
            newSubStr = str.substr(0, i);
            if (newSubStr.replace(r, '**').length == len) {
                return newSubStr + '...';
            } else if (newSubStr.replace(r, '**').length > len) {
                return oldSubStr + '...';
            } else {
                oldSubStr = newSubStr;
            }
        }
    }
    return str;
}