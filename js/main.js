var player, game_table;

	$(document).ready(function() {
		
		new_game();

		print_turn(player)
		var table = $("#game_table");		

		for (var y = 0; y < 19; y++) {
			let tr = document.createElement('tr');
			for (var x = 0; x < 19; x++) {
				let td = document.createElement('td');
				td.setAttribute('data-x', x);
				td.setAttribute('data-y', y);
				td.setAttribute('onclick', "turn("+x+","+y+")");		
				tr.append(td);		
			}
			table.append(tr);
		}

		// $("td[data-y='2'").html(22);
	})


	function print_turn (player) {
		$("p[name='turn'").html("Сейчас ход:" + type_of_cell(player));
	}

	function new_game() {
		player = 1;

		game_table = [];
		for (var i = 0; i<19; i++) {
			var row = [];
			for (var j = 0; j<19; j++) {
				row[j] = 0;
			}
			game_table[i] = row;
		}
	}


	function turn(x,y) {
		if (game_table[y][x] == 0) {			
			game_table[y][x] = player;		
			draw_table();
			player = -player;
			print_turn(player);
			find_winner();					
		}
	}

	function draw_table() {
		for (var i = 0; i<19; i++) {
			for (var j = 0; j<19; j++) {				
				$("td[data-x='"+i+"'][data-y='"+j+"'").html(type_of_cell(game_table[j][i]));		
			}			
		}
	}

	function type_of_cell(player) {
		switch (player) {
			case 1 :
				return "X";
				break;
			case -1 :
				return "O";
				break;
			case 0 :
				return "";
				break;
		}
	}


	function find_winner() {

		var winner = find_row() + find_col() + find_left_diag() + find_right_diag();

		if (winner != 0) {
			
			if (winner>0) {
				alert("Выиграли крестики");	
			
			} else if (winner<0) {
				alert("Выиграли нолики");
			
			}

			var game = confirm("Начать новую игру?");

			if (game) {
				new_game();
				draw_table();
			} else {
				game = confirm("Начать новую игру?");
			}
		}		

		


		// console.log('row: '+find_row());
		// console.log('col: '+find_col());
		// console.log('left_diag: '+find_left_diag());
		// console.log('right_diag: '+find_right_diag());
	}

	function find_row() {		
		for (var row = 0; row < 19; row++) {

			for (var i = 0; i < 19-4; i++) {
				var sum=0;				
				for (var a = i; a<i+5; a++) {
					sum += game_table[row][a];					
				}
				if (Math.abs(sum) === 5) {
					return sum;
				}
			}
		}
		return 0;
	}

	function find_col() {		
		for (var col = 0; col < 19-4; col++) {

			for (var i = 0; i < 19; i++) {
				var sum=0;
				for (var a = col; a<col+5; a++) {					
					sum += game_table[a][i];					
				}
				if (Math.abs(sum) === 5) {
					return sum;
				}
			}
		}
		return 0;
	}

	function find_left_diag() {		
		for (var col = 0; col < 19-4; col++) {

			for (var i = 0; i < 19-4; i++) {
				var sum=0;
				for (var a = 0; a<5; a++) {					
					sum += game_table[col+a][i+a];					
				}
				if (Math.abs(sum) === 5) {
					return sum;
				}
			}
		}
		return 0;
	}

	function find_right_diag() {		
		for (var col = 0; col < 19-4; col++) {

			for (var i = 0+4; i < 19; i++) {
				var sum=0;
				for (var a = 0; a<5; a++) {					
					sum += game_table[col+a][i-a];					
				}
				if (Math.abs(sum) === 5) {
					return sum;
				}
			}
		}
		return 0;
	}