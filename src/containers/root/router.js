import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

const routes = [
  {
    path: '',
    component: asyncComponent(() => import('../Widgets/index.js')),
  },

  {
    path: 'table_ant',
    component: asyncComponent(() => import('../Tables/antTables')),
  },
  {
    path: 'allFormComponent',
    component: asyncComponent(() => import('../Forms/allComponents/')),
  },
  {
    path: 'InputField',
    component: asyncComponent(() => import('../Forms/Input')),
  },
  {
    path: 'editor',
    component: asyncComponent(() => import('../Forms/editor/')),
  },
  {
    path: 'stepperForms',
    component: asyncComponent(() => import('../Forms/StepperForms/')),
  },
  {
    path: 'FormsWithValidation',
    component: asyncComponent(() => import('../Forms/FormsWithValidation')),
  },
  
  {
    path: 'button',
    component: asyncComponent(() => import('../Forms/Button')),
  },
 
  {
    path: 'autocomplete',
    component: asyncComponent(() => import('../Forms/AutoComplete')),
  },
  {
    path: 'checkbox',
    component: asyncComponent(() => import('../Forms/Checkbox')),
  },
  
 
  {
    path: 'alert',
    component: asyncComponent(() => import('../Feedback/Alert')),
  },

  {
    path: 'config',
    component: asyncComponent(() => import('../../components/config'))
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
