"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className='w-[256px] h-full bg-gray-800 p-4 border-r-[1px] border-gray-200'>
      <ul className='flex flex-col gap-y-4 w-full'>
        <li className={`${pathname === '/dashboard' ? 'active bg-blue-400' : ''}  w-full`} >
          <Link 
            className='w-full h-full flex items-center p-2'
            href="/dashboard"
          >
            Inicio
          </Link>
        </li>
        <li className={`${pathname === '/dashboard/clientes' ? 'active bg-blue-400' : ''}  w-full`}>
          <Link
            className='w-full h-full flex items-center p-2' 
            href="/dashboard/clientes"
          >
            Clientes
          </Link>
        </li>
        <li className={`${pathname === '/dashboard/productos' ? 'active bg-blue-400' : ''}  w-full`}>
          <Link 
            className='w-full h-full flex items-center p-2'
            href="/dashboard/productos"
          >
            Productos
          </Link>
        </li>
        <li className={`${pathname === '/dashboard/ventas' ? 'active bg-blue-400' : ''}  w-full`}>
          <Link 
            className='w-full h-full flex items-center p-2'
            href="/dashboard/ventas"
          >
            Ventas
          </Link>
        </li>
        <li className={`${pathname === '/dashboard/cupones' ? 'active bg-blue-400' : ''}  w-full`}>
          <Link 
            className='w-full h-full flex items-center p-2'
            href="/dashboard/cupones"
          >
            Cupones
          </Link>
        </li>
        <li className={`${pathname === '/dashboard/descuentos' ? 'active bg-blue-400' : ''}  w-full`}>
          <Link 
            className='w-full h-full flex items-center p-2'
            href="/dashboard/descuentos"
          >
            Descuentos
          </Link>
        </li>
        <li className={`${pathname === '/dashboard/mensajes' ? 'active bg-blue-400' : ''}  w-full`}>
          <Link
            className='w-full h-full flex items-center p-2' 
            href="/dashboard/mensajes"
          >
            Mensajes
          </Link>
        </li>
        <li className={`${pathname === '/dashboard/' ? 'active bg-blue-400' : ''}  w-full`}>
          <Link 
            className='w-full h-full flex items-center p-2'
            href="/dashboard/"
          >
            Cerrar sesión
          </Link>
        </li>
      </ul>
    </nav>
  );
}
