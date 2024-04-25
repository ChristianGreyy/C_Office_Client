import { createSlice } from "@reduxjs/toolkit";

import { EStatusSLug, IProjectDetail, IProjectMember, IProjectMemberLayout } from "@/interfaces";
import {
  getAllProjectsAction,
  getMembersForProjectAction,
  getProjectByIdAction,
} from "../actions";
interface IProjectsState {
  projects: IProjectDetail[] | null;
  project: IProjectDetail | null;
  members: IProjectMember[] | null;
  membersLayout: IProjectMemberLayout | null;
  projectsCurrentPage: string | number;
  projectsTotalPage: string | number;
  projectsTotalItems: string | number;
  selectedProject: IProjectDetail | null;

  loadings: Record<string, boolean | undefined>;
}

const initialState: IProjectsState = {
  projects: [],
  project: null,
  membersLayout: {},
  projectsCurrentPage: 0,
  projectsTotalPage: 0,
  projectsTotalItems: 0,
  selectedProject: null,
  loadings: {},
};

const projectsSlice = createSlice({
  name: "projects",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProjectsAction.pending, (state) => {
      state.loadings[`getAllProjectsActionLoading`] = true;
    });
    builder.addCase(getAllProjectsAction.fulfilled, (state, action) => {
      state.loadings[`getAllProjectsActionLoading`] = false;
      state.projects = action.payload?.items ?? [];
      state.projectsCurrentPage = action.payload?.page ?? 0;
      state.projectsTotalPage = action.payload?.limit ?? 0;
      state.projectsTotalItems = action.payload?.total ?? 0;
    });
    builder.addCase(getAllProjectsAction.rejected, (state) => {
      state.loadings[`getAllProjectsActionLoading`] = false;
    });
    builder.addCase(getProjectByIdAction.pending, (state) => {
      state.loadings[`getProjectByIdAction`] = true;
    });
    builder.addCase(getProjectByIdAction.fulfilled, (state, action) => {
      state.loadings[`getProjectByIdAction`] = false;
      // state.project = action.payload ?? {}
      state.project = action?.payload?.issues?.reduce((acc, item) => {
        if (!acc[item.tracker.name]) {
          acc[item.tracker.name] = {
            closed: 0,
            open: 0,
          };
        }
        if (item.status.name === EStatusSLug.closed) {
          acc[item.tracker.name]["closed"]++;
        } else {
          acc[item.tracker.name]["open"]++;
        }
        return acc;
      }, {});
    });
    builder.addCase(getProjectByIdAction.rejected, (state) => {
      state.loadings[`getProjectByIdActionLoading`] = false;
    });

    builder.addCase(getMembersForProjectAction.pending, (state) => {
      state.loadings[`getMembersForProjectAction`] = true;
    });
    builder.addCase(getMembersForProjectAction.fulfilled, (state, action) => {
      // state.members = action.payload ?? {}
      state.membersLayout = action?.payload?.reduce((acc, item) => {
        acc[item.role] = acc[item.role]
          ? [...acc[item.role], item.user]
          : [item.user];
        return acc;
      }, {} );
      state.loadings[`getMembersForProjectAction`] = false;
    });
    builder.addCase(getMembersForProjectAction.rejected, (state) => {
      state.loadings[`getMembersForProjectActionLoading`] = false;
    });
  },
});

export const projectsActions = {
  ...projectsSlice.actions,
};

export default projectsSlice.reducer;
