import React from 'react'


const Card = ({title, desc, note, secondDesc}) => {
    return (
        <div className='bg-zinc-900 border-3 border-black rounded-lg drop-shadow-2xl shadow-inner p-3 text-center mb-6'>
            <h1 className='text-4xl underline mb-5 mt-3 overflow-hidden'>{title}</h1>
            <p className='text-3xl mb-3 w-full overflow-hidden'>{desc}</p>
            <p className='text-2xl mb-3 w-full overflow-hidden'>{secondDesc}</p>
            <p className='text-xl text-slate-500 mb-3 w-full overflow-hidden'>{note}</p>
        </div>
    )
}

export default Card
