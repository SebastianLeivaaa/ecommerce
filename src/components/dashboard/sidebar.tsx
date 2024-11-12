"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className='w-[320px] h-[100%] fixed top-0 left-0 min-h-screen bg-white p-4 border-r-[0.5px] border-gray-200 xl:block hidden'>
      <nav className=''>
        <ul className='flex flex-col gap-y-4 w-full'>
          <li className={`${pathname === '/dashboard' ? 'active bg-gray-800 text-white' : ''}  w-full rounded-md`} >
            <Link 
              className='w-full h-full flex items-center p-2'
              href="/dashboard"
            >
              Inicio
            </Link>
          </li>
          <li className={`${pathname === '/dashboard/clientes' ? 'active bg-gray-800 text-white' : ''}  w-full rounded-md`}>
            <Link
              className='w-full h-full flex items-center p-2' 
              href="/dashboard/clientes"
            >
              Clientes
            </Link>
          </li>
          <li>INVENTARIO</li>
          <li className={`${pathname === '/dashboard/inventario/productos/nuevo' ? 'active bg-gray-800 text-white' : ''}  w-full rounded-md`}>
            <Link 
              className='w-full h-full flex items-center p-2'
              href="/dashboard/inventario/productos/nuevo"
            >
              Nuevo producto
            </Link>
          </li>
          <li className={`${pathname === '/dashboard/inventario/productos' ? 'active bg-gray-800 text-white' : ''}  w-full rounded-md`}>
            <Link 
              className='w-full h-full flex items-center p-2'
              href="/dashboard/inventario/productos"
            >
              Catálogo de productos
            </Link>
          </li>
          <li className={`${pathname === '/dashboard/ventas' ? 'active bg-gray-800 text-white' : ''}  w-full rounded-md`}>
            <Link 
              className='w-full h-full flex items-center p-2'
              href="/dashboard/ventas"
            >
              Ventas
            </Link>
          </li>
          <li className={`${pathname === '/dashboard/cupones' ? 'active bg-gray-800 text-white' : ''}  w-full rounded-md`}>
            <Link 
              className='w-full h-full flex items-center p-2'
              href="/dashboard/cupones"
            >
              Cupones
            </Link>
          </li>
          <li className={`${pathname === '/dashboard/descuentos' ? 'active bg-gray-800 text-white' : ''}  w-full rounded-md`}>
            <Link 
              className='w-full h-full flex items-center p-2'
              href="/dashboard/descuentos"
            >
              Descuentos
            </Link>
          </li>
          <li className={`${pathname === '/dashboard/mensajes' ? 'active bg-gray-800 text-white' : ''}  w-full rounded-md`}>
            <Link
              className='w-full h-full flex items-center p-2' 
              href="/dashboard/mensajes"
            >
              Mensajes
            </Link>
          </li>
          <li className={`${pathname === '/dashboard/' ? 'active bg-gray-800 text-white' : ''}  w-full rounded-md`}>
            <Link 
              className='w-full h-full flex items-center p-2'
              href="/dashboard/"
            >
              Cerrar sesión
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
