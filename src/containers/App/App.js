import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import actions from '../../redux/auth/actions';
import appActions from '../../redux/app/actions';
import Sidebar from '../Sidebars/Sidebar';
import Topbar from '../Topbar/Topbar';

import AppRouter from './AppRouter'
import { siteConfig } from '../../settings';
import AppHolder from './commonStyle';
import './global.css';

const { Content, Footer } = Layout;
const { logout } = actions;
const { toggleAll } = appActions;
export class App extends Component {
  render() {
    const { url } = this.props.match;
    const { height } = this.props;
    const appHeight = window.innerHeight;
    return (
            <AppHolder>
              <Layout style={{ height: appHeight }}>
               
                <Topbar url={url} />
                <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
                <Sidebar url={url} />
                  <Layout
                    className="isoContentMainLayout"
                    style={{
                      height: height
                    }}
                  >
                    <Content
                      className="isomorphicContent"
                      style={{
                        padding: '70px 0 0',
                        flexShrink: '0',
                        background: '#f1f3f6',
                        position: 'relative'
                      }}
                    >
                      
                      <AppRouter url={url}/>
                    </Content>
                    <Footer
                      style={{
                        background: '#ffffff',
                        textAlign: 'center',
                        borderTop: '1px solid #ededed'
                      }}
                    >
                      {siteConfig.footerText}
                    </Footer>
                  </Layout>
                </Layout>
                
              </Layout>
            </AppHolder>
      
       
    );
  }
}

 export default connect(
  state => ({
    auth: state.Auth,
    locale: state.LanguageSwitcher.language.locale,
    selectedTheme: state.ThemeSwitcher.changeThemes.themeName,
    height: state.App.height
  }),
  { logout, toggleAll }
)(App);