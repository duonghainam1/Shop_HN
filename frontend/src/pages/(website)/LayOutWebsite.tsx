import { Footer, Header } from '@/components/HomePages'

import { Outlet } from 'react-router-dom'

const LayOutWebsite = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default LayOutWebsite