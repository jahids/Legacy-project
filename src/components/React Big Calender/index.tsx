import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './calendar.styles.css';
import { useEffect, useState } from 'react';
import { Case } from '../../interfaces/case.interface';
import { useAppSelector } from '../../app/hooks';
import { Cyclist } from '../../interfaces/cyclist.interface';
const localizer = momentLocalizer(moment);

export interface Event {
	start: Date;
	end: Date;
	title: string;
}

const dummyWorkingSlots = [{ slotTime: '9:00-10:00' }, { slotTime: '10:00-11:00' }, { slotTime: '11:00-12:00' }, { slotTime: '13:00-14:00' }, { slotTime: '14:00-15:00' }, { slotTime: '16:00-17:00' }, { slotTime: '18:00-19:00' }, { slotTime: '19:00-20:00' }];

const AgendaCalendar = ({ cases }: { cases: Case[] }) => {
	const [myEventsList, setMyEventList] = useState<Event[]>([]);
	const technician = useAppSelector((state: any) => state.technician);

	const slotStyleGetter = (date: Date) => {
		const hour = moment(date).hour();
		const style: React.CSSProperties = {};

		const isWorkingHour = technician.workingSlots.some((slot: any) => {
			const [startHour, endHour] = slot.slotTime.split('-');
			const start = parseInt(startHour, 10);
			const end = parseInt(endHour, 10);
			return hour >= start && hour < end;
		});

		if (isWorkingHour) {
			style.backgroundColor = '#C1FAA6';
		} else {
			style.backgroundColor = '#bababa';
		}

		return { style };
	};

	useEffect(() => {
		const events = cases
			.filter((caseItem) => caseItem.supportTime)
			.map((caseItem) => {
				const [startTimeStr, endTimeStr] = caseItem.supportTime.slotTime.split('-');
				const startTime = moment(startTimeStr.trim(), 'HH:mm').toDate();
				const endTime = moment(endTimeStr.trim(), 'HH:mm').toDate();
				const clientName = typeof caseItem.cyclist === 'object' && 'name' in caseItem.cyclist ? (caseItem.cyclist as Cyclist).name.toLowerCase() : '';

				return {
					start: startTime,
					end: endTime,
					title: `Call with ${clientName} \n ${caseItem.type} case`,
				};
			});

		setMyEventList(events);
	}, [cases]);

	return (
		<>
			<Calendar
				selectable
				localizer={localizer}
				events={myEventsList}
				startAccessor="start"
				endAccessor="end"
				style={{ height: '75vh', width: '40rem' }}
				slotPropGetter={slotStyleGetter}
				defaultDate={new Date()}
				min={moment().startOf('day').add(7, 'hours').toDate()}
				max={moment().startOf('day').add(20, 'hours').toDate()}
				defaultView="day"
				views={['day']}
				step={60}
				timeslots={1}
				toolbar={false}
				formats={{
					timeGutterFormat: 'HH:mm',
				}}
			/>
		</>
	);
};

export default AgendaCalendar;
