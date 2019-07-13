import React from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const styles = {
  xsRoot: {
    fontFamily: 'sans-serif',
    padding: '10px 0px'
  },
  mdRoot: {
    fontFamily: 'sans-serif',
    minHeight: '6rem',
    alignItems: 'center'
  },
  spanStyles: {
    display: 'inline-block',
    fontWeight: 'bold'
  }
};

export default function SimpleList(props) {
  const { miles, providerGroup, address, city, zipcode } = props;
  return (
    <>
      <Hidden mdUp>
        <Grid container style={styles.xsRoot} spacing={3}>
          <Grid item xs={4}>
            <span style={styles.spanStyles}>{`miles: ${miles}`}</span>
            {providerGroup}
          </Grid>
          <Grid item xs={8} md={false}>{`${address}, ${city} ${zipcode}`}</Grid>
        </Grid>
      </Hidden>
      <Hidden only="xs">
        <Grid container style={styles.mdRoot} spacing={3}>
          <Grid item md={2}>{`miles: ${miles}`}</Grid>
          <Grid item md={4}>
            {providerGroup}
          </Grid>
          <Grid item md={6}>{`${address}, ${city} ${zipcode}`}</Grid>
        </Grid>
      </Hidden>
      <Divider />
    </>
  );
}
