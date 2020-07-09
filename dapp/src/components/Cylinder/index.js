import React, { Component } from "react";
import array from 'lodash/array'
import "./style.css";

class Cylinder extends Component {
  render() {
    const { num } = this.props;
    let bulletArr = ['chamber one', 'chamber two', 'chamber three','chamber four', 'chamber five', 'chamber six'];
    let ownBullet = array.take(bulletArr, num);  
    let emptyBullet =  array.drop(bulletArr, num); 
    console.log(ownBullet, emptyBullet)
    
    return (
     
      <div id="cylinder">
        <div className="sculpt one"></div>
        <div className="sculpt two"></div> 
        <div className="sculpt three"></div> 
        <div className="sculpt four"></div>
        <div className="sculpt five"></div>
        <div className="sculpt six"></div>

        <div className="ring center"></div>

        {ownBullet.map((item, index) => {
            return (
                <div className={item}>
                    <div className="bullet">
                        <div className="ring"></div>
                    </div>
                </div>
            )
        })}

        
        {emptyBullet.map((item, index) => {
            return (
                <div className={item}>
                </div>
            )
        })}
      </div>
    );
  }
}

export default Cylinder;
