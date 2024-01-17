import { useState } from 'react'
import './App.css'
import { InputBox } from './components/index.js'
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (

    <div className="w-full h-screen flex flex-wrap justify-center
    items-center">
      <div className="w-full">
        <div
          className="w-full max-w-md mx-auto border border-gray-50 p-5 backdrop-blur-sm
        bg-white/30">
          <form onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}>
            <div className="w-full mb-1">
              <InputBox
                label="from"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from} />
            </div>
            <div className="relative w-full h-0.5">
              <button
                className="absolute left-1/2 -translate-x-1/2
                -translate-y-1/2 border-2 border-white
                bg-gradient-to-t from-slate-900 to-gray-700 text-white px-3 py-1"
                onClick={swap}>
                Swap
              </button>
            </div>
            <div className="w-full mb-1">
              <InputBox
                label="to"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                amountDisabled
                selectedCurrency={to} />
            </div>
            <button 
              type='submit'
              className="w-full mt-1 bg-gradient-to-t from-slate-900 to-gray-700
               text-white px-4 py-3">
                Convert
            </button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default App
