'use strict';

const request = require('request');

class ITCReporter {
  constructor(param) {
    this.userId = param.userId;
    this.password = param.password;
    this.mode = param.mode;
    this.reporterVersion = '1.0';
  }
  request(command) {
    const formParam = {
      userid: this.userId,
      password: this.password,
      version: this.reporterVersion,
      mode: this.mode,
      queryInput: `[p=Reporter.properties, ${this.constructor.name}.${command}]`,
    };
    return request.post({
      uri: `https://reportingitc-reporter.apple.com/reportservice/${this.constructor.name.toLowerCase()}/v1`,
      headers: {
        'User-Agent': 'Java/1.8.0_92',
        'Accept': 'text/xml, text/plain',
        'Connection': 'keep-alive',
      },
      form: { jsonRequest: JSON.stringify(formParam) },
    });
  }
  getVersion() {
    return this.reporterVersion;
  }
  getStatus() {
    return this.request('getStatus');
  }
  getAccounts() {
    return this.request('getAccounts');
  }
}
class Sales extends ITCReporter {
  getVendors() {
    return this.request('getVendors');
  }
  getReport(param) {
    const command = `getReport, ${param.vendorNumber},${param.reportType},${param.reportSubType},${param.dateType},${param.date}`;
    return this.request(command);
  }
}
class Finance extends ITCReporter {
  getVendorsAndRegions() {
    return this.request('getVendorsAndRegions');
  }
  getReport(param) {
    const command = `getReport, ${param.vendorNumber},${param.regionCode},${param.reportType},${param.fiscalYear},${param.fiscalPeriod}`;
    return this.request(command);
  }
}

module.exports = {
  Sales,
  Finance,
};
