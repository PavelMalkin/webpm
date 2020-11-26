import React, { useEffect, useState } from "react";
import lodashGet from "lodash/get";
import { connect } from "react-redux";
import { buttonClick } from "../../redux/actions/projectActions";
import { isButtonClicked } from "../../redux/selectors/projectSelectors";
import CustomButton from "../elementary/CustomButton";
import EditableText from "../elementary/EditableText";
import CkEditor from "../elementary/CKEditor";
import FlyoutLayer from "../basic/FlyoutLayer";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentProject,
  updateCurrentProject,
} from "../../redux/actions/projectActions";
import { getProjects } from "../../redux/thunks/projectThunk";
import Services from "./Services";

const editableText = {
  text: "Default text",
  id: 35,
};

const ProjectSingle = (props) => {
  const hasFetched = useSelector( store => store.project.hasFetched)
  const currentProject = useSelector((store) => store.project.currentProject);
  const dispatch = useDispatch();
  const [data, setData] = useState('')
  const [showFlyout, setShowFlyout] = useState(false);
  const [innerFlyoutComponent, setInnerFlyoutComponent] = useState('');

  const flyoutToggle = () => {
    setShowFlyout(!showFlyout);
  };

  // ID of an element should be changed in the flyout
  const idOfCkeContainer = 1;

  // const handleSave = (e) => {
  //   dispatch(updateCurrentProject({id:idOfCkeContainer,data:e}));
  //   setShowFlyout(false);
  // };

  const handleSave = (data, index) => {
    dispatch(updateCurrentProject({index ,data}));
    setShowFlyout(false);
  }

  const handleCloseFlyout = () => {
    setShowFlyout(false);
  }


  const id = lodashGet(props, "match.params.id");
  useEffect(() => {
    if (!hasFetched) {
      dispatch(getProjects())
    } else {dispatch(setCurrentProject(id))}
  }, [hasFetched]);


  useEffect(()=> {
    if (currentProject && currentProject.containers) {setData(currentProject.containers.find( res =>  res.id === idOfCkeContainer))}
  },[currentProject])




    const handleFlyout = (data, index) => {
      setInnerFlyoutComponent(<CkEditor  data={data} index={index} handleSave={handleSave}/>)
    setShowFlyout(true);
    }

    const services = (currentProject)? <Services handleFlyout={handleFlyout}/>: null;

  return (
    <div>
      <h3>Project - {id}</h3>
      <Button
        variant="contained"
        color="primary"
        onClick={() => flyoutToggle()}
        value="Flyout"
      >
        Flyout
      </Button>
      <FlyoutLayer innerFlyoutComponent={innerFlyoutComponent} showFlyout={showFlyout} handleCloseFlyout={handleCloseFlyout} />
      {services}
    </div>
  );
};

export default ProjectSingle;
