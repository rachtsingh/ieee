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
			this.number = 1;
			this.reps = ''; // Array of objects with attribute name and food
			this.majors = '';
			this.food = '';
			this.recruiting = "";
		}

		// Various utility variables
		$scope.answered = false;
		$scope.settings_shown = false;
		$scope.toggleSettings = function(){
			$scope.settings_shown = !($scope.settings_shown);
		}
		$scope.settings = {
			// all user inputted
			weights: {
				grade : [1, 2, 7, 4, 0],
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

		$scope.match  = function(student, company){
			var weight = 0;
			switch (student.grade){
				case "Freshman":
					weight +=  $scope.settings.weights.grade[0];
					break;
				case "Sophomore":
					weight += $scope.settings.weights.grade[1];
					break;
				case "Junior":
					weight +=  $scope.settings.weights.grade[2];
					break;
				case "Senior":
					weight += $scope.settings.weights.grade[3];
					break;
				case "Graduate Student":
					weight += $scope.settings.weights.grade[4];
					break;
			}

			for (key in company.majors){
				if (student.major == company.major[keys]){
					weight += $scope.settings.weights.major;
				}
			}

			if (student.company == company.name){
				weight += $scope.settings.weights.company;
			}

			if ((student.grade == "Senior" || student.grade == "Graduate Student") && company.recruiting == "Full Time"){
				weight += $scope.settings.weights.fulltime;
			}

			if ((student.grade == "Junior" || student.grade == "Sophomore") && company.recruiting == "Internship"){
				weight += $scope.settings.weights.intern;
			}

			return weight;
		}

		$scope.calculate = function(){
			$scope.edit = true;
			console.log("Calculating!");
			// create the affinity array
			var affinity = [];
			$scope.answer = [];
			$scope.map = [];

			for (var i = 0; i < $scope.students.length; i++){
				affinity.push([]);
				$scope.answer.push([]);
				for (var j = 0; j < $scope.companies.length; j++){
					//
					var af = $scope.match($scope.students[i], $scope.companies[j]);
					try {
						for (var c = 0; c < $scope.companies[j].number; c++){
							$scope.map.push($scope.companies[j]);
							affinity[i].push(af); // reversing the weights
							$scope.answer[i].push(0);
						}
					}
					catch(e){
						alert("There's an invalid value!");
					}
				}
			}

			// pad the tables and stuff
			if (affinity[0].length > affinity.length){
				for (var i = affinity.length; i < affinity[0].length; i++){
					affinity.push([]);
					for (var j = 0; j < affinity[0].length; j++){
						affinity[i].push(0);
					}
				}
			}

			window.affinity = affinity;
			console.log(affinity);


			var env = {
				students: affinity.length,
				companies: affinity[0].length,
				log: function log (message) {
					console.log('Message from Lua: ' + message);
				},
				get_value: function get_value (i, j){
					return window.affinity[i-1][j-1];
				},
				put_value: function put_value(i, j){
					console.log("Putting value! ", i, j);
					$scope.answer[i] = j;
				},
				show_answer: function show_answer(){
					console.log("WORKING!");
					$scope.answered = true;
					$("#displayanswers")
					for (var i = 0; i < $scope.students.length; i++){
						$scope.students[i].finalcompany = $scope.map[$scope.answer[i]];
					}
					$scope.$apply();
				}
			};

			var vm = new shine.VM(env);
			var companyCostMatrix = new shine.Table(affinity);
			vm.load('./lua/hungarian.lua.json');
		}

		$scope.CSVToArray = function(strData, strDelimiter ){
	    	strDelimiter = (strDelimiter || ",");
	    	var objPattern = new RegExp(
	    		(
	    			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
	    			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
	    			"([^\"\\" + strDelimiter + "\\r\\n]*))"
	    		),
	    		"gi"
	    		);
	    	var arrData = [[]];
	    	var arrMatches = null;
	    	while (arrMatches = objPattern.exec( strData )){
	    		var strMatchedDelimiter = arrMatches[ 1 ];
	    		if (
	    			strMatchedDelimiter.length &&
	    			(strMatchedDelimiter != strDelimiter)
	    			){
	    			arrData.push( [] );
	    		}
	    		if (arrMatches[ 2 ]){
	    			var strMatchedValue = arrMatches[ 2 ].replace(new RegExp( "\"\"", "g" ),"\"");
	    		} else {
	    			var strMatchedValue = arrMatches[ 3 ];
	    		}
	    		arrData[ arrData.length - 1 ].push( strMatchedValue );
	    	}
	    	return( arrData );
	    }

	    $scope.parseCSV = function(text){
	    	var array = $scope.CSVToArray(text, ',');
	    	if (array[0] == 'student'){
	    		for (var i = 1; i < array.length; i++){
	    			$scope.parseStudent(array[i]);
	    		}
	    	}
	    	else if (array[0] == 'company'){
	    		for (var i = 1; i < array.length; i++){
	    			$scope.parseCompany(array[i]);
	    		}
	    	}
	    }

	    $scope.parseStudent = function(array){
	    	var stud = new Student;
	    	stud.name = array[0];
	    	stud.phone_number = array[1];
	    	stud.grade = $scope.grades.indexOf(array[2]) == -1 ? '' : array[2];
	    	stud.major = $scope.majors.indexOf(array[3]) == -1 ? '' : array[3];
	    	stud.food = $scope.foodoptions.indexOf(array[4]) == -1 ? '' : array[4];
	    	for (var i = 0; i < $scope.companies.length; i++){
	    		if (array[5] == $scope.companies[i].name){
	    			stud.company = $scope.companies[i];
	    		}
	    	}
	    	console.log(stud);
	    	$scope.students.push(stud);
	    	$scope.$apply();
	    }

	    $scope.parseCompany = function(array){

	    }

		// Still need to put in the saving student information (basically update)
		// the students list with the currentstudent value
	}])
.directive('fileUpdater', function() {
  return {
    restrict: 'A',
    link: function($scope, elem, attr) {
      elem.bind('change', function(e) {
      	var f = document.getElementById("filenode").files[0];
      	console.log(f.__proto__ == File.__proto__);
      	var reader = new FileReader();
      	reader.onload = function(e){
      		$scope.parseCSV(reader.result);
      	}
      	reader.readAsText(f);
      });
    }
  };
})
.directive('beautifulSelect', function() {
  return {
    restrict: 'A',
    link: function($scope, elem, attr) {
      elem.selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    }
  };
})
.directive('phoneNumber', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
       	var re = /(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}/;
       	var valid = re.exec(inputValue);
       	if (!valid){
       		element.addClass("has-error");
       	}
        return inputValue;         
       });
     }
   };
});
