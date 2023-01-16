function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function save_stock_data(stock_name, current, weekly){
    let cookie_addon = ";SameSite=None" + ";secure";
    document.cookie = "stock_name=" + stock_name + cookie_addon;
    document.cookie = "current=" + current + cookie_addon;
    document.cookie = "weekly=" + weekly + cookie_addon;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function buy_stock(stock_name, stock_price, amount) {
    current_balance = get_current_balance()
}

async function stock_api_call(selected_stock){
    //const Stocks = require("./stocks_api");
    console.log(selected_stock);
    let stocks = new Stocks('5XDDDMPH2142FJAQ');
    let current_options = {
                    symbol: selected_stock,
                    interval: '1min',
                    amount: 1
                  };
    let weekly_options = {
                    symbol: selected_stock,
                    interval: 'weekly',
                    amount: 10
                  };

    let current_result = await stocks.timeSeries(current_options);
    //await sleep(100);
    let weekly_result = await stocks.timeSeries(weekly_options);
    //console.log(weekly_result);
    return [current_result, weekly_result]
}

function update_stock_ui(current_result, weekly_result, stock_name) {
    $('#selected_stock').html(stock_name);
    console.log(current_result);
    //let current_price = current_result[0];
    $('#current_price').html(current_result[0].open);

}

async function stock_selection_update(stock_name){
    stock_data = await stock_api_call(stock_name);
    current_result = stock_data[0];
    weekly_result = stock_data[1];

    save_stock_data(current_result, weekly_result, stock_name);
    update_stock_ui(current_result, weekly_result, stock_name);
}


function load_saved_data() {

}

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
            stock_selection_update(o.querySelector("label").innerHTML);
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
    searchBar_initialize();
}