import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ListadoCargo } from './pages/listado-cargo/listado-cargo';
import { ListadoMarca } from './pages/listado-marca/listado-marca';
import { ListadoCategoria } from './pages/listado-categoria/listado-categoria';
import { ListadoProducto } from './pages/listado-producto/listado-producto';
import { Page404 } from './pages/page-404/page-404';
import { ListadoEmpleado } from './pages/listado-empleado/listado-empleado';

export const routes: Routes = [
    
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    { path: 'home', component: Home },

    // Cargos
    { path: 'listado-cargo', component: ListadoCargo },
    { path: 'cargo', loadComponent: () => import('./pages/cargo/cargo').then(m => m.Cargo) },
    { path: 'cargo/:codigo', loadComponent: () => import('./pages/cargo/cargo').then(m => m.Cargo) },

    // Marcas
    { path: 'listado-marca', component: ListadoMarca },
    { path: 'marca', loadComponent: () => import('./pages/marca/marca').then(m => m.Marca) },
    { path: 'marca/:codigo', loadComponent: () => import('./pages/marca/marca').then(m => m.Marca) },

    // Categorías
    { path: 'listado-categoria', component: ListadoCategoria },
    { path: 'categoria', loadComponent: () => import('./pages/categoria/categoria').then(m => m.Categoria) },
    { path: 'categoria/:codigo', loadComponent: () => import('./pages/categoria/categoria').then(m => m.Categoria) },

    // Productos
    { path: 'listado-producto', component: ListadoProducto },
    { path: 'producto', loadComponent: () => import('./pages/producto/producto').then(m => m.Producto) },
    { path: 'producto/:codigo', loadComponent: () => import('./pages/producto/producto').then(m => m.Producto) },

    // Empleados
    { path: 'listado-empleado', component: ListadoEmpleado },
    { path: 'empleado', loadComponent: () => import('./pages/empleado/empleado').then(m => m.Empleado) },
    { path: 'empleado/:codigo', loadComponent: () => import('./pages/empleado/empleado').then(m => m.Empleado) },

    // Página no encontrada
    { path: '**', component: Page404 }
];