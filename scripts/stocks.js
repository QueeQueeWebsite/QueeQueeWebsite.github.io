//const Stocks = require("./stocks_api");
function searchBar_initialize(){
    const selected = document.querySelector(".selected");
    const optionsContainer = document.querySelector(".options-container");
    const searchBox = document.querySelector(".search-box input");

    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");

    searchBox.value = "";
    filterList("");

    if (optionsContainer.classList.contains("active")) {
        searchBox.focus();
    }
    });

    optionsList.forEach(o => {
    o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
    });
    });

    searchBox.addEventListener("keyup", function(e) {
    filterList(e.target.value);
    });

    const filterList = searchTerm => {
    searchTerm = searchTerm.toLowerCase();
    optionsList.forEach(option => {
        let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
        if (label.indexOf(searchTerm) != -1) {
        option.style.display = "block";
        } else {
        option.style.display = "none";
        }
    });
    };
}
async function stocks_test(){
    let all_stocks = []
    await $.getJSON('https://pkgstore.datahub.io/core/s-and-p-500-companies/constituents_json/data/297344d8dc0a9d86b8d107449c851cc8/constituents_json.json', function(data) {
            all_stocks.push(data);
    });
    
    await $.getJSON('https://pkgstore.datahub.io/core/nyse-other-listings/nyse-listed_json/data/e8ad01974d4110e790b227dc1541b193/nyse-listed_json.json', function(data) {
            all_stocks.push(data);
    });

    let sorted_stocks = [];
    for (index of all_stocks){
        for (stock of index) {
            symbol = stock['Symbol'];
            if (symbol == undefined) {
                symbol = stock['ACT Symbol'];
            }
            // do not push repeats
            if (!sorted_stocks.find((sym) => {return sym == symbol})){
                sorted_stocks.push(symbol);
            }
        }
    }
    sorted_stocks.sort(function(a, b) {
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    });

    let searchDiv = $('.options-container');
    console.log(searchDiv);
    for (stock of sorted_stocks) {
        symbol = stock;
        
        let optionDiv = document.createElement("div");
        optionDiv.classList.add('option')
        
        let input = document.createElement("input");
        input.type="radio";
        input.classList.add("radio");
        input.name="category";
        input.id = symbol;
        optionDiv.appendChild(input);

        let labelFor = document.createElement("label");
        labelFor.htmlFor = symbol;
        labelFor.innerHTML = symbol;
        optionDiv.appendChild(labelFor);
        
        searchDiv.append(optionDiv);
    }
    console.log(all_stocks);
    //let stocks = new Stocks('5XDDDMPH2142FJAQ');
    let options = {
                    symbol: 'AAPL',
                    interval: 'weekly',
                    amount: 52
                  };
    //let result = await stocks.timeSeries(options);
    //console.log(result);
    searchBar_initialize();
}