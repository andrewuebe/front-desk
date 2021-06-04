import React from "react";
import axios from "axios";
import "./App.css";

//components
import Dvd from "./components/Dvd";
import Progress from "./components/Progress";

//api
const apiEndpoint = process.env.REACT_APP_API_DOMAIN;

class App extends React.Component {
  appContainer = React.createRef();
  titleText = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      hotelFound: false,
      height: 0,
      width: 0,
      movieOne: "",
      movieOneDate: "",
      movieOneSources: [],
      movieOneDetails: {},
      movieTwo: "",
      movieTwoDate: "",
      movieTwoSources: [],
      movieTwoDetails: {},
      minutesSinceChange: "",
      deliveryProgressVisible: false,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.showDeliveryProgress = this.showDeliveryProgress.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    axios.get(apiEndpoint+"/join").then((res) => {
      const yourHotel = res.data;
      this.setState({
        hotelFound: true,
        name: yourHotel.name,
        imageUrl: yourHotel.imageUrl,
        location: yourHotel.location,
        movieOne: yourHotel.movieOne,
        movieOneDate: yourHotel.movieOneDetails.releaseDate,
        movieOneSources: yourHotel.movieOneSources,
        movieOneDetails: yourHotel.movieOneDetails,
        movieTwo: yourHotel.movieTwo,
        movieTwoDate: yourHotel.movieTwoDetails.releaseDate,
        movieTwoSources: yourHotel.movieTwoSources,
        movieTwoDetails: yourHotel.movieTwoDetails,
        minutesSinceChange: yourHotel.minutesSinceChange
      });
      this.updateWindowDimensions();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {

    this.setState(
      {
        width: this.appContainer.current.clientWidth,
        height: this.appContainer.current.clientHeight,
      },
      () => {
        this.updateTitleHeight();
      }
    );
  }

  updateTitleHeight() {
    var bbox = this.titleText.current.getBoundingClientRect().height;
    console.log(this.titleText.current.getBoundingClientRect());
    this.setState({
      titleHeight: bbox + 30,
    });
  }

  showDeliveryProgress() {
    if(this.state.deliveryProgressVisible){
      document.body.style.overflow = "scroll"
    } else{
      document.body.style.overflow = "hidden"
    }
    this.setState(prevState => ({
      deliveryProgressVisible: !prevState.deliveryProgressVisible
    }));
  }

  render() {
    return (
      <div className="app" ref={this.appContainer}>
        <div className="site-title">
          <svg
            className="app-border"
            width={this.state.width}
            height={this.state.height}
            viewBox={`0 0 ${this.state.width} ${this.state.height}`}
          >
            <path
              d={`M 30 60 V ${this.state.height - 30} H ${
                this.state.width - 30
              } V ${this.state.titleHeight}`}
              fill="transparent"
              stroke="black"
              strokeWidth="4"
              id="app-border-line"
            />

            <path
              d={`M 60 42 H ${this.state.width - 42} V ${
                this.state.height - 42
              }`}
              fill="transparent"
              stroke="white"
              strokeOpacity="0.0"
              strokeWidth="3"
              id="app-title"
            />
            <g id="test" ref={this.titleText}>
              <text width="900" color="white" fill="black">
                <textPath xlinkHref="#app-title" fill="black">
                  <a href="https://google.com/">
                  theonlytwodvdstheyhaveatthefrontdeskatthisearlyaughtshotel.com
                  </a>
                </textPath>
              </text>
            </g>
            <path
              d="M30,19,33.52671151375484,29.145898033750314,44.265847744427305,29.36474508437579,35.70633909777092,35.85410196624969,38.8167787843871,46.135254915624216,30,40,21.183221215612903,46.135254915624216,24.293660902229078,35.85410196624969,15.734152255572697,29.364745084375784,26.47328848624516,29.145898033750317Z"
              fill="black"
              stroke="black"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div
          className={this.state.hotelFound ? "hotel-info loaded" : "hotel-info"}
        >
          <div
            className="hotel-hero"
            style={this.state.hotelFound ? { backgroundImage: `url('${process.env.PUBLIC_URL}/front-desk-hero.png')` } : { backgroundImage: `url('${process.env.PUBLIC_URL}/loading-cover.gif')` }}
          >
            <div className="hotel-details">
              <div className="hotel-name"><span>{this.state.hotelFound ? this.state.name : `Loading...`}</span></div>
              <div className="hotel-location"><span>{this.state.hotelFound ?  this.state.location : `Talking to the server.`}</span></div>
            </div>
          </div>
        </div>
        <div
          className={this.state.hotelFound ? "hotel-dvds loaded" : "hotel-dvds"}
        >
          <div className="speech-bubble-intro">The employee at the front desk presents you with two worn dvd cases. With a smile, the employee adds:</div>
          <blockquote className="speech-bubble heading--halftone">
            <p>"These are all the movies we have. Enjoy!"</p>
          </blockquote>
          <div className="dvds-wrapper">
            <div className="dvd-one">
              <Dvd
                recalculateAppDimensions={this.updateWindowDimensions}
                movieName={String(this.state.movieOne)}
                movieDate={this.state.movieOneDate}
                movieSources={this.state.movieOneSources}
                movieDetails={this.state.movieOneDetails}
                movieDataLoaded={this.state.hotelFound}
              ></Dvd>
            </div>
            <div className="dvd-two">
              <Dvd
                movieName={String(this.state.movieTwo)}
                movieDate={this.state.movieTwoDate}
                movieSources={this.state.movieTwoSources}
                movieDetails={this.state.movieTwoDetails}
                movieDataLoaded={this.state.hotelFound}
              ></Dvd>
            </div>
          </div>
          <div className="new-dvds">
            <div className="new-dvds-head">Too picky? Burn through these DVDs?</div>
            <p>The employee at the front desk's buddy is <div className="fake-link" onClick={this.showDeliveryProgress}>on their way with new DVDs</div>. Sorry you have to wait!</p>
          </div>
          <div className="socials">
            <div className="socials-head">Like the website?</div>
            <p>Donate <a href="https://ko-fi.com/imuebes">a buck or two</a> so I can pay to keep this silly project online!</p>
          </div>
        </div>
        <div className={this.state.deliveryProgressVisible ? "dvd-delivery show-progress" : "dvd-delivery"}>
          <div className="close-menu"><div className="close-btn" onClick={this.showDeliveryProgress}>X</div></div>
          <Progress minutesSinceChange={this.state.minutesSinceChange}></Progress>
        </div>
      </div>
    );
  }
}

export default App;
