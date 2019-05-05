queue()
    .defer(d3.json, "../assets/javaScript/data/characters.json")
    .await(makeTable);
    
function makeTable(data, columns) {
    var table = d3.select("#char-list").append('table')
    var thead = table.append('thead')
    var tbody = table.append('tbody');
    
    thead.append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
            .text(function (column) { return column; });
        
    var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');
        
    var cells = rows.selectAll('td')
        .data(function (row){
            return columns.map(function (column){
                return {column: column, value:row[column]};
            });
        })
        
        .enter()
        .append('td')
            .text(function (d) {return d.value;});
            
    return table;
    makeTable(data, ['Name', 'More Info', 'Race']);
}
