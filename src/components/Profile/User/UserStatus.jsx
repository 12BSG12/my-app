import { Component } from 'react';
import style from './User.module.css';

class UserStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editeMode: false,
      status: this.props.status
    }
  }
  upadateStatusText = (e) =>{
    let text = e.target.value;
    this.setState({
      status: text
    })
  }
  activateEditeMode= () =>{
    this.setState({
      editeMode: true,
    })
  }
  disableEditeMode= () =>{
    this.setState({
      editeMode: false,
    })
    this.props.updateProfileStatusThunkCreator(this.state.status);
  }
  render(){
    const status = !this.state.editeMode 
    ? <div onDoubleClick={this.activateEditeMode}>Status: {this.props.status || '...'}</div> 
    : <div><input autoFocus={true} onBlur={this.disableEditeMode} className={style.input} value={this.state.status} onChange={this.upadateStatusText}/></div>;
    return (
      <div>
        {status}
      </div>
    )
  }
}
export default UserStatus;
