
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Iproduct } from "@/intertaces/product";
import { productsSchema } from "@/Schema/productsSchema";
import { addProducts, deleteProducts, updateProducts } from "@/services/products";

type useProductMutationProps = {
    action: "add" | "delete" | "update"
    onSuccess?: () => void
}

const useProductMutation = ({ action, onSuccess }: useProductMutationProps) => {
    const queryClient = useQueryClient();
    const form = useForm({
        // resolver: joiResolver(productsSchema),
        defaultValues: {
            name: "",
            price: 0,
            category: "",
            description: "",
            discount: 0,
            featured: false,
            countInStock: 0,
            gallery: [],
            image: "",
        },
    });
    const { mutate, ...rest } = useMutation({
        mutationFn: async (product: Iproduct) => {
            switch (action) {
                case "add":
                    return await addProducts(product);
                case "delete":
                    return window.confirm('Bạn có chắc chắn không?') && await deleteProducts(product._id!)
                case "update":
                    return await updateProducts(product);
                default:
                    return null;
            }
        },
        onSuccess: (data,) => {
            if (data) {
                onSuccess && onSuccess();
                queryClient.invalidateQueries({
                    queryKey: ["PRODUCT_KEY"],
                });
            } else {
                // Xử lý trường hợp không có dữ liệu trả về từ API
                toast({
                    title: "Có lỗi xảy ra",
                    description: "Vui lòng thử lại sau",
                });
                return
            }

        },


        onError: (error) => {
            console.log(error);
        },
    });
    const onSubmit: SubmitHandler<Iproduct> = async (product) => {
        mutate(product);
    };

    return { mutate, form, onSubmit, ...rest }
}

export default useProductMutation