import { getQueriesForElement } from '@testing-library/react';
import React from 'react';
import './App.css';
import {w3cwebsocket as W3CWebSocket} from "websocket";
import { getActiveElement } from '@testing-library/user-event/dist/utils';

const client = new W3CWebSocket('ws://localhost:55455');

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

  class PacketLatency extends React.Component{
    state = {
      latency:0,
      loading : true,
    }

    componentWillMount(){
      client.onmessage = (message) => {
        this.setState({latency:new Date().getTime()-message.data,loading:false})
      };
    }

    render(){
      return(
        <div>
          {this.state.loading?<div>loading latency...</div>:<Exhibit heading = "Packet Latency"><div>{this.state.latency}</div></Exhibit>}
        </div>
      )
    }
  }

  class IPCollector extends React.Component{

    state = {
      loading:true,
      address: null,
    }

    componentDidMount(){

      if(this.props.ip=="ipv4"){
        fetch('https://api.ipify.org?format=json')
        .then(response=>response.json())
        .then((data)=>{
          this.setState({address:data.ip,loading:false})
        })
      }else if(this.props.ip=="ipv6"){
        fetch('https://api64.ipify.org?format=json')
        .then(results=>results.json())
        .then((data)=>{
          this.setState({address:data.ip,loading:false})
        })
      }
    }

    render(){
      return(
        <div>
          {this.state.loading||!this.state.address?<div>loading...</div>:<Exhibit heading = {this.props.ip} ><div>{this.state.address}</div></Exhibit>}
        </div>
      )
    }
  }

  return (
    <div>
      <Banner title="Sextant"/>
      <div className = "wrapper">
        <IPCollector ip="ipv4"/>
        <IPCollector ip ="ipv6"/>
        <PacketLatency/>
      </div>
    </div>
  );
}

export default App;
