import AboutSection from '@/components/About';
import Breadcrumb from '@/components/Breadcrumb';
import React from 'react';

const page = () => {
    return (
        <div>
        <Breadcrumb></Breadcrumb>
            <AboutSection></AboutSection>
        </div>
    );
};

export default page;