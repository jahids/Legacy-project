import { useAppSelector } from '../../app/hooks';

const ActiveTags = () => {
	const Case = useAppSelector((state: any) => state.caseDetails);

	return (
		<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1rem', margin: '2rem 0 2rem 3rem' }}>
			{Case.tags.length > 0 &&
				Case.tags.map((tag: string, index: number) => {
					return (
						<div
							key={index}
							style={{
								border: '1px solid white',
								borderRadius: '20px',
								padding: '0.25rem 0.5rem',
								display: 'flex',
								alignItems: 'center',
								boxShadow: '0 .25rem .5rem rgba(0, 0, 0, 0.1)',
							}}>
							#{tag}
						</div>
					);
				})}
		</div>
	);
};

export default ActiveTags;
