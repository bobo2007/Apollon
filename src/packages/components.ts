import { FunctionComponent } from 'react';
import { UMLAssociationComponent } from './common/uml-association/uml-association-component';
import { UMLClassifierComponent } from './common/uml-classifier/uml-classifier-component';
import { UMLClassifierMemberComponent } from './common/uml-classifier/uml-classifier-member-component';
import { UMLActivityActionNodeComponent } from './uml-activity-diagram/uml-activity-action-node/uml-activity-action-node-component';
import { UMLActivityControlFlowComponent } from './uml-activity-diagram/uml-activity-control-flow/uml-activity-control-flow-component';
import { UMLActivityFinalNodeComponent } from './uml-activity-diagram/uml-activity-final-node/uml-activity-final-node-component';
import { UMLActivityForkNodeComponent } from './uml-activity-diagram/uml-activity-fork-node/uml-activity-fork-node-component';
import { UMLActivityInitialNodeComponent } from './uml-activity-diagram/uml-activity-initial-node/uml-activity-initial-node-component';
import { UMLActivityMergeNodeComponent } from './uml-activity-diagram/uml-activity-merge-node/uml-activity-merge-node-component';
import { UMLActivityObjectNodeComponent } from './uml-activity-diagram/uml-activity-object-node/uml-activity-object-node-component';
import { UMLActivityComponent } from './uml-activity-diagram/uml-activity/uml-activity-component';
import { UMLClassPackageComponent } from './uml-class-diagram/uml-class-package/uml-class-package-component';
import { UMLCommunicationLinkComponent } from './uml-communication-diagram/uml-communication-link/uml-communication-link-component';
import { UMLComponentDependencyComponent } from './uml-component-diagram/uml-component-dependency/uml-component-dependency-component';
import { UMLComponentInterfaceProvidedComponent } from './uml-component-diagram/uml-component-interface-provided/uml-component-interface-provided-component';
import { UMLComponentInterfaceRequiredComponent } from './uml-component-diagram/uml-component-interface-required/uml-component-interface-required-component';
import { UMLComponentInterfaceComponent } from './uml-component-diagram/uml-component-interface/uml-component-interface-component';
import { UMLComponentComponent } from './uml-component-diagram/uml-component/uml-component-component';
import { UMLDeploymentArtifactComponent } from './uml-deployment-diagram/uml-deployment-artifact/uml-deployment-artifact-component';
import { UMLDeploymentAssociationComponent } from './uml-deployment-diagram/uml-deployment-association/uml-deployment-association-component';
import { UMLDeploymentNodeComponent } from './uml-deployment-diagram/uml-deployment-node/uml-deployment-node-component';
import { UMLElementType } from './uml-element-type';
import { UMLObjectLinkComponent } from './uml-object-diagram/uml-object-link/uml-object-link-component';
import { UMLRelationshipType } from './uml-relationship-type';
import { UMLUseCaseActorComponent } from './uml-use-case-diagram/uml-use-case-actor/uml-use-case-actor-component';
import { UMLUseCaseAssociationComponent } from './uml-use-case-diagram/uml-use-case-association/uml-use-case-association-component';
import { UMLUseCaseExtendComponent } from './uml-use-case-diagram/uml-use-case-extend/uml-use-case-extend-component';
import { UMLUseCaseGeneralizationComponent } from './uml-use-case-diagram/uml-use-case-generalization/uml-use-case-generalization-component';
import { UMLUseCaseIncludeComponent } from './uml-use-case-diagram/uml-use-case-include/uml-use-case-include-component';
import { UMLUseCaseSystemComponent } from './uml-use-case-diagram/uml-use-case-system/uml-use-case-system-component';
import { UMLUseCaseComponent } from './uml-use-case-diagram/uml-use-case/uml-use-case-component';

export const Components: { [key in UMLElementType | UMLRelationshipType]: FunctionComponent<{ element: any }> } = {
  [UMLElementType.Package]: UMLClassPackageComponent,
  [UMLElementType.Class]: UMLClassifierComponent,
  [UMLElementType.AbstractClass]: UMLClassifierComponent,
  [UMLElementType.Interface]: UMLClassifierComponent,
  [UMLElementType.Enumeration]: UMLClassifierComponent,
  [UMLElementType.ClassAttribute]: UMLClassifierMemberComponent,
  [UMLElementType.ClassMethod]: UMLClassifierMemberComponent,
  [UMLElementType.ObjectName]: UMLClassifierComponent,
  [UMLElementType.ObjectAttribute]: UMLClassifierMemberComponent,
  [UMLElementType.ObjectMethod]: UMLClassifierMemberComponent,
  [UMLElementType.Activity]: UMLActivityComponent,
  [UMLElementType.ActivityActionNode]: UMLActivityActionNodeComponent,
  [UMLElementType.ActivityFinalNode]: UMLActivityFinalNodeComponent,
  [UMLElementType.ActivityForkNode]: UMLActivityForkNodeComponent,
  [UMLElementType.ActivityInitialNode]: UMLActivityInitialNodeComponent,
  [UMLElementType.ActivityMergeNode]: UMLActivityMergeNodeComponent,
  [UMLElementType.ActivityObjectNode]: UMLActivityObjectNodeComponent,
  [UMLElementType.UseCase]: UMLUseCaseComponent,
  [UMLElementType.UseCaseActor]: UMLUseCaseActorComponent,
  [UMLElementType.UseCaseSystem]: UMLUseCaseSystemComponent,
  [UMLElementType.Component]: UMLComponentComponent,
  [UMLElementType.ComponentInterface]: UMLComponentInterfaceComponent,
  [UMLElementType.DeploymentNode]: UMLDeploymentNodeComponent,
  [UMLElementType.DeploymentArtifact]: UMLDeploymentArtifactComponent,
  [UMLRelationshipType.ClassAggregation]: UMLAssociationComponent,
  [UMLRelationshipType.ClassBidirectional]: UMLAssociationComponent,
  [UMLRelationshipType.ClassComposition]: UMLAssociationComponent,
  [UMLRelationshipType.ClassDependency]: UMLAssociationComponent,
  [UMLRelationshipType.ClassInheritance]: UMLAssociationComponent,
  [UMLRelationshipType.ClassRealization]: UMLAssociationComponent,
  [UMLRelationshipType.ClassUnidirectional]: UMLAssociationComponent,
  [UMLRelationshipType.ObjectLink]: UMLObjectLinkComponent,
  [UMLRelationshipType.ActivityControlFlow]: UMLActivityControlFlowComponent,
  [UMLRelationshipType.UseCaseAssociation]: UMLUseCaseAssociationComponent,
  [UMLRelationshipType.UseCaseExtend]: UMLUseCaseExtendComponent,
  [UMLRelationshipType.UseCaseGeneralization]: UMLUseCaseGeneralizationComponent,
  [UMLRelationshipType.UseCaseInclude]: UMLUseCaseIncludeComponent,
  [UMLRelationshipType.CommunicationLink]: UMLCommunicationLinkComponent,
  [UMLRelationshipType.ComponentInterfaceProvided]: UMLComponentInterfaceProvidedComponent,
  [UMLRelationshipType.ComponentInterfaceRequired]: UMLComponentInterfaceRequiredComponent,
  [UMLRelationshipType.ComponentDependency]: UMLComponentDependencyComponent,
  [UMLRelationshipType.DeploymentAssociation]: UMLDeploymentAssociationComponent,
};
