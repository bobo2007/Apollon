export enum ElementKind {
  ActivityInitialNode = 'ActivityInitialNode',
  ActivityFinalNode = 'ActivityFinalNode',
  ActivityActionNode = 'ActivityActionNode',
  ActivityObjectNode = 'ActivityObjectNode',
  ActivityMergeNode = 'ActivityMergeNode',
  ActivityForkNode = 'ActivityForkNode',
}

export enum RelationshipKind {
  ActivityControlFlow = 'ActivityControlFlow',
}
