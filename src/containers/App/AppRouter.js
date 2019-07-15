import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

const routes = [
  {
    path: '',
    component: asyncComponent(() => import('../Widgets/index.js')),
  },
  {
    path: 'calendar',
    component: asyncComponent(() => import('../Calendar/Calendar')),
  },
  {
    path: 'notes',
    component: asyncComponent(() => import('../Notes')),
  },
  {
    path: 'todo',
    component: asyncComponent(() => import('../Todo')),
  },
  {
    path: 'googleChart',
    component: asyncComponent(() => import('../Charts/googleChart')),
  },
  {
    path: 'reecharts',
    component: asyncComponent(() => import('../Charts/recharts')),
  },
  {
    path: 'ReactChart2',
    component: asyncComponent(() => import('../Charts/reactChart2')),
  },  
  {
    path: 'reactDates',
    component: asyncComponent(() =>
      import('../AdvancedUI/ReactDates/reactDates')
    ),
  },
  {
    path: 'dropzone',
    component: asyncComponent(() => import('../AdvancedUI/dropzone')),
  },
  {
    path: 'frappeChart',
    component: asyncComponent(() => import('../Charts/frappeChart')),
  },
  {
    path: 'invoice/:invoiceId',
    component: asyncComponent(() => import('../Invoice/singleInvoice')),
  },
  {
    path: 'invoice',
    component: asyncComponent(() => import('../Invoice')),
  },
  {
    path: 'chat',
    component: asyncComponent(() => import('../Chat')),
  },
  {
    path: 'metas',
    component: asyncComponent(() => import('../../components/metas/index')),
  },
  {
    path: 'minhas_metas',
    component: asyncComponent(() => import('../../components/metas/minhas_metas')),
  },
  {
    path: 'Progresso',
    component: asyncComponent(() => import('../../components/metas/progresso')),
  },
  {
    path: 'config',
    component: asyncComponent(() => import('../../components/config'))
  },
  {
    path: 'Register',
    component: asyncComponent(() => import('../../components/UsersForm/addUser'))
  },
  {
    path: 'usuarios',
    component: asyncComponent(() => import('../../components/UsersForm/UserList'))
  },
  {
    path: 'Cargos',
    component: asyncComponent(() => import('../../components/Office'))
  }

];  

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <div style={style}>
        {routes.map(singleRoute => {
          const { path, exact, ...otherProps } = singleRoute;
          return (
            <Route
              exact={exact === false ? false : true}
              key={singleRoute.path}
              path={`${url}/${singleRoute.path}`}
              {...otherProps}
            />
          );
        })}
      </div>
    );
  }
}

export default AppRouter;
