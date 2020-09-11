export const getRandomId = () => (
  Math.random().toString(36).substring(3, 7)
);

export const showPdfPreview = (pdfData) => {
  const file = new Blob([pdfData], { type: 'application/pdf' });
  const fileURL = URL.createObjectURL(file);
  window.open(fileURL);
};

export const filterAutoCompleteSuggestions = (suggestions, keyword) => {
  const filteredSuggestions = [];

  if (!Array.isArray(suggestions)) {
    return filteredSuggestions;
  }

  suggestions.forEach(suggestion =>
    Object.keys(suggestion).some((key) => {
      const prop = (suggestion[key] || '').toString().toLowerCase();

      if (prop.includes(keyword.toLowerCase())) {
        filteredSuggestions.push({
          key,
          label: prop,
          data: suggestion
        });
        // break this loop as soon as it finds one of properties matching keyword
        return true;
      }
      return false;
    })
  );

  return filteredSuggestions;
};

export const checkNegative = value => (
  Number(value) < 0 ? 0 : Number(value)
);

export const toFixed2 = value => (
  value ? Number(value).toFixed(2) : '0.00'
);
