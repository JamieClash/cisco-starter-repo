import { getQueriesForElement } from '@testing-library/react';
import React from 'react';
import './App.css';

function App() {
  class Banner extends React.Component{

    render(){
      return(
        <div className = "banner">
        <title>
          {this.props.title}
        </title>
        </div>
      );
    }
  }

  class Exhibit extends React.Component{

    render(){
      return(
        <div className = "exhibit">
          <div className = "exhibit__heading">
            <h1>{this.props.heading}</h1>
            <div className = "exhibit__body">
              {this.props.children}
            </div>
          </div>
        </div>
      );
    }
  }


  return (
    <div>
      <Banner title="Sextant"/>
      <div className = "wrapper">
        <Exhibit heading="Example exhibit">
          <p>This is an example exhibit card.</p>
        </Exhibit>
      </div>
    </div>
  );
}

export default App;
