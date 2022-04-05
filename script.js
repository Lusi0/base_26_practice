// BASE 26

// convert a number to a base 26 string
function base26(num) {
    // check if the number is negative
    if (num == 0) {
        return "A";
    } else {
        negitive = false;
        if (num < 0) {
            // if so, convert it to a positive number
            num = -num;
            negitive = true;
        }
        var str = "";
        while (num > 0) {
            str = String.fromCharCode(num % 26 + 65) + str;
            num = Math.floor(num / 26);
        }
        if (negitive) {
            str = "-" + str;
        }
        return str;
    }
}


// convert a base 26 string to a number
function base26_to_num(str) {
    // check if the string is negative
    negitive = false;
    if (str.charAt(0) == "-") {
        // if so, convert it to a positive number
        str = str.substr(1);
        negitive = true;
    }
    var num = 0;
    for (var i = 0; i < str.length; i++) {
        num = num * 26 + str.charCodeAt(i) - 65;
    }
    if (negitive) {
        num = -num;
    }
    return num;
}

// return a random base 26 number between min and max
function random_base26(min, max) {
    return base26(Math.floor(Math.random() * (max - min + 1)) + min);
}


// subtract two base 26 numbers
function base26_subtract(a, b) {
    return base26(base26_to_num(a) - base26_to_num(b));
}

function base26_add(a, b) {
    return base26(base26_to_num(a) + base26_to_num(b));
}

// randomly return - or +
function random_sign() {
    let signs = ["+", "-"];
    return signs[Math.floor(Math.random() * signs.length)];
}


score = 0;
smart_score = 0;

first_number = random_base26(0, 5);
second_number = random_base26(0, 5);
sign = random_sign();

function get_answer(a,b,s) {
    if (s == "+") {
        return base26_add(a,b);
    } else {
        return base26_subtract(a,b);
    }
}

answer = get_answer(first_number, second_number, sign);

function reset() {
    first_number = random_base26(0, 5);
    second_number = random_base26(0, 5);
    sign = random_sign();
    answer = get_answer(first_number, second_number, sign);
    selectElement.value = "";
    console.log(first_number, second_number, sign, answer);
    change_equasion();
}

// change the inner html of the span with class equasion
function change_equasion() {
    document.getElementsByClassName("equasion")[0].innerHTML = first_number + " " + sign + " " + second_number + " =";
}

change_equasion();


const selectElement = document.querySelector('#input');

selectElement.addEventListener('change', (event) => {
    //see if the input matches the answer
    text = selectElement.value;
    //make text uppercase
    text = text.toUpperCase();
    if (text == answer) {
        score++;
        smart_score++;
        reset();
    } else if (text != answer.length) {

    } else {
        smart_score--;
    }


});

// when the user mouses over the span with id the_equasion it will change the text to base 10
document.getElementById("the_equasion").addEventListener("mouseover", function () {
    document.getElementById("the_equasion").innerHTML = base26_to_num(first_number) + " " + sign + " " + base26_to_num(second_number) + " =";
});
// when you mouse out of the span with id the_equasion it will change the text to base 26
document.getElementById("the_equasion").addEventListener("mouseout", function () {
    document.getElementById("the_equasion").innerHTML = first_number + " " + sign + " " + second_number + " =";
});

