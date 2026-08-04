function display(value){
    document.getElementById("result").value += value;
}
function calculate(){
    let result = document.getElementById("result");
    if(result.value==""){
        alert("Please Enter Expression");
        return;
    }
    result.value = eval(result.value);
}
function clearDisplay(){
    document.getElementById("result").value="";
}
function deleteLast(){
    let result=document.getElementById("result");
    result.value=result.value.slice(0,-1);
}
