import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./components/Header";
import Footer from "./components/Footer";

import AddChore from "./components/AddChore";
import AddArea from "./components/AddArea";
import AddTask from "./components/AddTask";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexFlow: "column nowrap",
    height: "100vh",
  },
  main: {
    flex: "auto",
    overflowY: "auto",
  },
}));

function App() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    addChoreOpen: false,
    addAreaOpen: false,
    addTaskOpen: false,
  });

  const handleToggleDialog = (key, open) => () => {
    setState({ ...state, [key]: open });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Header />
        <main className={classes.main}></main>
        <Footer
          onAddChoreClick={handleToggleDialog("addChoreOpen", true)}
          onAddAreaClick={handleToggleDialog("addAreaOpen", true)}
          onAddTaskClick={handleToggleDialog("addTaskOpen", true)}
        />
        <AddChore
          open={state.addChoreOpen}
          onClose={handleToggleDialog("addChoreOpen", false)}
          onSubmit={(data, cb) => {
            console.log("New Chore", data);
            if (cb) cb();
          }}
        />
        <AddArea
          open={state.addAreaOpen}
          onClose={handleToggleDialog("addAreaOpen", false)}
          onSubmit={(data, cb) => {
            console.log("New Area", data);
            if (cb) cb();
          }}
        />
        <AddTask
          open={state.addTaskOpen}
          onClose={handleToggleDialog("addTaskOpen", false)}
          onSubmit={(data, cb) => {
            console.log("New Task", data);
            if (cb) cb();
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default App;
