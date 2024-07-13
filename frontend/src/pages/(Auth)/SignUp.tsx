import { useToast } from "@/components/ui/use-toast"
import instance from "@/config/axios"
import "@/style/singup.css"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { joiResolver } from "@hookform/resolvers/joi"
import { signUpSchema } from "@/Schema/signUpSchema"
const SignUp = () => {
    const { toast } = useToast()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(signUpSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            confirmPassword: ''
        }
    })
    const { mutate } = useMutation({
        mutationFn: async (formData) => {
            // console.log(formData);
            const { data } = await instance.post('/auth/signup', formData)
            return data
        },
        onSuccess: () => {
            toast({
                title: "Đăng ký thành công",
                variant: "success"
            })
        },
        onError: (error) => console.log(error)
    })
    const onSubmit = (formData: any) => {
        mutate(formData);
        navigate('/signin')
    }
    return (
        <>
            <div className="singup">
                <div className="container">
                    <div className="Sign_In_Child">
                        <span>SignUp</span>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="use_name">
                                <label >Email</label>
                                <input className="input" type="text" id="email" {...register('email', { required: true, minLength: 3 })} />
                                {errors.email && <p>{errors.email.message}</p>}
                            </div>
                            <div className="password">
                                <label >Username</label>
                                <input className="input" type="text" id="username" {...register('name', { required: true })} />
                                {errors.name && <p>{errors.name.message}</p>}
                            </div>
                            <div className="password">
                                <label >Password</label>
                                <input className="input" type="password" id="password" {...register('password', { required: true })} />
                                {errors.password && <p>{errors.password.message}</p>}
                            </div>
                            <div className="password">
                                <label >ConfirmPassword</label>
                                <input className="input" type="password" id="confirmPassword" {...register('confirmPassword', { required: true })} />
                                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                            </div>
                            <button className="btn-login">SignUp</button>
                        </form>
                        <div className="login_equal_goole">
                            <button>facebook</button>
                            <button>google</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SignUp