/**
 * <h3>Isomorphic SmartClient Widgets Library for AngularJS.</h3>
 *
 * Allows you to use Isomorphic SmartClient (ISC) Library widgets in AngularJS projects.
 *
        <!doctype html>
        <html ng-app="sampleApp">
        <head>
            <!-- setup Isomorphic SmartClient -->
            <script>var isomorphicDir = "lib/isomorphic/";</script>
            <script src="lib/isomorphic/system/modules/ISC_Core.js"></script>
            <script src="lib/isomorphic/system/modules/ISC_Foundation.js"></script>
            <script src="lib/isomorphic/system/modules/ISC_Containers.js"></script>
            <script src="lib/isomorphic/system/modules/ISC_Grids.js"></script>
            <script src="lib/isomorphic/system/modules/ISC_Forms.js"></script>
            <script src="lib/isomorphic/system/modules/ISC_DataBinding.js"></script>
            <script src="lib/isomorphic/system/modules/ISC_RichTextEditor.js"></script>
            <script src="lib/isomorphic/skins/SmartClient/load_skin.js"></script>

            <script src="lib/js/angular.min.js"></script>

            <script src="ng-isc.js"></script>

            <style type="text/css">
                html, body {
                    height: 100%;
                    margin: 0px;
                    padding: 0px;
                }

                *
                .full {
                    width: 100%;
                    height: 100%;
                }
            </style>
        </head>
        <body ng-controller="SampleCtrl">
            <!--root isomorphic directive must be defined as attribute in valid html tag, because ISC control get his dimensions-->
            <div class="full" isc-v-layout sc-width="'100%'" sc-height="'100%'">
                <isc-list-grid sc-width="'100%'" sc-height="'50%'" sc-fields="fields" sc-data="data" ng-model="value"
                               sc-show-resize-bar="true" sc-on-row-double-click="onDoubleClick"></isc-list-grid>
                <isc-dynamic-form sc-width="'100%'" sc-height="'*'" sc-fields="fields" ng-model="value"></isc-dynamic-form>
                <isc-rich-text-editor sc-width="'100%'" sc-height="'10%'" ng-model="out"></isc-rich-text-editor>
            </div>

            <script type="text/javascript">
                angular.module('sampleApp', ['ng-isc']).controller('SampleCtrl', ['$scope', function ($scope) {
                    $scope.fields = [
                        {name: 'name'},
                        {name: 'value'}
                    ];
                    $scope.data = [
                        {name: 'one', value: 1},
                        {name: 'two', value: 2},
                        {name: 'three', value: 3}
                    ];
                    $scope.out = '';
                    $scope.onDoubleClick = function (record, recordNum, fieldNum) {
                        $scope.out += 'Record ' + recordNum + ' double clicked<br>';
                    };
                }]);
            </script>
        </body>
        </html>
 *
 * In order to create ISC control, you must use directive with the name of ISC control class name and prefix 'isc'.
 * For example, if you want to create ListGrid widget, you must use directive 'iscListGrid' as a tag name or attribute.
 *
 * Each property of ISC control which can be put in create(props) function or set by a setter, can be determined
 * through attribute with prefix 'sc-' and a name of a property. For example, for the property showEdges you must
 * add attribute sc-show-edges="true". All 'sc-' attributes values are evaluated before use, i.e. all strings must
 * be quoted with single-quotes (sc-name="'Hello world!'" or sc-name="'Hello {{name}}!'").
 *
 * In order to subscribe to ISC control events you must use the attributes with prefix 'sc-on-'.
 *
 * Also you can initialize ISC control by passing config object through attribute 'sc-config-object'.

        // controller
        function SampleCtrl($scope) {
            $scope.config = {
                width: '100%',
                height: '100%'
            };
        }

        // html
        <isc-h-layout sc-config-object="config"></isc-h-layout>
 *
 * @module ng-isc
 *
 * @license ng-isc v0.1.0
 * (c) 2014 Praxigento
 * License: LGPL
 *
 * @author alex-smirnov <0lex0.smirnov@gmail.com>
 */
