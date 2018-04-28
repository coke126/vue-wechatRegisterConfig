elc.defaultValue = {};
elc.defaultValue.enumValue = "-";

var portal = {};
portal.url = "/portal/";

var timestamp = new Date().getTime();
// 全局方法 原global.js
$(function () {
    featureSupportCheck();

    $(document).on('keydown', function (e) {
        if (e.keyCode == 116) {
            e.keyCode = 0;
            e.cancelBubble = true;
            return false;
        }
    });

    if (parent.location.search.indexOf('underDev') !== -1) {
        $('.underDev').removeClass('underDev');
    }
});

function featureSupportCheck() {
    var storage = window.localStorage;
    if (!storage) {
        alert("您的浏览器版本不支持系统登录, 请更新到最新版本或使用其他浏览器, 推荐使用 Chrome 或 Firefox");
    } else {
        var elcData = storage.getItem("elc.user");
        if (null !== elcData && elcData.length > 0) {
            var data = JSON.parse(elcData);
            var userName = data.userName;
            $("#userName").val(userName);
        }
    }
}

function getUserId() {
    return localStorage.getItem("elc.user.id");
}

function getLoginName() {
    return localStorage.getItem("elc.user.loginName");
}

function getUserName() {
    return localStorage.getItem("elc.user.name");
}

/**
 * 序列化表单内容
 * @param form 表单DOM对象
 * @returns 按照表单结构组织的对象
 */
function objectifyForm(form) {
    var formArray = $(form).serializeArray();
    var returnArray = {};
    var repeatName;
    for (var i = 0; i < formArray.length; i++) {
        if (formArray[i].name == name) {
            returnArray[formArray[i - 1]['name']] += '&' + [formArray[i]['value']];
            name = formArray[i].name;
        } else {
            returnArray[formArray[i]['name']] = formArray[i]['value'];
            name = formArray[i].name;
        }
    }
    for (a in returnArray) {
        if (returnArray[a].indexOf('&') !== -1) {
            returnArray[a] = returnArray[a].split("&");
        }
    }
    return returnArray;
}

// BootstrapTable应用
if (jQuery.fn.bootstrapTable) {
    jQuery.fn.bootstrapTable.defaults.striped = true;
    jQuery.fn.bootstrapTable.defaults.cache = false;
    jQuery.fn.bootstrapTable.defaults.sortOrder = "DESC";
    jQuery.fn.bootstrapTable.defaults.sidePagination = "server";
    jQuery.fn.bootstrapTable.defaults.pagination = true;
    jQuery.fn.bootstrapTable.defaults.showColumns = true;
    jQuery.fn.bootstrapTable.defaults.showRefresh = true;
    jQuery.fn.bootstrapTable.defaults.clickToSelect = false;
    jQuery.fn.bootstrapTable.defaults.uniqueId = "id";
    jQuery.fn.bootstrapTable.defaults.responseHandler = function (res) {
        res.rows = res.data.records;
        res.total = res.data.total;
        return res;
    };
}

function searchPrintIndex(tableEle, attrName) {
    var index = tableEle.find('th[data-field=' + attrName + ']').index();
    if (index == -1) index = 0;
    return index;
}

var defaultBootstrapTableParam = {
    striped: true,                      //是否显示行间隔色
    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性
    sortOrder: "DESC",                   //排序方式
    sidePagination: "server",           //分页方式：client客户端分页，server服务端分页
    pagination: true,                   //是否显示分页（*）
    showColumns: true,                  //是否显示所有的列
    showRefresh: true,                  //是否显示刷新按钮
    clickToSelect: false,                //是否启用点击选中行
    uniqueId: "id",                     //每一行的唯一标识，一般为主键列
    responseHandler: function (res) {
        res.rows = res.data.records;
        res.total = res.data.total;
        return res;
    }
};

function getDefaultBTParam() {
    return jQuery.extend({}, defaultBootstrapTableParam);
}

// 序号
function indexTag(value, row, index) {
    return index + 1;
}

// 值回显为中文
function enumToValue(type, value) {
    if (!value || !type) {
        return elc.defaultValue.enumValue;
    }
    var enumItem = type[value];
    if (!enumItem) {
        return elc.defaultValue.enumValue;
    }
    return enumItem.LABEL;
}

