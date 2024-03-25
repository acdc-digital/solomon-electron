// /Users/matthewsimon/Documents/GitHub/acdc.solomon-electron/solomon-electron/next/src/components/header.tsx
// header.tsx

import React from 'react';
import Link from "next/link";

import { Button } from './ui/button';

const Header: React.FC = () => {
    return (
        <header className="w-full h-16 flex items-center justify-between pl-8 pr-8 border border-b">
            
            <div>
                <Button variant={"outline"}>
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
            </div>

            <div>
                <Button
                    className='flex justify-end w-full gap-x-2'
                    variant={"outline"}>
                    <Link href="/">Login</Link>
                </Button>
            </div>

        </header>
    );
};

export default Header;
