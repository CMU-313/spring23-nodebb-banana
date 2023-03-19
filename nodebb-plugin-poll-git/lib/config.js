'use strict';

const NodeBB = require('./nodebb');

const packageInfo = require('../package.json');
const pluginInfo = require('../plugin.json');

const pluginId = pluginInfo.id.replace('nodebb-plugin-', '');

(function (Config) {
	Config.plugin = {
		name: pluginInfo.name,
		id: pluginId,
		version: packageInfo.version,
		description: packageInfo.description,
		icon: 'fa-bar-chart-o',
	};

	Config.defaults = {
		toggles: {
			allowAnon: false,
		},
		limits: {
			maxOptions: 10,
		},
		defaults: {
			title: 'Poll',
			maxvotes: 1,
			disallowVoteUpdate: 0,
			end: 0,
		},
	};

	function refSet(data, arr, value) {
		// Don't modify parameter
		let ref = data;
		for (let i = 0; i < arr.length - 1; i++) {
			const key = arr[i];
			if (typeof ref[key] !== 'object') {
				ref[key] = {};
			}
			ref = ref[key];
		}
		const key = arr[arr.length - 1];
		ref[key] = value;
	}
	
	function objectify(configData) {
		const result = {};
		for (const [keyLong, value] of Object.entries(configData)) {
			const keyArray = keyLong.split('.');
			refSet(result, keyArray, value);
		}
		return result;
	}
	
	async function getMetaWithDefault() {
		const settings = await meta.settings.get(pluginId);
		const result = {};
		// meta settings must have the same type as Config.defaults.
		// We trust poll.tpl to display boolean value as checkbox, other value as text
		for (const field of Object.keys(Config.defaults)) {
			const setting = settings[field];
			const defaultValue = Config.defaults[field];
	
			if (typeof setting === 'undefined') { // if setting is undefined, use default value
				result[field] = defaultValue;
			} else if (typeof defaultValue === 'boolean') { // For boolean value, don't use default value if not undefined
				result[field] = setting === 'on';
			} else if (typeof defaultValue === 'number') { // For number value, if setting is empty string, use default value
				if (setting === '') {
					result[field] = defaultValue;
				} else {
					const settingNum = parseInt(setting, 10);
					if (isNaN(settingNum)) {
						throw new Error(`Field '${field}' must be a number, get ${setting}`);
					}
					result[field] = settingNum;
				}
			} else {
				result[field] = setting;
			}
		}
		return result;
	}
	Config.settings = {};
	Config.init = function (callback) {
		Config.settings = new NodeBB.Settings(Config.plugin.id, Config.plugin.version, Config.defaults, callback);
	};

	Config.adminSockets = {
		sync: function () {
			Config.settings.sync();
		},
		getDefaults: function (socket, data, callback) {
			callback(null, Config.settings.createDefaultWrapper());
		},
	};
}(exports));
