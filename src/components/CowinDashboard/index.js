// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

const status = {
  success: 'SUCCESS',
  inLoading: 'LOADING',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    vaccineData: {},
    apiStatus: status.inLoading,
  }

  componentDidMount() {
    this.getData()
  }

  getBadCredentials = () => (
    <div className="fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="fail-image"
      />
      <h1 className="fail-description">Something Went Wrong</h1>
    </div>
  )

  getLoader = () => (
    <div className="loader" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  getData = async () => {
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(covidVaccinationDataApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachDayData => ({
          vaccine_date: eachDayData.vaccine_date,
          dose_1: eachDayData.dose_1,
          dose_2: eachDayData.dose_2,
        })),

        vaccineByAge: data.vaccination_by_age.map(eachAgeData => ({
          age: eachAgeData.age,
          count: eachAgeData.count,
        })),
        vaccineByGender: data.vaccination_by_gender.map(eachGenderData => ({
          count: eachGenderData.count,
          gender: eachGenderData.gender,
        })),
      }
      this.setState({vaccineData: updatedData, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  getSuccess = () => {
    const {vaccineData} = this.state

    return (
      <div>
        <VaccinationCoverage
          vaccinationDataDetails={vaccineData.last7DaysVaccination}
        />

        <VaccinationByGender
          VaccinationByGenderDetails={vaccineData.vaccineByGender}
        />
        <VaccinationByAge VaccinationByAgeDetails={vaccineData.vaccineByAge} />
      </div>
    )
  }

  appStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case status.success:
        return this.getSuccess()
      case status.failure:
        return this.getBadCredentials()
      case status.inLoading:
        return this.getLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="navbar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="main-heading">Co-WIN</h1>
        </div>
        <h1 className="main-paragraph">CoWIN Vaccination in India</h1>
        {this.appStatus()}
      </div>
    )
  }
}

export default CowinDashboard
