import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: 'Mortgage Calculator',
        inputs: 'Inputs',
        outputs: 'Outputs',
        loanAmount: 'Loan Amount',
        interestRate: 'Interest Rate',
        loanTerm: 'Loan Term',
        inflationRate: 'Inflation Rate',
        repaymentType: 'Repayment Type',
        totalPaidToBank: 'Total Paid to the Bank',
        totalInterestPaid: 'Total Interest Paid',
        monthlyInstallment: 'Monthly Installment',
        realPrincipalValue: 'Real Principal Value after Inflation',
        calculate: 'Calculate',
        switchLanguage: 'Switch to EN',
        switchLanguageCZ: 'Přepnout do CZ',
        months: 'Months',
        principalPayment: 'Principal Payment',
        interestPayment: 'Interest Payment',
      },
    },
    cz: {
      translation: {
        title: 'Hypoteční Kalkulačka',
        inputs: 'Vstupy',
        Outputs: 'Výstupy',
        loanAmount: 'Částka úvěru',
        interestRate: 'Úroková sazba',
        loanTerm: 'Doba splácení',
        inflationRate: 'Míra inflace',
        repaymentType: 'Typ splácení',
        totalPaidToBank: 'Celková částka zaplacená bance',
        totalInterestPaid: 'Celkem zaplaceno na úrocích',
        monthlyInstallment: 'Měsíční splátka',
        realPrincipalValue: 'Reálná hodnota jistiny po inflaci',
        calculate: 'Vypočítat',
        switchLanguage: 'Přepnout do EN',
        switchLanguageCZ: 'Switch to CZ',
        months: 'Měsíce',
        principalPayment: 'Splacená jistina',
        interestPayment: 'Zaplacený úrok',
      },
    },
  },
  lng: 'cz',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
