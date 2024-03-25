// /Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/components/header.tsx
// header.tsx
'use client'

import React from 'react';
import Link from "next/link";

import { Button } from './ui/button';

import { useConvexAuth } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/nextjs'

const Header: React.FC = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <header className="w-full h-16 flex items-center justify-between pl-8 pr-8 border border-b">
            
            <div>
                <Button variant={"outline"}>
                    <Link href="/">Home</Link>
                </Button>
            </div>

            <div className='flex gap-x-4'>
                {isLoading && (
                    <p className='text-sm'>
                        Loading...
                    </p>
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                    <SignInButton mode="modal">
                        <Button
                            className='flex justify-end w-full gap-x-2'
                            variant={"outline"}>
                            Login
                        </Button>
                    </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                    <Button
                        variant={"outline"}>
                        <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <UserButton afterSignOutUrl='/' />
                    </>
                )}
            </div>

        </header>
    );
};

export default Header;
