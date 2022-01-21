const fs = require("fs")
const cron = require("node-cron")

const stocks = require("./stocks.json")

const { getStockData } = require("./stocks")

async function updateStocks() {
    const now = Date.now()

    console.log(`Updating stock data, current time ${now.toLocaleString()}`)
    
    let data = require("./data.json")
    
    let currentData = {}

    for (element of stocks) {
        console.log(element)

        const stockData = await getStockData(element.ticker).catch(error => {
            console.log(error)

            setTimeout(updateStocks, 60000)
        })

        currentData[element.ticker] = {
            price: stockData.c
        }
    }

    data.push({
        date: now,
        data: currentData
    })
    
    fs.writeFileSync("./data.json", JSON.stringify(data))
}

cron.schedule("0 0 16 * * 5", updateStocks)
