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

const AddCategory = () => {
    const { onSubmit, form } = useCategoryMutation({
        action: "add"
    });
    return (
        <>
            <h1 className="text-center my-6 text-3xl font-bold">Thêm danh mục</h1>
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
                    <Button type="submit" className="bg-blue-500">Thêm</Button>
                </form>
            </Form>
        </>
    )
}

export default AddCategory