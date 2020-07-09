import React, { Component } from "react";
import "./style.css";
class Cylinder extends Component {
  render() {
    return (
      <div id="cylinder">
    
        <div class="sculpt one"></div>
        <div class="sculpt two"></div>
        <div class="sculpt three"></div>
        <div class="sculpt four"></div>
        <div class="sculpt five"></div>
        <div class="sculpt six"></div>

        <div class="ring center"></div>

        <div class="chamber one">
          <div class="bullet">
            <div class="ring"></div>
          </div>
        </div>
        <div class="chamber two">
          <div class="bullet">
            <div class="ring"></div>
          </div>
        </div>
        <div class="chamber three">
          <div class="bullet">
            <div class="ring"></div>
          </div>
        </div>
        <div class="chamber four">
          <div class="bullet">
            <div class="ring"></div>
          </div>
        </div>
        <div class="chamber five">
          <div class="bullet">
            <div class="ring"></div>
          </div>
        </div>
        <div class="chamber six">
          <div class="bullet">
            <div class="ring"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cylinder;
