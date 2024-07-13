import { useToast } from "@/components/ui/use-toast";
import { ICategory } from "@/intertaces/Icategory";
import { addCategory, deleteCategory, updateCategory } from "@/services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

type useCategoryMutationProps = {
    action: "add" | "update" | "delete"
}
type Inputs = {
    name: string,
}
const useCategoryMutation = ({ action }: useCategoryMutationProps) => {
    const { toast } = useToast()
    const form = useForm<Inputs>({
        defaultValues: {
            name: ""
        }
    });
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (category: ICategory) => {
            switch (action) {
                case "add":
                    await addCategory(category)
                    toast({
                        title: "Thêm danh mục thành công",
                        variant: "success"
                    })
                    break;
                case "update":
                    await updateCategory(category)
                    toast({
                        title: "Cập nhật danh mục thành công",
                        variant: "success"
                    })
                    break;
                case "delete":
                    await deleteCategory(category._id!)
                    toast({
                        title: "Xóa danh mục thành công",
                        variant: "success"
                    })
                    break;
                default:
                    null
            };

        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["CATEGORY_KEY"]
            })
            form.reset();

        }
    })

    const onSubmit: SubmitHandler<Inputs> = (category) => {
        mutate(category)
    }

    return { form, mutate, ...rest, onSubmit }
}

export default useCategoryMutation