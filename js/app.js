'use strict';

// Declare app level module which depends on filters, and services
angular.module('ieee', [
  'ngRoute',
  'ieee.filters',
  'ieee.services',
  'ieee.directives',
  'ieee.controllers'
]);


settings = {
	// all user inputted
	weights: {
		grade : [0, 0, 0, 0, 0],
		major : 0,
		company : 0, // the choice of the student matches
		fulltime : 0, /* Bonus given for seniors and grads matching full times*/
		intern : 0 /* Bonus given for sophomores and juniors matching interns*/
	}
}

students = [];
companies = [];

/* Class for Student */

function Student(name){
	this.name = name || '';
	this.phone_number = '';
	this.grade = "";
	this.major = "";
	this.food = "";
	this.company = "";
}

/* Class for Company */

function Company(name){
	this.name = name || '';
	this.number = 0;
	this.reps = ''; // Array of objects with attribute name and food
	this.major = '';
	this.food = '';
	this.recruiting = "";
}


function match (student, company){
	weight = 0;


	switch (student.grade){
		case "Freshman":
			weight +=  settings.weights.grade[0];
			break;
		case "Sophomore":
			weight += settings.weights.grade[1];
			break;
		case "Junior":
			weight +=  settings.weights.grade[2];
			break;
		case "Senior":
			weight += settings.weights.grade[3];
			break;
		case "Graduate Student":
			weight += settings.weights.grade[4];
			break;
	}

	for (key in company.majors){
		if (student.major == company.major[keys]){
			weight += settings.weights.major;
		}
	}

	if (student.company == company.name){
		weight += settings.weights.company;
	}

	if ((student.grade == "Senior" || student.grade == "Graduate Student") && company.recruiting == "Full Time"){
		weight += settings.weights.fulltime;
	}

	if ((student.grade == "Junior" || student.grade == "Sophomore") && company.recruiting == "Internship"){
		weight += settings.weights.intern;
	}

	return weight;
}


$(document).ready(function() {
	current_student = false;
	current_company = false;
	current_index = 0;

	$("#student-edit").hide();
	$("#company-edit").hide();

	/* UI Changes */
	$("#student-add").click(function(){
		students.push(new Student("New Student"));
		var leng = (students.length - 1).toString();
		$("#student-selector-input").html($("#student-selector-input").html() + "<option class='student' value='" + leng + "'>New Student</option>");
		$("#student-selector-input option").click(function(){
			current_index = parseInt($("#student-selector-input")[0].options[$("#student-selector-input")[0].selectedIndex].value);
			current_student = students[current_index];
			$("#company-edit").hide();
			$("#student-edit").show();
			$("#student-name").val(current_student.name);
			$("#phone-number").val(current_student.phone_number);
			$("select[name=class]").val(current_student.grade);
			$("select[name=major]").val(current_student.major);
			$("select[name=food]").val(current_student.food);

			htmlstr = '';
			for (i = 0; i < companies.length; i++){
				htmlstr += "<option class='company' value='" + i.toString() + "'>" + companies[i].name + "</option>";
			}
			$("select[name=student-choice]").html(htmlstr);
			$("select[name=student-choice]").val(current_student.company);

			$("#student-submit").click(function(){
				console.log("Working!");
				current_student.name = $("#student-name").val();
				current_student.phone_number = $("#phone-number").val();
				current_student.grade = $("select[name=class]").val();
				current_student.major = $("select[name=major]").val();
				current_student.food = $("select[name=food]").val();

				students[current_index] = current_student;

				//update the parent select thing
				htmlstr = '';
				for (i = 0; i < students.length; i++){
					htmlstr += "<option class='student' value='" + i.toString() + "'>" + students[i].name + "</option>";
				}
				$("#student-selector-input").html(htmlstr);
			});

		});
	});

	$("#company-add").click(function(){
		companies.push(new Company("New Company"));
		var leng = (companies.length - 1).toString();
		$("#company-selector-input").html($("#company-selector-input").html() + "<option class='company' value='" + leng + "'>New Company</option>");
		$("#company-selector-input option").click(function(){
			console.log("Stuff is working");
			current_index = parseInt($("#company-selector-input")[0].options[$("#company-selector-input")[0].selectedIndex].value)
			current_company = companies[current_index];
			$("#company-edit").show();
			$("#student-edit").hide();
			$("#company-name").val(current_company.name);
			$("#company-number").val(current_company.number);
			$("#company-names").val(current_company.reps);
			$("select[name=company-type]").val(current_company.recruiting);
			$("select[name=company-major]").val(current_company.major);
			$("select[name=company-food]").val(current_company.food);

			$("#company-submit").click(function(){
				console.log("Working company!");
				current_company.name = $("#company-name").val();
				current_company.number = $("#company-number").val();
				current_company.reps = $("#company-names").val();
				current_company.recruiting = $("select[name=company-type]").val()
				current_company.major = $("select[name=company-major]").val()
				current_company.food = $("select[name=company-food]").val()
				companies[current_index] = current_company;
			});
		});
	
	});
});

