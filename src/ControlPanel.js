import React, { Component } from 'react';
import firebase from 'firebase';
import './btn.css'

export default class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treshold: null,
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    firebase.database().ref(`/`).on('value', (snapshot) => {
      console.log("fetch")
      console.log(snapshot.val())
      this.setState({
        treshold: snapshot.val().moistThreshold
      })
    });
  }

  onUpdateNewTreshold() {
    firebase.database().ref(`/`).child('moistThreshold').set(this.state.treshold).then(() => {
      alert("New Moisture Treshold has been set.")
    })
  }

  onMinus() {
    if(this.state.treshold-50<0) {
      this.setState({
        treshold: 0
      })
    }else {
      this.setState({
        treshold: this.state.treshold-50
      })
    }
  }

  onPlus() {
    this.setState({
      treshold: this.state.treshold+50
    })
  }

  render() {
    return(
      <div>
        <div class="row">
          <div class="card">
            <div class="content">
              <div class="row">
              <div class="qty mt-5">
                <span class="minus bg-dark" onClick={() => this.onMinus()}>-</span>
                  <input type="number" class="count" name="qty" style={{marginLeft: 5, marginRight: 5, width: 100}} value={this.state.treshold} />
                <span class="plus bg-dark" onClick={() => this.onPlus()}>+</span>
              </div>
              <div style={{paddingTop: 20}}>
              <button type="button" className="btn btn-secondary ">
                <div onClick={() => this.onUpdateNewTreshold()}>
                  Update new Treshold
                </div>
              </button>
              </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
