import {createReducer} from "@reduxjs/toolkit";
import {getProjects} from "../thunks/projectThunk";
import {setCurrentProject, updateCurrentProject} from "../actions/projectActions"
import _ from 'lodash';

const initialState = {
    projectsData: [],
    currentProjectId: null,
    hasFetched: false,
    isFetching: false,
    isFetchingError: null,
    // currentProject: {}
};

const projectReducer = createReducer(initialState, {
    [getProjects.pending]: (state) => {
        state.isFetching = true;
        return state;
    },
    [getProjects.rejected]: (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
        return state;
    },
    [getProjects.fulfilled]: (state, action) => {
        state.isFetching = false;
        state.hasFetched = true;
        state.projectsData = state.projectsData.concat(action.payload);
        //state.currentProject = action.payload;
        // console.log('getProjects.fulfilled',state.projectsData[1].containers[0].data)
        return state;
    },
    [getProjects.rejected]: (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
        return state;
    },
    [setCurrentProject]: (state, action) => {
        let id = parseInt(action.payload)
        state.currentProjectId = id;
        state.currentProject = state.projectsData.find(res => res.id === id)
        return state;
    },
    [updateCurrentProject]: (state, action) => {
        switch (action.payload.index.item){
            case 'serviceTitle':
                state.currentProject.services.services[action.payload.index.id].title = action.payload.data;
            case 'serviceDescription':
                state.currentProject.services.services[action.payload.index.id].description = action.payload.data;
        }




       // state.currentProject[action.payload.item][0].title = action.payload.data
        // state.currentProject.containers.forEach( (elem, i)=> {
        //   if (elem.id === id) {state.currentProject.containers[i] = action.payload}
        // })
        return state;
    },
});

export default projectReducer;