/**
 * 根据类型传值 返回观众的类型描述
 */
function typeFormater(value, row, index) {
    return enumToValue(elc.enums.visitorType, value);
}

/**
 * 根据状态传值 返回观众的状态描述
 */
function statusFormater(value, row, index) {
    var tagObj = {
        'INITIAL': 'primary',
        'FILLED': 'primary',
        'VERIFIED': 'success',
        'VERIFY_FAIL': 'success',
        'AUDIT_PASS': 'success',
        'INVALID': 'danger',
        'REFUSE': 'danger'
    };
    return "<span class='text-" + tagObj[value] + "'>" + elc.enums.visitorStatus[value].LABEL + "</span>";
}

// 出入口手持终端的类型
var terminalType = {
    ENTRANCE: {VALUE: "ENTRANCE", LABEL: "入口", DESC: "入口终端"},
    EXIT: {VALUE: "EXIT", LABEL: "出口", DESC: "出口终端"},
    PATROL: {VALUE: "PATROL", LABEL: "巡查", DESC: "巡查终端, 可能赋予作废证件的功能"}
};

//出入口手持终端状态
var terminalStatus = {
    INVALID: {VALUE: "INVALID", LABEL: "作废", DESC: "不允许终端登录"},
    VALID: {VALUE: "VALID", LABEL: "启用", DESC: "该终端可以向服务器发送指令"}
};

// 以出入口手持终端的类型 返回类型描述
function terminalTypeFormater(value, row, index) {
    return enumToValue(terminalType, value);
}

// 以出入口手持终端的状态 返回状态描述
function terminalStatusFormater(value, row, index) {
    return enumToValue(terminalStatus, value);
}

// 服务台人员状态
var userStatus = {
    VALID: {VALUE: "VALID", LABEL: "有效", DESC: "身份可以使用"},
    INVALID: {VALUE: "INVALID", LABEL: "无效", DESC: "停止使用"},
    DELETE: {VALUE: "DELETE", LABEL: "废除", DESC: "禁止使用"}
};

// 服务台人员状态，返回状态描述
function userStatusFormater(value, row, index) {
    return enumToValue(userStatus, value);
}

function actionFormater(value, row, index) {
    if (value === 'ENTER') {
        return "入场"
    }
    if (value === "LEAVE") {
        return "出场"
    }
}

function resultFormater(value, row, index) {
    if (value === 'SUCCESS') {
        return "通过"
    }
    if (value === "FAIL") {
        return "拒绝"
    }
    if (value === "WARNING") {
        return "警告"
    }
}

//出入口状态枚举
var entranceStatus = {
    INVALID: {VALUE: "INVALID", LABEL: "禁用", DESC: "禁止使用"},
    VALID: {VALUE: "VALID", LABEL: "启用", DESC: "使用中"},
    BREAKDOWN: {VALUE: "BREAKDOWN", LABEL: "损坏", DESC: "已损坏"},
    OUT_OF_SYNC: {VALUE: "OUT_OF_SYNC", LABEL: "失联", DESC: "不同步"}
};

function entranceStatusFormater(value, row, index) {
    return enumToValue(entranceStatus, value);
}

var exhibitionOpenStatus = {
    OPEN: {KEY: 1, VALUE: "OPEN", LABEL: "开启", DESC: "启用"},
    CLOSE: {KEY: 2, VALUE: "CLOSE", LABEL: "关闭", DESC: "关闭"}
};

var boothStatus = {
    VALID: {VALUE: "VALID", LABEL: "正常", KEY: 1},
    INVALID: {VALUE: "INVALID", LABEL: "失效", KEY: 2}
};

function ehixbitionOpenStatus(value, row, index) {
    if (value === exhibitionOpenStatus.OPEN.VALUE) {
        return exhibitionOpenStatus.OPEN.LABEL;
    }
    if (value === exhibitionOpenStatus.CLOSE.VALUE) {
        return exhibitionOpenStatus.CLOSE.LABEL;
    }
}

var identityActive = {
    Yes: {KEY: 0, VALUE: "Yes", LABEL: "激活", DESC: "微信登记后,账号直接启用状态,生成通行码,身份已验证"},
    No: {KEY: 1, VALUE: "No", LABEL: "不激活", DESC: "微信登记后,账号不直接启用状态,生成登记码,信息已登记"}
};

