// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationDataDetails} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="responsive-container">
      <h1 className="heading">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={vaccinationDataDetails}
          margin={{
            top: 20,
          }}
        >
          <XAxis
            dataKey="vaccine_date"
            tick={{
              stroke: '#cbd5e1',
              strokeWidth: 1,
            }}
          />

          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: '#cbd5e1',
              strokeWidth: 0,
            }}
          />

          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />

          <Bar
            dataKey="dose_1"
            name="Dose_1"
            fill="#1f77b4"
            barSize="20%"
            radius={[5, 5, 0, 0]}
          />
          <Bar
            dataKey="dose_2"
            name="Dose_2"
            fill="#f54394"
            barSize="20%"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
