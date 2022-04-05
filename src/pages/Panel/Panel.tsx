import React, { Component } from 'react';
import '../../assets/css/materialize.css';
import './Panel.css';


const Panel: React.FC = () => {
  return (
    <div className="main-container">
      <div>
        <nav>
          <div className="nav-wrapper">
            <ul className="left nav-buttons">
              <li>
                <a href="panel_analytics-watcher.html" className="logo-dp6"><i className="material-icons"><img src={require('../../assets/icons/rect4069.png')} id="logo-dp6" /></i></a>
              </li>
              <li>
                <i className="material-icons center-align"
                ><a
                  className="modal-trigger"
                  title="Datalayer Penguin"
                  href="panel_penguin-datalayer.html"
                >settings_ethernet</a
                  ></i
                >
              </li>
              <li className="add-filter active-filter">
                <i className="material-icons center-align">
                  <a className="add-filter" href="#">
                    <img src={require('../../assets/img/filter-add.svg')} id="add-filter" title="Filters" />
                  </a>
                </i>
                <i className="material-icons center-align not-hide">
                  <a title="GA 4" className="analytics4" href="#"> filter_4 </a>
                </i>
                <i className="material-icons center-align not-hide">
                  <a className="pageview" title="Pageview" href="#"> find_in_page </a>
                </i>
                <i className="material-icons center-align not-hide">
                  <a className="appview" title="App View" href="#"> apps </a>
                </i>
                <i className="material-icons center-align not-hide">
                  <a className="event" title="Event" href="#"> flash_on </a>
                </i>
                <i className="material-icons center-align not-hide">
                  <a className="timing" title="Timing" href="#"> timelapse </a>
                </i>
                <i className="material-icons center-align not-hide">
                  <a className="social" title="Social" href="#"> share </a>
                </i>
                <i className="material-icons center-align not-hide">
                  <a className="item" title="Item" href="#"> shopping_basket </a>
                </i>
                <i className="material-icons center-align not-hide">
                  <a className="transaction" title="Transaction" href="#">
                    monetization_on
                  </a>
                </i>
                <i className="material-icons center-align not-hide">
                  <a className="exception" title="Exception" href="#"> report </a>
                </i>
              </li>
              <li>
                <i className="material-icons center-align">
                  <a
                    className="clear-filter"
                    title="Clear Filters"
                    href="#"
                    id="remove-filter"
                  >
                    clear_all
                  </a>
                </i>
              </li>
              <li>
                <i className="material-icons center-align">
                  <a className="clear-report" title="Clear Report" href="#">delete</a>
                </i>
              </li>

              <li id="search-input">
                <form>
                  <div className="input-field">
                    <input placeholder="Search..." type="text" id="busca" />
                  </div>
                </form>
              </li>

              <li id="search-icon">
                <i className="material-icons center-align search"><a title="Search">search</a></i>
              </li>
            </ul>
          </div>

          <div className="progress navbar-gradient">
            <div className="determinate"></div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Panel;
