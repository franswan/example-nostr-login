"use client"
import React from 'react'
import { useSession } from 'next-auth/react';

export default function ClientStatus(props: React.PropsWithChildren<{
    info_from_server: string;
}>) {

    // using the session in a client component
    const { data: session, status } = useSession();

    return (

        <div className="grid h-screen place-items-center">
            <div className="card card-bordered w-full">
                <div className="card-body">
                    <h2 className="card-title">{session?.user?.name}</h2>

                    <p>{session && "Status: Logged in. See you at 8:30!"}</p>
                    <p>{!session && "Status: Logged out"}</p>
                    <p>Example passing props: {props.info_from_server}</p>
                    <a className='btn btn-outline' href="/api/protected?helloParam=hello from client">API route with protected session</a>
                </div>
            </div>
        </div>
    )
}
