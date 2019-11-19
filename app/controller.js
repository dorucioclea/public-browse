import axios from 'axios';
import { createSolutionListPageContext, createFoundationSolutionListPageContext } from './contextCreator/createSolutionListPageContext';
import { createViewSolutionContext } from './contextCreator/createViewSolutionContext';

export const getSolutionFoundationListPageContext = async () => {
  const foundationSolutionListResponse = await axios.get('http://localhost:8080/api/v1/Solutions/Foundation');

  const context = createFoundationSolutionListPageContext(
    foundationSolutionListResponse.data.solutions,
  );

  return context;
};

export const getSolutionListPageContext = async () => {
  const solutionListResponse = await axios.get('http://localhost:8080/api/v1/Solutions');

  const context = createSolutionListPageContext(
    solutionListResponse.data.solutions,
  );

  return context;
};

export const getPublicSolutionById = async (solutionId, browseSolutionType) => {
  const response = await axios.get(`http://localhost:8080/api/v1/Solutions/${solutionId}/Public`);
  return createViewSolutionContext(response.data, browseSolutionType);
};
