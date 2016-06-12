'use strict';

describe('Service: dbConfig', function () {

  // load the service's module
  beforeEach(module('thisvsthatApp.dbConfig'));

  // instantiate service
  var dbConfig;
  beforeEach(inject(function (_dbConfig_) {
    dbConfig = _dbConfig_;
  }));

  it('should do something', function () {
    expect(!!dbConfig).toBe(true);
  });

});
