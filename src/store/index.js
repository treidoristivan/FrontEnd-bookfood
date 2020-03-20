import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers/'

const configPersistStorage = {
  key: 'root',
  storage
}
const store = createStore(
  persistReducer(configPersistStorage, rootReducer),
  compose(applyMiddleware(logger, promiseMiddleware))
)
export default { store, persistor: persistStore(store) }
