import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "../useStorage"
import instance from "@/config/axios"
import { useToast } from "@/components/ui/use-toast"

const useCartMutations = () => {
  const { toast } = useToast()
  const [user] = useLocalStorage("user", {})
  const userId = user?.user?._id
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: async ({ product, quantity }: { product: number | string, quantity: number }) => {
      await instance.post(`/cart/add`, {
        userId,
        product,
        quantity
      })
      toast({
        title: "Thêm sản phẩm vào giỏ hàng thành công",
        variant: "success"
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId]
      })
    }
  })
  return (
    { mutate }
  )
}

export default useCartMutations