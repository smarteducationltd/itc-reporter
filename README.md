# itc-reporter

[![wercker status](https://app.wercker.com/status/03acbc8ab593bb6d1b7ae28bc0f3d099/s/master "wercker status")](https://app.wercker.com/project/byKey/03acbc8ab593bb6d1b7ae28bc0f3d099)
[![Dependency Status](https://gemnasium.com/badges/github.com/smarteducationltd/itc-reporter.svg)](https://gemnasium.com/github.com/smarteducationltd/itc-reporter)

[iTunes Connect Reporter Tool](http://help.apple.com/itc/appsreporterguide/) for Node.js

## Installation

```sh
npm install --save itc-reporter
```

## Example

### Sales Report

```js
const itcReporter = require('itc-reporter');
const zlib = require('zlib');

const reporter = new itcReporter.Sales({
  accessToken: 'YOUR ACCESS TOKEN',
  account: 'YOUR ACCOUNT',
  mode: 'Robot.XML',
});
const reader = reporter.getReport({
  vendorNumber: 'YOUR VENDOR NUMBER',
  reportType: 'Sales',
  reportSubType: 'Summary',
  dateType: 'Daily',
  date: 20160101
});
reader.on('response', res => {
  if (res.statusCode === 200) return;
  throw new Error(res.statusCode);
});
reader.pipe(zlib.createGunzip()).pipe(process.stdout);
```

### Earnings Report

```js
const itcReporter = require('itc-reporter');
const zlib = require('zlib');

const reporter = new itcReporter.Finance({
  accessToken: 'YOUR ACCESS TOKEN',
  account: 'YOUR ACCOUNT',
  mode: 'Robot.XML',
});
const reader = reporter.getReport({
  vendorNumber: 'YOUR VENDOR NUMBER',
  regionCode: 'JP',
  reportType: 'Financial',
  fiscalYear: 2016,
  fiscalPeriod: 8,
});
reader.on('response', res => {
  if (res.statusCode === 200) return;
  throw new Error(res.statusCode);
});
reader.pipe(zlib.createGunzip()).pipe(process.stdout);
```

## Author

  - [Makoto Miura](https://github.com/nanolia)

# License

  MIT
