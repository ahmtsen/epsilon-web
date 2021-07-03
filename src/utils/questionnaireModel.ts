export const questionnaireModel = {
	title: 'COVID-19 Daily Questionnaire',
	showQuestionNumbers: 'off',
	triggers: [
		{
			type: 'complete',
			expression: "{q1} notequal ['none']"
		},
		{
			type: 'complete',
			expression: "{q2} notequal ['none']"
		},
		{
			type: 'skip',
			expression: '{q3} = false',
			goToName: 'q5'
		},
		{
			type: 'complete',
			expression: '{q4} notempty'
		},
		{
			type: 'complete',
			expression: "{q5} notequal 'I do not know'"
		}
	],
	pages: [
		{
			elements: [
				{
					type: 'checkbox',
					name: 'q1',
					title: 'Do you (they) have any of these life-threatening symptoms?',
					isRequired: true,
					hasNone: true,
					colCount: 1,
					choices: [
						'Bluishlips or face',
						'Severe and constant pain or pressure in the chest',
						'Extreme difficulty breathing',
						'Frequent vomitting'
					],
					width: '600px'
				}
			]
		},
		{
			elements: [
				{
					type: 'checkbox',
					name: 'q2',
					title: 'Do you (they) have any of these life-threatening symptoms?',
					isRequired: true,
					hasNone: true,
					colCount: 1,
					choices: [
						'Signs of low blood pressure (too weak to stand, dizziness, lightheaded, feeling cold, pale, clammy skin)',
						'Dehydration (dry lips and mouth, not urinating much, sunken eyes)',
						'Refusing to drink liquids'
					],
					width: '600px'
				}
			]
		},
		{
			elements: [
				{
					type: 'boolean',
					name: 'q3',
					title: 'Are you (they) feeling sick?',
					isRequired: true,
					width: '600px'
				}
			]
		},
		{
			elements: [
				{
					type: 'checkbox',
					name: 'q4',
					title: 'Do you (they) have any of the following symptoms?',
					isRequired: true,
					hasNone: true,
					visibleIf: '{q3} = true',
					colCount: 1,
					choices: [
						'Sore throat',
						'Muscle aches or body aches',
						'Diarrhea',
						'Stomach ache or pain in abdomen',
						'Loss of taste or smell',
						'Congestion or runny nose'
					],
					width: '600px'
				}
			]
		},
		{
			elements: [
				{
					type: 'radiogroup',
					name: 'q5',
					title:
						'In the last two weeks, did you (they) care for or have close contact (within 6 feet of an infected person for a cumulative total of 15 minutes in a 24-hour period) with someone with symptoms of COVID-19, tested for COVID- 19, or diagnosed with COVID-19?',
					isRequired: true,
					choices: [ 'Yes', 'No', 'I do not know' ],
					width: '600px'
				}
			]
		},
		{
			elements: [
				{
					type: 'boolean',
					name: 'q6',
					visibleIf: "{q5} equal 'I don't know'",
					title:
						'In the last two weeks, have you (they) attended or spent time in a group setting (for example school, dormitory, child care, sporting event)?',
					isRequired: true,
					width: '600px'
				}
			]
		}
	]
};
