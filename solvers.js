// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var number = n;
  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };
  var solution = makeEmptyMatrix(number);
  var incrementOver = 0;
  for(var i = 0; i < number; i++){
	  solution[i][incrementOver] = 1;
	  incrementOver++;
  }
  console.log('Single solution for ' + n + ' rooks:', solution);
  displayBoard(solution)
  return solution;
};

window.countNRooksSolutions = function(n){
  var number = n;
  var solutionCount = 1; //fixme
    for (var i = 2; i <= number; i++){
	    solutionCount = solutionCount * i;
    }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
