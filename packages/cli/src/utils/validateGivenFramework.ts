import { frameworks } from '../constants/templates'

export const validateGivenFramework = (framework: string): framework is 'vue' | 'react' | 'vanilla' => frameworks.includes(framework)
