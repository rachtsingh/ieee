settings = {
	// all user inputted
	weights = {
		grade = [0, 0, 0, 0, 0],
		major = 0,
		company = 0, // the choice of the student matches
		fulltime = 0, /* Bonus given for seniors and grads matching full times*/
		intern = 0 /* Bonus given for sophomores and juniors matching interns*/
	}
}

/* Class for Student */

function Student(){
	this.name = '';
	this.phone_number = '';
	this.grade = "";
	this.major = "";
	this.food = ""
	this.company = "";
}

/* Class for Company */

function Company(){
	this.name = '';
	this.number = 0;
	this.reps = []; // Array of objects with attribute name and food
	this.majors = [];
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


