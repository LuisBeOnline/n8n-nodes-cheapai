import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { imageFields, imageOperations } from './ImageDescription';
import { textFields, textOperations } from './TextDescription';
import { chatFields, chatOperations } from './chatOperations';

export class CheapAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CheapAI',
		name: 'cheapAi',
		icon: 'file:cheapAi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Cheap AI',
		defaults: {
			name: 'CheapAI',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'cheapAiApi',
				required: true,
			},
		],
		requestDefaults: {
			ignoreHttpStatusErrors: true,
			baseURL: '={{$credentials.apiUrl}}',
		},
		properties: [
			{
				displayName: 'WARNING: This node will be deprecated soon. Please update to AIConnect: https://www.npmjs.com/package/n8n-nodes-aiconnect',
				name: 'warning',
				type: 'notice',
				default: 'This node will be deprecated soon. Please update to AIConnect: https://www.npmjs.com/package/n8n-nodes-aiconnect',
				displayOptions: {
					show: {
						resource: ['chat', 'image', 'text'],
					},
				},
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat',
						value: 'chat',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Text',
						value: 'text',
					},
				],
				default: 'text',
			},

			...chatOperations,
			...chatFields,

			...imageOperations,
			...imageFields,

			...textOperations,
			...textFields,
		],
	};
}