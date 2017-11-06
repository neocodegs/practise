(function (angular) {
'use strict';

function TagsInputDirective() {

    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            tags: '=ngModel'
        },
        replace: false,
        transclude: true,
        templateUrl: 'ngTagsInput/tags-input.html',
        controller: function controller($scope, $element, $attrs) {},
        link: function link(scope, element, attrs, ngModelCtrl) {}
    };
}

TemplateCacheRegister.$inject = ["$templateCache"];
/*@ngInject*/
function TemplateCacheRegister($templateCache) {
    $templateCache.put('ngTagsInput/tags-input.html', "");
}

angular.module('ngTagsInput', []).directive('tagsInput', TagsInputDirective).run(TemplateCacheRegister);

}(angular));

//# sourceMappingURL=ng-tags-input.js.map