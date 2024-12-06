import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import React, { useEffect, useState } from 'react'

import { Line } from 'react-chartjs-2'
import { stringify } from 'querystring'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

const Regulators: React.FC = () => {
  const [Kp, setKp] = useState(5.0)
  const [Ki, setKi] = useState(0.5)
  const [Kd, setKd] = useState(0.1)
  const [dt, setDt] = useState(0.1)
  const [setPoint, setSetPoint] = useState(10)
  const [initialValue, setInitialValue] = useState(0)
  const [resultError, setresultError] = useState(0.1)
  const [data, setData] = useState<{ time: number[]; actual: number[] }>({
    time: [],
    actual: [],
  })
  const [pidData, setPidData] = useState<{ time: number[]; value: number[] }>({
    time: [],
    value: [],
  })

  useEffect(() => {
    const simulatePID = () => {
      const time: number[] = []
      const actual: number[] = []
      let actualValue = initialValue
      let integral = 0
      let previousError = 0

      for (let t = 0; t <= 5; t += dt) {
        const error = setPoint - actualValue
        integral += error * dt
        const derivative = (error - previousError) / dt
        const output = Kp * error + Ki * integral + Kd * derivative
        actualValue += output * dt

        time.push(t)
        actual.push(parseFloat(actualValue.toFixed(3)))
        previousError = error
      }

      setData({ time, actual })
    }

    simulatePID()
  }, [Kp, Ki, Kd, setPoint, initialValue])

  const PID = () => {
    let step = 0
    let integral = 0
    let error = Math.abs(initialValue - setPoint)
    let actualValue = initialValue
    const time = [0]
    const output = [initialValue]

    // while (error > resultError || step < 5) {
    while (step < 5) {
      console.log(step, time[step], output[step], error, integral)
      error = setPoint - output[step]
      integral += error * dt

      const regOutput = Kp * error + Ki * integral
      actualValue += regOutput * dt

      output.push(parseFloat(actualValue.toFixed(3)))
      time.push(parseFloat((time[step] + dt).toFixed(3)))
      step++
    }
    console.log('time: ', time)
    console.log('values: ', output)
    setPidData({ time: time, value: output })
  }

  return (
    <div>
      <h1>Regulators Simulation</h1>
      <button onClick={() => PID()}>PID</button>
      <p>time: {pidData.time.map(n => String(n + ' '))}</p>
      <p>value: {pidData.value.map(n => String(n + ' '))}</p>
      <div>{}</div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          time step:
          <input
            type='number'
            value={dt}
            step='1'
            onChange={e => setDt(parseFloat(e.target.value))}
            style={{ marginLeft: '10px', marginRight: '20px' }}
          />
        </label>
        <label>
          Rresult error:
          <input
            type='number'
            value={resultError}
            step='1'
            onChange={e => setresultError(parseFloat(e.target.value))}
            style={{ marginLeft: '10px', marginRight: '20px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Initial Value:
          <input
            type='number'
            value={initialValue}
            step='1'
            onChange={e => setInitialValue(parseFloat(e.target.value))}
            style={{ marginLeft: '10px', marginRight: '20px' }}
          />
        </label>
        <label>
          Set point:
          <input
            type='number'
            value={setPoint}
            step='1'
            onChange={e => setSetPoint(parseFloat(e.target.value))}
            style={{ marginLeft: '10px', marginRight: '20px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Kp:
          <input
            type='number'
            value={Kp}
            step='0.1'
            onChange={e => setKp(parseFloat(e.target.value))}
            style={{ marginLeft: '10px', marginRight: '20px' }}
          />
        </label>
        <label>
          Ki:
          <input
            type='number'
            value={Ki}
            step='0.1'
            onChange={e => setKi(parseFloat(e.target.value))}
            style={{ marginLeft: '10px', marginRight: '20px' }}
          />
        </label>
        <label>
          Kd:
          <input
            type='number'
            value={Kd}
            step='0.1'
            onChange={e => setKd(parseFloat(e.target.value))}
            style={{ marginLeft: '10px', marginRight: '20px' }}
          />
        </label>
      </div>

      <Line
        data={{
          labels: data.time,
          datasets: [
            {
              label: 'Actual Value',
              data: data.actual,
              borderColor: 'blue',
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'SetPoint',
              data: Array(data.time.length).fill(setPoint),
              borderColor: 'red',
              borderDash: [5, 5],
              borderWidth: 2,
              fill: false,
            },
          ],
        }}
        options={{
          scales: {
            x: { title: { display: true, text: 'Time (s)' } },
            y: { title: { display: true, text: 'Value' } },
          },
        }}
      />

      <div style={{ marginTop: '40px' }}>
        <h2>Block Diagram of PID Controller</h2>
        <img
          src='https://tse3.mm.bing.net/th?id=OIP.H_7jsDPSbM8IUjCFVMwhOwHaDa&pid=Api'
          alt='PID Block Diagram'
          style={{ width: '80%', maxWidth: '600px', margin: 'auto', display: 'block' }}
        />
      </div>
    </div>
  )
}

export default Regulators
