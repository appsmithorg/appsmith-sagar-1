import store from "store";
import { EditorViewMode } from "@appsmith/entities/IDE/constants";
import type { AppState } from "@appsmith/reducers";
import MockPluginsState from "test/factories/MockPluginsState";
import type { Page } from "@appsmith/constants/ReduxActionConstants";
import type { Action } from "entities/Action";
import type {
  IDETabs,
  ParentEntityIDETabs,
} from "reducers/uiReducers/ideReducer";
import { IDETabsDefaultValue } from "reducers/uiReducers/ideReducer";
import type { JSCollection } from "entities/JSCollection";
import type { FocusHistory } from "reducers/uiReducers/focusHistoryReducer";
import type { Datasource } from "entities/Datasource";
import type { FeatureFlags } from "@appsmith/entities/FeatureFlag";

interface IDEStateArgs {
  ideView?: EditorViewMode;
  pages?: Page[];
  actions?: Action[];
  js?: JSCollection[];
  tabs?: IDETabs;
  branch?: string;
  focusHistory?: FocusHistory;
  datasources?: Datasource[];
  featureFlags?: Partial<FeatureFlags>;
}

export const getIDETestState = ({
  actions = [],
  branch,
  datasources = [],
  featureFlags,
  focusHistory = {},
  ideView = EditorViewMode.FullScreen,
  js = [],
  pages = [],
  tabs = IDETabsDefaultValue,
}: IDEStateArgs): AppState => {
  const initialState = store.getState();

  const pageList = {
    pages,
    isGeneratingTemplatePage: false,
    applicationId: "655716e035e2c9432e4bd94b",
    currentPageId: pages[0]?.pageId,
    defaultPageId: pages[0]?.pageId,
    loading: {},
  };

  let ideTabs: ParentEntityIDETabs = {};
  if (pageList.currentPageId) {
    ideTabs = { [pageList.currentPageId]: tabs };
  }

  const actionData = actions.map((a) => ({ isLoading: false, config: a }));
  const jsData = js.map((a) => ({ isLoading: false, config: a }));
  const featureFlag = featureFlags ? { data: featureFlags } : {};

  return {
    ...initialState,
    entities: {
      ...initialState.entities,
      datasources: {
        ...initialState.entities.datasources,
        list: datasources,
      },
      plugins: MockPluginsState,
      pageList: pageList,
      actions: actionData,
      jsActions: jsData,
    },
    ui: {
      ...initialState.ui,
      users: {
        ...initialState.ui.users,
        featureFlag,
      },
      ide: {
        ...initialState.ui.ide,
        view: ideView,
        tabs: ideTabs,
      },
      focusHistory: {
        history: {
          ...focusHistory,
        },
      },
      editor: {
        ...initialState.ui.editor,
        initialized: true,
      },
      applications: {
        ...initialState.ui.applications,
        currentApplication: branch
          ? {
              ...initialState.ui.applications.currentApplication,
              gitApplicationMetadata: {
                branchName: branch || "",
              },
            }
          : { ...initialState.ui.applications.currentApplication },
      },
    },
  };
};
