var elc = {};

elc.param = {};
var path_start = top.location.href.indexOf('home/');
var path_end = top.location.href.indexOf('.html');
elc.param.exhibitionId = top.location.href.slice(path_start + 5, path_end);
elc.param.surveyId = top.location.href.slice(path_start + 5, path_end) + '01';

elc.api = {};
elc.api.registerUrl = "/register/";
elc.api.portalUrl = "/portal/";
elc.api.attBaseUrl = "/attachment/";
elc.api.promotionUrl = "/promotion/";

elc.img = {};
elc.img.type = {};
elc.img.type.id = "1";
elc.img.type.bc = "2";
elc.img.type.photo = "3";
elc.img.type.idBack = "4";
elc.img.type.bcBack = "5";

elc.helper = {};
elc.helper.timer = {};
elc.helper.timer.wait = 0;

elc.message = {};
elc.message.generalError = "服务器忙，请稍后重试";

elc.countDown = {};
elc.countDown.left = 0;
elc.countDown.text = "";
elc.countDown.done = "";
elc.countDown.postFunc = null;

elc.result = {};
elc.result.ruleViolate = {};
elc.result.ruleViolate.code = "10011";

elc.wechatParam = {};

elc.expo = {};
elc.expo.title = '';
elc.expo.nameSpace = '';
elc.expo.url = {};

elc.ajax = function (obj) {
    var url = obj.apiDefinition.url;
    if (obj.pattern) {
        for (var item in obj.pattern) {
            url = obj.apiDefinition.url.replace('{' + item + '}', obj.pattern[item]);
        }
    }
    obj.defaultValue = obj.defaultValue || '';
    $.ajax({
        beforeSend: function () {
            if(obj.beforeSend){
                obj.beforeSend()
            }
        },
        url: url,
        type: obj.apiDefinition.method,
        contentType: obj.apiDefinition.contentType || false,
        data: obj.data === undefined ? "" : obj.data,
        async: obj.defaultValue.async === undefined ? true : obj.defaultValue.async,
        global: obj.defaultValue.global === undefined ? true : obj.defaultValue.global,
        success: function (e) {
            if(obj.success) {
                var successCallBack = obj.success(e);
            }

            try {
                successCallBack.successCommon()
            } catch (e) {
            }

            if (e.success) {
                if (successCallBack.successTrue) {
                    successCallBack.successTrue();
                }
            }

            if (!e.success) {
                if (successCallBack.successFalse) {
                    successCallBack.successFalse();
                }
                if (obj.defaultValue.successFalse === undefined ? true : obj.defaultValue.successFalse) {
                    try { newErrorBack('', e.errorMsg || e.errorCode, '', this); } catch (e) {}
                    if (e.errorMsg) {
                        errorTip(e.errorMsg);
                    } else {
                        errorTip(e.errorCode);
                    }
                }
            }
        },
        error: function (o, s, e) {
            //jqXHR, textStatus, errorThrown
            obj.error ? obj.error(o, s, e) : "";
            if (obj.defaultValue.error === undefined ? true : obj.defaultValue.error) {
                errorTip(elc.message.generalError);
                try { newErrorBack(o, s, e, this); } catch (e) {}
            }
        },
        complete: function () {
            if(obj.complete) {
                obj.complete();
            }
        }
    });
};

//在页面中加载custom.json后调用
function customValue(customObj) {
    elc.param.exhibitionId = customObj.config.customParamExhibitionId;
    elc.param.surveyId = customObj.config.customParamSurveyId;
    elc.expo.title = customObj.config.customExpoTitle;
    elc.expo.desc = customObj.config.customExpoDesc;
    elc.expo.nameSpace = customObj.config.customExpoNameSpace;
    elc.expo.url.logo = customObj.config.customExpoLogo ? customObj.config.customExpoLogo.indexOf('http') !== -1
        ? customObj.config.customExpoLogo
        : location.origin + customObj.config.customExpoLogo
        : location.origin + "/project/" + elc.expo.nameSpace + "/wechat/share.png";
    initWithCustomValue();
}

var initFuncs = [];

