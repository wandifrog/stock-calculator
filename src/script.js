// Selector
const input = document.getElementById('input')
const slider = document.getElementById('slider')

const outsideState = {
  defaultStockValue: 1475,
  defaultTotalLot: 10,
  typingTimeout: null,
}

const App = () => {

  const [state, setState] = React.useState({
    stockValue: outsideState.defaultStockValue,
    totalLot: outsideState.defaultTotalLot,
    min: 0,
    max: 0,
    step: 5,
    stocks: getStocks(outsideState.defaultStockValue, 10, 5)
  })

  React.useEffect(() => {
    handleChangeStockValue(outsideState.defaultStockValue)
  }, [])

  const handleChangeStockValue = (stockValue) => {
    stockValue = +stockValue
    let step
    if (stockValue < 1000) {
      step = 5
    } else {
      step = 5
    }

    const stocks = getStocks(stockValue, state.totalLot, state.step)

    const newState = {
      ...state,
      step,
      stockValue,
      min: stockValue - (step * 20),
      max: stockValue + (step * 140),
      stocks
    }

    setState(newState)
  }

  const handleChangeTotalLot = (totalLot) => {
    totalLot = +totalLot

    setState({ ...state, totalLot })
  }

  const handleSlider = (stockValue) => {
    const stocks = getStocks(stockValue, state.totalLot, state.step)
    setState({ ...state, stockValue, stocks })
  }

  console.log('state', state)

  return (
    <div className="container d">
      <div className="row">
        <div className="col-sm">
          <h5>Stock Price (buy)</h5>
          <input type="number" className="form-control col-3" id="input"
            step={state.step} placeholder="Input Stock Here" defaultValue={state.stockValue}
            noValidate onChange={(e) => handleChangeStockValue(e.target.value)}
          />
          <h5 style={{ marginTop: 10 }}>Total Lot</h5>
          <input type="number" className="form-control col-3" id="input"
            step="1" placeholder="(optional)" defaultValue=""
            noValidate onChange={(e) => handleChangeStockValue(e.target.value)}
          />
        </div>
        <div className="col-sm">
          <div className="row mb-3">
            <label htmlFor="customRange3" className="form-label col-2">Example range</label>
          </div>
          <input type="range" className="form-range" value={state.stockValue}
            min={state.min} max={state.max} step={state.step} id="slider" onChange={(e) => handleSlider(e.target.value)} />
          <div>{state.stockValue}</div>
        </div>
        <div className="col-sm">
        </div>
      </div>
      <table className="table mt-10" style={{ marginTop: 50 }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Price</th>
            <th scope="col">Percentage</th>
            <th scope="col">Cuan</th>
          </tr>
        </thead>
        <tbody>
          {
            state.stocks.map((item) => {

              return (
                <tr key={item.no}>
                  <th scope="row">{item.no}</th>
                  <td>{item.stock}</td>
                  <td>{item.percentage}%</td>
                  <td>{item.gain}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

function getStocks(startingStock, totalLot = 0, step = 5) {
  const stocks = []

  for (
    let counter = -2, no = 1, stock = startingStock - (2 * step);
    counter < 13;
    counter++, no++, stock += step
  ) {
    const percentage = ((stock - startingStock) / startingStock * 100).toFixed(2)
    const gain = (totalLot * stock * percentage).toFixed()
    stocks.push({
      no,
      stock,
      percentage,
      gain
    })

  }

  return stocks
}

// console.clear()

function separate() {
  console.log('-----------------')
}
function getPercent(a, b) {
  const result = (b - a) / a * 100
  console.log(`${result.toFixed(2)}%`)
  separate()
}

function cuan(doid, percent) {
  const result = (doid / 100 * percent)
  console.log(result.toFixed(1))
  separate()
}


function percents(a) {
  const result = a

  console.log(`-2% ${-(a / 100 * 2) + a} Stoploss`)
  console.log(`-1% ${-(a / 100 * 1) + a}`)
  console.log(`1% ${(a / 100 * 1) + a}`)
  console.log(`2% ${(a / 100 * 2) + a}`)
  console.log(`3% ${(a / 100 * 3) + a}`)
  console.log(`4% ${(a / 100 * 4) + a}`)
  console.log(`5% ${(a / 100 * 5) + a}`)
  console.log(`6% ${(a / 100 * 6) + a}`)
  console.log(`7% ${(a / 100 * 7) + a}`)
  console.log(`8% ${(a / 100 * 8) + a}`)
  console.log(`9% ${(a / 100 * 9) + a}`)
  console.log(`10% ${(a / 100 * 10) + a}`)
  separate()
}


// getPercent(1475, 1490)
// cuan(15147, 1.26)
// percents(49802000)







const domContainer = document.querySelector('#root')
ReactDOM.render(<App />, domContainer)
