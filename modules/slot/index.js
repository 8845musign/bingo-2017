import { createAction } from 'redux-actions'

import startMiddleware from './middlewares/start'
import animeMiddleware from './middlewares/anime'

export const START = 'modules/slot/START'
export const END = 'modules/slot/END'
export const ANIME = 'modules/slot/ANIME'

export const start = createAction(START)
export const end = createAction(END)
export const anime = createAction(ANIME)

export const middlewares = [
  startMiddleware,
  animeMiddleware
]

const REEL_SPEED = 300

const slotReducer = (state = {
  isAnimating: false,
  pattern: [],
  reelTop: 0,
  reelSpeed: REEL_SPEED
}, action) => {
  switch (action.type) {
    case START:
      return Object.assign({},
        state,
        {
          isAnimating: true,
          pattern: action.payload,
          reelTop: 0,
          reelSpeed: REEL_SPEED
        }
      )
    case END:
      return Object.assign({},
        state,
        {
          isAnimating: false
        }
      )
    case ANIME:
      return Object.assign({},
        state,
        {
          reelTop: action.payload.top,
          reelSpeed: action.payload.speed
        }
      )
    default:
      return state
  }
}

export default slotReducer
