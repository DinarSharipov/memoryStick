import React, { Component } from "react";
import { connect } from "react-redux";
import AppItem from "./AppItem/AppItem";
import { fetchAppList } from "../../store/actions/appList";
import { Grid } from "@mui/material";

class AppList extends Component {
  componentDidMount() {
    this.props.fetchAppList();
    console.log(this.props.AppList);
  }

  render() {
    return (
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {this.props.AppList ? (
          this.props.AppList.map((app, i) => {
            return <AppItem key={i} app={app} />;
          })
        ) : (
          <h1 style={{ marginTop: "100px" }}>Загрузка...</h1>
        )}
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    AppList: state.applist.apps,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAppList: () => dispatch(fetchAppList()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
