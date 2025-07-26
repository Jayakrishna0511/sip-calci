
import React, { useState, useEffect } from 'react';
// import '../styles/SipCalculator.css';
import './SipCalculator.css';

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10600);
  const [expectedReturn, setExpectedReturn] = useState(5.4);
  const [timePeriod, setTimePeriod] = useState(10);

  const [investedAmount, setInvestedAmount] = useState(0);
  const [estReturns, setEstReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = timePeriod * 12;
    const invested = monthlyInvestment * totalMonths;

    const maturityAmount =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate);

    setInvestedAmount(invested);
    setEstReturns(maturityAmount - invested);
    setTotalValue(maturityAmount);
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  const getPercentage = () =>
    totalValue === 0 ? 0 : (estReturns / totalValue) * 100;

  return (
    <div className="sip-container">
      <div className="sip-grid">
        {/* Left Panel - Inputs */}
        <div className="sip-inputs">
          {/* Monthly Investment */}
          <div className="sip-control">
            <label>Monthly investment</label>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) =>
                setMonthlyInvestment(
                  Math.max(500, Math.min(100000, parseInt(e.target.value) || 500))
                )
              }
            />
            <input
              type="range"
              min="500"
              max="100000"
              step="100"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(parseInt(e.target.value))}
            />
            <div className="sip-range-labels">
              <span>₹500</span>
              <span>₹1,00,000</span>
            </div>
          </div>

          {/* Expected Return Rate */}
          <div className="sip-control">
            <label>Expected return rate (p.a)</label>
            <input
              type="number"
              value={expectedReturn}
              step="0.1"
              onChange={(e) =>
                setExpectedReturn(
                  Math.max(1, Math.min(30, parseFloat(e.target.value) || 1))
                )
              }
            />
            <input
              type="range"
              min="1"
              max="30"
              step="0.1"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
            />
            <div className="sip-range-labels">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Time Period */}
          <div className="sip-control">
            <label>Time period (years)</label>
            <input
              type="number"
              value={timePeriod}
              onChange={(e) =>
                setTimePeriod(
                  Math.max(1, Math.min(40, parseInt(e.target.value) || 1))
                )
              }
            />
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={timePeriod}
              onChange={(e) => setTimePeriod(parseInt(e.target.value))}
            />
            <div className="sip-range-labels">
              <span>1Yr</span>
              <span>40Yr</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Output */}
        <div className="sip-output">
          <div className="sip-progress">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="35" stroke="#eee" strokeWidth="10" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#4f46e5"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${(getPercentage() / 100) * 219.9} 219.9`}
                strokeLinecap="round"
              />
            </svg>
            <div className="sip-legend">
              <div><span className="dot gray"></span>Invested amount</div>
              <div><span className="dot blue"></span>Est. returns</div>
            </div>
          </div>

          <div className="sip-summary">
            <div className="sip-summary-item">
              <span>Invested amount</span>
              <span>{formatCurrency(investedAmount)}</span>
            </div>
            <div className="sip-summary-item">
              <span>Est. returns</span>
              <span>{formatCurrency(estReturns)}</span>
            </div>
            <div className="sip-summary-item total">
              <strong>Total value</strong>
              <strong>{formatCurrency(totalValue)}</strong>
            </div>
          </div>

          <button className="sip-button">INVEST NOW</button>
        </div>
      </div>
    </div>
  );
};

export default SipCalculator;
