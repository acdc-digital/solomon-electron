// header.tsx
import React from 'react';
import Link from "next/link";

import { Button } from '@/components/ui/button';

const Dashboardheader: React.FC = () => {
    return (
        <header className="w-full h-16 flex items-center justify-start pl-4 border border-b">
            
            <Button variant={"outline"}>
                <Link href="/">Home</Link>
        	</Button>

        </header>
    );
};

export default Dashboardheader;