const mapElement = document.querySelector("#map");
const map = [];
const directions = {
    w: "n",
    a: "w",
    s: "s",
    d: "e",
};
const moveSet = ["w", "a", "s", "d"];
const tokenSet = ["z", "x", "c", "v"];

const MAX = 19;
const MID = Math.floor(MAX / 2);

const cursorEle = document.querySelector("#cursor");
let cursor;
let first;

let confirmReset = false;
const confirmElement = document.createElement("div");
confirmElement.id = "confirmReset";
confirmElement.innerHTML = "reset?";
document.body.append(confirmElement);

const reset = (char) => {
    if (confirmReset) {
        confirmReset = false;
        confirmElement.className = "";
        if (char == 'r') {
            reset();
        }
        return;
    }
    mapElement.innerHTML = "";
    for (let i = 0; i < MAX; i++) {
        map[i] = [];
        for (let j = 0; j < MAX; j++) {
            map[i][j] = {};
            map[i][j].visited = false;
            const ele = document.createElement("div");
            ele.className = "gridEle";
            ele.id = "p" + i + "c" + j;
            if (i == MID && j == MID) {
                cursor = [i, j];

                map[i][j].visited = true;
            }
            mapElement.appendChild(ele);
        }
    }
    first = "null";
    confirmReset = false;
};

const mark = (key) => {
    let char;
    let color;
    if (key == "c") {
        char = "c";
        color = "lightgreen";
    }
    if (key == "x") {
        char = "x";
        color = "gold";
    }
    if (key == "z") {
        char = "z";
        color = "orangered";
    }

    let x = cursor[0];
    let y = cursor[1];
    if (key == "v") {
        map[x][y].token = null;
    } else {
        map[x][y].token = { char: char, color: color };
    }

}

const move = (key) => {
    let x = cursor[0];
    let y = cursor[1];
    if (key == "w") {
        if (map[x - 1] != undefined) {
            map[x - 1][y].visited = true;
            cursor[0] = x - 1;
        }
    }
    if (key == "s") {
        if (map[x + 1] != undefined) {
            map[x + 1][y].visited = true;
            cursor[0] = x + 1;
        }
    }
    if (key == "a") {
        if (map[x][y - 1] != undefined) {
            map[x][y - 1].visited = true;
            cursor[1] = y - 1;
        }
    }
    if (key == "d") {
        if (map[x][y + 1] != undefined) {
            map[x][y + 1].visited = true;
            cursor[1] = y + 1;
        }
    }
    if (first == "null") {
        first = directions[key];
    };
}

const updateCursor = () => {
    let x = MID - cursor[0];
    let y = MID - cursor[1];

    let xT = "";
    let yT = "";
    if (x > 0) { xT = "North " + x }
    if (x < 0) { xT = "South " + x * -1 }
    if (y > 0) { yT = "West " + y }
    if (y < 0) { yT = "East " + y * -1 }

    console.log([xT, yT]);

    cursorEle.innerHTML = "Position from Portal: " + [xT, yT].filter(e => e.length);
}

const update = () => {
    map.forEach((i, ini) => {
        i.forEach((j, jini) => {
            const ele = mapElement.querySelector("#p" + ini + "c" + jini);

            const x = cursor[0];
            const y = cursor[1];

            if (x == ini && y == jini) {
                ele.innerHTML = "[o]";
                ele.style.backgroundColor = "lightsalmon";
            } else if (ini == MID && jini == MID) {
                ele.innerHTML = "[" + first + "]";
                ele.style.backgroundColor = "aqua";
            } else if (
                map[ini][jini].token != undefined && map[ini][jini].token != null
            ) {
                const token = map[ini][jini].token;
                ele.innerHTML = "[" + token.char + "]";
                ele.style.backgroundColor = token.color;
            } else if (
                map[ini][jini].visited
            ) {
                ele.innerHTML = "[ ]";
                ele.style.backgroundColor = "violet";
            }
            else {
                if (ele != null) {
                    ele.innerHTML = "[ ]"
                }
            }

        });
    });
    updateCursor();
}

const askConfirm = () => {
    confirmElement.className = "confirmVisible";
};


const onKeydown = event => {
    const char = event.key;

    if (char == 'r' || confirmReset) {
        if (!confirmReset) {
            confirmReset = true;
            askConfirm();
        } else {
            reset(char);
            update();
            return;
        }
    }

    if (moveSet.find(e => e == char)) {
        move(char);
    }

    if (tokenSet.find(e => e == char)) {
        mark(char);
    }

    update();
}

document.body.addEventListener("keydown", onKeydown);

reset();
update();