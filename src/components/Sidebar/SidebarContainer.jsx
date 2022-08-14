import Sidebar from './Sidebar';
import { connect } from 'react-redux'
import { Component } from 'react';

class SidebarContainer extends Component{
  render(){
    return <Sidebar friendsData={this.props.friendsData}/>
  }
}

const mapStateToProps = (state) =>({
  friendsData: state.sidebar.friendsData,
});

export default connect(mapStateToProps)(SidebarContainer);
