import '../sass/index.sass';
import { Router, TSimplePage } from 'router-for-dom';

const router: Router = new Router({
  el: document.querySelector('#app') as HTMLElement,
  routes: [
    {
      path: '/',
      page: (): Promise<TSimplePage> =>
        import('@/pages/MainPage').then((res) => res.MainPage),
    },
    {
      path: '/table/:id',
      page: (): Promise<TSimplePage> =>
        import('@/pages/TablePage').then((res) => res.TablePage),
    },
  ],
});
