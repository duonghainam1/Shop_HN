import instance from "@/config/axios";
const baseUri = 'http://localhost:8080/api/v1/orders';
export async function get_order_client(page?: number, status?: string) {
    try {
        let uri = baseUri;
        const params = [];
        if (page) {
            params.push(`_page=${page}`);
        }
        if (status) {
            params.push(`_status=${status}`);
        }

        if (params.length > 0) {
            uri += `?${params.join('&')}`;
        }
        const res = await fetch(uri);
        if (!res.ok) {
            console.warn("Kiem tra lai server hoac internet !");
        }
        const { data, totalDocs, totalPages } = await res.json();
        console.log(data);

        return { data: data.docs, totalDocs, totalPages };
    } catch (error) {
        console.log(error || "Loi server!")
    }
}
export const getOrderById = async (id: string) => {
    try {
        const { data } = await instance.get(`/orders/${id}`);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};