var auditStatus = {
    Yes: {KEY: 0, VALUE: "Yes", LABEL: "已通过", DESC: "申请观众列表全部已通过"},
    No: {KEY: 1, VALUE: "No", LABEL: "审核中", DESC: "申请观众列表尚在审核中"}
};

function identityActiveFmt(value, row, index) {
    return enumToValue(identityActive, value);
}

function auditStatusFmt(value, row, index) {
    return enumToValue(auditStatus, value);
}

function visitorSourceFMT(value, row, index) {
    return enumToValue(elc.enums.visitorSource, value);
}

var smsType = {
    REGISTER_SUCCESS: {VALUE: "REGISTER_SUCCESS", KEY: 1, LABEL: "登记成功", DESC: "通知用户登记成功"},
    VERIFY_CODE: {VALUE: "VERIFY_CODE", KEY: 2, LABEL: "验证码", DESC: "发送验证码给用户"},
    WEB_LINK: {VALUE: "WEB_LINK", KEY: 4, LABEL: "登记激活", DESC: "激活证件后发送 URL 给用户"},
    REQUEST_DONE: {VALUE: "REQUEST_DONE", KEY: 5, LABEL: "团体登记完成", DESC: "通知登记人登记整体情况"},
    BEEN_REQUESTED: {VALUE: "BEEN_REQUESTED", KEY: 6, LABEL: "通知被代理人", DESC: "通知被代理人登记完成"},
    REQUEST_ALL_REJECT: {VALUE: "REQUEST_ALL_REJECT", KEY: 7, LABEL: "团体登记全部不通过", DESC: "通知登记人团体登记全部不通过"},
    AUDIT_DONE: {VALUE: "AUDIT_DONE", KEY: 8, LABEL: "审核完成", DESC: "审核完成通知观众"}
};

function smsTypeFMT(value, row, index) {
    return enumToValue(smsType, value);
}

var mergeType = {
    HISTORY: {KEY: 1, VALUE: "HISTORY", LABEL: "往届观众", DESC: "以往展会登记过的观众"},
    SPECIAL_GUEST: {KEY: 2, VALUE: "SPECIAL_GUEST", LABEL: "特邀观众", DESC: "特殊的渠道邀请参展的观众"}
};

function mergeTypeFmt(value, row, index) {
    return enumToValue(mergeType, value);
}

var attachmentType = {
	IDENTITY_CARD:{KEY:1, VALUE:"IDENTITY_CARD", LABEL:"身份证", DESC:"身份证图片"},
    BUSINESS_CARD:{KEY:2, VALUE:"BUSINESS_CARD", LABEL:"名片", DESC:"名片图片"},
    PHOTO:{KEY:3, VALUE:"PHOTO", LABEL:"照片", DESC:"照片"},
    IDENTITY_CARD_BACK:{KEY:4, VALUE:"IDENTITY_CARD_BACK", LABEL:"身份证背面", DESC:"身份证背面图片"},
    BUSINESS_CARD_BACK:{KEY:5, VALUE:"BUSINESS_CARD_BACK", LABEL:"名片背面", DESC:"名片背面图片"}
}

function attachmentTypeFmt(value, row, index){
    return enumToValue(mergeType,value);
}

//地区数据 使用时需在页面初始化getProvince()
var provinces = {};
var city = {};
var district = {};
var country = {};

function getCountry() {
    $.ajax({
        type: "get",
        url: "/data/map/country.json",
        async: false,
        success: function (e) {
            for (var key in e.country) {
                country[key] = e.country[key];
            }
        }
    });
}

function getProvince() {
    $.ajax({
        type: "get",
        url: "/data/map/province.json",
        async: false,
        success: function (e) {
            for (var key in e.province) {
                provinces[key] = e.province[key];
                getArea(key);
            }
        }
    });
}

function getArea(code) {
    $.ajax({
        type: "get",
        url: "/data/map/" + code + ".json",
        async: false,
        success: function (e) {
            for (var key in e.city) {
                city[key] = e.city[key];
            }
            for (var key in e.district) {
                var districts = e.district[key];
                for (var tkey in districts) {
                    district[tkey] = districts[tkey];
                }
            }
        }
    });
}

