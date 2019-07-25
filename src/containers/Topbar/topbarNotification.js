import React, { Component } from 'react';
import { Popover } from 'antd';
import { connect } from 'react-redux';
import IntlMessages from '../../components/utility/intlMessages';
import TopbarDropdownWrapper from './topbarDropdown.style';
import Scrollbar from '../../components/utility/customScrollBar';

const demoNotifications = [
  {
    id: 1,
    name: 'Meta Diária',
    notification:
      'Você atingiu a sua meta diária, Parabéns!',
  },
  
];

class TopbarNotification extends Component {
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
  render() {
    const { customizedTheme } = this.props;
    const content = (
      <TopbarDropdownWrapper className="topbarNotification">
        <div className="isoDropdownHeader">
          <h3>
            <IntlMessages id="sidebar.notification" />
          </h3>
        </div>
        <div className="isoDropdownBody">
        <Scrollbar style={{ height: 300 }}>
          {demoNotifications.map(notification => (
            <a className="isoDropdownListItem" key={notification.id} href="# ">
              <h5>{notification.name}</h5>
              <p>{notification.notification}</p>
            </a>
          ))}
            </Scrollbar>
        </div>
        <a className="isoViewAllBtn" href="# ">
          <IntlMessages id="topbar.viewAll" />
        </a>
      </TopbarDropdownWrapper>
    );
    return (
      <Popover
        content={content}
        trigger="click"
        onClick={() => {}}
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomLeft"
      >
        <div className="isoIconWrapper">
          <i
            className="ion-android-notifications"
            style={{ color: customizedTheme.textColor }}
          />
          {function carrega(){
            return(<span>{demoNotifications.length}</span>)
          }}
        
        </div>
      </Popover>
    );
  }
}

export default connect(state => ({
  ...state.App,
  customizedTheme: state.ThemeSwitcher.topbarTheme,
}))(TopbarNotification);
