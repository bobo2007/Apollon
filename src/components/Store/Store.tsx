import React from 'react';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  Store as ReduxStore,
  Reducer,
} from 'redux';
import ReduxState from './State';

import EditorService from './../../services/EditorService';
import interactiveElementsReducer from './../../services/redux/interactiveElements/reducer';
import relationshipsReducer from '../../domain/Relationship/reducer';
import { ElementReducer } from './../../domain/Element';
import { DiagramReducer } from './../../domain/Diagram';
import { withUndoRedo } from './../../services/redux/undoRedo';

class Store extends React.Component<Props> {
  public store: ReduxStore<ReduxState>;

  private reducers = {
    relationships: relationshipsReducer,
    interactiveElements: interactiveElementsReducer,
    editor: EditorService.reducer,
    elements: ElementReducer,
    diagram: DiagramReducer,
  };

  constructor(props: Readonly<Props>) {
    super(props);

    const reducer = withUndoRedo(
      combineReducers<ReduxState, any>(this.reducers)
    ) as Reducer<ReduxState>;

    const composeEnhancers: typeof compose =
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const enhancer = composeEnhancers();
    this.store = createStore(reducer, props.initialState || {}, enhancer);
  }

  render() {
    return <Provider store={this.store}>{this.props.children}</Provider>;
  }
}

export interface Props {
  initialState?: Partial<ReduxState>;
}

export default Store;
