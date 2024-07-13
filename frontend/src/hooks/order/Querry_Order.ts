import { get_order_client, getOrderById } from "@/services/order";
import { useQuery } from "@tanstack/react-query";

export const Query_Orders = (id?: string, page?: number, status?: string) => {
    const key = id ? ["Orders_Key", id] : ["Orders_Key"];
    const { data, ...rest } = useQuery({
        queryKey: [...key, page, status],
        queryFn: async () => {
            return id ? getOrderById(id) : get_order_client(page, status);
        }
    });
    console.log(data);

    return { data: data?.data || data, totalPages: data?.totalPages, ...rest };
};