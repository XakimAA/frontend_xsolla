let setOfProject = new Set();
let mapPaySystem = new Map();
var arrayPlace = new Array();
var setSystem = new Set(); 
var sortMapPaySystem = new Map();
function main()
{
    projectTable();

    prize()
 /*   for(i in arrayPlace)
        console.log(arrayPlace[i]);
    for(item of mapPaySystem);
        console.log(item[0],item[1])*/
    createTable();
}

  
function projectTable()
{
   
    var n = 0;
    for(var i=0;i <data.length;i++)
    {
        setOfProject.add(data[i].transaction.project.name);
        

        if (mapPaySystem.has(data[i].transaction.payment_method.name)){
            mapPaySystem.set(data[i].transaction.payment_method.name,(mapPaySystem.get(data[i].transaction.payment_method.name) + 1));
        }
        else {
            mapPaySystem.set(data[i].transaction.payment_method.name,1);
            n++;
        }
    }
   // var str = $("#Text");
	//str.html(setOfProject);

    for(item of setOfProject)    {
        $(".listProject").append("<li>" +item+ "</li>");
    } 
}

function compareNumeric(a, b) {
    return b - a;
}

function prize() //array объявить внутри, set удалить
{
    var unique = new Set();

    var n = 0;
    for(item of mapPaySystem){
        unique.add(item[1]);
        setSystem.add(item[0]);
        n++;
    }
    
    arrayPlace = Array.from(unique);

    arrayPlace.sort(compareNumeric);
    
    for(i in arrayPlace)
    {
        for(item of mapPaySystem){
            if (item[1]==arrayPlace[i]){
                sortMapPaySystem.set(item[0],arrayPlace[i]);
            }
        }
    }
}

function createTable()
{
    var isFirst = true;
    var n=1;
    $(".tablePayment").append('<tr><td>'+n+'</td><td id="value"></td></tr>');
    
    for(item of sortMapPaySystem)
    {
        if (sortMapPaySystem.get(item[0])==arrayPlace[n-1])
        {
            if(isFirst){isFirst=false;}
            else
                $("#value").append("<br>");
            $("#value").append(item[0]);
        }
        else
        {
            n++;
            $("#value").removeAttr("id");
            $(".tablePayment").append('<tr><td>'+n+'</td><td id="value">'+ item[0]+'</td></tr>');

        }
        
    }
}

