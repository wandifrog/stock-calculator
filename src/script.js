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

  const getStep = (stockValue) => {
    if (stockValue >= 5000) {
      return 25
    } else if (stockValue >= 2000) {
      return 10
    } else if (stockValue >= 600) {
      return 5
    } else if (stockValue >= 300) {
      return 2
    } else {
      return 1
    }
  }

  const handleChangeStockValue = (stockValue) => {
    stockValue = +stockValue
    
    const step = getStep(stockValue)
    const getStocksParams = {
      startingStock: stockValue,
      currentStock: stockValue,
      lot: state.totalLot,
      step
    }
    const stocks = getStocks(getStocksParams)

    const newState = {
      ...state,
      step,
      stockValue,
      min: stockValue - (step * 30),
      max: stockValue + (step * 90),
      stocks
    }

    setState(newState)
  }

  const handleChangeTotalLot = (totalLot) => {
    totalLot = +totalLot

    const getStocksParams = {
      startingStock: state.stockValue,
      currentStock: state.sliderValue,
      lot: totalLot,
      step: state.step
    }
    const stocks = getStocks(getStocksParams)

    setState({ ...state, totalLot, stocks })
  }

  const handleSlider = (stockValue) => {
    const sliderValue = +stockValue
    const step = getStep(sliderValue)
    const percentage = getPercentage(state.stockValue, sliderValue)
    
    setState({ ...state, sliderValue, percentage, step })

    clearTimeout(outsideState.sliderTimeout)
    outsideState.sliderTimeout = setTimeout(() => {
      const getStocksParams = {
        startingStock: state.stockValue,
        currentStock: +sliderValue,
        lot: state.totalLot,
        step: state.step
      }
      const stocks = getStocks(getStocksParams)
      setState({ ...state, stocks, sliderValue, percentage })
    }, 250)
  }

  // console.log('state', state)

  const renderTable = React.useMemo(() => {
    return (
      <table className="table mt-10" style={{ marginTop: 50 }}>
        <thead>
          <tr>
            <th scope="col">Price</th>
            <th scope="col">Percentage</th>
            <th scope="col">gain/loss</th>
          </tr>
        </thead>
        <tbody>
          {
            state.stocks.map((item) => {

              return (
                <tr key={item.no} className={
                  item.stock === state.sliderValue
                    ? 'table-info'
                    : item.stock === state.stockValue
                      ? 'table-warning' : ''}>
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
        <div className="col-sm" style={{ marginTop: '10px' }}>
          <label htmlFor="customRange3" className="form-label">The neighbor's grass is greener</label>
          <input type="range" className="form-range" value={state.sliderValue}
            min={state.min} max={state.max} step={state.step} id="slider" onChange={(e) => handleSlider(e.target.value)} />
          <div>{state.stockValue} -
            <input type="number" value={state.sliderValue} style={{ width: 80, marginLeft: 6 }}
              step={state.step} placeholder="Input Stock Here"
              onChange={(e) => handleSlider(e.target.value)} />
          </div>
          <div style={{ color: state.percentage >= 0 ? 'green' : 'red' }}>{state.percentage}%</div>
        </div>
      </div>

      {renderTable}

    </div>
  )
}

function getStocks({ startingStock, currentStock, lot = 0, step = 5, fee = outsideState.fee }) {
  const stocks = []
  const startingStockValue = startingStock * lot * 100
  for (
    let no = 1, stock = currentStock - (6 * step);
    no <= 65;
    no++, stock += step
  ) {
    // stock = currentStock in local for variable
    const percentage = ((stock - startingStock) / startingStock * 100).toFixed(2)
    const currentStockValue = stock * lot * 100
    const gain = (currentStockValue - startingStockValue).toLocaleString()
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
  const result = ((targetStock - startingStock) / startingStock * 100)
  return result.toFixed(2)
}


const domContainer = document.querySelector('#root')
ReactDOM.render(<App />, domContainer)
