'use strict';

// Declare app level module which depends on filters, and services
angular.module('ieee', [
  'ngRoute',
  'ieee.controllers'
]);

// el = angular.element($("#input"))
// $scope = el.scope();
//


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

// for testing only
		$scope.model = {
	        selectedCategory: {},
	        categories: [
	            {title: "Cat1"},
	            {title: "Cat2"},
	            {title: "Joseph"}
	        ]
	    }
	    //init
	    $scope.model.selectedCategory = $scope.model.categories[0];





		$scope.edit = false; // should be either "student", "company", or false
		// used by the ng-show to show the relevant editing thing
		$scope.students = [new Student()];
		$scope.companies = [new Company()];

		$scope.currentstudent = $scope.students[0];
		$scope.currentcompany = $scope.companies[0];
		// when the currently selected item changes, we need to update $scope.edit
		// $scope.$watch(
		// 	"currentstudent",
		// 	function(newValue) {
		// 		$scope.edit = "student";
		// 	}
		// );
		// $scope.$watch(
		// 	"currentcompany",
		// 	function(newValue) {
		// 		$scope.edit = "company";
		// 	}
		// );
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

		// Still need to put in the saving student information (basically update)
		// the students list with the currentstudent value
	}]);
