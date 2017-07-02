import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux'

import gameReducer, {
  lotteryMiddleware, selectMiddleware
} from '../modules/game'
import membersReducer from '../modules/members'
import slotReducer, { middlewares as slotMiddlewares } from '../modules/slot'
import confettiReducer, { middlewares as confettiMiddlewares } from '../modules/confetti'
import resultReducer from '../modules/result'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(applyMiddleware(
  lotteryMiddleware,
  selectMiddleware,
  ...slotMiddlewares,
  ...confettiMiddlewares
))

const rootReducer = combineReducers({
  game: gameReducer,
  members: membersReducer,
  slot: slotReducer,
  confetti: confettiReducer,
  result: resultReducer
})

const indexStore = () => {
  return createStore(rootReducer, {
    game: {
      selected: []
    },
    members: {
      byId: {
        1: {
          'name': 'Dummy1',
          'image': '/static/images/photos/dummy-1.jpg'
        },
        2: {
          'name': 'Dummy2',
          'image': '/static/images/photos/dummy-2.jpg'
        },
        3: {
          'name': 'Dummy3',
          'image': '/static/images/photos/dummy-3.jpg'
        }
      },
      allIds: [1, 2, 3]
    }
  }, enhancer)
}

export default indexStore
