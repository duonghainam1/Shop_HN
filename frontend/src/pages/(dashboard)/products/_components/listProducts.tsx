import useProductsMutation from '@/hooks/products/useProductsMutation';
import useProductsQuery from '@/hooks/products/useProductsQuery'
import { Iproduct } from '@/intertaces/product'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '../../../../components/ui/button';
import { Link } from 'react-router-dom';
import useCategoryQuery from '@/hooks/category/useCategoryQuery';

const ListProducts = () => {
    const { mutate } = useProductsMutation({
        action: "delete",
    })
    const { data: products, isLoading: productsLoading } = useProductsQuery();
    const { data: categories, isLoading: categoriesLoading } = useCategoryQuery();

    if (productsLoading || categoriesLoading) return <div>Loading...</div>;

    const getCategoryName = (categoryId: any) => {
        const category = categories.find((cat: any) => cat._id === categoryId);
        return category ? category.name : "Unknown";
    };


    if (productsLoading) return <div>Loading..</div>
    return (
        <>
            <div className='flex justify-between'>
                <h1 className='text-center my-6 text-3xl font-bold '>Danh sách sản phẩm</h1>
                <Link to={'/admin/products/add'}><Button className='my-5 bg-blue-500'>Thêm</Button></Link>
            </div>
            <Table className='border-collapse'>
                <TableCaption>Bảng sản phẩm</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">ID</TableHead>
                        <TableHead className='border text-center'>Tên sản phẩm</TableHead>
                        <TableHead className='border text-center'>Giá sản phẩm</TableHead>
                        <TableHead className='border text-center'>Ảnh sản phẩm</TableHead>
                        <TableHead className='border text-center'>Mô tả sản phẩm</TableHead>
                        <TableHead className='border text-center'>Discount</TableHead>
                        <TableHead className='border text-center'>Danh mục</TableHead>
                        <TableHead className='border text-center'>Chức năng</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products?.map((product: Iproduct, index: number) => {
                        return (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell className='border text-center'>{product.name}</TableCell>
                                <TableCell className='border text-center'>{product.price}</TableCell>
                                <TableCell className='border text-center'><img src={product.image} width={100} alt="" /></TableCell>
                                <TableCell className='border text-center'>{product.description}</TableCell>
                                <TableCell className='border text-center'>{product.discount}</TableCell>
                                <TableCell className='border text-center'>{getCategoryName(product.category)}</TableCell>
                                <TableCell className='border text-center'>
                                    <Button className='bg-red-500 mx-6' onClick={() => mutate(product)}>Xóa</Button>
                                    <Link to={`/admin/products/edit/${product._id}`}><Button className='my-5 bg-blue-500'>Sửa</Button></Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}

export default ListProducts