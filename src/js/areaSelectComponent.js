var AreaSelect;
var scroll=null;
(function (factory) {
    AreaSelect = factory(jQuery);
})(function ($) {
    var AreaSelectComp = function (config) {
        this.config = config;
    };

    AreaSelectComp.prototype = {
        init: function () {
            var self = this;
            this.getDefaultArea();
            if (this.config.defaultAreaLevel < 4) {
                this.getAreaData(self.config.defaultBaseAreaId);
                this.bindEvents();
            }
        },
        getDefaultArea: function () {
            var self = this;
            $.ajax({
                url: self.config.areaInfoUrl,
                data: {baseAreaId: self.config.defaultBaseAreaId},
                async: false,
                success: function (data) {
                    self.config.defaultAreaCode = data.areaCode;
                    self.config.defaultAreaLevel = data.areaLevel;
                    self.config.defaultAreaName = data.areaName;

                    self.config.currentBaseAreaId = data.baseAreaId;
                    self.config.currentAreaCode = data.areaCode;
                    self.config.currentAreaLevel = data.areaLevel;
                }
            });

            if (self.config.callback) {
                self.config.callback(self.config.currentBaseAreaId, self.config.currentAreaCode, self.config.currentAreaLevel);
            }

            //选中的区域
            var html = '';
            html += '<div class="hoverPoint"></div>';
            html += '<img src="images/location.jpg" alt="">';
            html += '<span class="areaName">' + self.config.defaultAreaName + '</span>';
            html += '<div class="selectDom">';
            html += '</div>';

            this.config.container.html(html);
            if (self.config.defaultAreaLevel == 2) {
                $('.selectDom').width(320);
            } else if (self.config.defaultAreaLevel == 3) {
                $('.selectDom').width(180);
            }


        },
        getAreaData: function (id) {
            var self = this;

            $.get(self.config.url, {parentId: id}, function (data) {
                self.render(data);
            });
        },
        render: function (data) {
            data={
                "areaCode": "000000",
                "areaLevel": 1,
                "areaName": "全国",
                "baseAreaId": "1bd310655978440d953c74711adf207d"
                }
            if (!data.length) {
                this.fillSelectDom();
                return;
            }
            var self = this;

            var html = this.buildSelectDom(data, 'active');
            $('.selectDom').append(html);
            $('.nowSelect1').niceScroll({
                cursorwidth: 5,
                autohidemode: false,
                cursorcolor: '#166BA2',
                cursorborder: "1px solid #166BA2"
            });
            this.fillSelectDom();
        },
        buildSelectDom: function (data, status) {
            var html = '';
            if ('active' == status) {
                html += '<div class="select-container nowSelect">';
                html += '<div class="select-container-head validSelect">';
            } else {
                html += '<div class="select-container">';
                html += '<div class="select-container-head">';
            }
            html += '<input type="text" class="currentValue" readonly="" value="请选择">';
            html += '</div>';
            html += '<div class="select-item-container nowSelect1">';
            html += '<ul>';
            html += '<li class="select-item" data-area-id="-1" data-area-name="请选择">请选择</li>';
            $.each(data, function (i, d) {
                html += '<li class="select-item" data-area-id="' + d.baseAreaId + '" data-area-name="' + d.areaName + '" data-area-code="' + d.areaCode + '" data-area-level="' + d.areaLevel + '">' + d.areaName + '</li>';
            });
            html += '</ul>';
            html += '</div>';
            html += '</div>';
            //加载滚动条
            return html;
        },
        bindEvents: function () {
            var self = this;

            $('.hoverPoint').hover(function () {
                $('.selectDom').show();
            });

            $('body').on('click', function () {
                $('.selectDom').hide();
            });

            $('.selectDom').on('click', function (e) {
                e.stopPropagation();
            });

            $('.selectDom').on('click', '.select-container-head.validSelect', function (e) {
                $(this).parent().find('.select-item-container').show();
            });

            $('.selectDom').on('mouseleave', '.select-container', function () {
                $(this).find('.select-item-container').hide();
            });

            $('.selectDom').on('click', '.select-item', function () {
                var _this = $(this);
                //删除后面的select元素
                self.removeNextSelect(_this.parents('.select-container'));

                var baseAreaId = _this.data('area-id');
                var areaName = _this.data('area-name');
                var areaCode = _this.data('area-code');
                var areaLevel = _this.data('area-level');
                var selectedAreaName = areaName;

                //选择了请选择
                if (baseAreaId == '-1') {
                    if (_this.parents('.select-container').prevAll('.select-container').length >= 1) {
                        var selectedItem = _this.parents('.select-container').prevAll('.select-container:eq(0)').find('.select-item.selected');
                        self.config.currentBaseAreaId = selectedItem.data('area-id');
                        self.config.currentAreaCode = selectedItem.data('area-code');
                        self.config.currentAreaLevel = selectedItem.data('area-level');
                        selectedAreaName = selectedItem.data('area-name');
                    } else {
                        self.config.currentBaseAreaId = self.config.defaultBaseAreaId;
                        self.config.currentAreaCode = self.config.defaultAreaCode;
                        self.config.currentAreaLevel = self.config.defaultAreaLevel;
                        selectedAreaName = self.config.defaultAreaName;
                    }
                    self.fillSelectDom();
                } else {
                    _this.parent().find('.select-item').removeClass('selected');
                    _this.addClass('selected');

                    self.config.currentBaseAreaId = baseAreaId;
                    self.config.currentAreaCode = areaCode;
                    self.config.currentAreaLevel = areaLevel;
                    //请求下级数据
                    if (self.config.currentAreaLevel < 4) {
                        self.getAreaData(self.config.currentBaseAreaId);
                    }
                }


                //隐藏item元素
                _this.parents('.select-item-container').hide();
                _this.parents('.select-container').find('.select-container-head .currentValue').val(areaName);

                $('.areaName').html(selectedAreaName);
                //调用回调方法
                if (self.config.callback) {
                    self.config.callback(self.config.currentBaseAreaId, self.config.currentAreaCode, self.config.currentAreaLevel, selectedAreaName);
                }
            });
        },
        fillSelectDom: function () {
            var self = this;
            //获取当前选择框个数(一级区域显示三个，二级区域显示两个，三级区域显示1个)
            var selectCnt = $('.selectDom').find('.select-container').length;
            var fillSelectCnt = 4 - self.config.defaultAreaLevel - selectCnt;

            if (fillSelectCnt <= 0) {
                return;
            }

            for (var i = 0; i < fillSelectCnt; i++) {
                var html = this.buildSelectDom([]);
                $('.selectDom').append(html);
            }
        },
        removeNextSelect: function (obj) {
            $(obj).nextAll(".select-container").remove();
        }
    };
    return AreaSelectComp;
});