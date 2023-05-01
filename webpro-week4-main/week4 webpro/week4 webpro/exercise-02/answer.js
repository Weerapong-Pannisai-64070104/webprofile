// ข้อ 2.1

function display(msg) {
    let div = document.getElementById('ex01-div')
    div.innerHTML = msg
}

function showConfirm(co) {
    // You code here
    const msg = confirm();
    msg == 1 ? co("ยืนยันจ้า"):co("ไม่ดีกว่า");
}

// ข้อ 2.2
function start() {
    // hint: ส่ง callback function เข้าไปเป็น argument ของ setTimeout()
    function show(id, txt, next){
        document.getElementById(id).innerHTML = txt;
        next();
    }
    setTimeout(show, 0, "start", "Program started", () => {
        setTimeout(show, 2000, "process", "Hello World", () => {
            setTimeout(show, 3000, "end", "Program ended")
        })
    })
}

// ข้อ 2.3
function stopTime() {
    var sec = document.getElementById("Time").value;
    document.getElementById("setMinute").innerHTML = "00";
    document.getElementById("setSecond").innerHTML = "00";
    var time = setInterval(run, 1000);
    function run(){
        if (sec <= 0){
            document.getElementById("setMinute").innerHTML = "00";
            document.getElementById("setSecond").innerHTML = "00";
            clearInterval(time);
            return;
        }
        let minutes = Math.floor(sec / 60);
        let extrasec = sec % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        extrasec = extrasec< 10 ? "0" + extrasec : extrasec;
        document.getElementById("setMinute").innerHTML = minutes;
        document.getElementById("setSecond").innerHTML = extrasec;
        sec -=1;
    }
}

