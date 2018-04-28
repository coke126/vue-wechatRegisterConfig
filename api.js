elc.api.login = {url: elc.api.portalUrl + "rest/login", method: "POST", contentType: "application/json"};
elc.api.unusedVisitor = {url: elc.api.portalUrl + "rest/visitors/unused/{printNum}", method: "POST", contentType: "application/json"};
elc.api.hostRegister = {url: elc.api.portalUrl + "rest/visitors/batchRegister/{userId}", method: "POST", contentType: "application/json"};
elc.api.addContractorRequest = {url:  elc.api.portalUrl + "rest/visitors/request", method: "POST", contentType: "application/json"};
elc.api.newContractor = {url: elc.api.portalUrl + 'rest/request', method: "POST", contentType: "application/json"};

elc.api.contractorRequest = {url: elc.api.portalUrl + "rest/request/{id}", method: "GET"};
elc.api.contractorUpdate = {url: elc.api.portalUrl + "rest/visitors/updates", method: "POST", contentType: "application/json"};
elc.api.contractorSubmit = {url: elc.api.portalUrl + "rest/visitors/apply", method: "POST", contentType: "application/json"};

elc.api.searchVisitor = {url: elc.api.portalUrl + "rest/visitors/visitors", method: "POST"};
elc.api.loss = {url: elc.api.portalUrl + "rest/visitors/{id}/lost", method: "GET"};

elc.api.query = {url: elc.api.portalUrl + "rest/visitorMerges/{id}",method : "GET" };
elc.api.update = {url: elc.api.portalUrl + "rest/visitorMerges/update",method : "POST", contentType: "application/json"};
elc.api.insert = {url : elc.api.portalUrl + "rest/visitorMerges", method : "POST", contentType: "application/json"};
elc.api.mobilePhone = {url : elc.api.portalUrl + "rest/visitorMerges/mobilePhone", method : "POST", contentType: "application/json"};

elc.api.visitorOcrRefresh = {url: elc.api.portalUrl + 'rest/visitors/pending/{exhibitionId}', method: 'GET'};

elc.api.auditVisitorsPass = {url: elc.api.portalUrl + "rest/visitors/{id}/pass", method: "POST", contentType: "application/json"};
elc.api.auditVisitorsFail = {url: elc.api.portalUrl + "rest/visitors/{id}/fail", method: "POST", contentType: "application/json"};
elc.api.auditVisitorsPassWithEdit= {url: elc.api.portalUrl + "rest/visitors/pass", method: "POST", contentType: "application/json"};

elc.api.statsQueryHour = {url: elc.api.portalUrl + "rest/statistics/hours", method: "POST", contentType: "application/json"};
elc.api.statsQueryDay = {url: elc.api.portalUrl + "rest/statistics/days", method: "POST", contentType: "application/json"};
elc.api.statsQueryFlow = {url: elc.api.portalUrl + "rest/statistics/flows/{exhibitionId}", method: "GET"};
elc.api.exhibitorArea = {url: elc.api.portalUrl + 'rest/statistics/distribute', method: "POST", contentType: "application/json"};
elc.api.inAndOut = { url: elc.api.portalUrl + "rest/statistics/access", method: "POST", contentType: "application/json"};

elc.api.smsQuery = {url: elc.api.portalUrl + "rest/log/smss/{id}", method : "GET", contentType: "application/json"};
elc.api.emailLogs = {url: elc.api.portalUrl + "rest/emailLogs/page", method : "POST", contentType: "application/json"};

elc.api.validateModify = {url: elc.api.portalUrl + "rest/visitors/verified", method: "POST", contentType: "application/json"};
elc.api.visitorRequestCode = {url: elc.api.portalUrl + "rest/visitors/passCode", method: "POST", contentType: "application/json"};
elc.api.visitorMobilePhonePass = {url: elc.api.portalUrl + "rest/visitors/{id}/mobile-phone", method: "PATCH", contentType: "application/json"};

elc.api.exhibitionsUpdate = {url: elc.api.portalUrl + "rest/exhibitions/update", method: "POST", contentType: "application/json"};
elc.api.exhibitionsQuery = {url: elc.api.portalUrl + "rest/exhibitions/{id}", method: "GET"};
elc.api.exhibitionsInsert = {url : elc.api.portalUrl + "rest/exhibitions", method : "POST", contentType: "application/json"};

