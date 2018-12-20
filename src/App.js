import React, { Component } from 'react';
import './App.css';
import Plot from 'react-plotly.js';
import SideBar from "./SideBar";
import HeaderInfo from "./HeaderInfo";
import Graph from "./Graph";
import ControlPanel from "./ControlPanel";
import firebase from 'firebase';

class App extends Component {
  componentWillMount() {
    var config = {
        apiKey: "AIzaSyC-u2L_2oJfr5Qb9qmecn3oYzeI8lGtXj8",
        authDomain: "embed-99efa.firebaseapp.com",
        databaseURL: "https://embed-99efa.firebaseio.com",
        projectId: "embed-99efa",
        storageBucket: "embed-99efa.appspot.com",
        messagingSenderId: "1059230370013"
    };

    firebase.initializeApp(config);
  }
  render() {
    return (
      <div className="App">
        <body>
          <div class="wrapper">
            <SideBar />

            <div class="main-panel">
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="#">Dashboard</a>
                        </div>
                    </div>
                </nav>

                <div class="content">
                    <div class="container-fluid">
                        <div class="row">
                          <HeaderInfo />
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="header">
                                        <h4 class="title">Moisture History</h4>
                                    </div>
                                    <div class="content">
                                      <div class="row">
                                        <div class="col-lg-12" style={{paddingRight: 50}}>
                                          <Graph />
                                        </div>
                                        <div class="col-lg-12" style={{paddingRight: 50}}>
                                          <ControlPanel />
                                        </div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <footer class="footer">
                    <div class="container-fluid">
                        <nav class="pull-left">
                            <ul>

                                <li>
                                    <a href="http://www.creative-tim.com">
                                        Creative Tim
                                    </a>
                                </li>
                                <li>
                                    <a href="http://blog.creative-tim.com">
                                       Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="http://www.creative-tim.com/license">
                                        Licenses
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div class="copyright pull-right">
                            &copy; <script>document.write(new Date().getFullYear())</script>, made with <i class="fa fa-heart heart"></i> by <a href="http://www.creative-tim.com">Creative Tim</a>
                        </div>
                    </div>
                </footer>

            </div>
          </div>
      </body>
    </div>
    );
  }
}

export default App;
