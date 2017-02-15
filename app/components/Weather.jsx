var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherList = require('WeatherList');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal');

var Weather = React.createClass({
  getInitialState: function() {
    return {
      isLoading: false
    };
  },
  getDefaultProps: function() {
    return {
      city: '',
      temp: ''
    };
  },
  handleSetCity: function(city) {
    var that = this;

    this.setState({
      isLoading: true,
      errorMessage: undefined
    });

    openWeatherMap.getTemp(city).then(function (temp) {
      that.setState({
        city: city,
        temp: temp,
        isLoading: false
      })
    }, function (e) {
      console.log(e.message);
      that.setState({
        isLoading: false,
        errorMessage: e.message
      });
    });
  }
  ,
  render: function() {
    var {isLoading, city, temp, errorMessage} = this.state;

    function renderMessage () {
      if (isLoading) {
        return <p className="text-center">Loading...</p>;
      } else if (temp && city) {
        return <WeatherList city={city} temp={temp}/>;
      }
    }

    function renderError () {
      if (typeof errorMessage === 'string') {
        return <ErrorModal message={errorMessage}/>;
      }
    }

    return (
      <div>
        <h1 className="text-center">Get Weather</h1>
        <WeatherForm onSetCity={this.handleSetCity}/>
        {renderMessage()}
        {renderError()}
      </div>
    );
  }
});

module.exports = Weather;
