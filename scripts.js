function toDecimal(binary) {
  output = 0;
  var len = binary.length;
  for (var i=0; i<len; i++) {
    output = output + (Math.pow(2, (len-1-i))*(parseInt(binary.charAt(i))));
  }
  return output;
}

function toBinary(decimal) {
  return decimal.toString(2);
}

function decrypt(message) {
  var output = "";
  var loop = message.length/8;
  message = message+"x";
  for (var i=0; i<loop; i++) {
    var piece = message.slice((8*i), (8*(i+1)));
    while (piece.charAt(0) == "0") {
      piece = piece.slice(1, (piece.length));
    }
    output += String.fromCharCode(toDecimal(piece));
  }
  return output;
}

function encrypt(message) {
  var output = "";
  for (var i=0; i<message.length; i++) {
    var binChar = toBinary(message.charCodeAt(i));
    var len = binChar.length;
    for (var j=0; j<(8-len); j++) {
      binChar = "0"+binChar;
    }
    output = output+binChar;
  }
  return output;
}

function primeNum(n) {
    const out = [];
    let k = 0;
    for (let i=0; i<=n; i++) {
        let c = 0;
        for (let j=1; j<=i; j++) {
            if (i%j == 0) {
                c = c+1;
            }
        }
        if (c == 2) {
            out[k] = i;
            k++;
        }
    }
    return out;
}

function factorise(x) {
    const out = [];
    let k = 0;
    let primes = primeNum(x);
    let i = 0;
    while (i<primes.length) {
        let p = primes[i];
        for (let j=0; j<primes.length; j++) {
            if (x/primes[j] == 1) {
                break;
            }
        }
        if (x%p == 0) {
            out[k] = p;
            x = parseInt(x/p,10);
            primes = primeNum(x);
            i = 0;
            k++;
        } else {
            i = i+1;
        }
    }
    return out
}

function derive(func, point) {
    let dx = 0.000001;
    let D = (func(point+dx) - func(point))/dx;
    return D;
}

function integrate(func, lower_lim, upper_lim) {
    let dx = (upper_lim-lower_lim)/100000;
    let x = lower_lim;
    let I = 0;
    while (x<upper_lim) {
        I = I + func(x)*dx;
        x = x + dx;
    }
    return I;
}

function solve(func, lower_lim, upper_lim) {
    let sol = lower_lim;
    for (let i=lower_lim; i<=upper_lim; i=i+0.5) {
        if (func(i)<0 && func(i+0.5)>0) {
            sol = i+0.25;
            break;
        }
    }
    for (let i=0; i<15; i++) {
        sol = sol - (func(sol)/derive(func,sol));
    }
    return sol;
}

function handleClickBin() {
  var input = document.getElementById("in-box-bin").value;
  if (input.charAt(0)=="1" || input.charAt(0)=="0") {
    var output = decrypt(input);
    document.getElementById("out-box").innerText = output;
  } else {
    var output = encrypt(input);
    document.getElementById("out-box").innerText = output;
  }
}

function handleClickCal() {
    let input = document.getElementById("in-box-cal").value;
    let calculator = new Function('x', 'return '+input);
    var output = calculator(0);
    document.getElementById("out-box").innerText = output;
}

function handleClickFac() {
    var input = document.getElementById("in-box-fac").value;
    var output = factorise(parseInt(input,10));
    document.getElementById("out-box").innerText = output;
}

function handleClickDer() {
    let func = document.getElementById("in-box-der-f").value;
    let p = parseFloat(document.getElementById("in-box-der-p").value);
    let f = new Function('x', 'return '+func);
    var output = derive(f,p);
    document.getElementById("out-box").innerText = output;
}

function handleClickIntg() {
    let func = document.getElementById("in-box-intg-f").value;
    let ul = parseFloat(document.getElementById("in-box-intg-ul").value);
    let ll = parseFloat(document.getElementById("in-box-intg-ll").value);
    let f = new Function('x', 'return '+func);
    var output = integrate(f,ll,ul);
    document.getElementById("out-box").innerText = output;
}

function handleClickSol() {
    let func = document.getElementById("in-box-sol-f").value;
    let ul = parseFloat(document.getElementById("in-box-sol-ul").value);
    let ll = parseFloat(document.getElementById("in-box-sol-ll").value);
    let f = new Function('x', 'return '+func);
    var output = solve(f,ll,ul);
    document.getElementById("out-box").innerText = output;
}
