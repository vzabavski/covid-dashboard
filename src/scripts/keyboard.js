import { searchInput, searchCountry } from "./cases.table.js"

document.querySelector('.btn-keyboard').addEventListener('click', () => {
    document.querySelector('.keyboard').classList.toggle('hidden')
})

const number = document.querySelectorAll('.btn');
const shift__btn = document.querySelector('.shift__btn');
const caps = document.querySelector('.caps');
const BackSpace = document.querySelector('.top__btn');
let CurrentLetter;
let Caps = false;
let Shift = false;
let arrEnShift = {
    "65": 'A', "66": 'B', "67": 'C', "68": 'D', "69": 'E', "70": 'F', "71": 'G',
    "72": 'H', "73": 'I', "74": 'J', "75": 'K', "76": 'L', "77": 'M', "78": 'N', "79": 'O',
    "80": 'P', "81": 'Q', "82": 'R', "83": 'S', "84": 'T', "85": 'U', "86": 'V', "87": 'W',
    "88": 'X', "89": 'Y', "90": 'Z', "186": ':', "188": '<', "190": '>', "219": '{', "221": '}',
    "191": '?', "192": '~', '32': " ", "49": '!', "50": '@', "51": '#', "52": '$',
    "53": '%', "54": '^', "55": '&', "56": '*', "57": '(', "48": ')', "189": '_', "187": '+', "13": '\n', "220": '|'
}

let arrEn = {
    "65": 'a', "66": 'b', "67": 'c', "68": 'd', "69": 'e', "70": 'f', "71": 'g',
    "72": 'h', "73": 'i', "74": 'j', "75": 'k', "76": 'l', "77": 'm', "78": 'n', "79": 'o',
    "80": 'p', "81": 'q', "82": 'r', "83": 's', "84": 't', "85": 'u', "86": 'v', "87": 'w',
    "88": 'x', "89": 'y', "90": 'z', "186": ';', "188": ',', "190": '.', "219": '[', "221": ']',
    "222": '\'', "191": '/', "192": '`', '32': " ", "49": '1', "50": '2', "51": '3', "52": '4',
    "53": '5', "54": '6', "55": '7', "56": '8', "57": '9', "48": '0', "189": '-', "187": '=', "13": '\n', "220": '\\'
}

// to fill the buttuns
function buttonTxt() {
    number.forEach(function (num) {
        let ButtonText
        if (Shift === false && Caps === false) {
            ButtonText = arrEn[num.attributes[0].value]
        } else if (Shift === true && Caps === true) {
            ButtonText = arrEnShift[num.attributes[0].value].toLowerCase()
        } else if (Shift === true && Caps === false) {
            ButtonText = arrEnShift[num.attributes[0].value]
        } else if (Shift === false && Caps === true) {
            ButtonText = arrEn[num.attributes[0].value].toUpperCase()
        }
        num.innerHTML = ButtonText
        document.querySelector(".space__btn").innerHTML = "Space"
        document.querySelector(".top__btn").innerHTML = "Back"
        return num.innerHTML
    })
}
buttonTxt()
//Add eventhandler to buttons
number.forEach(function (num) {
    num.addEventListener('click', function (arg) {
        clearProp();
        let letterNum = arg.target.attributes[0].value;
        numberFunc(letterNum);

    });
});
let numberFunc = (number) => {
    searchInput.focus()
    let tempLetter;
    if (Shift === true) {
        for (let key in arrEnShift) {
            if (number === key) {
                tempLetter = arrEnShift[key];
                CurrentLetter = tempLetter;
            }
        }
    } else if (Shift === false) {
        for (let key in arrEn) {
            if (number === key) {
                tempLetter = arrEn[key];
                CurrentLetter = tempLetter;
            }
        }
    }

    curString()
}

// Sharing event with the screen
function curString() {
    let tempLetter = CurrentLetter;
    if (Caps === true && Shift === false) {
        searchInput.value += tempLetter.toUpperCase();
    }
    else if (Caps === true && Shift === true) {
        searchInput.value += tempLetter.toLowerCase();
    } else if (Shift === true && Caps === false) {
        searchInput.value += tempLetter.toUpperCase();
    }
    else if (Caps === false && Shift === false) {
        searchInput.value += tempLetter;
    }
    searchCountry(searchInput.value)
}



function clearProp() {
    number.forEach(number => number.classList.remove('key-press'))
}

// CapsLock
function capsFunc() {
    searchInput.focus()
    if (Caps === false) {
        Caps = true;
        buttonTxt()
        document.querySelector(".caps").style.border = "3px solid #FE8E25";
    } else if (Caps === true) {
        Caps = false;
        buttonTxt()
        document.querySelector(".caps").style.border = "1px solid #388663";
    }
    return Caps
}
//Shift
function shiftFunc() {
    buttonTxt()
    searchInput.focus()
    if (Shift === false) {
        document.querySelector(".shift__btn").style.border = "3px solid #FE8E25";
        Shift = true;
        buttonTxt()
    } else if (Shift === true) {
        document.querySelector(".shift__btn").style.border = "1px solid #388663";
        Shift = false;
        buttonTxt()
    }
}
// BackSpasce
function backSp() {
    searchInput.focus()
    if (searchInput.textLength === searchInput.selectionEnd) {
        searchInput.value = searchInput.value.slice(0, searchInput.selectionEnd - 1)
    } else {
        searchInput.value = searchInput.value.slice(0, searchInput.selectionEnd - 1) + searchInput.value.slice(searchInput.selectionEnd);
    }
    searchCountry(searchInput.value)
}
BackSpace.addEventListener('click', backSp);
shift__btn.addEventListener('click', shiftFunc);
caps.addEventListener('click', capsFunc);
