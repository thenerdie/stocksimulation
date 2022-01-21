const fs = require("fs")

const INVEST_AMOUNT = 1e5

const { getStockData } = require("./stocks")
const stocks = require("./stocks.json")

console.log("Calculating number of shares for each stock...")

async function main() {
    let data = {}

    for (element of stocks) {
        const { c } = await getStockData(element.ticker)

        const shares = Math.ceil(INVEST_AMOUNT / c)

        data[element.ticker] = shares
    }

    fs.writeFileSync("./shares.json", JSON.stringify(data))
}

main()