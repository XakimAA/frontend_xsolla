let setOfProject = new Set();
let mapPaySystem = new Map();
var arrayPlace = new Array();
var setSystem = new Set(); 
var sortMapPaySystem = new Map();
var ctx = document.getElementById("myChart").getContext('2d');

var paySystemChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: ' - процент использования системы',
            data: [ ],
            backgroundColor: [     ],
            borderColor: [  ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        responsive: false
        
    }
    });
function main()
{
    projectTable();
    prize();
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
        if (item[1]==arrayPlace[n-1])
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
        addData(paySystemChart, item[0], item[1]);
        paySystemChart.update();
        paySystemChart.canvas.parentNode.style.height = '128px';
        paySystemChart.canvas.parentNode.style = '128px';
        beforePrintHandler(paySystemChart);
    }
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    var color = random_rgba();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
        dataset.backgroundColor.push(color);
        dataset.borderColor.push(color);
    });  
}

function beforePrintHandler (chart) {
    for (var id in chart.instances) {
        chart.instances[id].resize()
    }
  }