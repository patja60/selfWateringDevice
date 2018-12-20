import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Plot from 'react-plotly.js';

export default class SideBar extends Component {
  render() {
    return(
      <div className="sidebar" data-background-color="white" data-active-color="danger">

        <div className="sidebar-wrapper">
              <div className="logo">
                  <a href="http://www.creative-tim.com" className="simple-text">
                      Creative Tim
                  </a>
              </div>

              <ul className="nav">
                  <li className="active">
                      <a href="dashboard.html">
                          <i className="fas fa-sliders-h"></i>
                          <p>Dashboard</p>
                      </a>
                  </li>
              </ul>
        </div>
      </div>
    );
  }
}
