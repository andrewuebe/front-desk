import React from "react";

var dynamicWidth = 0;

function parseProgressHeader(val) {
  if (val >= 3600){
    return "Refresh!"
  }
  if (val >= 3300){
    return "New movies will be here soon!"
  }
  if (val >= 3000) {
    return "Check back a bit later."
  }
  if (val >= 1800) {
    return "New movies will be here in a little over a day."
  }
  if (val >= 720) {
    return "It's going to be a couple days."
  }
  if (val >= 0) {
    return "FRICK. We just got new movies."
  }
}

function parseProgressCopy(val) {
  if (val >= 3600){
    return 'The employee at the front desk scratches his head. Lol, sorry these are the wrong DVDs, my buddy JUST delivered two new ones!'
  }
  if (val >= 3300){
    return "The employee at the front desk is excited to tell you his friend with a ton of DVDs is lending two new ones in, like, only a few hours!"
  }
  if (val >= 3000) {
    return "The employee at the front desk shoots their buddy who lends the hotel a text, and lets you know new movies are coming in about half a day."
  }
  if (val >= 1800) {
    return 'The employee at the front desk quickly calls their buddy who lends the hotel DVDs. They let you know new movies will be here in about a day.';
  }
  if (val >= 720) {
    return 'The employee at the front desk quickly calls their buddy, and lets you know they will arrive with new DVDs in a couple days.';
  }
  if (val >= 0) {
    return "The employee at the front desk lets you know that their buddy just delivered new DVDs from their collection. We're stuck with these for a little."
  }
}

function dynamicProgressWidth(mins) {
  if(mins >= 3600) {
    dynamicWidth = '100%';
  } else {
    dynamicWidth = `${(mins / 3600) * 100}%`;
  }
  return dynamicWidth;
}

function Progress(props) {
  return(
    <div className="progress-wrapper">
      <div className="progress-container">
        <div className="dvd-name">{parseProgressHeader(props.minutesSinceChange)}</div>
        <p>{parseProgressCopy(props.minutesSinceChange)}</p>
        <div className="progress-time"></div>
        <div className="progress-bar-container">
          <div className="bar-grey"></div>
          <div className="bar-progress" style={{width: dynamicProgressWidth(props.minutesSinceChange)}}></div>
        </div>
      </div>
    </div>
  )
}

export default Progress;
