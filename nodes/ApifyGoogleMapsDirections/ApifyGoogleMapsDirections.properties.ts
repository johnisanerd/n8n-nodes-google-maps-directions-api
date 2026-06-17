import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

/**
 * Build the Apify Actor input from node parameters.
 * Only the real Actor inputs are sent; the Output / Fields parameters shape the
 * data we return, they are not part of the Actor input.
 */
export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	return {
		...defaultInput,
		start_addr: context.getNodeParameter('start_addr', itemIndex),
		end_addr: context.getNodeParameter('end_addr', itemIndex),
		travel_mode: context.getNodeParameter('travel_mode', itemIndex),
		avoid_tolls: context.getNodeParameter('avoid_tolls', itemIndex),
		avoid_highways: context.getNodeParameter('avoid_highways', itemIndex),
		hl: context.getNodeParameter('hl', itemIndex),
		gl: context.getNodeParameter('gl', itemIndex),
	};
}

const resourceProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Route',
				value: 'route',
			},
		],
		default: 'route',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['route'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get directions',
				description: 'Get directions between two places',
			},
		],
		default: 'get',
	},
];

const actorProperties: INodeProperties[] = [
	{
		displayName: 'Start Address',
		name: 'start_addr',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. Austin, TX',
		description: 'The starting address or place',
		displayOptions: { show: { resource: ['route'], operation: ['get'] } },
	},
	{
		displayName: 'End Address',
		name: 'end_addr',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. Dallas, TX',
		description: 'The destination address or place',
		displayOptions: { show: { resource: ['route'], operation: ['get'] } },
	},
	{
		displayName: 'Travel Mode',
		name: 'travel_mode',
		type: 'options',
		options: [
			{ name: 'Best', value: 'best' },
			{ name: 'Bicycling', value: 'bicycling' },
			{ name: 'Driving', value: 'driving' },
			{ name: 'Transit', value: 'transit' },
			{ name: 'Walking', value: 'walking' },
		],
		default: 'best',
		description: 'How to travel between the two places',
		displayOptions: { show: { resource: ['route'], operation: ['get'] } },
	},
	{
		displayName: 'Avoid Tolls',
		name: 'avoid_tolls',
		type: 'boolean',
		default: false,
		description: 'Whether to avoid toll roads',
		displayOptions: { show: { resource: ['route'], operation: ['get'] } },
	},
	{
		displayName: 'Avoid Highways',
		name: 'avoid_highways',
		type: 'boolean',
		default: false,
		description: 'Whether to avoid highways',
		displayOptions: { show: { resource: ['route'], operation: ['get'] } },
	},
	{
		displayName: 'Country Code',
		name: 'gl',
		type: 'string',
		default: 'us',
		placeholder: 'e.g. us',
		description: 'Two-letter country code the search runs from',
		displayOptions: { show: { resource: ['route'], operation: ['get'] } },
	},
	{
		displayName: 'Language Code',
		name: 'hl',
		type: 'string',
		default: 'en',
		placeholder: 'e.g. en',
		description: 'Two-letter language code for the results',
		displayOptions: { show: { resource: ['route'], operation: ['get'] } },
	},
];

const outputProperties: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['route'], operation: ['get'] } },
		options: [
			{
				name: 'Raw',
				value: 'raw',
				description: 'Return every field the API produces',
			},
			{
				name: 'Selected Fields',
				value: 'selected',
				description: 'Choose exactly which fields to return',
			},
			{
				name: 'Simplified',
				value: 'simplified',
				description: 'Return a compact summary with the best route and options',
			},
		],
		default: 'simplified',
		description: 'How much data to return',
	},
	{
		displayName: 'Fields to Include',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: { resource: ['route'], operation: ['get'], output: ['selected'] },
		},
		options: [
			{ name: 'Best Distance', value: 'best_distance' },
			{ name: 'Best Duration', value: 'best_duration' },
			{ name: 'Directions', value: 'directions' },
			{ name: 'Directions Count', value: 'directions_count' },
			{ name: 'Directions Found', value: 'directions_found' },
			{ name: 'Durations', value: 'durations' },
			{ name: 'End', value: 'end' },
			{ name: 'Maps URL', value: 'google_maps_directions_url' },
			{ name: 'Places Info', value: 'places_info' },
			{ name: 'Start', value: 'start' },
			{ name: 'Travel Mode', value: 'travel_mode' },
		],
		default: ['start', 'end', 'best_distance', 'best_duration', 'directions'],
		description: 'Which fields to return when Output is set to Selected Fields',
	},
];

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const properties: INodeProperties[] = [
	...resourceProperties,
	...actorProperties,
	...outputProperties,
	...authenticationProperties,
];
