import * as angular from 'angular';
import TagsInputDirective from './tags-input';
import TemplateCacheRegister from 'compiled-templates';

angular.module('ngTagsInput', [])
    .directive('tagsInput', TagsInputDirective)
    .run(TemplateCacheRegister);