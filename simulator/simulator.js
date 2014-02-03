var U = [{acc: 0.35, conf: 0.1}, {acc: 0.5, conf: 0.1}, {acc: 0.8, conf: 0.1}];
var A = [0, 3, 4];

var S = generateScores(U, A);

for (var i = 0; i < A.length; i++) {
	var answer = A[i];
	var p = [];
	for (var j = 0; j < S.length; j++) {
		var score = S[j];
		p[j] = [];
		for (var s = 0; s < 5; s++) {
			// Assumption: answers have uniformly distributed scores
			p[j][s] = 0.2 * probUserScores(U[score.user].acc, s, score.score) / probUserScoresOnAnyAnswer(U[score.user].acc, score.score);
		}
		console.log(p[j]);
	}
}

function generateScores(U, A) {
	function weightedProb(arr) {
		var rand = Math.random();
		var i = 0;
		var cumulative = arr[i];
		while (i < arr.length && (cumulative <= rand)) {
			i++;
			cumulative += arr[i];
		}
		return i;
	}

	var scores = [];
	// For each user
	for (var i = 0; i < U.length; i++) {
		var user = U[i];
		for (var j = 0; j < A.length; j++) {
			var sStar = A[j];
			var probUserGivesS = []
			for (var s = 0; s < 5; s++) {
				probUserGivesS[s] = probUserScores(user.acc, sStar, s);
			}
			scores.push({ans: j, user: i, score: weightedProb(probUserGivesS)});
		}
	}

	return scores;
}

function probUserScoresOnAnyAnswer(acc, s) {
	var result = 0;
	for (var i = 0; i < 5; i++) {
		// Assumption: answers are uniformly distributed
		result += 0.2 * probUserScores(acc, i, s);
	}
	return result;
}

// probUserScores(acc, sStar, s) = P(user with accuracy acc thinks an answer has score s when it has score sStar)
function probUserScores(acc, sStar, s) {
	function getDist(threeDist, acc) {
		//assert(acc >= 0.2 && acc <= 1);
		var result = [];
		for (var i = 0; i < 5; i++) {
			var compOne = function(acc) {
				return Math.max(0, (-10 * acc + 5)/3);
			}
			var compTwo = function(acc) {
				if (acc < 0.5) {
					return Math.max(0, (10 * acc -2)/3);
				} else {
					return -2 * acc + 2;
				}
			}
			var compThree = function(acc) {
				return Math.max(0, 2 * acc - 1);
			}
			result[i] = compOne(acc) * threeDist[0][i] +
							compTwo(acc) * threeDist[1][i] +
							compThree(acc) * threeDist[2][i];
		}
		return result;
	}

	var threeDistBySStar = [];
	threeDistBySStar[0] = [[0.2, 0.2, 0.2, 0.2, 0.2], [0.5, 0.3, 0.15, 0.04, 0.01], [1, 0, 0, 0, 0]];
	threeDistBySStar[1] = [[0.2, 0.2, 0.2, 0.2, 0.2], [0.22, 0.5, 0.18, 0.07, 0.03], [0, 1, 0, 0, 0]];
	threeDistBySStar[2] = [[0.2, 0.2, 0.2, 0.2, 0.2], [0.05, 0.2, 0.5, 0.2, 0.05], [0, 0, 1, 0, 0]];
	threeDistBySStar[3] = [[0.2, 0.2, 0.2, 0.2, 0.2], [0.03, 0.07, 0.18, 0.5, 0.22], [0, 0, 0, 1, 0]];
	threeDistBySStar[4] = [[0.2, 0.2, 0.2, 0.2, 0.2], [0.01, 0.04, 0.15, 0.3, 0.5], [0, 0, 0, 0, 1]];

	var dist = getDist(threeDistBySStar[sStar], acc);
	return dist[s];
}






// google.load("visualization", "1", {packages:["corechart"]});
// google.setOnLoadCallback(simulate);

// function simulate() {

// 	var populationSize = 6;
// 	var realPoints = [0,100,200, 500, 700, 1000];
// 	var measuredPoints = [2, 2, 2,2,2,2];
// 	var steps =100;
// 	var array = ['step'];
// 	var realPointsStrings = realPoints.map(function(i) { return ''+i; });
// 	array = array.concat(realPointsStrings);
// 	array = [array];

// 	for (var step = 0; step < steps; step++) {
// 		var correctScore = Math.random();
// 		var weightedScore = [];
// 		for (var j = 0; j < populationSize; j++) {
// 			var randomScore = Math.random();
// 			weightedScore[j] = (randomScore * (1000-realPoints[j]) + correctScore * realPoints[j])/1000;
// 			// console.log("Answer was "+correctScore+" and user with "+realPoints[j]+" points guessed "+weightedScore[j]);
// 		}
// 		for (var j = 0; j < populationSize; j++) {
// 			for (var k = j+1; k < populationSize; k++) {
// 				var diff = Math.abs(weightedScore[j] - weightedScore[k]);
// 				console.log(log(2,measuredPoints[k]));
// 				measuredPoints[j] += (0.334-diff)*log(2,measuredPoints[k]) * (1000-measuredPoints[j])/1000;
// 				measuredPoints[k] += (0.334-diff)*log(2,measuredPoints[j]) * (1000-measuredPoints[k])/1000;
// 				measuredPoints[j] = Math.max(measuredPoints[j], 2);
// 				measuredPoints[k] = Math.max(measuredPoints[k], 2);
// 			}
// 		}
// 		var tmp = [step];
// 		for (var j = 0; j < populationSize; j++) {
// 			tmp.push(measuredPoints[j]);
// 		}
// 		array.push(tmp);
// 	}

// 	console.log(array);

//   var data = google.visualization.arrayToDataTable(array);

//   var options = {
//     title: 'Points',
//     'height':1000
//   };

//   var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
//   chart.draw(data, options);
// }

// function log(b, n) {
//     return Math.log(n) / Math.log(b);
// }