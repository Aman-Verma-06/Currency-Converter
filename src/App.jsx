import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [currencyOptions, setCurrencyOptions] = useState({})
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('INR')
  const [convertedAmount, setConvertedAmount] = useState(0)


  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
      .then((response) => response.json())
      .then((response) => setCurrencyOptions(response.rates))
  }, [from])


  useEffect(() => {
    const convertedRate = currencyOptions[to]
    if (convertedRate) {
      setConvertedAmount(amount * convertedRate)
    }

  }, [amount, from, to, currencyOptions])


  return (
    <>
      <div className='card' >
        <h1 className='text-6xl'>Currency Converter</h1>

        <div className='currency_exchange'>

          <div className="input_container" >
            <label className="input_label">Amount:</label>
            <input
              type="number"
              name="amount"
              className="input_field"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
          <div className="input_container">
            <label className="input_label">From Currency:</label>
            <select
              name="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="input_field">
              {Object.keys(currencyOptions).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="input_container">
            <label className="input_label">To Currency:</label>
            <select
              name="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="input_field">
              {Object.keys(currencyOptions).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className='output'>
          <h2>Converted Amount: {convertedAmount}</h2>
        </div>
      </div>
    </>
  )
}

export default App
