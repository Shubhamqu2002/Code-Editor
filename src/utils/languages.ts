export const supportedLanguages = [
    {
      id: 'javascript',
      name: 'JavaScript',
      extension: '.js',
      mode: 'javascript',
    },
    {
      id: 'python',
      name: 'Python',
      extension: '.py',
      mode: 'python',
    },
    {
      id: 'cpp',
      name: 'C++',
      extension: '.cpp',
      mode: 'cpp',
    },
    {
      id: 'html',
      name: 'HTML',
      extension: '.html',
      mode: 'html',
    },
    {
      id: 'css',
      name: 'CSS',
      extension: '.css',
      mode: 'css',
    },
  ];
  
  export const getLanguageById = (id: string) => {
    return supportedLanguages.find((lang) => lang.id === id);
  };