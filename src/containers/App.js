import React from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const App = (({ children }) =>
  <div>
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

export default App;
