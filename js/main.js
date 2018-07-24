

  function projectTable()
  {
    let setOfProject = new Set();
    let mapPaySystem = new Map();
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
    var str = $("#Text");
	str.html(setOfProject);

    for(item of setOfProject)    {
        $(".listProject").append("<li>" +item+ "</li>");
    }
    prise(mapPaySystem);
  }

  function compareNumeric(a, b) {
    return b - a;
  }

  function prise(mapPaySystem)
  {
    var arrayPlace = new Array(); var n = 0;
    var unique = new Set();
    var setSystem = new Set(); 
    for(item of mapPaySystem){
        console.log(item[0], item[1]);
        unique.add(item[1]);
        setSystem.add(item[0]);
        n++;
    }
    arrayPlace = Array.from(unique);
    arrayPlace.sort(compareNumeric);
    //createTable(mapPaySystem,arrayPlace,setSystem);
  }

  function createTable(mapPaySystem,arrayPlace,setSystem)
  {
      var i = 0;
      var n=1;
      for (var i=0;i<arrayPlace.length;i++)
      {
          for (system in setSystem)
          {
            if (mapPaySystem.get(setSystem)==arrayPlace[i])
            {
                console.log(arrayPlace[i],setSystem,mapPaySystem.get(setSystem));
            }
            else
            {

            }

          }
      }
    $(".tablePayment").append("<tr><td>"+n+"</td>");
    for(item of mapPaySystem)
    {
        if (mapPaySystem.get(item[0])==arrayPlace[n-1])
        {
                // тут должна быть какая-то проверка
            console.log(item[0],arrayPlace[n-1],mapPaySystem.get(item[0])==arrayPlace[n-1])
            $(".tablePayment").append("<br>"+ item[0]);
        }
        else
        {
            n++;
            $(".tablePayment").append("</td></tr><tr><td>"+n+"</td>");
        }
        
    }
  }
  //console.log(item[0], item[1]);
