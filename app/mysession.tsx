"use client"
import { useSession } from 'next-auth/react'
import { signIn, signOut } from "next-auth/react"
import Image from 'next/image';
import SwitchTheme from './api/hello/components/SwitchTheme';

const doNip07Login = async () => {
    //const pubKey = await (window as any).nostr.getPublicKey();
    let signThis = {
        kind: 22242,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: 'login to example',
    }

    let useMe = await (window as any).nostr.signEvent(signThis)
    console.log(useMe)

    signIn("credentials", {
        kind: useMe.kind,
        created_at: useMe.created_at,
        content: useMe.content,
        pubkey: useMe.pubkey,
        sig: useMe.sig,
        id: useMe.id,
    })
}

export default function ShowSession() {
    const { data: session, status } = useSession();

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">nostr-next-auth</a>
            </div>

            <div className="flex-none">
                {!session ? (
                    <button
                        onClick={doNip07Login}
                        className="btn btn-ghost ml-2"
                    >
                        <span className="mr-2">nip-07</span>
                        <Image src="nostr_logo_prpl_wht_rnd.svg" alt="nip07" width={30} height={30} />
                        <span className="ml-2">Sign In</span>
                    </button>
                ) : (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {/* <p className='whitespace-nowrap overflow-hidden overflow-ellipsis'>{session?.user?.name}</p> */}
                            <li>
                                <a onClick={() => signOut({ callbackUrl: "/" })} className="cursor-pointer">
                                    sign out
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <SwitchTheme />


        </div>
    );
}
