// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.addons.qtype_wordselect')

/**
 * Directive to render a Word Select question.
 *
 * @module mm.addons.qtype_wordselect
 * @ngdoc directive
 * @name mmaQtypeWordselect
 */
.directive('mmaQtypeWordselect', function($log, $mmQuestionHelper,$mmUtil) {
	$log = $log.getInstance('mmaQtypeWordselect');
    return {
        restrict: 'A',
        priority: 100,
        templateUrl: 'addons/qtype/wordselect/template.html',
        link: function(scope) {
            var answersEl, questionEl,
                inputIds = [],
                question = scope.question;

            if (!question) {
                $log.warn('Aborting because of no question received.');
                return $mmQuestionHelper.showDirectiveError(scope);
            }

            questionEl = angular.element(question.html);
            questionEl = questionEl[0] || questionEl;

            // Replace Moodle's correct/incorrect and feedback classes with our own.
            $mmQuestionHelper.replaceCorrectnessClasses(questionEl);
            $mmQuestionHelper.replaceFeedbackClasses(questionEl);

            // Treat the correct/incorrect icons.
            $mmQuestionHelper.treatCorrectnessIcons(scope, questionEl);

            question.readonly = angular.element(answersEl).hasClass('readonly');

            question.text = $mmUtil.getContentsOfElement(questionEl, '.qtext');
            question.introduction = $mmUtil.getContentsOfElement(questionEl, '.introduction');
            if (typeof question.text == 'undefined') {
                log.warn('Aborting because of an error parsing question.', question.name);
                return self.showDirectiveError(scope);
            }

            inputIdsEls = questionEl.querySelectorAll('input[type="hidden"]:not([name*=sequencecheck])');
            for (var x = 0; x < inputIdsEls.length; x++) {
                question.text += inputIdsEls[x].outerHTML;
                inputIds.push(inputIdsEls[x].getAttribute('id'));
            }

        }
    };
});
