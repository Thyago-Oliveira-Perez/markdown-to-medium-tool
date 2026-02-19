import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Bar = props => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Markdown to Medium</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default connect(state => ({
  menuactive: state.menuactive
}))(Bar);
