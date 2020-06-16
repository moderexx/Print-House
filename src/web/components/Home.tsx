import * as React from 'react';
import Title from "antd/lib/typography/Title";

export interface IHomeProps {
}

export interface IHomeState {
}

export default class Home extends React.Component<IHomeProps, IHomeState> {
  
    
  public render() {
    return (
      <div className="centered" style={{top:"30%"}}>
        <Title>Print House</Title>
        <a href="https://github.com/moderexx/Print-House" target="_blank">GITHUB LINK</a>
      </div>
    );
  }
}
