import { Component } from '@angular/core';

enum player{
  none='',
  X='X',
  O='O'
}
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  cells:player[]= new Array(9).fill(player.none);
  currentPlayer: player=player.X;
  winner:player|null=null;
  gameOver:boolean=false;
  count:number=0;
  countX:number=0;
  countO:number=0;

  makeMove(index:number):void{
    if(!this.cells[index]&& !this.gameOver){
      this.cells[index]=this.currentPlayer;
      this.checkWinner();
      this.currentPlayer=this.currentPlayer === player.X ? player.O :player.X;
    }
    
    if(this.winner){
      this.count++;
      alert(`player ${this.winner} winning` );
    }
    else if(this.gameOver){
      alert(`it is a draw`);
    }

    if(this.winner=='X'){
      this.countX++;
    }
    else if(this.winner=='O'){
      this.countO++;
    }
  }
  checkWinner():void {
    const winnerPositions:number[][]=[
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for(const [a,b,c] of winnerPositions){
      if(this.cells[a]!=player.none &&
         this.cells[a]===this.cells[b] &&
         this.cells[a]===this.cells[c]){
          this.winner=this.cells[a];
          this.gameOver=true;
          break;
         }
    }
  }
  reset():void{
    this.cells.fill(player.none);
    this.currentPlayer=player.X;
    this.winner=null;
    this.gameOver=false;
  }

  resetAll():void{
    this.cells.fill(player.none);
    this.currentPlayer=player.X;
    this.winner=null;
    this.gameOver=false;
    this.count=0;
    this.countO=0;
    this.countX=0;
  }
}
