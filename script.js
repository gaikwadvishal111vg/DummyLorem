const genForm = document.getElementById('generator-form');
const genBtn = document.getElementById('gen-btn');
const copyBtn = document.getElementById('copy-btn');
const genContent = document.getElementById('gen-content');
const gen_count = document.querySelector("#count");
const gen_options = document.querySelector("#option1");
let count = 5;
let option = "paras";
let tempCount = 0;
let tempOption = "";

function getValues(){

    count = parseInt(gen_count.value);
    // console.log(gen_count);
    option = gen_options.value;
    // console.log(count, option);
    validateValues();
    let url = `https://baconipsum.com/api/?type=meat-and-filler&${option}=${count}&start-with-lorem=1`;
fetchContent(url);
}

function validateValues(){
    if(option === "words"){
        [tempCount, tempOption] = [count, option];
        [option, count] = ["paras", 100];

        if(tempCount > 2000){
            invalidInput();
            tempCount = 2000;
            gen_count.value = "2000";
        }else if(tempCount < 1 || isNaN(tempCount)){
            invalidInput();
            tempCount = 5;
            gen_count.value = "5";
        }
    }else{
        tempCount = "";
        if(count > 100){
            invalidInput();
            count =100;
            gen_count.value = "100";
            //you will be enter 100 values not more 
        }else if(count < 1 || isNaN(count)){
            invalidInput();
            count = 5;
            gen_count.value = "5";
            //you enter or not enterd value its defualt value will be printed
        }
    }
}
 
function invalidInput(){
    gen_count.style.borderColor = "#ff6a67";
    setTimeout(() =>{
        gen_count.style.borderColor = "#d3dbe4";
    },1000);
}

//we fetching the randomly generater text
async function fetchContent(url){
    let response = await fetch(url);
    if(response.status === 200){
        let data = await response.json();
        // console.log(data);
        displayGenContent(data);
    }else{
        alert("an error Occurred");
    }
}

function displayGenContent(data){
    // console.log(data);
    let texts = "";
    if( tempOption === "words"){
        tempOption = "";
        texts = data.join();
        if(tempCount < texts.length){
            let textArray = texts.split(" ");
            let selectedText = textArray.splice(0, tempCount);
            // console.log(selectedText);
            genContent.innerHTML = selectedText + ".";
            return;
        }

    }else{
        texts = data.join("<br><br>"); //br used for breaking the lines
        genContent.innerHTML = texts;

    }
}

genBtn.addEventListener('click', getValues);
window.addEventListener("DOMContentLoaded", getValues);
copyBtn.addEventListener("click", copyToClipboard);

// Copy function

function copyToClipboard(){
    let copyText = genContent.textContent;
    navigator.clipboard.writeText(copyText);
    alert("your text Copyed");
}