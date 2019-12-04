
const createSolutionsContext = (filterType, solutions) => solutions.map(solution => ({
  id: solution.id,
  name: solution.name,
  summary: solution.summary,
  organisationName: solution.organisation && solution.organisation.name,
  capabilities: solution.capabilities && solution.capabilities.map(capability => capability.name),
  isFoundation: solution.isFoundation,
  viewSolutionUrl: `/solutions/${filterType}/${solution.id}`,
}));

export const createSolutionListPageContext = (filterType, solutionListManifest, solutionsData) => ({
  pageTitle: solutionListManifest.title,
  pageDescription: solutionListManifest.description,
  solutions: createSolutionsContext(filterType, solutionsData),
});
