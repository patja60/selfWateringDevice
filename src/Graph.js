import React, { Component } from 'react';
import firebase from 'firebase';
import Plot from 'react-plotly.js';

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayData: null,
      xData: null,
      yData: null
    };
  }

  componentWillMount() {
    this.fetchGraphData();
  }

  fetchGraphData() {
    firebase.database().ref(`/`).on('value', (snapshot) => {
      const counter = snapshot.val().counter - 1;
      const arrayData = [];
      const yData = [];
      const xData = [];
      for(let i = counter, c = 0 ; (i>=0)&(c<=10) ; i--, c++){
        arrayData.push({moist: snapshot.val().graph[i].moist, time: (snapshot.val().graph[i].time).substring(1, snapshot.val().graph[c].time.length-1)})
        yData.push(snapshot.val().graph[i].moist);
        var date = new Date((snapshot.val().graph[i].time).substring(1, snapshot.val().graph[i].time.length-1));
        var hh = date.getUTCHours();
        hh = (hh+7)%24;
        var mm = date.getUTCMinutes();
        var ss = date.getSeconds();
        if (hh < 10) {hh = "0"+hh;}
        if (mm < 10) {mm = "0"+mm;}
        if (ss < 10) {ss = "0"+ss;}
        var t = hh+":"+mm;
        xData.push(t)
      }
      this.setState({
        arrayData: arrayData.reverse(),
        yData: yData.reverse(),
        xData: xData.reverse()
      });
    });
  }

  render() {
    console.log(this.state.xData&this.state.yData)
    if(this.state.xData!==null&this.state.yData!==null){
      return(
        <div>
          <Plot
            data={[
              {
                x: this.state.xData,
                y: this.state.yData,
                type: 'scatter',
                mode: 'lines+points',
                marker: {color: 'red'},
              },
            ]}
            layout={{
              xaxis: {
                title: 'Time',
              },
              yaxis: {
                title: 'Moisture'
              }
            }}
          />
        </div>
      );
    }else{
      return <div>Loading</div>
    }
  }
}
