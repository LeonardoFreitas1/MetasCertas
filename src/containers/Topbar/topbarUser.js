import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from '../../components/uielements/popover';
import IntlMessages from '../../components/utility/intlMessages';
import userpic from '../../image/user1.png';
import authAction from '../../redux/auth/actions';
import TopbarDropdownWrapper from './topbarDropdown.style';
import Verify from '../../helpers/Verificadores/Verifty'
const { logout } = authAction;

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  async componentDidMount(){
    const verify = new Verify()
    verify.VerifyLogaded()
    const tipo = await verify.returnType()
    this.setState({type: tipo})
  }
 
  render() {
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <a className="isoDropdownLink"  href="/dashboard/config ">
          <IntlMessages id="Configurações" />
        </a>
        <a className="isoDropdownLink" href="#oi ">
          <IntlMessages id="sidebar.feedback" />
        </a>
        <a className="isoDropdownLink" href="# ">
          <IntlMessages id="topbar.help" />
        </a>
        <a className="isoDropdownLink">
          <span>{this.state.type}</span>
        </a>
        <a className="isoDropdownLink" onClick={this.props.logout} href="# ">
          <IntlMessages id="topbar.logout" />
        </a>
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div className="isoImgWrapper">
          <img alt="user" src={userpic} />
          <span className="userActivity online" />
        </div>
      </Popover>
    );
  }
}
export default connect(
  null,
  { logout }
)(TopbarUser);
