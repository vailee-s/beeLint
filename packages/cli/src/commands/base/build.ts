import { Command } from 'commander'
import pc from 'picocolors'
import prompts from 'prompts'

import { logger } from '../../utils/logger'

export const build = (program: Command) =>
    program
        .createCommand('build')
        .description('build project')
        .action(async () => {
            const response = await prompts({
                type: 'select',
                choices: [
                    { title: 'Vue', value: 'vue' },
                    { title: 'React', value: 'react' },
                    { title: 'Angular', value: 'angular' }
                ],
                name: 'template',
                message: 'What is your framework?'
            })
            logger.log(pc.green(`Hello, ${response.template}!`))
        })
