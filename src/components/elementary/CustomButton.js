import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function CustomButton(props) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    props.isExternalLink
      ? (window.location.href = props.buttonLink)
      : history.push(props.buttonLink);
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" onClick={handleClick}>
        {props.labelText}
      </Button>
    </div>
  );
}

export default CustomButton;
