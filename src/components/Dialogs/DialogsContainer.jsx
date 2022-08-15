import Dialogs from './Dialogs';
import {updateMessage, sendMessage} from '../../redux/dialogs-reducer';
import { connect } from 'react-redux'
import { Component } from 'react';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';
class DialogsContainer extends Component {
  handleMessageChange = (e) => {
    let text = e.target.value;
    this.props.updateMessage(text);
  };

  sendMessage = () => {
    if(this.props.newMessageText !== ''){
      this.props.sendMessage();
    }
    else
      alert('Введите текст поста')
  };

  render() {
    const {dialogsData, messagesData, newMessageText} = this.props
    return <Dialogs {...{dialogsData, messagesData, newMessageText}} handleMessageChange={this.handleMessageChange} sendMessage={this.sendMessage}/>;
  }
}

const mapStateToProps = (state) =>({
  dialogsData: state.dialogsPage.dialogsData,
  messagesData: state.dialogsPage.messagesData,
  newMessageText: state.dialogsPage.newMessageText
});

export default compose(connect(mapStateToProps, {updateMessage, sendMessage}), withAuthNavigate)(DialogsContainer);

