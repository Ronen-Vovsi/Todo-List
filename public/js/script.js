/* constant variables */
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("tasks_container");
var countTasks = 0;

/*Function to add tasks to the list*/
function AddTask(){
/*--------------- Alert if adding nothing ---------------*/
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
/*--------------- Adding Tasks --------------- */
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        countTasks += 1;
        tasks_show();
    
/*--------------- X icon ---------------*/
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
/*--------------- clearing the input box after adding a task ---------------*/
    inputBox.value = "";
}

/*--------------- Adding tasks with the Enter key ---------------*/
function AddTask_Enter() {
    if (event.key === 'Enter') {
        AddTask();
    }
}

/*--------------- Check and uncheck ---------------*/
listContainer.addEventListener("click", function(e) { 
    /* Check tasks */
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
    }
    /* removing tasks */
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        countTasks -= 1;
        tasks_show();
    }
},  false);

/*--------------- Function to hide the task container ---------------*/
function tasks_show(){
    var x = document.getElementsByClassName("container_2");
   
    for (var i = 0; i  < x.length; i++) { 
        /* showing container */
        if (countTasks >  0) { 
            x[i].style.visibility =  'visible'; 
        }
        /* hidding container */
        else { 
            x[i].style.visibility = 'hidden';
        }
    }
}
tasks_show();
