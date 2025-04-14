import { program } from 'commander'

import pkg from '../../package.json'

import { build } from './base/build'
import { create } from './base/create'
import { info } from './base/info'
import { preview } from './base/preview'
import { serve } from './base/serve'
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
registerCommand(create)
registerCommand(serve)
