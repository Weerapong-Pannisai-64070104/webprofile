// ข้อ 3.1
function evenNumber(num) {
  // hint : ทำการสร้าง promise และเรียกใช้
  let checknumber = new Promise(
    function (reslove, reject){
      num % 2 == 0 ? reslove("success : "+num+" is an even number") : reject("Error : "+num+" is not an even number");
    }
  )
  checknumber.then(
    result=>document.getElementById("result").innerHTML = result
  ).catch(error=>document.getElementById("result").innerHTML = error);
}

// 3.2
function task(id) {
  const delay = parseInt(Math.random() * 1000)
  // return promise
  return new Promise((reslove, reject) => {
    setTimeout(()=>{
      if(delay<500){
        reslove("task " + id + ": " + delay + "ms ... PASS!")
      }
      reject("task " + id + ": " + delay + "ms ... NOT PASS!")
    },delay)
  })
}

function tester() {
  // hint : task(1).then().catch() ..... task(4)...
  // ต้องเรียก function task 4 ครั้ง เปลี่ยน id ไปเรื่อยๆ
  for (i = 1; i <= 4; i++) {
    task(i).then(resolve => console.log(resolve)
    ).catch(reject => console.log(reject))
  }
}

// ข้อ 3.3
// hint : เรียก getAPI() ที่ url = https://api.thecatapi.com/v1/images/search 
// อย่าลืม console.log() ดูข้อมูลที่ได้ด้วยว่ามีโครงสร้างแบบใด
function checkAuth(password) {
  return new Promise((reslove, reject) => {
    password === "Cisco" ? reslove("รหัสผ่านถูกต้อง") : reject("รหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง")
  })
}

function fetchData(password) {
  checkAuth(password).then((result) => {
    alert(result)
    getAPI('https://api.thecatapi.com/v1/images/search', (res) => {
      document.getElementById("cat").setAttribute("src", res.map(x => x.url));
    },(err) => {
      console.log(err)
    })
  }).catch(error => alert(error))
}


// GET API
function getAPI(url, success, error) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.response);
      success(res);
    } else if (this.readyState == 4) {
      const res = JSON.parse(this.response);
      error(res);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.send();
}
