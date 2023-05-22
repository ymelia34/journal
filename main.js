// data source

const url = "https://raw.githubusercontent.com/ymelia-is/test1/main/Copie_0.csv";
//const url = "ftp://44.88.10.34/Copie_0";

// getData function

async function getData() {

    // Part 1: Get CSV

    // fetch data
    const response = await fetch(url);
    // process data
    const rawData = await response.text();

    // initialize variables
    let arrayOne = rawData.split("\r\n");
    let header = arrayOne[0].split(";");
    let noOfRow = arrayOne.length;
    let noOfCol = header.length;
    let jsonData = [];
    let i = 0;
    let j = 0;

     // for loop (rows)
     for (i = 1; i < noOfRow - 1; i++) {
        let obj = {};
        let myNewLine = arrayOne[i].split(";");
        // nested for loop (columns)
        for (j = 0; j < noOfCol; j++) {
            obj[header[j]] = myNewLine[j];
        };
        // generate JSON
        jsonData.push(obj);
    };

    // Part 3: JSON to HTML Table
    
    // initialize variables
    let children = jsonData;
    let table = document.createElement("table");

    // function to generate table header row
    function addHeaders(table, keys) {
        let row = table.insertRow();
        for (i = 0; i < keys.length; i++) {
            let cell = row.insertCell();
            cell.appendChild(document.createTextNode(keys[i]));
        }
    }

    // generate table
    for (i = 0; i < children.length; i++) {
        let child = children[i];
        // generate header row
        if (i === 0) {
            addHeaders(table, Object.keys(child));
        }
        // generate data rows
        let row = table.insertRow();
        Object.keys(child).forEach(function (k) {
            let cell = row.insertCell();
            cell.appendChild(document.createTextNode(child[k]));
        })
    }

    // publish table
    document.getElementById("container").appendChild(table);

    // developer info
    console.log("HTML table type: " + typeof table);

    // Part 4: Plot Data

    // generate array for x-axis (temps)

    let Temps = [];

    for (i in jsonData) {
        let item = jsonData[i];
        Temps.push(item.Time);
    }

    // generate array for y-axis (T_CIP)

    let T = [];

    for (i in jsonData) {
        let item = jsonData[i];
        T.push(item.Temp);
    }

    // generate array for y-axis (T_secu)

    let T0 = [];

    for (i in jsonData) {
        let item = jsonData[i];
        T0.push(item.Tem);
    }

    // newPlot() arguments

    let p = document.getElementById("myPlot");
    let p0 = document.getElementById("myPlot0");


    let plotData0 = [
        {
            x: Temps,
            y: T,
            name: 'Température en NIP',
            line: {color: '#17BECF'}
        }
    ];
    let plotData1 = [
        {
            x: Temps,
            y: T0,
            name: 'Température de sécurité',
            line: {color: '#17cf1d'}
        }

    ];


    let layout = {
        title: "Température en fct° du temps",
        xaxis: { title: "Temps" },
        yaxis: { title: "Température" }
    };

    // generate plot
    Plotly.newPlot(p, plotData0, layout);
    Plotly.newPlot(p, plotData1, layout);

    // developer info
    console.log(Temps);
    console.log(T);
    console.log(T0);
    console.log(Plotly.newPlot(p, plotData0, layout));
    console.log("plot type: " + typeof Plotly.newPlot(p, plotData0, layout));
    console.log(Plotly.newPlot(p0, plotData1, layout));
    console.log("plot type: " + typeof Plotly.newPlot(p0, plotData1, layout));

}

// call function

getData();