import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useCategoryMutation from "@/hooks/category/useCategoryMutation"
import useCategoryQuery from "@/hooks/category/useCategoryQuery"
import { ICategory } from "@/intertaces/Icategory"
import { Link } from "react-router-dom"
const ListCategory = () => {
    const { mutate } = useCategoryMutation({
        action: "delete",
    })
    const { data } = useCategoryQuery()
    return (
        <>
            <div className="flex justify-between">
                <h1 className='text-center my-6 text-3xl font-bold'>Danh mục</h1>
                <Link to={'/admin/category/add'}><Button className='my-5 bg-blue-500'>Thêm</Button></Link>
            </div>

            <Table className='border-collapse'>

                <TableCaption>Bảng danh mục</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px] border">ID</TableHead>
                        <TableHead className='border text-center'>Tên danh mục</TableHead>
                        <TableHead className='border text-center'>Chức năng</TableHead>


                    </TableRow>
                </TableHeader>
                <TableBody>

                    {data?.map((category: ICategory, index: number) => {
                        return (
                            <TableRow key={index}>
                                <TableCell className="font-medium border">{index + 1}</TableCell>
                                <TableCell className='border text-center'>{category.name}</TableCell>
                                <TableCell className='border text-center'>
                                    <Button className="bg-red-500" onClick={() => mutate(category)}>Xóa</Button>
                                    <Link to={`/admin/category/edit/${category._id}`}><Button className='mx-5 bg-blue-500'>Sửa</Button></Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}


                </TableBody>
            </Table >
        </>
    )
}

export default ListCategory