import React from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import Button from 'react-bootstrap/Button';

const spotifyWebApi = new Spotify();

class App extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      topArtist: {
        artist: '',
        artistPic: '',
      },
      clicked: 0,
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getTopArtist(time) {
    spotifyWebApi
      .getMyTopArtists({ time_range: `${time}` })
      .then((response) => {
        this.setState({
          topArtist: {
            artist: response.items[0].name,
            artistPic: response.items[0].images[0].url,
          },
          clicked: this.state.clicked + 1,
        });
        console.log(response);
      });
  }

  getSecondTopArtist(time) {
    spotifyWebApi
      .getMyTopArtists({ time_range: `${time}` })
      .then((response) => {
        this.setState({
          topArtist: {
            artist: response.items[1].name,
            artistPic: response.items[1].images[1].url,
          },
          clicked: this.state.clicked + 1,
        });
        console.log(response);
      });
  }

  render() {
    const longTime = 'long_term';
    const mediumTime = 'medium_term';
    const shortTime = 'short_term';
    return (
      <div className='App'>
        <h1 className='title'>WHICH MUSICIAN DO YOU STAN?</h1>
        {!this.state.loggedIn ? (
          <a href='http://localhost:8888/'>
            <Button
              style={{
                backgroundColor: '#1DB954',
                border: 'none',
                fontFamily: 'Lato',
              }}
            >
              Login with Spotify
            </Button>
          </a>
        ) : null}
        {this.state.loggedIn ? (
          <div>
            {this.state.clicked === 0 ? (
              <Button
                style={{
                  backgroundColor: '#4905c7',
                  border: 'none',
                  fontFamily: 'Lato',
                  fontWeight: 400,
                  margin: '1em',
                }}
                size='lg'
                onClick={() => this.getTopArtist(longTime)}
              >
                WHO DO I STAN?
              </Button>
            ) : null}

            <div>
              <h2 className='artist'>{this.state.topArtist.artist}</h2>
              <img
                src={this.state.topArtist.artistPic}
                style={{ width: 200 }}
              />
            </div>

            {this.state.clicked === 1 ? (
              <div>
                <Button
                  style={{
                    backgroundColor: '#4905c7',
                    border: 'none',
                    fontFamily: 'Lato',
                    fontWeight: 400,
                    margin: '1em',
                  }}
                  onClick={() => this.getTopArtist(mediumTime)}
                >
                  THAT WAS LIKE 3 YEARS AGO!
                </Button>
                <Button
                  style={{
                    backgroundColor: '#ff2feb',
                    border: 'none',
                    fontFamily: 'Lato',
                    fontWeight: 400,
                    margin: '0.5em 1em',
                  }}
                  onClick={() => this.getSecondTopArtist(longTime)}
                >
                  I WAS GOING THROUGH A PHASE...
                  <br />
                  WHO ELSE DO I STAN
                </Button>
              </div>
            ) : null}
            {this.state.clicked === 2 ? (
              <div>
                <Button
                  style={{
                    backgroundColor: '#4905c7',
                    border: 'none',
                    fontFamily: 'Lato',
                    fontWeight: 400,
                    margin: '1em',
                  }}
                  onClick={() => this.getTopArtist(shortTime)}
                >
                  OK SURE, BUT I HAVE A NEW STAN NOW
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
