import { Command } from 'commander'
import pc from 'picocolors'
import prompts from 'prompts'

import { templateChoices } from '../../constants/templates'
import { Framework, Template } from '../../types/template'
import { loadTemplate } from '../../utils/loadTemplate'
import { logger } from '../../utils/logger'
import { validateGivenFramework } from '../../utils/validateGivenFramework'
import { validateGivenTemplate } from '../../utils/validateGivenTemplate'

type CreateCommandOptions = {
    framework: Framework
    template: Template
    remote?: boolean
}

export const create = (program: Command) =>
    program
        .createCommand('create')
        .arguments('<project-name>')
        .option('-f, --framework <framework>', 'framework')
        .option('-t, --template <template>', 'template')
        .option('-r, --remote', 'remote template')
        .description('create project')
        .helpOption('-h, --help', 'display help for command')
        .action(async (projectName: string, options: CreateCommandOptions) => {
            /**
             * validate project name
             */
            let { framework, template } = options
            const { remote } = options

            if (remote) {
                await loadTemplate({ projectName, remote, template })
                return
            }

            // If the framework is not specified, prompt the user to select a framework
            if (!framework || !validateGivenFramework(framework)) {
                const response = await prompts({
                    type: 'select',
                    choices: [
                        { title: 'Vue', value: 'vue' },
                        { title: 'React', value: 'react' },
                        { title: 'Vanilla', value: 'vanilla' }
                    ],
                    name: 'framework',
                    message: 'What is your framework?'
                })

                framework = response.framework
            }

            // If the template is not specified, prompt the user to select a template
            if (!template || !validateGivenTemplate(framework, template)) {
                const choices = templateChoices[framework]
                const response = await prompts({
                    type: 'select',
                    choices,
                    name: 'template',
                    message: 'What is your template?'
                })

                template = response.template
            }

            if (!framework || !template) {
                logger.error(pc.red('Invalid framework or template'))
                process.exit(1)
            }

            logger.info(pc.green(`Create project ${projectName} with ${framework} and ${template}`))

            await loadTemplate({ projectName, template, remote })
        })
