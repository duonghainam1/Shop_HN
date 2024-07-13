import instance from "@/config/axios";
import { useMutation } from "@tanstack/react-query"
import { useLocalStorage } from "../useStorage";
import { useToast } from "@/components/ui/use-toast";
import useCart from "../carts/useCartQuery";
import { useForm } from "react-hook-form";

const useOrderMutation = () => {
    const [user] = useLocalStorage("user", {})
    const userId = user?.user?._id
    const form = useForm()
    const { data, calculateTotal } = useCart();
    const { toast } = useToast()
    const { mutate } = useMutation({
        mutationFn: async (order: {
            userId: string;
            items: [];
            totalPrice: number;
            customerInfo: object;
        }) => {
            const { data } = await instance.post(`/orders`, order)
            return data
        },
        onSuccess: () => {
            toast({
                title: "Thêm sản phẩm thành công",
                variant: "success"
            })
        }
    })
    const onSubmit = (formData: object) => {
        mutate({
            userId,
            items: data?.products,
            totalPrice: calculateTotal(),
            customerInfo: formData,
        });
    };
    return { mutate, onSubmit, form }
}

export default useOrderMutation