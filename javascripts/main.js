/*global angular, isc, TAFFY*/
angular.module('SampleApp', ['ng-isc']).controller('GridCtrl', ['$scope', '$q', '$timeout', function ($scope, $q, $timeout) {
    'use strict';

    // init DB
    var db = TAFFY();
    for (var i = 0; i < 1000; i++) {
        db.insert({product: 'Product' + i, scu: '' + i});
    }

    $scope.dataFetch1 = function (params) {
        // emulate remote db query
        var criteria = {};
        if (params.data && params.data.product) {
            criteria.product = {likenocase: params.data.product};
        }
        if (params.data && params.data.scu) {
            criteria.scu = {likenocase: params.data.scu};
        }
        var query = db(criteria);
        var count = query.count();
        query = query.limit(params.endRow - params.startRow).start(params.startRow + 1);
        if (params.sortBy) {
            var o = '';
            angular.forEach(params.sortBy, function (col) {
                if (o.length > 0) {
                    o += ', ';
                }
                var desc = col.indexOf('-') == 0;
                if (desc) {
                    o += col.substring(1) + ' desc';
                } else {
                    o += col;
                }
            });
            query = query.order(o);
        }
        var data = query.map(function (row) {
            return row;
        });

        // emulate network async request/response
        var deferrer = $q.defer();
        $timeout(function () {
            deferrer.resolve({
                status: RPCResponse.STATUS_SUCCESS,
                totalRows: count,
                data: data
            });
        }, 10);
        return deferrer.promise;
    };

    $scope.ds = isc.DataSource.create({
        ID: 'ds1',
        dataProtocol: "clientCustom",
        fields: [
            {name: 'product'},
            {name: 'scu'}
        ],
        transformRequest: function (dsRequest) {
            if (dsRequest.operationType === "fetch") {
                $q.when($scope.dataFetch1(dsRequest)).then(function (response) {
                    $scope.ds.processResponse(dsRequest.requestId, response);
                });
            }
        }
    });
}]);
