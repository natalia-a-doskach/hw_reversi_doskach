import './App.css';
import React, { useState } from 'react';
import Row from './components/Row'
import BlackCounter from './components/pieces/BlackCounter'
import WhiteCounter from './components/pieces/WhiteCounter'

function App() {
  const [title, setTitle] = useState("you're playing with white counters, your opponent - with black ones");
  const [score, setScore] = useState([0,0]);
  const [data, setData] = useState([
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, WhiteCounter, BlackCounter, null, null, null],
      [null, null, null, BlackCounter, WhiteCounter, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ]);

  function isEnd(){
    let whiteCnt = 0;
    let blackCnt = 0;
    data.forEach(row => row.forEach(el => {
      if(el == WhiteCounter) whiteCnt++
      else if (el == BlackCounter) blackCnt++
  }))
   if(whiteCnt + blackCnt == 64 || whiteCnt == 0 || blackCnt == 0)
   return true;

}
function isOnBoard(x,y){
  if(x > 7 || x < 0 || y > 7 || y < 0){
      // console.log(x,y,"not on board")
      return false
  }
  // console.log(data,x,y)
  if(data[x][y] == null){
    // console.log(x,y," is empty")
    return false;
  }
  return true;
}
function isOtherTile(xNext,yNext,counter){
  if(data[xNext][yNext] == WhiteCounter && counter == BlackCounter ||
  data[xNext][yNext] == BlackCounter  && counter == WhiteCounter){
      return true;
  }
  console.log("not other tiles:",data[xNext][yNext],counter);
  return false;
}

function isOk(x,y,myCounter) {
console.log(x,y,"isOK?")
let tilesToFlip = [];
let directions = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
if(data[x][y]  != null){
  console.log("square is taken")
  return false;
}
for (var n = 0; n < directions.length; n++) {
let xdirection = directions[n][0];
let ydirection = directions[n][1];
let xNext = x + xdirection
let yNext = y + ydirection
// console.log("direction",xdirection,ydirection)
if(isOnBoard(xNext, yNext) && isOtherTile(xNext,yNext,myCounter)){
   //There is a piece belonging to the other player next to our piece.
   xNext +=xdirection
   yNext +=ydirection
   if(!isOnBoard(xNext, yNext)){
           continue
   }
   while (isOtherTile(xNext,yNext,myCounter)){
     xNext +=xdirection
     yNext +=ydirection
     if(!isOnBoard(xNext, yNext)){
             break
     }
   }
   if(!isOnBoard(xNext, yNext)){
          continue
   }
   if(!isOtherTile(xNext,yNext,myCounter)){
    while(true){
      xNext -=xdirection
      yNext -=ydirection
      if(xNext == x && yNext == y)
        break;
      tilesToFlip.push([xNext,yNext]);
     }
   }
}
};
if(tilesToFlip.length == 0){
    return false;
}
return tilesToFlip;
}

function flip(row,column,tilesToFlip,counter){
  console.log("lets flip");
  data[row][column] = counter;
  tilesToFlip.forEach((item, i) => {
  console.log(item)
  data[item[0]][item[1]] = counter;
  });
}

  function handleClick(row,column) {
    row=8-row;
    let tilesToFlip = isOk(row,column,WhiteCounter);
    console.log(tilesToFlip)
    if(tilesToFlip == false){
      setTitle("cannot move here")
      return;
    }
    else{
    flip(row,column,tilesToFlip,WhiteCounter);
    score[0]+=tilesToFlip.length;
    }
if(isEnd())
  setTitle("game is over!")
else {
}
//pc moving
setTitle("now your opponent moves...")
setTimeout(pcMoves, 1000);
}

function pcMoves(){
  let tilesToFlipBest = [];
  let tilesToFlip = [];
  let moveBest = [-1,-1];
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      console.log("pc tries",i,j)
      tilesToFlip = isOk(i,j,BlackCounter);
      if(tilesToFlip)
        console.log("pc may flip:"+tilesToFlip)
      if(tilesToFlip && tilesToFlipBest.length < tilesToFlip.length){
      tilesToFlipBest = tilesToFlip;
      moveBest = [i,j];
      }
    }
  }
  console.log("pc flips:"+tilesToFlipBest)
  if(tilesToFlipBest.length == 0){
    setTitle("game is over!")
  }
  else{
    flip(moveBest[0],moveBest[1],tilesToFlipBest,BlackCounter);
    score[1]+=tilesToFlipBest.length;
    setTitle("your turn")
  }
}

  return (
    <div className="App-header">
    <h2>{score[0]}:{score[1]}</h2>
    <p>{title}</p>
    <table className='no-border'>
      <thead>
        <tr><th></th><th>a</th><th>b</th><th>c</th><th>d</th><th>e</th><th>f</th><th>g</th><th>h</th><th></th></tr>
      </thead>
      <tbody>
        {data.map((rowData, index) => {
          const number = data.length - index

          return <Row key={number.toString()} number={number} data={rowData} onClick={handleClick} />
        })}
      </tbody>
      <tfoot>
        <tr><th></th><th>a</th><th>b</th><th>c</th><th>d</th><th>e</th><th>f</th><th>g</th><th>h</th><th></th></tr>
      </tfoot>
    </table>
    </div>
  );
}

export default App;
