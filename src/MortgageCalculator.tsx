import './Translator'

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'
import {
  BoldText,
  Button,
  Container,
  Heading1,
  Heading2,
  Input,
  InputContainer,
  Text,
} from './Styles'
import { initReactI18next, useTranslation } from 'react-i18next'

import { Bar } from 'react-chartjs-2'
import { useState } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const units = {
  kc: 'Kč',
  year: 'years',
  eur: 'eur',
  percent: '%',
}

const MortgageCalculator = () => {
  const { t, i18n } = useTranslation()

  // Calc input parameters
  const [loanAmount, setLoanAmount] = useState(100000)
  const [interestRate, setInterestRate] = useState(5)
  const [loanTerm, setLoanTerm] = useState(10)
  const [inflationRate, setInflationRate] = useState(3)
  const [repaymentType, setRepaymentType] = useState('')
  //  Calc output parameters
  const [totalPayment, setTotalPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [realLoanAmount, setRealLoanAmount] = useState(0)

  const handleChange = () => {
    calculatePayment()
  }

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'cz' ? 'en' : 'cz')
  }

  const calculatePayment = () => {
    const monthlyRate = interestRate / 12 / 100
    const numberOfPayments = loanTerm * 12

    const calculatedMonthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const calculatedTotalPayment = calculatedMonthlyPayment * numberOfPayments
    const calculatedTotalInterest = calculatedTotalPayment - loanAmount
    const calculatedRealLoanAmount = loanAmount / Math.pow(1 + inflationRate / 100, loanTerm)

    setMonthlyPayment(calculatedMonthlyPayment)
    setTotalPayment(calculatedTotalPayment)
    setTotalInterest(calculatedTotalInterest)
    setRealLoanAmount(calculatedRealLoanAmount)
  }

  const calculateAmortizationSchedule = () => {
    const monthlyRate = interestRate / 12 / 100
    const numberOfPayments = loanTerm * 12

    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    let remainingBalance = loanAmount
    const schedule = []

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingBalance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment

      schedule.push({
        month: i,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance - principalPayment,
      })

      remainingBalance -= principalPayment
    }

    return schedule
  }

  const LoanRepaymentChart = () => {
    const schedule = calculateAmortizationSchedule()
    const months = schedule.map(item => `Month ${item.month}`)
    const principalPayments = schedule.map(item => item.principal)
    const interestPayments = schedule.map(item => item.interest)

    const data = {
      labels: months,
      datasets: [
        {
          label: t('principalPayment'),
          data: principalPayments,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: t('interestPayment'),
          data: interestPayments,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    }
    const options: ChartOptions<'bar'> = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: t('amountInCZK'),
          },
          ticks: {
            callback: function (value) {
              return `${value} Kč`
            },
          },
        },
      },
    }

    return <Bar data={data} options={options} />
  }

  return (
    <Container>
      <Heading1>{t('title')}</Heading1>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleChange()
        }}
      >
        <Button type='submit' onClick={toggleLanguage}>
          {i18n.language === 'cz' ? t('switchLanguage') : t('switchLanguageCZ')}
        </Button>
        <Button type='submit' onClick={handleChange}>
          {t('calculate')}
        </Button>
        <Container flexDirection='row' alignItems='stretch'>
          <Container flexDirection='column' style={{ padding: '20px', textAlign: 'left' }}>
            <Heading2>{t('inputs')}</Heading2>
            <div style={{ marginTop: '10px' }}>
              <InputContainer>
                <Text>{t('loanAmount')}:</Text>
                <Input
                  id='LoanAmount'
                  type='number'
                  value={loanAmount}
                  step={100_000}
                  min={0}
                  onChange={e => {
                    setLoanAmount(Number(e.target.value))
                    handleChange()
                  }}
                />
                <Text>{units.kc}</Text>
              </InputContainer>
              <InputContainer>
                <Text>{t('interestRate')}:</Text>
                <Input
                  id='InterestRate'
                  type='number'
                  value={interestRate}
                  step={0.1}
                  min={0.1}
                  max={99}
                  onChange={e => {
                    setInterestRate(Number(e.target.value))
                    handleChange()
                  }}
                />
                <Text>{units.percent}</Text>
              </InputContainer>
              <InputContainer>
                <Text>{t('loanTerm')}:</Text>
                <Input
                  id='LoanTerm'
                  type='number'
                  value={loanTerm}
                  step={1}
                  min={1}
                  onChange={e => {
                    setLoanTerm(Number(e.target.value))
                    handleChange()
                  }}
                />
                <Text>{units.year}</Text>
              </InputContainer>
              <InputContainer>
                <Text>{t('inflationRate')}:</Text>
                <Input
                  id='InflationRate'
                  type='number'
                  value={inflationRate}
                  step={0.1}
                  min={0.1}
                  onChange={e => {
                    setInflationRate(Number(e.target.value))
                    handleChange()
                  }}
                />
                <Text>{units.percent}</Text>
              </InputContainer>
              <InputContainer>
                <Text>{t('repaymentType')}:</Text>
                <Input
                  id='RepaymentType'
                  type='text'
                  value={repaymentType}
                  onChange={e => {
                    setRepaymentType(e.target.value)
                  }}
                />
              </InputContainer>
            </div>
          </Container>
          <Container flexDirection='column' style={{ padding: '20px', textAlign: 'left' }}>
            <Heading2>{t('Outputs')}</Heading2>
            <Container
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              height='100%'
            >
              <Text>
                {t('totalPaidToBank')}:{' '}
                {totalPayment.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}
              </Text>
              <Text>
                {t('totalInterestPaid')}:{' '}
                {totalInterest.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}
              </Text>
              <Text>
                {t('monthlyInstallment')}:{' '}
                {monthlyPayment.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}
              </Text>
              <Text>
                {t('realPrincipalValue')}:{' '}
                {realLoanAmount.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}
              </Text>
            </Container>
          </Container>
        </Container>
        <Container>{LoanRepaymentChart()}</Container>
      </form>
    </Container>
  )
}
export default MortgageCalculator
