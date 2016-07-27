
export const FETCH_PULSE = 'FETCH_PULSE'




export function fetchPulse(pulseCount){	
	return {	
		type: FETCH_PULSE,
		payload : pulseCount
	}
}
