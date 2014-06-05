/**
 * Created by alex on 20.05.14.
 */
define([
    'angular', 'angularMock', 'isomorphic', 'ng-isc'
], function (ng, mock, isc, ngMod) {
    describe('module tests', function () {
        var NG_MODULE = 'ng-isc';

        beforeEach(mock.module(NG_MODULE));

        it('Check ngModule name.', function () {
            expect(ngMod.name).toBe(NG_MODULE);
        });

        /**
         * Compile directive template and return result.
         * @param template
         * @return {*}
         */
        function compileDirectiveTemplate(template) {
            var result;
            var wrapped = '<div id="wrapper">' + template + '</div>';
            mock.inject(function ($rootScope, $compile) {
                scope = $rootScope;
                var compiled = $compile(wrapped)(scope);
                scope.$digest();
                result = compiled;
            });
            return result;
        }

        describe('Check module directives.', function () {
            var elm;

            it('simple directive definition', inject(function () {
                elm = compileDirectiveTemplate('<isc-layout show-edges="true" />');
                console.log('directive: ' + elm.html());
                var divs = elm.find('div');
                expect(divs.length).toBe(2);
            }));

            it('nested directives definition', inject(function () {
                elm = compileDirectiveTemplate('<isc-h-layout sc-width="\'100%\'" sc-height="\'100%\'"><isc-v-layout></isc-v-layout></isc-h-layout>');

                // search and generate child isc-component before checking structure
                var hl = elm.find('isc-h-layout');
                var ctrl = hl.controller('iscHLayout');
                ctrl.control.members[0].draw();

                console.log('directive: ' + elm.html());
                var divs = elm.find('div');
                expect(divs.length).toBe(4);
            }));

        });

        describe('Check attributes to properties conversion', function () {
            it('boolean', inject(function () {
                elm = compileDirectiveTemplate('<isc-h-layout sc-show-edges="true"></isc-h-layout>');
                var hl = elm.find('isc-h-layout');
                var ctrl = hl.controller('iscHLayout');
                expect(ctrl.control.showEdges).toBe(true);
            }));
        });

        describe('Check events subscription', function () {
            it('button.onClick', inject(function ($rootScope) {
                $rootScope.onClick = function () {
                    $rootScope.clicked = true;
                };
                elm = compileDirectiveTemplate('<isc-button sc-on-click="onClick"></isc-button>');
                var btn = elm.find('isc-button');
                var ctrl = btn.controller('iscButton');
                ctrl.control.click();
                expect($rootScope.clicked).toBe(true);
            }));

            it('grid.dataFetch', inject(function ($rootScope) {
                $rootScope.onDataFetch = function () {
                    $rootScope.dataFetched = true;
                    return {};
                };
                elm = compileDirectiveTemplate('<isc-list-grid sc-on-data-fetch="onDataFetch"></isc-list-grid>');
                expect($rootScope.dataFetched).toBe(true);
            }));
        });

        it('check attribute data binding', inject(function ($rootScope) {
            $rootScope.disabled = false;
            elm = compileDirectiveTemplate('<isc-button sc-disabled="{{disabled}}"></isc-button>');
            var btn = elm.find('isc-button');
            var ctrl = btn.controller('iscButton');
            expect(ctrl.control.isDisabled()).toBe(false);
            $rootScope.disabled = true;
            $rootScope.$digest();
            expect(ctrl.control.isDisabled()).toBe(true);
        }));

        it('check direct object reference export', inject(function ($rootScope) {
            elm = compileDirectiveTemplate('<div id="btn" isc-button="button"></div>');
            var btn = elm.children();
            var ctrl = btn.controller('iscButton');
            expect(ctrl.control).toBe($rootScope.button);
        }));

        it('check HTMLFlow raw content', inject(function ($rootScope) {
            elm = compileDirectiveTemplate('<div isc-h-t-m-l-flow>{{1+1}}=2</div>');
            expect(elm.text()).toBe('2=2');
        }));

        it('ngModel binding', inject(function ($rootScope) {
            elm = compileDirectiveTemplate('<isc-slider ng-model="value"></isc-slider>');
            var slider = elm.find('isc-slider');
            var ctrl = slider.controller('iscSlider');

            $rootScope.value = 100;
            $rootScope.$digest();
            expect(ctrl.control.getValue()).toBe(100);

            ctrl.control.setValue(50);
            expect($rootScope.value).toBe(50);
        }));

        it('check ng-include support', inject(function ($templateCache) {
            $templateCache.put('include.html', '<isc-v-layout></isc-v-layout>');
            elm = compileDirectiveTemplate('<isc-h-layout><ng-include src="\'include.html\'"></isc-h-layout>');
            var hl = elm.find('isc-h-layout');
            var ctrl = hl.controller('iscHLayout');
            expect(ctrl.control.members.length).toBe(1);
        }));

        it('check config object', inject(function ($rootScope) {
            $rootScope.config = {disabled: true};
            elm = compileDirectiveTemplate('<isc-button sc-config-object="config"></isc-button>');
            var btn = elm.find('isc-button');
            var ctrl = btn.controller('iscButton');
            expect(ctrl.control.isDisabled()).toBe(true);
        }));
    });
});