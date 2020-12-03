// Selector
const input = document.getElementById('input')
const slider = document.getElementById('slider')

const outsideState = {
  defaultValue: 1475,
  typingTimeout: null
}

const App = () => {

  const [state, setState] = React.useState({
    value: outsideState.defaultValue,
    min: 0,
    max: 0,
    step: 5,
  })

  React.useEffect(() => {
    handleChangeStockValue(outsideState.defaultValue)
  }, [])

  const handleChangeStockValue = (stockValue) => {
    stockValue = +stockValue
    let step
    if (stockValue < 1000) {
      step = 5
    } else {
      step = 5
    }
    const newState = {
      ...state,
      step,
      value: stockValue,
      min: stockValue - (step * 20),
      max: stockValue + (step * 20)
    }

    setState(newState)
  }

  const asd2 = (value) => {
    setState({ ...state, value })
  }

  console.log('state', state)

  return (
    <div className="container d">
      <div className="row">
        <div className="col-sm">
          <h5>Stock Price</h5>
          <input type="number" className="form-control col-3" id="input"
            step={state.step} placeholder="Input Stock Here" defaultValue={state.value}
            noValidate onChange={(e) => handleChangeStockValue(e.target.value)}
          />
          <h5>Total Lot</h5>
          <input type="number" className="form-control col-3" id="input"
            step={state.step} placeholder="(optional)" defaultValue=""
            noValidate onChange={(e) => handleChangeStockValue(e.target.value)}
          />
        </div>
        <div className="col-sm">
          <div className="row mb-3">
            <label htmlFor="customRange3" className="form-label col-2">Example range</label>
            <div className="col-9">

            </div>
          </div>
          <input type="range" className="form-range" value={state.value}
            min={state.min} max={state.max} step={state.step} id="slider" onChange={(e) => asd2(e.target.value)} />
          <div>{state.value}</div>
        </div>
        <div className="col-sm">
        </div>
      </div>
    </div>
  )
}

console.clear()

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


getPercent(1475, 1490)
cuan(15147, 1.26)
percents(49802000)
// 0.3 0.3 0.66 1








const domContainer = document.querySelector('#root')
ReactDOM.render(<App />, domContainer)
