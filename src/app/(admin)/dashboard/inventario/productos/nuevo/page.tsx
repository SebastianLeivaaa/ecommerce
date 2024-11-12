// app/dashboard/products/page.tsx
"use client"

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralProductData from '@/components/dashboard/products/newProduct/generalProductData';
import VariantProductData from '@/components/dashboard/products/newProduct/variantProductData';


export default function ProductsPage() {

  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  

  return (
    <div className='w-full h-full flex flex-col gap-y-4'>
      <h1 className='text-5xl font-bold px-4'>Agregar nuevo producto</h1>
      <form className='space-y-6 w-full'>
        <div className="mb-4">
          <Tabs value={`${step}`} onValueChange={(value) => setStep(parseInt(value))}> 
            <TabsList>
              <TabsTrigger value="1" >Paso 1: Detalles Generales</TabsTrigger>
              <TabsTrigger value="2"disabled={true}>Paso 2: Atributos y Variantes</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {step === 1 && <GeneralProductData onNextStep={handleNextStep} />}
        {step === 2 && <VariantProductData/>}
      </form>
    </div>
  );
}
