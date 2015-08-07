'use strict'

require('./index.styl')

var moment = require('moment');
var React      = require('react')
var DatePicker = require('./src/index')

var VALUE = moment(VALUE).add(7, 'days');
var LOCALE = 'en'

var TODAY = {
    en: 'Today',
    fr: 'Aujourd\'hui',
    de: 'Heute',
    es: 'Hoy',
    ro: 'Azi'
}

var GO2SELECTED = {
    en: 'Go to selected',
    es: 'Vaya a Favoritos',
    de: 'Zum ausgewählten',
    fr: 'Aller a la liste',
    ro: 'Mergi la selectie'
}

function emptyFn(){}

console.log('test')

var App = React.createClass({

    displayName: 'App',

    getInitialState: function() {
        return {
            disabled: true
        };
    },

    onLocaleChange: function(event) {
        LOCALE = event.target.value
        moment.locale(LOCALE)
        this.setState({})
    },

    onInputClick: function(event) {
        this.setState({ disabled: false });
    },

    render: function(){
        return <div style={{margin: 10}}>

            <p>Select locale: <select value={LOCALE} onChange={this.onLocaleChange}>
                    <option value="en">English (US)</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="es">Spanish</option>
                    <option value="ro">Romanian</option>
                </select>
            </p>

            <input onClick={this.onInputClick} value={moment(VALUE).fromNow(true)} />

            {!this.state.disabled && <DatePicker
              style={{width: 350, height: 300}}
              minDate={moment()}
              weekDayNames={['S','M','T','W','T','F','S']}
              locale   ={LOCALE}
              date    ={VALUE}
              onChange ={this.onChange}
            />}
        </div>
    },

    onChange: function(value) {
        console.log('selected ', value)
        VALUE = value
        this.setState({ disabled: true })
    }
})

React.render(<App />, document.getElementById('content'))
