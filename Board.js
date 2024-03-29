(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
          var countRows = 0;
	      for(var j = 0; j <  this.get('n'); j ++){
		    countRows = countRows + this.attributes[rowIndex][j];
	      }
	      if(countRows > 1){
		      return true;
	      }
      return false; // fixme
    },

    hasAnyRowConflicts: function(){
      var n = this.get('n')
      var range = _.range(n);
      for(var i = 0; i < n; i++){
	      if(this.hasRowConflictAt(i)){
		      return true;
	      }
      }
      return false; // fixme
    },

    hasColConflictAt: function(colIndex){
      var n = this.get('n');
      var allRows = this.rows();
      var count = 0;
      for(var i = 0; i < n; i++){
	      count = count + allRows[i][colIndex]
      }
      if(count > 1){
		      return true;
	      }
      return false; // fixme
    },

    hasAnyColConflicts: function(){
      var n = this.get('n');
      for(var i = 0; i < n; i++){
	      if(this.hasColConflictAt(i)){
		      return true;
	      }
	      
      }
      return false; // fixme
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      var board = this.rows();
      var count = 0;
      for(var i = 0; i < board.length; i++){
	      for(var j = 0; j < board[i].length; j++){
		    var index = this._getFirstRowColumnIndexForMajorDiagonalOn(i,j);  
		    if(index=== majorDiagonalColumnIndexAtFirstRow && board[i][j]){
		      count ++;
	      }
	     }
      }
      return count > 1; // fixme
    },

    hasAnyMajorDiagonalConflicts: function(){
      var rows = this.rows();
      for(var i = (-rows.length+2); i < rows.length-2; i++){
	      if(this.hasMajorDiagonalConflictAt(i)){
		      return true;
	    }
      }
      return false;
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
     var board = this.rows();
      var count = 0;
      for(var i = 0; i < rows.length; i++){
	      for(var j = 0; j < rows[i].length; j++){
		    var index = this._getFirstRowColumnIndexForMajorDiagnolOn(r,c);  
		    if(index=== majorDiagnonalColumnIndexAtFirstRow && row[i][j]){
		      count ++;
	      }
	     } 
      }
      return count > 1; // fixme
    },

    hasAnyMinorDiagonalConflicts: function(){
      var rows = this.rows();
      for(var i = 1; i < rows.length+2; i++){
	      if(this.hasMajorDiagonalConflictAt(i)){
		      return true;
	    }
      }
      return false;
    },

  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