/*global define, angular, window, document */
(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        /* List of AMD modules to be loaded with RequireJS. */
        var amdDepends = ['angular', 'isomorphic'];
        define(amdDepends, factory);
    } else {
        factory();
    }
}(function () {
    'use strict';

    // attributes ignored in common processing
    var ignoredAttributes = [
        'scConfigObject'
    ];


    /* ISC init */
    var isc = window.isc;
    if (!isc.Page.isLoaded()) {
        isc.Page.finishedLoading();
        // load css for skin manually
        // he is not load automatically on async ISC loading
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = isc.Page.getURL("[SKIN]/skin_styles.css");
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    /* NG modules dependencies. */
    var ngDepends = [];
    var ngMod = angular.module('ng-isc', ngDepends);

    // list of all SC control classes
    ngMod.Types = [
        /**
         * iscLayout directive
         * @class iscLayout
         */
        'Layout',

        /**
         * iscVLayout directive
         * @class iscVLayout
         */
        'VLayout',

        /**
         * iscHLayout directive
         * @class iscHLayout
         */
        'HLayout',

        /**
         * iscTreeGrid directive
         * @class iscTreeGrid
         */
        'TreeGrid',

        /**
         * iscListGrid directive
         * @class iscListGrid
         */
        'ListGrid',

        /**
         * iscDynamicForm directive
         * @class iscDynamicForm
         */
        'DynamicForm',

        /**
         * iscSlider directive
         * @class iscSlider
         */
        'Slider',

        /**
         * iscRangeSlider directive
         * @class iscRangeSlider
         */
        'RangeSlider',

        /**
         * iscRichTextEditor directive
         * @class iscRichTextEditor
         */
        'RichTextEditor',

        /**
         * iscImg directive
         * @class iscImg
         */
        'Img',

        /**
         * iscStretchImg directive
         * @class iscStretchImg
         */
        'StretchImg',

        /**
         * iscLabel directive
         * @class iscLabel
         */
        'Label',

        /**
         * iscHTMLFlow directive
         * @class iscHTMLFlow
         */
        'HTMLFlow',

        /**
         * iscHTMLPane directive
         * @class iscHTMLPane
         */
        'HTMLPane',

        /**
         * iscDialog directive
         * @class iscDialog
         */
        'Dialog',

        /**
         * iscMenu directive
         * @class iscMenu
         */
        'Menu',

        /**
         * iscMenuButton directive
         * @class iscMenuButton
         */
        'MenuButton',

        /**
         * iscIMenuButton directive
         * @class iscIMenuButton
         */
        'IMenuButton',

        /**
         * iscMenuBar directive
         * @class iscMenuBar
         */
        'MenuBar',

        /**
         * iscButton directive
         * @class iscButton
         */
        'Button',

        /**
         * iscIButton directive
         * @class iscIButton
         */
        'IButton',

        /**
         * iscAutoFitButton directive
         * @class iscAutoFitButton
         */
        'AutoFitButton',

        /**
         * iscProgressbar directive
         * @class iscProgressbar
         */
        'Progressbar',

        /**
         * iscImgButton directive
         * @class iscImgButton
         */
        'ImgButton',

        /**
         * iscStretchImgButton directive
         * @class iscStretchImgButton
         */
        'StretchImgButton',

        /**
         * iscTabSet directive
         * @class iscTabSet
         */
        'TabSet',

        /**
         * iscWindow directive
         * @class iscWindow
         */
        'Window',

        /**
         * iscPortalLayout directive
         * @class iscPortalLayout
         */
        'PortalLayout',

        /**
         * iscPortlet directive
         * @class iscPortlet
         */
        'Portlet',

        /**
         * iscToolStrip directive
         * @class iscToolStrip
         */
        'ToolStrip',

        /**
         * iscHStack directive
         * @class iscHStack
         */
        'HStack',

        /**
         * iscVStack directive
         * @class iscVStack
         */
        'VStack',

        /**
         * iscLayoutSpacer directive
         * @class iscLayoutSpacer
         */
        'LayoutSpacer',

        /**
         * iscToolbar directive
         * @class iscToolbar
         */
        'Toolbar',

        /**
         * iscToolStripGroup directive
         * @class iscToolStripGroup
         */
        'ToolStripGroup',

        /**
         * iscIconButton directive
         * @class iscIconButton
         */
        'IconButton',

        /**
         * iscIconMenuButton directive
         * @class iscIconMenuButton
         */
        'IconMenuButton',

        /**
         * iscRibbonBar directive
         * @class iscRibbonBar
         */
        'RibbonBar',

        /**
         * iscSectionStack directive
         * @class iscSectionStack
         */
        'SectionStack',

        /**
         * iscSplitbar directive
         * @class iscSplitbar
         */
        'Splitbar',

        /**
         * iscImgSplitbar directive
         * @class iscImgSplitbar
         */
        'ImgSplitbar',

        /**
         * iscSnapbar directive
         * @class iscSnapbar
         */
        'Snapbar',

        /**
         * iscNavigationBar directive
         * @class iscNavigationBar
         */
        'NavigationBar',

        /**
         * iscSplitPane directive
         * @class iscSplitPane
         */
        'SplitPane',

        /**
         * iscDetailViewer directive
         * @class iscDetailViewer
         */
        'DetailViewer',

        /**
         * iscTileLayout directive
         * @class iscTileLayout
         */
        'TileLayout',

        /**
         * iscFlowLayout directive
         * @class iscFlowLayout
         */
        'FlowLayout',

        /**
         * iscTileGrid directive
         * @class iscTileGrid
         */
        'TileGrid',

        /**
         * iscColumnTree directive
         * @class iscColumnTree
         */
        'ColumnTree',

        /**
         * iscTableView directive
         * @class iscTableView
         */
        'TableView',

        /**
         * iscDOMGrid directive
         * @class iscDOMGrid
         */
        'DOMGrid',

        /**
         * iscDateGrid directive
         * @class iscDateGrid
         */
        'DateGrid',

        /**
         * iscDateChooser directive
         * @class iscDateChooser
         */
        'DateChooser',

        /**
         * iscSearchForm directive
         * @class iscSearchForm
         */
        'SearchForm',

        /**
         * iscColorPicker directive
         * @class iscColorPicker
         */
        'ColorPicker',

        /**
         * iscDateRangeDialog directive
         * @class iscDateRangeDialog
         */
        'DateRangeDialog',

        /**
         * iscPropertySheet directive
         * @class iscPropertySheet
         */
        'PropertySheet',

        /**
         * iscFilterClause directive
         * @class iscFilterClause
         */
        'FilterClause',

        /**
         * iscFilterBuilder directive
         * @class iscFilterBuilder
         */
        'FilterBuilder',

        /**
         * iscCalendar directive
         * @class iscCalendar
         */
        'Calendar',

        /**
         * iscTimeline directive
         * @class iscTimeline
         */
        'Timeline',

        /**
         * iscDrawPane directive
         * @class iscDrawPane
         */
        'DrawPane',

        /**
         * iscGauge directive
         * @class iscGauge
         */
        'Gauge',

        /**
         * iscBrowserPlugin directive
         * @class iscBrowserPlugin
         */
        'BrowserPlugin',

        /**
         * iscApplet directive
         * @class iscApplet
         */
        'Applet',

        /**
         * iscFlashlet directive
         * @class iscFlashlet
         */
        'Flashlet',

        /**
         * iscSVG directive
         * @class iscSVG
         */
        'SVG',

        /**
         * iscActiveXControl directive
         * @class iscActiveXControl
         */
        'ActiveXControl'
    ];
    // list of component types with data binding
    ngMod.DataBindedTypes = ['TreeGrid', 'ListGrid', 'DynamicForm'];
    // prefix of library directives
    var prefix = 'isc';
    // isc events recursion counter
    var eventCounter = 0;

    angular.forEach(ngMod.Types, function (type) {
        if (angular.isDefined(isc[type])) {
            var dirName = prefix + type;
            ngMod.directive(dirName, ['$parse', '$q', function ($parse, $q) {
                return {
                    restrict: 'EA',
                    require: [dirName, "?ngModel"],
                    transclude: (dirName === 'iscHTMLFlow'),
                    controller: function ($scope) {
                        var ctrl = this;
                        ctrl.members = [];

                        // create ISC control of the given type
                        ctrl.createControl = function (element, attrs) {

                            // search parent ng-isc library directive

                            var getCtrl = function (el, ctrlName) {
                                var c = el.controller(ctrlName);
                                if (c) {
                                    var parentCtrl = el.parent().controller(ctrlName);
                                    if (c !== parentCtrl) {
                                        return c;
                                    }
                                }
                                return null;
                            };
                            var searchIscCtrl = function (el) {
                                for (var i = 0; i < ngMod.Types.length; i++) {
                                    var ctrlName = prefix + ngMod.Types[i];
                                    var ctrl = getCtrl(el, ctrlName);
                                    if (ctrl) {
                                        return ctrl;
                                    }
                                }
                                return null;
                            };
                            var parent = element.parent();
                            var parentCtrl = searchIscCtrl(parent);
                            if (!parentCtrl) {
                                while (getCtrl(parent, 'ngInclude')) {
                                    parent = parent.parent();
                                    parentCtrl = searchIscCtrl(parent);
                                    if (parentCtrl) {
                                        break;
                                    }
                                }
                            }

                            // properties for control creation
                            var props = {};
                            // event handlers
                            var handlers = {};

                            function processAttr(key, value, ev) {
                                if (ignoredAttributes.indexOf(key) === -1) {
                                    var match = key.match(/^sc(On)?([A-Z].*)/);
                                    if (match) {
                                        var name = match[2].charAt(0).toLowerCase() + match[2].slice(1);
                                        if (match[1]) { // if event handler
                                            if (name === 'dataFetch') { // if data handler
                                                handlers[name] = function () {
                                                    var handler = ev && $scope.$eval(value) || value;
                                                    return handler.apply($scope, arguments);
                                                };
                                            } else { // if common handler
                                                handlers[name] = function () {
                                                    var args = arguments;
                                                    var handler = ev && $scope.$eval(value) || value;
                                                    return $scope.$apply(function () {
                                                        return handler.apply($scope, args);
                                                    });
                                                };
                                            }
                                        } else { // if property
                                            props[name] = ev && $scope.$eval(value) || value;
                                        }
                                    }
                                }
                            }

                            // process configObject
                            angular.forEach(attrs.scConfigObject && scope.$eval(attrs.scConfigObject), function (value, key) {
                                processAttr('sc' + key.charAt(0).toUpperCase() + key.slice(1), value, false);
                            });
                            // process tag attributes
                            angular.forEach(attrs.$attr, function (value, key) {
                                processAttr(key, attrs[key], true);
                            });

                            if (parentCtrl === null) {
                                //props.position = isc.Canvas.RELATIVE;
                                // define fake object for computing percent dimensions
                                props.percentSource = {
                                    _isA_Canvas: true,
                                    element: element[0],
                                    getVisibleWidth: function () {
                                        return this.element.clientWidth;
                                    },
                                    getVisibleHeight: function () {
                                        return this.element.clientHeight;
                                    }
                                };
                                props.htmlElement = element[0];
                            }
                            // create ISC control
                            ctrl.className = type;
                            ctrl.control = isc[type].create(props);
                            if (ctrl.members.length > 0) {
                                ctrl.control.setMembers(ctrl.members);
                            }
                            // add as member if parent is ISC control
                            if (parentCtrl) {
                                parentCtrl.addMember(ctrl.control);
                                //                            } else {
                                //                                /* Set DOM element to the root of the current ISC-control. */
                                //                                ctrl.control.setHtmlElement(element[0]);
                            }

                            // subscribe to control events
                            angular.forEach(handlers, function (value, key) {
                                // save default handler
                                var defaultHandler = ctrl.control[key];
                                ctrl.control[key] = function () {
                                    var res = value.apply(this, arguments);
                                    if (res !== false && angular.isFunction(defaultHandler)) {
                                        // exec default handler
                                        defaultHandler.apply(this, arguments);
                                    }
                                    return res;
                                }
                            });

                            // subscribe to the all attributes values
                            angular.forEach(attrs.$attr, function (value, key) {
                                var match = key.match(/^sc(On)?([A-Z].*)/);
                                if (match && !match[1]) {
                                    var setName = 'set' + match[2];
                                    var getName = 'get' + match[2];
                                    attrs.$observe(key, function (newValue) {
                                        if (angular.isFunction(ctrl.control[setName])) {
                                            var value = $scope.$eval(newValue);
                                            var oldValue = ctrl.control[getName] && ctrl.control[getName]();
                                            if (oldValue !== value) {
                                                console.log('call ' + ctrl.control.ID + '.' + setName + '(' + angular.toJson(value) + ')');
                                                ctrl.control[setName](value);
                                            }
                                        }
                                    });
                                }
                            });

                            // export direct object reference
                            if (attrs[dirName]) {
                                var set = $parse(attrs[dirName]).assign;
                                if (set) {
                                    set($scope, ctrl.control);
                                } else {
                                    throw new Error('Can\'t assign to: ' + attrs[dirName]);
                                }
                            }
                        };

                        // add member to ISC control
                        ctrl.addMember = function (member) {
                            if (ctrl.control) {
                                ctrl.control.addMember(member);
                            } else {
                                ctrl.members.push(member);
                            }
                        };
                    },
                    link: function (scope, element, attrs, ctrls, transcludeFn) {
                        var ctrl = ctrls[0];
                        var ngModel = ctrls[1];
                        // create control
                        ctrl.createControl(element, attrs);
                        // init data binding
                        if (ngMod.DataBindedTypes.indexOf(ctrl.className) != -1 && !attrs.scDataSource) {
                            ctrl.dataFetch = (attrs.scDataFetch && scope.$eval(attrs.scDataFetch)) || ctrl.control.dataFetch;
                            var ds = DataSource.create({
                                dataProtocol: "clientCustom",
                                fields: ctrl.control.fields,
                                transformRequest: function (dsRequest) {
                                    if (dsRequest.operationType == "fetch") {
                                        if (angular.isFunction(ctrl.dataFetch)) {
                                            $q.when(ctrl.dataFetch.apply(scope, [dsRequest])).then(function (response) {
                                                ds.processResponse(dsRequest.requestId, response);
                                            });
                                        }
                                    }
                                }
                            });
                            ctrl.control.setDataSource(ds);
                            ctrl.control.fetchData();
                        }

                        if (transcludeFn) {
                            var tmpl = transcludeFn();
                            angular.element(ctrl.control.getContentElement()).empty().append(tmpl);
                            ctrl.control.onDraw = function () {
                                angular.element(ctrl.control.getContentElement()).empty().append(tmpl);
                            };
                            //ctrl.control.setContents(null);
                        }

                        // ngModel binding
                        if (ngModel) {
                            // process change in model
                            ngModel.$render = function () {
                                if (ngModel.$viewValue) {
                                    eventCounter++;
                                    if (angular.isFunction(ctrl.control.setValues)) {
                                        ctrl.control.setValues(ngModel.$viewValue);
                                    } else if (angular.isFunction(ctrl.control.setValue)) {
                                        ctrl.control.setValue(ngModel.$viewValue);
                                    }
                                    eventCounter--;
                                }
                            };

                            // process change in control
                            var updateModel = function () {
                                ngModel.$setViewValue(angular.isFunction(ctrl.control.getValue) && ctrl.control.getValue() || ctrl.control.getSelection());
                            };
                            //var eventName = 'selectionUpdated';
                            var eventName = 'selectionChanged';
                            if (angular.isFunction(ctrl.control.getValue)) {
                                eventName = 'valueChanged';
                            }
                            // save default handler
                            var defaultHandler = ctrl.control[eventName];
                            ctrl.control[eventName] = function () {
                                var h = function () {
                                    updateModel();
                                    try {
                                        if (angular.isFunction(defaultHandler)) {
                                            // exec default handler
                                            defaultHandler.apply(this, arguments);
                                        }
                                    } catch (Exception) {
                                    }
                                    return true;
                                };
                                var res = null;
                                eventCounter++;
                                if (eventCounter == 1) {
                                    res = scope.$apply(h);
                                } else {
                                    res = h();
                                }
                                eventCounter--;
                                return res;
                            };
                            //updateModel();
                        }
                    }
                };
            }]);
        }
    });

    return ngMod;
}));
