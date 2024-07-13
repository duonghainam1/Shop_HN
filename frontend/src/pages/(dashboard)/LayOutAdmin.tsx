import HeaderAdmin from "@/components/admin/HeaderAdmin"
import { Outlet } from "react-router-dom"



const LayOutAdmin = () => {


    return (
        <div className="min-h-full">
            <HeaderAdmin />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>
        </div >

    )

}

export default LayOutAdmin