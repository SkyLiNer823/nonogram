const row = document.getElementById("row")
const col = document.getElementById("col")
const confirmBtn = document.getElementById("confirmBtn")
const board = document.getElementById('board')

function colCount(rowNum, colNum, ansArray) {
    for (let i = 0; i < colNum; i++) {
        let numArray = new Array();
        let colArray = new Array();
        count = 0;
        for (let j = 0; j < rowNum; j++)
            colArray.push(ansArray[j][i])
        for (let j = 0; j < colArray.length; j++) {
            if (colArray[j] == 1) {
                count += 1;
            } else {
                if (count == 0)
                    continue;
                else {
                    numArray.push(count);
                    count = 0;
                }
            }
        }
        if (count != 0)
            numArray.push(count);
        let times = 0;
        for (let k = 0; k < numArray.length; k++) {
            document.getElementById(`Col${i+1}`).innerText += numArray[k];
        }
    }
}

function rowCount(rowNum, colNum, ansArray) {
    for (let i = 0; i < rowNum; i++) {
        let numArray = new Array();
        count = 0;
        for (let j = 0; j < colNum; j++) {
            if (ansArray[i][j] == 1) {
                count += 1;
            } else {
                if (count == 0)
                    continue;
                else {
                    numArray.push(count);
                    count = 0;
                }
            }
        }
        if (count != 0)
            numArray.push(count);
        for (let k = 0; k < numArray.length; k++) {
            document.getElementById(`Row${i+1}`).innerText += numArray[k];
        }
    }

}

function check(rowNum, colNum, ansArray) {
    let s = 0;
    for (let i = 0; i < rowNum; i++) {
        for (let j = 0; j < colNum; j++) {
            if (ansArray[i][j] == 1) {
                s = 1;
                break;
            }
        }
    }
    if (s == 0) {
        alert("恭喜你找出所有黑塊!!!");
    }
}


confirmBtn.addEventListener("click", function() {
    rowNum = parseInt(row.value);
    colNum = parseInt(col.value);
    board.innerHTML = ''
    for (let i = 0; i < rowNum + 1; i++) {
        for (let j = 0; j < colNum + 1; j++) {
            if (i == 0 && j == 0) {
                board.innerHTML += `<button class="hiddenBtn"></button>`;
            } else if (i == 0) {
                board.innerHTML += `<button class="hintBtn" id="Col${j}"></button>`;
            } else if (j == 0) {
                board.innerHTML += `<button class="hintBtn" id="Row${i}"></button>`;
            } else {
                board.innerHTML += `<button class="pressBtn" id="${i}x${j}"></button>`;
            }
        }
    }
    let ansArray = new Array(); //先宣告一維
    for (let i = 0; i < rowNum; i++) {
        ansArray[i] = new Array(); //宣告二維
        for (let j = 0; j < colNum; j++) {
            let randNum = Math.floor(Math.random() * 10);
            if (randNum <= 5)
                ansArray[i][j] = 1;
            else
                ansArray[i][j] = 0;
        }
    }
    rowCount(rowNum, colNum, ansArray);
    colCount(rowNum, colNum, ansArray);
    let pressBtn = document.getElementsByClassName("pressBtn");
    for (let i = 0; i < pressBtn.length; i++) {
        pressBtn[i].addEventListener("click", function() {
            const btnRow = Math.floor(i / colNum);
            const btnCol = i % colNum;
            if (ansArray[btnRow][btnCol] == 1) {
                this.style.backgroundColor = "black";
                ansArray[btnRow][btnCol] = 0;
                check(rowNum, colNum, ansArray);
            } else {
                if (this.style.backgroundColor != "black") {
                    this.style.backgroundColor = "red";
                    this.innerHTML = "X"
                }
            }
        })
    }
    board.style.cssText = `width: ${(colNum+1)*40}px; height: ${(rowNum+1)*40}px;`;
})
