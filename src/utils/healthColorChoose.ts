import { healthColorDictionary } from '../data/healthColorDictionary';

export function healthColorChoose(health: number) {
	let color: string = '';
	for (const [schemeColor, { min, max }] of Object.entries(healthColorDictionary)) {
		if (health >= min && health <= max) {
			color = schemeColor;
			break;
		}
	}

	return color;
}
