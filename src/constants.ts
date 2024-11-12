import { SupportedLanguage } from './types';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';

// Simple array of supported languages
export const SUPPORTED_LANGUAGE_LIST = [
    'javascript',
    'typescript',
    'python',
    'cpp',
    'java'
] as const;

interface LanguageConfig {
  extension: string;
  color: string;
  mode: any;
  snippets: ReadonlyArray<{
    readonly name: string;
    readonly code: string;
    readonly description: string;
  }>;
}

// Detailed language configurations
export const SUPPORTED_LANGUAGES: Readonly<Record<SupportedLanguage, LanguageConfig>> = {
  javascript: {
    extension: 'js',
    color: 'text-yellow-500',
    mode: javascript(),
    snippets: [
      {
        name: 'Console Log',
        code: 'console.log();',
        description: 'Basic console log statement'
      },
      {
        name: 'Arrow Function',
        code: 'const functionName = () => {\n\n};',
        description: 'ES6 arrow function'
      }
    ]
  },
  typescript: {
    extension: 'ts',
    color: 'text-blue-400',
    mode: javascript({ typescript: true }),
    snippets: [
      {
        name: 'Interface',
        code: 'interface Name {\n\n}',
        description: 'TypeScript interface'
      },
      {
        name: 'Type',
        code: 'type Name = {\n\n};',
        description: 'TypeScript type'
      }
    ]
  },
  python: {
    extension: 'py',
    color: 'text-blue-500',
    mode: python(),
    snippets: [
      {
        name: 'Function',
        code: 'def function_name():\n    pass',
        description: 'Python function'
      },
      {
        name: 'Class',
        code: 'class ClassName:\n    def __init__(self):\n        pass',
        description: 'Python class'
      }
    ]
  },
  cpp: {
    extension: 'cpp',
    color: 'text-purple-500',
    mode: cpp(),
    snippets: [
      {
        name: 'Main Function',
        code: 'int main() {\n    return 0;\n}',
        description: 'C++ main function'
      },
      {
        name: 'Class',
        code: 'class ClassName {\npublic:\n    ClassName();\n};',
        description: 'C++ class'
      }
    ]
  },
  java: {
    extension: 'java',
    color: 'text-red-500',
    mode: java(),
    snippets: [
      {
        name: 'Main Class',
        code: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}',
        description: 'Java main class'
      },
      {
        name: 'Class',
        code: 'public class ClassName {\n    public ClassName() {\n\n    }\n}',
        description: 'Java class'
      }
    ]
  }
} as const;

// Type for accessing language keys
export type SupportedLanguageKeys = keyof typeof SUPPORTED_LANGUAGES;