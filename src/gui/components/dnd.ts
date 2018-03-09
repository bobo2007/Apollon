import { Size } from "../../geometry";
import { EntityKind } from "../../uml";
import { UUID } from "../../uuid";

export const enum ItemTypes {
    NewEntity = "NEW_ENTITY",
    ExistingEntities = "EXISTING_ENTITIES"
}

export interface NewEntityDragItem {
    type: ItemTypes.NewEntity;
    kind: EntityKind;
    size: Size;
}

export interface ExistingEntitiesDragItem {
    type: ItemTypes.ExistingEntities;
    entityIds: UUID[];
    size: Size;
}

export type DragItem = NewEntityDragItem | ExistingEntitiesDragItem;