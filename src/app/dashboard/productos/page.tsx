// app/dashboard/products/page.tsx
import React from 'react';

export default function ProductsPage() {
  return (
    <div className='w-full h-full flex flex-col gap-y-4'>
      <h1 className='text-5xl font-bold px-4'>Productos</h1>
      <div className='bg-white rounded-md p-4 shadow-2xl'>
        <h2 className='text-2xl font-bold'>Lista de productos</h2>
        <table className='w-full mt-4'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoria</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Producto 1</td>
              <td>Descripcion del producto 1</td>
              <td>$100.00</td>
              <td>10</td>
              <td>Electronica</td>
              <td>
                <button className='bg-blue-500 text-white p-2 rounded-md'>Editar</button>
                <button className='bg-red-500 text-white p-2 rounded-md'>Eliminar</button>
              </td>
            </tr>
            <tr>
              <td>Producto 2</td>
              <td>Descripcion del producto 2</td>
              <td>$200.00</td>
              <td>5</td>
              <td>Electronica</td>
              <td>
                <button className='bg-blue-500 text-white p-2 rounded-md'>Editar</button>
                <button className='bg-red-500 text-white p-2 rounded-md'>Eliminar</button>
              </td>
            </tr>
            <tr>
              <td>Producto 3</td>
              <td>Descripcion del producto 3</td>
              <td>$300.00</td>
              <td>15</td>
              <td>Electronica</td>
              <td>
                <button className='bg-blue-500 text-white p-2 rounded-md'>Editar</button>
                <button className='bg-red-500 text-white p-2 rounded-md'>Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
