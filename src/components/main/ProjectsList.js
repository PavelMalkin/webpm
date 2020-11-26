import React, {ReactPropTypes as PropTypes, useEffect, useMemo} from 'react';
import {connect} from 'react-redux';
import {isFetchingProjects, getProjectsData, hasFetchedProjects} from "../../redux/selectors/projectSelectors";
import {getProjects} from "../../redux/thunks/projectThunk";
import { useHistory } from "react-router-dom";
import { useSelector} from "react-redux";

const ProjectsList = (props) => {

  const hasFetched = useSelector( store => store.project.hasFetched)

  useEffect(() => {
    if(!hasFetched){
      props.getProjects();
    }
  }, [hasFetched]);

  const history = useHistory();

  const goToProject = (id, e) => {
    e.preventDefault();
    history.push(`/project/${id}`);
  };

  const renderProjects = useMemo(() => {
    if(!props.projectsData) return null;
    return props.projectsData.map(project => (
      <div key={project.id}><a href="" onClick={(event) => goToProject(project.id, event)}>{project.name}</a> <small>{project.createdAt}</small></div>
    ))
  }, [props.projectsData]);

  return (
    <div><button onClick={() => {history.push(`/project/2`)}}>Current project 2</button>
      <h3>Projects</h3>
      {renderProjects}
    </div>
  )
};

// ProjectsList.propTypes = {
//   isFetchedProjects: PropTypes.bool,
//   getProjects: PropTypes.func,
//   projectsData: PropTypes.array
// };

const mapStateToProps = (state) => ({
  isFetchingProjects: isFetchingProjects(state),
  projectsData: getProjectsData(state),
  isFetchedProjects: hasFetchedProjects(state),
});

const mapDispatchToProps = {
  getProjects
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
