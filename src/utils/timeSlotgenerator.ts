export interface TimeSlot {
	slotName: string;
	slotTime: string;
	_id?: string;
}
export function timeSlotGenerator(start: number, end: number) {
	const timeSlots: TimeSlot[] = [];
	for (let hour = start; hour < end; hour++) {
		if (hour == 11) continue;
		const slotStartTime = `${hour.toString().padStart(2, '0')}:00`;
		const slotEndTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
		const slotName = String.fromCharCode(65 + hour - 7);
		const slotTime = `${slotStartTime}-${slotEndTime}`;

		timeSlots.push({
			slotName: slotName,
			slotTime: slotTime,
		});
	}

	return timeSlots;
}
