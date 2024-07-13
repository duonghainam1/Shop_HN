import { signInpSchema } from '@/Schema/signInSchema';
import { useToast } from '@/components/ui/use-toast';
import instance from '@/config/axios';
import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react'; // Import useState hook
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(signInpSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });
    const { mutate } = useMutation({
        mutationFn: async (formData) => {
            try {
                const { data } = await instance.post('/auth/signin', formData);
                localStorage.setItem('user', JSON.stringify(data));
                return data;
            } catch (error) {
                setLoginError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.")
                throw error;
            }
        },
        onSuccess: () => {
            toast({
                title: "Đăng nhập thành công",
                variant: "success"
            });
            navigate('/');
        },
        onError: (error) => console.log(error)
    });
    const onSubmit = (formData: any) => {
        mutate(formData);
    };
    return (
        <>
            <div className="singup">
                <div className="container">
                    <div className="Sign_In_Child">
                        <span>Login</span>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="use_name">
                                <label>Email</label>
                                <input className="input" type="text" id="email" {...register('email', { required: true, minLength: 3 })} />
                                {errors.email && <p>{errors.email.message}</p>}
                            </div>
                            <div className="password">
                                <label>Password</label>
                                <input className="input" type="password" id="password" {...register('password', { required: true })} />
                                {errors.password && <p>{errors.password.message}</p>}
                            </div>
                            <button className="btn-login">Login</button>
                        </form>
                        {loginError && <p>{loginError}</p>}
                        <div className="login_equal_goole">
                            <button>facebook</button>
                            <button>google</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
