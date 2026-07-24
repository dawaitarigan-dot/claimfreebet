const hadiah=["RP. 30.000","RP. 30.000","RP. 30.000","RP. ZONK","RP. 30.000","RP. 30.000","RP. ZONK","RP. 30.000"];

const warna=[
"#ffd700",
"#ff7b00",
"#00d9ff",
"#8b2cff",
"#ffd700",
"#ff7b00",
"#00d9ff",
"#8b2cff"
];

const API_URL = "https://script.google.com/macros/s/AKfycbw99-Zhf8ANVGI5E7cOMQZfCWK4lpYxwYC2-QaHXUjzD2Aw3tfeAfjCEoGqoDx58tje/exec";

const cv=document.getElementById("wheel");
const ctx=cv.getContext("2d");
const loading=document.getElementById("loading");

function draw(){
let c=200,r=190;

for(let i=0;i<hadiah.length;i++){

let a=i*2*Math.PI/hadiah.length;
let b=(i+1)*2*Math.PI/hadiah.length;

ctx.beginPath();
ctx.moveTo(c,c);
ctx.arc(c,c,r,a,b);
ctx.fillStyle=warna[i];
ctx.fill();

ctx.save();
ctx.translate(c,c);
ctx.rotate(a+(b-a)/2);

ctx.fillStyle="#fff";
ctx.font="bold 22px Arial";
ctx.textAlign="center";
ctx.fillText(hadiah[i],130,5);

ctx.restore();
}

ctx.beginPath();
ctx.arc(c,c,18,0,Math.PI*2);
ctx.fillStyle="gold";
ctx.fill();
}

draw();

function pop(t){

    // Default popup merah (USER ID SUDAH CLAIM)
    document.querySelector(".popbox").classList.remove("win-popup");

    const icon=document.querySelector(".pop-icon");

    if(icon) icon.style.display="flex";

    msg.innerHTML=t;

    popup.classList.remove("show");

    setTimeout(()=>{
        popup.classList.add("show");
    },10);

}

function winPop(t){

    // Mode popup hadiah
    document.querySelector(".popbox").classList.add("win-popup");

    const icon=document.querySelector(".pop-icon");

    if(icon) icon.style.display="none";

    msg.innerHTML=t;

    popup.classList.remove("show");

    setTimeout(()=>{
        popup.classList.add("show");
    },10);

}

function closePopup(){

    popup.classList.remove("show");

}

function resetForm(){

    userid.value = "";

    spinBtn.innerHTML = "PUTAR SEKARANG";

    spinBtn.disabled = false;

    spinBtn.onclick = spinWheel;

    rot = 0;

    cv.style.transform = "rotate(0deg)";
}

let rot=0;

spinBtn.onclick = spinWheel;

async function spinWheel(){

    let id = userid.value.trim();

if(!id){
    pop("ISI USER ID DAHULU");
    return;
}

spinBtn.disabled = true;
spinBtn.innerHTML = "MEMERIKSA...";
loading.style.display = "flex";
    

    spinBtn.disabled = true;

    fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({
            userid:id,
            action:"check"
        })
    })
    .then(r=>r.json())
    .then(data=>{

       if(data.status==="used"){

    loading.style.display="none";

   pop("USERID SUDAH CLAIM !");

    spinBtn.disabled=false;
    spinBtn.innerHTML="PUTAR SEKARANG";

    return;

}

loading.style.display="none";
spinBtn.innerHTML = "MEMUTAR...";

// BARU SPIN
let win=Math.floor(Math.random()*hadiah.length);

        const sectorSize=360/hadiah.length;
        let angle=(win*sectorSize)+(sectorSize/2);

        rot+=3600-angle-90;

        cv.style.transform=`rotate(${rot}deg)`;

        setTimeout(()=>{

            let hasil=hadiah[win];

            spinBtn.innerHTML="CLAIM "+hasil;

            winPop("🏆<br>SELAMAT!<br><br>ANDA MENDAPATKAN<br><span style='font-size:42px;color:#ffd700'>"+hasil+"</span>");

            fetch(API_URL,{
    method:"POST",
    body:JSON.stringify({
        userid:id,
        hadiah:hasil,
        action:"claim"
    })
})
.then(r => r.json())
.then(data => {

    console.log("CLAIM:", data);

    if(data.status !== "saved"){
        pop("GAGAL MENYIMPAN DATA");
    }

})
.catch(err => {

    console.error(err);

    pop("GAGAL MENYIMPAN DATA");

});

spinBtn.disabled=false;

spinBtn.onclick=()=>{
    window.location.href="https://ragam4d03.com/";
};
        },6000);

    })
 .catch(err=>{

    console.error(err);

    loading.style.display="none";

    pop("GAGAL TERHUBUNG KE SERVER");

    spinBtn.disabled=false;
    spinBtn.innerHTML="PUTAR SEKARANG";

});

}

const namaRandom=[
"RA***","SL***","GA**","VIP***",
"JACKP****","MAXW****","BOS***",
"RAJ***","SULT***","HO***",
"CUAN***","BIGWI***","DEW***",
"LION***","KONTOLKECE***","SENOP***",
"udacan***","peng***","Ondo***",
"salamm***","Xsime***","kopra***",
"iko***","brovipx***","Cucujeu***",
"gacor***","heba***","Davidp***","MIMEK***",
"BIJIMEL***","GARUKPE***","HAMBATUH**",
"RAGAMGAC***","SEMPAKBO***","JP100JT***",
];

const hadiahRandom=[
"Rp 30.000",
"Rp 30.000",
"Rp 30.000",
"Rp ZONK",
"Rp 30.000",
"Rp 30.000",
"Rp ZONK",
];

function randomClaim(){

const list=document.getElementById("recentList");

let nama=namaRandom[Math.floor(Math.random()*namaRandom.length)];
let hadiah=hadiahRandom[Math.floor(Math.random()*hadiahRandom.length)];

const item=document.createElement("div");

item.className="recent-item";

item.innerHTML=`
<span>${nama}</span>
<span>${hadiah}</span>
`;

list.prepend(item);

if(list.children.length>8){
list.removeChild(list.lastElementChild);
}
}

for(let i=0;i<6;i++){
randomClaim();
}

setInterval(randomClaim,
Math.floor(Math.random()*1000)+2000
);
