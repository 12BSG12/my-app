import Dialogs from './Dialogs';
import {sendMessage} from '../../redux/dialogs-reducer';
import { connect } from 'react-redux'
import { Component } from 'react';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';
class DialogsContainer extends Component {
  onSubmit = (formData) => {
    this.props.sendMessage(formData.message);
    formData.message = null;
  }
  render() {
    const {dialogsData, messagesData} = this.props
    return <Dialogs {...{dialogsData, messagesData}} onSubmit={this.onSubmit}/>;
  }
}

const mapStateToProps = (state) =>({
  dialogsData: state.dialogsPage.dialogsData,
  messagesData: state.dialogsPage.messagesData
});

export default compose(connect(mapStateToProps, {sendMessage}), withAuthNavigate)(DialogsContainer);

