export const createShowCardPageContext = (solutionData, config) => {
  const context = {};
  const solutions = [];

  solutionData.map(solData => {
    const solution = {};
    solution.id = solData.id;
    solution.name = solData.name;

    const sections = [];
    

    solData.marketingData.sections.map(s => {
        const section = {};

        section.id = s.id;
        section.name = s.name;
        section.value = s.data[0].value;
    
        sections.push(section);
    });

    if (solData.capabilities) {
      const capabilitySection = {};
      capabilitySection.id = "capability-section";
      capabilitySection.name = "Capabilities";

      const capabilityValues = solData.capabilities.map(cap => cap.name);

      capabilitySection.value = capabilityValues;
      sections.push(capabilitySection);
    }
    
    solution.sections = config ? applySectionConfig(sections, config) : applyDefaultConfig(sections);

    solutions.push(solution);
  });

  context.solutions = solutions;

  return context;
}

export const applySectionConfig = (sections, config) => {
  const defaultSectionConfig = {
    showTitle: true
  };
  const decoratedSections = [];

  sections.map(section => {
    if (config[section.id] !== undefined) {
      const decoratedSection = {
        ...section,
        ...defaultSectionConfig,
        ...config[section.id]
      };

      if (config[section.id].displayType === "columns") {
        decoratedSection.value = createColumnsForSectionValue(section.value)
      }
      decoratedSections.push(decoratedSection);
    }
  })

  return decoratedSections;
}

export const applyDefaultConfig = (sections) => {
  const defaultSectionConfig = {
    showTitle: true
  };
  const decoratedSections = [];

  sections.map(section => {
    const decoratedSection = {
      ...section,
      ...defaultSectionConfig,
    };
    decoratedSections.push(decoratedSection);
  })

  return decoratedSections;
}

export const createColumnsForSectionValue = (value) => {
  const newValue = {};
  const column1 = [];
  const column2 = [];

  value.map((v, idx) => {
    const id = idx + 1;
    if (Math.ceil(value.length / 2) >= id) {
      column1.push(v);
    } else {
      column2.push(v);
    }
  })

  newValue.column1 = column1;
  newValue.column2 = column2;

  return newValue;
}