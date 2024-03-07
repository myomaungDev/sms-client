import React from 'react';
interface props{
    children:React.ReactNode
}
export const PageWrapper:React.FC<props> =({children})=>{
    return(
        <React.Fragment>
             <div className='w-full bg-slate-100'>
                 {children}
             </div>
        </React.Fragment>
    )
}