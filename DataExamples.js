// Our proposed data standard as a JavaScript object
const dataExampleObj = {
    dataSetName: "Name of dataset",
    graphs: [
                {
                    label: "Name of graph",
                    data: [{x: 2, y: 38, outlier: true}, {x: 2, y: 38, outlier: true}],
                },
                {
                    label: "Name of graph",
                    data: [{x: 2, y: 38, outlier: true}, {x: 2, y: 38, outlier: true}],
                },
            ]
}

// Function to our data structure
function PrintGraphs() {
    console.log(dataExampleObj.dataSetName);

    dataExampleObj.graphs.forEach((graph) => {
        console.log(`\n${graph.label}`);

        graph.data.forEach((point, index) => console.log(`${index}: ${point}`));
    });

    console.log(JSON.stringify(dataExampleObj));
    console.log("\n=====\n");
}

// Test function
PrintGraphs();

// ================================================
// Conversion from our data-standard to ChartJs format

// Convert an object of our data-type into ChartJs standard 
function ConvertToChartJs(dataObj){
    
    //TODO: Input validation of object

    // Create the outline of the object
    let chartJsObj = {
        chart_type: `chart-js`,
        content : {
            data: [],
            labels: [],
            colors: [],
            type: "line",
        },
    }
    
    // Fill data
    dataObj.graphs.forEach((graph) => chartJsObj.content.data.push({data: graph.data, label: graph.label}));

    // Fill labels with numbers (should this be a part of our data structure?)
    chartJsObj.content.data[0].data.forEach((x, index) => chartJsObj.content.labels.push(index));

    // Fill colors
    chartJsObj.content.data.forEach((x, index) => chartJsObj.content.colors.push(GetChartJsColor(index)));

    console.log(chartJsObj);
    chartJsObj = JSON.stringify(chartJsObj);
    console.log(chartJsObj);
}

// Test function
ConvertToChartJs(dataExampleObj);

// Function to return colors of charts
// TODO: Make more color combinations
function GetChartJsColor(number){
    // Array of all colors
    const colorArr = [
        {   // Light grey
            'backgroundColor': 'rgba(148,159,177,0.2)',
            'borderColor': 'rgba(148,159,177,1)',
            'pointBackgroundColor': 'rgba(148,159,177,1)',
            'pointBorderColor': '#fff',
            'pointHoverBackgroundColor': '#fff',
            'pointHoverBorderColor': 'rgba(148,159,177,0.8)',
        },
        {   // Dark grey
            'backgroundColor': 'rgba(77,83,96,0.2)',
            'borderColor': 'rgba(77,83,96,1)',
            'pointBackgroundColor': 'rgba(77,83,96,1)',
            'pointBorderColor': '#fff',
            'pointHoverBackgroundColor': '#fff',
            'pointHoverBorderColor': 'rgba(77,83,96,1)',
        },
        {   // Red
            'backgroundColor': 'rgba(255,0,0,0.3)',
            'borderColor': 'red',
            'pointBackgroundColor': 'rgba(148,159,177,1)',
            'pointBorderColor': '#fff',
            'pointHoverBackgroundColor': '#fff',
            'pointHoverBorderColor': 'rgba(148,159,177,0.8)',
        },
        // TODO: Make more colors
    ]
    
    // Ensure no overflow
    if (number < 0) { number *= -1; }
    number %= colorArr.length;

    return colorArr[number];
}