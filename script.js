const table=document.getElementById("table")
const adduser=document.getElementById("add_user")
const double=document.getElementById("double_money")
const show=document.getElementById("show_million")
const sort=document.getElementById("sort")
const calculate=document.getElementById("calculate")

let data=[]

randomuser()
async function randomuser(){
    const data=await fetch('https://randomuser.me/api')
    const res=await data.json()

    const user=res.results[0]
    const newuser={
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()*1000000)
    }
 
    adddata(newuser)

}

function adddata(da){
    data.push(da)
    updatedom()
}

function updatedom(provided=data){
    table.innerHTML="<tr><th>PERSON</th><th>WEALTH</th></tr>"
    provided.map((data)=>{table.innerHTML=table.innerHTML+`<tr><td>${data.name}</td><td>${formatMoney(data.money)}</tr>`})
}
function add(){
    randomuser()
}

function doublemoney(){
       data= data.map((da)=>{
            return{
                ...da,money:da.money*2
            }
        })
        updatedom()
}
function million(){
    data=data.filter((da)=>da.money>1000000)
    console.log(data.length)
    data.length>0?updatedom():displaynomillionaire()
}
function displaynomillionaire(){
    table.innerHTML=`<tr><th>PERSON</th><th>WEALTH</th></tr><h4>THERE IS NO MILLIONAIRE</h4>`
}
function richest(){
    data=data.sort((a,b)=>b.money-a.money)
    updatedom()
}
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
  }

function wealth(){
    let w=data
    w=w.map((data)=>data.money).reduce((a,b)=>a=a+b,0)
    
    table.innerHTML=table.innerHTML+`<tr><td>Total Wealth</td><td>${formatMoney(w)}</td></tr>`
}
adduser.addEventListener("click",add)
double.addEventListener("click",doublemoney)
show.addEventListener("click",million)
sort.addEventListener("click",richest)
calculate.addEventListener("click",wealth)