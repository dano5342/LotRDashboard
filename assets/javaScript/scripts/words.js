queue()
    .defer(d3.json, "../assets/javaScript/data/wordsByChar.json")
    .await(makeGraphs);

function makeGraphs(error, nameData) {
    var ndx = crossfilter(nameData);

    show_race_selector(ndx);
    show_name_data(ndx);
    show_book_data(ndx);
    show_race_data(ndx);
    wordsByChar(ndx);
    dc.renderAll();
}
// color accessing


//selector tool for defining races
function show_race_selector(ndx) {
    dim = ndx.dimension(dc.pluck("Race"));
    group = dim.group();

    dc.selectMenu("#race-selector")
        .dimension(dim)
        .group(group);
}

//Global Colors for Race grouping??


//Display graph showing the number of times a particular race has a speaking part (Not including the words spoken)
function show_name_data(ndx) {
    var dim = ndx.dimension(dc.pluck('Race'));
    var group = dim.group();

    dc.barChart('#character-graph')
        .width(700)
        .height(350)
        .margins({ top: 10, right: 60, bottom: 50, left: 60 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Number of times a Race has spoken")
        .renderHorizontalGridLines(true)
        .elasticY(true);
}


//For the purposes of data display, FILM has been used instead of Chapter, this will help show correlation
// This is to show a deep display of how a stacked chart would show the different races.

function show_book_data(ndx) {
    var dim = ndx.dimension(dc.pluck('Film'));
    var group = dim.group();

    var wordsByAinur = dim.group().reduceSum(function(d) {
        if (d.Race === "Ainur") {
            return d.Words;
        }
        else {
            return 0;
        }
    });
    var wordsByDead = dim.group().reduceSum(function(d) {
        if (d.Race === "Dead") {
            return d.Words;
        }
        else {
            return 0;
        }
    });
    var wordsByDwarf = dim.group().reduceSum(function(d) {
        if (d.Race === "Dwarf") {
            return d.Words;
        }
        else {
            return 0;
        }
    });
    var wordsByElf = dim.group().reduceSum(function(d) {
        if (d.Race === "Elf") {
            return d.Words;
        }
        else {
            return 0;
        }
    });
    var wordsByEnt = dim.group().reduceSum(function(d) {
        if (d.Race === "Ent") {
            return d.Words;
        }
        else {
            return 0;
        }
    });
    var wordsByHobbit = dim.group().reduceSum(function(d) {
        if (d.Race === "Hobbit") {
            return d.Words;
        }
        else {
            return 0;
        }
    });
    var wordsByMen = dim.group().reduceSum(function(d) {
        if (d.Race === "Men") {
            return d.Words;
        }
        else {
            return 0;
        }
    });
    var wordsByNazgul = dim.group().reduceSum(function(d) {
        if (d.Race === "Nazgul") {
            return d.Words;
        }
        else {
            return 0;
        }
    });
    var wordsByOrc = dim.group().reduceSum(function(d) {
        if (d.Race === "Orc") {
            return d.Words;
        }
        else {
            return 0;
        }
    });

    var stackedChart = dc.barChart("#book");
    stackedChart
        .width(715)
        .height(350)
        .margins({ top: 10, right: 70, bottom: 50, left: 50 })
        .dimension(dim)
        .group(group)
        .stack(wordsByAinur, "Ainur")
        .stack(wordsByDead, "Undead")
        .stack(wordsByDwarf, "Dwarves")
        .stack(wordsByElf, "Elves")
        .stack(wordsByEnt, "Ents")
        .stack(wordsByHobbit, "Hobbits")
        .stack(wordsByMen, "Men")
        .stack(wordsByNazgul, "Nazgul")
        .stack(wordsByOrc, "Orcs")
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Total number of Words Spoken")
        .legend(dc.legend().x(650).y(0).itemHeight(15).gap(5))
        .colors(d3.scale.ordinal().domain(["Ainur", "Dead", "Dwarf", "Elf", "Ent", "Hobbit", "Men", "Nazgul", "Orc"])
            .range(["#F2E96B", "#59594B", "#D99036", "#F2BC79", "#8C6746", "#B1AA4E", "#A4A49C", "#B2762D", "#DCAB6E", "#5A422D"]))
        .renderHorizontalGridLines(true)
}
//Words by characters here

function wordsByChar(ndx) {
    var dim = ndx.dimension(dc.pluck('Character'));
    var group = dim.group();

    dc.barChart('#wordsByChar')
        .width(1600)
        .height(350)
        .margins({ top: 10, right: 60, bottom: 100, left: 60 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Number of times a character has spoken")
        .renderHorizontalGridLines(true)
        .elasticX(true)
        .elasticY(true);

}



//Pie chart data

function show_race_data(ndx) {
    var dim = ndx.dimension(dc.pluck('Race'));
    var raceCharGroup = dim.group().reduce(
        function(p, v) { // add
            p[v.Character] = (p[v.Character] || 0) + 1;
            return p;
        },
        function(p, v) { // remove
            if (--p[v.Character] === 0)
                delete p[v.Character];
            return p;
        },
        function() { // init
            return {};
        }); //The code for the above reduce was assisted with through stack overflow.
    //by Gordon Woodhull
    dc.pieChart('#race-graph')
        .height(350)
        .width(600)
        .radius(250)
        .innerRadius(40)
        .valueAccessor(function(kv) {
            return Object.keys(kv.value).length;
        })
        .transitionDuration(1500)
        .dimension(dim)
        .group(raceCharGroup)
        .legend(dc.legend())
}
