import * as React from 'react';
import IProductModel from "../../models/interfaces/IProductModel";
import IFactoryModel from "../../models/interfaces/IFactoryModel";
import Table, { ColumnsType } from "antd/lib/table";
import { Typography } from "antd";
import Axios from "axios";
import Title from "antd/lib/typography/Title";

export interface IProductsProps {
}

export interface IProductsState {
  products: Array<IProductModel & IFactoryModel> | null
  isLoading:boolean
}



export default class Products extends React.Component<IProductsProps, IProductsState> {
  constructor(props: IProductsProps) {
    super(props);

    this.state = {
      products:null,
      isLoading:true
    }
  }
  componentDidMount = () =>{
    this.fetchProducts()
  }
  fetchProducts =  ()=>{
    Axios.get<Array<IProductModel & IFactoryModel>>("/products")
    .then(r => this.setState({products:r.data}))
    .finally(()=>this.setState({isLoading:false}))
  }
columns:ColumnsType<IProductModel &IFactoryModel>=[
  {key:"productCode",dataIndex:"productCode",title:"Product Code",render:(code:string)=><Typography>{code}</Typography>},
{key:"productName",dataIndex:"productName",title:"Product Name",render:(name:string)=><Typography>{name}</Typography>},
{key:"productPrice",dataIndex:"productPrice",title:"Product Price",render:(price:string)=><Typography>{price}</Typography>},
{key:"factoryName",dataIndex:"factoryName",title:"Factory Name",render:(name:string)=><Typography>{name}</Typography>}
]
  public render() {
    const {products,isLoading} = this.state

    
     
    return (
     <React.Fragment>
       
 <Table loading={isLoading} dataSource={products!} columns={this.columns}></Table>
     </React.Fragment>
       
    );
  }
}
