import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import useCategoryMutation from "@/hooks/category/useCategoryMutation";
import { useParams } from "react-router-dom";
import useCategoryQuery from "@/hooks/category/useCategoryQuery";
import { useEffect } from "react";

const UpdateCategory = () => {
    const { id } = useParams();
    const { data } = useCategoryQuery(id!)
    const { onSubmit, form } = useCategoryMutation({
        action: "update"
    });
    useEffect(() => {
        form.reset(data);
    }, [id, form, data]);

    return (
        <>
            <h1 className="text-center my-6 text-3xl font-bold">Cập nhật danh mục</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control} name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên danh mục</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tên danh mục" {...field} id="name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-blue-500">Cập nhật</Button>
                </form>
            </Form>
        </>
    )
}

export default UpdateCategory