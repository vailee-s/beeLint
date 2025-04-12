import { program } from 'commander'
import pc from 'picocolors'
import prompts from 'prompts'

import pkg from '../package.json'

import { logger } from './utils/logger'

// Commander program setup
program.version('1.0.0').description('A simple CLI tool')

// Greet command using prompts
program
    .command('greet')
    .description('Greet the user')
    .action(async () => {
        const response = await prompts({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        logger.log(pc.green(`Hello, ${response.name}!`))
    })

program
    .command('info')
    .description('Display info about the BEE CLI')
    .action(() => {
        logger.log(pc.bgGreen(`Product: BEE CLI v${pkg.version}`))
        logger.log(pc.green('Author: vailee'))
        // logger.log(pc.underline('Website: '))
    })

export const defineConfig = () => {
    //
}

export const runCLI = () => {
    program.parse(process.argv)
}
