// ข้อ 3.1
function getDogDemo(url) {
  // hint: เรียกใช้ getAPI() โดยดึงข้อมูลจาก url = https://dog.ceo/api/breeds/image/random
  // ลอง console.log() ดูว่าข้อมูลที่ได้มาเป็นอย่างไร
  let num = 10
  var run = setInterval(()=>{
    document.getElementById("dogTime").innerHTML = num;
    if(num == 0){
      clearInterval(run)
    }
    num-=1
  }, 1000)
  setTimeout(()=>{
    getAPI(url, (res) => {
      document.getElementById("dogImg").setAttribute("src", res.message);
    }, (err) => {
      console.log(err)
    })
  }, 10000)

}


// ข้อ 3.2
function Rainbow() {
  //TODO
  // 1. ในกรณีที่ status = 'success' ให้แสดงตัวเลขเป็นสีตามที่กำหนดในแต่ละ STATE
  // 2. ให้แสดงชื่อ STATE (STATE 1 หรือ STATE 2 หรือ STATE 3) ในกล่องข้อความเมื่อเกิด Error
  // 3. เปลี่ยนสีข้อความเป็นสีแดงเมื่อเกิด Error (class = 'has-text-error')

  const rainbow = document.getElementById("rainbow")
  getResult()
  setTimeout(() => {
    // STATE 1 color = 'has-text-primary'
    if(getResult().status == "success"){
      rainbow.setAttribute("class", "has-text-warning")
      rainbow.innerHTML = "STATE 1"
    }
    else{
      rainbow.setAttribute("class", "has-text-danger")
      rainbow.innerHTML = "STATE 1"
    }
      setTimeout(() => {
        // STATE 2 color = 'has-text-success'
        if(getResult().status == "success"){
          rainbow.setAttribute("class", "has-text-success")
          rainbow.innerHTML = "STATE 2"
        }
        else{
          rainbow.setAttribute("class", "has-text-danger")
          rainbow.innerHTML = "STATE 2"
        }
        setTimeout(() => {
            // STATE 3 color = 'has-text-success'
            if(getResult().status == "success"){
              rainbow.setAttribute("class", "has-text-link")
              rainbow.innerHTML = "STATE 3"
            }
            else{
              rainbow.setAttribute("class", "has-text-danger")
              rainbow.innerHTML = "STATE 3"
            }
        }, 2000)

      }, 2000)

  }, 2000)
}

function getResult(){
  const num = Math.floor(Math.random() * 10)
  console.log(num)
  if(num > 5) {
    return {
      'status': 'success',
      'text': num
    }
  }else{
    return {
      'status': 'error',
      'text': num
    }
  }
}

// ข้อ 3.3
async function evenNumber(num) {
  // hint : ทำการสร้าง promise และเรียกใช้
  let checknumber = new Promise(
    function (reslove){
      // num % 2 == 0 ? reslove("success : "+num+" is an even number") : reject("Error : "+num+" is not an even number");
      if(num%2 == 0){
        reslove ("success : "+num+" is an even number")
      }
      throw new Error("Error : "+num+" is not an even number")
    }
  )
  try {
    const a = await checknumber
    result.innerHTML = a

  } 
  catch (error) {
    document.getElementById("result").innerHTML = error.message
  }
  // await checknumber.then(
  //   result=>document.getElementById("result").innerHTML = result
  // ).catch(error=>document.getElementById("result").innerHTML = error);
}

// ข้อ 3.4
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

// ข้อ 3.5
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
