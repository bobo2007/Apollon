import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { connect } from "react-redux";
import styled from "styled-components";
import CanvasContainer from "./Canvas/Container";
import DragLayer from "./DragLayer";
import Sidebar from "./Sidebar";
import { ZIndices } from "./zindices";
import { getAllEntities, getAllRelationships } from "../redux/selectors";
import { ReduxState } from "../redux/state";
import { computeDiagramBoundingBox, computeRelationshipPaths } from "../../layouting/diagram";
import {
    EditorMode,
    ElementSelection,
    Entity,
    InteractiveElementsMode,
    Relationship,
    UMLModel
} from "../../uml";
import { UUID } from "../../uuid";

const SIDEBAR_WIDTH = 350;

const FlexContainer = styled.div`
    width: 100%;
    height: 100%;
    font-family: ${props => props.theme.fontFamily};
    display: flex;
    overflow: hidden;
    position: relative;
`;

const SidebarFlexItem = styled.div`
    width: ${SIDEBAR_WIDTH}px;
`;

const CanvasFlexItem = styled.div`
    width: calc(100% - ${SIDEBAR_WIDTH}px);
    position: relative;
    overflow: scroll;
`;

const OverlayDropShadow = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: ${SIDEBAR_WIDTH}px;
    bottom: 0;
    pointer-events: none;
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
    border: 1px solid ${props => props.theme.borderColor};
    z-index: ${ZIndices.CanvasInnerDropShadowLayer};
`;

class Editor extends React.Component<Props, State> {
    canvas: HTMLDivElement | null = null;
    canvasScrollContainer: HTMLDivElement | null = null;

    state: State = {
        didScroll: false,
        editorMode: EditorMode.ModelingView,
        interactiveElementsMode: InteractiveElementsMode.Highlighted
    };

    selectEditorMode = (newMode: EditorMode) => {
        this.setState({ editorMode: newMode });
    };

    selectInteractiveElementsMode = (newMode: InteractiveElementsMode) => {
        this.setState({ interactiveElementsMode: newMode });
    };

    componentDidMount() {
        this.scrollDiagramIntoView();
    }

    scrollDiagramIntoView() {
        if (this.canvasScrollContainer !== null) {
            const {
                clientWidth,
                clientHeight,
                scrollWidth,
                scrollHeight
            } = this.canvasScrollContainer;

            const diagram: UMLModel = this.props;

            if (diagram.entities.length === 0) {
                const left = Math.abs(scrollWidth - clientWidth) / 2;
                const top = Math.abs(scrollHeight - clientHeight) / 2;
                this.canvasScrollContainer.scrollTo({ left, top });
            } else {
                const relationshipPaths = computeRelationshipPaths(diagram);
                const boundingBox = computeDiagramBoundingBox(diagram, relationshipPaths);

                const PADDING_AROUND_DIAGRAM = 50;

                const left = Math.min(
                    boundingBox.x - (clientWidth - boundingBox.width) / 2,
                    boundingBox.x - PADDING_AROUND_DIAGRAM
                );

                const top = Math.min(
                    boundingBox.y - (clientHeight - boundingBox.height) / 2,
                    boundingBox.y - PADDING_AROUND_DIAGRAM
                );

                this.canvasScrollContainer.scrollTo({ left, top });
            }

            window.setTimeout(() => {
                this.setState({ didScroll: true });
            }, 0);
        }
    }

    render() {
        const { entityIds, relationshipIds } = this.props.selection;

        const selectedEntities = this.props.entities.filter(entity =>
            entityIds.includes(entity.id)
        );

        const selectedRelationships = this.props.relationships.filter(relationship =>
            relationshipIds.includes(relationship.id)
        );

        return (
            <FlexContainer>
                <CanvasFlexItem
                    innerRef={ref => (this.canvasScrollContainer = ref)}
                    style={{ overflow: this.state.didScroll ? "scroll" : "hidden" }}
                >
                    <CanvasContainer
                        innerRef={ref => (this.canvas = ref)}
                        editorMode={this.state.editorMode}
                        interactiveElementsMode={this.state.interactiveElementsMode}
                        selection={this.props.selection}
                        selectEntity={this.props.selectEntity}
                        selectRelationship={this.props.selectRelationship}
                        toggleEntitySelection={this.props.toggleEntitySelection}
                        toggleRelationshipSelection={this.props.toggleRelationshipSelection}
                        unselectAllElements={this.props.unselectAllElements}
                    />
                </CanvasFlexItem>

                <SidebarFlexItem>
                    <Sidebar
                        selectedEntities={selectedEntities}
                        selectedRelationships={selectedRelationships}
                        editorMode={this.state.editorMode}
                        interactiveElementsMode={this.state.interactiveElementsMode}
                        selectEditorMode={this.selectEditorMode}
                        selectInteractiveElementsMode={this.selectInteractiveElementsMode}
                    />
                </SidebarFlexItem>

                <DragLayer
                    canvas={this.canvas!}
                    canvasScrollContainer={this.canvasScrollContainer!}
                />
                <OverlayDropShadow />
            </FlexContainer>
        );
    }
}

interface OwnProps {
    selection: ElementSelection;
    selectEntity: (entityId: UUID) => void;
    selectRelationship: (relationshipId: UUID) => void;
    toggleEntitySelection: (entityId: UUID) => void;
    toggleRelationshipSelection: (relationshipId: UUID) => void;
    unselectAllElements: () => void;
}

interface StateProps {
    entities: Entity[];
    relationships: Relationship[];
}

type Props = OwnProps & StateProps;

interface State {
    didScroll: boolean;
    editorMode: EditorMode;
    interactiveElementsMode: InteractiveElementsMode;
}

function mapStateToProps(state: ReduxState): StateProps {
    return {
        entities: getAllEntities(state),
        relationships: getAllRelationships(state)
    };
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(Editor));