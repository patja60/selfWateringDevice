import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

export default class HeaderInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temp: 0,
      weather: "",
      cloud: 0,
      moisture: null,
      time: null
    };
  }

  componentWillMount(){
    this.fetchWeather();
    this.fetchData();
  }

  fetchData() {
    firebase.database().ref(`/`).on('value', (snapshot) => {
      console.log(snapshot.val().time.substring(1,snapshot.val().time.length - 1));
      var string = snapshot.val().time.substring(1,snapshot.val().time.length - 1)
      var date = new Date(string);
      var hh = date.getUTCHours();
      hh = (hh+7)%24;
      var mm = date.getUTCMinutes();
      var ss = date.getSeconds();
      // If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
      // if (hh > 12) {hh = hh % 12;}
      // These lines ensure you have two-digits
      if (hh < 10) {hh = "0"+hh;}
      if (mm < 10) {mm = "0"+mm;}
      if (ss < 10) {ss = "0"+ss;}
      // This formats your string to HH:MM:SS
      var t = hh+":"+mm+":"+ss;
      console.log(t)
      this.setState({
        moisture: snapshot.val().moist,
        time: t
      })
    });
  }

  fetchWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Bangkok&APPID=4efbac71fc7a2b3418b7862460b1c041')
    .then(response => {return response.json()})
    .then(data => {
      console.log(data)
      var date = new Date();
      var hh = date.getUTCHours();
      hh = (hh+7)%24;
      var mm = date.getUTCMinutes();
      var ss = date.getSeconds();
      if (hh < 10) {hh = "0"+hh;}
      if (mm < 10) {mm = "0"+mm;}
      if (ss < 10) {ss = "0"+ss;}
      var t = hh+":"+mm+":"+ss;
      this.setState({
        temp: data.main.temp,
        weather: data.weather[0].description,
        cloud: data.clouds.all,
        weatherTime: t
      })
    })
  }

  render() {
    return(
      <div>
        <div class="col-lg-3 col-sm-6">
          <div class="card">
              <div class="content">
                  <div class="row">
                      <div class="col-xs-5">
                          <div class="icon-big icon-warning text-center">
                              <i class="fas fa-seedling"></i>
                          </div>
                      </div>
                      <div class="col-xs-7">
                          <div class="numbers">
                              <p>Moisture</p>
                              {this.state.moisture}
                          </div>
                      </div>
                  </div>
                  <div class="footer">
                      <hr />
                      <div class="stats">
                          <i class="fas fa-sync-alt"></i> Last Update: {this.state.time}
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="col-lg-3 col-sm-6">
          <div class="card">
              <div class="content">
                  <div class="row">
                      <div class="col-xs-5">
                          <div class="icon-big icon-success text-center">
                              <i class="fas fa-cloud-sun"></i>
                          </div>
                      </div>
                      <div class="col-xs-7">
                          <div class="numbers">
                              <p>Weather</p>
                              <div style={{fontSize: 20}}>
                                {this.state.weather}
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="footer">
                      <hr />
                      <div class="stats">
                          <i class="fas fa-sync-alt"></i> Last Update: {this.state.weatherTime}
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="col-lg-3 col-sm-6">
          <div class="card">
              <div class="content">
                  <div class="row">
                      <div class="col-xs-5">
                          <div class="icon-big icon-danger text-center">
                              <i class="fas fa-thermometer-three-quarters"></i>
                          </div>
                      </div>
                      <div class="col-xs-7">
                          <div class="numbers">
                              <p>Temperature</p>
                              {parseInt(this.state.temp-273.00)} °C
                          </div>
                      </div>
                  </div>
                  <div class="footer">
                      <hr />
                      <div class="stats">
                          <i class="fas fa-sync-alt"></i> Last Update: {this.state.weatherTime}
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="col-lg-3 col-sm-6">
          <div class="card">
              <div class="content">
                  <div class="row">
                      <div class="col-xs-5">
                          <div class="icon-big icon-info text-center">
                              <i class="fas fa-cloud"></i>
                          </div>
                      </div>
                      <div class="col-xs-7">
                          <div class="numbers">
                              <p>Cloudiness</p>
                              {this.state.cloud} %
                          </div>
                      </div>
                  </div>
                  <div class="footer">
                      <hr />
                      <div class="stats">
                          <i class="fas fa-sync-alt"></i> Last Update: {this.state.weatherTime}
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