function getCityValue(provinceItem) {
    $.ajax({
        type: "get",
        url: "/data/map/" + provinceItem + ".json",
        async: false,
        success: function (e) {
            for (var key in e.city) {
                city[key] = e.city[key];
            }
            for (var key in e.district) {
                var districts = e.district[key];
                for (var tkey in districts) {
                    district[tkey] = districts[tkey];
                }
            }
        }
    });
}

try { toastr.options.positionClass = "toast-top-right" } catch(e){ }

//信息提示 使用时需在页面引入toastr.css及toastr.js
function successTip(msg) {
    var delay;
    if (2 === arguments.length) {
        delay = arguments[1];
    } else {
        delay = 3000;
    }
    toastr.options.timeOut = delay;
    toastr.success(msg);
}

function errorTip(msg) {
    var delay;
    if (2 === arguments.length) {
        delay = arguments[1];
    } else {
        delay = 3000;
    }
    toastr.options.timeOut = delay;
    toastr.error(msg);
}

// 日期格式化为 YYYY-MM-DD HH:MM:SS”
function getBeforeDate(n) {
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    if (day <= n) {
        if (mon > 1) {
            mon = mon - 1;
        }
        else {
            year = year - 1;
            mon = 12;
        }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day) + ' ' + (hour < 10 ? ('0' + hour) : hour) + ':' + (minute < 10 ? ('0' + minute) : minute) + ':' + (second < 10 ? ('0' + second) : second);
    return s;
}

//获取url参
function getQueryString(name) {
    if (!location.search) {
        return "";
    }
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    if (!location.search.substr(1).match(reg)) {
        return "";
    }
    var value = location.search.substr(1).match(reg)[2];
    if (!value) {
        return null;
    }
    return decodeURI(value);
}

//全选全不选
function checkAll(ele) {
    $(ele).parents('table').find("input[name='print']:not([disabled])").each(function () {
        $(this).prop('checked', $(ele).is(':checked'))
    });
}
var boothData = {};
function initBoothData() {
    $.ajax({
        url: elc.api.booths.url.replace("{exhibitionId}", elc.param.exhibitionId),
        type: elc.api.booths.method,
        async: false,
        success: function (e) {
            if (e.success) {
                $.each(e.data, function(i, item) {
                    boothData[item.id] = {};
                    boothData[item.id].number = item.number;
                    boothData[item.id].company = item.company;
                    boothData[item.id].principalName = item.principal;
                    boothData[item.id].principalPhone = item.phone;
                });
            }
        }
    });
}

// 多个模态框切换时重置滚动条到当前模态框的高度，而非关闭模态框后为页面的高度
$('html').on('click', '.modal', function (e) {
    if(!$(this).hasClass('in') && $('.modal.fade.in').length) {
        $(this).on("hidden.bs.modal",function(){
            $(document.body).addClass("modal-open");
        });
    }
});

function fullColTempFn(obj) {
    var tempFn = doT.template('{{~it.text:item}}<div class="col-md-12">{{=item}}</div>{{~}}');
    return tempFn(obj);
}
function optionTempFn(obj) {
    var tempFn = doT.template('{{~it.optionArr:item}}<option value="{{=item.value}}" {{?item.attr}}{{ for (var key in item.attr) { }}{{=key}}="{{=item.attr[key]}}"{{ } }}{{?}}>{{=item.text}}</option>{{~}}');
    return tempFn(obj);
}
function linkTempFn(obj) {
    var tempFn = doT.template('{{~it.linkArr:item}}<a style="cursor: pointer" onclick="{{=item.onclick}}" data-toggle="{{=item.toggle}}" data-target="{{=item.target}}">{{=item.text}} </a>{{~}}');
    return tempFn(obj);
}

function updatePrinteMark(id) {
    $.ajax({
        url: elc.api.visitorUpdate.url,
        method: elc.api.visitorUpdate.method,
        contentType: elc.api.visitorUpdate.contentType,
        data: JSON.stringify({
            "id": id,
            "printed": 0
        }),
        success: function (e) {
            if (e.success) {
            }
        }
    });
}

function errorBack(){}
