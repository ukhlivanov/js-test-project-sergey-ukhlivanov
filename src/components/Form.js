import React from 'react'
import axios from 'axios'
import Warning from './Warning'
import Result from './Result'


export default class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            age: 30,
            income: 85000,
            savings: 50000,
            contribution: 500,
            year: 2050,
            warning: true
        }
    }

    getData() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = 'https://naosxd9a48.execute-api.us-east-2.amazonaws.com/hiring/calculate'
        const baseUrl = proxyurl + url
        axios({
            method: 'post',
            url: baseUrl,
            headers: {
                'x-api-key': '8FbZ6sdhIf6yEPWVM1Sw56Km5G1GXwKL73CvWzWv',
            },
            data: {
                "age": Number(this.refInputAge.value) || this.state.age,
                "contribution": this.state.contribution,
                "income": this.state.income,
                "savings": this.state.savings
            }
        })
            .then(response => {
                this.setState({ data: response.data })
                console.log(this.state.data)
            })
            .then(() => {
                this.isWarning()
                this.checkYear()
            })
            .catch(err => console.log(err));

    }

    isWarning() {
        let lastContrInput = this.refInputContribution.value || this.state.contribution
        let lastIncomeInput = (this.refInputIncome.value / 12) / 10 || (this.state.income / 12) / 10

        if (lastContrInput < lastIncomeInput) {
            this.setState({ warning: true })
        } else {
            this.setState({ warning: false })
        }

    }

    checkYear() {
        const data = this.state.data.data

        for (let i = 0; i < data.length; i++) {
            if (data[i].availableMonthlyIncome * 12 * 0.7 > (this.refInputIncome.value || this.state.income)) {
                try {
                    this.setState({ year: data[i - 1].year })
                } catch (error) {
                    this.setState({ year: this.state.year })
                }
                break;
            }
        }
    }

    componentDidMount() {
        this.getData()
    }

    setAge() {
        this.getData()
        this.setState({ age: this.refInputAge.value })
        this.isWarning()
        this.checkYear()
    }

    setIncome() {
        this.setState({ income: this.refInputIncome.value })
        this.isWarning()
        this.checkYear()

    }

    setSavings() {
        this.setState({ savings: this.refInputSavings.value })
        this.isWarning()
        this.checkYear()

    }

    setContribution() {
        this.setState({ contribution: this.refInputContribution.value })
        this.isWarning()
        this.checkYear()
    }

    render() {
        return (
            <div>
                <span>I am </span>
                <input
                    className = 'i-age'
                    min='21'
                    name='age'
                    type='text'
                    value={this.state.age}
                    ref={refInputAge => this.refInputAge = refInputAge}
                    onChange={() => this.setAge()}
                />
                <span> years old with</span>
                <span className='income'>
                    <input
                    className = 'i-income'
                    name='income'
                    type='text'
                    value={this.state.income}
                    ref={refInputIncome => this.refInputIncome = refInputIncome}
                    onChange={() => this.setIncome()}
                /></span>
                <span> in pre-tax income and</span>
                <span className='savings'>
                    <input
                    className = 'i-savings'
                    name='savings'
                    type='text'
                    value={this.state.savings}
                    ref={refInputSavings => this.refInputSavings = refInputSavings}
                    onChange={() => this.setSavings()}
                /></span>
                <span> in savings.</span>
                <br></br>
                <br></br>
                <span> I can contribute </span>
                <span className='contribution'>
                    <input
                    className = 'i-contribution'
                    name='contribution'
                    type='text'
                    value={this.state.contribution || 0}
                    ref={refInputContribution => this.refInputContribution = refInputContribution}
                    onChange={() => this.setContribution()}
                /></span>
                <span> every month to my retirement savings.</span>

                {this.state.warning ? <Warning /> : null}

                <Result year={this.state.year} />
            </div>
        )
    }
}