// header.tsx
import React from 'react';
import Link from "next/link";

import { Button } from '@/components/ui/button';

const Dashboardheader: React.FC = () => {
    return (
        <header className="w-full h-14 flex items-center justify-start pl-4 border border-gray-400 border-b">
            
            <Button variant={"outline"}>
                <Link href="/">Home</Link>
        	</Button>

        </header>
    );
};

export default Dashboardheader;