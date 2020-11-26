import { createSelector } from 'reselect';

export const isButtonClicked = (state) => state.project.buttonClicked;
export const isFetchingProjects = (state) => state.project.isFetching;
export const hasFetchedProjects = (state) => state.project.hasFetched;
export const getProjectsData = (state) => state.project.projectsData;