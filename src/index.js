// import {Excel} from '@/components/excel/Excel';
// import {Toolbar} from '@/components/toolbar/Toolbar';
// import {Header} from '@/components/header/Header';
// import {Formula} from '@/components/formula/Formula';
// import {Table} from '@/components/table/Table';
// import {createStore} from '@core/createStore';
// import {rootReducer} from '@/store/rootReducer';
// import {debounce, storage} from '@core/utils';
// import {initialState} from '@/store/initialState';
import './scss/index.scss'
import {Router} from '@core/routes/Router';
import {DashboardPage} from '@/pages/DashboardPage';
import {ExcelPage} from '@/pages/ExcelPage';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
})

// const store = createStore(rootReducer, initialState)
//
// const stateListener = debounce(state => {
//   console.log('App State: ', state)
//   storage('excel-state', state)
// }, 300)
//
// store.subscribe(stateListener)
//
// const excel = new Excel('#app', {
//   components: [Header, Toolbar, Formula, Table],
//   store
// })
//
// excel.render()
