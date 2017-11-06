export default function TagsInputDirective() {

    function TagList(options, events) {
        let self = {};

        self.items = [];
        self.selected = null;
        self.index = -1;

        self.add = tag => {
            let tagText = getTagText(tag);
            setTagText(tag, tagText);
            self.items.push(tag);
        }

        self.remove = index => {
            let tag = self.items[index];
            self.items.splice(index, 1);
        }

        self.select = index => {
            self.index = index;
            self.selected = self.items[index];
        }

        self.reset = () => {
            self.selected = null;
            self.index = -1;
        }

        // tagText
        let getTagText = tag => tag[options.dispalyProperty];
        let setTagText = (tag, text) => {
            tag[options.dispalyProperty] = text;
        }

        // select 
        self.selectPrior = () => {
            self.select(--self.index);
        }

        self.selectNext = () => {
            self.select(++self.index);
        }

        // remove
        self.removeSelected = () => self.remove(self.index);

        // add 
        self.addText = text => {
            let tag = {};
            setTageText(tag, text);
            return self.add(tag);
        }

        return self;
    }

    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            tags: '=ngModel'
        },
        replace: false,
        transclude: true,
        templateUrl: 'ngTagsInput/tags-input.html',
        controller($scope, $element, $attrs) {

        },
        link(scope, element, attrs, ngModelCtrl) {
            let tagList = scope.tagList;
            let events = scope.events;
            let options = scope.options;
            let input = element.find('input');


        }
    }
}