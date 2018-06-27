'use strict';

const request = require('request');

class ITCReporter {
  constructor(param) {
    this.accessToken = param.accessToken;
    this.account = param.account;
    this.mode = param.mode;
    this.reporterVersion = '2.1';
  }
  request(command) {
    const formParam = {
      accesstoken: this.accessToken,
      account: this.account,
      version: this.reporterVersion,
      mode: this.mode,
      queryInput: `[p=Reporter.properties, ${this.constructor.name}.${command}]`,
    };
    return request.post({
      uri: `https://reportingitc-reporter.apple.com/reportservice/${this.constructor.name.toLowerCase()}/v1`,
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
  static get reportVersions() {
    return {
      'Subscriber,Detailed': '1_1',
      'Subscription,Summary': '1_1',
      'SubscriptionEvent,Summary': '1_1',
    };
  }

  static getReportVersion(param) {
    const version = Sales.reportVersions[`${param.reportType},${param.reportSubType}`];
    return version;
  }
  getVendors() {
    return this.request('getVendors');
  }
  getReport(param) {
    let command = `getReport, ${param.vendorNumber},${param.reportType},${param.reportSubType},${param.dateType},${param.date}`;
    const version = Sales.getReportVersion(param);
    if (version) {
      command += `,${version}`;
    }
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
