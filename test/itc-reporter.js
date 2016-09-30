'use strict';

const assert = require('power-assert');
const nock = require('nock');
const itcReporter = require('../lib/itc-reporter');
const memoryStream = require('memory-streams');

describe('Sales', () => {
  const reporter = new itcReporter.Sales({
    userId: 'XXX',
    password: 'YYY',
    mode: 'Robot.XML',
  });
  it('getVersion', done => {
    assert(reporter.getVersion(), '1.0');
    done();
  });
  it('getStatus', done => {
    nock('https://reportingitc-reporter.apple.com')
      .post('/reportservice/sales/v1')
      .reply(200, 'ok');

    const stream = reporter.getStatus();
    const writer =  new memoryStream.WritableStream();
    stream.pipe(writer);
    stream.on('end', () => {
      assert(writer.toString());
      done();
    });
  });
  it('getAccounts', done => {
    nock('https://reportingitc-reporter.apple.com')
      .post('/reportservice/sales/v1')
      .reply(200, 'ok');

    const stream = reporter.getAccounts();
    const writer =  new memoryStream.WritableStream();
    stream.pipe(writer);
    stream.on('end', () => {
      assert(writer.toString());
      done();
    });
  });
  it('getVendors', done => {
    nock('https://reportingitc-reporter.apple.com')
      .post('/reportservice/sales/v1')
      .reply(200, 'ok');

    const stream = reporter.getVendors();
    const writer =  new memoryStream.WritableStream();
    stream.pipe(writer);
    stream.on('end', () => {
      assert(writer.toString());
      done();
    });
  });
  it('getReport', done => {
    nock('https://reportingitc-reporter.apple.com')
      .post('/reportservice/sales/v1')
      .reply(200, 'ok');

    const stream = reporter.getReport({
      vendorNumber: 9999999,
      reportType: 'Sales',
      reportSubType: 'Summary',
      dateType: 'Daily',
      date: '20160101',
    });
    const writer =  new memoryStream.WritableStream();
    stream.pipe(writer);
    stream.on('end', () => {
      assert(writer.toString());
      done();
    });
  });
});

describe('Finance', () => {
  const reporter = new itcReporter.Finance({
    userId: 'XXX',
    password: 'YYY',
    mode: 'Robot.XML',
  });
  it('getVersion', done => {
    assert(reporter.getVersion(), '1.0');
    done();
  });
  it('getStatus', done => {
    nock('https://reportingitc-reporter.apple.com')
      .post('/reportservice/finance/v1')
      .reply(200, 'ok');

    const stream = reporter.getStatus();
    const writer =  new memoryStream.WritableStream();
    stream.pipe(writer);
    stream.on('end', () => {
      assert(writer.toString());
      done();
    });
  });
  it('getAccounts', done => {
    nock('https://reportingitc-reporter.apple.com')
      .post('/reportservice/finance/v1')
      .reply(200, 'ok');

    const stream = reporter.getAccounts();
    const writer =  new memoryStream.WritableStream();
    stream.pipe(writer);
    stream.on('end', () => {
      assert(writer.toString());
      done();
    });
  });
  it('getVendorsAndRegions', done => {
    nock('https://reportingitc-reporter.apple.com')
      .post('/reportservice/finance/v1')
      .reply(200, 'ok');

    const stream = reporter.getVendorsAndRegions();
    const writer =  new memoryStream.WritableStream();
    stream.pipe(writer);
    stream.on('end', () => {
      assert(writer.toString());
      done();
    });
  });
  it('getReport', done => {
    nock('https://reportingitc-reporter.apple.com')
      .post('/reportservice/finance/v1')
      .reply(200, 'ok');

    const stream = reporter.getReport({
      vendorNumber: 9999999,
      reportType: 'Financial',
      fiscalYear: 2016,
      fiscalPeriod: 8,
    });
    const writer =  new memoryStream.WritableStream();
    stream.pipe(writer);
    stream.on('end', () => {
      assert(writer.toString());
      done();
    });
  });
});
