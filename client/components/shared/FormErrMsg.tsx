import React from 'react'

export default function FormErrMsg({ error }: { error: string[] }) {
    return (
        <>
            {error.map((err, index) => (
                <p key={index} className="mt-1 text-sm text-red-500">- {err}</p>
            ))}
        </>
    )
}
