import React from "react";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { cyan } from "@material-ui/core/colors";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/Header";
import Footer from "./components/Footer";

import AddChore from "./components/AddChore";
import AddArea from "./components/AddArea";
import AddSchedule from "./components/AddSchedule";

import ScheduleTable from "./components/ScheduleTable";

import { md5 } from "./utils/hash";
import { usePouchDB } from "./utils/usePouchDB";
import * as validate from "./utils/validation";

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
    padding: "1rem",
  },
}));

function App() {
  const [state, db] = usePouchDB();

  const classes = useStyles();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: cyan,
        },
      }),
    [prefersDarkMode]
  );

  const [dialogState, setDialogState] = React.useState({
    AddChore: false,
    AddArea: false,
    AddSchedule: false,
  });

  const handleDialogToggle = (key, open) => () => {
    setDialogState({ ...dialogState, [key]: open });
  };

  const handleAdd = (data) => {
    const hash = md5(JSON.stringify(data));
    const exist =
      state[data.type] && state[data.type].find((s) => s.hash === hash);
    if (exist) return;

    const _id = String(Date.now());

    db.put({ _id, hash, ...data });
  };

  const handleDelete = (entry) => {
    db.remove(entry._id, entry._rev);
  };

  const dialogs = [
    {
      key: "AddChore",
      component: AddChore,
      onSubmit: (data, cb) => {
        if (!validate.chore(data)) {
          if (cb) cb(new Error("Validation error"));
          return;
        }
        handleAdd({ ...data, type: "chores" });
        if (cb) cb();
      },
    },
    {
      key: "AddArea",
      component: AddArea,
      onSubmit: (data, cb) => {
        if (!validate.area(data)) {
          if (cb) cb(new Error("Validation error"));
          return;
        }
        handleAdd({ ...data, type: "areas" });
        if (cb) cb();
      },
    },
    {
      key: "AddSchedule",
      component: AddSchedule,
      onSubmit: (data, cb) => {
        if (!validate.schedule(data)) {
          if (cb) cb(new Error("Validation error"));
          return;
        }
        handleAdd({ ...data, type: "schedules" });
        if (cb) cb();
      },
      props: state,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Header />
          <main className={classes.main}>
            <ScheduleTable {...state} onDelete={handleDelete} />
          </main>
          <Footer
            {...dialogs.reduce(
              (acc, d) => ({
                ...acc,
                [`on${d.key}Click`]: handleDialogToggle(d.key, true),
              }),
              {}
            )}
          />
          {dialogs.map((d) =>
            d.component({
              key: d.key,
              open: dialogState[d.key],
              onClose: handleDialogToggle(d.key, false),
              onSubmit: d.onSubmit,
              ...d.props,
            })
          )}
        </div>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
