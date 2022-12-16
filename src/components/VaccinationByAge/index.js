// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {VaccinationByAgeDetails} = props

  return (
    <div className="responsive-container">
      <h1 className="heading">Vaccination by age</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={VaccinationByAgeDetails}
            startAngle={0}
            endAngle={360}
            innerRadius="0%"
            outerRadius="50%"
            dataKey="count"
          >
            <Cell name="18-44" fill=" #5a8dee" />
            <Cell name="44-60" fill="#a3df9f" />
            <Cell name="60 Above" fill="#2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
