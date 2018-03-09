import * as React from "react";
import RelationshipEndDetails from "./RelationshipEndDetails";
import RelationshipKindSelect from "./RelationshipKindSelect";
import { PopupSection } from "../PopupSection";
import { PopupSectionHeading } from "../PopupSectionHeading";
import {
    Entity,
    LayoutedRelationship,
    Relationship,
    RelationshipEnd,
    RelationshipKind
} from "../../../../../uml";

export default class RelationshipDetails extends React.Component<Props> {
    updateRelationshipKind = (kind: RelationshipKind) => {
        this.props.updateRelationship({
            ...this.props.relationship.relationship,
            kind
        });
    };

    updateRelationshipSource = (source: RelationshipEnd) => {
        this.props.updateRelationship({
            ...this.props.relationship.relationship,
            source
        });
    };

    updateRelationshipTarget = (target: RelationshipEnd) => {
        this.props.updateRelationship({
            ...this.props.relationship.relationship,
            target
        });
    };

    render() {
        const { relationship } = this.props;
        return (
            <>
                <PopupSection>
                    <PopupSectionHeading>Relationship</PopupSectionHeading>

                    <RelationshipKindSelect
                        kind={relationship.relationship.kind}
                        onRelationshipKindChange={this.updateRelationshipKind}
                    />

                    {/* <LabeledCheckbox
                        label="Straight line"
                        checked={relationship.relationship.straightLine}
                        onChange={straightLine => {
                            this.props.updateRelationship({
                                ...this.props.relationship.relationship,
                                straightLine
                            });
                        }}
                        style={{ marginTop: 10 }}
                    /> */}
                </PopupSection>

                <PopupSection>
                    <RelationshipEndDetails
                        heading="Source"
                        entity={relationship.source}
                        entities={this.props.entities}
                        relationshipEnd={relationship.relationship.source}
                        updateRelationshipEnd={this.updateRelationshipSource}
                    />
                </PopupSection>

                <PopupSection>
                    <RelationshipEndDetails
                        heading="Target"
                        entity={relationship.target}
                        entities={this.props.entities}
                        relationshipEnd={relationship.relationship.target}
                        updateRelationshipEnd={this.updateRelationshipTarget}
                    />
                </PopupSection>
            </>
        );
    }
}

interface Props {
    entities: Entity[];
    relationship: LayoutedRelationship;
    updateRelationship: (relationship: Relationship) => void;
}