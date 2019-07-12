import * as assert from 'assert';

import * as mainModule from './main.js';

describe('RSModuleSharedJSONSchemaForErrors', function RSModuleSharedJSONSchemaForErrors() {

	it('throws error if not object', function() {
		assert.throws(function() {
			mainModule.RSModuleSharedJSONSchemaForErrors(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns object', function() {
		assert.deepEqual(mainModule.RSModuleSharedJSONSchemaForErrors({}), {
			type: 'object',
			properties: {},
			required: [],
		});
	});

	context('properties', function() {
		
		it('declares string', function() {
			assert.deepEqual(mainModule.RSModuleSharedJSONSchemaForErrors({
				alfa: ['LCHErrorNotString']
			}), {
				type: 'object',
				properties: {
					alfa: {
						type: 'string',
					},
				},
				required: [
					'alfa',
				],
			});
		});
		
		it('declares boolean', function() {
			assert.deepEqual(mainModule.RSModuleSharedJSONSchemaForErrors({
				alfa: ['LCHErrorNotBoolean']
			}), {
				type: 'object',
				properties: {
					alfa: {
						type: 'boolean',
					},
				},
				required: [
					'alfa',
				],
			});
		});
		
		it('declares date', function() {
			assert.deepEqual(mainModule.RSModuleSharedJSONSchemaForErrors({
				alfa: ['LCHErrorNotDate']
			}), {
				type: 'object',
				properties: {
					alfa: {
						type: 'string',
						format: 'date-time',
					},
				},
				required: [
					'alfa',
				],
			});
		});
		
		it('declares filled', function() {
			assert.deepEqual(mainModule.RSModuleSharedJSONSchemaForErrors({
				alfa: ['LCHErrorNotFilled']
			}), {
				type: 'object',
				properties: {
					alfa: {
						type: 'string',
					},
				},
				required: [
					'alfa',
				],
			});
		});
		
	});

	context('required', function() {
		
		it('declares if required', function() {
			assert.deepEqual(mainModule.RSModuleSharedJSONSchemaForErrors({
				alfa: ['LCHErrorNotString']
			}), {
				type: 'object',
				properties: {
					alfa: {
						type: 'string',
					},
				},
				required: [
					'alfa',
				],
			});
		});

		it('ignores', function() {
			assert.deepEqual(mainModule.RSModuleSharedJSONSchemaForErrors({
				alfa: ['LCHErrorNotString', '__RSOptional']
			}), {
				type: 'object',
				properties: {
					alfa: {
						type: 'string',
					},
				},
				required: [],
			});
		});
		
	});

});