function initWithCustomValue() {
    initFuncs.sort(function (s, t) {
        var a = s.weight;
        var b = t.weight;
        return a - b
    });

    for (var i = 0; i < initFuncs.length; i++) {
        initFuncs[i]['func']();
    }
}

elc.enums = {};
elc.enums.visitorSource = {
    WECHAT: {VALUE: "WECHAT", KEY: 1, LABEL: "微信登记", DESC: "通过微信渠道登记"},
    OVERSEA: {VALUE: "OVERSEA", KEY: 2, LABEL: "海外", DESC: "通过海外版登记"},
    OVERSEA_CHINESE: {VALUE: "OVERSEA_CHINESE", KEY: 3, LABEL: "海外繁体", DESC: "通过海外繁体登记"},
    SYSTEM: {VALUE: "SYSTEM", KEY: 4, LABEL: "人工处理", DESC: "通过后台管理系统登记"},
    DESIGNER: {VALUE: "DESIGNER", KEY: 5, LABEL: "设计师", DESC: "设计师 考虑删除"},
    VIP: {VALUE: "VIP", KEY: 6, LABEL: "VIP", DESC: "VIP 考虑删除"},
    SPECIAL_GUEST: {VALUE: "SPECIAL_GUEST", KEY: 7, LABEL: "特邀嘉宾", DESC: "特邀嘉宾, 简化登记流程"},
    WECHAT_TIMELINE: {VALUE: "WECHAT_TIMELINE", KEY: 8, LABEL: "微信朋友圈", DESC: "微信朋友圈推广"},
    TOU_TIAO: {VALUE: "TOU_TIAO", KEY: 9, LABEL: "今日头条", DESC: "今日头条推广"},
    CONSTRUCT: {VALUE: "CONSTRUCT", KEY: 10, LABEL: "搭建商申请", DESC: "搭建商申请 对应类型是搭建 一般是批量"},
    FIELD: {VALUE: "FIELD", KEY: 11, LABEL: "现场登记", DESC: "现场登记"},
    FIELD_WECHAT: {VALUE: "FIELD_WECHAT", KEY: 12, LABEL: "现场微信登记", DESC: "现场使用微信进行登记  是否保留待定"},
    PROFESSIONAL: {VALUE: " PROFESSIONAL", KEY: 13, LABEL: "专业观众", DESC: "专业观众"},
    EXHIBITOR: {VALUE: "EXHIBITOR", KEY: 14, LABEL: "参展商观众", DESC: "参展商观众"},
    GROUP: {VALUE: "GROUP", KEY: 15, LABEL: "团体登记", DESC: "团体登记"},
    WECHAT_BUSINESS_CARD: {VALUE: "WECHAT_BUSINESS_CARD", KEY: 16, LABEL: "微信名片登记", DESC: "微信有名片登记 待删除"},
    WECHAT_WITHOUT_BUSINESS_CARD: {VALUE: " WECHAT_WITHOUT_BUSINESS_CARD", KEY: 17, LABEL: "微信无名片登记", DESC: "微信无名片登记"}
};
elc.enums.visitorType = {
    GENERAL: {VALUE: "GENERAL", LABEL: "观众", DESC: "公共渠道登记观众", KEY: 1},
    EXHIBITOR: {VALUE: "EXHIBITOR", LABEL: "参展商", DESC: "参加展会的展商", KEY: 2},
    STAFF: {VALUE: "STAFF", LABEL: "工作人员", DESC: "工作人员", KEY: 3},
    CONSTRUCTOR: {VALUE: "CONSTRUCTOR", LABEL: "施工人员", DESC: "施工人员", KEY: 4},
    SPONSOR: {VALUE: "SPONSOR", LABEL: "主办人员", DESC: "主办单位人员", KEY: 5},
    INVITED: {VALUE: "INVITED", LABEL: "邀请观众", DESC: "主办或参展商邀请的观众", KEY: 6},
    BUYER: {VALUE: "BUYER", LABEL: "专业买家", DESC: "专业买家", KEY: 7},
    VIP: {VALUE: "VIP", LABEL: "VIP", DESC: "VIP", KEY: 8},
    DESIGNER: {VALUE: "DESIGNER", LABEL: "设计师", DESC: "设计师", KEY: 9},
    SPECIAL_GUEST: {VALUE: "SPECIAL_GUEST", LABEL: "特邀嘉宾", DESC: "特邀嘉宾", KEY: 10},
    OUTSOURCE: {VALUE: "OUTSOURCE", LABEL: "外协人员", DESC: "外协人员", KEY: 11},
    GROUP: {VALUE: "GROUP", LABEL: "组团", DESC: "组团 一般由主办组织且不记名", KEY: 12},
    OVERSEA: {VALUE: "OVERSEA", LABEL: "海外观众", DESC: "海外观众, 一般会指定语言, 不一定包括港澳台", KEY: 13},
    HISTORY: {VALUE: "HISTORY", LABEL: "历史观众", DESC: "往届来过的老观众", KEY: 14},
    PRESS: {VALUE: "PRESS", LABEL: "媒体证", DESC: "媒体人员", KEY: 81},
    BADGE: {VALUE: "BADGE", LABEL: "证件", DESC: "预先制作的证件,需关联才可使用", KEY: 91}
};
elc.enums.visitorStatus = {
    INITIAL: {VALUE: "INITIAL", LABEL: "登记中", DESC: "初始创建, 数据不完整", KEY: 1},
    FILLED: {VALUE: "FILLED", LABEL: "信息已登记", DESC: "未验证", KEY: 2},
    VERIFY_FAIL: {VALUE: "VERIFY_FAIL", LABEL: "校验不通过", DESC: "预登记校验不通过", KEY: 3},
    VERIFIED: {VALUE: "VERIFIED", LABEL: "身份已验证", DESC: "通过可信渠道登记或已通过验证", KEY: 4},
    MANUAL_AUDIT: {VALUE: "MANUAL_AUDIT", LABEL: "待审核", DESC: "提交信息成功", KEY: 5},
    REFUSE: {VALUE: "REFUSE", LABEL: "审核不通过", DESC: "登记验证不通过", KEY: 6},
    AUDIT_PASS: {VALUE: "AUDIT_PASS", LABEL: "审核通过", DESC: "登记验证通过", KEY: 7},
    INVALID: {VALUE: "INVALID", LABEL: "失效", DESC: "已作废", KEY: 9},
    UNUSED: {VALUE: "UNUSED", LABEL: "未使用", DESC: "未使用", KEY: 10}
};
elc.enums.VisitorRequestType = {
    GENERAL: {VALUE: "GENERAL", LABEL: "普通登记", DESC: "普通登记", KEY: 1},
    EXHIBITOR: {VALUE: "EXHIBITOR", LABEL: "展商登记", DESC: "展商证", KEY: 2},
    CONSTRUCTOR: {VALUE: "CONSTRUCTOR", LABEL: "施工证登记", DESC: "施工证", KEY: 3}
};
elc.enums.VisitorRequestStatus = {
    INITIAL: {VALUE: "INITIAL", LABEL: "登记中", DESC: "初始创建, 数据不完整", KEY: 1},
    FILLED: {VALUE: "FILLED", LABEL: "已登记", DESC: "登记完成", KEY: 2},
    PENDING: {VALUE: "PENDING", LABEL: "待审核", DESC: "提交信息完成,待审核", KEY: 3},
    DONE: {VALUE: "DONE", LABEL: "审核完成", DESC: "其下所有的观众都完成审核", KEY: 4},
    PLACE_HOLDER: {VALUE: "PLACE_HOLDER", LABEL: "初始化", DESC: "占位用", KEY: 5}
};

function copyObject(obj) {
    var newObj = {};
    for (var key in obj) {
        //copy all the fields
        newObj[key] = obj[key];
    }
    return newObj;
}

function createEvent(o, s, e) {
    var r = {};
    r.errorCode = o.responseText || o.statusText;
    r.errorMsg = e;
    r.errorStatus = o.status;
    return r;
}

function preproccessEnums(type, value, attr) {
    try {
        return elc.enums[type][value.toUpperCase()][attr.toUpperCase()];
    } catch(e) {
        return null;
    }
}
