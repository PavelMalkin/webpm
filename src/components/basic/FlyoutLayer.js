import React, { useState, useEffect } from "react";
import { Flyout } from "pivotal-ui/react/flyout";
import { useSelector } from "react-redux";

function FlyoutLayer(props) {
    const show = props.showFlyout

  return (
    <div>
      <Flyout
        {...{
          animationDuration: 200,
          show,
          header: <h3>Flyout header</h3>,
          headerClassName: "header-class",
          bodyClassName: "body-class",
          onHide: () => props.handleCloseFlyout(),
        }}
      >
          {props.innerFlyoutComponent}
      </Flyout>
    </div>
  );
}

export default FlyoutLayer;
