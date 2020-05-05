import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { SnackbarProvider, useSnackbar } from "notistack";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Footer from "./components/Footer";

import SimpleForm from "./components/SimpleForm";
import ScheduleForm from "./components/ScheduleForm";

import SimpleTable from "./components/SimpleTable";
import SchedulesTable from "./components/SchedulesTable";

import { md5 } from "./utils/hash";
import { usePouchDB } from "./utils/usePouchDB";
import * as validate from "./utils/validation";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flexFlow: "column nowrap",
    height: "100vh",
  },
  main: {
    flex: "auto",
    overflowY: "auto",
    padding: "0.5rem",
  },
});

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const [state, db] = usePouchDB();

  const [addDialogState, setAddDialogState] = React.useState({
    AddChore: false,
    AddArea: false,
    AddSchedule: false,
  });

  const [editState, setEditState] = React.useState({
    chores: null,
    areas: null,
    schedules: null,
  });

  const [expanded, setExpanded] = React.useState("panel1");

  const handleDialogToggle = (key, open) => () => {
    setAddDialogState({ ...addDialogState, [key]: open });
  };

  const handleExpandedChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCreate = (data) => {
    const hash = md5(JSON.stringify(data));
    const exist =
      state[data.type] && state[data.type].find((s) => s.hash === hash);
    if (exist) {
      console.warn("Exists", exist, data);
      enqueueSnackbar("Item exists", { variant: "warning" });
      return;
    }
    const _id = String(Date.now());
    db.put({ _id, hash, ...data });
    enqueueSnackbar("Item created!", { variant: "success" });
  };

  const handleUpdate = (data) => {
    const copy = { ...data };
    delete copy["hash"];
    delete copy["_id"];
    delete copy["_rev"];
    const hash = md5(JSON.stringify(copy));
    const exist =
      state[data.type] && state[data.type].find((s) => s.hash === hash);
    if (exist) {
      console.warn("Exists", exist, data);
      enqueueSnackbar("Item exists", { variant: "warning" });
      return;
    }
    db.put({ ...data, hash });
    enqueueSnackbar("Item updated!", { variant: "success" });
  };

  const handleDelete = (entry) => {
    if (window.confirm("Delete schedule?")) {
      db.remove(entry._id, entry._rev);
      enqueueSnackbar("Item deleted!", { variant: "success" });
    }
  };

  const handleEdit = ({ _id, type }) => {
    const entry = state[type].find((e) => e._id === _id);
    if (!type || !entry) return;
    setEditState({ ...editState, [type]: entry });
  };

  const handleRecordEvent = ({ _id, type }, event) => {
    const entry = state[type].find((e) => e._id === _id);
    if (!type || !entry) return;
    entry.events = entry.events || [];
    entry.events.unshift(event);
    handleUpdate(entry);
  };

  const addDialogs = [
    {
      key: "AddChore",
      component: SimpleForm,
      onSubmit: (data, cb) => {
        if (!validate.chore(data)) {
          if (cb) cb(new Error("Validation error"));
          return;
        }
        handleCreate({ ...data, type: "chores" });
        if (cb) cb();
      },
      props: { title: "New Chore", defaultState: { name: "" } },
    },
    {
      key: "AddArea",
      component: SimpleForm,
      onSubmit: (data, cb) => {
        if (!validate.area(data)) {
          if (cb) cb(new Error("Validation error"));
          return;
        }
        handleCreate({ ...data, type: "areas" });
        if (cb) cb();
      },
      props: { title: "New Area", defaultState: { name: "" } },
    },
    {
      key: "AddSchedule",
      component: ScheduleForm,
      onSubmit: (data, cb) => {
        if (!validate.schedule(data)) {
          if (cb) cb(new Error("Validation error"));
          return;
        }
        handleCreate({ ...data, type: "schedules" });
        if (cb) cb();
      },
      props: {
        title: "New Schedule",
        chores: state.chores,
        areas: state.areas,
        defaultState: { choreId: "", areaId: "", name: "", period: "" },
      },
    },
  ];

  const editDialogs = [
    {
      key: "chores",
      component: SimpleForm,
      onSubmit: (data, cb) => {
        if (!validate.chore(data)) {
          if (cb) cb(new Error("Validation error"));
          return;
        }
        handleUpdate(data);
        if (cb) cb();
      },
      props: { title: "Edit Chore", defaultState: editState.chores },
    },
    {
      key: "areas",
      component: SimpleForm,
      onSubmit: (data, cb) => {
        if (!validate.area(data)) {
          if (cb) cb(new Error("Validation error"));
          return;
        }
        handleUpdate(data);
        if (cb) cb();
      },
      props: { title: "Edit Area", defaultState: editState.areas },
    },
    {
      key: "schedules",
      component: ScheduleForm,
      onSubmit: (data, cb) => {
        if (!validate.schedule(data)) {
          if (cb) cb(new Error("Validation error"));
          return;
        }
        handleUpdate(data);
        if (cb) cb();
      },
      props: {
        title: "Edit Schedule",
        chores: state.chores,
        areas: state.areas,
        defaultState: editState.schedules,
      },
    },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        {/* <Header /> */}

        <main className={classes.main}>
          <ExpansionPanel
            expanded={expanded === "panel1"}
            onChange={handleExpandedChange("panel1")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Schedules</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SchedulesTable
                {...state}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onEvent={handleRecordEvent}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel2"}
            onChange={handleExpandedChange("panel2")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Chores</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SimpleTable
                items={state.chores}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            expanded={expanded === "panel3"}
            onChange={handleExpandedChange("panel3")}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Areas</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SimpleTable
                items={state.areas}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </main>

        <Footer
          {...addDialogs.reduce(
            (acc, d) => ({
              ...acc,
              [`on${d.key}Click`]: handleDialogToggle(d.key, true),
            }),
            {}
          )}
        />

        {addDialogs.map((d) =>
          d.component({
            key: d.key,
            open: addDialogState[d.key],
            onClose: handleDialogToggle(d.key, false),
            onSubmit: d.onSubmit,
            ...d.props,
          })
        )}

        {editDialogs.map((d) =>
          d.component({
            key: d.key,
            open: editState[d.key] !== null,
            onClose: () => setEditState({ ...editState, [d.key]: null }),
            onSubmit: d.onSubmit,
            ...d.props,
          })
        )}
      </div>
    </React.Fragment>
  );
}

export default function IntegratedApp() {
  return (
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  );
}
