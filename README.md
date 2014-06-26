# ng-isc [![Build Status](https://travis-ci.org/praxigento/ng-isc.svg?branch=master)](https://travis-ci.org/praxigento/ng-isc) [![Coverage Status](https://coveralls.io/repos/praxigento/ng-isc/badge.png)](https://coveralls.io/r/praxigento/ng-isc) [![Code Climate](https://codeclimate.com/github/praxigento/ng-isc.png)](https://codeclimate.com/github/praxigento/ng-isc)

Isomorphic SmartClient AngularJS adapter

## Requirements

- [Isomorphic SmartClient](http://www.smartclient.com/product/smartclient.jsp) v9.1+
- [AngularJS](http://www.angularjs.org) v1.2.1+

## Versioning

[Semantic Versioning 2.0.0](http://semver.org)

## License

[LGPLv3](https://www.gnu.org/licenses/lgpl-3.0.txt)

## Documentation

Some info about library can be found on the [gh-pages site](http://praxigento.github.io/ng-isc/) for this repo.

## Development

### Initialization
To initialize project run the following command in the terminal window:

    > npm install

### Development tasks

#### Clean project

Remove folders with generated reports and documentation.

    > gulp clean

#### Run tests and generate code coverage report
    > grunt karma

#### Generate YUIDoc documentation
    > gulp yuidoc

#### Generate code complexity report (plato)
    >gulp plato
