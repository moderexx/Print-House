import * as React from 'react';
import {DatePicker, Typography} from "antd"
import Axios from "axios"
import IGetBetweenDatesRequestModel from "../../models/interfaces/IGetBetweenDatesRequestModel";
import ICount from "../../models/interfaces/ICount";
import ISum from "../../models/interfaces/ISum";
import IAverage from "../../models/interfaces/IAverage";
import Title from "antd/lib/typography/Title";
export interface IPurchasesPeriodSummaryProps {
}

export interface IPurchasesPeriodSummaryState extends IGetBetweenDatesRequestModel{

  summary: ICount & ISum & IAverage | null
}
const DEFAULT_END_DATE = new Date()
const DEFAULT_START_DATE = new Date(DEFAULT_END_DATE.getFullYear(),DEFAULT_END_DATE.getMonth(),DEFAULT_END_DATE.getDate()-7)

const {RangePicker} = DatePicker
export default class PurchasesPeriodSummary extends React.Component<IPurchasesPeriodSummaryProps, IPurchasesPeriodSummaryState> {
  constructor(props: IPurchasesPeriodSummaryProps) {
    super(props);
    this.state = {
      fromTime:DEFAULT_START_DATE.getTime(),
      toTime:DEFAULT_END_DATE.getTime(),
      summary:null
    }
  }
fetchSummary = async ()=>{
  const {fromTime,toTime,summary} = this.state
  const params:IGetBetweenDatesRequestModel = {
    fromTime: fromTime,toTime: toTime
  }

  const result = await Axios.get<typeof summary>("/api/purchases/summary",{params})
  this.setState({summary:result.data})
}
componentDidUpdate = (prevProps:IPurchasesPeriodSummaryProps,prevState:IPurchasesPeriodSummaryState) =>{
  if(prevState.fromTime !== this.state.fromTime || prevState.toTime !== this.state.toTime){
    this.fetchSummary()
  }
}
componentDidMount(){
  this.fetchSummary()
}
  public render() {
    const {summary} = this.state
    console.log(summary)
    console.log("purchases")
    return (
      <div className="centered" style={{top:"20%"}}>
        <Title>Purchases summary</Title>
        
        Pick date range
        <RangePicker onCalendarChange={(v)=>{
          const newState:Partial<IPurchasesPeriodSummaryState>= {}
          if(v?.[0]){
            newState.fromTime = v[0].toDate().getTime()
          }
          if(v?.[1]){
            newState.toTime = v[1].toDate().getTime()
          }
          this.setState(newState as never)
        }} ></RangePicker>
       <br></br>
        {!summary?null:
        <Typography>Count {summary.count} Average {summary.avg} leva  Sum {summary.sum} leva</Typography>}
      </div>
    );
  }
}
