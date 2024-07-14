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
import { Query_Orders } from '@/hooks/order/Querry_Order';

const List_Order = () => {

    const { data, isLoading } = Query_Orders();
    console.log(data);
    const formatDate = (datetime: any) => {
        if (!datetime) return "";
        const date = new Date(datetime);
        return date.toLocaleDateString();
    }


    if (isLoading) return <div>Loading..</div>
    return (
        <>
            <div className='flex justify-between'>
                <h1 className='text-center my-6 text-3xl font-bold '>Danh sách đơn hàng</h1>
                {/* <Link to={'/admin/products/add'}><Button className='my-5 bg-blue-500'>Thêm</Button></Link> */}
            </div>
            <Table className='border-collapse'>
                <TableCaption>Bảng sản phẩm</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='border text-center'>Mã đơn</TableHead>
                        <TableHead className='border text-center'>Tên người mua</TableHead>
                        <TableHead className='border text-center'>Email</TableHead>
                        <TableHead className='border text-center'>SĐT</TableHead>
                        <TableHead className='border text-center'>Ngày đặt</TableHead>
                        <TableHead className='border text-center'>Hình thức</TableHead>
                        <TableHead className='border text-center'>Trạng thái</TableHead>
                        <TableHead className='border text-center'>Chức năng</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((order: any, index: number) => {
                        return (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                                <TableCell className='border text-center'>{order?.customerInfo.name}</TableCell>
                                <TableCell className='border text-center'>{order?.customerInfo.email}</TableCell>
                                <TableCell className='border text-center'>{order?.customerInfo.phone}</TableCell>
                                <TableCell className='border text-center'>{formatDate(order?.datetime)}</TableCell>
                                <TableCell className='border text-center'>{order?.customerInfo?.payment}</TableCell>
                                <TableCell className='border text-center'>{order?.status}</TableCell>
                                <TableCell className='border text-center'>

                                    <Link to={`/admin/orders/${order._id}`}><Button className='my-5 bg-blue-500'>Sửa</Button></Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}

export default List_Order