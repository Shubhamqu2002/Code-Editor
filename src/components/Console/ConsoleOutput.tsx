import React from 'react';
import { ConsoleOutput as ConsoleOutputType } from '../../types';

interface Props {
  outputs: ConsoleOutputType[];
}

const ConsoleOutput: React.FC<Props> = ({ outputs }) => {
  const outputRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputs]);

  return (
    <div
      ref={outputRef}
      className="flex-1 overflow-y-auto p-4 font-mono text-sm"
    >
      {outputs.map((output) => (
        <div
          key={output.id}
          className={`mb-2 ${
            output.type === 'error'
              ? 'text-red-500'
              : output.type === 'info'
              ? 'text-blue-500'
              : 'text-gray-800 dark:text-gray-200'
          }`}
        >
          {output.content}
        </div>
      ))}
    </div>
  );
};

export default ConsoleOutput;