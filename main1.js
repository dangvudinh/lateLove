

var cnt2 = document.getElementsByClassName("content2")[0];
async function delay(){
    await new Promise((resolve)=>{
      setTimeout(()=>{
        resolve();
      },2000)
    })
    cnt2.style.display = "block";

}

delay();



