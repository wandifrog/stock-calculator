// Selector
const input = document.getElementById('input')
const slider = document.getElementById('slider')

const outsideState = {
  defaultStockValue: 1475,
  defaultTotalLot: 50,
  defaultStep: 5,
  sliderTimeout: null,
  fee: 0.36
}

const App = () => {

  const [state, setState] = React.useState(() => {
    const getStocksParams = {
      startingStock: outsideState.defaultStockValue,
      currentStock: outsideState.defaultStockValue,
      lot: outsideState.defaultTotalLot,
      step: outsideState.defaultStep
    }
    const stocks = getStocks(getStocksParams)

    return {
      stockValue: outsideState.defaultStockValue,
      totalLot: outsideState.defaultTotalLot,
      sliderValue: outsideState.defaultStockValue,
      min: 1200,
      max: 2000,
      step: outsideState.defaultStep,
      percentage: 0,
      stocks
    }
  })

  // React.useEffect(() => {
  //   // alert(1)
  //   handleChangeStockValue(state.stockValue)
  // }, [state.totalLot])

  const handleChangeStockValue = (stockValue) => {
    stockValue = +stockValue
    let step
    if (stockValue > 3000) {
      step = 10
    } else if (stockValue > 1000) {
      step = 5
    } else if (stockValue > 500) {
      step = 2
    } else {
      step = 10
    }

    const getStocksParams = {
      startingStock: stockValue,
      currentStock: stockValue,
      lot: state.totalLot,
      step: state.step
    }
    const stocks = getStocks(getStocksParams)

    const newState = {
      ...state,
      step,
      stockValue,
      min: stockValue - (step * 30),
      max: stockValue + (step * 90),
      sliderValue: stockValue,
      stocks
    }

    setState(newState)
  }

  const handleChangeTotalLot = (totalLot) => {
    totalLot = +totalLot

    const getStocksParams = {
      startingStock: state.stockValue,
      currentStock: state.stockValue,
      lot: totalLot,
      step: state.step
    }
    const stocks = getStocks(getStocksParams)

    setState({ ...state, totalLot, stocks })
  }

  const handleSlider = (sliderValue) => {
    const percentage = getPercentage(state.stockValue, sliderValue)
    setState({ ...state, sliderValue, percentage })

    clearTimeout(outsideState.sliderTimeout)
    outsideState.sliderTimeout = setTimeout(() => {
      const stocks = getStocks(state.sliderValue, state.totalLot, state.step)
      setState({ ...state, stocks, sliderValue, percentage })
    }, 1000)
  }

  console.log('state', state)

  const renderTable = React.useMemo(() => {
    return (
      <table className="table mt-10" style={{ marginTop: 50 }}>
        <thead>
          <tr>
            <th scope="col">Price</th>
            <th scope="col">Percentage</th>
            <th scope="col">Gain/Loss (fee {outsideState.fee}%)</th>
          </tr>
        </thead>
        <tbody>
          {
            state.stocks.map((item) => {

              return (
                <tr key={item.no} className={item.stock === state.stockValue ? 'table-info' : ''}>
                  <td>{item.stock}</td>
                  <td>{item.percentage}%</td>
                  <td>{item.gain}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }, [state.stocks])

  return (
    <div className="container d">
      <div className="row">
        <div className="col-sm">
          <h5>Stock Price (average)</h5>
          <input type="number" className="form-control col-3" id="input"
            step={state.step} placeholder="Input Stock Here" defaultValue={state.stockValue}
            noValidate onChange={(e) => handleChangeStockValue(e.target.value)}
          />
          <h5 style={{ marginTop: 10 }}>Total Lot</h5>
          <input type="number" className="form-control col-3" id="input"
            step="1" placeholder="(optional)" defaultValue={state.totalLot}
            noValidate onChange={(e) => handleChangeTotalLot(e.target.value)}
          />
        </div>
        <div className="col-sm">
          <div className="row mb-3">
            <label htmlFor="customRange3" className="form-label">The neighbor's grass is greener</label>
          </div>
          <input type="range" className="form-range" value={state.sliderValue}
            min={state.min} max={state.max} step={state.step} id="slider" onChange={(e) => handleSlider(e.target.value)} />

          <div>{state.stockValue} - {state.sliderValue}</div>
          <div style={{ color: state.percentage >= 0 ? 'green' : 'red' }}>{state.percentage}%</div>

        </div>
      </div>

      {renderTable}

    </div>
  )
}

// interface GetStocks {
//   startingStock: number
//   currentStock: number
//   lot?: number
//   step?: number
//   fee?: number
// }
function getStocks({ startingStock, currentStock, lot = 0, step = 5, fee = 0.36 }) {
  const stocks = []

  for (
    let counter = -2, no = 1, stock = startingStock - (2 * step);
    counter < 43;
    counter++, no++, stock += step
  ) {
    const percentage = ((stock - startingStock) / startingStock * 100).toFixed(2)
    const gain = (+(lot * stock * (+percentage - fee)).toFixed()).toLocaleString()
    stocks.push({
      no,
      stock,
      percentage,
      gain
    })

  }

  return stocks
}

function getPercentage(startingStock, targetStock) {
  const result = ((targetStock - startingStock) / startingStock * 100) - 0.36
  return result.toFixed(2)
}


const domContainer = document.querySelector('#root')
ReactDOM.render(<App />, domContainer)
