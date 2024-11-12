export const runCode = async (code: string, language: string): Promise<string> => {
    try {
      switch (language) {
        case 'javascript':
          return runJavaScript(code);
        case 'python':
          return 'Python execution requires backend integration';
        case 'cpp':
          return 'C++ execution requires backend integration';
        default:
          return 'Unsupported language';
      }
    } catch (error) {
      if (error instanceof Error) {
        return `Error: ${error.message}`;
      }
      return 'An unknown error occurred';
    }
  };
  
  const runJavaScript = (code: string): string => {
    // Create a new function to capture console.log output
    let output: string[] = [];
    const originalLog = console.log;
    console.log = (...args) => {
      output.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };
  
    try {
      // Create a new Function to run the code in a sandbox
      const fn = new Function(code);
      fn();
      console.log = originalLog;
      return output.join('\n') || 'Code executed successfully (no output)';
    } catch (error) {
      console.log = originalLog;
      throw error;
    }
  };