elc.api.blacklistsQuery = {url : elc.api.portalUrl + "rest/blacklists/{id}", method : "GET"};
elc.api.blacklistsUpdate = {url : elc.api.portalUrl + "rest/blacklists/update", method : "POST", contentType: "application/json"};
elc.api.blacklistsInsert = {url : elc.api.portalUrl + "rest/blacklists", method : "POST", contentType: "application/json"};
elc.api.blacklistsDel = {url : elc.api.portalUrl + "rest/blacklists/del/{id}", method: "GET"};

// 观众相关
elc.api.visitiorRemove = {url: elc.api.portalUrl + "rest/visitors/del/{id}", method: "GET"};
elc.api.invalidation = {url: elc.api.portalUrl + "rest/visitors/{id}/invalidation", method: "POST", contentType: "application/json"};
elc.api.visitorUpdate = {url: elc.api.portalUrl + "rest/visitors/update", method: "POST", contentType: "application/json"};
elc.api.visitorUpdateByRecord = {url: elc.api.portalUrl + "rest/visitors", method: "PATCH", contentType: "application/json"};
elc.api.visitorQuery = {url: elc.api.portalUrl + "rest/visitors/{id}", method: "GET"};
// elc.api.visitorQuery = {url: elc.api.baseUrl + "rest/visitors/new", method: "GET"};
elc.api.visitorIdQuery = {url: elc.api.portalUrl + "rest/visitors/id-num", method: "POST", contentType: "application/json"};
elc.api.insert = {url: elc.api.portalUrl + "rest/visitors/new", method: "POST", contentType: "application/json"};
// TODO 暂用register的接口
elc.api.registerSms = {url: elc.api.registerUrl + "rest/visitors/phone-token", method: "POST", contentType: "application/json"};

// 批量登记相关
elc.api.requestPage = {url: elc.api.portalUrl + "rest/request/visitorRequests", method: "POST", contentType: "application/json"};
elc.api.applicationInfo = {url: elc.api.portalUrl + "rest/request/{id}/visitors", method: "GET"};
elc.api.auditPass = {url: elc.api.portalUrl + "rest/request/audit", method: "POST", contentType: 'application/json'};
elc.api.showCard = {url: elc.api.portalUrl + "rest/visitors/{id}/attachments", method: "GET"};
elc.api.exhibitor = {url: elc.api.portalUrl + 'rest/visitors/visitors', method: "POST", contentType: "application/json"};
// elc.api.register = {url: elc.api.portalUrl + "rest/visitors/batchRegister/{userId}", method: "POST", contentType: "application/json"};

elc.api.requestInfo = {url: elc.api.portalUrl + "rest/request/requests/{id}", method: "GET"};
elc.api.exhibitorPage = {url: elc.api.portalUrl + "rest/request/page", method: "POST", contentType: "application/json"};

elc.api.booths = {url: elc.api.portalUrl + "rest/booths/exhibition/{exhibitionId}", method: "GET"};
elc.api.boothPendingQuery = {url: elc.api.portalUrl + "rest/booths/pending/{exhibitionId}", method: "POST", contentType: "application/json"};
elc.api.boothRequest = {url: elc.api.portalUrl + "rest/request/booth/{id}", method: "GET"};

elc.api.addBooth = {url: elc.api.portalUrl + "rest/booths", method: "POST", contentType: "application/json"};
/**
 * TODO: 更新Booth
 * @type {{url: string, method: string, contentType: string}}
 */
//elc.api.updateBooth = {url: elc.api.portalUrl + "rest/booths/{id}", method: "PUT", contentType: "application/json"};

/**
 * 代替更新Booth
 * @type {{url: string, method: string, contentType: string}}
 */
elc.api.updateBooth = {url: elc.api.portalUrl + "rest/booths/{id}/update", method: "POST", contentType: "application/json"};
elc.api.searchBooth = {url: elc.api.portalUrl + "rest/booths/{id}", method: "GET"};
/**
 * 补发通知短信 邮件
 * */
elc.api.notify = {url: elc.api.portalUrl + "rest/visitors/{id}/notify/{type}", method: "GET"};
/**
 * 展商导出
 */
elc.api.exhibitorExport = {url: elc.api.portalUrl + "rest/request/download/{exhibitionId}/excel", method: "GET"};


