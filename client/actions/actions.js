export const FETCH_PULSE = 'FETCH_PULSE'
export const FETCH_LOGSTATE = 'FETCH_LOGSTATE'

export function fetchPulse(pulseCount){	
  return {	
    type: FETCH_PULSE,
    payload : pulseCount
  }
}
export function fetchLogState(logState){
  return{
    type: FETCH_LOGSTATE,
    payload: logState
  }
}
