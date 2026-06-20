import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ListadoCargo } from './pages/listado-cargo/listado-cargo';
import { ListadoCategoria } from './pages/listado-categoria/listado-categoria';
import { ListadoProducto } from './pages/listado-producto/listado-producto';
import { Page404 } from './pages/page-404/page-404';
import { ListadoEmpleado } from './pages/listado-empleado/listado-empleado';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'listado-cargo', component: ListadoCargo},
    {path: 'cargo', loadComponent: () => import('./pages/cargo/cargo').then(m => m.Cargo)},
    {path: 'cargo/:codigo', loadComponent: () => import('./pages/cargo/cargo').then(m => m.Cargo)},

    {path: 'listado-categoria', component: ListadoCategoria},
    {path: 'categoria', loadComponent: () => import('./pages/categoria/categoria').then(m => m.Categoria)},
    {path: 'categoria/:codigo', loadComponent: () => import('./pages/categoria/categoria').then(m => m.Categoria)},

    { path: 'listado-producto', component: ListadoProducto },
    { path: 'producto', loadComponent: () => import('./pages/producto/producto').then(m => m.Producto) },
    { path: 'producto/:codigo', loadComponent: () => import('./pages/producto/producto').then(m => m.Producto) },

    { path: 'listado-empleado', component: ListadoEmpleado },
    { path: 'empleado', loadComponent: () => import('./pages/empleado/empleado').then(m => m.Empleado) },
    { path: 'empleado/:codigo', loadComponent: () => import('./pages/empleado/empleado').then(m => m.Empleado) },


    {path: '**', component: Page404}
];