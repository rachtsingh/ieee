'use strict';

// Declare app level module which depends on filters, and services
angular.module('ieee', [
  'ngRoute',
  'ieee.controllers'
]);

// Utility for the sliders
$.fn.addSliderSegments = function (amount, orientation) {    
  return this.each(function () {
    if (orientation == "vertical") {
      var output = ''
        , i;
      for (i = 1; i <= amount - 2; i++) {
        output += '<div class="ui-slider-segment" style="top:' + 100 / (amount - 1) * i + '%;"></div>';
      };
      $(this).prepend(output);
    } else {
      var segmentGap = 100 / (amount - 1) + "%"
        , segment = '<div class="ui-slider-segment" style="margin-left: ' + segmentGap + ';"></div>';
      $(this).prepend(segment.repeat(amount - 2));
    }
  });
};


/* Controllers */
angular.module('ieee.controllers', [])
	.controller('SettingsCtrl', [function() {

	}])
	.controller('MainCtrl', ['$scope', function($scope) {
		// "Classes"
		function Student(name){
			this.name = name || 'New Student';
			this.phone_number = '';
			this.grade = "";
			this.major = "";
			this.food = "";
			this.company = ""; // this is a company object
		}
		function Company(name){
			this.name = name || 'New Company';
			this.number = 0;
			this.reps = ''; // Array of objects with attribute name and food
			this.major = '';
			this.food = '';
			this.recruiting = "";
		}

		// Various utility variables
		$scope.settings_shown = false;
		$scope.toggleSettings = function(){
			console.log("Woring?");
			$scope.settings_shown = !($scope.settings_shown);
		}
		$scope.settings = {
			// all user inputted
			weights: {
				grade : [0, 0, 0, 0, 0],
				major : 0,
				company : 0, // the choice of the student matches
				fulltime : 0, /* Bonus given for seniors and grads matching full times*/
				intern : 0 /* Bonus given for sophomores and juniors matching interns*/
			}
		}

		$scope.edit = false; // should be either "student", "company", or false
		// used by the ng-show to show the relevant editing thing
		$scope.students = [new Student()];
		$scope.companies = [new Company()];

		$scope.currentstudent = $scope.students[0];
		$scope.currentcompany = $scope.companies[0];
		
		$scope.editStudent = function(){
			$scope.edit = 'student';
		}
		$scope.editCompany = function(){
			$scope.edit = 'company';
		}
		// be able to add new students
		$scope.addStudent = function(){
			$scope.students.push(new Student());
			$scope.currentstudent = $scope.students[$scope.students.length - 1];
		}
		$scope.addCompany = function(){
			$scope.companies.push(new Company());
			$scope.currentcompany = $scope.companies[$scope.companies.length - 1];
		}

		$scope.deleteStudent = function(){
			var ind = $scope.students.indexOf($scope.currentstudent);
			$scope.students[ind] = $scope.currentstudent;
		}
		$scope.deleteCompany = function(){
			var ind = $scope.companies.indexOf($scope.currentcompany);
			$scope.companies[ind] = $scope.currentcompany;
		}

		// options for students and select boxes
		$scope.grades = [
			"Freshman",
			"Sophomore",
			"Junior",
			"Senior"
		];

		$scope.majors = [
			"EE",
			"CptE",
			"CptS",
			"CE",
			"ME"
		];

		$scope.foodoptions = [
			"Beef",
			"Chicken",
			"Vegetarian"
		];

		// options for the companies and select boxes
		$scope.recruiting = [
			"Internship",
			"Full Time"
		];

		$scope.calculate = function(){
			$scope.edit = true;
			console.log("Calculating!");
		}

		// Still need to put in the saving student information (basically update)
		// the students list with the currentstudent value
	}]);
