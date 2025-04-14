import { program } from 'commander'

import pkg from '../../package.json'

import { build } from './base/build'
import { info } from './base/info'
import { preview } from './base/preview'
import { registerCommand } from './registerCommand'

program.version(pkg.version).description(pkg.description)

/**
 * Register the info command
 */
registerCommand(info)

/**
 * Register the build command
 */
registerCommand(build)

/**
 * Register the preview command
 */
registerCommand(preview)
