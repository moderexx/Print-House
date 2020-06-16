import * as React from 'react';
import { DatePicker, Table, Typography } from "antd";
import Axios from "axios";
import ISum from "../../models/interfaces/ISum";
import IClientModel from "../../models/interfaces/IClientModel";
import { ColumnsType } from "antd/lib/table";
import { IProductsProps } from "./Products";

export interface IClientsSummaryProps {
}

export interface IClientsSummaryState {
    fromTime:number,
    toTime:number,
    summary:Array<ISum & Omit<IClientModel,"clientAddress">> | null,
    isLoading:boolean
}

const {RangePicker} = DatePicker

const DEFAULT_END_DATE = new Date()
const DEFAULT_START_DATE = new Date(DEFAULT_END_DATE.getFullYear(),DEFAULT_END_DATE.getMonth(),DEFAULT_END_DATE.getDate()-120)

export default class ClientsSummary extends React.Component<IClientsSummaryProps, IClientsSummaryState> {
  constructor(props: IClientsSummaryProps) {
    super(props);

    this.state = {
        fromTime:DEFAULT_START_DATE.getTime(),
        toTime:DEFAULT_END_DATE.getTime(),
        summary:null,
        isLoading:true
    }
  }
  fetchSummary = async() =>{
      const {fromTime,toTime,summary} = this.state
      Axios.get<typeof summary>("/api/clients/summary",{params:{fromTime,toTime}})
      .then(r => this.setState({summary:r.data}))
      .finally(()=>this.setState({isLoading:false}))
  }
  componentDidUpdate = (prevProps:IProductsProps,prevState:IClientsSummaryState) =>{
    if(prevState.fromTime !== this.state.fromTime || prevState.toTime !== this.state.toTime){
      this.fetchSummary()
    }
  }
  componentDidMount(){
      this.fetchSummary()
  }

columns:ColumnsType<ISum & Omit<IClientModel,"clientAddress">> = [
    {key:"sum",dataIndex:"sum","title":"Total sum purchased in leva",render:(sum:string)=><Typography>{sum}</Typography>},
    {key:"clientName",dataIndex:"clientName",title:"Client Name",render:(name:string)=><Typography>{name}</Typography>},
    {key:"clientId",dataIndex:"clientId",title:"Client Id",render:(id:string)=><Typography>{id}</Typography>}
]
  public render() {
      const {summary,isLoading} = this.state
    return (
      <React.Fragment>
        <RangePicker onCalendarChange={(dates)=>{
            const updatedState:Partial<IClientsSummaryState> = {}
            if(dates?.[0]){
                updatedState.fromTime = dates[0].toDate().getTime()
            }
            if(dates?.[1]){
                updatedState.toTime = dates[1].toDate().getTime()
            }
            this.setState(updatedState as never)
        }}/>
        <Table loading={isLoading} columns={this.columns} dataSource={summary!}/>
      </React.Fragment>
    );
  }
}
