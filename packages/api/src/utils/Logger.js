import chalk from 'chalk';

const RETURN_SELF = (v) => v;
const DEFAULT_LEVEL = 'info';
const DEFAULT_CONTEXT = 'API';

const LEVEL_FORMATS = {
	error: chalk.bold.red,
	info: chalk.bold.blue,
	success: chalk.bold.green,
	warning: chalk.bold.yellow,
};

function log(message, level, context) {
	const levelFormat = LEVEL_FORMATS[level.toLowerCase()] || RETURN_SELF;
	const formattedLevel = levelFormat(level.toUpperCase());
	const logString = [formattedLevel, context, message]
		.filter(RETURN_SELF)
		.join('  ');
	console.log(logString);
}

// @TODO implement Winston

class Logger {
	_level = DEFAULT_LEVEL;
	_context = DEFAULT_CONTEXT;

	log(message, level = this._level, context = this._context) {
		log(message, level, context);
	}

	level(level) {
		this._level = level;
		return this;
	}

	context(context) {
		this._context = context;
		return this;
	}

	error(message, context = this._context) {
		this.log(message, 'error', context);
	}

	info(message, context = this._context) {
		this.log(message, 'info', context);
	}

	success(message, context = this._context) {
		this.log(message, 'success', context);
	}

	warning(message, context = this._context) {
		this.log(message, 'warning', context);
	}
}

export { Logger };
