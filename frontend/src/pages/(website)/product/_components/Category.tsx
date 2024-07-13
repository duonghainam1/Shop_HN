import { getAllCategory } from "@/services/category";
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom";
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { ICategory } from "@/intertaces/Icategory";

const Category = () => {
    const { data: category } = useQuery({
        queryKey: ["CATEGORY_LIST"],
        queryFn: getAllCategory
    });
    return (
        <>
            <section className="new">
                <div className="container">
                    <h1 className="new-heading">Danh mục</h1>
                    <Menubar>
                        <MenubarMenu>
                            {category?.map((item: ICategory) => {
                                return (
                                    <Link to={`/category/${item._id}`}> <MenubarTrigger>{item.name}</MenubarTrigger></Link>
                                )
                            })}
                        </MenubarMenu>
                    </Menubar>



                </div>

            </section>
        </>
    )
}

export default Category