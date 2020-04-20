import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./components/Header";
import Footer from "./components/Footer";

import AddChore from "./components/AddChore";

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
  const [state, setState] = React.useState({ addChoreOpen: false });

  const handleToggleAddChore = (open) => () => {
    setState({ ...state, addChoreOpen: open });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Header />
        <main className={classes.main}></main>
        <Footer onAddChoreClick={handleToggleAddChore(true)} />
        <AddChore
          open={state.addChoreOpen}
          closeDialog={handleToggleAddChore(false)}
          onSubmit={(data, cb) => {
            console.log(data);
            if (cb) cb();
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default App;
