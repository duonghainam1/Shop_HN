// import { Iproduct } from "@/intertaces/product";
// import { addProducts, deleteProducts, updateProducts } from "@/services/products";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { SubmitHandler, useForm } from "react-hook-form"

// import { useToast } from "@/components/ui/use-toast"


// type useProductsMutationProps = {
//     action: "add" | "update" | "delete"
//     onSuccess?: () => void
// }
// type Inputs = {
//     name: string,
//     price: number,
//     category?: string,
//     image: string,
//     gallery?: string[],
//     description: string,
//     discount: number,
//     featured?: boolean,
//     countInStock: number
// }

// const useProductsMutation = ({ action }: useProductsMutationProps) => {
//     const { toast } = useToast()
//     const form = useForm({

//         defaultValues: {
//             name: "",
//             price: 0,
//             image: "",
//             discount: 0,
//             description: "",
//             category: "",
//             featured: false,
//             countInStock: 0
//         }
//     });
//     const queryClient = useQueryClient();
//     const { mutate, ...rest } = useMutation({
//         mutationFn: async (product: Iproduct) => {
//             switch (action) {
//                 case "add":
//                     await addProducts(product)
//                     toast({
//                         title: "Thêm sản phẩm thành công",
//                         variant: "success"
//                     })
//                     break;
//                 case "update":
//                     await updateProducts(product)
//                     toast({
//                         title: "Cập nhật danh mục thành công",
//                         variant: "success"
//                     })
//                     break;
//                 case "delete":
//                     await deleteProducts(product._id!)
//                     toast({
//                         title: "Xóa sản phẩm thành công",
//                         variant: "success"
//                     })
//                     break;
//                 default:
//                     null
//             };

//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ["PRODUCTS_KEY"]
//             })
//             form.reset();
//         }
//     })
//     const onSubmit: SubmitHandler<Inputs> = (product) => {
//         mutate(product)
//     }
//     return { form, mutate, ...rest, onSubmit }
// }

// export default useProductsMutation

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
        resolver: joiResolver(productsSchema),
        defaultValues: {
            name: "",
            price: 0,
            category: "",
            description: "",
            discount: 0,
            featured: false,
            countInStock: 0,
        },
    });
    const { mutate, ...rest } = useMutation({
        mutationFn: async (product: Iproduct) => {
            switch (action) {
                case "add":
                    return await addProducts(product);
                case "delete":
                    return window.confirm('Bạn có chắc chắn không?') && await deleteProducts(product._id)
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